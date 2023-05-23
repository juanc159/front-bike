<script lang="ts" setup type="module">
import Swal from 'sweetalert2';
import ModalApproveToInvoice from '@/pages/Admin/Quotes/Components/ModalApproveToInvoice.vue'
import { useCrudQuoteStore } from '@/stores/Admin/useCrudQuoteStore'
import PreloadInterno from '@/componentsGlobal/PreloadInterno.vue';
import { AuthenticationStore } from "@/stores/Authentication";
import { useSelect2Infite } from "@/composables/useSelect2Infite";
import type IQuoteFormSearch from '@/interfaces/Admin/Quote/IQuoteFormSearch';
const authentication = AuthenticationStore();
const quouteStore = useCrudQuoteStore()


// menu data paginate 
const { selectedQuoteId,openModal, statesQuotes, quotes, totalPage, lastPage, currentPage, totalData, loading, showCriteriaSearch, searchQuote, pathExcel, customers_arrayInfo, customers_countLinks, userSeller_arrayInfo, userSeller_countLinks } = storeToRefs(quouteStore)
const rowPerPage = ref<number>(10)
const searchQuery = ref<string>('')
const sort_direction = ref("desc")
const sort_field = ref("name")

const change_sort = async (field: string) => {
  if (sort_field.value == field) {
    sort_direction.value = sort_direction.value == 'asc' ? 'desc' : 'asc';
  } else {
    sort_field.value = field;
  }
}

const fetchQuote = async () => {
  await quouteStore.fetchAll({
    perPage: rowPerPage.value,
    page: currentPage.value,
    searchQuery: searchQuery.value,
    sort_direction: sort_direction.value,
    sort_field: sort_field.value,
    company_id: authentication.company.id,
    customer_id: searchQuote.value.customer_id,
    seller_id: searchQuote.value.seller_id,
    date_ini: searchQuote.value.date_ini,
    date_fin: searchQuote.value.date_fin,
    statesQuotes_id: searchQuote.value.statesQuotes_id,
  })
}

//LIMPIA VAMPOS A BUSCAR
const clearsearchQuote = () => {
  searchQuote.value = {} as IQuoteFormSearch;
  fetchQuote();
}

onMounted(async () => {
  if (quouteStore.typeAction != "back")
    await fetchQuote()
})

watch(currentPage, async () => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})
watch(rowPerPage, async () => {
  currentPage.value = 1
})
watchArray([currentPage, searchQuery, rowPerPage, sort_direction, sort_field], async () => {
  await fetchQuote()
})

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = quotes.value.length ? ((currentPage.value - 1) * totalPage.value) + 1 : 0
  const lastIndex = quotes.value.length + ((currentPage.value - 1) * totalPage.value)
  return `Mostrando ${firstIndex} a ${lastIndex} de ${totalData.value} registros`
})

const changeScreen = async (screen: string, id: number | null = null) => {
  quouteStore.clearFormulario()
  quouteStore.typeAction = screen;
  if (id)
    quouteStore.fetchInfo(id)
}

//Eliminar 
const deleteData = async (id: number) => {
  Swal.fire({
    title: '¿Desea eliminar el registro?',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Si',
    denyButtonText: 'No',
  }).then(async result => {
    if (result.isConfirmed) {
      await quouteStore.fetchDelete(id)
      await fetchQuote()
    }
    else if (result.isDenied) {
    }
  })
}
//Anulando  
const cancelData = async (id: number, statesQuotes_id: number) => {
  Swal.fire({
    title: "¿Está seguro de anular el Registro seleccionado?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Si',
    denyButtonText: 'No',
  }).then(async result => {
    if (result.isConfirmed) {
      await quouteStore.changeState(id, statesQuotes_id)
      await fetchQuote()
    }
    else if (result.isDenied) {
    }
  })
}

//Aprobando
const approveDate = (id:number)=>{
  openModal.value = true
  selectedQuoteId.value = id
}

