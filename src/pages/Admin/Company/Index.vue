<script setup lang="ts">
import Form from '@/pages/Admin/Company/Components/Form.vue';
import TableList from '@/pages/Admin/Company/Components/TableList.vue';
import { useCrudCompanyStore } from '@/stores/Admin/useCrudCompanyStore';
import { useAuthenticationStore } from '@/stores/useAuthenticationStore';

const storeCrudCompany = useCrudCompanyStore()
const auth = useAuthenticationStore()
const { typeAction } = storeToRefs(storeCrudCompany)

onUnmounted(() => {
  storeCrudCompany.$reset()
})
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard
          v-if="typeAction === 'list'"
          title="Listado Compañía"
        >
          <VCardText>
            <TableList />
          </VCardText>
        </VCard>
        <VCard
          v-if="typeAction === 'form'"
          title="Formulario Compañía"
        >
          <VCardText>
            <Form />
          </VCardText>
          <VCardText />
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
  requiredPermission: admin.company.index
</route>
