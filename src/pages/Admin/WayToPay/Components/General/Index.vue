<script setup lang="ts">
import GeneralList from '@/pages/Admin/WayToPay/Components/General/Components/GeneralList.vue';
import GeneralForm from '@/pages/Admin/WayToPay/Components/General/Components/GeneralForm.vue'; 
import {useWayToPayGeneralStore} from '@/stores/Admin/useWayToPayGeneralStore';

const generalStoreWayToPay = useWayToPayGeneralStore()

const { typeAction } = storeToRefs(generalStoreWayToPay)

onUnmounted(() => {
  generalStoreWayToPay.$reset();
})

</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard v-show="typeAction !== 'form'" title="Lista Forma de pago General">
          <VCardText>
            <GeneralList :key="generalStoreWayToPay.keyList" />
          </VCardText>
        </VCard>
        <VCard v-show="typeAction === 'form'" title="Formulario General">
          <VCardText>
            <GeneralForm />
          </VCardText>
          <VCardText />
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
