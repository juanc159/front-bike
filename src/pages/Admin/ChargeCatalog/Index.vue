<script setup lang="ts">
import TableList from '@/pages/Admin/ChargeCatalog/Components/TableList.vue';
import Form from '@/pages/Admin/ChargeCatalog/Components/Form.vue';

import { useCrudChargeCatalogStore } from '@/stores/Admin/useCrudChargeCatalogStore'
const chargeCatalogStore = useCrudChargeCatalogStore()
const { typeAction } = storeToRefs(chargeCatalogStore)

onUnmounted(() => {
  chargeCatalogStore.$reset();
})

</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard v-show="typeAction !== 'form'" title="Catálogo de cargos">
          <VCardText>
            <TableList :key="chargeCatalogStore.keyList" />
          </VCardText>
        </VCard>
        <VCard v-show="typeAction === 'form'" title="Detalle del cargo">
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
requiredPermission: admin.chargeCatalog.index
</route>

