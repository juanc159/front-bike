<script setup lang="ts">
import TableList from '@/pages/Admin/Payroll/Components/TableList.vue';
import Form from '@/pages/Admin/Payroll/Components/Form.vue';

import { useCrudPayrollStore } from '@/stores/Admin/useCrudPayrollStore'
const payrollStore = useCrudPayrollStore()
const { typeAction } = storeToRefs(payrollStore)

onUnmounted(() => {
  payrollStore.$reset();
})

</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard v-show="typeAction !== 'form'" title="Listado nómina">
          <VCardText>
            <TableList :key="payrollStore.keyList" />
          </VCardText>
        </VCard>
        <VCard v-show="typeAction === 'form'" title="Nueva nómina" subtitle="Todos los campos marcados con * son obligatorios para la creación de la nómina">
          <VCardText>
            <Form />
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
requiredPermission: admin.payroll.index
</route>

