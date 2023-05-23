<script setup lang="ts">
import PayOnLineList from '@/pages/Admin/WayToPay/Components/PayOnLine/Components/PayOnLineList.vue';
import PayOnLineForm from '@/pages/Admin/WayToPay/Components/PayOnLine/Components/PayOnLineForm.vue';
import {useWayToPayPayOnLineStore} from '@/stores/Admin/useWayToPayPayOnLineStore';

const payOnLineStoreWayToPay = useWayToPayPayOnLineStore()

const { typeAction } = storeToRefs(payOnLineStoreWayToPay)

onUnmounted(() => {
  payOnLineStoreWayToPay.$reset();
})

</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard v-show="typeAction !== 'form'" title="Lista forma de pago en línea">
          <VCardText>
            <PayOnLineList :key="payOnLineStoreWayToPay.keyList" />
          </VCardText>
        </VCard>
        <VCard v-show="typeAction === 'form'" title="Formulario Pago en linea">
          <VCardText>
            <PayOnLineForm />
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
