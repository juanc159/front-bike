<script lang="ts" setup >

import { useCrudUserStore } from '@/stores/Admin/useCrudUserStore';
import { requiredValidator, soloNumeros, emailValidator, lengthMaxValidator } from '@validators'
import type { VForm } from 'vuetify/components'
import { useImageUpload } from '@/composables/useImageUpload';
import { AuthenticationStore } from '@/stores/Authentication';
const formValidation = ref<VForm>()
const authentication = AuthenticationStore();
const storeUser = useCrudUserStore();
const { formulario, arrayRoles } = storeToRefs(storeUser);
const errors = ref<Array<string>>([])
const photo = ref(useImageUpload());
const showPass = ref(false); 
 

const props = defineProps({
  userId: {
    type: Number,
    default: null,
    required: false,
  },
})


const arrayValidation = ref<Array<string | boolean>>([])
const changeScreen = async (typeAction: string) => {
  storeUser.typeAction = typeAction
  arrayValidation.value = []
  errors.value = []
  photo.value.clearData();
  await formValidation.value?.resetValidation()
  if (typeAction != 'back')
    storeUser.keyList++
}

const selectedimage = (e: any) => {
  photo.value.handleImageSelected(e)

}
const submitForm = async () => {
  formulario.value.company_id = authentication.company.id;
  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    if (photo.value.imageFile) {
      formulario.value.photo = photo.value.imageFile
    }
    const data = await storeUser.fetchSave();
    if (data.status === 200) changeScreen("list");
    if (data.status === 422) errors.value = data.error; //muestra error del back
  }
}

watch(formulario, (newValue, oldValue) => { 
  if (!newValue.id) {
    arrayValidation.value["password"] = [requiredValidator(newValue.password)]
    // arrayValidation.value["photo"] =[requiredValidator(photo.value.imageUrl)]
  }
  else {
    arrayValidation.value["password"] = []
    // arrayValidation.value["photo"] = []
  }
}, { deep: true });

onMounted(async () => {
  if (props.userId)
    await storeUser.fetchInfoUser(props.userId)
})

</script>

<template>
  <div>
    <VRow>
      <VCol cols="12" class="">
        <div class="col-md-6">
          <span>
            Tu plan tiene derecho a 3 usuarios con acceso gratis o gestores de nómina. A la fecha has creado 2 y aún
            tienes pendiente por crear 1. Los usuarios tipo lite (Cajero POS) son limitados y 1 gestor de nómina
            (administrador nómina).
          </span><br>
          <span>Consulta los usuarios creados en <VBtn size="small" @click="changeScreen('back')">Reporte usuarios creados
            </VBtn></span><br>
          <span>Recuerda que además puedes invitar a tu contador <VBtn class="mt-1" size="small">Invita a tu contador
            </VBtn></span>
        </div>
        <div class="col-md-6 d-flex justify-content-end">
          <VBtn color="secondary" @click="changeScreen('back')">
            Atras
          </VBtn>
        </div>
      </VCol>
    </VRow>
    <VForm ref="formValidation" lazy-validation>
      <VRow>
        <VCol cols="4">
          <VTextField :rules="[requiredValidator, emailValidator]" v-model="formulario.email" autocomplete="off"
            :error-messages="errors.email" label="Email" @keypress="errors.email = ''" />
        </VCol>
        <VCol cols="4">
          <VTextField :rules="arrayValidation['password']" autocomplete="off" @click:append="showPass = !showPass"
            :type="showPass ? 'text' : 'password'" :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            v-model="formulario.password" :error-messages="errors.password" label="Contraseña"
            @keypress="errors.password = ''" />
        </VCol>
        <VCol cols="4">
          <VTextField :rules="[requiredValidator]" v-model="formulario.name" :error-messages="errors.name" label="Nombre"
            @keypress="errors.name = ''" />
        </VCol>
        <VCol cols="4">
          <VTextField :rules="[requiredValidator]" v-model="formulario.lastName" :error-messages="errors.lastName"
            label="Apellido" @keypress="errors.lastName = ''" />
        </VCol>
        <VCol cols="4">
          <VSelect :rules="[requiredValidator]" :items="arrayRoles" v-model="formulario.role_id" item-title="name"
            item-value="id" label="Tipo de usuario" :error-messages="errors.role_id"
            @update:model-value="errors.role_id = ''"></VSelect>
        </VCol>
        <VCol cols="4">
          <VTextField maxlength='10'
            :rules="[requiredValidator, lengthMaxValidator(formulario.identification, 10)]"
            v-model="formulario.identification" :error-messages="errors.identification" label="identificación"
            @keypress="errors.identification = ''; soloNumeros($event)" />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="4">
          <VTextField maxlength="15"
            :rules="[requiredValidator, lengthMaxValidator(formulario.phone, 15)]"
            v-model="formulario.phone" :error-messages="errors.phone" label="Telefono" @keypress="errors.phone = '';soloNumeros($event) " />
        </VCol>
        <VCol cols="4">
          <VFileInput show-size counter label="Photo" accept="image/*" @change="selectedimage($event)" :key="photo.key">
            />
          </VFileInput>
        </VCol>
        <VCol cols="12">
          <VImg contain :src="photo.imageUrl ?? formulario.photo" alt="foto Personal" :max-width="200" class="mx-auto" />
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
