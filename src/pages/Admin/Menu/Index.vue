<script setup lang="ts">
import TableList from '@/pages/Admin/Menu/Components/TableList.vue';
import Form from '@/pages/Admin/Menu/Components/Form.vue';

import { useCrudMenuStore } from '@/stores/Admin/useCrudMenuStore'
const storeMenu = useCrudMenuStore()
const { typeAction } = storeToRefs(storeMenu)

onUnmounted(() => {
  storeMenu.$reset();
})

</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard v-show="typeAction !== 'form'" title="Listado Menú">
          <VCardText>
            <TableList :key="storeMenu.keyList" />
          </VCardText>
        </VCard>
        <VCard v-show="typeAction === 'form'" title="Form Menú">
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
requiredPermission: admin.menu.index
</route>

