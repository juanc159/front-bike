<script lang="ts" setup type="module">
import Swal from 'sweetalert2';

import { useCrudUserStore } from '@/stores/Admin/useCrudUserStore';
import { AuthenticationStore } from '@/stores/Authentication';
import PreloadInterno from '@/componentsGlobal/PreloadInterno.vue';

const authentication = AuthenticationStore();
const storeUser = useCrudUserStore()
 

// users data paginate 
const {users, totalPage, lastPage, currentPage, totalData,show,arrayRoles,loading} = storeToRefs(storeUser)
const rowPerPage = ref<number>(10)
const searchQuery = ref<string>('')
const searchCriteria = ref<object>({})

const fetchUser = async () => {
  await storeUser.fetchAll({
    company_id:authentication.company.id,
    perPage: rowPerPage.value,
    page: currentPage.value,
    searchQuery: searchQuery.value,
    role_id:searchCriteria.value.role_id,
    state:searchCriteria.value.state,
    name:searchCriteria.value.name,
    identification:searchCriteria.value.identification,
  })
} 
 

onMounted(async () => { 
    await fetchUser()
})

watch(currentPage, async () => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})
watch(rowPerPage, async () => {
  currentPage.value =1
})
watchArray([currentPage, searchQuery, rowPerPage], async () => {
  await fetchUser()
})

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = users.value.length ? ((currentPage.value - 1) * totalPage.value) + 1 : 0
  const lastIndex = users.value.length + ((currentPage.value - 1) * totalPage.value)
  return `Mostrando ${firstIndex} a ${lastIndex} de ${totalData.value} registros`
})
 
const changeScreen = async (screen: string, userId: number|null = null) => {
  storeUser.clearFormulario()
  storeUser.typeAction = screen  
  if(userId)
    storeUser.fetchInfoUser(userId)
}

//Accion cambio de estado
const changeState = async(object:object,state:number) => {
  storeUser.changeState(object,state);
}

//LIMPIA VAMPOS A BUSCAR
const clearSearchCriteria = ()=>{
  searchCriteria.value = {};
  fetchUser();
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
      await storeUser.fetchDelete(id)
      await fetchUser()
    }
    else if (result.isDenied) {
    }
  })
}
</script>

<template>
  <div>
    <!-- INICIO CARD BUSQUEDA -->
      <VRow>
        <VCol cols="12">
          <VCard>
            <VCardActions>
              <VBtn color="orange-lighten-2" variant="text" @click="show = !show"> Criterios de búsqueda </VBtn>

              <VSpacer></VSpacer>

              <VBtn
                :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="show = !show"
              ></VBtn>
            </VCardActions>

            <VExpandTransition>
              <div v-show="show">
                <VDivider></VDivider>

                <VCardText>
                  <VRow>
                    <VCol cols="6">
                      <div>
                        <VSelect :items="arrayRoles"  item-title="name" v-model="searchCriteria.role_id" item-value="id" label="Tipo de usuario"></VSelect>
                      </div>

                      <div class="mt-4">
                        <VRow>
                          <VCol cols="12" sm="2" md="2">
                            <span>Estado</span>
                          </VCol>
                          <VCol cols="12" sm="4" md="4">
                            <VCheckbox
                              label="Activo"
                              :value="1"
                              v-model="searchCriteria.state"
                            ></VCheckbox>
                          </VCol>
                          <VCol cols="12" sm="4" md="4">
                            <VCheckbox
                              :value="0"
                              v-model="searchCriteria.state"
                              label="Inactivo"
                            ></VCheckbox>
                          </VCol>                         
                        </VRow>

                      </div>
                    </VCol>
                    <VCol cols="6">
                      <div>
                        <VTextField label="Usuario" v-model="searchCriteria.name"/>
                      </div>
                      <div class="mt-4">
                        <VTextField label="Número de identificación" v-model="searchCriteria.identification"/>
                      </div>
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="12 d-flex justify-content-center">
                      <VBtn color="primary" class="mr-2" @click="fetchUser">Buscar</VBtn>
                      <VBtn color="primary" @click="clearSearchCriteria">Limpiar Filtros</VBtn>
                    </VCol>
                  </VRow>
                </VCardText>
              </div>
            </VExpandTransition>
          </VCard>
        </VCol>
      </VRow>  
    <!-- FIN CARD -->

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
            Nombre usuario
          </th>
          <th scope="col">
            Número de identificación
          </th>
          <th scope="col">
            Teléfono
          </th>
          <th scope="col">
            Correo
          </th>
          <th scope="col">
            Rol
          </th> 
          <th scope="col">
            Acciones
          </th>
          <th scope="col">
            Estado
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-show="loading">
          <td colspan="6" >
            <PreloadInterno /> 
          </td>
        </tr>
        <tr
        v-show="!loading"
          v-for="(item,index) in users"
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
              {{ item.identification }}
            </span>
          </td>
          <td>
            <span>
              {{ item.phone }}
            </span>
          </td>
          <td>
            <span>
              {{ item.email }}
            </span>
          </td>
          <td>
            <span>{{ item.role }}</span>
          </td>
          <td>
            <VSwitch
              v-model="item.state"
              color="success"
              inset
              :value="item.state"
              :true-value="1"
              :false-value="0"
              hide-details
              @click="changeState(item,item.state)"
            ></VSwitch>
          </td> 
          <td
            class="text-center"
            style="width: 5rem;"
          >
            <VBtn 
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
  
      <tfoot v-show="!users.length">
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
  </div>
</template>
