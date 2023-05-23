<script setup lang="ts">
import TableList from '@/pages/Admin/FixedAssetGroup/Components/TableList.vue';
import Form from '@/pages/Admin/FixedAssetGroup/Components/Form.vue';

import { useCrudFixedAssetGroupStore } from '@/stores/Admin/useCrudFixedAssetGroupStore'
const fixedAssetGroupStore = useCrudFixedAssetGroupStore()
const { typeAction } = storeToRefs(fixedAssetGroupStore)

onUnmounted(() => {
  fixedAssetGroupStore.$reset();
})

</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard v-show="typeAction !== 'form'" title="Listado Grupos de Activo Fijos">
          <VCardText>
            <TableList :key="fixedAssetGroupStore.keyList" />
          </VCardText>
        </VCard>
        <VCard v-show="typeAction === 'form'" title="Formulario Grupos de Activo Fijos">
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
requiredPermission: admin.fixedAsset.index
</route>