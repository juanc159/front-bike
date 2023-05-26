<script setup lang="ts">
import Form from '@/pages/Admin/Third/Components/Form.vue';
import TableList from '@/pages/Admin/Third/Components/TableList.vue';
import { useCrudThirdStore } from '@/stores/Admin/useCrudThirdStore';

const thirdStore = useCrudThirdStore()

const { typeAction } = storeToRefs(thirdStore)

onUnmounted(() => {
  thirdStore.$reset();
})
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard v-show="typeAction !== 'form'" title="Listado Tercero">
          <VCardText>
            <TableList :key="thirdStore.keyList" />
          </VCardText>
        </VCard>
        <VCard v-show="typeAction === 'form'" title="Formulario Tercero">
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
    requiredPermission: admin.third.index
  </route>
  


