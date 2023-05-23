<script setup lang="ts">
import { ref } from 'vue';

import TableList from '@/pages/Admin/Permission/Components/TableList.vue';
import Form from '@/pages/Admin/Permission/Components/Form.vue';
import { useCrudPermissionStore } from '@/stores/Admin/useCrudPermissionStore'
const storePermission = useCrudPermissionStore()
const { typeAction } = storeToRefs(storePermission) 

onUnmounted(() => {
  storePermission.$reset();
})

</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard v-show="typeAction !== 'form'" title="Listado Permiso">
          <VCardText>
          <TableList  :key="storePermission.keyList"/>
          </VCardText>
        </VCard>
        <VCard v-show="typeAction === 'form'" title="Form Permiso">
          <VCardText>
            <Form  />
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
requiredPermission: admin.permission.index
</route>

