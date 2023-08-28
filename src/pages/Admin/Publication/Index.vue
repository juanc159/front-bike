<script setup lang="ts">
import Form from '@/pages/Admin/Publication/Components/Form.vue';
import TableList from '@/pages/Admin/Publication/Components/TableList.vue';
import { useCrudPublicationStore } from '@/pages/Admin/Publication/Store/useCrudPublicationStore';

const publicationStore = useCrudPublicationStore()

const { typeAction } = storeToRefs(publicationStore)

onUnmounted(() => {
  publicationStore.$reset();
})
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard v-show="typeAction !== 'form'" title="Listado Publicaciones">
          <VCardText>
            <TableList :key="publicationStore.keyList" />
          </VCardText>
        </VCard>
        <VCard v-show="typeAction === 'form'" title="Formulario Publicación">
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
    requiredPermission: admin.publication.index
  </route>
  


