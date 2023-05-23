<script lang="ts" setup type="module">

import { useCrudFixedAssetGroupStore } from '@/stores/Admin/useCrudFixedAssetGroupStore';
import { requiredValidator, lengthMaxValidator } from '@validators';
import { AuthenticationStore } from '@/stores/Authentication';
import { useSelect2Infite } from "@/composables/useSelect2Infite";
import type { VForm } from 'vuetify/components';

const authentication = AuthenticationStore();
const formValidation = ref<VForm>();

const fixedAssetGroupStore = useCrudFixedAssetGroupStore();
const {
  formulario,
  loading,

  vrBuysList,
  vrBuysCountLinks,
  depreciationList,
  depreciationCountLinks,
  depreciationExpenseList,
  depreciationExpenseCountLinks,
  fiscalDepreciationList,
  fiscalDepreciationCountLinks,
  taxDepreciationExpenseList,
  taxDepreciationExpenseCountLinks,
} = storeToRefs(fixedAssetGroupStore);
const errors = ref<Array<string>>([]);
const paramsSelectInfinite = {
  company_id: authentication.company.id,
}


const changeScreen = async (typeAction: string) => {
  await formValidation.value?.resetValidation();
  fixedAssetGroupStore.typeAction = typeAction
  errors.value = []
  if (typeAction != 'back')
    fixedAssetGroupStore.keyList++
}

const submitForm = async () => {
  const validation = await formValidation.value?.validate();
  formulario.value.company_id = authentication.company.id;
  if (validation?.valid) {
    const data = await fixedAssetGroupStore.fetchSave();
    if (data.status === 200) changeScreen("list");
    if (data.status === 422) errors.value = data.error; //muestra error del back
  }
}

const selectInfiniteVrBuys = useSelect2Infite(fixedAssetGroupStore.fetchLedgerAccountListVrBuys, vrBuysList, paramsSelectInfinite);
const selectInfiniteDepreciation = useSelect2Infite(fixedAssetGroupStore.fetchLedgerAccountListDepreciation, depreciationList, paramsSelectInfinite);
const selectInfiniteDepreciationExpense = useSelect2Infite(fixedAssetGroupStore.fetchLedgerAccountListDepreciationExpense, depreciationExpenseList, paramsSelectInfinite);
const selectInfiniteFiscalDepreciation = useSelect2Infite(fixedAssetGroupStore.fetchLedgerAccountListFiscalDepreciation, fiscalDepreciationList, paramsSelectInfinite);
const selectInfiniteTaxDepreciationExpense = useSelect2Infite(fixedAssetGroupStore.fetchLedgerAccountListTaxDepreciationExpense, taxDepreciationExpenseList, paramsSelectInfinite);

const changeSelectVrBuys = (value: number, obj: object) => {
  let ledgerAccountsDis = selectInfiniteVrBuys.dataNueva.value.find(ele => ele.id === value);
  if (ledgerAccountsDis) {
    obj.vrBuys_table = ledgerAccountsDis.table;
    obj.vrBuys_id = ledgerAccountsDis.id;
  }
}

const changeSelectDepreciation = (value: number, obj: object) => {
  let ledgerAccountsDis = selectInfiniteDepreciation.dataNueva.value.find(ele => ele.id === value);
  if (ledgerAccountsDis) {
    obj.depreciation_table = ledgerAccountsDis.table;
    obj.depreciation_id = ledgerAccountsDis.id;
  }
}

const changeSelectDepreciationExpense = (value: number, obj: object) => {
  let ledgerAccountsDis = selectInfiniteDepreciationExpense.dataNueva.value.find(ele => ele.id === value);
  if (ledgerAccountsDis) {
    obj.depreciationExpense_table = ledgerAccountsDis.table;
    obj.depreciationExpense_id = ledgerAccountsDis.id;
  }
}

const changeSelectFiscalDepreciation = (value: number, obj: object) => {
  let ledgerAccountsDis = selectInfiniteFiscalDepreciation.dataNueva.value.find(ele => ele.id === value);
  if (ledgerAccountsDis) {
    obj.fiscalDepreciation_table = ledgerAccountsDis.table;
    obj.fiscalDepreciation_id = ledgerAccountsDis.id;
  }
}

