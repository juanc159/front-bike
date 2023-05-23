<script lang="ts" setup type="module">
 
import { useCrudChargeCatalogStore } from '@/stores/Admin/useCrudChargeCatalogStore';
import { requiredValidator } from '@validators';
import { AuthenticationStore } from '@/stores/Authentication';
import type { VForm } from 'vuetify/components';

const authentication = AuthenticationStore();
const formValidation = ref<VForm>();

const chargeCatalogStore = useCrudChargeCatalogStore();
const { formulario,ledgerAccountGroup } = storeToRefs(chargeCatalogStore) ;
const errors = ref<Array<string>>([]);


const changeScreen = async(typeAction: string) => {
  await formValidation.value?.resetValidation();
  chargeCatalogStore.typeAction = typeAction
  errors.value = []
  if (typeAction != 'back')
    chargeCatalogStore.keyList++
}

const submitForm = async () => {
  const validation = await formValidation.value?.validate();
  formulario.value.company_id = authentication.company.id;
  if (validation?.valid) {
    const data = await chargeCatalogStore.fetchSave();
    if (data.status === 200) changeScreen("list");
    if (data.status === 422) errors.value = data.error; //muestra error del back
  }
}
onMounted(async() => {
  await chargeCatalogStore.fetchDataForm();
}); 
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
          <VTextField v-model="formulario.name" :error-messages="errors.name" label="Nombre"
            @keypress="errors.name = ''" :rules="[requiredValidator]"/>
        </VCol>
        <VCol cols="4">
          <VSelect
            :items="ledgerAccountGroup"
            item-title="name"
            item-value="id"
            @update:modelValue="errors.ledger_account_group_id = ''" 
            v-model="formulario.ledger_account_group_id"
            :error-messages="errors.ledger_account_group_id"
            :rules="[requiredValidator]"
            label="Codigo"
          ></VSelect>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <p>Al guardar los cambios, se actualizará el nombre del cargo en los contratos de los empleados que lo tengan
            relacionado</p>
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
