<script lang="ts" setup type="module">
import Swal from 'sweetalert2';

import { num_miles } from '@/@core/utils/validators';
import PreloadInterno from '@/componentsGlobal/PreloadInterno.vue';
import { useCrudPublicationStore } from '@/pages/Admin/Publication/Store/useCrudPublicationStore';
import { useAuthenticationStore } from '@/stores/useAuthenticationStore';

const authentication = useAuthenticationStore()
const publicationStore = useCrudPublicationStore()

//  data paginate
const { publications, totalPage, lastPage, currentPage, totalData, loading } = storeToRefs(publicationStore)
const rowPerPage = ref<number>(10)
const searchQuery = ref<string>('')



const fetchPublication = async () => {
  await publicationStore.fetchAll({
    company_id: authentication.company.id,
    perPage: rowPerPage.value,
    page: currentPage.value,
    searchQuery: searchQuery.value,
  })
}

onMounted(async () => {
  await fetchPublication()
})

watch(currentPage, async () => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})
watch(rowPerPage, async () => {
  currentPage.value = 1
})
watchArray([currentPage, searchQuery, rowPerPage], async () => {
  await fetchPublication()
})

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = publications.value.length ? ((currentPage.value - 1) * totalPage.value) + 1 : 0
  const lastIndex = publications.value.length + ((currentPage.value - 1) * totalPage.value)

  return `Mostrando ${firstIndex} a ${lastIndex} de ${totalData.value} registros`
})

const changeScreen = async (screen: string, userId: number | null = null) => {
  publicationStore.clearFormulario()
  publicationStore.typeAction = screen
  if (userId)
    publicationStore.fetchInfo(userId)
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
      await publicationStore.fetchDelete(id)
      await fetchPublication()
    }
    else if (result.isDenied) {
    }
  })
}

// Accion cambio de estado
const changeState = async (object: object, state: number) => {
  publicationStore.changeState(object, state)
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
            Descripción
          </th>
          <th scope="col">
            ¿Se permite permuta?
          </th>
          <th scope="col">
            Precio
          </th>
          <th scope="col">
            Oferta
          </th>
          <th scope="col">
            Dias
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
          <td colspan="8">
            <PreloadInterno />
          </td>
        </tr>
        <tr v-for="(item, index) in publications" v-show="!loading" :key="index" style="height: 3.75rem;">
          <td>
            <span>
              {{ item.name }}
            </span>
          </td>
          <td>
            <span>
              {{ item.description }}
            </span>
          </td>
          <td>
            <span>
              {{ item.barter }}
            </span>
          </td>
          <td>
            <span>
              {{ num_miles(item.price) }}
            </span>
          </td>
          <td>
            <span>
              {{ num_miles(item.offer) }}
            </span>
          </td>
          <td>
            <span>
              {{ item.days }}
            </span>
          </td>
          <td>
            <span>
              <VSwitch v-model="item.status" color="success" inset :value="item.status" :true-value="1" :false-value="0"
                hide-details @click="changeState(item, item.status)" />

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

      <tfoot v-show="!publications.length">
        <tr>
          <td colspan="8" class="text-center">
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
