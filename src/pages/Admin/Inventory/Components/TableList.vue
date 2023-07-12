<script lang="ts" setup type="module">
import Swal from 'sweetalert2';

import { num_miles } from '@/@core/utils/validators';
import PreloadInterno from '@/componentsGlobal/PreloadInterno.vue';
import { useCrudInventoryStore } from '@/stores/Admin/useCrudInventoryStore';
import { useAuthenticationStore } from '@/stores/useAuthenticationStore';

const authentication = useAuthenticationStore()
const inventoryStore = useCrudInventoryStore()

//  data paginate
const { inventories, totalPage, lastPage, currentPage, totalData, loading } = storeToRefs(inventoryStore)
const rowPerPage = ref<number>(10)
const searchQuery = ref<string>('')



const fetchInventory = async () => {
  await inventoryStore.fetchAll({
    company_id: authentication.company.id,
    perPage: rowPerPage.value,
    page: currentPage.value,
    searchQuery: searchQuery.value
  })
}

onMounted(async () => {
  await fetchInventory()
})

watch(currentPage, async () => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})
watch(rowPerPage, async () => {
  currentPage.value = 1
})
watchArray([currentPage, searchQuery, rowPerPage], async () => {
  await fetchInventory()
})

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = inventories.value.length ? ((currentPage.value - 1) * totalPage.value) + 1 : 0
  const lastIndex = inventories.value.length + ((currentPage.value - 1) * totalPage.value)

  return `Mostrando ${firstIndex} a ${lastIndex} de ${totalData.value} registros`
})

const changeScreen = async (screen: string, userId: number | null = null) => {
  inventoryStore.clearFormulario()
  inventoryStore.typeAction = screen
  if (userId)
    inventoryStore.fetchInfo(userId)
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
      await inventoryStore.fetchDelete(id)
      await fetchInventory()
    }
    else if (result.isDenied) {
    }
  })
}


const changeSate = (obj: object) => {
  inventoryStore.changeSate(obj.id, obj.state)
}
</script>

<template>
  <div>
    <!-- FIN CARD BUSQUEDA -->
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
          <th scope="col">
            Dias
          </th>
          <th scope="col">
            Tipo de Vehículo
          </th>
          <th scope="col">
            Marca
          </th>
          <th scope="col">
            Modelo
          </th>
          <th scope="col">
            Placa
          </th>
          <th scope="col">
            Valor Compra
          </th>
          <th scope="col">
            Estado
          </th>
          <th scope="col">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-show="loading">
          <td colspan="10">
            <PreloadInterno />
          </td>
        </tr>
        <tr v-for="(item, index) in inventories" v-show="!loading" :key="index" style="height: 3.75rem;">
          <td>
            <VChip size="large" v-if="item.days < 30" color="success"> {{ item.days }}</VChip>
            <VChip size="large" v-if="item.days >= 16 && item.days <= 30" color="warning"> {{ item.days }}</VChip>
            <VChip size="large" v-if="item.days > 30" color="error"> {{ item.days }}</VChip>

          </td>
          <td>
            <span>
              {{ item.vehicleType }}
            </span>
          </td>
          <td>
            <span>
              {{ item.brand }}
            </span>
          </td>
          <td>
            <span>
              {{ item.model }}
            </span>
          </td>
          <td>
            <span>{{ item.plate }}</span>
          </td>
          <td>
            <span>$ {{ num_miles(item.purchaseValue) }}</span>
          </td>
          <td>
            <VSelect v-model="item.state" @update:model-value="changeSate(item)"
              :items="['Ingresado', 'Separado', 'Vendido']"></VSelect>
          </td>
          <td class="text-center d-flex justify-content-center aling-items-center">
            <VBtn class="mr-2" icon size="x-small" color="error" @click="deleteData(item.id)">
              <VIcon size="22" icon="tabler-trash" />
            </VBtn>

            <VBtn class="mr-2" icon size="x-small" color="default" @click="changeScreen('form', item.id)">
              <VIcon size="22" icon="tabler-edit" />
            </VBtn>


          </td>
        </tr>
      </tbody>

      <tfoot v-show="!inventories.length">
        <tr>
          <td colspan="10" class="text-center">
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
