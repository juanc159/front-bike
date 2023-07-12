<script lang="ts" setup>
import { useCrudMecanicStore } from '@/stores/Admin/useCrudMecanicStore';
import { useAuthenticationStore } from '@/stores/useAuthenticationStore';
import { requiredValidator } from '@validators';
import { VForm } from 'vuetify/components';

const props = defineProps({
  userId: {
    type: Number,
    default: null,
    required: false,
  },
})
const status = [
  { value: 1, title: 'Activo' },
  { value: 2, title: 'Inactivo' }
]
const formValidation = ref<VForm>()
const authentication = useAuthenticationStore()
const mecanicStore = useCrudMecanicStore()
const { formulario } = storeToRefs(mecanicStore)
const errors = ref<Array<string>>([])

const arrayValidation = ref<Array<string | boolean>>([])

const changeScreen = async (typeAction: string) => {
  mecanicStore.typeAction = typeAction
  arrayValidation.value = []
  errors.value = []
  await formValidation.value?.resetValidation()
  if (typeAction != 'back')
    mecanicStore.keyList++
}


const submitForm = async () => {
  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    formulario.value.company_id = authentication.company.id
    const data = await mecanicStore.fetchSave()
    if (data.code === 200) changeScreen('list')
    if (data.code === 422) errors.value = data.error // muestra error del back
  }
}
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
          <VTextField v-model="formulario.last_name" :rules="[requiredValidator]" autocomplete="off"
            :error-messages="errors.last_name" label="Apellidos" @keypress="errors.last_name = ''" />
        </VCol>
        <VCol cols="12" md="6">
          <VTextField v-model="formulario.identify" :rules="[requiredValidator]" autocomplete="off"
            :error-messages="errors.identify" label="Cédula" @keypress="errors.identify = ''" />
        </VCol>
        <VCol cols="12" md="6">
          <VSelect :rules="[requiredValidator]" v-model="formulario.status" clearable :items="status" label="Estado" />
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
