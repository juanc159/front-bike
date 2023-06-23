<script lang="ts" setup>
import { useToast } from '@/composables/useToast';
import { useCrudIncomeVehicleStore } from '@/stores/Admin/useCrudIncomeVehicleStore';
import { useAuthenticationStore } from '@/stores/useAuthenticationStore';
import { integerValidator, requiredValidator } from '@validators';
import { VForm } from 'vuetify/components';
import { VDataTable } from 'vuetify/labs/VDataTable';
const props = defineProps({
  userId: {
    type: Number,
    default: null,
    required: false,
  },
  btnBack: {
    type: Boolean,
    default: true,
    required: false
  }
})
const toast = useToast()
const headers = [
  { title: 'Nombre', key: 'name' },
  { title: 'Valor', key: 'amount' },
  { title: 'Acción', key: 'action' },
]

const formValidation = ref<VForm>()
const authentication = useAuthenticationStore()
const incomeVehicleStore = useCrudIncomeVehicleStore()
const { formulario, operatives, typeArrangement } = storeToRefs(incomeVehicleStore)
const errors = ref<Array<string>>([])

const arrayValidation = ref<Array<string | boolean>>([])

const changeScreen = async (typeAction: string) => {
  incomeVehicleStore.typeAction = typeAction
  arrayValidation.value = []
  errors.value = []
  await formValidation.value?.resetValidation()
  if (typeAction != 'back')
    incomeVehicleStore.keyList++
}

const totalCost = computed(() => {
  return Number(formulario.value.value_labor ?? 0) + Number(formulario.value.value_parts ?? 0)
})

const valueLabor60 = computed(() => {
  return Number(formulario.value.value_labor ?? 0) * 60 / 100
})

const valueLabor40 = computed(() => {
  return Number(formulario.value.value_labor ?? 0) * 40 / 100
})

const submitForm = async () => {
  formulario.value.company_id = authentication.company.id
  formulario.total_costs = totalCost.value
  formulario.paid_labor = valueLabor60.value
  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    const data = await incomeVehicleStore.fetchSave()
    if (data.status === 200) {
      changeScreen('list')
    }
    if (data.status === 422) errors.value = data.error // muestra error del back
  }
}

interface IarrayTypeArrangement {
  id?: null | number,
  type_id: null | number,
  name: null | string,
  amount: null | number
}
const formValidate = ref<VForm>()
const arrayTypeArrangement = ref<Array<IarrayTypeArrangement>>([])
const arrayNoDelete = computed(() => {
  return arrayTypeArrangement.value.filter(ele => ele.delete != 'delete')
})
const form = ref({
  type: null,
  amount: null
})

const clearForm = () => {
  form.value = {
    type: null,
    amount: null
  }
}
const addTypeArrangement = (async () => {
  const validation = await formValidate.value?.validate()
  if (validation?.valid) {
    const search = arrayTypeArrangement.value.find(ele => ele.type_id == form.value.type)
    if (!search) {
      const obj = typeArrangement.value.find(ele => ele.id == form.value.type)
      arrayTypeArrangement.value.push({
        type_id: form.value.type,
        name: obj.name,
        amount: form.value.amount,
      })
    } else {
      toast.toast('Este Tipo De Arreglo Ya Esta Seleccionado', '', 'danger')
    }
  }
  clearForm()
})
const deleteTypeArrangement = (async (index: number) => {
  if (arrayTypeArrangement.value[index].id) {
    console.log('if')
    arrayTypeArrangement.value[index].delete = 'delete'
  } else {
    console.log('else')
    arrayTypeArrangement.value.splice(index, 1)
  }
})
onMounted(async () => {
  await incomeVehicleStore.fetchDataForm()
  if (props.userId)
    await incomeVehicleStore.fetchInfo(props.userId)
})
</script>

