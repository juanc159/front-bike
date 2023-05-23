<script lang="ts" setup type="module">
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { useCrudPayrollStore } from '@/stores/Admin/useCrudPayrollStore'
import PreloadInterno from '@/componentsGlobal/PreloadInterno.vue';
import { AuthenticationStore } from "@/stores/Authentication";  
const authentication = AuthenticationStore();
const { theme } = useThemeConfig()


const payrollStore = useCrudPayrollStore()


// menu data paginate 
const { payrolls, totalPage, lastPage, currentPage, totalData, loading } = storeToRefs(payrollStore)
const rowPerPage = ref<number>(10)
const searchQuery = ref<string>('')
const sort_direction =ref("desc")
const sort_field =ref("name")

const change_sort = async (field:string) => {
  if (sort_field.value == field) {
    sort_direction.value = sort_direction.value == 'asc' ? 'desc' : 'asc';
  } else {
    sort_field.value = field;
  } 
}

const fetchPayroll = async () => {
  await payrollStore.fetchAll({
    company_id:authentication.company.id,
    perPage: rowPerPage.value,
    page: currentPage.value,
    searchQuery: searchQuery.value,
    sort_direction: sort_direction.value,
    sort_field: sort_field.value,
  })
}


onMounted(async () => {
  if (payrollStore.typeAction != "back")
    await fetchPayroll()
})

watch(currentPage, async () => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})
watch(rowPerPage, async () => {
  currentPage.value =1
})
watchArray([currentPage, searchQuery, rowPerPage,sort_direction,sort_field], async () => {
  await fetchPayroll()
})

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = payrolls.value.length ? ((currentPage.value - 1) * totalPage.value) + 1 : 0
  const lastIndex = payrolls.value.length + ((currentPage.value - 1) * totalPage.value)
  return `Mostrando ${firstIndex} a ${lastIndex} de ${totalData.value} registros`
})

const changeScreen = async (screen: string, payrollId: number | null = null) => {
  payrollStore.clearFormulario()
  payrollStore.typeAction = screen
  payrollStore.fetchDataFormRefresh(authentication.company.id)
  //if (payrollId)
    //payrollStore.fetchInfo(payrollId)
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

    <VTable class="text-no-wrap" >
      <thead>
        <tr> 
          <th class="w10">
            <a href="#" :class="theme == 'dark' ? 'text-white' : 'text-primary'"
              @click.prevent="change_sort('name')">
              <VIcon v-if="sort_direction == 'desc' && sort_field == 'name'" icon="mdi-arrow-up-bold"></VIcon>
              <VIcon v-else-if="sort_direction == 'asc' && sort_field == 'name'" icon="mdi-arrow-down-bold"></VIcon>
              <span class="ml-2">Nombre</span>
            </a>
          </th>
          <th scope="col">
            N° Identificación
          </th>
          <th scope="col">
            Mes
          </th>
          <th scope="col">
            Año
          </th>
        </tr>
      </thead>

      <div v-show="true" style="display: flex; justify-content: center;  align-items: center;flex-direction: column;" >
        
      </div>

      <tbody>
        <tr v-show="loading">
          <td colspan="2" >
            <PreloadInterno /> 
          </td>
        </tr>
        <tr v-show="!loading" v-for="(item, index) in payrolls" :key="index" style="height: 3.75rem;">
        
          <td>
            <span>
              {{ item.name }}
            </span>
          </td>
          <td>
            <span>
                {{ item.settlement_type }}
            </span>
          </td>
          <td>
            <span>
                {{ item.month }}
            </span>
          </td>
          <td>
            <span>
                {{ item.year }}
            </span>
          </td>
        </tr>
      </tbody>

      <tfoot v-show="!payrolls.length">
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
