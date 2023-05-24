<script setup lang="ts">
import Form from '@/pages/Admin/Third/Components/Form.vue';
import TableList from '@/pages/Admin/Third/Components/TableList.vue';
import { useCrudThirdStore } from '@/stores/Admin/useCrudThirdStore';
import { useRoute } from 'vue-router';

const thirdStore = useCrudThirdStore()

const { typeAction } = storeToRefs(thirdStore)
const route = useRoute()
console.log("route", route);

onUnmounted(() => {
  thirdStore.$reset();
})
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard v-show="typeAction !== 'form'" title="Listado Inventario">
          <VCardText>
            <TableList :key="thirdStore.keyList" />
          </VCardText>
        </VCard>
        <VCard v-show="typeAction === 'form'" title="Formulario Inventario">
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
  


