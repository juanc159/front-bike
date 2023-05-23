<script setup lang="ts">
import { useCrudNoteCreditStore } from '@/stores/Admin/useCrudNoteCreditStore' 
// import TableList from '@/pages/Admin/Invoice/Components/TableList.vue';
import { useCrudInvoiceStore } from '@/stores/Admin/useCrudInvoiceStore'
import Form from '@/pages/Admin/NoteCredit/Components/Form.vue';
const noteCreditStore = useCrudNoteCreditStore()
const { typeAction } = storeToRefs(noteCreditStore)

onUnmounted(() => {
  noteCreditStore.$reset(); 
})

</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">

          <VCardText v-show="typeAction === 'form'">
              <Form></Form>
          </VCardText>       

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

