<script setup lang="ts">
// import TableList from '@/pages/Admin/Employee/Components/TableList.vue';
import Tabs from '@/pages/Admin/Invoice/Components/Tabs.vue';
import { useCrudInvoiceStore } from '@/stores/Admin/useCrudInvoiceStore' 
const invoiceStore = useCrudInvoiceStore()
const { typeAction } = storeToRefs(invoiceStore)

onUnmounted(() => {
  invoiceStore.$reset(); 
})

</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard >
          <VCardText>            
            <Tabs/>
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
requiredPermission: admin.invoice.index
</route>

