<script lang="ts" setup type="module">
import { useCrudTypesReceiptInvoiceStore } from "@/stores/Admin/useCrudTypesReceiptInvoiceStore";
import { AuthenticationStore } from "@/stores/Authentication";
import { useSelect2Infite } from "@/composables/useSelect2Infite";
import moment from 'moment';
import { useImageUpload } from '@/composables/useImageUpload';
import { requiredValidator,lengthMaxValidator,lengthMinValidator } from '@validators';
import type { VForm } from 'vuetify/components';

const archive = ref(useImageUpload());
const authentication = AuthenticationStore();
const typesReceiptInvoiceStore = useCrudTypesReceiptInvoiceStore();

const {
  formulario,
  showMainData,
  showElectronicBilling,
  showAddOnSettings,
  showChargesAndDiscounts,
  arrayChargesAndDiscounts,
  arrayPhone,
  departaments,
  cities,
  showChargesAndDiscountsInvoice,
  validityInMonths,
  discountPerItem,
  formatDisplayPrintInvoice,
  arrayInfo,
  loading,
  formChargesAndDiscounts,
  typeChargeAndDiscount,
  dataDetailInvoiceAvailable,
  arrayDataDetailInvoiceAvailable
} = storeToRefs(typesReceiptInvoiceStore);

const selectInfinite = useSelect2Infite(typesReceiptInvoiceStore.fetchLedgerAccountAuxiliaryList, arrayInfo, {
  company_id: authentication.company.id,
});
const selectInfinite2 = useSelect2Infite(typesReceiptInvoiceStore.fetchLedgerAccountAuxiliaryList, arrayInfo, {
  company_id: authentication.company.id,
});
const selectInfinite3 = useSelect2Infite(typesReceiptInvoiceStore.fetchLedgerAccountAuxiliaryList, arrayInfo, {
  company_id: authentication.company.id,
});

const formValidation = ref<VForm>();
const errors = ref<Array<string>>([]);
const changeScreen = async(typeAction: string) => {
  await formValidation.value?.resetValidation();
  typesReceiptInvoiceStore.typeAction = typeAction;
  if (typeAction != "back") typesReceiptInvoiceStore.keyList++;
};

const submitForm = async () => { 
  formulario.value.company_id = authentication.company.id;
  formulario.value.attachFile = archive.value.imageFile;
  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    const data = await typesReceiptInvoiceStore.fetchSave();
    if (data.status === 200) changeScreen("list");
    if (data.status === 422) errors.value = data.error; //muestra error del back
  }
};

const showCities = (value)=>{
  formulario.value.departament_id = value;
  typesReceiptInvoiceStore.getCities()
}
const changeSelectLedgerAccountsDiscount = (value)=>{
  formulario.value.LedgerAccountsDiscount_id = value;
  let ledgerAccountsDis = selectInfinite.dataNueva.value.find(ele => ele.id === value);
  if(ledgerAccountsDis)formulario.value.LedgerAccountsDiscount_table = ledgerAccountsDis.table;  
}
const changeSelectLedgerAccountsGif = (value)=>{
  formulario.value.LedgerAccountsGift_id = value;
  let ledgerAccountsGif = selectInfinite2.dataNueva.value.find(ele => ele.id === value);
  if(ledgerAccountsGif)formulario.value.LedgerAccountsGift_table = ledgerAccountsGif.table;  
}
const changeSelectLedgerAccounts = (value)=>{
  console.log('value',value)
  formChargesAndDiscounts.value.ledgerAccount_id = value;
  let ledgerAccount = selectInfinite3.dataNueva.value.find(ele => ele.id === value);
  if(ledgerAccount)formChargesAndDiscounts.value.ledgerAccount_table = ledgerAccount.table;  
}

//obtener fecha final de vigencia
let mes = 0;
const dateFinVigencia = (item,type='') => {
  if(type === 'select'){
    let id = item;
    mes = validityInMonths.value.find(ele => ele.id === id)
  }
  let fecha = moment(formulario.value.effectiveDate)
  fecha = fecha.add(mes.number, 'month');
  formulario.value.endDateValidity = fecha.format("YYYY-MM-DD");
}

