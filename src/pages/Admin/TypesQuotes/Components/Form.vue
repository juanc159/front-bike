<script lang="ts" setup type="module">
import { useCrudTypesQuoteStore } from "@/stores/Admin/useCrudTypesQuoteStore";
import { AuthenticationStore } from "@/stores/Authentication";
import { useImageUpload } from '@/composables/useImageUpload';
import { requiredValidator, lengthMaxValidator, lengthMinValidator, integerValidator } from '@validators';
import type { VForm } from 'vuetify/components';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ModalPreview from "./ModalPreview.vue";

const archive = ref(useImageUpload());
const authentication = AuthenticationStore();
const typesQuoteStore = useCrudTypesQuoteStore();

const {
  formulario,
  showMainData,
  showAddOnSettings,
  showChargesAndDiscounts,
  discountPerItem,
  formatDisplayPrintInvoice,
  arrayFilesEmail, 
  errorsArrayArchive,
  dataDetailQuoteAvailable,
  arrayDataDetailQuoteVisualizes
} = storeToRefs(typesQuoteStore);

const formValidation = ref<VForm>();
const errors = ref<Array<string>>([]);
const changeScreen = async (typeAction: string) => {
  await formValidation.value?.resetValidation();
  typesQuoteStore.typeAction = typeAction;
  if (typeAction != "back") typesQuoteStore.keyList++;
};


 
const submitForm = async () => {
  formulario.value.company_id = authentication.company.id;

  errors.value.header = requiredValidator(formulario.value.header)
  errors.value.contentMail = requiredValidator(formulario.value.contentMail)
  errors.value.conditionsObservations = requiredValidator(formulario.value.conditionsObservations)
 
  

  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    const data = await typesQuoteStore.fetchSave();
    if (data.status === 200) changeScreen("list");
    if (data.status === 422) errors.value = data.error; //muestra error del back
  }
};


//AGREGAR ARCHIVO
const addArchive = async () => { 
  if (!archive.value.name || !archive.value.imageFile) {
    if (!archive.value.name)
      errorsArrayArchive.value.name = "Este campo es obligatorio";
    if (!archive.value.imageFile)
      errorsArrayArchive.value.imageFile = "Este campo es obligatorio";
    return false;
  }   
  await typesQuoteStore.addArrayArchives(archive.value);
  archive.value.clearData();
};

//FLECHA AGREGAR
let arrayIdDataDetail = ref<Array<string>>([]);
const addDataVisualize = () => {
  arrayIdDataDetail.value.forEach(element => {
    let dat = dataDetailQuoteAvailable.value.find(ele => ele.id === element);
    arrayDataDetailQuoteVisualizes.value.push(dat);
    const index = dataDetailQuoteAvailable.value.findIndex(ele => ele.id === element)
    dataDetailQuoteAvailable.value.splice(index, 1)
  });
  arrayIdDataDetail.value = [];
}

//FLECHA QUITAR
let arrayDeleteIdDataDetail = ref<Array<string>>([]);
const deleteDataVisualize = () => {
  arrayDeleteIdDataDetail.value.forEach(element => {
    let dat = arrayDataDetailQuoteVisualizes.value.find(ele => ele.id === element);
    dataDetailQuoteAvailable.value.push(dat);
    const index = arrayDataDetailQuoteVisualizes.value.findIndex(ele => ele.id === element)
    arrayDataDetailQuoteVisualizes.value.splice(index, 1)

  });
  arrayDeleteIdDataDetail.value = [];
}

//Próximo número de factura
const proxNumberQuote = computed(() => {
  let proxNumInv = 0;
  if (formulario.value.id) {
    proxNumInv = Number(formulario.value.initialNumbering);
  } else {
    proxNumInv = formulario.value.initialNumbering;
  }

  return formulario.value.proxNumberQuote = proxNumInv;
});


onMounted(async () => {
  await typesQuoteStore.fetchDataForm(authentication.company.id);
});



