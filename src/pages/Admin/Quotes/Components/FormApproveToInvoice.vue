<script lang="ts" setup>
import { requiredValidator } from '@/@core/utils/validators'
import { useSelect2Infite } from '@/composables/useSelect2Infite'
import type { VForm } from 'vuetify/components'
import { useCrudQuoteStore } from '@/stores/Admin/useCrudQuoteStore'
import { useCrudInvoiceStore } from '@/stores/Admin/useCrudInvoiceStore'
import { AuthenticationStore } from '@/stores/Authentication'
import type IFormApproveQuoteToInvoice from '@/interfaces/Admin/Quote/IFormApproveQuoteToInvoice'
import PreloadInterno from '@/componentsGlobal/PreloadInterno.vue'
import Swal from 'sweetalert2'
const quoteStore = useCrudQuoteStore()
const invoiceStore = useCrudInvoiceStore()
const authenticationStore = AuthenticationStore()
const formValidation = ref<VForm>()
const formulario = ref<IFormApproveQuoteToInvoice>({
    quoute_id:null,
    typesReceiptInvoice_id: null,
    number: null,
    arrayWayToPay: []
})
const errors = ref<Array<string>>([]);
const {selectedQuoteId,openModal} = storeToRefs(quoteStore)
const {
    loading,
    typesReceiptInvoices_arrayInfo,
    typesReceiptInvoices_countLinks,
    campDisabledAutomaticNumbering,
    arrayInfo,
    countLinks,
    errorsArrayWayToPay,
    arrayWayToPay,
} = storeToRefs(invoiceStore)

const selectInfinite_typesReceiptInvoice = useSelect2Infite(invoiceStore.fetchTypeReceipInvoicetList, typesReceiptInvoices_arrayInfo, {
    company_id: authenticationStore.company.id,
})

const selectInfinite_ledgerAcounts = useSelect2Infite(invoiceStore.fetchLedgerAccountAuxiliaryList, arrayInfo, {
    company_id: authenticationStore.company.id,
});

const changeSelectLedgerAccountsDiscount = (value: number, obj: object) => {
    let ledgerAccountsDis = selectInfinite_ledgerAcounts.dataNueva.value.find(ele => ele.id === value);
    if (ledgerAccountsDis) {
        obj.table = ledgerAccountsDis.table;
        obj.ledgerAccount_id = ledgerAccountsDis.id;
    }
}

const validateArrayWayToPay = () => {
    //VALIDAR ARRAY FORMAS DE PAGO
    let exitoWayToPay = true;
    arrayWayToPay.value.forEach((element, key) => {
        if (!element.ledgerAccount_id) {
            errorsArrayWayToPay.value[key].ledgerAccount_id = 'Este campo es obligatorio';
            exitoWayToPay = false;
        }
        else errorsArrayWayToPay.value[key].ledgerAccount_id = '';
        if (!element.amount) {
            errorsArrayWayToPay.value[key].amount = 'Este campo es obligatorio';
            exitoWayToPay = false;
        }
        else errorsArrayWayToPay.value[key].amount = '';
    });

    if (!exitoWayToPay || arrayWayToPay.value.length < 1) {
        Swal.fire({
            text: `Ingrese almenos una de forma de pago`,
            icon: 'info',
            confirmButtonText: 'Aceptar',
            customClass: {
                container: 'my-swal'
            } 
        })
        return false;
    }
    return exitoWayToPay
}

const submitForm = async () => {
    formulario.value.quoute_id= selectedQuoteId.value
    formulario.value.arrayWayToPay= arrayWayToPay.value
    const validation = await formValidation.value?.validate()
    const validate = await validateArrayWayToPay()
    if (validation?.valid && validate) {
        const data = await quoteStore.fetchQuouteToInvoice(formulario.value);
        if (data.status === 200) openModal.value = false;
        // if (data.status === 422) errors.value = data.error; //muestra error del back
    }
}
const numberIncrementInvoice = async (id: number) => {
    if (id) {
        loading.value = true
        await invoiceStore.numberIncrementInvoice(id, false);
        loading.value = false
        formulario.value.number = invoiceStore.formulario.number
    }
}

