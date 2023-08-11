<script setup lang="ts">
import Form from '@/pages/Admin/IncomeVehicle/Components/Form.vue';
import TableList from '@/pages/Admin/IncomeVehicle/Components/TableList.vue';
import { useCrudIncomeVehicleStore } from '@/stores/Admin/useCrudIncomeVehicleStore';
import { useRoute } from 'vue-router';

const incomeVehicleStore = useCrudIncomeVehicleStore()

const { typeAction } = storeToRefs(incomeVehicleStore)
const route = useRoute()

onUnmounted(() => {
  incomeVehicleStore.$reset();
})
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard v-show="typeAction !== 'form'" title="Listado Ingresos Taller">
          <VCardText>
            <TableList :key="incomeVehicleStore.keyList" />
          </VCardText>
        </VCard>
        <VCard v-show="typeAction === 'form'" title="Formulario Ingreso">
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
  requiredPermission: admin.incomeVehicle.index
</route>


