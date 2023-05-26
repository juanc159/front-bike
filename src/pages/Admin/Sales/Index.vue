<script setup lang="ts">
import Form from '@/pages/Admin/Sales/Components/Form.vue';
import TableList from '@/pages/Admin/Sales/Components/TableList.vue';
import { useCrudSaleStore } from '@/stores/Admin/useCrudSaleStore';

const saleStore = useCrudSaleStore()

const { typeAction } = storeToRefs(saleStore)

onUnmounted(() => {
  saleStore.$reset();
})
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard v-show="typeAction !== 'form'" title="Listado Ventas">
          <VCardText>
            <TableList :key="saleStore.keyList" />
          </VCardText>
        </VCard>
        <VCard v-show="typeAction === 'form'" title="Formulario Ventas">
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
    requiredPermission: admin.sales.index
  </route>
  


