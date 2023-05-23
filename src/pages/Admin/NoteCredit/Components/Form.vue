<script lang="ts" setup type="module">
import type { VForm } from 'vuetify/components';
import { useCrudInvoiceStore } from '@/stores/Admin/useCrudInvoiceStore';
import { useCrudNoteCreditStore } from '@/stores/Admin/useCrudNoteCreditStore';
import { requiredValidator } from '@validators';
import { AuthenticationStore } from "@/stores/Authentication";
import { useSelect2Infite } from "@/composables/useSelect2Infite";
import FormInvoice from '@/pages/Admin/Invoice/Components/Form.vue';
import BotonModal from '@/pages/Admin/NoteDebit/Components/ModalData.vue';
import 'sweetalert2/src/sweetalert2.scss'

const invoiceStore = useCrudInvoiceStore()
const noteCreditStore = useCrudNoteCreditStore()
const authentication = AuthenticationStore();
const formValidation = ref<VForm>();
const {formulario, invoicesList_countLinks, invoicesList_arrayInfo, typesCreditNoteList_arrayInfo, typesCreditNoteList_countLinks,dianReasons_arrayInfo, loading} = storeToRefs(noteCreditStore);
const errors = ref<Array<string>>([]);
const selectInfinite_invoice = useSelect2Infite(noteCreditStore.fetchInvoiceSelect, invoicesList_arrayInfo, {
  company_id: authentication.company.id,
});

const selectInfinite_typeCreditNote = useSelect2Infite(noteCreditStore.fetchTypesCreditNoteSelect, typesCreditNoteList_arrayInfo, {
  company_id: authentication.company.id,
});

const searchInvoice = async () =>{
  await invoiceStore.fetchInfoInvoice(formulario.value.invoice_id);
}

onMounted(async () => {
  await noteCreditStore.fetchDataForm(authentication.company.id); 
  selectInfinite_invoice.totalLinks.value = invoicesList_countLinks.value
  selectInfinite_invoice.dataNueva.value = invoicesList_arrayInfo.value;

  selectInfinite_typeCreditNote.totalLinks.value = typesCreditNoteList_countLinks.value
  selectInfinite_typeCreditNote.dataNueva.value = typesCreditNoteList_arrayInfo.value;
});

const submitForm = async () =>{
  const validation = await formValidation.value?.validate();
  if (validation?.valid) {
    const data = await noteCreditStore.fetchSave();
    controlFunction.value++
  }
}



const controlFunction = ref(0)
</script>

