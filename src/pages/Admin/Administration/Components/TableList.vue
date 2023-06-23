<script lang="ts" setup type="module">
import Swal from 'sweetalert2';

import { num_miles } from '@/@core/utils/validators';
import PreloadInterno from '@/componentsGlobal/PreloadInterno.vue';
import { useCrudAdministrationStore } from '@/stores/Admin/useCrudAdministrationStore';
import { useAuthenticationStore } from '@/stores/useAuthenticationStore';

const authentication = useAuthenticationStore()
const administrationStore = useCrudAdministrationStore()

//  data paginate
const { administrations, totalPage, lastPage, currentPage, totalData, loading } = storeToRefs(administrationStore)
const rowPerPage = ref<number>(10)
const searchQuery = ref<string>('')

const total_sum_costs = computed(() => {
  return administrations.value.reduce((acumulator, currentValue) => acumulator + Number(currentValue.cost) ?? 0, 0)
})

const total_sum_costs_inactive = computed(() => {
  return administrations.value.reduce((acumulator, currentValue) => currentValue.status != 1 ? acumulator + Number(currentValue.cost) ?? 0 : acumulator + 0, 0)
})

const total_sum_costs_active = computed(() => {
  return administrations.value.reduce((acumulator, currentValue) => currentValue.status != 0 ? acumulator + Number(currentValue.cost) ?? 0 : acumulator + 0, 0)
})


const fetchAdministration = async () => {
  await administrationStore.fetchAll({
    company_id: authentication.company.id,
    perPage: rowPerPage.value,
    page: currentPage.value,
    searchQuery: searchQuery.value,
  })
}

onMounted(async () => {
  await fetchAdministration()
})

watch(currentPage, async () => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})
watch(rowPerPage, async () => {
  currentPage.value = 1
})
watchArray([currentPage, searchQuery, rowPerPage], async () => {
  await fetchAdministration()
})

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = administrations.value.length ? ((currentPage.value - 1) * totalPage.value) + 1 : 0
  const lastIndex = administrations.value.length + ((currentPage.value - 1) * totalPage.value)

  return `Mostrando ${firstIndex} a ${lastIndex} de ${totalData.value} registros`
})

const changeScreen = async (screen: string, userId: number | null = null) => {
  administrationStore.clearFormulario()
  administrationStore.typeAction = screen
  if (userId)
    administrationStore.fetchInfo(userId)
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
      await administrationStore.fetchDelete(id)
      await fetchAdministration()
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
            Nombre
          </th>
          <th scope="col">
            Fecha Inicial
          </th>
          <th scope="col">
            Fecha Final
          </th>
          <th scope="col">
            Estado
          </th>
          <th scope="col">
            Costo
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
        <tr v-for="(item, index) in administrations" v-show="!loading" :key="index" style="height: 3.75rem;">
          <td>
            <span>
              {{ item.name }}
            </span>
          </td>
          <td>
            <span>
              {{ item.init_date }}
            </span>
          </td>
          <td>
            <span>
              {{ item.final_date }}
            </span>
          </td>
          <td>
            <span v-if="item.status == 1">
              Pagado
            </span>
            <span v-if="item.status == 0">
              Sin Pagar
            </span>
          </td>
          <td>
            <span>
              {{ num_miles(item.cost) }}
            </span>
          </td>
          <td class="text-center" style="width: 5rem;">
            <VBtn icon size="x-small" color="default" variant="text" @click="changeScreen('form', item.id)">
              <VIcon size="22" icon="tabler-edit" />
            </VBtn>
            <VBtn size="x-small" color="error" variant="text" @click="deleteData(item.id)">
              <VIcon size="22" icon="tabler-trash" />
            </VBtn>

          </td>
        </tr>
      </tbody>

      <tfoot v-show="!administrations.length">
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
    <VRow class="mt-5 mb-5">
      <VCol sm="6">
        <h2>Total Sin Pagar</h2>
      </VCol>
      <VCol sm="6">
        <h2>{{ num_miles(total_sum_costs_inactive) }}</h2>
      </VCol>
      <VCol sm="6">
        <h2>Total Pagado</h2>
      </VCol>
      <VCol sm="6">
        <h2>{{ num_miles(total_sum_costs_active) }}</h2>
      </VCol>
      <VCol sm="6">
        <h2>Valor Total</h2>
      </VCol>
      <VCol sm="6">
        <h2>{{ num_miles(total_sum_costs) }}</h2>
      </VCol>
    </VRow>
  </div>
</template>
