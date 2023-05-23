<script lang="ts" setup>
import { useCrudInvoiceStore } from '@/stores/Admin/useCrudInvoiceStore'
import Form from '@/pages/Admin/Invoice/Components/Form.vue';
import TableList from '@/pages/Admin/Invoice/Components/TableList.vue';
const invoiceStore = useCrudInvoiceStore();

const { typeAction} = storeToRefs(invoiceStore)
const tab = ref('Datos Básicos');
const changeScreen = (typeAction: string) => {
    invoiceStore.typeAction = typeAction
    if (typeAction != 'back')
        invoiceStore.keyList++
}

const arrayTabs = [
    {
        id: 1,
        title: "Factura de venta"
    },
    {
        id: 2,
        title: "Nota crédito"
    },
    {
        id: 3,
        title: "Nota débito (Ventas)"
    },
    {
        id: 4,
        title: "Otras opciones"
    }
]
</script>

<template>
    <div>
        <VRow>
            <VCol cols="12">
                <VCard>
                    <VTabs v-model="tab" bg-color="transparent" grow>
                        <VTab v-for="(item, index) in arrayTabs" :key="index" :value="item.id">
                            {{ item.title }}
                        </VTab>
                    </VTabs>

                    <VWindow v-model="tab">
                        <VWindowItem :value="1">  
                            <VCardText v-show="typeAction!== 'form'" :key="invoiceStore.keyList">
                                <TableList />
                            </VCardText>
                            <VCardText v-show="typeAction === 'form'">
                                <Form></Form>
                            </VCardText>
                        </VWindowItem>
                        <VWindowItem :value="2">
                            b
                        </VWindowItem>
                        <VWindowItem :value="3">
                            c
                        </VWindowItem>
                        <VWindowItem :value="4">
                            d
                        </VWindowItem>
                    </VWindow>
                </VCard>
            </VCol>
        </VRow>
    </div>
</template>

<style scoped></style>