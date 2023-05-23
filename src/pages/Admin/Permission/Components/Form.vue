<script lang="ts" setup type="module">
import { useCrudPermissionStore } from '@/stores/Admin/useCrudPermissionStore'
import { requiredValidator } from '@validators'
import type { VForm } from 'vuetify/components'
const storePermission = useCrudPermissionStore()
const { formulario } = storeToRefs(storePermission)
const errors = ref<Array<string>>([])

const formValidation = ref<VForm>()

const changeScreen = async (typeAction: string) => {
  storePermission.typeAction = typeAction
  await formValidation.value?.resetValidation()
  errors.value  = []
  if (typeAction != 'back')
    storePermission.keyList++
}

const submitForm = async () => {
  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    const data = await storePermission.fetchSave(formulario.value) 
    if (data.status === 200) changeScreen("list");
    if (data.status === 422) errors.value = data.error; //muestra error del back
  }
}

onMounted(async () => {
  await storePermission.fetchDataForm();
})

</script>

<template>
  <div>
    <VRow>
      <VCol cols="12" class="d-flex justify-content-end">
        <VBtn color="secondary" @click="changeScreen('back')">
          Atras
        </VBtn>
      </VCol>
    </VRow>
    <VForm ref="formValidation" lazy-validation>
      <VRow>
        <VCol cols="4">
          <VSelect :items="storePermission.arrayMenus" :rules="[requiredValidator]" v-model="formulario.menu_id" item-title="title" item-value="id"
            label="Grupo" :error-messages="errors.menu_id" @update:model-value="errors.menu_id = ''"></VSelect>
        </VCol>
        <VCol cols="4">
          <VTextField v-model="formulario.name" :rules="[requiredValidator]" :error-messages="errors.name" label="Nombre"
            @keypress="errors.name = ''" />
        </VCol>
        <VCol cols="4">
          <VTextField v-model="formulario.description" :rules="[requiredValidator]" :error-messages="errors.description" label="Descripción"
            @keypress="errors.description = ''" />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12 d-flex justify-content-center">
          <VBtn color="primary" @click="submitForm()">Guardar</VBtn>
        </VCol>
      </VRow>
    </VForm>
  </div>
</template>
