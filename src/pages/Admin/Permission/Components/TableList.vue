<script lang="ts" setup type="module">
import Swal from 'sweetalert2';

import { useCrudPermissionStore } from '@/stores/Admin/useCrudPermissionStore'
import PreloadInterno from '@/componentsGlobal/PreloadInterno.vue';
const storePermission = useCrudPermissionStore()

// permission data paginate 
const { permissions, totalPage, lastPage, currentPage, totalData,loading } = storeToRefs(storePermission)

const rowPerPage = ref<number>(10)
const searchQuery = ref<string>('')

const fetchPermission = async () => {
  await storePermission.fetchAll({
    perPage: rowPerPage.value,
    page: currentPage.value,
    searchQuery: searchQuery.value,
  })
}


onMounted(async () => {
  await fetchPermission()
})

watch(currentPage, async () => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})
watch(rowPerPage, async () => {
  currentPage.value =1
})
watchArray([currentPage, searchQuery, rowPerPage], async () => {
  await fetchPermission()
})

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = permissions.value.length ? ((currentPage.value - 1) * totalPage.value) + 1 : 0
  const lastIndex = permissions.value.length + ((currentPage.value - 1) * totalPage.value)
  return `Mostrando ${firstIndex} a ${lastIndex} de ${totalData.value} registros`
})

const changeScreen = async (screen: string, menuId: number | null = null) => {
  storePermission.clearFormulario()
  storePermission.typeAction = screen
  if (menuId)
    storePermission.fetchInfoPermission(menuId)
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
      await storePermission.fetchDelete(id)
      await fetchPermission()
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
          <th scope="col">
            Grupo
          </th>
          <th scope="col">
            Nombre
          </th>
          <th scope="col">
            Descripción
          </th>
          <th scope="col">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-show="loading">
          <td colspan="4" >
            <PreloadInterno /> 
          </td>
        </tr>
        <tr v-show="!loading" v-for="(item, index) in permissions" :key="index" style="height: 3.75rem;">
          <td>
            <span>
              {{ item.group }}
            </span>
          </td>
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

      <tfoot v-show="!permissions.length">
        <tr>
          <td colspan="7" class="text-center">
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