const changeSelectTaxDepreciationExpense = (value: number, obj: object) => {
  let ledgerAccountsDis = selectInfiniteTaxDepreciationExpense.dataNueva.value.find(ele => ele.id === value);
  if (ledgerAccountsDis) {
    obj.taxDepreciationExpense_table = ledgerAccountsDis.table;
    obj.taxDepreciationExpense_id = ledgerAccountsDis.id;
  }
}

onMounted(async () => {
  await fixedAssetGroupStore.fetchDataForm();
  selectInfiniteVrBuys.dataNueva.value = vrBuysList.value;
  selectInfiniteVrBuys.totalLinks.value = vrBuysCountLinks.value;

  selectInfiniteDepreciation.dataNueva.value = depreciationList.value;
  selectInfiniteDepreciation.totalLinks.value = depreciationCountLinks.value;

  selectInfiniteDepreciationExpense.dataNueva.value = depreciationExpenseList.value;
  selectInfiniteDepreciationExpense.totalLinks.value = depreciationExpenseCountLinks.value;

  selectInfiniteFiscalDepreciation.dataNueva.value = fiscalDepreciationList.value;
  selectInfiniteFiscalDepreciation.totalLinks.value = fiscalDepreciationCountLinks.value;

  selectInfiniteTaxDepreciationExpense.dataNueva.value = taxDepreciationExpenseList.value;
  selectInfiniteTaxDepreciationExpense.totalLinks.value = taxDepreciationExpenseCountLinks.value;
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
          <VTextField clearable v-model="formulario.code" :error-messages="errors.code" maxlength="10" label="Código"
            @keypress="errors.code = ''" :rules="[requiredValidator, lengthMaxValidator(formulario.code, 10)]" />
        </VCol>
        <VCol cols="4">
          <VTextField clearable v-model="formulario.name" :error-messages="errors.name" maxlength="50" label="Nombre"
            @keypress="errors.name = ''" :rules="[requiredValidator, lengthMaxValidator(formulario.name, 50)]" />
        </VCol>
        <VCol cols="4">
          <VSelect :rules="[requiredValidator]" clearable :loading="loading" item-title="name" item-value="id"
            label="Vr. Compra" :items="selectInfiniteVrBuys.dataNueva.value" :modelValue="formulario.vrBuys_id"
            @update:modelValue="changeSelectVrBuys($event, formulario); errors.vrBuys_id = ''"
            @click:clear="formulario.vrBuys_id = null; formulario.vrBuys_table = null" :error-messages="errors.vrBuys_id">

            <template v-slot:prepend-item>
              <VTextField clearable placeholder="Buscar..." class="mb-2"
                v-model="selectInfiniteVrBuys.searchQuery.value" />
              <v-divider></v-divider>
            </template>
            <template v-slot:append-item>
              <v-divider> </v-divider>
              <div class="d-flex justify-content-center aling-items-center">
                <v-progress-circular v-show="loading" size="24" color="primary" indeterminate></v-progress-circular>
              </div>
              <div v-if="!loading" class="d-flex justify-content-between aling-items-center p-2">
                <RouterLink :to="{ name: 'Admin-LedgerAccount-Index' }"
                  class="app-logo d-flex align-center gap-x-3 app-title-wrapper">
                  <VBtn color="success">Crear Registro</VBtn>
                </RouterLink>
                <div>
                  <VBtn class="mt-2" :disabled="selectInfiniteVrBuys.page.value <= 1" @click="selectInfiniteVrBuys.prev()"
                    color="success">
                    <VIcon icon="mdi-chevron-left"></VIcon>
                  </VBtn>
                  <VBtn class="mt-2" :disabled="selectInfiniteVrBuys.page.value >= selectInfiniteVrBuys.totalLinks.value"
                    @click="selectInfiniteVrBuys.next()" color="success">
                    <VIcon icon="mdi-chevron-right"></VIcon>
                  </VBtn>
                </div>
              </div>
            </template>
          </VSelect>
        </VCol>
        <VCol cols="4">
          <VSelect :rules="[requiredValidator]" clearable :loading="loading" item-title="name" item-value="id"
            label="Depreciación" :items="selectInfiniteDepreciation.dataNueva.value"
            :modelValue="formulario.depreciation_id"
            @update:modelValue="changeSelectDepreciation($event, formulario); errors.depreciation_id = ''"
            @click:clear="formulario.depreciation_id = null; formulario.depreciation_table = null"
            :error-messages="errors.depreciation_id">

            <template v-slot:prepend-item>
              <VTextField clearable placeholder="Buscar..." class="mb-2"
                v-model="selectInfiniteDepreciation.searchQuery.value" />
              <v-divider></v-divider>
            </template>
            <template v-slot:append-item>
              <v-divider> </v-divider>
              <div class="d-flex justify-content-center aling-items-center">
                <v-progress-circular v-show="loading" size="24" color="primary" indeterminate></v-progress-circular>
              </div>
              <div v-if="!loading" class="d-flex justify-content-between aling-items-center p-2">
                <RouterLink :to="{ name: 'Admin-LedgerAccount-Index' }"
                  class="app-logo d-flex align-center gap-x-3 app-title-wrapper">
                  <VBtn color="success">Crear Registro</VBtn>
                </RouterLink>
                <div>
                  <VBtn class="mt-2" :disabled="selectInfiniteDepreciation.page.value <= 1"
                    @click="selectInfiniteDepreciation.prev()" color="success">
                    <VIcon icon="mdi-chevron-left"></VIcon>
                  </VBtn>
                  <VBtn class="mt-2"
                    :disabled="selectInfiniteDepreciation.page.value >= selectInfiniteDepreciation.totalLinks.value"
                    @click="selectInfiniteDepreciation.next()" color="success">
                    <VIcon icon="mdi-chevron-right"></VIcon>
                  </VBtn>
                </div>
              </div>
            </template>
          </VSelect>
        </VCol>
        <VCol cols="4">
          <VSelect :rules="[requiredValidator]" clearable :loading="loading" item-title="name" item-value="id"
            label="Gasto Depreciación" :items="selectInfiniteDepreciationExpense.dataNueva.value"
            :modelValue="formulario.depreciationExpense_id"
            @update:modelValue="changeSelectDepreciationExpense($event, formulario); errors.depreciationExpense_id = ''"
            @click:clear="formulario.depreciationExpense_id = null; formulario.depreciationExpense_table = null"
            :error-messages="errors.depreciationExpense_id">

            <template v-slot:prepend-item>
              <VTextField clearable placeholder="Buscar..." class="mb-2"
                v-model="selectInfiniteDepreciationExpense.searchQuery.value" />
              <v-divider></v-divider>
            </template>
            <template v-slot:append-item>
              <v-divider> </v-divider>
              <div class="d-flex justify-content-center aling-items-center">
                <v-progress-circular v-show="loading" size="24" color="primary" indeterminate></v-progress-circular>
              </div>
              <div v-if="!loading" class="d-flex justify-content-between aling-items-center p-2">
                <RouterLink :to="{ name: 'Admin-LedgerAccount-Index' }"
                  class="app-logo d-flex align-center gap-x-3 app-title-wrapper">
                  <VBtn color="success">Crear Registro</VBtn>
                </RouterLink>
                <div>
                  <VBtn class="mt-2" :disabled="selectInfiniteDepreciationExpense.page.value <= 1"
                    @click="selectInfiniteDepreciationExpense.prev()" color="success">
                    <VIcon icon="mdi-chevron-left"></VIcon>
                  </VBtn>
                  <VBtn class="mt-2"
                    :disabled="selectInfiniteDepreciationExpense.page.value >= selectInfiniteDepreciationExpense.totalLinks.value"
                    @click="selectInfiniteDepreciationExpense.next()" color="success">
                    <VIcon icon="mdi-chevron-right"></VIcon>
                  </VBtn>
                </div>
              </div>
            </template>
          </VSelect>
        </VCol>
        <VCol cols="4">
          <VSelect :rules="[requiredValidator]" clearable :loading="loading" item-title="name" item-value="id"
            label="Depreciación Fiscal" :items="selectInfiniteFiscalDepreciation.dataNueva.value"
            :modelValue="formulario.fiscalDepreciation_id"
            @update:modelValue="changeSelectFiscalDepreciation($event, formulario); errors.fiscalDepreciation_id = ''"
            @click:clear="formulario.fiscalDepreciation_id = null; formulario.fiscalDepreciation_table = null"
            :error-messages="errors.fiscalDepreciation_id">

            <template v-slot:prepend-item>
              <VTextField clearable placeholder="Buscar..." class="mb-2"
                v-model="selectInfiniteFiscalDepreciation.searchQuery.value" />
              <v-divider></v-divider>
            </template>
            <template v-slot:append-item>
              <v-divider> </v-divider>
              <div class="d-flex justify-content-center aling-items-center">
                <v-progress-circular v-show="loading" size="24" color="primary" indeterminate></v-progress-circular>
              </div>
              <div v-if="!loading" class="d-flex justify-content-between aling-items-center p-2">
                <RouterLink :to="{ name: 'Admin-LedgerAccount-Index' }"
                  class="app-logo d-flex align-center gap-x-3 app-title-wrapper">
                  <VBtn color="success">Crear Registro</VBtn>
                </RouterLink>
                <div>
                  <VBtn class="mt-2" :disabled="selectInfiniteFiscalDepreciation.page.value <= 1"
                    @click="selectInfiniteFiscalDepreciation.prev()" color="success">
                    <VIcon icon="mdi-chevron-left"></VIcon>
                  </VBtn>
                  <VBtn class="mt-2"
                    :disabled="selectInfiniteFiscalDepreciation.page.value >= selectInfiniteFiscalDepreciation.totalLinks.value"
                    @click="selectInfiniteFiscalDepreciation.next()" color="success">
                    <VIcon icon="mdi-chevron-right"></VIcon>
                  </VBtn>
                </div>
              </div>
            </template>
          </VSelect>
        </VCol>
        <VCol cols="4">
          <VSelect :rules="[requiredValidator]" clearable :loading="loading" item-title="name" item-value="id"
            label="Gasto Depreciación Fiscal" :items="selectInfiniteTaxDepreciationExpense.dataNueva.value"
            :modelValue="formulario.taxDepreciationExpense_id"
            @update:modelValue="changeSelectTaxDepreciationExpense($event, formulario); errors.taxDepreciationExpense_id = ''"
            @click:clear="formulario.taxDepreciationExpense_id = null; formulario.taxDepreciationExpense_table = null"
            :error-messages="errors.taxDepreciationExpense_id">

            <template v-slot:prepend-item>
              <VTextField clearable placeholder="Buscar..." class="mb-2"
                v-model="selectInfiniteTaxDepreciationExpense.searchQuery.value" />
              <v-divider></v-divider>
            </template>
            <template v-slot:append-item>
              <v-divider> </v-divider>
              <div class="d-flex justify-content-center aling-items-center">
                <v-progress-circular v-show="loading" size="24" color="primary" indeterminate></v-progress-circular>
              </div>
              <div v-if="!loading" class="d-flex justify-content-between aling-items-center p-2">
                <RouterLink :to="{ name: 'Admin-LedgerAccount-Index' }"
                  class="app-logo d-flex align-center gap-x-3 app-title-wrapper">
                  <VBtn color="success">Crear Registro</VBtn>
                </RouterLink>
                <div>
                  <VBtn class="mt-2" :disabled="selectInfiniteTaxDepreciationExpense.page.value <= 1"
                    @click="selectInfiniteTaxDepreciationExpense.prev()" color="success">
                    <VIcon icon="mdi-chevron-left"></VIcon>
                  </VBtn>
                  <VBtn class="mt-2"
                    :disabled="selectInfiniteTaxDepreciationExpense.page.value >= selectInfiniteTaxDepreciationExpense.totalLinks.value"
                    @click="selectInfiniteTaxDepreciationExpense.next()" color="success">
                    <VIcon icon="mdi-chevron-right"></VIcon>
                  </VBtn>
                </div>
              </div>
            </template>
          </VSelect>
        </VCol>
      </VRow>

      <VRow>
        <VCol cols="12 d-flex justify-content-center">
          <VBtn color="primary" @click="submitForm()">Guardar</VBtn>
      </VCol>
    </VRow>
  </VForm>
</div></template>
