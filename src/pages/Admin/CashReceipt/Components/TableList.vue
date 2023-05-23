<script lang="ts" setup type="module">
import Swal from 'sweetalert2';

import { useCrudCashReceiptStore } from '@/stores/Admin/useCrudCashReceiptStore';
import { AuthenticationStore } from '@/stores/Authentication';
import PreloadInterno from '@/componentsGlobal/PreloadInterno.vue';

const authentication = AuthenticationStore();
const cashReceiptStore = useCrudCashReceiptStore()
 

// cashReceipts data paginate 
const {cashReceipts, totalPage, lastPage, currentPage, totalData,loading} = storeToRefs(cashReceiptStore)
const rowPerPage = ref<number>(10)
const searchQuery = ref<string>('')

const fetchCashReceipts = async () => {
  await cashReceiptStore.fetchAll({
    company_id:authentication.company.id,
    perPage: rowPerPage.value,
    page: currentPage.value,
    searchQuery: searchQuery.value,
  })
} 
 

onMounted(async () => { 
    await fetchCashReceipts()
})

watch(currentPage, async () => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})
watch(rowPerPage, async () => {
  currentPage.value =1
})
watchArray([currentPage, searchQuery, rowPerPage], async () => {
  console.log(searchQuery.value);
  await fetchCashReceipts()
})

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = cashReceipts.value.length ? ((currentPage.value - 1) * totalPage.value) + 1 : 0
  const lastIndex = cashReceipts.value.length + ((currentPage.value - 1) * totalPage.value)
  return `Mostrando ${firstIndex} a ${lastIndex} de ${totalData.value} registros`
})
 
const changeScreen = async (screen: string, cashReceiptId: number|null = null) => {
  cashReceiptStore.clearFormulario();
  cashReceiptStore.clearFormArchive();
  cashReceiptStore.typeAction = screen  
  if(cashReceiptId && screen === 'form')
    cashReceiptStore.fetchInfoCashReceipt(cashReceiptId)
  if(cashReceiptId && screen === 'printPdf')
    cashReceiptStore.fetchInfoPdf(cashReceiptId)
}

/* const deleteData = async (id: number) => {
  Swal.fire({
    title: '¿Desea eliminar el registro?',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Si',
    denyButtonText: 'No',
  }).then(async result => {
    if (result.isConfirmed) {
      //await cashReceiptStore.fetchDelete(id)
      await fetchCashReceipts()
    }
    else if (result.isDenied) {
    }
  })
} */
</script>

<template>
  <div>
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
            Numero
          </th>
          <th scope="col">
            Fechas elaboración
          </th>
          <th scope="col">
            Tipo
          </th>
          <th scope="col">
            Cliente
          </th>
          <th scope="col">
            Realizar un
          </th> 
          <th scope="col">
            Moneda
          </th> 
          <th scope="col">
            Acciones
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
          v-for="(item,index) in cashReceipts"
          :key="index"
          style="height: 3.75rem;"
        > 
          <td>
            <span>
              {{ item.number }}
            </span>
          </td>
          <td>
            <span>
              {{ item.date_elaboration }}
            </span>
          </td>
          <td>
            <span>
              {{ item.title }}
            </span>
          </td>
          <td>
            <span>
              {{ item.customerName }}
            </span>
          </td>
          <td>
            <span>{{ item.performName }}</span>
          </td>
          <td>
            <span>{{ item.currencieName }}</span>
          </td> 
          <td
            class="text-center"
            style="width: 5rem;"
          >  
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
              icon
              size="x-small"
              color="default"
              variant="text"
              title="Imprimir recibo de caja"
              @click="changeScreen('printPdf', item.id)"
            >
              <VIcon
                size="22"
                icon="fa-print"
              />
            </VBtn>
          </td>          
        </tr>
      </tbody>
  
      <tfoot v-show="!cashReceipts.length">
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