const selectInfinite_customers = useSelect2Infite(quouteStore.fetchCustomerOfThirdList, customers_arrayInfo, {
  company_id: authentication.company.id,
});
const selectInfinite_userSeller = useSelect2Infite(quouteStore.fetchSellerOfUserList, userSeller_arrayInfo, {
  company_id: authentication.company.id,
});
onMounted(async () => {
  await quouteStore.fetchDataForm(authentication.company.id);
  selectInfinite_customers.dataNueva.value = customers_arrayInfo.value;//lista clientes(tabla->third)
  selectInfinite_customers.totalLinks.value = customers_countLinks.value;//Paginado cliente(tabla->third)
  selectInfinite_userSeller.dataNueva.value = userSeller_arrayInfo.value;//lista Vendedor(tabla->users)
  selectInfinite_userSeller.totalLinks.value = userSeller_countLinks.value;//Paginado Vendedor(tabla->users)
});

//DESCARGAR EXCEL
const dowloadExcel = async () => {
  await quouteStore.excel({
    company_id: authentication.company.id,
    searchQuery: searchQuery.value,
  }).then(resp => {
    window.open(pathExcel.value, '_blank');
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
            <VBtn @click="showCriteriaSearch = !showCriteriaSearch" color="orange-lighten-2" variant="text">
              Criterios de búsqueda
            </VBtn>
            <VSpacer></VSpacer>
            <VBtn :icon="showCriteriaSearch ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              @click="showCriteriaSearch = !showCriteriaSearch"></VBtn>
          </VCardActions>

          <VExpandTransition>
            <div v-show="showCriteriaSearch">
              <VDivider></VDivider>
              <VCardText>
                <VRow>
                  <VCol cols="6">
                    <div>
                      <VSelect item-title="full_name" item-value="id" label="Cliente" v-model="searchQuote.customer_id"
                        :items="selectInfinite_customers.dataNueva.value">
                        <template v-slot:prepend-item>
                          <VTextField placeholder="Buscar..." class="mb-2"
                            v-model="selectInfinite_customers.searchQuery.value" />
                          <v-divider></v-divider>
                        </template>
                        <template v-slot:append-item>
                          <v-divider> </v-divider>
                          <div class="d-flex justify-content-center aling-items-center">
                            <v-progress-circular v-show="loading" size="24" color="primary"
                              indeterminate></v-progress-circular>
                          </div>
                          <div v-if="!loading" class="d-flex justify-content-between aling-items-center p-2">
                            <RouterLink :to="{ name: 'Admin-Third-Index' }"
                              class="app-logo d-flex align-center gap-x-3 app-title-wrapper">
                              <VBtn color="success">Crear Registro</VBtn>
                            </RouterLink>
                            <div>
                              <VBtn class="mt-2" :disabled="selectInfinite_customers.page.value <= 1"
                                @click="selectInfinite_customers.prev()" color="success">
                                <VIcon icon="mdi-chevron-left"></VIcon>
                              </VBtn>
                              <VBtn class="mt-2"
                                :disabled="selectInfinite_customers.page.value >= selectInfinite_customers.totalLinks.value"
                                @click="selectInfinite_customers.next()" color="success">
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
                      <VSelect item-title="name" item-value="id" v-model="searchQuote.seller_id"
                        :items="selectInfinite_userSeller.dataNueva.value" label="Vendedor">
                        <template v-slot:prepend-item>
                          <VTextField placeholder="Buscar..." class="mb-2"
                            v-model="selectInfinite_userSeller.searchQuery.value" />
                          <v-divider></v-divider>
                        </template>
                        <template v-slot:append-item>
                          <v-divider> </v-divider>
                          <div class="d-flex justify-content-center aling-items-center">
                            <v-progress-circular v-show="loading" size="24" color="primary"
                              indeterminate></v-progress-circular>
                          </div>
                          <div v-if="!loading" class="d-flex justify-content-between aling-items-center p-2">
                            <RouterLink :to="{ name: 'Admin-User-Index' }"
                              class="app-logo d-flex align-center gap-x-3 app-title-wrapper">
                              <VBtn color="success">Crear Registro</VBtn>
                            </RouterLink>
                            <div>
                              <VBtn class="mt-2" :disabled="selectInfinite_userSeller.page.value <= 1"
                                @click="selectInfinite_userSeller.prev()" color="success">
                                <VIcon icon="mdi-chevron-left"></VIcon>
                              </VBtn>
                              <VBtn class="mt-2"
                                :disabled="selectInfinite_userSeller.page.value >= selectInfinite_userSeller.totalLinks.value"
                                @click="selectInfinite_userSeller.next()" color="success">
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
                    <VTextField label="fecha inicio" type="date" v-model="searchQuote.date_ini" />
                  </VCol>
                  <VCol cols="6">
                    <VTextField label="fecha fin" type="date" v-model="searchQuote.date_fin" />
                  </VCol>
                </VRow>
                <VRow>
                  <VCol cols="6">
                    <VSelect clearable :items="statesQuotes" item-title="name" item-value="id"
                      v-model="searchQuote.statesQuotes_id" label="Estado"></VSelect>
                  </VCol>
                </VRow>
                <VRow>
                  <VCol cols="12 d-flex justify-content-center">
                    <VBtn color="primary" class="mr-2" @click="fetchQuote">Buscar</VBtn>
                    <VBtn color="primary" @click="clearsearchQuote">Limpiar Filtros</VBtn>
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
        <VBtn mt-2 size="x-small" color="default" variant="text" title="Descargar" @click="dowloadExcel()">
          <VTooltip location="top" activator="parent" transition="scroll-y-transition" variant="primary">
            <span>Descargar Excel</span>
          </VTooltip>
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
          <th class="w10">
            Tipo
          </th>
          <th>
            Cliente
          </th>
          <th>
            Vendedor
          </th>
          <th>
            Moneda
          </th>
          <th>
            Fecha
          </th>
          <th>
            Numero
          </th>
          <th>
            total bruto
          </th>
          <th>
            descuento
          </th>
          <th>
            subtotal
          </th>
          <th>
            Total neto
          </th>
          <th>
            Estado
          </th>
          <th>
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-show="loading">
          <td colspan="11">
            <PreloadInterno />
          </td>
        </tr>
        <tr v-show="!loading" v-for="(item, index) in quotes" :key="index" style="height: 3.75rem;">

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
          <td>
            <span>
              {{ item.state_name }}
            </span>
          </td>
          <td class="text-center" style="width: 5rem;">
            <VBtn icon size="x-small" color="error" variant="text" @click="deleteData(item.id)">
              <VTooltip location="top" activator="parent" transition="scroll-y-transition">
                <span>Eliminar</span>
              </VTooltip>
              <VIcon size="22" icon="tabler-trash" />
            </VBtn>

            <VBtn icon size="x-small" color="default" variant="text" @click="changeScreen('form', item.id)">
              <VTooltip location="top" activator="parent" transition="scroll-y-transition">
                <span>Editar</span>
              </VTooltip>
              <VIcon size="22" icon="tabler-edit" />
            </VBtn>
            <VBtn icon size="x-small" color="default" variant="text" @click="cancelData(item.id, 3)">
              <VTooltip location="top" activator="parent" transition="scroll-y-transition">
                <span>Anular</span>
              </VTooltip>
              <VIcon color="error" size="22" icon="tabler-circle-x" />
            </VBtn>

            <VBtn icon size="x-small" color="default" variant="text" @click="approveDate(item.id)">
              <VTooltip location="top" activator="parent" transition="scroll-y-transition">
                <span>Aprobar</span>
              </VTooltip>
              <VIcon color="success" size="22" icon="tabler-circle-check" />
            </VBtn>
          </td>
        </tr>
      </tbody>

      <tfoot v-show="!quotes.length">
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


    <ModalApproveToInvoice></ModalApproveToInvoice>
  </div>
</template>