<script setup lang="ts">
import { useDashboardStore } from "@/stores/useDashboardStore";
import { num_miles } from '@validators';
const dashboardStore = useDashboardStore()
const { shoppings, sales, thirds, utilities } = storeToRefs(dashboardStore)
dashboardStore.getData()
</script>
<template>
  <div>
    <VCard class="mb-6">
      <VCardTitle primary-title>
        <span class="text-primary">Dashboard</span>
      </VCardTitle>
      <VCardText class="d-flex justify-content-center aling-items-center">
        <VRow>
          <VCol cols="12" md="3">
            <VCard class="mb-6 text-center">
              <VCardTitle primary-title>
                <span class="text-primary">Compras</span>
              </VCardTitle>
              <VCardText>
                {{ num_miles(shoppings) }}
              </VCardText>
            </VCard>
          </VCol>
          <VCol cols="12" md="3">
            <VCard class="mb-6 text-center">
              <VCardTitle primary-title>
                <span class="text-primary">Terceros</span>
              </VCardTitle>
              <VCardText>
                {{ num_miles(thirds) }}
              </VCardText>
            </VCard>
          </VCol>
          <VCol cols="12" md="3">
            <VCard class="mb-6 text-center">
              <VCardTitle primary-title>
                <span class="text-primary">Ventas</span>
              </VCardTitle>
              <VCardText>
                {{ num_miles(sales) }}
              </VCardText>
            </VCard>
          </VCol>
          <VCol cols="12" md="3">
            <VCard class="mb-6 text-center">
              <VCardTitle primary-title>
                <span class="text-primary">Utilidades</span>
              </VCardTitle>
              <VCardText>
                {{ num_miles(utilities) }}
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

  </div>
</template>
