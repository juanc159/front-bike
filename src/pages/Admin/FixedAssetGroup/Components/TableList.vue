<script lang="ts" setup>
import Swal from 'sweetalert2';
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { useCrudFixedAssetGroupStore } from '@/stores/Admin/useCrudFixedAssetGroupStore'
import PreloadInterno from '@/componentsGlobal/PreloadInterno.vue';
import { AuthenticationStore } from "@/stores/Authentication"; 
const authentication = AuthenticationStore();
const { theme } = useThemeConfig()


const fixedAssetGroupStore = useCrudFixedAssetGroupStore()


// menu data paginate 
const { fixedAssetGroups, totalPage, lastPage, currentPage, totalData, loading } = storeToRefs(fixedAssetGroupStore)
const rowPerPage = ref<number>(10)
const searchQuery = ref<string>('')
const sort_direction = ref("desc")
const sort_field = ref("name")

const change_sort = async (field: string) => {
  if (sort_field.value == field) {
    sort_direction.value = sort_direction.value == 'asc' ? 'desc' : 'asc';
  } else {
    sort_field.value = field;
  }
}

const fetchMenus = async () => {
  await fixedAssetGroupStore.fetchAll({
    perPage: rowPerPage.value,
    page: currentPage.value,
    searchQuery: searchQuery.value,
    sort_direction: sort_direction.value,
    sort_field: sort_field.value,
    company_id: authentication.company.id,
  })
}

//Accion cambio de estado
const changeState = async(object:object,state:number) => {
  fixedAssetGroupStore.changeState(object,state);
}

onMounted(async () => {
  if (fixedAssetGroupStore.typeAction != "back")
    await fetchMenus()
})

watch(currentPage, async () => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})
watch(rowPerPage, async () => {
  currentPage.value = 1
})
watchArray([currentPage, searchQuery, rowPerPage, sort_direction, sort_field], async () => {
  await fetchMenus()
})

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = fixedAssetGroups.value.length ? ((currentPage.value - 1) * totalPage.value) + 1 : 0
  const lastIndex = fixedAssetGroups.value.length + ((currentPage.value - 1) * totalPage.value)
  return `Mostrando ${firstIndex} a ${lastIndex} de ${totalData.value} registros`
})

const changeScreen = async (screen: string, id: number | null = null) => {
  fixedAssetGroupStore.clearFormulario()
  fixedAssetGroupStore.typeAction = screen
  if (id)
    fixedAssetGroupStore.fetchInfo(id)
}

const deleteData = async (id: number) => {
  Swal.fire({
    title: '¿Desea eliminar el registro?',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Si',
    denyButtonText: 'No',
  }).then(async result => {
    if (result.isConfirmed) {
      await fixedAssetGroupStore.fetchDelete(id)
      await fetchMenus()
    }
    else if (result.isDenied) {
    }
  })
}



</script>

<template>
  <div>
    <VContainer fluid class="d-flex flex-wrap py-4 gap-4">
      <div class="me-3" style="width: 80px;">
        <VSelect v-model="rowPerPage" density="compact" variant="outlined" :items="[10, 20, 30, 50]" />
      </div>

      <VSpacer />

      <div class="app-user-search-filter d-flex  align-center flex-wrap gap-4">
        <div style="width: 10rem;">
          <VTextField v-model="searchQuery" placeholder="Buscar" density="compact" />
        </div>
        <VBtn color="primary" @click="changeScreen('form')">
          Agregar
        </VBtn>
      </div>
    </VContainer>

    <VDivider />

    <VTable class="text-no-wrap">
      <thead>
        <tr>
          <th>
            <span>En Uso</span>
          </th>
          <th>
            <span>Código</span>
          </th>
          <th>
            <span>Nombre</span>
          </th>
          <th>
            <span>Vr. Compra</span>
          </th>
          <th>
            <span>Depreciación</span>
          </th>
          <th>
            <span>Gasto Depreciación</span>
          </th>
          <th>
            <span>Depreciación Fiscal</span>
          </th>
          <th>
            <span>Gasto Depreciación Fiscal</span>
          </th>
          <th scope="col">
            Acciones
          </th>
        </tr>
      </thead>

      <div v-show="true" style="display: flex; justify-content: center;  align-items: center;flex-direction: column;">

      </div>

      <tbody>
        <tr v-show="loading">
          <td colspan="9">
            <PreloadInterno />
          </td>
        </tr>
        <tr v-show="!loading" v-for="(item, index) in fixedAssetGroups" :key="index" style="height: 3.75rem;">
          <td>
            <VSwitch v-model="item.inUse" color="success" inset :value="item.inUse" :true-value="1" :false-value="0"
              hide-details @click="changeState(item,item.inUse)"></VSwitch>
          </td>
          <td>
            <span>
              {{ item.code }}
            </span>
          </td>
          <td>
            <span>
              {{ item.name }}
            </span>
          </td>
          <td>
            <span>
              {{ item.vrBuys_name }}
            </span>
          </td>
          <td>
            <span>
              {{ item.depreciation_name }}
            </span>
          </td>
          <td>
            <span>
              {{ item.depreciationExpense_name }}
            </span>
          </td>
          <td>
            <span>
              {{ item.fiscalDepreciation_name }}
            </span>
          </td>
          <td>
            <span>
              {{ item.taxDepreciationExpense_name }}
            </span>
          </td>
          <td class="text-center" style="width: 5rem;">
            <VBtn size="x-small" color="error" variant="text" @click="deleteData(item.id)">
              <VIcon size="22" icon="tabler-trash" />
            </VBtn>

            <VBtn icon size="x-small" color="default" variant="text" @click="changeScreen('form', item.id)">
              <VIcon size="22" icon="tabler-edit" />
            </VBtn>
          </td>
        </tr>
      </tbody>

      <tfoot v-show="!fixedAssetGroups.length">
        <tr>
          <td colspan="9" class="text-center">
            No se encuentran resultados
          </td>
        </tr>
      </tfoot>
    </VTable>

    <VDivider />

    <VContainer fluid class="d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5">
      <span class="text-sm text-disabled">
        {{ paginationData }}
      </span>

      <VPagination v-model="currentPage" size="small" :total-visible="5" :length="lastPage" />
    </VContainer>
  </div>
</template>
