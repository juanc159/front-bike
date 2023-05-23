<script setup lang="ts">
import TableList from '@/pages/Admin/Employee/Components/TableList.vue';
import FormTabs from '@/pages/Admin/Employee/Components/FormTabs.vue';

import { useCrudEmployeeStore } from '@/stores/Admin/useCrudEmployeeStore'
import { useEmployeeWorkingInformationStore } from '@/stores/Admin/useEmployeeWorkingInformationStore'
const employeeStore = useCrudEmployeeStore()
const employeeWorkingInformationStore = useEmployeeWorkingInformationStore()
const { typeAction } = storeToRefs(employeeStore)

onUnmounted(() => {
  employeeStore.$reset();
  employeeWorkingInformationStore.$reset();
})

</script>

<template>
   <div>
    <VRow>
      <VCol cols="12">
        <VCard v-show="typeAction !== 'form'" title="Listado de empleados">
          <VCardText>
            <TableList :key="employeeStore.keyList" />
          </VCardText>
        </VCard>
        <VCard v-show="typeAction === 'form'" title="Formulario de empleado">
          <VCardText>
            <FormTabs />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped>
</style>
