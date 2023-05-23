<script setup lang="ts">
import TableList from '@/pages/Admin/Company/Components/TableList.vue';
import Form from '@/pages/Admin/Company/Components/Form.vue';
import { AuthenticationStore } from '@/stores/Authentication';
import { useCrudCompanyStore } from '@/stores/Admin/useCrudCompanyStore';

const storeCrudCompany = useCrudCompanyStore();
const auth = AuthenticationStore();
const { typeAction } = storeToRefs(storeCrudCompany);

onUnmounted(() => {
  storeCrudCompany.$reset();
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
              <TableList/>
          </VCardText>
          </VCard>
          <VCard
            v-if="typeAction === 'form'"
            title="Formulario Compañía"
          >
            <VCardText>
                <Form/>
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