//FLECHA AGREGAR
let arrayIdDataDetail =  ref<Array<string>>([]);
const addDataShow = () => {
  arrayIdDataDetail.value.forEach(element => {       
    let dat = dataDetailInvoiceAvailable.value.find(ele => ele.id === element);
    if(!dat) return false;
    else {
      dat.show = 'inact';
      arrayDataDetailInvoiceAvailable.value.push(dat);
    }   
  });
  arrayIdDataDetail.value = [];
}

//FLECHA QUITAR
let arrayDeleteIdDataDetail = ref<Array<string>>([]);
const deleteDataShow = () => {
  arrayDeleteIdDataDetail.value.forEach(element => {    
    let dat = dataDetailInvoiceAvailable.value.find(ele => ele.id === element); 
      dat.show = null;
      arrayDataDetailInvoiceAvailable.value.splice(dat,1);
      console.log('arrayDataDetailInvoiceAvailable',arrayDataDetailInvoiceAvailable)
  });
  arrayDeleteIdDataDetail.value = [];
}

//Próximo número de factura
const proxNumberInvoice = computed(() => {
  let proxNumInv = 0;
  if(formulario.value.id){
    proxNumInv = formulario.value.prefix +''+(Number(formulario.value.initialNumbering) + Number(formulario.value.invoices_count));
  }else{
    proxNumInv = formulario.value.prefix +''+ formulario.value.initialNumbering;
  }
  return formulario.value.nextInvoiceNumber = proxNumInv;
});


