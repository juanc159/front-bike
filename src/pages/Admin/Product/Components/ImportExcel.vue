<script lang="ts" setup>
import { requiredValidator } from '@validators';
import type { VForm } from 'vuetify/components';
import { useImageUpload } from '@/composables/useImageUpload';
import { AuthenticationStore } from "@/stores/Authentication";
import { useCrudProductStore } from "@/stores/Admin/useCrudProductStore";
const authentication = AuthenticationStore();
const productStore = useCrudProductStore();

const { fileExcel, errorsImport, formulario } = storeToRefs(productStore)
const archive = ref(useImageUpload());
archive.value.allowedExtensions = ['xls', 'xlsx']
const formValidation = ref<VForm>();


const changeScreen = async (typeAction: string) => {
  await formValidation.value?.resetValidation();
  productStore.typeAction = typeAction
  if (typeAction != 'back')
    productStore.keyList++
}

const submitForm = async () => {
  fileExcel.value = archive.value.imageFile;
  const validation = await formValidation.value?.validate();
  if (validation?.valid) {
    formulario.value.company_id = authentication.company.id
    const data = await productStore.importExcel();
    if (data.status === 200) {
      changeScreen('save')
    }
    if (data.status === 422) errors.value = data.error; //muestra error del back
  }
}
</script>

<template>
  <div>
    <VForm ref="formValidation" lazy-validation>
      <VRow>
        <VCol cols="12">
          <VFileInput @change="archive.handleImageSelected" :rules="[requiredValidator]" :key="archive.key"></VFileInput>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <div class="row" v-if="errorsImport.length > 0">
            <div class="col-12">
              <VTable fixed-header>
                <thead>
                  <tr>
                    <th>Fila</th>
                    <th>Columna</th>
                    <th>Error</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody> 
                  <tr v-for="(item, index) in errorsImport" :key="index">
                    <td>{{ item.row }}</td>
                    <td>{{ item.attribute }}</td>
                    <td>{{ item.errors }}</td>
                    <td>{{ item.values }}</td>
                  </tr>
                </tbody>
              </VTable>
            </div>
          </div>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12 d-flex justify-content-center">
          <VBtn color="primary" @click="submitForm()" prepend-icon="mdi-upload">Subir</VBtn>
        </VCol>
      </VRow>
    </VForm>
  </div>
</template>

<style scoped></style>