<script lang="ts" setup type="module">
import { useCrudMecanicStore } from '@/stores/Admin/useCrudMecanicStore';
import { useAuthenticationStore } from '@/stores/useAuthenticationStore';
import { VDataTable } from 'vuetify/labs/VDataTable';

import { useCrudIncomeVehicleStore } from '@/stores/Admin/useCrudIncomeVehicleStore';
const vehicleincomeStore = useCrudIncomeVehicleStore()


const authentication = useAuthenticationStore()
const mecanicStore = useCrudMecanicStore()

//  data paginate
const { formulario, incomeVehiclesSi, incomeVehiclesNo } = storeToRefs(mecanicStore)

const changeScreen = async (screen: string, id: number | null = null) => {
  mecanicStore.clearFormulario()
  mecanicStore.typeAction = screen
  if (id)
    vehicleincomeStore.fetchInfo(id)
}

const headersNo = [
  { title: 'Tipo de vehiculo', key: 'type_vehicle' },
  { title: 'Marca', key: 'brand' },
  { title: 'Fecha de ingreso', key: 'date_init' },
  { title: 'Pago mano de obra', key: 'pay_labor' },
  { title: 'Valor mano de obra 60%', key: 'paid_labor' },
  { title: 'Fecha Pago Mano De Obra', key: 'date_pay_labor' },
]
const headersSi = [
  { title: 'Tipo de vehiculo', key: 'type_vehicle' },
  { title: 'Marca', key: 'brand' },
  { title: 'Fecha de ingreso', key: 'date_init' },
  { title: 'Pago mano de obra', key: 'pay_labor' },
  { title: 'Valor mano de obra 60%', key: 'paid_labor' },
  { title: 'Fecha Pago Mano De Obra', key: 'date_pay_labor' },
  { title: 'Acción', key: 'actions' },
]

const selected = ref([])
const loading = ref<boolean>(false)

const total_sum = computed(() => {
  const arrayNew = incomeVehiclesNo.value.filter(ele => selected.value.includes(ele.id))
  return arrayNew.reduce((acumulator, currentValue) => acumulator + Number(currentValue.paid_labor ?? 0) ?? 0, 0)
})


const pay = async () => {
  loading.value = true
  await mecanicStore.fetchPay({
    mecanic_id: formulario.value.id,
    totalPay: total_sum.value,
    selected: selected.value,
  })
  await mecanicStore.fetchInfo({
    id: formulario.value.id
  })
  loading.value = false
}

const search = ref({
  dateInitial: null,
  dateFinal: null
})


const searchData = async () => {
  await mecanicStore.fetchInfo({
    id: formulario.value.id,
    dateInitial: search.value.dateInitial,
    dateFinal: search.value.dateFinal,
  })
}


</script>

<template>
  <div>
    <VContainer fluid>
      <VRow>
        <VCol cols="12" sm="5">
          <AppDateTimePicker label="Fecha inicial" v-model="search.dateInitial"></AppDateTimePicker>
        </VCol>
        <VCol cols="12" sm="5">
          <AppDateTimePicker label="Fecha final" v-model="search.dateFinal"></AppDateTimePicker>
        </VCol>
        <VCol cols="12" sm="2" class="  mt-7">
          <VBtn color="primary" @click="searchData()">Buscar</VBtn>
        </VCol>
      </VRow>

    </VContainer>


    <VDivider />

    <VDataTable :headers="headersNo" :items="incomeVehiclesNo" :items-per-page="5" v-model="selected" :show-select="true">
    </VDataTable>

    <VDivider />
    <div class="d-flex justify-content-end my-4">

      <VCard width="400px">
        <VCardText>
          <VRow>
            <VCol>

              <h3>Total a pagar </h3> {{ total_sum }}
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <VBtn :loading="loading" color="success" @click="pay()">Pagar</VBtn>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </div>


    <VDivider class="mt-6" />

    <VDataTable :headers="headersSi" :items="incomeVehiclesSi" :items-per-page="5">
      <template #item.actions="{ item }">
        <VBtn icon size="x-small" color="default" variant="text" @click="changeScreen('visualizeData', item.raw.id)">
          <VIcon size="22" icon="mdi-eye" />
        </VBtn>
      </template>
    </VDataTable>
  </div>
</template>

<style > .v-selection-control__input input {
   width: 15px;
   height: 15px;
   border: 1px solid black;
   border-radius: 10px;
   opacity: 1;
 }
</style>
