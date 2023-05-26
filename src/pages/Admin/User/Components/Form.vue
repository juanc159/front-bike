<script lang="ts" setup>
import { useImageUpload } from '@/composables/useImageUpload'
import { useCrudUserStore } from '@/stores/Admin/useCrudUserStore'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
import { emailValidator, lengthMaxValidator, requiredValidator, soloNumeros } from '@validators'
import { VForm } from 'vuetify/components'

const props = defineProps({
  userId: {
    type: Number,
    default: null,
    required: false,
  },
})

const formValidation = ref<VForm>()
const authentication = useAuthenticationStore()
const storeUser = useCrudUserStore()
const { formulario, arrayRoles } = storeToRefs(storeUser)
const errors = ref<Array<string>>([])
const photo = ref(useImageUpload())
const showPass = ref(false)

const arrayValidation = ref<Array<string | boolean>>([])

const changeScreen = async (typeAction: string) => {
  storeUser.typeAction = typeAction
  arrayValidation.value = []
  errors.value = []
  photo.value.clearData()
  await formValidation.value?.resetValidation()
  if (typeAction != 'back')
    storeUser.keyList++
}

const selectedimage = (e: any) => {
  photo.value.handleImageSelected(e)
}

const submitForm = async () => {
  formulario.value.company_id = authentication.company.id

  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    if (photo.value.imageFile)
      formulario.value.photo = photo.value.imageFile

    const data = await storeUser.fetchSave()
    if (data.status === 200)
      changeScreen('list')
    if (data.status === 422)
      errors.value = data.error // muestra error del back
  }
}

watch(formulario, (newValue, oldValue) => {
  if (!newValue.id)
    arrayValidation.value.password = [requiredValidator(newValue.password)]

  // arrayValidation.value["photo"] =[requiredValidator(photo.value.imageUrl)]

  else
    arrayValidation.value.password = []

  // arrayValidation.value["photo"] = []
}, { deep: true })

onMounted(async () => {
  if (props.userId)
    await storeUser.fetchInfoUser(props.userId)
})
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <div class="col-md-6 d-flex justify-content-end">
          <VBtn color="secondary" @click="changeScreen('back')">
            Atras
          </VBtn>
        </div>
      </VCol>
    </VRow>
    <VForm ref="formValidation" lazy-validation>
      <VRow>
        <VCol cols="12" md="4">
          <VTextField v-model="formulario.email" :rules="[requiredValidator, emailValidator]" autocomplete="off"
            :error-messages="errors.email" label="Email" @keypress="errors.email = ''" />
        </VCol>
        <VCol cols="12" md="4">
          <VTextField v-model="formulario.password" :rules="arrayValidation.password" autocomplete="off"
            :type="showPass ? 'text' : 'password'" :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :error-messages="errors.password" label="Contraseña" @click:append="showPass = !showPass"
            @keypress="errors.password = ''" />
        </VCol>
        <VCol cols="12" md="4">
          <VTextField v-model="formulario.name" :rules="[requiredValidator]" :error-messages="errors.name" label="Nombre"
            @keypress="errors.name = ''" />
        </VCol>
        <VCol cols="12" md="4">
          <VTextField v-model="formulario.lastName" :rules="[requiredValidator]" :error-messages="errors.lastName"
            label="Apellido" @keypress="errors.lastName = ''" />
        </VCol>
        <VCol cols="12" md="4">
          <VSelect v-model="formulario.role_id" :rules="[requiredValidator]" :items="arrayRoles" item-title="name"
            item-value="id" label="Tipo de usuario" :error-messages="errors.role_id"
            @update:model-value="errors.role_id = ''" />
        </VCol>
        <VCol cols="12" md="4">
          <VTextField v-model="formulario.identification" maxlength="10"
            :rules="[requiredValidator, lengthMaxValidator(formulario.identification, 10)]"
            :error-messages="errors.identification" label="identificación"
            @keypress="errors.identification = ''; soloNumeros($event)" />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" md="4">
          <VTextField v-model="formulario.phone" maxlength="15"
            :rules="[requiredValidator, lengthMaxValidator(formulario.phone, 15)]" :error-messages="errors.phone"
            label="Telefono" @keypress="errors.phone = ''; soloNumeros($event) " />
        </VCol>
        <VCol cols="12" md="4">
          <VFileInput :key="photo.key" show-size counter label="Photo" accept="image/*" @change="selectedimage($event)">
            />
          </VFileInput>
        </VCol>
        <VCol cols="12">
          <VImg contain :src="photo.imageUrl ?? formulario.photo" alt="foto Personal" :max-width="200" class="mx-auto" />
        </VCol>
      </VRow>
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
