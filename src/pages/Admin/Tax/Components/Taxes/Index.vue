<script setup lang="ts">
import TaxesList from '@/pages/Admin/Tax/Components/Taxes/Components/TaxesList.vue';
import TaxesForm from '@/pages/Admin/Tax/Components/Taxes/Components/TaxesForm.vue'; 
import {useTaxesStore} from '@/stores/Admin/useTaxesStore';

const taxesStore = useTaxesStore()

const { typeAction } = storeToRefs(taxesStore)

onUnmounted(() => {
  taxesStore.$reset();
})

</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard v-show="typeAction !== 'form'" title="Lista Impuestos">
          <VCardText>
            <TaxesList :key="taxesStore.keyList" />
          </VCardText>
        </VCard>
        <VCard v-show="typeAction === 'form'" title="Formulario Impuestos">
          <VCardText>
            <TaxesForm />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<!-- <route lang="yaml">
meta:
  action: read
  subject: Auth
  redirectIfLoggedIn: true
  requiredPermission: admin.role.index
</route> -->
