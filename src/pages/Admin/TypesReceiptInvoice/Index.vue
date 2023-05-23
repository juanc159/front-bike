<script setup lang="ts">
import TableList from '@/pages/Admin/TypesReceiptInvoice/Components/TableList.vue';
import Form from '@/pages/Admin/TypesReceiptInvoice/Components/Form.vue';
import {useCrudTypesReceiptInvoiceStore} from '@/stores/Admin/useCrudTypesReceiptInvoiceStore.js';

const typesReceiptInvoiceStore = useCrudTypesReceiptInvoiceStore()

const { typeAction } = storeToRefs(typesReceiptInvoiceStore)

onUnmounted(() => {
  typesReceiptInvoiceStore.$reset();
})
</script>

<template>
    <div>
      <VRow>
        <VCol cols="12">
          <VCard v-show="typeAction !== 'form'" title="Listado tipos de comprobante factura">
            <VCardText>
              <TableList   :key="typesReceiptInvoiceStore.keyList"/>
            </VCardText>
          </VCard>
          <VCard v-show="typeAction === 'form'" title="Nueva configuración de factura">
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
