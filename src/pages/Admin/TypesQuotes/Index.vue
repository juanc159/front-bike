<script setup lang="ts">
import TableList from '@/pages/Admin/TypesQuotes/Components/TableList.vue';
import Form from '@/pages/Admin/TypesQuotes/Components/Form.vue';
import {useCrudTypesQuoteStore} from '@/stores/Admin/useCrudTypesQuoteStore';

const typesQuoteStore = useCrudTypesQuoteStore()

const { typeAction } = storeToRefs(typesQuoteStore)

onUnmounted(() => {
  typesQuoteStore.$reset();
})
</script>

<template>
    <div>
      <VRow>
        <VCol cols="12">
          <VCard v-show="typeAction !== 'form'" title="Listado tipos de cotizaciones">
            <VCardText>
              <TableList   :key="typesQuoteStore.keyList"/>
            </VCardText>
          </VCard>
          <VCard v-show="typeAction === 'form'" title="Nueva configuración de cotización">
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
    requiredPermission: admin.typesQuote.index
  </route>
