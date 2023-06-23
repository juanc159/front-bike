<script setup lang="ts">
import Form from '@/pages/Admin/Administration/Components/Form.vue';
import TableList from '@/pages/Admin/Administration/Components/TableList.vue';
import { useCrudAdministrationStore } from '@/stores/Admin/useCrudAdministrationStore';

const crudAdministrationStore = useCrudAdministrationStore()

const { typeAction } = storeToRefs(crudAdministrationStore)

onUnmounted(() => {
  crudAdministrationStore.$reset();
})
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard v-show="typeAction !== 'form'" title="Listado Gastos">
          <VCardText>
            <TableList :key="crudAdministrationStore.keyList" />
          </VCardText>
        </VCard>

        <VCard v-show="typeAction === 'form'" title="Formulario Gastos">
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
    requiredPermission: admin.administration.index
</route>
  


