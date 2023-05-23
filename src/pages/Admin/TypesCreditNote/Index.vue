<script setup lang="ts">
import TableList from '@/pages/Admin/TypesCreditNote/Components/TableList.vue';
import Form from '@/pages/Admin/TypesCreditNote/Components/Form.vue';
import {useCrudTypesCreditNoteStore} from '@/stores/Admin/useCrudTypesCreditNoteStore';

const creditNoteStore = useCrudTypesCreditNoteStore()

const { typeAction } = storeToRefs(creditNoteStore)

onUnmounted(() => {
  creditNoteStore.$reset();
})
</script>

<template>
    <div>
      <VRow>
        <VCol cols="12">
          <VCard v-show="typeAction !== 'form'" title="Listado tipos de Nota Credito">
            <VCardText>
              <TableList   :key="creditNoteStore.keyList"/>
            </VCardText>
          </VCard>
          <VCard v-show="typeAction === 'form'" title="Nueva configuración de Nota Credito">
            <VCardText>
              <Form />
            </VCardText>
            <VCardText />
          </VCard>
        </VCol>
      </VRow>
    </div>
  </template> 
<route lang="yaml">
  meta:
    action: read
    subject: Auth
    redirectIfLoggedIn: true
    requiresAuth: true
    requiredPermission: admin.typesReceiptInvoice.index
  </route>
