<script setup lang="ts">
import DashboardBikers from "@/pages/Admin/Dashboard/Components/DashboardBikers.vue";
import DashboardSuperAdmin from "@/pages/Admin/Dashboard/Components/DashboardSuperAdmin.vue";
import { useAuthenticationStore } from "@/stores/useAuthenticationStore";
const authenticationStore = useAuthenticationStore()
const { company } = storeToRefs(authenticationStore)
</script>
<template>
  <div>
    <DashboardSuperAdmin v-if="!company.id" />
    <DashboardBikers v-if="company.id == 1" />
  </div>
</template>

<style scoped>
.sizeFont {
  font-size: 24px;

  /* Tamaño de letra personalizado */
}
</style>
  