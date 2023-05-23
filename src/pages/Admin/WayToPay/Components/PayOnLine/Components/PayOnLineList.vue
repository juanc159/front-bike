<script lang="ts" setup type="module">
import PreloadInterno from '@/componentsGlobal/PreloadInterno.vue';
import {useWayToPayPayOnLineStore} from '@/stores/Admin/useWayToPayPayOnLineStore';
import { AuthenticationStore } from '@/stores/Authentication';

const authentication = AuthenticationStore();
const payOnLineStoreWayToPay = useWayToPayPayOnLineStore();
const {payOnLines,currentPage, totalPage, links,totalData,loading} = storeToRefs(payOnLineStoreWayToPay);

const rowPerPage = ref<number>(10)
const searchQuery = ref<string>('')

const fetchGeneral = async () => {
  await payOnLineStoreWayToPay.fetchAll({
    company_id:authentication.company.id,
    perPage: rowPerPage.value,
    page: currentPage.value,
    searchQuery: searchQuery.value,
  })
}

watch(currentPage, async () => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})
watchArray([currentPage, searchQuery, rowPerPage], async () => {
  await fetchGeneral()
})

//Accion cambio de pantalla
const changeScreen = async (screen: string, obj: object|null = null) => {
  payOnLineStoreWayToPay.clearFormulario()
  payOnLineStoreWayToPay.typeAction = screen  


  console.log(obj);
  
  if (obj) {     
    const b = payOnLineStoreWayToPay.ledgerAccountAuxiliar.find(ele => ele.id === obj.ledger_account_auxiliary_id)
    if (!b) {
      payOnLineStoreWayToPay.ledgerAccountAuxiliar.push({
        id: obj.ledger_account_auxiliary_id,
        code: obj.ledger_account_auxiliary_code,
        name: obj.ledger_account_auxiliary_name,
      })
    } 
    
    const bb = payOnLineStoreWayToPay.paymentMethods.find(ele => ele.id === obj.payment_method_id)
    if (!bb) {
      payOnLineStoreWayToPay.paymentMethods.push({
        id: obj.payment_method_id,
        code: obj.payment_method_code,
        name: obj.payment_method_name,
      })
    }  
    if (obj.id)
      payOnLineStoreWayToPay.fetchInfoGeneral(obj.id)
  }

 
}

//Accion cambio de estado
const changeState = async(object:object,state:number) => {
  payOnLineStoreWayToPay.changeState(object,state);
}

// 👉 Computing pagination data
const paginationData = computed(() => {
  
  const firstIndex = payOnLines.value.length ? ((currentPage.value - 1) * totalPage.value) + 1 : 0
  const lastIndex = payOnLines.value.length + ((currentPage.value - 1) * totalPage.value)

  return `Mostrando ${firstIndex} a ${lastIndex} de ${totalData.value} registros`
})

onMounted(async () => {
  await fetchGeneral();
});
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
          <th scope="col">En uso</th>
          <th scope="col">Código</th>
          <th scope="col">Nombre</th>
          <th scope="col">Relacionado con</th>
          <th scope="col">Cuenta contable</th>
          <th scope="col">Medio de pago D. Electrónico</th>
          <th scope="col">Acciones</th>
        </tr>
    </thead>
    <tbody>
      <tr v-show="loading">
          <td colspan="7" >
            <PreloadInterno /> 
          </td>
        </tr>
      <tr
      v-show="!loading"
        v-for="(item,index) in payOnLines"
        :key="index"
        style="height: 3.75rem;"
      >
        <td>
            <v-switch
              v-model="item.in_use"
              color="success"
              inset
              :value="item.in_use"
              :true-value="1"
              :false-value="0"
              hide-details
              @click="changeState(item,item.in_use)"
            ></v-switch>
          </td>
          <td>
            <span> {{ item.code }} </span>
          </td>
          <td>
            <span> {{ item.name }} </span>
          </td>
          <td>
            <span> {{ item.related_to_name }} </span>
          </td>
          <td>
            <span> {{ item.ledger_account_auxiliary_name }} </span>
          </td>
          <td>
            <span> {{ item.payment_method_name }} </span>
          </td> 

        <td class="text-center" style="width: 5rem;">

          <VBtn
            icon
            size="x-small"
            color="default"
            variant="text"
            @click="changeScreen('form', item)"
          >
            <VIcon size="22" icon="tabler-edit"/>
          </VBtn>
        </td>
      </tr>
    </tbody>

    <!-- <tfoot v-show="!payOnLines.length">
      <tr>
        <td
          colspan="7"
          class="text-center"
        >
          No se encuentran resultados
        </td>
      </tr>
    </tfoot> -->
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
      :length="links"
    />
  </VContainer>
  </div>
</template>
