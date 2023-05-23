<script lang="ts" setup type="module">
import { useCrudInvoiceStore } from '@/stores/Admin/useCrudInvoiceStore';
import { useCrudNoteDebitStore } from '@/stores/Admin/useCrudNoteDebitStore';
import { requiredValidator } from '@validators';
import { AuthenticationStore } from "@/stores/Authentication";
import { useSelect2Infite } from "@/composables/useSelect2Infite";
import Form from '@/pages/Admin/Invoice/Components/Form.vue';
import BotonModal from '@/pages/Admin/NoteDebit/Components/ModalData.vue';
import 'sweetalert2/src/sweetalert2.scss'

const invoiceStore = useCrudInvoiceStore()
const noteDebitStore = useCrudNoteDebitStore()
const authentication = AuthenticationStore();

const {formulario} = storeToRefs(invoiceStore);
const {invoicesList_countLinks, invoicesList_arrayInfo, loading} = storeToRefs(noteDebitStore);
const errors = ref<Array<string>>([]);
const vSelectInvoice = ref<number | null>(null)
const selectInfinite_invoice = useSelect2Infite(noteDebitStore.fetchInvoiceSelect, invoicesList_arrayInfo, {
  company_id: authentication.company.id,
});

const searchInvoice = async () =>{
  await invoiceStore.fetchInfoInvoice(vSelectInvoice.value);
}

onMounted(async () => {
  await noteDebitStore.fetchDataForm(authentication.company.id); 
  selectInfinite_invoice.totalLinks.value = invoicesList_countLinks.value
  selectInfinite_invoice.dataNueva.value = invoicesList_arrayInfo.value;
});

</script>

<template>
  <div>
    <VCard class="mt-5">
      <template v-slot:title>
            <VRow>
              <VCol class="d-flex justify-content-between">
                Nueva nota débito / Nota de ajuste Documento Soporte
                <!-- <VBtn color="secondary" @click="changeScreen('back')">
                  Atras
                </VBtn> -->
              </VCol>
            </VRow>
          </template>
      <VCardText>
        <VRow>
          <VCol cols="12" md="6">
            <VRow no-gutters>
              <VCol cols="12" md="3">
                <label>Factura</label>
              </VCol>
              <VCol cols="6">
                <div>
                  <VSelect  item-title="voucherName" item-value="id"
                  v-model="vSelectInvoice" :items="selectInfinite_invoice.dataNueva.value"
                  :rules="[requiredValidator]"
                  :error-messages="errors.typesReceiptInvoice_id"
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
        </VRow>
        <VRow>
          <VCol cols="12" md="12">
            <Form />
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </div>
</template> 
