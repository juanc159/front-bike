<script lang="ts" setup type="module">
import { useCrudInvoiceStore } from '@/stores/Admin/useCrudInvoiceStore';
import { requiredValidator, soloNumeros,validarDateBeetwen  } from '@validators';
import type { VForm } from 'vuetify/components';
import { AuthenticationStore } from "@/stores/Authentication";
import { useImageUpload } from '@/composables/useImageUpload';
import { useSelect2Infite } from "@/composables/useSelect2Infite"; 
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import moment from 'moment';

const props = defineProps({
  showBtnSave: {
    type: Boolean,
    required: false,
    default: true
  },
  showBtnBack: {
    type: Boolean,
    required: false,
    default: true
  },
  disabledType: {
    type: Boolean,
    required: false,
    default: false
  },
  numPrueba: {
    type: Number,
    required: false,
    default: 0
  }
})
 
const authentication = AuthenticationStore();
const invoiceStore = useCrudInvoiceStore()

const { formulario,arrayWayToPay,arrayProducts,currencys,taxCharge,withholdingTaxe,arrayIva,arrayWithholdingTaxe,loading,products,errorsArrayProduct,errorsArrayWayToPay,campDisabledAutomaticNumbering,customers_arrayInfo,customers_countLinks,userSeller_arrayInfo,userSeller_countLinks,typesReceiptInvoices_arrayInfo,typesReceiptInvoices_countLinks,products_arrayInfo,products_countLinks,arrayInfo,countLinks} = storeToRefs(invoiceStore);

const archive = ref(useImageUpload());

const formValidation = ref<VForm>();
const errors = ref<Array<string>>([]);
const tomorrow = moment();
const tenDaysAgo = moment().subtract(9,'days');
const changeScreen = (typeAction: string) => {
  invoiceStore.typeAction = typeAction
  if (typeAction != 'back')
  invoiceStore.keyList++
}
const exitoProducts = ref<boolean>(true);
const exitoWayToPay = ref<boolean>(true);

//calculo la multiplicacion de cantidad*valor unitario
const calculoCantValue = computed(() => {
  return function (obj: object) {
    const quantityUnitValue = (Number(obj.quantity ?? 0) * Number(obj.unit_value ?? 0));    
    return quantityUnitValue ?? 0;
  }
});

//calculo de descuento
const calculoDesc = computed(() => {
  return function (obj: object) {
    const discount = (Number(obj.discount_rate ?? 0)/100);    
    return discount ?? 0;
  }
});
//Impuesto de Cargo
const calTaxCharge = computed(() => {
  return function (obj: object,totalDicount:number) {
    const taxCharValue = taxCharge.value.find(tax => tax.id === obj.tax_charge);
    const chargeTax = totalDicount * Number(taxCharValue?.value ?? 0);    
    return chargeTax ?? 0;
  }
});
//Impuesto de Retencion
const calWithholdingTax = computed(() => {
  return function (obj: object,totalDicount:number) {
    const taxWithholdingValue = withholdingTaxe.value.find(taxWit => taxWit.id === obj.withholding_tax);
    const taxWithholding = totalDicount * Number(taxWithholdingValue?.value ?? 0);    
    return taxWithholding ?? 0;
  }
});

//Total bruto de la venta
const gross_total = computed(() =>{
  let totalGross = 0;
  if(arrayProducts.value.length > 0){
    arrayProducts.value.forEach((ele) => {
      const value = (Number(ele.quantity ?? 0) * Number(ele.unit_value ?? 0));
      totalGross += value;
    },0);
    return totalGross ?? 0;
  }
});
//descuento en el total
const full_discount = computed(() =>{
  let fullDicount = 0;
  if(arrayProducts.value.length > 0){
    arrayProducts.value.forEach((ele) => {
      const totalGross = calculoCantValue.value(ele);
      const discount = calculoDesc.value(ele);
      const value = totalGross * discount;
      fullDicount += value;
    },0);
    return fullDicount ?? 0;
  }
});
//subtotal del total bruto - descuento total
const Subtotal_product = computed(() =>{
  let SubtotalProduct = (gross_total.value ?? 0) - (full_discount.value ?? 0);  
  return SubtotalProduct ?? 0;
});

