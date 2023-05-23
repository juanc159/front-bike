<script setup lang="ts">
import { AuthenticationStore } from '@/stores/Authentication';
import { useImageUpload } from '@/composables/useImageUpload';
import { useCrudCompanyStore } from "@/stores/Admin/useCrudCompanyStore";
import { requiredValidator, soloNumeros,lengthMaxValidator,emailValidator,lengthMinValidator } from '@validators';
import type { VForm } from 'vuetify/components';

const  companyStoreUseCrud = useCrudCompanyStore();
const auth = AuthenticationStore();
const logo = ref(useImageUpload());
logo.value.allowedExtensions = ['png', 'jpg', 'jpeg'];

const {
  formulario
} = storeToRefs(companyStoreUseCrud);
const formValidation = ref<VForm>();
const changeScreen = async(typeAction:string) => {
  await formValidation.value?.resetValidation();
  companyStoreUseCrud.typeAction = typeAction
  if(typeAction!='back')
    companyStoreUseCrud.keyList++
}
const errors = ref<Array<string>>([]);
const arrayValidator = ref<Array<string>>([]);

const submitForm = async () => {  
  if(logo.value.imageUrl){
    formulario.value.logo = logo.value.imageFile;
  }

  if(formulario.value.id) arrayValidator.value["logo"] = [];
  else arrayValidator.value["logo"] = [requiredValidator(formulario.value.logo)];

  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    formulario.value.user_id = auth.user.id;
    const data = await companyStoreUseCrud.fetchSave();
    if (data.status === 200){
      logo.value.imageFile  = null;
      changeScreen("list");
    }
    if (data.status === 422) errors.value = data.error; //muestra error del back
  }
};

const props = defineProps({
  companyId: {
    type: Number,
    default: null,
    required: false,
  },
});

onMounted(async () => {
  if (props.companyId) await companyStoreUseCrud.fetchInfoCompany(props.companyId);
});
</script>
<template>
  <div>
    <VRow>
      <VCol cols="12" class="d-flex justify-content-end">
        <VBtn color="secondary" @click="changeScreen('list')"> Atras </VBtn>
      </VCol>
    </VRow>
      <VForm ref="formValidation" lazy-validation>
        <VCard title="Formulario de la compañia">      
          <VRow class=" mr-3 ml-4 mb-4">
              <VCol cols="4">
                <VTextField v-model="formulario.name" :error-messages="errors.name" label="Nombre de la compañia" @keypress="errors.name = ''" maxlength="30" :rules="[requiredValidator]"/>
              </VCol>          
              <VCol cols="4">
                <VTextField maxlength="10" v-model="formulario.nit" :error-messages="errors.nit" label="Nit"
                  @keypress="errors.nit = ''; soloNumeros($event)" :rules="[requiredValidator,lengthMaxValidator(formulario.nit,10)]"/>
              </VCol>
              <VCol cols="4">
                <VTextField v-model="formulario.phone" maxlength="15" :error-messages="errors.phone" label="Teléfono de la compañia"
                  @keypress="errors.phone = '';soloNumeros($event)" :rules="[requiredValidator,lengthMinValidator(formulario.phone,10),lengthMaxValidator(formulario.phone,15)]"/>
              </VCol>          
            </VRow>
            <VRow class=" mr-3 ml-4 mb-4">
              <VCol cols="4">
                <VTextField v-model="formulario.address" :error-messages="errors.address" label="Dirección de la compañia"
                  @keypress="errors.address = ''" :rules="[requiredValidator]"/>
              </VCol>
              <VCol cols="4">
                <VTextField type="email" v-model="formulario.email" :error-messages="errors.email" label="Correo"
                  @keypress="errors.email = ''" :rules="[requiredValidator,emailValidator]"/>
              </VCol>
              <VCol cols="4">
                <VFileInput id="logo" show-size counter label="Logo" @change="logo.handleImageSelected"
                 :error-messages="errors.logo" accept="image/*" :key="logo.key" :rules="arrayValidator['logo']">
                  />
                </VFileInput>
              </VCol>
            </VRow>
            <VRow class="mb-4"> 
              <VCol cols="12">
                <VImg contain :src="logo.imageUrl ?? formulario.logo" alt="foto Personal" :max-width="200"
                  class="mx-auto" />
              </VCol>
            </VRow>
        </VCard>

        <VCard class="mt-2" title="Datos de representante legal">
          <VRow class=" mr-3 ml-4 mb-4">  
            <VCol cols="4">
              <VTextField
                maxlength="50"
                v-model="formulario.nameLegalRepresentative"
                :error-messages="errors.nameLegalRepresentative"
                label="Nombre representante legal"
                @keypress="errors.nameLegalRepresentative = ''"
                :rules="[requiredValidator,lengthMaxValidator(formulario.nameLegalRepresentative,50)]"
              />
            </VCol>
            <VCol cols="4">
              <VTextField v-model="formulario.identification_rep" :error-messages="errors.identification_rep" label="Cédula de representante legal"  @keypress="errors.identification_rep = ''" maxlength="15" :rules="[requiredValidator,lengthMaxValidator(formulario.identification_rep,15)]"/>
            </VCol>
            <VCol cols="4">
              <VTextField     
                v-model="formulario.phoneLegalRepresentative"
                :error-messages="errors.phoneLegalRepresentative"
                label="Teléfono representante legal"
                maxlength="15"
                @keypress="errors.phoneLegalRepresentative = ''"
                :rules="[requiredValidator,lengthMinValidator(formulario.phoneLegalRepresentative,10),lengthMaxValidator(formulario.phoneLegalRepresentative,15)]"
              />
            </VCol>
          </VRow>
          <VRow class=" mr-3 ml-4 mb-4">
            <VCol cols="4">
              <VTextField v-model="formulario.address_rep" :error-messages="errors.address_rep" label="Dirección de representante legal" maxlength="50"
                  @keypress="errors.address_rep = ''" :rules="[requiredValidator,lengthMaxValidator(formulario.address_rep,50)]"/>
            </VCol>
            <VCol cols="4">
              <VTextField type="email" v-model="formulario.email_rep" :error-messages="errors.email_rep" label="Correo de representante legal"
                  @keypress="errors.email_rep = ''" maxlength="30" :rules="[requiredValidator,emailValidator,lengthMaxValidator(formulario.email_rep,30)]"/>
            </VCol>
          </VRow>
        </VCard>

        <VCard class="mt-2" title="Parametrización">
          <VRow class=" mr-3 ml-4 mb-4">      
            <VCol cols="4">
              <VTextField type="date" v-model="formulario.startDate" :error-messages="errors.startDate" label="Fecha de inicio"
                @change="errors.startDate = ''" :rules="[requiredValidator]"/>
            </VCol>
            <VCol cols="4">
              <VTextField type="date" v-model="formulario.endDate" :error-messages="errors.endDate" label="Fecha final"
                @change="errors.endDate = ''" :rules="[requiredValidator]"/>
            </VCol>
            <VCol cols="4">
              <VTextField v-model="formulario.description" :error-messages="errors.description" label="Descripción"
                @keypress="errors.description = ''" />
            </VCol>
          </VRow>      
        </VCard>
        

        <VRow>
          <VCol cols="12 d-flex justify-content-center">
            <VBtn color="primary" @click="submitForm()">Guardar</VBtn>
          </VCol>
        </VRow>
      </VForm>
  </div>
</template>
