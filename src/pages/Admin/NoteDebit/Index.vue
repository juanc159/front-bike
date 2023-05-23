<script setup lang="ts">
import { useCrudNoteDebitStore } from '@/stores/Admin/useCrudNoteDebitStore' 
// import TableList from '@/pages/Admin/Invoice/Components/TableList.vue';
import TableList from '@/pages/Admin/NoteDebit/Components/TableList.vue';
import { useCrudInvoiceStore } from '@/stores/Admin/useCrudInvoiceStore'
import Form from '@/pages/Admin/NoteDebit/Components/Form.vue';

const invoiceStore = useCrudInvoiceStore();
const noteDebitStore = useCrudNoteDebitStore()
const { typeAction } = storeToRefs(noteDebitStore)

onUnmounted(() => {
  noteDebitStore.$reset(); 
})

</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard >
          <VCardText v-show="typeAction!== 'form'" :key="invoiceStore.keyList">
              <!-- <TableList /> -->
          </VCardText>
          <VCardText v-show="typeAction === 'form'">
              <Form></Form>
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

