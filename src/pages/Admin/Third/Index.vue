<script setup lang="ts">

import TableList from '@/pages/Admin/Third/Components/TableList.vue';
import Form from '@/pages/Admin/Third/Components/Form.vue';
import {useThirdStore} from '@/stores/Admin/useThirdStore';

const thirdStore = useThirdStore()

const { typeAction } = storeToRefs(thirdStore)

onUnmounted(() => {
    thirdStore.$reset();
})

</script>

<template>
    <div>
      <VRow>
        <VCol cols="12">
          <VCard v-show="typeAction !== 'form'" title="Listado tercero">
            <VCardText>
              <TableList :key="thirdStore.keyList" />
            </VCardText>
          </VCard>
          <VCard v-show="typeAction === 'form'" title="Formulario tercero">
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
  </route>