<template>
  <div>
    <VRow v-if="props.btnBack == true">
      <VCol cols="12">
        <div class="col-md-6 d-flex justify-content-end">
          <VBtn color="secondary" @click="changeScreen('back')">
            Atras
          </VBtn>
        </div>
      </VCol>
    </VRow>
    <VForm ref="formValidation" lazy-validation>
      <VRow>
        <VCol cols="12" md="4" class="mt-1">
          <AppDateTimePicker v-model="formulario.date_init" label="Fecha Ingreso" />
        </VCol>
        <VCol cols="12" md="4" class="mt-2">
          <VSelect :items="operatives" v-model="formulario.mecanic_id" label="Operario" item-value="id" item-title="name"
            :rules="[requiredValidator]" class="mt-5"></VSelect>
        </VCol>
        <VCol cols="12" md="4" class="mt-2">
          <VSelect :items="['Moto', 'Carro']" v-model="formulario.type_vehicle" label="Tipo de Vehículo"
            :rules="[requiredValidator]" class="mt-5"></VSelect>
        </VCol>
        <VCol cols="12" md="4" class="mt-5">
          <VTextField v-model="formulario.utilites" :rules="[requiredValidator]" autocomplete="off"
            :error-messages="errors.utilites" label="Utilidades" @keypress="errors.utilites = ''" class="mt-3" disabled />
        </VCol>
        <VCol cols="12" md="4" class="mt-5">
          <VTextField v-model="formulario.brand" :rules="[requiredValidator]" autocomplete="off"
            :error-messages="errors.brand" label="Marca" @keypress="errors.brand = ''" class="mt-3" />
        </VCol>
        <VCol cols="12" md="4" class="mt-2">
          <VSelect :items="['Si', 'No']" v-model="formulario.pay_labor" label="Pago Mano De Obra"
            :rules="[requiredValidator]" class="mt-5">
          </VSelect>
        </VCol>
        <VCol cols="12" md="4" class="mt-5">
          <VTextField v-model="formulario.plate" :rules="[requiredValidator]" autocomplete="off"
            :error-messages="errors.plate" label="Placa" @keypress="errors.plate = ''" />
        </VCol>
        <VCol cols="12" md="4" class="mt-5">
          <VTextField v-model="formulario.value_labor" :rules="[requiredValidator, integerValidator]" autocomplete="off"
            :error-messages="errors.value_labor" label="Valor Mano De Obra" @keypress="errors.value_labor = ''"
            type="number" />
        </VCol>
        <VCol cols="12" md="4" class="mt-5">
          <VTextField v-model="formulario.value_parts" :rules="[requiredValidator]" autocomplete="off"
            :error-messages="errors.value_parts" label="Valor Repuestos" @keypress="errors.value_parts = ''"
            type="number" />
        </VCol>
        <VCol cols="12" md="4" class="mt-5">
          <VTextField v-model="valueLabor60" :rules="[requiredValidator]" autocomplete="off"
            :error-messages="errors.paid_labor60" label="Valor Mano De Obra 60%" @keypress="errors.paid_labor = ''"
            class="mt-3" />
        </VCol>
        <VCol cols="12" md="4" class="mt-5">
          <VTextField v-model="valueLabor40" :rules="[requiredValidator]" autocomplete="off"
            label="Valor Mano De Obra 40%" class="mt-3" />
        </VCol>
        <VCol cols="12" md="4" class="mt-1">
          <AppDateTimePicker v-model="formulario.date_pay_labor" label="Fecha Pago Mano De Obra" />
        </VCol>
        <VCol cols="12" md="4" class="mt-3">
          <VTextField v-model="totalCost" :rules="[requiredValidator]" autocomplete="off"
            :error-messages="errors.total_costs" label="Total Costos" @keypress="errors.total_costs = ''" class="mt-2"
            disabled />
        </VCol>
      </VRow>
    </VForm>
    <VForm ref="formValidate" lazy-validation>
      <VRow>
        <VCol cols="12" md="5" class="">
          <VSelect :items="typeArrangement" label="Tipo De Arreglo" v-model="form.type" item-value="id" item-title="name"
            :rules="[requiredValidator]" class="mt-5">
          </VSelect>
        </VCol>
        <VCol cols="12" md="5" class="mt-3">
          <VTextField v-model="form.amount" class="mt-2" label="Valor" type="number"
            :rules="[requiredValidator, integerValidator]" />
        </VCol>
        <VCol cols="12" md="2" class="mt-0">
          <VBtn color="primary" icon="tabler-plus" class="ml-2 mt-3" @click="addTypeArrangement()" />
        </VCol>
      </VRow>
    </VForm>
    <VCol cols="12" md="12" class="mt-2 d-flex mb-5">
      <VDataTable :headers="headers" :items="arrayNoDelete" height="300" fixed-header>
        <!-- full name -->
        <template #bottom>

        </template>
        <template #item.action="{ item, index }">
          <VBtn color="error" icon="tabler-trash" @click="deleteTypeArrangement(index)" size="30" />
        </template>
      </VDataTable>
    </VCol>
    <VRow>
      <VCol cols="12 d-flex justify-content-center">
        <VBtn color="primary" @click="submitForm">
          Guardar
        </VBtn>
      </VCol>
    </VRow>
  </div>
</template>












