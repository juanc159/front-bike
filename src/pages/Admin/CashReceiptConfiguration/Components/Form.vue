<script lang="ts" setup type="module">

import { useCrudCashReceiptConfigurationStore } from '@/stores/Admin/useCrudCashReceiptConfigurationStore';
import { requiredValidator } from '@validators';
import { AuthenticationStore } from '@/stores/Authentication';
import type { VForm } from 'vuetify/components';
import { useSelect2Infite } from "@/composables/useSelect2Infite";

const authentication = AuthenticationStore();
const cashReceiptConfigurationStore = useCrudCashReceiptConfigurationStore();
const { formulario, arrayInfo, countLinks, loading } = storeToRefs(cashReceiptConfigurationStore);

const selectInfinite = useSelect2Infite(cashReceiptConfigurationStore.fetchLedgerAccountAuxiliaryList, arrayInfo, {
  company_id: authentication.company.id,
});
const formValidation = ref<VForm>();

const errors = ref<Array<string>>([]);

const changeSelectLedgerAccountsDiscount = (value: number, obj: object) => {
  let ledgerAccountsDis = selectInfinite.dataNueva.value.find(ele => ele.id === value);
  if (ledgerAccountsDis) {
    formulario.value.table = ledgerAccountsDis.table;
    formulario.value.ledgerAccount_id = ledgerAccountsDis.id;
  }
}
const changeScreen = async (typeAction: string) => {
  await formValidation.value?.resetValidation();
  cashReceiptConfigurationStore.typeAction = typeAction
  errors.value = []
  if (typeAction != 'back')
    cashReceiptConfigurationStore.keyList++
}

const submitForm = async () => {
  const validation = await formValidation.value?.validate();
  formulario.value.company_id = authentication.company.id;
  if (validation?.valid) {
    const data = await cashReceiptConfigurationStore.fetchSave();
    if (data.status === 200) changeScreen("list");
    if (data.status === 422) errors.value = data.error; //muestra error del back
  }
}
onMounted(async () => {
  await cashReceiptConfigurationStore.fetchDataForm();
  selectInfinite.dataNueva.value = arrayInfo.value;
  selectInfinite.totalLinks.value = countLinks.value;
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
        <VCol cols="12" md="3">
          <h3>Datos generales</h3>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="4">
          <VTextField v-model="formulario.code" :error-messages="errors.code" label="Código del comprobante *"
            @keypress="errors.code = ''" :rules="[requiredValidator]" />
        </VCol>
        <VCol cols="4">
          <VTextField v-model="formulario.title" :error-messages="errors.title" label="Título del comprobante *"
            @keypress="errors.title = ''" :rules="[requiredValidator]" />
        </VCol>
        <VCol cols="4">
          <VTextField v-model="formulario.description" :error-messages="errors.description"
            label="Descripción del comprobante *" @keypress="errors.description = ''" :rules="[requiredValidator]" />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" md="3">
          <h3>Fomarto de impresión</h3>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" md="3">
          <VSelect :items="['Básico','Básico 2','Tirilla']"   v-model="formulario.printFormat" label="Formato"></VSelect>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" md="3">
          <h3>¿Maneja centros de costo? </h3>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VRadioGroup v-model="formulario.manageCostCenters" inline>
            <VRadio label="Si" value="Si"></VRadio>
            <VRadio label="No" value="No"></VRadio>
          </VRadioGroup>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" md="4">
          <VCheckbox label="Es requerido" v-model="formulario.isRequired" :true-value="1" :false-value="0"></VCheckbox>
        </VCol>
        <VCol cols="12" md="4">
          <VTextField v-model="formulario.default" :error-messages="errors.default" label="Por defecto"
            @keypress="errors.default = ''"  />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" md="3">
          <h3>Configuraciones complementarias</h3>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" md="4">
          <VCheckbox label="Numeración automatica" v-model="formulario.automaticNumbering" :true-value="1"
            :false-value="0"></VCheckbox>
        </VCol>
        <VCol cols="12" md="4">
          <VTextField v-model="formulario.consecutive" :error-messages="errors.consecutive" label="Consecutivo *"
            @keypress="errors.consecutive = ''" :rules="[requiredValidator]" />
        </VCol>
        <VCol cols="12" md="4">
          <VSelect label="Cuenta contable de anticipo"    :loading="loading" item-title="name" item-value="id" :items="selectInfinite.dataNueva.value"
            :modelValue="formulario.ledgerAccount_id"
            @update:modelValue="changeSelectLedgerAccountsDiscount($event, item); errorsledgerAccount_id = ''"
            :error-messages="errors.ledgerAccount_id">

            <template v-slot:prepend-item>
              <VTextField placeholder="Buscar..." class="mb-2" v-model=" selectInfinite.searchQuery.value " />
              <v-divider></v-divider>
            </template>
            <template v-slot:append-item>
              <v-divider> </v-divider>
              <div class="d-flex justify-content-center aling-items-center">
                <v-progress-circular v-show=" loading " size="24" color="primary" indeterminate></v-progress-circular>
              </div>
              <div v-if=" !loading " class="d-flex justify-content-between aling-items-center p-2">
                <RouterLink :to=" { name: 'Admin-LedgerAccount-Index' } "
                  class="app-logo d-flex align-center gap-x-3 app-title-wrapper">
                  <VBtn color="success">Crear Registro</VBtn>
                </RouterLink>
                <div>
                  <VBtn class="mt-2" :disabled=" selectInfinite.page.value <= 1 " @click=" selectInfinite.prev() "
                    color="success">
                    <VIcon icon="mdi-chevron-left"></VIcon>
                  </VBtn>
                  <VBtn class="mt-2" :disabled=" selectInfinite.page.value >= selectInfinite.totalLinks.value "
                    @click=" selectInfinite.next() " color="success">
                    <VIcon icon="mdi-chevron-right"></VIcon>
                  </VBtn>
                </div>
              </div>
            </template>
          </VSelect>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" md="3">
          <h3>Datos complementarios mail</h3>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" md="4">
          <VTextField v-model=" formulario.subject " :error-messages=" errors.subject " label="Asunto *"
            @keypress=" errors.subject = '' " :rules=" [requiredValidator] " />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12 d-flex justify-content-center">
          <VBtn color="primary" @click=" submitForm() ">Guardar</VBtn>
        </VCol>
      </VRow>
    </VForm>
  </div>
</template>
