<script lang="ts" setup>
import { useCrudInvoiceStore } from '@/stores/Admin/useCrudInvoiceStore'
import Form from '@/pages/Admin/Invoice/Components/Form.vue';
import TableList from '@/pages/Admin/Invoice/Components/TableList.vue';
import NotaDebit from '@/pages/Admin/NoteDebit/Index.vue';
import NotaCredit from '@/pages/Admin/NoteCredit/Index.vue';
const invoiceStore = useCrudInvoiceStore();
const notaDebitKey = ref<number>(1)
const notaCreditKey = ref<number>(1)
const { typeAction} = storeToRefs(invoiceStore)
const tab = ref('Datos Básicos');

watch(tab, () => {
    if(tab.value == '3')
        notaDebitKey.value++
    if(tab.value == '2')
        notaCreditKey.value++
})

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
                            <NotaCredit :key="notaCreditKey" />
                        </VWindowItem>
                        <VWindowItem :value="3">
                            <NotaDebit :key="notaDebitKey" />
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