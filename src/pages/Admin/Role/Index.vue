<script setup lang="ts">
import TableList from '@/pages/Admin/Role/Components/TableList.vue';
import Form from '@/pages/Admin/Role/Components/Form.vue';
import { useCrudRoleStore } from '@/stores/Admin/useCrudRoleStore';
import { useRoute } from 'vue-router'
const route = useRoute()
const storeRole = useCrudRoleStore()

const { typeAction } = storeToRefs(storeRole)

onUnmounted(() => {
  storeRole.$reset();
})

</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard v-show="typeAction !== 'form'" title="Listado Roles">
          <VCardText>
            <TableList :key="storeRole.keyList" />
          </VCardText>
        </VCard>
        <VCard v-if="typeAction === 'form'" title="Formulario Rol">
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
  name: Admin-Role-Index
  action: read 
  noComponent: true
  subject: Auth
  title: roles
  redirectIfLoggedIn: true
</route>