<script setup lang="ts">
import FormIncomeVehicle from '@/pages/Admin/IncomeVehicle/Components/Form.vue';
import Form from '@/pages/Admin/Mecanic/Components/Form.vue';
import TableInfo from '@/pages/Admin/Mecanic/Components/TableInfo.vue';
import TableList from '@/pages/Admin/Mecanic/Components/TableList.vue';
import { useCrudMecanicStore } from '@/stores/Admin/useCrudMecanicStore';
;

const mecanicStore = useCrudMecanicStore()

const { typeAction } = storeToRefs(mecanicStore)

onUnmounted(() => {
  mecanicStore.$reset();
})
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard v-show="typeAction == 'list' || typeAction == 'back'" title="Listado Mecanicos">
          <VCardText>
            <TableList :key="mecanicStore.keyList" />
          </VCardText>
        </VCard>
        <VCard v-show="typeAction === 'form'" title="Formulario Mecánico">
          <VCardText>
            <Form />
          </VCardText>
        </VCard>
        <VCard v-show="typeAction === 'info'" title="Información Mecánico">
          <VCardText>
            <TableInfo />
          </VCardText>
        </VCard>


        <VCard v-show="typeAction === 'visualizeData'" title="Ingreso">
          <VCardText>
            <FormIncomeVehicle :btnSave="false" :btnBack="false" />
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
    requiredPermission: admin.mecanic.index
  </route>
  


