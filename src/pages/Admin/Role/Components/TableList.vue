<script lang="ts" setup type="module">
import Swal from 'sweetalert2';
import {useCrudRoleStore} from '@/stores/Admin/useCrudRoleStore';
import { AuthenticationStore } from '@/stores/Authentication';
import PreloadInterno from '@/componentsGlobal/PreloadInterno.vue';

const authentication = AuthenticationStore();
const storeRole = useCrudRoleStore();
// menu data paginate 
const {roles, totalPage, lastPage, currentPage, totalData,loading} = storeToRefs(storeRole)

const rowPerPage = ref<number>(10)
const searchQuery = ref<string>('')

const fetchRoles = async () => {
  await storeRole.fetchAll({
    company_id:authentication.company.id,
    perPage: rowPerPage.value,
    page: currentPage.value,
    searchQuery: searchQuery.value,
  })
}

onMounted(async () => {  
  await fetchRoles(); 
  
})

watch(currentPage, async () => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})
watch(rowPerPage, async () => {
  currentPage.value =1
})
watchArray([currentPage, searchQuery, rowPerPage], async () => {
  await fetchRoles()
})

// 👉 Computing pagination data
const paginationData = computed(() => {
  
  const firstIndex = roles.value.length ? ((currentPage.value - 1) * totalPage.value) + 1 : 0
  const lastIndex = roles.value.length + ((currentPage.value - 1) * totalPage.value)

  return `Mostrando ${firstIndex} a ${lastIndex} de ${totalData.value} registros`
})
 

const changeScreen = async (screen: string, menuId: number|null = null) => {
  storeRole.clearFormulario()
  storeRole.typeAction = screen  
  if(menuId)
    storeRole.fetchInfoRole(menuId)
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
      await storeRole.fetchDelete(id)
      await fetchRoles()
    }
    else if (result.isDenied) {
    }
  })
}
</script>

<template>
  <VContainer
    fluid
    class="d-flex flex-wrap py-4 gap-4"
  >
    <div
      class="me-3"
      style="width: 80px;"
    >
      <VSelect
        v-model="rowPerPage"
        density="compact"
        variant="outlined"
        :items="[10, 20, 30, 50]"
      />
    </div>

    <VSpacer />

    <div class="app-user-search-filter d-flex  align-center flex-wrap gap-4">
      <div style="width: 10rem;">
        <VTextField
          v-model="searchQuery"
          placeholder="Buscar"
          density="compact"
        />
      </div> 
        <VBtn
          color="primary"
          @click="changeScreen('form')"
        >
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
          Descripcón
        </th>
        <th scope="col">
          Empresa
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
      <tr
      v-show="!loading"
        v-for="(item,index) in roles"
        :key="index"
        style="height: 3.75rem;"
      >
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
            {{ item.company_name }}
          </span>
        </td> 

        <td
          class="text-center"
          style="width: 5rem;"
        >
          <VBtn
            icon
            size="x-small"
            color="error"
            variant="text"
            @click="deleteData(item.id)"
          >
            <VIcon
              size="22"
              icon="tabler-trash"
            />
          </VBtn>

          <VBtn
            icon
            size="x-small"
            color="default"
            variant="text"
            @click="changeScreen('form', item.id)"
          >
            <VIcon
              size="22"
              icon="tabler-edit"
            />
          </VBtn>
        </td>
      </tr>
    </tbody>

    <tfoot v-show="!roles.length">
      <tr>
        <td
          colspan="7"
          class="text-center"
        >
          No se encuentran resultados
        </td>
      </tr>
    </tfoot>
  </VTable>

  <VDivider />

  <VContainer
    fluid
    class="d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5"
  >
    <span class="text-sm text-disabled">
      {{ paginationData }}
    </span>

    <VPagination
      v-model="currentPage"
      size="small"
      :total-visible="5"
      :length="lastPage"
    />
  </VContainer>
</template>
