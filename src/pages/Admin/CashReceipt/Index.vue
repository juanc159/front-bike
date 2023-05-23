<script setup lang="ts">
import TableList from '@/pages/Admin/CashReceipt/Components/TableList.vue';
import Form from '@/pages/Admin/CashReceipt/Components/Form.vue';
import PrintPdf from '@/pages/Admin/CashReceipt/Components/PrintPdf.vue';
import { useCrudCashReceiptStore } from '@/stores/Admin/useCrudCashReceiptStore';

const CashReceiptStore = useCrudCashReceiptStore()
//CashReceiptStore.fetchDataForm()
const { typeAction } = storeToRefs(CashReceiptStore)

onUnmounted(() => {
  CashReceiptStore.$reset();
})
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard v-show="typeAction === 'list'" title="Listado Recibo Caja">
          <VCardText>
          <TableList :key="CashReceiptStore.keyList"/>
          </VCardText>
        </VCard>
        <VCard v-show="typeAction === 'form'" title="Formulario Recibo Caja">          
          <VCardText>
            <Form />
          </VCardText>
        </VCard>
        <VCard v-show="typeAction === 'printPdf'" title="Pdf recibo de caja">          
          <VCardText>
            <PrintPdf />
          </VCardText>
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
requiredPermission: admin.cashReceipt.index
</route>
    
    