const editorConfig = ref({
  // The configuration of the editor.
})
</script>
<template>
  <div class="mt-4 mb-4">

    <VRow>
      <VCol cols="12" class="d-flex justify-content-end align-items-center">
        <VBtn color="secondary" @click="changeScreen('back')"> Atras </VBtn>
      </VCol>
    </VRow>
    <VForm ref="formValidation" lazy-validation>
      <VRow>
        <VCol cols="12">
          <VCard>
            <VCardActions>
              <VBtn :icon="showMainData ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="showMainData = !showMainData">
              </VBtn>
              <VBtn color="orange-lighten-2" variant="text" @click="showMainData = !showMainData">
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
                      <VSwitch v-model="formulario.inUse" color="success" inset :value="formulario.inUse" :true-value="1"
                        :false-value="0" hide-details></VSwitch>
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
                      <VTooltip location="top">
                        <template #activator="{ props }">
                          <VIcon color="primary" v-bind="props" size="30" icon="mdi-help-circle" />
                        </template>
                        <span>Este es el código con el cual podrás identificar el tipo de comprobante al momento de
                          elaborar las cotizaciones. </span>
                      </VTooltip>
                    </VCol>
                    <VCol cols="6">
                      <VTextField v-model="formulario.voucherCode" label="" :error-messages="errors.voucherCode"
                        @keypress="errors.voucherCode = ''"
                        :rules="[requiredValidator, lengthMaxValidator(formulario.voucherCode, 3)]" />
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Nombre del comprobante</label>
                      <VTooltip location="top">
                        <template #activator="{ props }">
                          <VIcon color="primary" v-bind="props" size="30" icon="mdi-help-circle" />
                        </template>
                        <span>Este es el nombre con el cual podrás identificar el tipo de comprobante al momento de
                          elaborar las cotizaciones. </span>
                      </VTooltip>
                    </VCol>
                    <VCol cols="6">
                      <VTextField v-model="formulario.voucherName" label="" :error-messages="errors.voucherName"
                        @keypress="errors.voucherName = ''"
                        :rules="[requiredValidator, , lengthMaxValidator(formulario.voucherName, 50), lengthMinValidator(formulario.voucherName, 6)]" />
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
                      <label for="">Numeración inicial</label>
                    </VCol>
                    <VCol cols="6">
                      <VTextField v-model="formulario.initialNumbering" @keypress="errors.initialNumbering = ''"
                        :error-messages="errors.initialNumbering"
                        :rules="[requiredValidator, lengthMaxValidator(formulario.initialNumbering, 10), integerValidator]" />
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Próximo número de factura</label>
                      <VTooltip location="top">
                        <template #activator="{ props }">
                          <VIcon color="primary" v-bind="props" size="30" icon="mdi-help-circle" />
                        </template>
                        <span>En caso que quieras comenzar con un número consecutivo específico puedes modificar este
                          campo. </span>
                      </VTooltip>
                    </VCol>
                    <VCol cols="6">
                      {{ proxNumberQuote }}
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Numeración automática</label>
                      <VTooltip location="top">
                        <template #activator="{ props }">
                          <VIcon color="primary" v-bind="props" size="30" icon="mdi-help-circle" />
                        </template>
                        <span>El sistema automáticamente asignará el próximo número consecutivo disponible. </span>
                      </VTooltip>
                    </VCol>
                    <VCol cols="6">
                      <VSwitch v-model="formulario.automaticNumbering" color="success" inset
                        :value="formulario.automaticNumbering" :true-value="1" :false-value="0" hide-details></VSwitch>
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
              <VBtn :icon="showAddOnSettings ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="showAddOnSettings = !showAddOnSettings">
              </VBtn>
              <VBtn color="orange-lighten-2" variant="text" @click="showAddOnSettings = !showAddOnSettings">
                Configuraciones complementarias</VBtn>
            </VCardActions>
            <VExpandTransition>
              <div v-show="showAddOnSettings">
                <VDivider></VDivider>
                <VCardText>
                  <VRow class="d-flex align-items-center">
                  <VCol cols="6">
                    <label for="">Incluir decimales</label>
                      <VTooltip location="top">
                        <template #activator="{ props }">
                          <VIcon color="primary" v-bind="props" size="30" icon="mdi-help-circle" />
                        </template>
                        <span>El uso de decimales en los Documentos Electrónicos es requerido para coincidir con los
                          cálculos que hace la DIAN en la validación de la información enviada. </span>
                      </VTooltip>
                    </VCol>
                    <VCol cols="6">
                      <VSwitch v-model="formulario.includeDecimals" color="success" inset
                        :value="formulario.includeDecimals" :true-value="1" :false-value="0" hide-details></VSwitch>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Tipo de descuento por item</label>
                    </VCol>
                    <VCol cols="6">
                      <VSelect :items="discountPerItem" item-title="name" item-value="id"
                        v-model="formulario.discountTypePerItem_id"
                        @update:modelValue="errors.discountTypePerItem_id = ''"
                        :error-messages="errors.discountTypePerItem_id" :rules="[requiredValidator]"></VSelect>
                    </VCol>
                  </VRow>
                  <VDivider class="my-5" />
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
              <VBtn :icon="
                showChargesAndDiscounts ? 'mdi-chevron-up' : 'mdi-chevron-down'
              " @click="showChargesAndDiscounts = !showChargesAndDiscounts">
              </VBtn>
              <VBtn color="orange-lighten-2" variant="text" @click="showChargesAndDiscounts = !showChargesAndDiscounts">
                Visualización, impresión y envío de la cotización
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
                      <VSelect clearable :items="formatDisplayPrintInvoice" item-title="name" item-value="id"
                        v-model="formulario.format_id" @update:modelValue="errors.format_id = ''"
                        :error-messages="errors.format_id" :rules="[requiredValidator]"></VSelect>
                    </VCol>
                    <VCol cols="2" v-show="formulario.format_id">
                      <ModalPreview title-btn="Vista Previa"></ModalPreview>
                    </VCol>
                  </VRow>
                  <VDivider class="my-5" />
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
                      <VTextField v-model="formulario.titleForDisplay" :error-messages="errors.titleForDisplay"
                        @keypress="errors.titleForDisplay = ''"
                        :rules="[requiredValidator, lengthMaxValidator(formulario.titleForDisplay, 50)]" />
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Encabezado</label>
                    </VCol>
                    <VCol cols="6">
                      <ckeditor  v-model="formulario.header" :config="editorConfig" :editor="ClassicEditor"></ckeditor>
                      <span class="text-error" v-if="errors.header && !formulario.header"> {{ errors.header }}</span>
 
                      <!-- <VTextarea v-model="formulario.header" :error-messages="errors.header"
                                @keypress="errors.header = ''" :rules="[requiredValidator]" /> -->
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Condiciones comerciales u observaciones</label>
                    </VCol>
                    <VCol cols="6">
                      <ckeditor v-model="formulario.conditionsObservations" :config="editorConfig"
                        :editor="ClassicEditor"></ckeditor>
                        <span class="text-error" v-if="errors.conditionsObservations && !formulario.conditionsObservations"> {{ errors.conditionsObservations }}</span> 

                      <!-- <VTextarea v-model="formulario.conditionsObservations"
                                :error-messages="errors.conditionsObservations" @keypress="errors.conditionsObservations = ''"
                                :rules="[requiredValidator]" /> -->
                    </VCol>
                  </VRow>
                  <VDivider class="my-5" />
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
                      <VTextField v-model="formulario.subjectMail" :error-messages="errors.subjectMail"
                        @keypress="errors.subjectMail = ''"
                        :rules="[requiredValidator, lengthMaxValidator(formulario.affair, 100)]"></VTextField>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="6">
                      <label for="">Contenido</label>
                    </VCol>
                    <VCol cols="6">
                      <ckeditor v-model="formulario.contentMail" :config="editorConfig" :editor="ClassicEditor">
                      </ckeditor>
                      <span class="text-error" v-if="errors.contentMail && !formulario.contentMail"> {{ errors.contentMail }}</span> 

                      <!-- <VTextarea v-model="formulario.contentMail" :error-messages="errors.contentMail"
                                @keypress="errors.contentMail = ''" :rules="[requiredValidator]" /> -->
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="3">
                      <label for="">Adjuntar archivos</label>
                    </VCol>
                    <VCol cols="3">
                      <VTextField label="nombre" v-model="archive.name" />
                    </VCol>
                    <VCol cols="3">
                      <VFileInput :key="archive.key" @change="archive.handleImageSelected"></VFileInput>
                    </VCol>
                    <VCol cols="3">
                      <VBtn size="38"  @click="addArchive">
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
                        <tr v-for="(item,index) in arrayFilesEmail" :key="index">
                          <td v-if="!item.delete">
                            {{ item.name }}
                          </td>
                          <td v-if="!item.delete">
                            <VBtn @click="typesQuoteStore.deleteArrayArchives(index, item)" color="error" size="38">
                              <VIcon  icon="tabler-trash" size="22" />
                            </VBtn>
                          </td>
                        </tr>
                      </tbody>
                    </VTable>
                  </VRow>
                  <VDivider class="my-5" />
                  <VRow class="d-flex align-items-center">
                    <VCol cols="12">
                      <b>Datos que verá tu cliente en el detalle de la cotización </b>
                    </VCol>
                  </VRow>
                  <VRow class="d-flex align-items-center">
                    <VCol cols="5">
                      <label for="">Columnas disponibles</label>
                      <select v-model="arrayIdDataDetail" multiple style="width: 100%;padding: 2rem;text-align: center;"
                        class="pruebaselect">
                        <option v-for="(item, index) in dataDetailQuoteAvailable" :value="item.id" v-show="!item.show">{{
                          item.name }}</option>
                      </select>
                    </VCol>
                    <VCol cols="2">
                      <VBtn color="success" @click="addDataVisualize"> <v-icon class="mr-2">mdi-chevron-right</v-icon>
                      </VBtn>
                      <br>
                      <VBtn color="success" @click="deleteDataVisualize"> <v-icon>mdi-chevron-left</v-icon> </VBtn>
                    </VCol>
                    <VCol cols="5">
                      <label for="">Columnas a visualizar</label>
                      <select v-model="arrayDeleteIdDataDetail" multiple
                        style="width: 100%;padding: 2rem;text-align: center;" class="pruebaselect">
                        <option v-for="(item, index) in arrayDataDetailQuoteVisualizes" :value="item.id">{{ item.name }}
                        </option>
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