//IVA
const changeTaxCharges = () => {
    arrayIva.value = [];
    arrayProducts.value.forEach(ele => {
    const dataIva = taxCharge.value.find(e => e.id === ele.tax_charge);
    if(dataIva){
      const calculoCantVal = calculoCantValue.value(ele);//cantidad * valor
      const calculoDiscount = calculoDesc.value(ele);//descuento en decimal
      const dicountt = (calculoCantVal * calculoDiscount);//descuento multiplicado
      const totalDesc = calculoCantVal - dicountt;//total del descuento
      const calTaxChargeValue = calTaxCharge.value(ele,totalDesc);//impuesto del cargo IVA calculado
      const dataExist = arrayIva.value.find(element => element.iva_id === dataIva.id);
        if(dataExist){
          dataExist.iva = Number(dataExist.iva) + calTaxChargeValue;
        }
        else{          
          arrayIva.value.push({
            iva_id:dataIva?.id,
            name:dataIva?.name,
            value:dataIva?.value,
            iva:calTaxChargeValue.toFixed(2)
          });
        }
    }
  });
}
//IVA changeWithholdingTaxe
const changeWithholdingTaxe = () => {
    arrayWithholdingTaxe.value = [];
    arrayProducts.value.forEach(ele => {
    const WithholdingTaxe = withholdingTaxe.value.find(e => e.id === ele.withholding_tax);
    if(WithholdingTaxe){
      const calculoCantVal = calculoCantValue.value(ele);//cantidad * valor
      const calculoDiscount = calculoDesc.value(ele);//descuento en decimal
      const dicountt = (calculoCantVal * calculoDiscount);//descuento multiplicado
      const totalDesc = calculoCantVal - dicountt;//total del descuento
      const calWithholdingTaxeValue = calWithholdingTax.value(ele,totalDesc);//impuesto del retencion IVA calculado
      const dataExist = arrayWithholdingTaxe.value.find(element => element.withholdingTaxe_id === WithholdingTaxe.id);
        if(dataExist){
          dataExist.iva = Number(dataExist.iva) + calWithholdingTaxeValue;
        }
        else{          
          arrayWithholdingTaxe.value.push({
            withholdingTaxe_id:WithholdingTaxe?.id,
            name:WithholdingTaxe?.name,
            value:WithholdingTaxe?.value,
            iva:calWithholdingTaxeValue.toFixed(2)
          });
        }
    }
  });
}

//Total formas de pago
const totalFormsOfPayment = computed(() => {
  let total_payment = 0;
  if(arrayWayToPay.value.length > 0){
    arrayWayToPay.value.forEach((ele) => {
      total_payment += Number(ele.amount);
    },0);
    return total_payment ?? 0;
  }
});

//TOTAL NETO
const net_total = computed(() =>{
  let netTotal = 0;
  if(arrayProducts.value.length > 0){
    arrayProducts.value.forEach((ele) => {
      const value = total.value(ele);
      netTotal += Number(value);
    });
    changeTaxCharges()
    changeWithholdingTaxe()
    return netTotal ?? 0;
  }
});

const changeSelectLedgerAccountsDiscount = (value:number,obj:object)=>{  
  let ledgerAccountsDis = selectInfinite.dataNueva.value.find(ele => ele.id === value);
  if(ledgerAccountsDis){    
    obj.table = ledgerAccountsDis.table;
    obj.ledgerAccount_id = ledgerAccountsDis.id;
  }  
}

//Selecciona el precio del producto
const priceProduct = (value:object,obj:object) => {
  let dataProduct = products_arrayInfo.value.find((ele) => ele.id === value);
  obj.unit_value = dataProduct.price;
}

const numberIncrementInvoice = (id:number) =>{
  invoiceStore.numberIncrementInvoice(id);
}

const selectInfinite = useSelect2Infite(invoiceStore.fetchLedgerAccountAuxiliaryList, arrayInfo, {
  company_id: authentication.company.id,
});

const selectInfinite2 = useSelect2Infite(invoiceStore.fetchProductList, products_arrayInfo, {
  company_id: authentication.company.id,
});

const selectInfinite3 = useSelect2Infite(invoiceStore.fetchTypeReceipInvoicetList, typesReceiptInvoices_arrayInfo, {
  company_id: authentication.company.id,
});

