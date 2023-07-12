<script setup lang="ts">
import { useImageUpload } from '@/composables/useImageUpload'
import { useCrudCompanyStore } from '@/stores/Admin/useCrudCompanyStore'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
import { emailValidator, lengthMaxValidator, lengthMinValidator, requiredValidator, soloNumeros, validarInputNumerosMiles } from '@validators'
import { VForm } from 'vuetify/components'

const props = defineProps({
  companyId: {
    type: Number,
    default: null,
    required: false,
  },
})

const companyStoreUseCrud = useCrudCompanyStore()
const auth = useAuthenticationStore()
const logo = ref(useImageUpload())

logo.value.allowedExtensions = ['png', 'jpg', 'jpeg']

const {
  formulario,
} = storeToRefs(companyStoreUseCrud)

const formValidation = ref<VForm>()

const changeScreen = async (typeAction: string) => {
  await formValidation.value?.resetValidation()
  companyStoreUseCrud.typeAction = typeAction
  if (typeAction != 'back')
    companyStoreUseCrud.keyList++
}

const errors = ref<Array<string>>([])
const arrayValidator = ref<Array<string>>([])

const submitForm = async () => {

  if (logo.value.imageUrl)
    formulario.value.logo = logo.value.imageFile

  if (formulario.value.id)
    arrayValidator.value.logo = []
  else arrayValidator.value.logo = [requiredValidator(formulario.value.logo)]


  formulario.value.base = formulario.value.base.replaceAll(".", "")
  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    formulario.value.user_id = auth.user.id

    const data = await companyStoreUseCrud.fetchSave()
    if (data.status === 200) {
      logo.value.imageFile = null
      changeScreen('list')
    }
    if (data.status === 422)
      errors.value = data.error // muestra error del back
  }
}

onMounted(async () => {
  if (props.companyId)
    await companyStoreUseCrud.fetchInfoCompany(props.companyId)
})
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12" class="d-flex justify-content-end">
        <VBtn color="secondary" @click="changeScreen('list')">
          Atras
        </VBtn>
      </VCol>
    </VRow>
    <VForm ref="formValidation" lazy-validation>
      <VCard title="Formulario de la compañia">
        <VRow class=" mr-3 ml-4 mb-4">
          <VCol cols="4">
            <VTextField v-model="formulario.name" :error-messages="errors.name" label="Nombre de la compañia"
              maxlength="30" :rules="[requiredValidator]" @keypress="errors.name = ''" />
          </VCol>
          <VCol cols="4">
            <VTextField v-model="formulario.nit" maxlength="10" :error-messages="errors.nit" label="Nit"
              :rules="[requiredValidator, lengthMaxValidator(formulario.nit, 10)]"
              @keypress="errors.nit = ''; soloNumeros($event)" />
          </VCol>
          <VCol cols="4">
            <VTextField v-model="formulario.phone" maxlength="15" :error-messages="errors.phone"
              label="Teléfono de la compañia"
              :rules="[requiredValidator, lengthMinValidator(formulario.phone, 10), lengthMaxValidator(formulario.phone, 15)]"
              @keypress="errors.phone = ''; soloNumeros($event)" />
          </VCol>
        </VRow>
        <VRow class=" mr-3 ml-4 mb-4">
          <VCol cols="4">
            <VTextField v-model="formulario.address" :error-messages="errors.address" label="Dirección de la compañia"
              :rules="[requiredValidator]" @keypress="errors.address = ''" />
          </VCol>
          <VCol cols="4">
            <VTextField v-model="formulario.email" type="email" :error-messages="errors.email" label="Correo"
              :rules="[requiredValidator, emailValidator]" @keypress="errors.email = ''" />
          </VCol>
          <VCol cols="4">
            <VFileInput id="logo" :key="logo.key" show-size counter label="Logo" :error-messages="errors.logo"
              accept="image/*" :rules="arrayValidator.logo" @change="logo.handleImageSelected">
              />
            </VFileInput>
          </VCol>
        </VRow>
        <VRow class="mb-4">
          <VCol cols="12">
            <VImg contain :src="logo.imageUrl ?? formulario.logo" alt="foto Personal" :max-width="200" class="mx-auto" />
          </VCol>
        </VRow>
      </VCard>

      <VCard class="mt-2" title="Datos de representante legal">
        <VRow class=" mr-3 ml-4 mb-4">
          <VCol cols="4">
            <VTextField v-model="formulario.nameLegalRepresentative" maxlength="50"
              :error-messages="errors.nameLegalRepresentative" label="Nombre representante legal"
              :rules="[requiredValidator, lengthMaxValidator(formulario.nameLegalRepresentative, 50)]"
              @keypress="errors.nameLegalRepresentative = ''" />
          </VCol>
          <VCol cols="4">
            <VTextField v-model="formulario.identification_rep" :error-messages="errors.identification_rep"
              label="Cédula de representante legal" maxlength="15"
              :rules="[requiredValidator, lengthMaxValidator(formulario.identification_rep, 15)]"
              @keypress="errors.identification_rep = ''" />
          </VCol>
          <VCol cols="4">
            <VTextField v-model="formulario.phoneLegalRepresentative" :error-messages="errors.phoneLegalRepresentative"
              label="Teléfono representante legal" maxlength="15"
              :rules="[requiredValidator, lengthMinValidator(formulario.phoneLegalRepresentative, 10), lengthMaxValidator(formulario.phoneLegalRepresentative, 15)]"
              @keypress="errors.phoneLegalRepresentative = ''" />
          </VCol>
        </VRow>
        <VRow class=" mr-3 ml-4 mb-4">
          <VCol cols="4">
            <VTextField v-model="formulario.address_rep" :error-messages="errors.address_rep"
              label="Dirección de representante legal" maxlength="50"
              :rules="[requiredValidator, lengthMaxValidator(formulario.address_rep, 50)]"
              @keypress="errors.address_rep = ''" />
          </VCol>
          <VCol cols="4">
            <VTextField v-model="formulario.email_rep" type="email" :error-messages="errors.email_rep"
              label="Correo de representante legal" maxlength="30"
              :rules="[requiredValidator, emailValidator, lengthMaxValidator(formulario.email_rep, 30)]"
              @keypress="errors.email_rep = ''" />
          </VCol>
          <VCol cols="4">
            <VTextField v-model="formulario.base" :error-messages="errors.base" label="Base"
              @blur="formulario.base = validarInputNumerosMiles(formulario.base)" :rules="[requiredValidator]"
              @keypress="errors.base = ''" />
          </VCol>
        </VRow>
      </VCard>

      <VRow>
        <VCol cols="12 d-flex justify-content-center">
          <VBtn color="primary" @click="submitForm">
            Guardar
          </VBtn>
        </VCol>
      </VRow>
    </VForm>
  </div>
</template>
