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
        <span class="text-primary sizeFont">Dashboard</span>
      </VCardTitle>
      <VCardText class="d-flex justify-content-center aling-items-center">
        <VRow>
          <VCol cols="12" md="3">
            <VCard class="mb-6 text-center">
              <VCardTitle primary-title>
                <span class="text-primary sizeFont">Compras</span>
              </VCardTitle>
              <VCardText>
                <span class="sizeFont">
                  {{ num_miles(shoppings) }}
                </span>
              </VCardText>
            </VCard>
          </VCol>
          <VCol cols="12" md="3">
            <VCard class="mb-6 text-center">
              <VCardTitle primary-title>
                <span class="text-primary sizeFont">Terceros</span>
              </VCardTitle>
              <VCardText>
                <span class="sizeFont">
                  {{ num_miles(thirds) }}
                </span>
              </VCardText>
            </VCard>
          </VCol>
          <VCol cols="12" md="3">
            <VCard class="mb-6 text-center">
              <VCardTitle primary-title>
                <span class="text-primary sizeFont">Ventas</span>
              </VCardTitle>
              <VCardText>
                <span class="sizeFont">
                  {{ num_miles(sales) }}
                </span>
              </VCardText>
            </VCard>
          </VCol>
          <VCol cols="12" md="3">
            <VCard class="mb-6 text-center">
              <VCardTitle primary-title>
                <span class="text-primary sizeFont">Utilidades</span>
              </VCardTitle>
              <VCardText>
                <span class="sizeFont">
                  {{ num_miles(utilities) }}
                </span>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

  </div>
</template>
