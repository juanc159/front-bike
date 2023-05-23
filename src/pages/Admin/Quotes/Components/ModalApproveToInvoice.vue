<script lang="ts" setup>
import FormApproveToInvoice from "@/pages/Admin/Quotes/Components/FormApproveToInvoice.vue";
import { useCrudQuoteStore } from '@/stores/Admin/useCrudQuoteStore';
const quoteStore = useCrudQuoteStore();
const { openModal } = storeToRefs(quoteStore)

</script>

<template>
    <div>
        <VDialog v-model="openModal" persistent width="100rem">
            <VCard>
                <VToolbar dark color="primary"  >
                    <VToolbarTitle>Aprobar Cotización</VToolbarTitle> 
                    <VBtn icon color="" @click="openModal = false">
                        <VIcon>mdi-close</VIcon>
                    </VBtn>
                </VToolbar> 
                <VCardText>
                    <FormApproveToInvoice></FormApproveToInvoice>
                </VCardText>
                <VCardActions class="d-flex justify-content-between"> 
                    <VBtn @click="openModal = false">
                        Cerrar
                    </VBtn> 
                </VCardActions>
            </VCard>
        </VDialog>
    </div>
</template>

<style scoped></style>