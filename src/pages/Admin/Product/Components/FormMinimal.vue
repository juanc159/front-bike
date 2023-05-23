<script lang="ts" setup>
import { useCrudProductStore } from "@/stores/Admin/useCrudProductStore";
import { AuthenticationStore } from '@/stores/Authentication';
import { requiredValidator, lengthMaxValidator, validarInputNumerosMiles } from '@validators';
import type { VForm } from 'vuetify/components';
import { useImageUpload } from '@/composables/useImageUpload';
import Swal from "sweetalert2";
const authentication = AuthenticationStore();
const formValidation = ref<VForm>();
const errors = ref<Array<string>>([]);
const productStore = useCrudProductStore();
const { formulario, arrayImages, typeProducts, taxCharges, withholdingTaxes, taxClassifications } = storeToRefs(productStore);
const imagen = ref(useImageUpload());
imagen.value.allowedExtensions = ['png', 'jpg', 'jpeg'];

const changeScreen = async (typeAction: string) => {
  await formValidation.value?.resetValidation();
  errors.value = []
  productStore.typeAction = typeAction
  if (typeAction != 'back')
    productStore.keyList++
}

watch(imagen.value, async () => {
  if (imagen.value.imageUrl && arrayImages.value.length < 5) {
    arrayImages.value.push({
      id: null,
      imageFile: imagen.value.imageFile,
      imageUrl: imagen.value.imageUrl ?? null,
      delete: null,
    })
    imagen.value.imageFile = null
    imagen.value.imageUrl = null
    imagen.value.key++
  }
  if (arrayImages.value.length == 5) {
    Swal.fire("Información", "Solo se permiten 5 imagenes máximo", "info")
    imagen.value.imageFile = null
    imagen.value.imageUrl = null
    imagen.value.key++
  }
})

const deleteObjArrayImages = async (pos:number,obj:object) => {
  if(obj.id) obj.delete = 1
  else arrayImages.value.splice(pos,1)
}

const submitForm = async () => {
  const validation = await formValidation.value?.validate()
  formulario.value.company_id = authentication.company.id;

  console.log("validation?.valid", validation?.valid);

  if (validation?.valid) {
    const data = await productStore.fetchSave();
    if (data.status === 200) changeScreen("list");
    if (data.status === 422) errors.value = data.error; //muestra error del back
  }
};

