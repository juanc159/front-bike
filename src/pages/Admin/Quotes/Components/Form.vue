<script lang="ts" setup type="module">
import { useCrudQuoteStore } from '@/stores/Admin/useCrudQuoteStore';
import { useCrudProductStore } from '@/stores/Admin/useCrudProductStore';
import { requiredValidator, soloNumeros, validarDateBeforeOrSame } from '@validators';
import type { VForm } from 'vuetify/components';
import { AuthenticationStore } from "@/stores/Authentication";
import { useImageUpload } from '@/composables/useImageUpload';
import { useSelect2Infite } from "@/composables/useSelect2Infite";
import ModalProducts from "@/pages/Admin/Quotes/Components/ModalProducts.vue";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import moment from 'moment';

// const typesReceiptquoteStore = useCrudTypesReceiptquoteStore();
const authentication = AuthenticationStore();
const quoteStore = useCrudQuoteStore()
const productStore = useCrudProductStore()
const { openModal } = storeToRefs(productStore)
const { arrayFilesEmail, errorsArrayArchive, formulario, arrayProducts, taxCharge, withholdingTaxe, arrayIva, arrayWithholdingTaxe, loading, products, errorsArrayProduct, campDisabledAutomaticNumbering, customers_arrayInfo, customers_countLinks, userSeller_arrayInfo, userSeller_countLinks, products_arrayInfo, products_countLinks, currencies_arrayInfo, currencies_countLinks, typesQuotes_arrayInfo, typesQuotes_countLinks } = storeToRefs(quoteStore);

const archive = ref(useImageUpload());

const formValidation = ref<VForm>();
const errors = ref<Array<string>>([]);
const changeScreen = (typeAction: string) => {
  quoteStore.typeAction = typeAction
  if (typeAction != 'back')
    quoteStore.keyList++
}
const exitoProducts = ref<boolean>(true);
 const submitForm = async () => {
  const validation = await formValidation.value?.validate();
  if (validation?.valid) {

    //VALIDAR ARRAY PRODUCTO
    exitoProducts.value = true;
    arrayProducts.value.forEach((element, key) => {
      if (!element.product_id) {
        errorsArrayProduct.value[key].product_id = 'Este campo es obligatorio';
        exitoProducts.value = false;
      }
      else errorsArrayProduct.value[key].product_id = '';
      if (!element.quantity) {
        errorsArrayProduct.value[key].quantity = 'Este campo es obligatorio';
        exitoProducts.value = false;
      }
      else errorsArrayProduct.value[key].quantity = '';
      if (!element.unit_value) {
        errorsArrayProduct.value[key].unit_value = 'Este campo es obligatorio';
        exitoProducts.value = false;
      }
      else errorsArrayProduct.value[key].unit_value = '';
      if (!element.discount_rate) {
        errorsArrayProduct.value[key].discount_rate = 'Este campo es obligatorio';
        exitoProducts.value = false;
      }
      else errorsArrayProduct.value[key].discount_rate = '';
      if (!element.tax_charge) {
        errorsArrayProduct.value[key].tax_charge = 'Este campo es obligatorio';
        exitoProducts.value = false;
      }
      else errorsArrayProduct.value[key].tax_charge = '';
      if (!element.withholding_tax) {
        errorsArrayProduct.value[key].withholding_tax = 'Este campo es obligatorio';
        exitoProducts.value = false;
      }
      else errorsArrayProduct.value[key].withholding_tax = '';
    });

    if (!exitoProducts.value || arrayProducts.value.length < 1) {
      Swal.fire(
        'Ingrese almenos un producto',
        '',
        'question'
      );
      return false;
    }

    formulario.value.company_id = authentication.company.id;
    formulario.value.gross_total = gross_total.value;
    formulario.value.discount = full_discount.value;
    formulario.value.subtotal = Subtotal_product.value;
    formulario.value.net_total = net_total.value;

    const data = await quoteStore.fetchSave();
    if (data.status === 200) changeScreen("list");
    if (data.status === 422) errors.value = data.error; //muestra error del back
  }
}


