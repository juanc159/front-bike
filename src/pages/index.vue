<script setup lang="ts">
import { AuthenticationStore } from '@/stores/Authentication';
const authentication = AuthenticationStore()
</script>

<template>
  <div>
    <VCard title="Bienvenido">
      <VCardText>{{ authentication.user.all_permissions }}</VCardText>
    </VCard>
  </div>
</template>
requiresAuth
<route lang="yaml">
  meta:
    subject: Auth
    requiresAuth: true
    redirectIfLoggedIn: true
  </route>