onMounted(() => {
  productStore.fetchDataForm(authentication.company.id);
});
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12" class="d-flex justify-content-end">
        <VBtn color="secondary" @click="changeScreen('back')"> Atras </VBtn>
      </VCol>
    </VRow>
    <VForm ref="formValidation" lazy-validation>
      <VDivider class="my-5" />
      <VRow>
        <VCol cols="12">
          <b>Tipo</b>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VRadioGroup :rules="[requiredValidator]" inline v-model="formulario.typeProduct_id">
            <VCol cols="4" v-for="(item, index) in typeProducts">
              <div class="d-flex flex-column">
                <VRadio :label="item.name" :value="item.id"></VRadio>
                <span>
                  {{ item.description }}
                </span>
              </div>
            </VCol>
          </VRadioGroup>
        </VCol>
      </VRow>

      <VDivider class="my-5" />

      <VRow>
        <VCol cols="12">
          <b>Imágenes</b>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <label for="">Adjuntar imágenes (máximo 5 de 500px de ancho por 375px de alto)</label>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="4">
          <VFileInput id="imagen" show-size counter label="Imagen" @change="imagen.handleImageSelected"
            :error-messages="errors.imagen" accept="image/*" :key="imagen.key">
            />
          </VFileInput>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VRow>
            <VCol cols="12" sm="4" md="2" class="d-flex child-flex justify-content-center align-items-center"
              v-for="(item, index) in arrayImages" :key="index">
              <VCard width="200px" v-show="!item.delete">
                <VImg aspect-ratio="1" class="bg-grey-lighten-2" :src="item.imageUrl ?? item.path" alt="foto Personal">
                </VImg>
                <VCardActions class="mt-2">
                  <VSpacer></VSpacer>
                  <VBtn size="small" color="error" @click="deleteObjArrayImages(index,item)" variant="text" icon="tabler-trash"></VBtn>
                </VCardActions>
              </VCard>

            </VCol>
          </VRow>
        </VCol>
      </VRow>

      <VDivider class="my-5" />

      <VRow>
        <VCol cols="12">
          <b>Datos básicos</b>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" md="6">
          <VRow>
            <VCol cols="11">
              <VTextField :error-messages="errors.code" type="text" label="Codigo *" maxlength="30" clearable
                :rules="[requiredValidator, lengthMaxValidator(formulario.code, 30)]" v-model="formulario.code">
              </VTextField>
            </VCol>
            <VCol cols="1">
              <VTooltip location="top">
                <template #activator="{ props }">
                  <VIcon color="primary" v-bind="props" size="30" icon="mdi-help-circle" />
                </template>
                <span>Preguntar???. </span>
              </VTooltip>
            </VCol>
          </VRow>
        </VCol>
        <VCol cols="12" md="6">
          <VRow>
            <VCol cols="12">
              <label for="">¿El IVA está incluido en el precio de venta?</label>
              <VTooltip location="top">
                <template #activator="{ props }">
                  <VIcon color="primary" v-bind="props" size="30" icon="mdi-help-circle" />
                </template>
                <span>IVA incluído en el total de las facturas. </span>
              </VTooltip>
              <VRadioGroup v-model="formulario.ivaIncluded" inline :rules="[requiredValidator]">
                <VRadio label="Si" value="Si"></VRadio>
                <VRadio label="No" value="No"></VRadio>
              </VRadioGroup>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" md="6">
          <VRow>
            <VCol cols="12">
              <VTextField clearable type="text" v-model="formulario.name" label="Nombre del producto / servicio *"
                :rules="[requiredValidator]"></VTextField>
            </VCol>
          </VRow>

        </VCol>
        <VCol cols="12" md="6">
          <VTextField clearable type="text" v-model="formulario.price" label="Precio de venta 1"
            :rules="[requiredValidator]"></VTextField>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" md="6">
          <VSelect clearable label="Impuesto Cargo" v-model="formulario.taxCharge_id" item-value="id" item-title="name"
            :items="taxCharges" :rules="[requiredValidator]"></VSelect>
        </VCol>
      </VRow>

      <VDivider class="my-5" />

      <VRow>
        <VCol cols="12">
          <b>Detalle del producto</b>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" md="6">
          <VRow>
            <VCol cols="11">
              <VSelect clearable label="Unidad de medida factura electronica" v-model="formulario.unitOfMeasurement_id"
                item-value="id" item-title="name" :items="[1, 2, 3, 4, 5]" :rules="[requiredValidator]"></VSelect>
            </VCol>
            <VCol cols="1">
              <VTooltip location="top">
                <template #activator="{ props }">
                  <VIcon color="primary" v-bind="props" size="30" icon="mdi-help-circle" />
                </template>
                <span>Valores entregados por la DIAN, la respectiva unidad de medida. </span>
              </VTooltip>
            </VCol>
          </VRow>
        </VCol>
        <VCol cols="12" md="6">
          <VTextField clearable type="text" v-model="formulario.unitOfMeasurement"
            :error-messages="errors.unitOfMeasurement" maxlength="50"
            :rules="[requiredValidator, lengthMaxValidator(formulario.unitOfMeasurement, 50)]"
            label="Unidad de medida impresión factura"></VTextField>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" md="6">
          <VTextField clearable type="text" v-model="formulario.factoryReference" label="Referencia de fábrica"
            :error-messages="errors.factoryReference" maxlength="80"
            :rules="[requiredValidator, lengthMaxValidator(formulario.factoryReference, 80)]"></VTextField>
        </VCol>
        <VCol cols="12" md="6">
          <VTextField clearable type="text" v-model="formulario.barcode" label="Código de barras"
            :error-messages="errors.barcode" maxlength="50"
            :rules="[requiredValidator, lengthMaxValidator(formulario.barcode, 50)]"></VTextField>
        </VCol>
      </VRow>

      <VDivider class="my-5" />

      <VRow>
        <VCol cols="12">
          <b>Descripción larga</b>
        </VCol>
      </VRow>

      <VRow>
        <VCol cols="12">
          <VTextarea v-model="formulario.description" :rules="[requiredValidator]" />
        </VCol>
      </VRow>

      <VDivider class="my-5" />

      <VRow>
        <VCol cols="12">
          <b>Información tributaria</b>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" md="6">
          <VSelect clearable label="Clasificación tributaria" v-model="formulario.taxClassification_id" item-value="id"
            item-title="name" :items="taxClassifications" :rules="[requiredValidator]"></VSelect>
        </VCol>
        <VCol cols="12" md="6">
          <VSelect clearable label="Impuestos retenidos" v-model="formulario.withholdingTaxes_id" item-value="id"
            item-title="name" :items="withholdingTaxes" :rules="[requiredValidator]"></VSelect>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" md="6">
          <VTextField clearable type="text" v-model="formulario.valueInpoconsumo"
            @blur="formulario.valueInpoconsumo = validarInputNumerosMiles(formulario.valueInpoconsumo)"
            label="Valor inpoconsumo" :rules="[requiredValidator]"></VTextField>
        </VCol>
        <VRow>
          <VCol cols="12">
            <label>¿El valor aplica para el impuesto al consumo de bolsas?</label>
            <VRadioGroup v-model="formulario.applyConsumptionTax" inline :rules="[requiredValidator]">
              <VRadio label="Si" value="Si"></VRadio>
              <VRadio label="No" value="No"></VRadio>
            </VRadioGroup>
          </VCol>
        </VRow>
      </VRow>

      <VDivider class="my-5" />

      <VRow>
        <VCol cols="12">
          <b>Datyos adicionales</b>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" md="6">
          <VRow>
            <VCol cols="11">
              <VTextField clearable type="text" v-model="formulario.model" label="Modelo" :error-messages="errors.model"
                maxlength="50" :rules="[requiredValidator, lengthMaxValidator(formulario.model, 100)]"></VTextField>
            </VCol>
            <VCol cols="1">
              <VTooltip location="top">
                <template #activator="{ props }">
                  <VIcon color="primary" v-bind="props" size="30" icon="mdi-help-circle" />
                </template>
                <span>Datos de los productos para aquellas empresas que manejan factura de exportación. </span>
              </VTooltip>
            </VCol>
          </VRow>
        </VCol>
        <VCol cols="12" md="6">
          <VRow>
            <VCol cols="11">
              <VTextField clearable type="text" v-model="formulario.tariffCode" label="Código arancelario"
                :error-messages="errors.tariffCode" maxlength="10"
                :rules="[requiredValidator, lengthMaxValidator(formulario.tariffCode, 10)]"></VTextField>
            </VCol>
            <VCol cols="1">
              <VTooltip location="top">
                <template #activator="{ props }">
                  <VIcon color="primary" v-bind="props" size="30" icon="mdi-help-circle" />
                </template>
                <span>Datos de los productos para aquellas empresas que manejan factura de exportación. </span>
              </VTooltip>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" md="6">
          <VRow>
            <VCol cols="11">
              <VTextField clearable type="text" v-model="formulario.mark" label="Marca" :error-messages="errors.mark"
                maxlength="50" :rules="[requiredValidator, lengthMaxValidator(formulario.mark, 50)]"></VTextField>
            </VCol>
            <VCol cols="1">
              <VTooltip location="top">
                <template #activator="{ props }">
                  <VIcon color="primary" v-bind="props" size="30" icon="mdi-help-circle" />
                </template>
                <span>Datos de los productos para aquellas empresas que manejan factura de exportación. </span>
              </VTooltip>
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