const selectInfinite4 = useSelect2Infite(invoiceStore.fetchCustomerOfThirdList, customers_arrayInfo, {
company_id: authentication.company.id,
});

const selectInfinite5 = useSelect2Infite(invoiceStore.fetchSellerOfUserList, userSeller_arrayInfo, {
  company_id: authentication.company.id,
});

watch(() => props.numPrueba, (newValue, oldValue) => {
  console.log('La prop "propValue" ha cambiado:', newValue);
  submitForm()
});

onMounted(async () => {
  await invoiceStore.fetchDataForm(authentication.company.id); 
  selectInfinite.dataNueva.value = arrayInfo.value; 
  selectInfinite.totalLinks.value = countLinks.value; 
  selectInfinite2.dataNueva.value = products_arrayInfo.value;//lista productos
  selectInfinite2.totalLinks.value = products_countLinks.value;//Paginado productos
  selectInfinite3.dataNueva.value = typesReceiptInvoices_arrayInfo.value;//lista tipo de recibo de la factura(tabla->typesReceiptInvoices)
  selectInfinite3.totalLinks.value = typesReceiptInvoices_countLinks.value;//Paginado tipo de recibo de la factura(tabla->typesReceiptInvoices)
  selectInfinite4.dataNueva.value = customers_arrayInfo.value;//lista clientes(tabla->third)
  selectInfinite4.totalLinks.value = customers_countLinks.value;//Paginado cliente(tabla->third)
  selectInfinite5.dataNueva.value = userSeller_arrayInfo.value;//lista Vendedor(tabla->users)
  selectInfinite5.totalLinks.value = userSeller_countLinks.value;//Paginado Vendedor(tabla->users)
});

const submitForm = async () => {
  const validation = await formValidation.value?.validate();
  if (validation?.valid) {
    
    //VALIDAR ARRAY PRODUCTO
    exitoProducts.value = true;
    arrayProducts.value.forEach((element,key) => {
      if(!element.product_id) {
        errorsArrayProduct.value[key].product_id = 'Este campo es obligatorio';
        exitoProducts.value = false;
      }
      else errorsArrayProduct.value[key].product_id = '';
      if(!element.quantity){
        errorsArrayProduct.value[key].quantity = 'Este campo es obligatorio';
        exitoProducts.value = false;
        }
      else errorsArrayProduct.value[key].quantity = '';
      if(!element.unit_value) {
        errorsArrayProduct.value[key].unit_value = 'Este campo es obligatorio';
        exitoProducts.value = false;
      }
      else errorsArrayProduct.value[key].unit_value = '';    
      if(!element.discount_rate) {
        errorsArrayProduct.value[key].discount_rate = 'Este campo es obligatorio';
        exitoProducts.value = false;
      }
      else errorsArrayProduct.value[key].discount_rate = '';    
      if(!element.tax_charge) {
        errorsArrayProduct.value[key].tax_charge = 'Este campo es obligatorio';
        exitoProducts.value = false;
      }
      else errorsArrayProduct.value[key].tax_charge = '';    
      if(!element.withholding_tax) {
        errorsArrayProduct.value[key].withholding_tax = 'Este campo es obligatorio';
        exitoProducts.value = false;
      }
      else errorsArrayProduct.value[key].withholding_tax = '';    
    });
    
    if(!exitoProducts.value  ||  arrayProducts.value.length < 1){
      Swal.fire(
        'Ingrese almenos un producto',
        '',
        'question'
      );
      return false;
    }

    //VALIDAR ARRAY FORMAS DE PAGO
    exitoWayToPay.value = true;
    arrayWayToPay.value.forEach((element,key) => {
      if(!element.ledgerAccount_id) {
        errorsArrayWayToPay.value[key].ledgerAccount_id = 'Este campo es obligatorio';
        exitoWayToPay.value = false;
      }
      else errorsArrayWayToPay.value[key].ledgerAccount_id = '';
      if(!element.amount){
        errorsArrayWayToPay.value[key].amount = 'Este campo es obligatorio';
        exitoWayToPay.value = false;
        }
      else errorsArrayWayToPay.value[key].amount = '';    
    });
    
    if(!exitoWayToPay.value  ||  arrayWayToPay.value.length < 1){
      Swal.fire(
        'Ingrese almenos una de forma de pago',
        '',
        'question'
      );
      return false;
    }

    formulario.value.company_id = authentication.company.id;    
    formulario.value.gross_total = gross_total.value;
    formulario.value.discount = full_discount.value;
    formulario.value.subtotal = Subtotal_product.value;
    formulario.value.total_form_payment = totalFormsOfPayment.value;
    formulario.value.net_total = net_total.value;  
    formulario.value.attachFile = archive.value.imageFile;  

    if(Number(formulario.value.total_form_payment) < Number(formulario.value.net_total) || Number(formulario.value.total_form_payment) > Number(formulario.value.net_total)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El monto "total formas de pago" no coincide con "Total neto"',
      });
      return false;
    }

    const data = await invoiceStore.fetchSave();
    if (data.status === 200) changeScreen("list");
    if (data.status === 422) errors.value = data.error; //muestra error del back
  }
}
//computed vars
const total = computed(() => {
  return function (obj: object) {
    const quantityUnitValue = calculoCantValue.value(obj);
    const discount = calculoDesc.value(obj);
    const totalDicount = quantityUnitValue - (quantityUnitValue * discount);
    const chargeTax = calTaxCharge.value(obj,totalDicount);
    const withholdingTax = calWithholdingTax.value(obj,totalDicount);
    const value = totalDicount + chargeTax + withholdingTax;
    obj.value_total = value.toFixed(2);
    return value.toFixed(2) ?? 0;
  }
});

