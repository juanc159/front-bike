<script setup lang="ts">
import TableList from '@/pages/Admin/FixedAsset/Components/TableList.vue';
import Form from '@/pages/Admin/FixedAsset/Components/Form.vue';

import { useCrudFixedAssetStore } from '@/stores/Admin/useCrudFixedAssetStore'
const fixedAssetStore = useCrudFixedAssetStore()
const { typeAction } = storeToRefs(fixedAssetStore)

onUnmounted(() => {
  fixedAssetStore.$reset();
})

</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard v-show="typeAction !== 'form'" title="Listado Activo Fijos">
          <VCardText>
            <TableList :key="fixedAssetStore.keyList" />
          </VCardText>
        </VCard>
        <VCard v-show="typeAction === 'form'" title="Formulario de Activo Fijos">
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
requiredPermission: admin.fixedAssetGroup.index
</route>