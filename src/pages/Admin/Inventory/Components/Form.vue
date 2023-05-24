<script lang="ts" setup>
import { useCrudInventoryStore } from '@/stores/Admin/useCrudInventoryStore';
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
const inventoryStore = useCrudInventoryStore()
const { formulario } = storeToRefs(inventoryStore)
const errors = ref<Array<string>>([])

const arrayValidation = ref<Array<string | boolean>>([])

const changeScreen = async (typeAction: string) => {
  inventoryStore.typeAction = typeAction
  arrayValidation.value = []
  errors.value = []
  await formValidation.value?.resetValidation()
  if (typeAction != 'back')
    inventoryStore.keyList++
}


const submitForm = async () => {
  formulario.value.company_id = authentication.company.id

  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    const data = await inventoryStore.fetchSave()
    if (data.status === 200) changeScreen('list')
    if (data.status === 422) errors.value = data.error // muestra error del back
  }
}


onMounted(async () => {
  if (props.userId)
    await inventoryStore.fetchInfo(props.userId)
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
          <VTextField v-model="formulario.item" :rules="[requiredValidator]" autocomplete="off"
            :error-messages="errors.item" label="Item" @keypress="errors.item = ''" />
        </VCol>
        <VCol cols="12" md="4">
          <VTextField v-model="formulario.reference" :rules="[requiredValidator]" autocomplete="off"
            :error-messages="errors.reference" label="Referencia" @keypress="errors.reference = ''" />
        </VCol>

        <VCol cols="12" md="4">
          <VTextField v-model="formulario.brand" :rules="[requiredValidator]" :error-messages="errors.brand" label="Marca"
            @keypress="errors.brand = ''" />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" md="4">
          <VTextField v-model="formulario.model" :rules="[requiredValidator]" :error-messages="errors.model"
            label="Modelo" @keypress="errors.model = ''" />
        </VCol>

        <VCol cols="12" md="4">
          <VTextField v-model="formulario.color" maxlength="10" :rules="[requiredValidator]"
            :error-messages="errors.color" label="Color" @keypress="errors.color = '';" />
        </VCol>
        <VCol cols="12" md="4">
          <VTextField v-model="formulario.plate" maxlength="15" :rules="[requiredValidator]"
            :error-messages="errors.plate" label="Placa" @keypress="errors.plate = '';" />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" md="4">
          <VTextField v-model="formulario.registrationSite" maxlength="15" :rules="[requiredValidator]"
            :error-messages="errors.registrationSite" label="Sitio de matricula"
            @keypress="errors.registrationSite = '';" />
        </VCol>
        <VCol cols="12" md="4">
          <VTextField v-model="formulario.value" maxlength="15" :rules="[requiredValidator]"
            :error-messages="errors.value" label="Valor" @keypress="errors.value = '';" />
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
