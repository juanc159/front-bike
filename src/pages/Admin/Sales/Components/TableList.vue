<script lang="ts" setup type="module">
import Swal from 'sweetalert2';

import { num_miles } from '@/@core/utils/validators';
import PreloadInterno from '@/componentsGlobal/PreloadInterno.vue';
import { useCrudSaleStore } from '@/stores/Admin/useCrudSaleStore';
import { useAuthenticationStore } from '@/stores/useAuthenticationStore';

const authentication = useAuthenticationStore()
const saleStore = useCrudSaleStore()

//  data paginate
const { sales, totalPage, lastPage, currentPage, totalData, loading, pathExcel, formulario } = storeToRefs(saleStore)
const rowPerPage = ref<number>(10)
const searchQuery = ref<string>('')

const fetchThird = async () => {
  await saleStore.fetchAll({
    company_id: authentication.company.id,
    perPage: rowPerPage.value,
    page: currentPage.value,
    searchQuery: searchQuery.value,
  })
}

onMounted(async () => {
  await fetchThird()
})

watch(currentPage, async () => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})
watch(rowPerPage, async () => {
  currentPage.value = 1
})
watchArray([currentPage, searchQuery, rowPerPage], async () => {
  await fetchThird()
})

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = sales.value.length ? ((currentPage.value - 1) * totalPage.value) + 1 : 0
  const lastIndex = sales.value.length + ((currentPage.value - 1) * totalPage.value)

  return `Mostrando ${firstIndex} a ${lastIndex} de ${totalData.value} registros`
})

const changeScreen = async (screen: string, userId: number | null = null) => {
  saleStore.clearFormulario()
  saleStore.typeAction = screen
  if (userId) {
    await saleStore.fetchInfo(userId)
    formulario.value.price_vehicle = num_miles(formulario.value.price_vehicle)
  }
}


// DESCARGAR EXCEL
const dowloadExcel = async () => {
  await saleStore.excel({
    company_id: authentication.company.id
  }).then(resp => {
    window.open(pathExcel.value, '_blank');
  });
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
      await saleStore.fetchDelete(id)
      await fetchThird()
    }
    else if (result.isDenied) {
    }
  })
}
</script>

<template>
  <div>
    <!-- FIN CARD BUSQUEDA -->
    <VContainer fluid class="d-flex flex-wrap py-4 gap-4">
      <div class="me-3" style="width: 80px;">
        <VSelect v-model="rowPerPage" density="compact" variant="outlined" :items="[10, 20, 30, 50]" />
      </div>
      <div class="me-3" style="width: 80px;">
        <VBtn mt-2 size="x-small" color="default" variant="text" title="Descargar" @click="dowloadExcel()">
          <VIcon size="30" icon="mdi-file-excel"></VIcon>
          Excel
        </VBtn>
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
            Referencia
          </th>
          <th scope="col">
            Valor Compra
          </th>
          <th scope="col">
            Valor Venta
          </th>
          <th scope="col">
            Total
          </th>
          <th scope="col">
            Utilidades
          </th>
          <th scope="col">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-show="loading">
          <td colspan="6">
            <PreloadInterno />
          </td>
        </tr>
        <tr v-for="(item, index) in sales" v-show="!loading" :key="index" style="height: 3.75rem;">

          <td>
            <span>
              {{ item.inventory_reference }}
            </span>
          </td>
          <td>
            <span>
              {{ num_miles(item.inventory_purchaseValue) }}
            </span>
          </td>
          <td>
            <span>
              {{ num_miles(item.price_vehicle) }}
            </span>
          </td>
          <td>
            <span>
              {{ num_miles(item.total) }}
            </span>
          </td>
          <td>
            <span>
              {{ num_miles(item.utilities) }}
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

      <tfoot v-show="!sales.length">
        <tr>
          <td colspan="6" class="text-center">
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