onMounted(async () => {
    await invoiceStore.fetchTypeReceipInvoicetList({
        company_id: authenticationStore.company.id,
    })
    await invoiceStore.fetchLedgerAccountAuxiliaryList({
        company_id: authenticationStore.company.id,
    })
    selectInfinite_typesReceiptInvoice.dataNueva.value = typesReceiptInvoices_arrayInfo.value
    selectInfinite_typesReceiptInvoice.totalLinks.value = typesReceiptInvoices_countLinks.value

    selectInfinite_ledgerAcounts.dataNueva.value = arrayInfo.value;
    selectInfinite_ledgerAcounts.totalLinks.value = countLinks.value;
})
</script>

<template>
    <div>
        <PreloadInterno v-show="loading"></PreloadInterno>
        <VForm v-show="!loading" @submit.prevent="() => { }" ref="formValidation" lazy-validation>
            <VRow>
                <VCol cols="12" md="6">
                    <VRow no-gutters>
                        <VCol cols="12" md="3">
                            <label>Tipo</label>
                        </VCol>
                        <VCol cols="12" md="9">
                            <VSelect clearable item-title="voucherName" item-value="id"
                                v-model="formulario.typesReceiptInvoice_id"
                                :items="selectInfinite_typesReceiptInvoice.dataNueva.value" :rules="[requiredValidator]"
                                :error-messages="errors.typesReceiptInvoice_id"
                                @click:clear="formulario.typesReceiptInvoice_id = null"
                                @update:modelValue="errors.typesReceiptInvoice_id = ''; errors.number = ''; numberIncrementInvoice($event)">
                                <template v-slot:prepend-item>
                                    <VTextField clearable placeholder="Buscar..." class="mb-2"
                                        v-model="selectInfinite_typesReceiptInvoice.searchQuery.value" />
                                    <v-divider></v-divider>
                                </template>
                                <template v-slot:append-item>
                                    <v-divider> </v-divider>
                                    <div class="d-flex justify-content-center aling-items-center">
                                        <v-progress-circular v-show="loading" size="24" color="primary"
                                            indeterminate></v-progress-circular>
                                    </div>
                                    <div v-if="!loading" class="d-flex justify-content-between aling-items-center p-2">
                                        <RouterLink :to="{ name: 'Admin-TypesReceiptInvoice-Index' }"
                                            class="app-logo d-flex align-center gap-x-3 app-title-wrapper">
                                            <VBtn color="success">Crear Registro</VBtn>
                                        </RouterLink>
                                        <div>
                                            <VBtn class="mt-2"
                                                :disabled="selectInfinite_typesReceiptInvoice.page.value <= 1"
                                                @click="selectInfinite_typesReceiptInvoice.prev()" color="success">
                                                <VIcon icon="mdi-chevron-left"></VIcon>
                                            </VBtn>
                                            <VBtn class="mt-2"
                                                :disabled="selectInfinite_typesReceiptInvoice.page.value >= selectInfinite_typesReceiptInvoice.totalLinks.value"
                                                @click="selectInfinite_typesReceiptInvoice.next()" color="success">
                                                <VIcon icon="mdi-chevron-right"></VIcon>
                                            </VBtn>
                                        </div>
                                    </div>
                                </template>
                            </VSelect>
                        </VCol>
                    </VRow>
                </VCol>
                <VCol cols="12" md="6">
                    <VRow no-gutters>
                        <VCol cols="12" md="3">
                            <label>Número</label>
                            <VTooltip location="top">
                                <template #activator="{ props }">
                                    <VIcon color="primary" v-bind="props" size="30" icon="mdi-help-circle" />
                                </template>
                                <span>El consecutivo de la factura podría cambiar si alguien más está creando otra factura y
                                    la guarda primero. </span>
                            </VTooltip>
                        </VCol>
                        <VCol cols="12" md="9">
                            <VTextField :disabled="!!campDisabledAutomaticNumbering" v-model="formulario.number" clearable
                                placeholder="Número" :error-messages="errors.number" @keypress="errors.number = ''"
                                :rules="[requiredValidator]" />
                        </VCol>
                    </VRow>
                </VCol>
            </VRow>
            <VDivider class="my-5" />
            <VRow>
                <VCol cols="12">
                    <VBtn variant="outlined" @click="invoiceStore.addWayToPay()">
                        <VIcon icon="mdi-plus-circle"></VIcon> Agregar forma de pago
                    </VBtn>
                </VCol>
                <VCol cols="12">
                    <h3>Formas de pago </h3>
                </VCol>
                <VCol cols="12" class="d-flex aling-items-center" v-for="(item, index) in arrayWayToPay" :key="index">
                    <VRow v-show="item.delete != 'delete'">
                        <VCol cols="6" class="d-flex aling-items-center">
                            <VSelect item-title="name" item-value="id" :items="selectInfinite_ledgerAcounts.dataNueva.value"
                                :modelValue="item.ledgerAccount_id"
                                @update:modelValue="changeSelectLedgerAccountsDiscount($event, item); errorsArrayWayToPay[index].ledgerAccount_id = ''"
                                :error-messages="errorsArrayWayToPay[index]?.ledgerAccount_id">

                                <template v-slot:prepend-item>
                                    <VTextField placeholder="Buscar..." class="mb-2"
                                        v-model="selectInfinite_ledgerAcounts.searchQuery.value" />
                                    <v-divider></v-divider>
                                </template>
                                <template v-slot:append-item>
                                    <v-divider> </v-divider>
                                    <div class="d-flex justify-content-center aling-items-center">
                                        <v-progress-circular v-show="loading" size="24" color="primary"
                                            indeterminate></v-progress-circular>
                                    </div>
                                    <div v-if="!loading" class="d-flex justify-content-between aling-items-center p-2">
                                        <RouterLink :to="{ name: 'Admin-LedgerAccount-Index' }"
                                            class="app-logo d-flex align-center gap-x-3 app-title-wrapper">
                                            <VBtn color="success">Crear Registro</VBtn>
                                        </RouterLink>
                                        <div>
                                            <VBtn class="mt-2" :disabled="selectInfinite_ledgerAcounts.page.value <= 1"
                                                @click="selectInfinite_ledgerAcounts.prev()" color="success">
                                                <VIcon icon="mdi-chevron-left"></VIcon>
                                            </VBtn>
                                            <VBtn class="mt-2"
                                                :disabled="selectInfinite_ledgerAcounts.page.value >= selectInfinite_ledgerAcounts.totalLinks.value"
                                                @click="selectInfinite_ledgerAcounts.next()" color="success">
                                                <VIcon icon="mdi-chevron-right"></VIcon>
                                            </VBtn>
                                        </div>
                                    </div>
                                </template>
                            </VSelect>

                        </VCol>
                        <VCol cols="4" class="d-flex aling-items-center">
                            <VTextField :disabled="!item.ledgerAccount_id" v-model="item.amount" placeholder="0.00"
                                :error-messages="errorsArrayWayToPay[index]?.amount"
                                @keypress="errorsArrayWayToPay[index].amount = ''" />
                        </VCol>
                        <VCol cols="2" class="d-flex aling-items-center">
                            <VBtn @click="invoiceStore.deleteWayToPay(index, item)" icon="tabler-trash" variant="outlined"
                                color="error" />
                        </VCol>
                    </VRow>
                </VCol>
            </VRow>
            <VRow>
                <VCol cols="12 d-flex justify-content-center">
                    <VBtn color="primary" @click="submitForm()">Guardar</VBtn>
                </VCol>
            </VRow>
        </VForm>
    </div>
</template>

<style scoped></style>