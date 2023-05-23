<script lang="ts" setup type="module">
import Swal from 'sweetalert2';
import { AuthenticationStore } from '@/stores/Authentication';
import { useCrudCompanyStore } from "@/stores/Admin/useCrudCompanyStore";
import PreloadInterno from '@/componentsGlobal/PreloadInterno.vue';

const  companyStoreUseCrud = useCrudCompanyStore();
const auth = AuthenticationStore();
const router = useRouter(); 
const { currentPage,totalPage, lastPage, totalData,companies, loading } =
  storeToRefs(companyStoreUseCrud);

// menu data paginate
const rowPerPage = ref<number>(10)
const searchQuery = ref<string>('')

const fetchCompanies = async () => {
  await companyStoreUseCrud.fetchAll({
    user_id:auth.user.id,
    perPage: rowPerPage.value,
    page: currentPage.value,
    searchQuery: searchQuery.value,
  })
}

onMounted(async () => {  
  await fetchCompanies(); 
  
})

watch(currentPage, async () => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})
watch(rowPerPage, async () => {
  currentPage.value =1
})
watchArray([currentPage, searchQuery, rowPerPage], async () => {
  await fetchCompanies()
})

// 👉 Computing pagination data
const paginationData = computed(() => {
  
  const firstIndex = companies.value.length ? ((currentPage.value - 1) * totalPage.value) + 1 : 0
  const lastIndex = companies.value.length + ((currentPage.value - 1) * totalPage.value)

  return `Mostrando ${firstIndex} a ${lastIndex} de ${totalData.value} registros`
})

const changeScreen = async (screen: string, companyId?: number) => {
  companyStoreUseCrud.clearFormulario();
  companyStoreUseCrud.typeAction = screen 
  if (companyId) {
    companyStoreUseCrud.fetchInfoCompany(companyId)
  };
}


const selectCompany = (company:object)=>{
  auth.company = company;
  router.push({ name: 'index' })
}

//Accion cambio de estado
const changeState = async(object:object,state:number) => {
  companyStoreUseCrud.changeState(object,state);
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
      await companyStoreUseCrud.fetchDelete(id)
      await fetchCompanies()
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
          Crear empresa
        </VBtn> 
    </div>
  </VContainer>

  <VDivider />

  <VTable class="text-no-wrap">
    <thead>
      <tr>
        <th scope="col">
          Empresa
        </th>
        <th scope="col">
          Nit
        </th>
        <th scope="col">
          Plan
        </th>
        <th scope="col">
          Nombre representante
        </th>
        <th scope="col">
          Teléfono representante
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
          <td colspan="7" >
            <PreloadInterno /> 
          </td>
        </tr>
      <tr v-show="!loading"
        v-for="(item,index) in companies"
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
            {{ item.nit }}
          </span>
        </td>
        <td>
          <span>
            Plan
          </span>
        </td>  
        <td>
          <span>
            {{ item.nameLegalRepresentative }}
          </span>
        </td> 
        <td>
          <span>
            {{ item.phoneLegalRepresentative }}
          </span>
        </td> 
        <td>
            <v-switch
              v-model="item.state"
              color="success"
              inset
              :value="item.state"
              :true-value="1"
              :false-value="0"
              hide-details
              @click="changeState(item,item.state)"
            ></v-switch>
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
          <VBtn
          v-show="item.state === 1"
            color="primary"
            @click="selectCompany(item)"
          >
            Ingresar
          </VBtn>
        </td>
      </tr>
    </tbody>

    <tfoot v-show="!companies.length">
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