onMounted(async() => {
  await selectInfinite.search()
  await selectInfinite2.search()
  await selectInfinite3.search()
  await typesReceiptInvoiceStore.fetchDataForm(authentication.company.id);
});
</script>
<template>
  <div class="mt-4 mb-4">
    <VRow>
      <VCol cols="12" class="d-flex justify-content-between align-items-center">
        <span
          >Para modificar la actividad económica y otros datos principales de tu
          empresa que se ven reflejados en la factura.
          <a>Ingresa aqui</a>
        </span>
        <VBtn color="secondary" @click="changeScreen('back')"> Atras </VBtn>
      </VCol>
    </VRow>
    <VForm ref="formValidation" lazy-validation>
      <VRow>
        <VCol cols="12">
          <VCard>
            <VCardActions>
              <VBtn
                :icon="showMainData ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="showMainData = !showMainData"
              >
              </VBtn>
              <VBtn
                color="orange-lighten-2"
                variant="text"
                @click="showMainData = !showMainData"
              >
                Datos principales
              </VBtn>
            </VCardActions>
            <VExpandTransition>
              <div v-show="showMainData">
                <VDivider></VDivider>
                <VCardText>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label class="mr-5">En uso</label>
                    </VCol>
                    <VCol cols="6">
                      <VSwitch
                        v-model="formulario.inUse"
                        color="success"
                        inset
                        :value="formulario.inUse"
                        :true-value="1"
                        :false-value="0"
                        hide-details
                      ></VSwitch>
                    </VCol>
                  </VRow>
                  <VDivider class="my-2"></VDivider>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="12">
                      <b>Datos principales del comprobante </b>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Código del comprobante</label>
                    </VCol>
                    <VCol cols="6">
                      <VTextField v-model="formulario.voucherCode" maxlength="3" label="" :error-messages="errors.voucherCode" @keypress="errors.voucherCode = ''" :rules="[requiredValidator,lengthMaxValidator(formulario.voucherCode,3)]"/>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Nombre del comprobante</label>
                    </VCol>
                    <VCol cols="6">
                      <VTextField v-model="formulario.voucherName" maxlength="50" minlength="6"  
                      label="" :error-messages="errors.voucherName" @keypress="errors.voucherName = ''" 
                      :rules="[requiredValidator,,lengthMaxValidator(formulario.voucherName,50),lengthMinValidator(formulario.voucherName,6)]"/>
                    </VCol>
                  </VRow>
                  <VDivider class="my-2"></VDivider>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="12">
                      <b>Resolución de facturación </b>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Usar como documento electrónico</label>
                    </VCol>
                    <VCol cols="6">
                      <VSwitch
                        v-model="formulario.useAsElectronicDocument"
                        color="success"
                        inset
                        :value="formulario.useAsElectronicDocument"
                        :true-value="1"
                        :false-value="0"
                        hide-details
                      ></VSwitch>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Número resolución DIAN</label>
                    </VCol>
                    <VCol cols="6">
                      <VTextField v-model="formulario.resolutionNumberDian" maxlength="100" :error-messages="errors.resolutionNumberDian" @keypress="errors.resolutionNumberDian = ''" :rules="[requiredValidator,lengthMaxValidator(formulario.resolutionNumberDian,100)]"/>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Fecha de inicio de vigencia</label>
                    </VCol>
                    <VCol cols="6">
                      <VTextField
                        type="date"
                        @change="dateFinVigencia"
                        v-model="formulario.effectiveDate"
                        :error-messages="errors.effectiveDate" @keypress="errors.effectiveDate = ''"
                        :rules="[requiredValidator]"
                      />
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Vigencia en meses</label>
                    </VCol>
                    <VCol cols="6">
                      <VSelect
                        :items="validityInMonths"
                        item-title="name"
                        item-value="id"
                        @update:modelValue="dateFinVigencia($event,'select');errors.validityInMonths_id = ''" 
                        v-model="formulario.validityInMonths_id"
                        :error-messages="errors.validityInMonths_id"
                        :rules="[requiredValidator]"
                      ></VSelect>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Fecha final de vigencia</label>
                    </VCol>
                    <VCol cols="6">
                      <VTextField
                        type="date"
                        disabled
                        v-model="formulario.endDateValidity"                      
                      />
                    </VCol>
                  </VRow>
                  <VDivider class="my-2"></VDivider>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="12">
                      <b>Numeración </b>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Prefijo</label>
                    </VCol>
                    <VCol cols="6">
                      <VTextField v-model="formulario.prefix" maxlength="4" :error-messages="errors.prefix" @keypress="errors.prefix = ''" :rules="[requiredValidator,lengthMaxValidator(formulario.prefix,4)]"/>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Numeración inicial</label>
                    </VCol>
                    <VCol cols="6">
                      <VTextField v-model="formulario.initialNumbering" @keypress="errors.initialNumbering = ''" :error-messages="errors.initialNumbering" :rules="[requiredValidator,lengthMaxValidator(formulario.initialNumbering,10)]"/>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Numeración final</label>
                    </VCol>
                    <VCol cols="6">
                      <VTextField v-model="formulario.finalNumbering" @keypress="errors.finalNumbering = ''" :error-messages="errors.finalNumbering" :rules="[requiredValidator,lengthMaxValidator(formulario.finalNumbering,10)]"/>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Próximo número de factura</label>
                    </VCol>
                    <VCol cols="6">
                      {{ proxNumberInvoice }}
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Numeración automática</label>
                    </VCol>
                    <VCol cols="6">
                      <VSwitch
                        v-model="formulario.automaticNumbering"
                        color="success"
                        inset
                        :value="formulario.automaticNumbering"
                        :true-value="1"
                        :false-value="0"
                        hide-details
                      ></VSwitch>
                    </VCol>
                  </VRow>
                </VCardText>
              </div>
            </VExpandTransition>
          </VCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VCard>
            <VCardActions>
              <VBtn
                :icon="
                  showElectronicBilling ? 'mdi-chevron-up' : 'mdi-chevron-down'
                "
                @click="showElectronicBilling = !showElectronicBilling"
              >
              </VBtn>
              <VBtn
                color="orange-lighten-2"
                variant="text"
                @click="showElectronicBilling = !showElectronicBilling"
              >
                Datos adicionales para facturación electrónica
              </VBtn>
            </VCardActions>
            <VExpandTransition>
              <div v-show="showElectronicBilling">
                <VDivider></VDivider>
                <VCardText>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Habilitar orden de entrega</label>
                    </VCol>
                    <VCol cols="6">
                      <VSwitch
                        v-model="formulario.deliveryOrder"
                        color="success"
                        inset
                        :value="formulario.deliveryOrder"
                        :true-value="1"
                        :false-value="0"
                        hide-details
                      ></VSwitch>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Habilitar orden de compra</label>
                    </VCol>
                    <VCol cols="6">
                      <VSwitch
                        v-model="formulario.purchaseOrder"
                        color="success"
                        inset
                        :value="formulario.purchaseOrder"
                        :true-value="1"
                        :false-value="0"
                        hide-details
                      ></VSwitch>
                    </VCol>
                  </VRow>
                </VCardText>
              </div>
            </VExpandTransition>
          </VCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VCard>
            <VCardActions>
              <VBtn
                :icon="showAddOnSettings ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="showAddOnSettings = !showAddOnSettings"
              >
              </VBtn>
              <VBtn
                color="orange-lighten-2"
                variant="text"
                @click="showAddOnSettings = !showAddOnSettings"
              >
                Configuraciones complementarias</VBtn
              >
            </VCardActions>
            <VExpandTransition>
              <div v-show="showAddOnSettings">
                <VDivider></VDivider>
                <VCardText>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Incluir decimales</label>
                    </VCol>
                    <VCol cols="6">
                      <VSwitch
                        v-model="formulario.includeDecimals"
                        color="success"
                        inset
                        :value="formulario.includeDecimals"
                        :true-value="1"
                        :false-value="0"
                        hide-details
                      ></VSwitch>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Activar vendedores por item</label>
                    </VCol>
                    <VCol cols="6">
                      <VSwitch
                        v-model="formulario.activateVendorsByItem"
                        color="success"
                        inset
                        :value="formulario.activateVendorsByItem"
                        :true-value="1"
                        :false-value="0"
                        hide-details
                      ></VSwitch>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for=""
                        >Habilitar cruce de remisiones en la factura</label
                      >
                    </VCol>
                    <VCol cols="6">
                      <VSwitch
                        v-model="formulario.enableCrossRemittances"
                        color="success"
                        inset
                        :value="formulario.enableCrossRemittances"
                        :true-value="1"
                        :false-value="0"
                        hide-details
                      ></VSwitch>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Tipo de descuento por item</label>
                    </VCol>
                    <VCol cols="6">
                      <VSelect
                        :items="discountPerItem"
                        item-title="name"
                        item-value="id"
                        v-model="formulario.discountTypePerItem_id"
                        @update:modelValue="errors.discountTypePerItem_id = ''"
                        :error-messages="errors.discountTypePerItem_id"
                        :rules="[requiredValidator]"
                      ></VSelect>
                    </VCol>
                  </VRow>
                  <VDivider />
                  <VRow class="d-flex align-items-center">
                    <VCol cols="12">
                      <b>Cuentas contables </b>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for=""
                        >Cuentas contables para descuento por item</label
                      >
                    </VCol>
                    <VCol cols="6">
                      <VSelect :loading="loading" label="Cuenta contable" item-title="name" item-value="id"
                        :items="selectInfinite.dataNueva.value"
                        :modelValue="formulario.LedgerAccountsDiscount_id"
                        @update:modelValue="changeSelectLedgerAccountsDiscount($event);errors.LedgerAccountsDiscount_id = ''"
                        :error-messages="errors.LedgerAccountsDiscount_id"
                        :rules="[requiredValidator]" 
                        >

                        <template v-slot:prepend-item>
                          <VTextField placeholder="Buscar..." class="mb-2" v-model="selectInfinite.searchQuery.value" />
                          <v-divider></v-divider>
                        </template>
                        <template v-slot:append-item>
                          <v-divider> </v-divider>
                          <div class="d-flex justify-content-center aling-items-center">
                            <v-progress-circular v-show="loading" size="24" color="primary" indeterminate></v-progress-circular>
                          </div>
                          <div v-if="!loading" class="d-flex justify-content-between aling-items-center p-2">
                            <RouterLink :to="{ name: 'Admin-LedgerAccount-Index' }"
                              class="app-logo d-flex align-center gap-x-3 app-title-wrapper">
                              <VBtn color="success">Crear Registro</VBtn>
                            </RouterLink>
                            <div>
                              <VBtn class="mt-2" :disabled="selectInfinite.page.value <= 1" @click="selectInfinite.prev()"
                                color="success">
                                <VIcon icon="mdi-chevron-left"></VIcon>
                              </VBtn>
                              <VBtn class="mt-2" :disabled="selectInfinite.page.value >= selectInfinite.totalLinks.value"
                                @click="selectInfinite.next()" color="success">
                                <VIcon icon="mdi-chevron-right"></VIcon>
                              </VBtn>
                            </div>
                          </div>
                        </template>
                      </VSelect>
                    </VCol>

                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for=""
                        >Cuentas contables para factura de obsequios</label
                      >
                    </VCol>
                    <VCol cols="6">
                      <VSelect :loading="loading" label="Cuenta contable" item-title="name" item-value="id"
                        :items="selectInfinite2.dataNueva.value"
                        :modelValue="formulario.LedgerAccountsGift_id"
                        @update:modelValue="changeSelectLedgerAccountsGif($event);errors.LedgerAccountsGift_id = ''"
                        :error-messages="errors.LedgerAccountsGift_id"
                        :rules="[requiredValidator]"
                        >

                        <template v-slot:prepend-item>
                          <VTextField placeholder="Buscar..." class="mb-2" v-model="selectInfinite2.searchQuery.value" />
                          <v-divider></v-divider>
                        </template>
                        <template v-slot:append-item>
                          <v-divider> </v-divider>
                          <div class="d-flex justify-content-center aling-items-center">
                            <v-progress-circular v-show="loading" size="24" color="primary" indeterminate></v-progress-circular>
                          </div>
                          <div v-if="!loading" class="d-flex justify-content-between aling-items-center p-2">
                            <RouterLink :to="{ name: 'Admin-LedgerAccount-Index' }"
                              class="app-logo d-flex align-center gap-x-3 app-title-wrapper">
                              <VBtn color="success">Crear Registro</VBtn>
                            </RouterLink>
                            <div>
                              <VBtn class="mt-2" :disabled="selectInfinite2.page.value <= 1" @click="selectInfinite2.prev()"
                                color="success">
                                <VIcon icon="mdi-chevron-left"></VIcon>
                              </VBtn>
                              <VBtn class="mt-2" :disabled="selectInfinite2.page.value >= selectInfinite2.totalLinks.value"
                                @click="selectInfinite2.next()" color="success">
                                <VIcon icon="mdi-chevron-right"></VIcon>
                              </VBtn>
                            </div>
                          </div>
                        </template>
                      </VSelect>
                    </VCol>
                  </VRow>
                  <VDivider />
                  <VRow class="d-flex align-items-center">
                    <VCol cols="12">
                      <b>Retenciones </b>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Habilitar ReteIVA</label>
                    </VCol>
                    <VCol cols="6">
                      <VSwitch
                        v-model="formulario.reteIva"
                        color="success"
                        inset
                        :value="formulario.reteIva"
                        :true-value="1"
                        :false-value="0"
                        hide-details
                      ></VSwitch>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Habilitar ReteICA</label>
                    </VCol>
                    <VCol cols="6">
                      <VSwitch
                        v-model="formulario.reteIca"
                        color="success"
                        inset
                        :value="formulario.reteIca"
                        :true-value="1"
                        :false-value="0"
                        hide-details
                      ></VSwitch>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Habilitar Autorretención</label>
                    </VCol>
                    <VCol cols="6">
                      <VSwitch
                        v-model="formulario.selfRetaining"
                        color="success"
                        inset
                        :value="formulario.selfRetaining"
                        :true-value="1"
                        :false-value="0"
                        hide-details
                      ></VSwitch>
                    </VCol>
                  </VRow>

                  <VDivider />
                  <VRow class="d-flex align-items-center">
                    <VCol cols="12">
                      <b>Configuraciones de otras actividades economicas </b>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Facturar Ingresos para terceros</label>
                    </VCol>
                    <VCol cols="6">
                      <VSwitch
                        v-model="formulario.invoicingIncomeForThirdParties"
                        color="success"
                        inset
                        :value="formulario.invoicingIncomeForThirdParties"
                        :true-value="1"
                        :false-value="0"
                        hide-details
                      ></VSwitch>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Habilitar copagos / anticipos</label>
                    </VCol>
                    <VCol cols="6">
                      <VSwitch
                        v-model="formulario.copaysAdvances"
                        color="success"
                        inset
                        :value="formulario.copaysAdvances"
                        :true-value="1"
                        :false-value="0"
                        hide-details
                      ></VSwitch>
                    </VCol>
                  </VRow>
                </VCardText>
              </div>
            </VExpandTransition>
          </VCard>
        </VCol>
      </VRow>
      
      <VRow>
        <VCol cols="12">
          <VCard>
            <VCardActions>
              <VBtn
                :icon="showChargesAndDiscountsInvoice ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="showChargesAndDiscountsInvoice = !showChargesAndDiscountsInvoice"
              >
              </VBtn>
              <VBtn
                color="orange-lighten-2"
                variant="text"
                @click="showChargesAndDiscountsInvoice = !showChargesAndDiscountsInvoice"
              >
              Otros cargos y descuentos en totales de la factura de venta</VBtn
              >
            </VCardActions>
            <VExpandTransition>
              <div v-show="showChargesAndDiscountsInvoice">
                <VDivider></VDivider>
                <VCardText>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <VBtn color="primary" @click="typesReceiptInvoiceStore.addArrayChargesAndDiscounts">+ Agregar</VBtn>
                    </VCol>
                    <VCol cols="12">  
                      <v-table
                          fixed-header
                          height="300px"
                        >
                          <thead>
                            <tr>
                              <th class="text-left">
                                En uso
                              </th>
                              <th class="text-left">
                                Nombre
                              </th>
                              <th class="text-left">
                                Tipo
                              </th>
                              <th class="text-left">
                                % Tarifa
                              </th>
                              <th class="text-left">
                                Cuenta Contable
                              </th>
                              <th class="text-left">
                                Acciones
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(item, index) in arrayChargesAndDiscounts"
                              :key="index"
                              v-show="item.delete != 1"
                            >
                              <td>
                                <VSwitch
                                  v-model="item.in_use"
                                  color="success"
                                  inset
                                  :value="item.in_use"
                                  :true-value="1"
                                  :false-value="0"
                                  hide-details
                                ></VSwitch>
                              </td>
                              <td>
                                <VTextField v-model="item.name" maxlength="50"/>
                              </td>
                              <td>
                                <VSelect
                                  :items="typeChargeAndDiscount"
                                  item-title="name"
                                  item-value="id"
                                  v-model="item.type_id"
                                ></VSelect>
                              </td>
                              <td>
                                <VTextField v-model="item.fee" maxlength="15"/>
                              </td>
                              <td>
                                <VSelect label="" item-title="name" item-value="id"
                                  :items="selectInfinite3.dataNueva.value"
                                  v-model="item.ledgerAccount_id"
                                  @update:modelValue="changeSelectLedgerAccounts"
                                  >
                                  <template v-slot:prepend-item>
                                    <VTextField placeholder="Buscar..." class="mb-2" v-model="selectInfinite3.searchQuery.value" />
                                    <v-divider></v-divider>
                                  </template>
                                  <template v-slot:append-item>
                                    <v-divider> </v-divider>
                                    <div class="d-flex justify-content-center aling-items-center">
                                      <v-progress-circular v-show="loading" size="24" color="primary" indeterminate></v-progress-circular>
                                    </div>
                                    <div v-if="!loading" class="d-flex justify-content-between aling-items-center p-2">
                                      <RouterLink :to="{ name: 'Admin-LedgerAccount-Index' }"
                                        class="app-logo d-flex align-center gap-x-3 app-title-wrapper">
                                        <VBtn color="success">Crear Registro</VBtn>
                                      </RouterLink>
                                      <div>
                                        <VBtn class="mt-2" :disabled="selectInfinite3.page.value <= 1" @click="selectInfinite3.prev()"
                                          color="success">
                                          <VIcon icon="mdi-chevron-left"></VIcon>
                                        </VBtn>
                                        <VBtn class="mt-2" :disabled="selectInfinite3.page.value >= selectInfinite3.totalLinks.value"
                                          @click="selectInfinite3.next()" color="success">
                                          <VIcon icon="mdi-chevron-right"></VIcon>
                                        </VBtn>
                                      </div>
                                    </div>
                                  </template>
                                </VSelect>
                              </td>
                              <td>
                                <VBtn
                                    size="x-small"
                                    color="error"
                                    variant="text"
                                    @click="
                                      typesReceiptInvoiceStore.deleteArrayChargesAndDiscounts(
                                        index,
                                        item.id
                                      )
                                    "
                                  >
                                    <VIcon size="22" icon="tabler-trash" />
                                  </VBtn>
                              </td>
                            </tr>
                          </tbody>
                        </v-table>
                    </VCol>
                  </VRow>
                </VCardText>
              </div>
            </VExpandTransition>
          </VCard>
        </VCol>
      </VRow>

      <VRow>
        <VCol cols="12">
          <VCard>
            <VCardActions>
              <VBtn
                :icon="
                  showChargesAndDiscounts ? 'mdi-chevron-up' : 'mdi-chevron-down'
                "
                @click="showChargesAndDiscounts = !showChargesAndDiscounts"
              >
              </VBtn>
              <VBtn
                color="orange-lighten-2"
                variant="text"
                @click="showChargesAndDiscounts = !showChargesAndDiscounts"
              >
                Visualización, impresión y envío de la factura de venta
              </VBtn>
            </VCardActions>
            <VExpandTransition>
              <div v-show="showChargesAndDiscounts">
                <VDivider></VDivider>
                <VCardText>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Formato</label>
                    </VCol>
                    <VCol cols="4">
                      <VSelect
                        :items="formatDisplayPrintInvoice"
                        item-title="name"
                        item-value="id"
                        v-model="formulario.format_id"
                        @update:modelValue="errors.format_id = ''"
                        :error-messages="errors.format_id"
                        :rules="[requiredValidator]"
                      ></VSelect>
                    </VCol>
                    <VCol cols="2"> Vista Previa </VCol>
                  </VRow>
                  <VDivider />
                  <VRow class="d-flex align-items-center">
                    <VCol cols="12">
                      <b>Datos para visualización </b>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Título para visualización</label>
                    </VCol>
                    <VCol cols="6">
                      <VTextField v-model="formulario.titleForDisplay" maxlength="50" :error-messages="errors.titleForDisplay" @keypress="errors.titleForDisplay = ''" :rules="[requiredValidator,lengthMaxValidator(formulario.titleForDisplay,50)]"/>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Departamento</label>
                    </VCol>
                    <VCol cols="6">
                      <v-select
                        :items="departaments"
                        item-title="name"
                        item-value="id"
                        :modelValue="formulario.departament_id"
                        @update:modelValue="showCities"                      
                      ></v-select>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Ciudad</label>
                    </VCol>
                    <VCol cols="6">
                      <VSelect
                        :items="cities"
                        item-title="name"
                        item-value="id"
                        v-model="formulario.city_id"
                      ></VSelect>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Dirección</label>
                    </VCol>
                    <VCol cols="6">
                      <VTextField v-model="formulario.address" maxlength="100" :error-messages="errors.address" @keypress="errors.address = ''" :rules="[requiredValidator,lengthMaxValidator(formulario.address,100)]"/>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">                  
                    <VCol cols="6">
                      <VCol cols="12">
                        <VBtn @click="typesReceiptInvoiceStore.addFormPhone()"
                          >+ Agregar Teléfono</VBtn
                        >
                      </VCol>
                      <VCol cols="12">
                        <VRow
                          v-for="(item, index) in arrayPhone"
                          :key="index"
                          v-show="item.delete != 'delete'"
                        >
                          <VCol cols="2">
                            Teléfono {{ index + 1 }}
                          </VCol>
                          <VCol cols="3">
                            <VTextField
                              v-model="item.indicative"
                              maxlength="10"
                              label="Indicativo"
                            />
                          </VCol>
                          <VCol cols="3">
                            <VTextField
                              v-model="item.phone"
                              maxlength="10"
                              label="# de Teléfono"
                            />
                          </VCol>
                          <VCol cols="3">
                            <VTextField
                              v-model="item.extension"
                              maxlength="10"
                              label="Extensión"
                            />
                          </VCol>
                          <VCol cols="1">
                            <VBtn
                              size="x-small"
                              color="error"
                              variant="text"
                              @click="
                                typesReceiptInvoiceStore.deleteFormPhone(
                                  index,
                                  item
                                )
                              "
                            >
                              <VIcon size="22" icon="tabler-trash" />
                            </VBtn>
                          </VCol>
                        </VRow>
                      </VCol>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Observaciones</label>
                    </VCol>
                    <VCol cols="6">
                      <VTextarea v-model="formulario.observations" placeholder="Estos son los comentarios que quieres que se visualicen o impriman en este tip de fáctura"
                      :error-messages="errors.observations" @keypress="errors.observations = ''"
                      :rules="[requiredValidator]"
                      />
                    </VCol>
                  </VRow>
                  <VDivider/>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="12">
                      <b>Datos para envío por email </b>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Asunto</label>
                    </VCol>
                    <VCol cols="6">
                      <VTextField v-model="formulario.affair" maxlength="100" :error-messages="errors.affair" @keypress="errors.affair = ''" :rules="[requiredValidator,lengthMaxValidator(formulario.affair,100)]"></VTextField>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Adjuntar archivo</label>
                    </VCol>
                    <VCol cols="6">
                      <VFileInput @change="archive.handleImageSelected"></VFileInput>
                    </VCol>
                  </VRow>
                  <VDivider/>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="12">
                      <b>Datos que verá tu cliente en el detalle de la factura </b>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="5">
                      <label for="">Columnas disponibles</label>
                      <select v-model="arrayIdDataDetail" multiple style="width: 100%;padding: 2rem;text-align: center;" class="pruebaselect">
                        <option v-for="(item, index) in dataDetailInvoiceAvailable" :value="item.id" v-show="!item.show">{{ item.name }}</option>
                      </select>
                    </VCol>
                    <VCol cols="2">
                      <VBtn color="success" @click="addDataShow"> <v-icon class="mr-2">mdi-chevron-right</v-icon> </VBtn><br>
                      <VBtn color="success" @click="deleteDataShow"> <v-icon>mdi-chevron-left</v-icon> </VBtn>
                    </VCol>
                    <VCol cols="5">
                      <label for="">Columnas a visualizar</label>
                      <select v-model="arrayDeleteIdDataDetail" multiple style="width: 100%;padding: 2rem;text-align: center;" class="pruebaselect">
                        <option v-for="(item, index) in arrayDataDetailInvoiceAvailable" :value="item.id">{{ item.name }}</option>
                      </select>
                    </VCol>
                  </VRow>
                </VCardText>
              </div>
            </VExpandTransition>
          </VCard>
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
