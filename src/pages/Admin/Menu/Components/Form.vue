<script lang="ts" setup type="module">
 
import { useCrudMenuStore } from '@/stores/Admin/useCrudMenuStore';
import { requiredValidator } from '@validators';
import type { VForm } from 'vuetify/components';
 
const storeMenu = useCrudMenuStore()
const {formulario} = storeToRefs(storeMenu)

const errors = ref<Array<string>>([]);
const formValidation = ref<VForm>();

const changeScreen = async(typeAction:string) => {
  await formValidation.value?.resetValidation();
  storeMenu.typeAction = typeAction
  if(typeAction!='back')
    storeMenu.keyList++
}

const submitForm = async () => {
  const validation = await formValidation.value?.validate();  
  if (validation?.valid) {
    const data = await storeMenu.fetchSave()
    if (data.status === 200){ 
      changeScreen('save')
    }
    if (data.status === 422) errors.value = data.error; //muestra error del back
  }
} 
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
          <VTextField v-model="formulario.title" :error-messages="errors.title" label="Título"
            @keypress="errors.title = ''" :rules="[requiredValidator]"/>
        </VCol>
        <VCol cols="4">
          <VTextField v-model="formulario.to" :error-messages="errors.to" label="Redireccionar a"
            @keypress="errors.to = ''" :rules="[requiredValidator]"/>
        </VCol> 
        <VCol cols="4">
          <VTextField v-model="formulario.icon" :error-messages="errors.icon" label="Icono" @keypress="errors.icon = ''" :rules="[requiredValidator]"/>
        </VCol> 
      </VRow>
      <VRow>
        <VCol cols="4">
          <VTextField v-model="formulario.requiredPermission" :error-messages="errors.requiredPermission"
            label="Permiso requerido" @keypress="errors.requiredPermission = ''" :rules="[requiredValidator]"/>
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