<template>
  <div>
    <VCard class="mt-5">
      <template v-slot:title>
            <VRow>
              <VCol class="d-flex justify-content-between">
                Nueva nota crédito
              </VCol>
            </VRow>
          </template>
      <VCardText>
        <VForm @submit.prevent="() => { }" ref="formValidation" lazy-validation>
          <VRow>
            <VCol cols="12" md="6">
              <VRow no-gutters>
                <VCol cols="12" md="3">
                  <label>Factura</label>
                </VCol>
                <VCol cols="6">
                  <div>
                    <VSelect  item-title="voucherName" item-value="id"
                    v-model="formulario.invoice_id" :items="selectInfinite_invoice.dataNueva.value"
                    :rules="[requiredValidator]"
                    :error-messages="errors.typesReceiptInvoice_id"
                    clearable
                    @click:clear="formulario.factura_id = null"
                    @update:modelValue="searchInvoice()"
                    >
                    <template v-slot:prepend-item>
                      <VTextField placeholder="Buscar..." class="mb-2" v-model="selectInfinite_invoice.searchQuery.value" />
                      <v-divider></v-divider>
                    </template>
                    <template v-slot:append-item>
                      <v-divider> </v-divider>
                      <div class="d-flex justify-content-center aling-items-center">
                        <v-progress-circular v-show="loading" size="24" color="primary" indeterminate></v-progress-circular>
                      </div>
                      <div v-if="!loading" class="d-flex justify-content-between aling-items-center p-2">
                          <BotonModal />
                        <div>
                          <VBtn class="mt-2" :disabled="selectInfinite_invoice.page.value <= 1" @click="selectInfinite_invoice.prev()"
                            color="success">
                            <VIcon icon="mdi-chevron-left"></VIcon>
                          </VBtn>
                          <VBtn class="mt-2" :disabled="selectInfinite_invoice.page.value >= selectInfinite_invoice.totalLinks.value"
                            @click="selectInfinite_invoice.next()" color="success">
                            <VIcon icon="mdi-chevron-right"></VIcon>
                          </VBtn>
                        </div>
                      </div>
                    </template>
                    </VSelect>
                  </div>
                </VCol>
              </VRow>
            </VCol>
            <VCol cols="12" md="6">
              <VRow no-gutters>
                <VCol cols="12" md="3">
                  <label>Tipo Nota Crédito</label>
                </VCol>
                <VCol cols="6">
                  <div>
                    <VSelect clearable item-title="voucherName" item-value="id"
                    v-model="formulario.types_credit_note_id" :items="selectInfinite_typeCreditNote.dataNueva.value"
                    :rules="[requiredValidator]"
                    :error-messages="errors.typesReceiptInvoice_id"
                    @click:clear="formulario.formulario.types_credit_note_id = null"
                    >
                    <template v-slot:prepend-item>
                      <VTextField placeholder="Buscar..." class="mb-2" v-model="selectInfinite_typeCreditNote.searchQuery.value" />
                      <v-divider></v-divider>
                    </template>
                    <template v-slot:append-item>
                      <v-divider> </v-divider>
                      <div class="d-flex justify-content-center aling-items-center">
                        <v-progress-circular v-show="loading" size="24" color="primary" indeterminate></v-progress-circular>
                      </div>
                      <div v-if="!loading" class="d-flex justify-content-between aling-items-center p-2">
                          <BotonModal />
                        <div>
                          <VBtn class="mt-2" :disabled="selectInfinite_typeCreditNote.page.value <= 1" @click="selectInfinite_typeCreditNote.prev()"
                            color="success">
                            <VIcon icon="mdi-chevron-left"></VIcon>
                          </VBtn>
                          <VBtn class="mt-2" :disabled="selectInfinite_typeCreditNote.page.value >= selectInfinite_typeCreditNote.totalLinks.value"
                            @click="selectInfinite_typeCreditNote.next()" color="success">
                            <VIcon icon="mdi-chevron-right"></VIcon>
                          </VBtn>
                        </div>
                      </div>
                    </template>
                    </VSelect>
                  </div>
                </VCol>
              </VRow>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" md="6">
              <VRow no-gutters>
                <VCol cols="12" md="3">
                  <label>Motivo DIAN</label>
                </VCol>
                <VCol cols="12" md="6">
                  <VSelect
                  clearable
                  @click:clear="formulario.reason_dian_id = null"
                  :rules="[requiredValidator]"
                  v-model="formulario.reason_dian_id"
                  id="route-transition"
                  :items="dianReasons_arrayInfo"
                  item-title="name"
                  item-value="id"
                  single-line
                />
                </VCol>
              </VRow>
            </VCol>
            <VCol cols="12" md="6">
              <VRow no-gutters>
                <VCol cols="12" md="3">
                  <label>CUFE</label>
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField v-model="formulario.cuaf" clearable  placeholder="Cufe" :error-messages="errors.number"
                    @keypress="errors.number = '';" :rules="[requiredValidator]" />
                </VCol>
              </VRow>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
    <FormInvoice :show-btn-save="false" :show-btn-back="false" :disabled-type="true" :num-prueba="controlFunction" />
    <VRow>
      <VCol cols="12 d-flex justify-content-center">
        <VBtn  color="primary" @click="submitForm()">Guardar</VBtn>
      </VCol>
    </VRow>

  </div>
</template> 
