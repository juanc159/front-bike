<script setup lang="ts">
import Form from '@/pages/Admin/Mecanic/Components/Form.vue';
import TableList from '@/pages/Admin/Mecanic/Components/TableList.vue';
import { useCrudMecanicStore } from '@/stores/Admin/useCrudMecanicStore';

const mecanicStore = useCrudMecanicStore()

const { typeAction } = storeToRefs(mecanicStore)

onUnmounted(() => {
  mecanicStore.$reset();
})
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard v-show="typeAction !== 'form'" title="Listado Mecanicos">
          <VCardText>
            <TableList :key="mecanicStore.keyList" />
          </VCardText>
        </VCard>
        <VCard v-show="typeAction === 'form'" title="Formulario Mecanico">
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
    requiredPermission: admin.mecanic.index
  </route>
  