//AGREGAR ARCHIVO
const addArchive = async () => {
  if (!archive.value.name || !archive.value.imageFile) {
    if (!archive.value.name)
      errorsArrayArchive.value.name = "Este campo es obligatorio";
    if (!archive.value.imageFile)
      errorsArrayArchive.value.imageFile = "Este campo es obligatorio";
    return false;
  }
  await quoteStore.addArrayArchives(archive.value);
  archive.value.clearData();
};

//computed vars
const total = computed(() => {
  return function (obj: object) {
    const quantityUnitValue = calculoCantValue.value(obj);
    const discount = calculoDesc.value(obj);
    const totalDicount = quantityUnitValue - (quantityUnitValue * discount);
    const chargeTax = calTaxCharge.value(obj, totalDicount);
    const withholdingTax = calWithholdingTax.value(obj, totalDicount);
    const value = totalDicount + chargeTax + withholdingTax;
    obj.value_total = value.toFixed(2);
    return value.toFixed(2) ?? 0;
  }
});

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
    const discount = (Number(obj.discount_rate ?? 0) / 100);
    return discount ?? 0;
  }
});
//Impuesto de Cargo
const calTaxCharge = computed(() => {
  return function (obj: object, totalDicount: number) {
    const taxCharValue = taxCharge.value.find(tax => tax.id === obj.tax_charge);
    const chargeTax = totalDicount * Number(taxCharValue?.value ?? 0);
    return chargeTax ?? 0;
  }
});
//Impuesto de Retencion
const calWithholdingTax = computed(() => {
  return function (obj: object, totalDicount: number) {
    const taxWithholdingValue = withholdingTaxe.value.find(taxWit => taxWit.id === obj.withholding_tax);
    const taxWithholding = totalDicount * Number(taxWithholdingValue?.value ?? 0);
    return taxWithholding ?? 0;
  }
});

//Total bruto de la venta
const gross_total = computed(() => {
  let totalGross = 0;
  if (arrayProducts.value.length > 0) {
    arrayProducts.value.forEach((ele) => {
      const value = (Number(ele.quantity ?? 0) * Number(ele.unit_value ?? 0));
      totalGross += value;
    }, 0);
    return totalGross ?? 0;
  }
});
//descuento en el total
const full_discount = computed(() => {
  let fullDicount = 0;
  if (arrayProducts.value.length > 0) {
    arrayProducts.value.forEach((ele) => {
      const totalGross = calculoCantValue.value(ele);
      const discount = calculoDesc.value(ele);
      const value = totalGross * discount;
      fullDicount += value;
    }, 0);
    return fullDicount ?? 0;
  }
});
//subtotal del total bruto - descuento total
const Subtotal_product = computed(() => {
  let SubtotalProduct = (gross_total.value ?? 0) - (full_discount.value ?? 0);
  return SubtotalProduct ?? 0;
});