</script>

<template>
  <div>
    <VCard class="mt-5">
      <template v-slot:title>
            <VRow>
              <VCol class="d-flex justify-content-between">
                 Formulario Factura
                <VBtn v-show="props.showBtnBack" color="secondary" @click="changeScreen('back')">
                  Atras
                </VBtn>
              </VCol>
            </VRow>
          </template>
      <VCardText>
        <VForm @submit.prevent="() => { }" ref="formValidation" lazy-validation>
          <VRow>
            <VCol cols="12" md="6">
              <VRow no-gutters >
                <VCol cols="12" md="3">
                  <label>Tipo</label>
                </VCol>
                <VCol cols="12" md="9">
                    <VSelect  :disabled="props.disabledType" item-title="voucherName" item-value="id"
                        v-model="formulario.typesReceiptInvoice_id" :items="selectInfinite3.dataNueva.value"
                        :rules="[requiredValidator]"
                        :error-messages="errors.typesReceiptInvoice_id"
                        @update:modelValue="errors.typesReceiptInvoice_id = '';errors.number = '';numberIncrementInvoice($event)"
                        >
                        <template v-slot:prepend-item>
                          <VTextField clearable  placeholder="Buscar..." class="mb-2" v-model="selectInfinite3.searchQuery.value" />
                          <v-divider></v-divider>
                        </template>
                        <template v-slot:append-item>
                          <v-divider> </v-divider>
                          <div class="d-flex justify-content-center aling-items-center">
                            <v-progress-circular v-show="loading" size="24" color="primary" indeterminate></v-progress-circular>
                          </div>
                          <div v-if="!loading" class="d-flex justify-content-between aling-items-center p-2">
                            <RouterLink :to="{ name: 'Admin-TypesReceiptInvoice-Index' }"
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
                    <span>El consecutivo de la factura podría cambiar si alguien más está creando otra factura y la guarda primero. </span>
                  </VTooltip>
                </VCol>
                <VCol cols="12" md="9">
                  <VTextField clearable :disabled="!!campDisabledAutomaticNumbering" v-model="formulario.number" placeholder="Número" :error-messages="errors.number"
                    @keypress="errors.number = '';soloNumeros($event)" :rules="[requiredValidator]" />
                </VCol>
              </VRow>
            </VCol>

            <VCol cols="12" md="6">
              <VRow no-gutters>
                <VCol cols="12" md="3">
                  <label>Cliente</label>
                </VCol>
                <VCol cols="12" md="9">
                  <VSelect  item-title="full_name" item-value="id"
                        v-model="formulario.customer_id" :items="selectInfinite4.dataNueva.value"
                        :rules="[requiredValidator]"
                        :error-messages="errors.customer_id"
                        @update:modelValue="errors.customer_id = ''"
                        >
                        <template v-slot:prepend-item>
                          <VTextField clearable placeholder="Buscar..." class="mb-2" v-model="selectInfinite4.searchQuery.value" />
                          <v-divider></v-divider>
                        </template>
                        <template v-slot:append-item>
                          <v-divider> </v-divider>
                          <div class="d-flex justify-content-center aling-items-center">
                            <v-progress-circular v-show="loading" size="24" color="primary" indeterminate></v-progress-circular>
                          </div>
                          <div v-if="!loading" class="d-flex justify-content-between aling-items-center p-2">
                            <RouterLink :to="{ name: 'Admin-Third-Index' }"
                              class="app-logo d-flex align-center gap-x-3 app-title-wrapper">
                              <VBtn color="success">Crear Registro</VBtn>
                            </RouterLink>
                            <div>
                              <VBtn class="mt-2" :disabled="selectInfinite4.page.value <= 1" @click="selectInfinite4.prev()"
                                color="success">
                                <VIcon icon="mdi-chevron-left"></VIcon>
                              </VBtn>
                              <VBtn class="mt-2" :disabled="selectInfinite4.page.value >= selectInfinite4.totalLinks.value"
                                @click="selectInfinite4.next()" color="success">
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
                  <label>Vendedor</label>
                  <VTooltip location="left">
                    <template #activator="{ props }">
                      <VIcon color="primary" v-bind="props" size="30" icon="mdi-help-circle" />
                    </template>
                    <span>Responsable de la venta en tu empresa.</span>
                  </VTooltip>
                </VCol>
                <VCol cols="12" md="9">
                  <VSelect  item-title="name" item-value="id"
                      
                        v-model="formulario.seller_id" :items="selectInfinite5.dataNueva.value"
                        :rules="[requiredValidator]"
                        :error-messages="errors.seller_id"
                        @update:modelValue="errors.seller_id = ''"
                        >
                        <template v-slot:prepend-item>
                          <VTextField clearable placeholder="Buscar..." class="mb-2" v-model="selectInfinite5.searchQuery.value" />
                          <v-divider></v-divider>
                        </template>
                        <template v-slot:append-item>
                          <v-divider> </v-divider>
                          <div class="d-flex justify-content-center aling-items-center">
                            <v-progress-circular v-show="loading" size="24" color="primary" indeterminate></v-progress-circular>
                          </div>
                          <div v-if="!loading" class="d-flex justify-content-between aling-items-center p-2">
                            <RouterLink :to="{ name: 'Admin-User-Index' }"
                              class="app-logo d-flex align-center gap-x-3 app-title-wrapper">
                              <VBtn color="success">Crear Registro</VBtn>
                            </RouterLink>
                            <div>
                              <VBtn class="mt-2" :disabled="selectInfinite5.page.value <= 1" @click="selectInfinite5.prev()"
                                color="success">
                                <VIcon icon="mdi-chevron-left"></VIcon>
                              </VBtn>
                              <VBtn class="mt-2" :disabled="selectInfinite5.page.value >= selectInfinite5.totalLinks.value"
                                @click="selectInfinite5.next()" color="success">
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
                  <label>Fecha de elaboración</label>
                  <VTooltip location="left">
                    <template #activator="{ props }">
                      <VIcon color="primary" v-bind="props" size="30" icon="mdi-help-circle" />
                    </template>
                    <span>De acuerdo al anexo técnico de facturación electrónica de la DIAN.<br>
                       La fecha de elaboración no puede ser superior o inferior en más de  10 días a la fecha actual.</span>
                  </VTooltip>
                </VCol>
                <VCol cols="12" md="9">
                  <VTextField clearable v-model="formulario.date_elaboration" type="date" placeholder="Fecha de elaboración" :rules="[requiredValidator,validarDateBeetwen(formulario.date_elaboration,tenDaysAgo.format('YYYY-MM-DD'),tomorrow.format('YYYY-MM-DD'))]" :error-messages="errors.date_elaboration" @change="errors.date_elaboration = ''"/>
                </VCol>
              </VRow>
            </VCol>
            <VCol cols="12" md="6">
              <VRow no-gutters>
                <VCol cols="12" md="3">
                  <label>Moneda</label>
                </VCol>
                <VCol cols="12" md="9">
                  <VSelect clearable item-title="name" item-value="id" :items="currencys" v-model="formulario.currency_id" :rules="[requiredValidator]"
                  :error-messages="errors.currency_id"
                  @update:modelValue="errors.currency_id = ''"
                  ></VSelect> 
                </VCol>
              </VRow>
            </VCol>
          </VRow>

          <VDivider class="my-5" />
          <VRow>
            <VCol cols="12">
              <VBtn variant="outlined" @click="invoiceStore.addArrayProducts()">
                    <VIcon icon="mdi-plus-circle"></VIcon> Agregar producto
                  </VBtn>
            </VCol>
          </VRow>
          <VRow v-if="arrayProducts.length>0">
            <VCol cols="12">
              <VTable>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Producto</th>
                    <th>Descripción</th>
                    <th>Cantidad</th>
                    <th>Valor Unitario</th>
                    <th>% Descuento</th>
                    <th>Impuesto Cargo</th>
                    <th>Impuesto Retención</th>
                    <th>Valor Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in arrayProducts" :key="index" v-show="item.delete != 'delete'">
                    <td>{{ index + 1 }}</td>
                    <td>
                      <VSelect item-title="name" item-value="id"
                        v-model="item.product_id" :items="selectInfinite2.dataNueva.value"
                        :error-messages="errorsArrayProduct[index]?.product_id" 
                        @update:modelValue="priceProduct($event,item);errorsArrayProduct[index].product_id = ''"
                        >
                        <template v-slot:prepend-item>
                          <VTextField clearable placeholder="Buscar..." class="mb-2" v-model="selectInfinite2.searchQuery.value" />
                          <v-divider></v-divider>
                        </template>
                        <template v-slot:append-item>
                          <v-divider> </v-divider>
                          <div class="d-flex justify-content-center aling-items-center">
                            <v-progress-circular v-show="loading" size="24" color="primary" indeterminate></v-progress-circular>
                          </div>
                          <div v-if="!loading" class="d-flex justify-content-between aling-items-center p-2">
                            <RouterLink :to="{ name: 'Admin-Product-Index' }"
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
                    </td>
                    <td>
                      <VTextarea :disabled="!item.product_id" clearable v-model="item.description" />
                    </td>
                    <td :style="{ width: '12%' }">
                      <VTextField clearable :disabled="!item.product_id" v-model="item.quantity" :error-messages="errorsArrayProduct[index]?.quantity" @keypress="errorsArrayProduct[index].quantity = '';soloNumeros($event)" />
                    </td>
                    <td :style="{ width: '12%' }">
                      <VTextField clearable :disabled="!item.product_id" v-model="item.unit_value" 
                      :error-messages="errorsArrayProduct[index]?.unit_value" @keypress="errorsArrayProduct[index].unit_value = '';soloNumeros($event)"
                      />
                    </td>
                    <td :style="{ width: '12%' }"> 
                      <VTextField :disabled="!item.product_id" clearable v-model="item.discount_rate" 
                      :error-messages="errorsArrayProduct[index]?.discount_rate" @keypress="errorsArrayProduct[index].discount_rate = '';soloNumeros($event)"
                      />
                    </td>
                    <td>
                      <VSelect :disabled="!item.product_id" clearable item-title="name" item-value="id" :items="taxCharge" v-model="item.tax_charge" @update:modelValue="changeTaxCharges();errorsArrayProduct[index].tax_charge = ''"
                      :error-messages="errorsArrayProduct[index]?.tax_charge"
                      ></VSelect>
                    </td>
                    <td>
                      <VSelect :disabled="!item.product_id" clearable item-title="name" item-value="id" :items="withholdingTaxe" v-model="item.withholding_tax" @update:modelValue="changeWithholdingTaxe();errorsArrayProduct[index].withholding_tax = ''"
                      :error-messages="errorsArrayProduct[index]?.withholding_tax"
                      ></VSelect>
                    </td>
                    <td>
                      {{ total(item) }}
                    </td>
                    <td>
                      <VBtn @click="invoiceStore.deleteArrayProducts(index,item);changeTaxCharges();changeWithholdingTaxe()" icon="tabler-trash" variant="text" color="error" />
                    </td>
                  </tr>
                </tbody>
              </VTable>
            </VCol>
          </VRow>
          <VDivider class="my-5" />
          <VRow>
            <VCol cols="8">
              <VRow>
                <VCol cols="12">
                  <h3>Formas de pago </h3>
                </VCol>
                <VCol cols="12" class="d-flex aling-items-center" v-for="(item,index) in arrayWayToPay" :key="index">
                  <VRow v-show="item.delete != 'delete'">
                    <VCol cols="6" class="d-flex aling-items-center">

                      <VSelect :loading="loading" item-title="name" item-value="id"
                        :items="selectInfinite.dataNueva.value"
                        :modelValue="item.ledgerAccount_id"
                        @update:modelValue="changeSelectLedgerAccountsDiscount($event,item);errorsArrayWayToPay[index].ledgerAccount_id = ''"
                        :error-messages="errorsArrayWayToPay[index]?.ledgerAccount_id" 
                        >

                        <template v-slot:prepend-item>
                          <VTextField clearable placeholder="Buscar..." class="mb-2" v-model="selectInfinite.searchQuery.value" />
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
                    <VCol cols="4" class="d-flex aling-items-center">
                      <VTextField clearable :disabled="!item.ledgerAccount_id" v-model="item.amount" placeholder="0.00" 
                      :error-messages="errorsArrayWayToPay[index]?.amount" @keypress="errorsArrayWayToPay[index].amount = ''"
                      />
                    </VCol>
                    <VCol cols="2" class="d-flex aling-items-center">
                      <VBtn @click="invoiceStore.deleteWayToPay(index,item)" icon="tabler-trash" variant="text" color="error" />
                    </VCol>
                  </VRow>
                </VCol>
              </VRow>
              <VRow>
                <VCol cols="12">
                  <VDivider class="my-5" />
                  <VBtn variant="outlined" @click="invoiceStore.addWayToPay()">
                    <VIcon icon="mdi-plus-circle"></VIcon> Agregar otra forma de pago
                  </VBtn>
                </VCol>
              </VRow>
            </VCol>
            <VCol cols="4">
              <VRow>
                <VCol cols="12">
                  <label for="">Total Bruto: {{ gross_total }}</label>
                </VCol>
              </VRow>
              <VRow>
                <VCol cols="12">
                  <label for="">Descuentos: {{ full_discount }}</label>
                </VCol>
              </VRow>
              <VRow>
                <VCol cols="12">
                  <label for="">Subtotal: {{ Subtotal_product }}</label>
                </VCol>
              </VRow>
              <VRow>
                <VCol cols="12">
                  <label v-for="(item,index) in arrayIva" :key="index">
                    <p>{{ item.name }} : {{ item.iva }}</p>
                  </label>
                </VCol>
              </VRow>
              <VRow>
                <VCol cols="12">
                  <label v-for="(item,index) in arrayWithholdingTaxe" :key="index">
                    <p>{{ item.name }} : {{ item.iva }}</p>
                  </label>
                </VCol>
              </VRow>
            </VCol>
          </VRow>
          <VDivider class="my-5" />
          <VRow>
            <VCol cols="8">
              <VRow>
                <VCol cols="10" class="d-flex justify-content-end">
                  <h2 class="mr-10">Total formas de pago</h2>
                  <h2> {{ totalFormsOfPayment }} </h2>
                </VCol>
                <VCol cols="2">
                </VCol>
              </VRow>
            </VCol>
            <VCol cols="4" class="d-flex justify-content-end">
              <h2 class="mr-10">Total neto:</h2>
              <h2>{{ net_total }}</h2>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="2">
              <label for="">Observación</label>
            </VCol>
            <VCol cols="10">
              <VTextarea v-model="formulario.observation" placeholder="Aquí puedes ingresar comentarios adicionales o infomración para tu cliente. Por ejemplo: 'Favor consignar a la cuenta N° 000000 del baco XYZ'."/>              
            </VCol>
          </VRow>
          <VRow class="d-flex align-items-center">
              <VCol cols="2">
                <label for="">Adjuntar archivo</label>
              </VCol>
              <VCol cols="4">
                <VFileInput @change="archive.handleImageSelected"></VFileInput>
              </VCol>
          </VRow>
          <VRow>
            <VCol cols="12 d-flex justify-content-center">
              <VBtn v-show="props.showBtnSave" color="primary" @click="submitForm()">Guardar</VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template> 
