<script lang="ts" setup>
import { AuthenticationStore } from '@/stores/Authentication';
import { useCrudCashReceiptConfigurationStore } from '@/stores/Admin/useCrudCashReceiptConfigurationStore';
import TableList from '@/pages/Admin/CashReceiptConfiguration/Components/TableList.vue';
import Form from '@/pages/Admin/CashReceiptConfiguration/Components/Form.vue';
const cashReceiptConfigurationStore = useCrudCashReceiptConfigurationStore();
const auth = AuthenticationStore();

const { typeAction, keyList } = storeToRefs(cashReceiptConfigurationStore);
onUnmounted(() => {
    cashReceiptConfigurationStore.$reset();
})
</script>

<template>
    <div>
        <VRow>
            <VCol cols="12">
                <VCard v-show="typeAction !== 'form'" title="Listado configuración de recibo de caja">
                    <VCardText>
                        <TableList :key="keyList" />
                    </VCardText>
                </VCard>
                <VCard v-show="typeAction === 'form'" title="Formulario configuraciòn de recibo de caja"
                    subtitle="Todos los campos marcados con * son obligatorios">
                    <VCardText>
                        <Form />
                    </VCardText>
                    <VCardText />
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
requiredPermission: admin.cashReceipt.index
</route>
    
    