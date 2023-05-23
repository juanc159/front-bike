<script lang="ts" setup type="module">
import Swal from 'sweetalert2';
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { useCrudInvoiceStore } from '@/stores/Admin/useCrudInvoiceStore'
import PreloadInterno from '@/componentsGlobal/PreloadInterno.vue';
import { AuthenticationStore } from "@/stores/Authentication"; 
import { useSelect2Infite } from "@/composables/useSelect2Infite";
const authentication = AuthenticationStore();
const { theme } = useThemeConfig()


const invoiceStore = useCrudInvoiceStore()


// menu data paginate 
const { invoices, totalPage, lastPage, currentPage, totalData, loading,showInvoice,searchInvoice,pathExcel,customers_arrayInfo,customers_countLinks,userSeller_arrayInfo,userSeller_countLinks } = storeToRefs(invoiceStore)
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

const fetchInvoice = async () => {
  await invoiceStore.fetchAll({
    perPage: rowPerPage.value,
    page: currentPage.value,
    searchQuery: searchQuery.value,
    sort_direction: sort_direction.value,
    sort_field: sort_field.value,
    company_id: authentication.company.id,
    customer_id: searchInvoice.value.customer_id,
    seller_id: searchInvoice.value.seller_id,
    date_ini: searchInvoice.value.date_ini,
    date_fin: searchInvoice.value.date_fin,
  })
}

//LIMPIA VAMPOS A BUSCAR
const clearsearchInvoice = ()=>{
  searchInvoice.value = {};
  fetchInvoice();
}

onMounted(async () => {
  if (invoiceStore.typeAction != "back")
    await fetchInvoice()
})

watch(currentPage, async () => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})
watch(rowPerPage, async () => {
  currentPage.value =1
})
watchArray([currentPage, searchQuery, rowPerPage,sort_direction,sort_field], async () => {
  await fetchInvoice()
})

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = invoices.value.length ? ((currentPage.value - 1) * totalPage.value) + 1 : 0
  const lastIndex = invoices.value.length + ((currentPage.value - 1) * totalPage.value)
  return `Mostrando ${firstIndex} a ${lastIndex} de ${totalData.value} registros`
})

const changeScreen = async (screen: string, invoiceId: number | null = null) => {
  invoiceStore.clearFormulario()
  invoiceStore.typeAction = screen;
  if (invoiceId)
    invoiceStore.fetchInfoInvoice(invoiceId)
}

//Eliminar invoice
const deleteData = async (id: number) => {
  Swal.fire({
    title: '¿Desea eliminar el registro?',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Si',
    denyButtonText: 'No',
  }).then(async result => {
    if (result.isConfirmed) {
      await invoiceStore.fetchDelete(id)
      await fetchInvoice()
    }
    else if (result.isDenied) {
    }
  })
} 

const selectInfinite = useSelect2Infite(invoiceStore.fetchCustomerOfThirdList, customers_arrayInfo, {
company_id: authentication.company.id,
});
const selectInfinite1 = useSelect2Infite(invoiceStore.fetchSellerOfUserList, userSeller_arrayInfo, {
  company_id: authentication.company.id,
});
onMounted(async () => {
  await invoiceStore.fetchDataForm(authentication.company.id); 
  selectInfinite.dataNueva.value = customers_arrayInfo.value;//lista clientes(tabla->third)
  selectInfinite.totalLinks.value = customers_countLinks.value;//Paginado cliente(tabla->third)
  selectInfinite1.dataNueva.value = userSeller_arrayInfo.value;//lista Vendedor(tabla->users)
  selectInfinite1.totalLinks.value = userSeller_countLinks.value;//Paginado Vendedor(tabla->users)
});

//DESCARGAR EXCEL
const dowloadExcel = async() => {
  await invoiceStore.excel({
    company_id: authentication.company.id,
    searchQuery: searchQuery.value,
  }).then(resp =>{
    window.open(pathExcel.value,'_blank');
  });
}
</script>

