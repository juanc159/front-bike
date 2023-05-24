<script lang="ts" setup>
import { useCrudThirdStore } from '@/stores/Admin/useCrudThirdStore';
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

const formValidation = ref<VForm>()
const authentication = useAuthenticationStore()
const thirdStore = useCrudThirdStore()
const { formulario } = storeToRefs(thirdStore)
const errors = ref<Array<string>>([])

const arrayValidation = ref<Array<string | boolean>>([])

const changeScreen = async (typeAction: string) => {
  thirdStore.typeAction = typeAction
  arrayValidation.value = []
  errors.value = []
  await formValidation.value?.resetValidation()
  if (typeAction != 'back')
    thirdStore.keyList++
}


const submitForm = async () => {
  formulario.value.company_id = authentication.company.id

  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    const data = await thirdStore.fetchSave()
    if (data.status === 200) changeScreen('list')
    if (data.status === 422) errors.value = data.error // muestra error del back
  }
}


onMounted(async () => {
  if (props.userId)
    await thirdStore.fetchInfo(props.userId)
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
        <VCol cols="12" md="4">
          <VTextField v-model="formulario.name" :rules="[requiredValidator]" autocomplete="off"
            :error-messages="errors.name" label="Nombre" @keypress="errors.item = ''" />
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
