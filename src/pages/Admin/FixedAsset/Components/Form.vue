<script lang="ts" setup type="module">

import { useCrudFixedAssetStore } from '@/stores/Admin/useCrudFixedAssetStore';
import { requiredValidator, lengthMaxValidator, integerValidator } from '@validators';
import { AuthenticationStore } from '@/stores/Authentication';
import { useSelect2Infite } from "@/composables/useSelect2Infite";
import type { VForm } from 'vuetify/components';

const authentication = AuthenticationStore();
const formValidation = ref<VForm>();

const fixedAssetStore = useCrudFixedAssetStore();
const {
  formulario,
  loading,

  fixedAssetGroupsList,
  fixedAssetGroupsCountLinks,

} = storeToRefs(fixedAssetStore);
const errors = ref<Array<string>>([]);
const paramsSelectInfinite = {
  company_id: authentication.company.id,
}


const changeScreen = async (typeAction: string) => {
  await formValidation.value?.resetValidation();
  fixedAssetStore.typeAction = typeAction
  errors.value = []
  if (typeAction != 'back')
    fixedAssetStore.keyList++
}

const submitForm = async () => {
  const validation = await formValidation.value?.validate();
  formulario.value.company_id = authentication.company.id;
  if (validation?.valid) {
    const data = await fixedAssetStore.fetchSave();
    if (data.status === 200) changeScreen("list");
    if (data.status === 422) errors.value = data.error; //muestra error del back
  }
}

const selectInfiniteFixedAssetsGroup = useSelect2Infite(fixedAssetStore.fetchSelect2FixedAsset, fixedAssetGroupsList, paramsSelectInfinite);


const changeSelectFixedAsset = (value: number, obj: object) => {
  let ledgerAccountsDis = selectInfiniteFixedAssetsGroup.dataNueva.value.find(ele => ele.id === value);
  if (ledgerAccountsDis) {
    obj.fixed_asset_group_id = ledgerAccountsDis.id;
  }
}


onMounted(async () => {
  await fixedAssetStore.fetchDataForm({
    company_id: authentication.company.id,
  });
  selectInfiniteFixedAssetsGroup.dataNueva.value = fixedAssetGroupsList.value;
  selectInfiniteFixedAssetsGroup.totalLinks.value = fixedAssetGroupsCountLinks.value;

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
          <VSelect clearable :loading="loading" item-title="name" item-value="id" label="Grupo de Activo"
            :items="selectInfiniteFixedAssetsGroup.dataNueva.value" :modelValue="formulario.fixed_asset_group_id"
            @update:modelValue="changeSelectFixedAsset($event, formulario); errors.fixed_asset_group_id = ''"
            @click:clear="formulario.fixed_asset_group_id = null" :rules="[requiredValidator]"
            :error-messages="errors.fixed_asset_group_id">

            <template v-slot:prepend-item>
              <VTextField clearable placeholder="Buscar..." class="mb-2"
                v-model="selectInfiniteFixedAssetsGroup.searchQuery.value" />
              <v-divider></v-divider>
            </template>
            <template v-slot:append-item>
              <v-divider> </v-divider>
              <div class="d-flex justify-content-center aling-items-center">
                <v-progress-circular v-show="loading" size="24" color="primary" indeterminate></v-progress-circular>
              </div>
              <div v-if="!loading" class="d-flex justify-content-between aling-items-center p-2">
                <RouterLink :to="{ name: 'Admin-FixedAssetGroup-Index' }"
                  class="app-logo d-flex align-center gap-x-3 app-title-wrapper">
                  <VBtn color="success">Crear Registro</VBtn>
                </RouterLink>
                <div>
                  <VBtn class="mt-2" :disabled="selectInfiniteFixedAssetsGroup.page.value <= 1"
                    @click="selectInfiniteFixedAssetsGroup.prev()" color="success">
                    <VIcon icon="mdi-chevron-left"></VIcon>
                  </VBtn>
                  <VBtn class="mt-2"
                    :disabled="selectInfiniteFixedAssetsGroup.page.value >= selectInfiniteFixedAssetsGroup.totalLinks.value"
                    @click="selectInfiniteFixedAssetsGroup.next()" color="success">
                    <VIcon icon="mdi-chevron-right"></VIcon>
                  </VBtn>
                </div>
              </div>
            </template>
          </VSelect>
        </VCol>
        <VCol cols="4">
          <VTextField clearable v-model="formulario.code" :error-messages="errors.code" maxlength="30" label="Código"
            @keypress="errors.code = ''"
            :rules="[requiredValidator, lengthMaxValidator(formulario.code, 30), integerValidator]" />
        </VCol>
        <VCol cols="4">
          <VTextField clearable v-model="formulario.name" :error-messages="errors.name" maxlength="50" label="Nombre"
            @keypress="errors.name = ''" :rules="[requiredValidator, lengthMaxValidator(formulario.name, 50)]" />
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
