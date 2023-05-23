<script lang="ts" setup type="module">
import { useWayToPayGeneralStore } from '@/stores/Admin/useWayToPayGeneralStore';
import { useSelect2Infite } from "@/composables/useSelect2Infite";
import { requiredValidator, lengthMaxValidator } from '@validators'
import type { VForm } from 'vuetify/components'
import { AuthenticationStore } from '@/stores/Authentication';
const authentication = AuthenticationStore();
const generalStoreWayToPay = useWayToPayGeneralStore();
const { formulario, paymentMethods, relatedTos, ledgerAccountAuxiliar, loading } = storeToRefs(generalStoreWayToPay);
const formValidation = ref<VForm>()
const errors = ref<Array<string>>([]) 

const selectInfinite = useSelect2Infite(generalStoreWayToPay.fetchLedgerAccountAuxiliaryList, ledgerAccountAuxiliar, {
  company_id: authentication.company.id,
});
const selectInfinite2 = useSelect2Infite(generalStoreWayToPay.fetchLedgerPaymentMethodsList, paymentMethods, {
});


const changeScreen = async (typeAction: string) => {
  await formValidation.value?.resetValidation()
  errors.value = []
  generalStoreWayToPay.typeAction = typeAction
  if (typeAction != 'back')
    generalStoreWayToPay.keyList++
}

const arrayValidation = ref<Array<string|boolean>>([])
const submitForm = async () => {

  if (formulario.value.related_to_id != 3) arrayValidation.value["payment_method_id"] = []
  else arrayValidation.value["payment_method_id"] =[requiredValidator(formulario.value.payment_method_id)]
  


  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    formulario.value.company_id = authentication.company.id;
    const data = await generalStoreWayToPay.fetchSave();
    if (data.status === 200) changeScreen("list");
    if (data.status === 422) errors.value = data.error; //muestra error del back
  }
};

onMounted(async () => {
  await selectInfinite.search()
  await selectInfinite2.search()
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
          <VTextField maxlength="20" :rules="[requiredValidator, lengthMaxValidator(formulario.code, 20)]" v-model="formulario.code" :error-messages="errors.code" label="Codigo"
            @keypress="errors.code = '';" />
        </VCol>
        <VCol cols="4">
          <VTextField maxlength="50"
          :rules="[requiredValidator, lengthMaxValidator(formulario.code, 50)]"
           v-model="formulario.name" :error-messages="errors.name" label="Nombre"
            @keypress="errors.name = ''" />
        </VCol>
        <VCol cols="5">
          <VSelect :items="relatedTos" v-model="formulario.related_to_id" item-title="name" item-value="id"
          :rules="[requiredValidator]"
            label="Relacionado con" :error-messages="errors.related_to_id" @update:model-value="errors.related_to_id = ''"></VSelect>
        </VCol>
      </VRow>
      <VRow class="mt-3">
        <VCol cols="6">
          <VSelect :rules="[requiredValidator]" :loading="loading" label="Cuenta contable" @update:model-value="errors.ledger_account_auxiliary_id = ''"
            :error-messages="errors.ledger_account_auxiliary_id" item-title="name" item-value="id"
            v-model="formulario.ledger_account_auxiliary_id" :items="selectInfinite.dataNueva.value">

            <template v-slot:prepend-item>
              <VTextField placeholder="Buscar..." class="mb-2" v-model="selectInfinite.searchQuery.value" />
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
                  <VBtn class="mt-2" :disabled="selectInfinite.page.value <= 1" @click="selectInfinite.prev()"
                    color="success">
                    <VIcon icon="mdi-chevron-left"></VIcon>
                  </VBtn>
                  <VBtn class="mt-2" :disabled="selectInfinite.page.value >= selectInfinite.totalLinks.value"
                    @click="selectInfinite.next()" color="success">
                    <VIcon icon="mdi-chevron-right"></VIcon>
                  </VBtn>
                </div>
              </div>
            </template>
          </VSelect>
        </VCol>
        <VCol cols="6">
          <VSelect :rules="arrayValidation['payment_method_id']" label="Medio de pago D.Electrónico" @update:model-value="arrayValidation['payment_method_id'] = ''"
            :error-messages="errors.payment_method_id" item-title="name" item-value="id"
            v-model="formulario.payment_method_id" :items="selectInfinite2.dataNueva.value">
            <template v-slot:prepend-item>
              <VTextField placeholder="Buscar..." class="mb-2" v-model="selectInfinite2.searchQuery.value" />
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
                  <VBtn class="mt-2" :disabled="selectInfinite2.page.value <= 1" @click="selectInfinite2.prev()"
                    color="success">
                    <VIcon icon="mdi-chevron-left"></VIcon>
                  </VBtn>
                  <VBtn class="mt-2" :disabled="selectInfinite2.page.value >= selectInfinite2.totalLinks.value"
                    @click="selectInfinite2.next()" color="success">
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

  </div>
</template>
