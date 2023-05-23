<script setup lang="ts">
import List from '@/pages/Admin/LedgerAccount/Components/List.vue';
import Show from '@/pages/Admin/LedgerAccount/Components/Show.vue';
</script>

<template>
  <div>
    <VCard title="Cuenta Contable" subtitle="Si tienes dudas en cómo crear una cuenta contable, te enseñaremos aqui">
      <VCardText>
        <VRow>
          <VCol cols="6">
            <List></List>
          </VCol>

          <VCol cols="6">
            <Show></Show>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </div>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Auth
  redirectIfLoggedIn: true
  requiresAuth: true
  requiredPermission: admin.ledgerAccount.index
</route>