//IVA
const changeTaxCharges = () => {
  arrayIva.value = [];
  arrayProducts.value.forEach(ele => {
    const dataIva = taxCharge.value.find(e => e.id === ele.tax_charge);
    if (dataIva) {
      const calculoCantVal = calculoCantValue.value(ele);//cantidad * valor
      const calculoDiscount = calculoDesc.value(ele);//descuento en decimal
      const dicountt = (calculoCantVal * calculoDiscount);//descuento multiplicado
      const totalDesc = calculoCantVal - dicountt;//total del descuento
      const calTaxChargeValue = calTaxCharge.value(ele, totalDesc);//impuesto del cargo IVA calculado
      const dataExist = arrayIva.value.find(element => element.iva_id === dataIva.id);
      if (dataExist) {
        dataExist.iva = Number(dataExist.iva) + calTaxChargeValue;
      }
      else {
        arrayIva.value.push({
          iva_id: dataIva?.id,
          name: dataIva?.name,
          value: dataIva?.value,
          iva: calTaxChargeValue.toFixed(2)
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
    if (WithholdingTaxe) {
      const calculoCantVal = calculoCantValue.value(ele);//cantidad * valor
      const calculoDiscount = calculoDesc.value(ele);//descuento en decimal
      const dicountt = (calculoCantVal * calculoDiscount);//descuento multiplicado
      const totalDesc = calculoCantVal - dicountt;//total del descuento
      const calWithholdingTaxeValue = calWithholdingTax.value(ele, totalDesc);//impuesto del retencion IVA calculado
      const dataExist = arrayWithholdingTaxe.value.find(element => element.withholdingTaxe_id === WithholdingTaxe.id);
      if (dataExist) {
        dataExist.iva = Number(dataExist.iva) + calWithholdingTaxeValue;
      }
      else {
        arrayWithholdingTaxe.value.push({
          withholdingTaxe_id: WithholdingTaxe?.id,
          name: WithholdingTaxe?.name,
          value: WithholdingTaxe?.value,
          iva: calWithholdingTaxeValue.toFixed(2)
        });
      }
    }
  });
}



//TOTAL NETO
const net_total = computed(() => {
  let netTotal = 0;
  if (arrayProducts.value.length > 0) {
    arrayProducts.value.forEach((ele) => {
      const value = total.value(ele);
      netTotal += Number(value);
    });
    changeTaxCharges()
    changeWithholdingTaxe()
    return netTotal ?? 0;
  }
});
 

//Selecciona el precio del producto
const priceProduct = (value: object, obj: object) => {
  let dataProduct = products_arrayInfo.value.find((ele) => ele.id === value);
  obj.unit_value = dataProduct.price;
}

const numberIncrementQuote = (id: number) => {
  quoteStore.numberIncrementQuote(id);
}

const selectInfinite1 = useSelect2Infite(quoteStore.fetchCurrenciesList, currencies_arrayInfo);

const selectInfinite_products = useSelect2Infite(quoteStore.fetchProductList, products_arrayInfo, {
  company_id: authentication.company.id,
});


const selectInfinite_typesQuotes = useSelect2Infite(quoteStore.fetchProductList, typesQuotes_arrayInfo, {
  company_id: authentication.company.id,
});



const selectInfinite4 = useSelect2Infite(quoteStore.fetchCustomerOfThirdList, customers_arrayInfo, {
  company_id: authentication.company.id,
});

const selectInfinite5 = useSelect2Infite(quoteStore.fetchSellerOfUserList, userSeller_arrayInfo, {
  company_id: authentication.company.id,
});

watch(products_arrayInfo, ()=>{
  selectInfinite_products.dataNueva.value = products_arrayInfo.value;//lista productos
  selectInfinite_products.totalLinks.value = products_countLinks.value;//Paginado productos 

})
onMounted(async () => {
  await quoteStore.fetchDataForm(authentication.company.id);
  selectInfinite_typesQuotes.dataNueva.value = typesQuotes_arrayInfo.value;
  selectInfinite_typesQuotes.totalLinks.value = typesQuotes_countLinks.value;

  selectInfinite1.dataNueva.value = currencies_arrayInfo.value;
  selectInfinite1.totalLinks.value = currencies_countLinks.value;
  selectInfinite_products.dataNueva.value = products_arrayInfo.value;//lista productos
  selectInfinite_products.totalLinks.value = products_countLinks.value;//Paginado productos 
  selectInfinite4.dataNueva.value = customers_arrayInfo.value;//lista clientes(tabla->third)
  selectInfinite4.totalLinks.value = customers_countLinks.value;//Paginado cliente(tabla->third)
  selectInfinite5.dataNueva.value = userSeller_arrayInfo.value;//lista Vendedor(tabla->users)
  selectInfinite5.totalLinks.value = userSeller_countLinks.value;//Paginado Vendedor(tabla->users)
});

const handleOpenModal = (action: boolean) => {
  openModal.value = action
  productStore.clearFormulario()
}
</script>

<template>
  <div>
    <VCard class="mt-5">
      <template v-slot:title>
        <VRow>
          <VCol class="d-flex justify-content-between">
            Formulario Cotización
            <VBtn color="secondary" @click="changeScreen('back')">
              Atras
            </VBtn>
          </VCol>
        </VRow>
      </template>
      <VCardText>
        <VForm @submit.prevent="() => { }" ref="formValidation" lazy-validation>
          <VRow>
            <VCol cols="12" md="6">
              <VRow no-gutters>
                <VCol cols="12" md="3">
                  <label>Tipo</label>
                </VCol>
                <VCol cols="12" md="9">
                  <VSelect item-title="voucherName" item-value="id" v-model="formulario.typesQuote_id"
                    :items="selectInfinite_typesQuotes.dataNueva.value" :rules="[requiredValidator]"
                    :error-messages="errors.typesQuote_id"
                    @update:modelValue="errors.typesQuote_id = ''; errors.number = ''; numberIncrementQuote($event)">
                    <template v-slot:prepend-item>
                      <VTextField placeholder="Buscar..." class="mb-2"
                        v-model="selectInfinite_typesQuotes.searchQuery.value" />
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
                          <VBtn class="mt-2" :disabled="selectInfinite_typesQuotes.page.value <= 1"
                            @click="selectInfinite_typesQuotes.prev()" color="success">
                            <VIcon icon="mdi-chevron-left"></VIcon>
                          </VBtn>
                          <VBtn class="mt-2"
                            :disabled="selectInfinite_typesQuotes.page.value >= selectInfinite_typesQuotes.totalLinks.value"
                            @click="selectInfinite_typesQuotes.next()" color="success">
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
                    <span>El consecutivo de la cotización podría cambiar si alguien más está creando otra cotización y la
                      guarda primero. </span>
                  </VTooltip>
                </VCol>
                <VCol cols="12" md="9">
                  <VTextField :disabled="!!campDisabledAutomaticNumbering" v-model="formulario.number" clearable
                    placeholder="Número" :error-messages="errors.number"
                    @keypress="errors.number = ''; soloNumeros($event)" :rules="[requiredValidator]" />
                </VCol>
              </VRow>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" md="6">
              <VRow no-gutters>
                <VCol cols="12" md="3">
                  <label>Cliente</label>
                </VCol>
                <VCol cols="12" md="9">
                  <VSelect item-title="full_name" item-value="id" v-model="formulario.customer_id"
                    :items="selectInfinite4.dataNueva.value" :rules="[requiredValidator]"
                    :error-messages="errors.customer_id" @update:modelValue="errors.customer_id = ''">
                    <template v-slot:prepend-item>
                      <VTextField placeholder="Buscar..." class="mb-2" v-model="selectInfinite4.searchQuery.value" />
                      <v-divider></v-divider>
                    </template>
                    <template v-slot:append-item>
                      <v-divider> </v-divider>
                      <div class="d-flex justify-content-center aling-items-center">
                        <v-progress-circular v-show="loading" size="24" color="primary"
                          indeterminate></v-progress-circular>
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
                  <VSelect item-title="name" item-value="id" v-model="formulario.seller_id"
                    :items="selectInfinite5.dataNueva.value" :rules="[requiredValidator]"
                    :error-messages="errors.seller_id" @update:modelValue="errors.seller_id = ''">
                    <template v-slot:prepend-item>
                      <VTextField placeholder="Buscar..." class="mb-2" v-model="selectInfinite5.searchQuery.value" />
                      <v-divider></v-divider>
                    </template>
                    <template v-slot:append-item>
                      <v-divider> </v-divider>
                      <div class="d-flex justify-content-center aling-items-center">
                        <v-progress-circular v-show="loading" size="24" color="primary"
                          indeterminate></v-progress-circular>
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
          </VRow>
          <VRow>
            <VCol cols="12" md="6">
              <VRow no-gutters>
                <VCol cols="12" md="3">
                  <label>Fecha de elaboración</label>
                </VCol>
                <VCol cols="12" md="9">
                  <VTextField clearable v-model="formulario.date_elaboration" type="date"
                    placeholder="Fecha de elaboración" :rules="[requiredValidator]"
                    :error-messages="errors.date_elaboration" @change="errors.date_elaboration = ''" />
                </VCol>
              </VRow>
            </VCol>
            <VCol cols="12" md="6">
              <VRow no-gutters>
                <VCol cols="12" md="3">
                  <label>Fecha de vencimiento</label>
                </VCol>
                <VCol cols="12" md="9">
                  <VTextField clearable v-model="formulario.date_expiration" type="date"
                    placeholder="Fecha de elaboración"
                    :rules="[requiredValidator, validarDateBeforeOrSame(formulario.date_expiration, formulario.date_elaboration)]"
                    :error-messages="errors.date_expiration" @change="errors.date_expiration = ''" />
                </VCol>
              </VRow>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" md="6">
              <VRow no-gutters>
                <VCol cols="12" md="3">
                  <label>Moneda</label>
                </VCol>
                <VCol cols="12" md="9">
                  <VSelect item-title="name" item-value="id" v-model="formulario.currency_id"
                    :items="selectInfinite1.dataNueva.value" :error-messages="errors.currency_id" clearable
                    :rules="[requiredValidator]" @update:modelValue="errors.currency_id = ''">
                    <template v-slot:prepend-item>
                      <VTextField placeholder="Buscar..." class="mb-2" v-model="selectInfinite1.searchQuery.value" />
                      <v-divider></v-divider>
                    </template>
                    <template v-slot:append-item>
                      <v-divider> </v-divider>
                      <div class="d-flex justify-content-center aling-items-center">
                        <v-progress-circular v-show="loading" size="24" color="primary"
                          indeterminate></v-progress-circular>
                      </div>
                      <div v-if="!loading" class="d-flex justify-content-between aling-items-center p-2">
                        <RouterLink :to="{ name: 'Admin-Product-Index' }"
                          class="app-logo d-flex align-center gap-x-3 app-title-wrapper">
                          <VBtn color="success">Crear Registro</VBtn>
                        </RouterLink>
                        <div>
                          <VBtn class="mt-2" :disabled="selectInfinite1.page.value <= 1" @click="selectInfinite1.prev()"
                            color="success">
                            <VIcon icon="mdi-chevron-left"></VIcon>
                          </VBtn>
                          <VBtn class="mt-2" :disabled="selectInfinite1.page.value >= selectInfinite1.totalLinks.value"
                            @click="selectInfinite1.next()" color="success">
                            <VIcon icon="mdi-chevron-right"></VIcon>
                          </VBtn>
                        </div>
                      </div>
                    </template>
                  </VSelect>


                </VCol>
              </VRow>
            </VCol>
          </VRow>

          <VDivider class="my-5" />
          <VRow>
            <VCol cols="12">
              <VBtn variant="outlined" @click="quoteStore.addArrayProducts()">
                <VIcon icon="mdi-plus-circle"></VIcon> Agregar producto
              </VBtn>
            </VCol>
          </VRow>
          <VRow v-if="arrayProducts.length > 0">
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
                  <tr v-for="(item, index) in arrayProducts" :key="index" v-show="item.delete != 'delete'">
                    <td>{{ index + 1 }}</td>
                    <td>
                      <VSelect item-title="name" item-value="id" v-model="item.product_id"
                        :items="selectInfinite_products.dataNueva.value"
                        :error-messages="errorsArrayProduct[index]?.product_id"
                        @update:modelValue="priceProduct($event, item); errorsArrayProduct[index].product_id = ''">
                        <template v-slot:prepend-item>
                          <VTextField placeholder="Buscar..." class="mb-2"
                            v-model="selectInfinite_products.searchQuery.value" />
                          <v-divider></v-divider>
                        </template>
                        <template v-slot:append-item>
                          <v-divider> </v-divider>
                          <div class="d-flex justify-content-center aling-items-center">
                            <v-progress-circular v-show="loading" size="24" color="primary"
                              indeterminate></v-progress-circular>
                          </div>
                          <div v-if="!loading" class="d-flex justify-content-between aling-items-center p-2">
                            <VBtn color="success" @click="handleOpenModal(true)">
                              Crear Registro
                            </VBtn>

                            <div>
                              <VBtn class="mt-2" :disabled="selectInfinite_products.page.value <= 1"
                                @click="selectInfinite_products.prev()" color="success">
                                <VIcon icon="mdi-chevron-left"></VIcon>
                              </VBtn>
                              <VBtn class="mt-2"
                                :disabled="selectInfinite_products.page.value >= selectInfinite_products.totalLinks.value"
                                @click="selectInfinite_products.next()" color="success">
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
                      <VTextField :disabled="!item.product_id" clearable v-model="item.quantity"
                        :error-messages="errorsArrayProduct[index]?.quantity"
                        @keypress="errorsArrayProduct[index].quantity = ''; soloNumeros($event)" />
                    </td>
                    <td :style="{ width: '12%' }">
                      <VTextField :disabled="!item.product_id" clearable v-model="item.unit_value"
                        :error-messages="errorsArrayProduct[index]?.unit_value"
                        @keypress="errorsArrayProduct[index].unit_value = ''; soloNumeros($event)" />
                    </td>
                    <td :style="{ width: '12%' }">
                      <VTextField :disabled="!item.product_id" clearable v-model="item.discount_rate"
                        :error-messages="errorsArrayProduct[index]?.discount_rate"
                        @keypress="errorsArrayProduct[index].discount_rate = ''; soloNumeros($event)" />
                    </td>
                    <td>
                      <VSelect :disabled="!item.product_id" clearable item-title="name" item-value="id" :items="taxCharge"
                        v-model="item.tax_charge"
                        @update:modelValue="changeTaxCharges(); errorsArrayProduct[index].tax_charge = ''"
                        :error-messages="errorsArrayProduct[index]?.tax_charge"></VSelect>
                    </td>
                    <td>
                      <VSelect :disabled="!item.product_id" clearable item-title="name" item-value="id"
                        :items="withholdingTaxe" v-model="item.withholding_tax"
                        @update:modelValue="changeWithholdingTaxe(); errorsArrayProduct[index].withholding_tax = ''"
                        :error-messages="errorsArrayProduct[index]?.withholding_tax"></VSelect>
                    </td>
                    <td>
                      {{ total(item) }}
                    </td>
                    <td>
                      <VBtn
                        @click="quoteStore.deleteArrayProducts(index, item); changeTaxCharges(); changeWithholdingTaxe()"
                        icon="tabler-trash" variant="text" color="error" />
                    </td>
                  </tr>
                </tbody>
              </VTable>
            </VCol>
          </VRow>
          <VDivider class="my-5" />
          <VRow>
            <VCol cols="8">

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
                  <label v-for="(item, index) in arrayIva" :key="index">
                    <p>{{ item.name }} : {{ item.iva }}</p>
                  </label>
                </VCol>
              </VRow>
              <VRow>
                <VCol cols="12">
                  <label v-for="(item, index) in arrayWithholdingTaxe" :key="index">
                    <p>{{ item.name }} : {{ item.iva }}</p>
                  </label>
                </VCol>
              </VRow>
            </VCol>
          </VRow>
          <VDivider class="my-5" />
          <VRow>
            <VCol cols="8">
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
              <VTextarea v-model="formulario.observation"
                placeholder="Aquí puedes ingresar comentarios adicionales o infomración para tu cliente. Por ejemplo: 'Favor consignar a la cuenta N° 000000 del baco XYZ'." />
            </VCol>
          </VRow>
          <VRow class="d-flex align-items-center">
            <VCol cols="3">
              <label for="">Adjuntar archivos</label>
            </VCol>
            <VCol cols="3">
              <VTextField label="Nombre" v-model="archive.name" />
            </VCol>
            <VCol cols="3">
              <VFileInput :key="archive.key" @change="archive.handleImageSelected"></VFileInput>
            </VCol>
            <VCol cols="3">
              <VBtn size="38" @click="addArchive">
                <VIcon icon="tabler-plus" size="22" />
              </VBtn>
            </VCol>
          </VRow>
          <VRow>
            <VTable class="text-no-wrap">
              <thead>
                <tr>
                  <th>
                    <span>Nombre</span>
                  </th>
                  <th>
                    <span>Acción</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in arrayFilesEmail" :key="index">
                  <td v-if="!item.delete">
                    {{ item.name }}
                  </td>
                  <td v-if="!item.delete">
                    <VBtn @click="quoteStore.deleteArrayArchives(index, item)" color="error" size="38">
                      <VIcon icon="tabler-trash" size="22" />
                    </VBtn>
                  </td>
                </tr>
              </tbody>
            </VTable>
          </VRow>
          <VRow>
            <VCol cols="12 d-flex justify-content-center">
              <VBtn color="primary" @click="submitForm()">Guardar</VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <ModalProducts title-btn="Crear Registro"></ModalProducts>
  </div>
</template> 
