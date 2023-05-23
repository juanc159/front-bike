<script setup lang="ts">
import TableList from '@/pages/Admin/Quotes/Components/TableList.vue'; 
import Form from '@/pages/Admin/Quotes/Components/Form.vue'; 
import { useCrudQuoteStore } from '@/stores/Admin/useCrudQuoteStore'
import ModalProducts from "@/pages/Admin/Quotes/Components/ModalProducts.vue";

const quoteStore = useCrudQuoteStore()
const { typeAction } = storeToRefs(quoteStore)

onUnmounted(() => {
  quoteStore.$reset();
})

</script>

<template>
  <div>
    <ModalProducts   title-btn="Crear Registro"></ModalProducts>
      <VRow>
        <VCol cols="12">
          <VCard v-show="typeAction !== 'form'" title="Listado Cotizaciones">
            <VCardText>
              <TableList :key="quoteStore.keyList" />
            </VCardText>
          </VCard>
          <VCard v-show="typeAction === 'form'" title="Formulario Cotización">
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
  requiredPermission: admin.quotes.index
</route>