<template>
  <div>
    <!-- INICIO CARD BUSQUEDA -->
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardActions>
            <VBtn @click="showInvoice = !showInvoice" color="orange-lighten-2" variant="text">
              Criterios de búsqueda
            </VBtn>
            <VSpacer></VSpacer>
            <VBtn
              :icon="showInvoice ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              @click="showInvoice = !showInvoice"
            ></VBtn>
          </VCardActions>

          <VExpandTransition>
            <div v-show="showInvoice">
              <VDivider></VDivider>

              <VCardText>
                <VRow>
                    <VCol cols="6">
                      <div>
                        <VSelect  item-title="full_name" item-value="id" label="Cliente"
                        v-model="searchInvoice.customer_id" :items="selectInfinite.dataNueva.value"
                        >
                        <template v-slot:prepend-item>
                          <VTextField placeholder="Buscar..." class="mb-2" v-model="selectInfinite.searchQuery.value" />
                          <v-divider></v-divider>
                        </template>
                        <template v-slot:append-item>
                          <v-divider> </v-divider>
                          <div class="d-flex justify-content-center aling-items-center">
                            <v-progress-circular v-show="loading" size="24" color="primary" indeterminate></v-progress-circular>
                          </div>
                          <div v-if="!loading" class="d-flex justify-content-between aling-items-center p-2">
                            <RouterLink :to="{ name: 'Admin-TypesReceiptInvoice-Index' }"
                              class="app-logo d-flex align-center gap-x-3 app-title-wrapper">
                              <VBtn color="success">Crear Registro</VBtn>
                            </RouterLink>
                            <div>
                              <VBtn class="mt-2" :disabled="selectInfinite.page.value <= 1" @click="selectInfinite.prev()"
                                color="success">
                                <VIcon icon="mdi-chevron-left"></VIcon>
                              </VBtn>
                              <VBtn class="mt-2" :disabled="selectInfinite.page.value >= selectInfinite.totalLinks.value"
                                @click="selectInfinite.next()" color="success">
                                <VIcon icon="mdi-chevron-right"></VIcon>
                              </VBtn>
                            </div>
                          </div>
                        </template>
                      </VSelect>
                      </div>
                    </VCol>
                    <VCol cols="6">
                      <div>
                        <VSelect  item-title="name" item-value="id"
                        v-model="searchInvoice.seller_id" :items="selectInfinite1.dataNueva.value" label="Vendedor"
                        >
                        <template v-slot:prepend-item>
                          <VTextField placeholder="Buscar..." class="mb-2" v-model="selectInfinite1.searchQuery.value" />
                          <v-divider></v-divider>
                        </template>
                        <template v-slot:append-item>
                          <v-divider> </v-divider>
                          <div class="d-flex justify-content-center aling-items-center">
                            <v-progress-circular v-show="loading" size="24" color="primary" indeterminate></v-progress-circular>
                          </div>
                          <div v-if="!loading" class="d-flex justify-content-between aling-items-center p-2">
                            <RouterLink :to="{ name: 'Admin-TypesReceiptInvoice-Index' }"
                              class="app-logo d-flex align-center gap-x-3 app-title-wrapper">
                              <VBtn color="success">Crear Registro</VBtn>
                            </RouterLink>
                            <div>
                              <VBtn class="mt-2" :disabled="selectInfinite1.page.value <= 1" @click="selectInfinite1.prev()"
                                color="success">
                                <VIcon icon="mdi-chevron-left"></VIcon>
                              </VBtn>
                              <VBtn class="mt-2" :disabled="selectInfinite1.page.value >= selectInfinite1.totalLinks.value"
                                @click="selectInfinite1.next()" color="success">
                                <VIcon icon="mdi-chevron-right"></VIcon>
                              </VBtn>
                            </div>
                          </div>
                        </template>
                      </VSelect>
                      </div>
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="6">
                      <div>
                        <VTextField label="fecha inicio" type="date" v-model="searchInvoice.date_ini"/>
                      </div>
                    </VCol>
                    <VCol cols="6">
                      <div>
                        <VTextField label="fecha fin" type="date" v-model="searchInvoice.date_fin"/>
                      </div>
                    </VCol>
                  </VRow>
                <VRow>
                  <VCol cols="12 d-flex justify-content-center">
                    <VBtn color="primary" class="mr-2" @click="fetchInvoice">Buscar</VBtn>
                    <VBtn color="primary" @click="clearsearchInvoice">Limpiar Filtros</VBtn>
                  </VCol>
                </VRow>
              </VCardText>
            </div>
          </VExpandTransition>
        </VCard>
      </VCol>
    </VRow>
    <!-- FIN CARD -->
    <VContainer fluid class="d-flex flex-wrap py-4 gap-4">
      <div class="me-3" style="width: 80px;">
        <VSelect v-model="rowPerPage" density="compact" variant="outlined" :items="[10, 20, 30, 50]" />
      </div>
      <div class="me-3" style="width: 80px">
        <VBtn
              mt-2
              size="x-small"
              color="default"
              variant="text"
              title="Descargar"
              @click="dowloadExcel()"
            >
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

    <VTable class="text-no-wrap" >
      <thead>
        <tr> 
          <th class="w10">
            Tipo
          </th>
          <th scope="col">
            Cliente
          </th>
          <th scope="col">
            Vendedor
          </th>
          <th scope="col">
            Moneda
          </th>
          <th scope="col">
            Fecha
          </th>
          <th scope="col">
            Numero
          </th>
          <th scope="col">
            total bruto
          </th>
          <th scope="col">
            descuento
          </th>
          <th scope="col">
            subtotal
          </th>
          <th scope="col">
            Total neto
          </th>
          <th scope="col">
            Acciones
          </th>
        </tr>
      </thead>

      <div v-show="true" style="display: flex; justify-content: center;  align-items: center;flex-direction: column;" >
        
      </div>

      <tbody>
        <tr v-show="loading">
          <td colspan="11" >
            <PreloadInterno /> 
          </td>
        </tr>
        <tr v-show="!loading" v-for="(item, index) in invoices" :key="index" style="height: 3.75rem;">
        
          <td>
            <span>
              {{ item.type_name }}
            </span>
          </td>
          <td>
            <span>
                {{ item.third_name }}
            </span>
          </td>
          <td>
            <span>
                {{ item.user_name }}
            </span>
          </td>
          <td>
            <span>
                {{ item.currency_name }}
            </span>
          </td>
          <td>
            <span>
                {{ item.date_elaboration }}
            </span>
          </td>
          <td>
            <span>
                {{ item.number }}
            </span>
          </td>
          <td>
            <span>
                {{ item.gross_total }}
            </span>
          </td>
          <td>
            <span>
                {{ item.discount }}
            </span>
          </td>
          <td>
            <span>
                {{ item.subtotal }}
            </span>
          </td>
          <td>
            <span>
                {{ item.net_total }}
            </span>
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

      <tfoot v-show="!invoices.length">
        <tr>
          <td colspan="11" class="text-center">
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
