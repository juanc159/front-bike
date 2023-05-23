<script lang="ts" setup type="module">
import { useTaxesStore } from '@/stores/Admin/useTaxesStore';
import { requiredValidator, lengthMaxValidator } from '@validators'
import type { VForm } from 'vuetify/components'
import { AuthenticationStore } from '@/stores/Authentication';
const authentication = AuthenticationStore();
const taxesStore = useTaxesStore();
const { formulario } = storeToRefs(taxesStore);
const formValidation = ref<VForm>()
const errors = ref<Array<string>>([])


const changeScreen = async (typeAction: string) => {
  await formValidation.value?.resetValidation()
  errors.value = []
  taxesStore.typeAction = typeAction
  if (typeAction != 'back')
    taxesStore.keyList++
}

const submitForm = async () => {
  const validation = await formValidation.value?.validate()
  /* 
  if (validation?.valid) {
    formulario.value.company_id = authentication.company.id;
    const data = await taxesStore.fetchSave();
    if (data.status === 200) changeScreen("list");
    if (data.status === 422) errors.value = data.error; //muestra error del back
  } */
};

onMounted(async () => {
})
</script>
<template>
  <div>
    <VRow>
      <VCol cols="12" class="d-flex justify-content-end">
        <VBtn color="secondary" @click="changeScreen('back')"> Atras </VBtn>
      </VCol>
    </VRow>

    <VForm ref="formValidation" lazy-validation>
      <VRow>
        <VCol cols="3">
          <VTextField
            maxlength="20"
            :rules="[
              requiredValidator,
              lengthMaxValidator(formulario.code, 20),
            ]"
            v-model="formulario.code"
            :error-messages="errors.code"
            label="Codigo"
            @keypress="errors.code = ''"
          />
        </VCol>
        <VCol cols="4">
          <VTextField
            maxlength="50"
            :rules="[
              requiredValidator,
              lengthMaxValidator(formulario.code, 50),
            ]"
            v-model="formulario.name"
            :error-messages="errors.name"
            label="Nombre"
            @keypress="errors.name = ''"
          />
        </VCol>
        <VCol cols="5">
          <VSelect
            :items="[]"
            v-model="formulario.related_to_id"
            item-title="name"
            item-value="id"
            :rules="[requiredValidator]"
            label="Tipo de impuesto"
            :error-messages="errors.related_to_id"
            @update:model-value="errors.related_to_id = ''"
          ></VSelect>
        </VCol>
      </VRow>
      <VRow class="mt-3">
        <VCol cols="2">
          <VSwitch
          label="Por valor"
            v-model="formulario.useAsElectronicDocument"
            color="success"
            inset
            :value="formulario.useAsElectronicDocument"
            :true-value="1"
            :false-value="0"
            hide-details
          ></VSwitch>
        </VCol>
        <VCol cols="5">
          <VTextField label="Tarifa" :rules="[requiredValidator]"/>
        </VCol>
        <VCol cols="5">
          <VTextField label="Ventas" :rules="[requiredValidator]"/>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="4">
          <VSelect
            :items="[]"
            v-model="formulario.related_to_id"
            item-title="name"
            item-value="id"
            :rules="[requiredValidator]"
            label="Compras"
            :error-messages="errors.related_to_id"
            @update:model-value="errors.related_to_id = ''"
          ></VSelect>
        </VCol>
        <VCol cols="4">
          <VSelect
            :items="[]"
            v-model="formulario.related_to_id"
            item-title="name"
            item-value="id"
            :rules="[requiredValidator]"
            label="Devolución ventas"
            :error-messages="errors.related_to_id"
            @update:model-value="errors.related_to_id = ''"
          ></VSelect>
        </VCol>
        <VCol cols="4">
          <VSelect
            :items="[]"
            v-model="formulario.related_to_id"
            item-title="name"
            item-value="id"
            :rules="[requiredValidator]"
            label="Devolución compras"
            :error-messages="errors.related_to_id"
            @update:model-value="errors.related_to_id = ''"
          ></VSelect>
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
