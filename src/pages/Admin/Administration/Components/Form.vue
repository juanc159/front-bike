<script lang="ts" setup>
import { useCrudAdministrationStore } from '@/stores/Admin/useCrudAdministrationStore';
import { useAuthenticationStore } from '@/stores/useAuthenticationStore';
import { num_miles, requiredValidator, validarInputNumerosMiles } from '@validators';
import { VForm } from 'vuetify/components';

const authentication = useAuthenticationStore()
const props = defineProps({
  userId: {
    type: Number,
    default: null,
    required: false,
  },
})

const formValidation = ref<VForm>()
const administrationStore = useCrudAdministrationStore()
const { formulario } = storeToRefs(administrationStore)
const errors = ref<Array<string>>([])
const status = [
  {
    value: 1,
    title: 'Activo'
  },
  {
    value: 0,
    title: 'Inactivo'
  }
]
const arrayValidation = ref<Array<string | boolean>>([])

const changeScreen = async (typeAction: string) => {
  administrationStore.typeAction = typeAction
  arrayValidation.value = []
  errors.value = []
  await formValidation.value?.resetValidation()
  if (typeAction != 'back')
    administrationStore.keyList++
}


const submitForm = async () => {
  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    formulario.value.cost = formulario.value.cost.replaceAll(".", "")
    formulario.value.company_id = authentication.company.id
    const data = await administrationStore.fetchSave()
    if (data.status === 200) changeScreen('list')
    if (data.status === 422) errors.value = data.error // muestra error del back
  }
}


onMounted(async () => {
  if (props.userId) {
    await administrationStore.fetchInfo(props.userId)
    formulario.value.cost = num_miles(formulario.value.cost)
  }
})
</script>

<template>
  <div>
    <VRow>
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
        <VCol cols="12" md="6">
          <VTextField v-model="formulario.name" :rules="[requiredValidator]" autocomplete="off"
            :error-messages="errors.name" label="Nombre" @keypress="errors.name = ''" />
        </VCol>
        <VCol cols="12" md="6">
          <VTextField v-model="formulario.cost" :rules="[requiredValidator]" autocomplete="off"
            :error-messages="errors.cost" @blur="formulario.cost = validarInputNumerosMiles(formulario.cost)"
            label="Costo" @keypress="errors.cost = ''" />
        </VCol>
        <VCol cols="12" md="4">
          <AppDateTimePicker v-model="formulario.init_date" label="Fecha Inicial" />
        </VCol>
        <VCol cols="12" md="4">
          <AppDateTimePicker v-model="formulario.final_date" label="Fecha Final" />
        </VCol>
        <VCol cols="12" md="4">
          <AppSelect :items="status" v-model="formulario.status" label="Estado" />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12 d-flex justify-content-center">
          <VBtn color="primary" @click="submitForm">
            Guardar
          </VBtn>
        </VCol>
      </VRow>
    </VForm>
  </div>
</template>
