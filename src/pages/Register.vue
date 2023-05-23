<script setup lang="ts">
import authV1BottomShape from '@images/svg/auth-v1-bottom-shape.svg'
import authV1TopShape from '@images/svg/auth-v1-top-shape.svg' 
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import type IRegister from '@/interfaces/Authentication/IRegister'
import { useFormValidation } from "@/composables/useFormValidation";

import { AuthenticationStore } from '@/stores/Authentication' 
const authentication = AuthenticationStore()
const formValidation = useFormValidation();
const router = useRouter()
const errors = formValidation.errors
 
const form = ref<IRegister>({
  name: '',
  lastName: '',
  email: '',
  password: '',
  phone: '',
  whoYouAre: '', 
})

const arrayWhoYouAre = [
  "Soy empresario",
  "Soy contador independiente",
  "Soy contador empleado",
  "Soy outsourcing contable",
  "Soy cliente",
  "Soy estudiante",
];
const register = async () => {

  const noValidate: Array<string> = ['in_use'];
  const errorMessage: object = {
    name:"nombre",
    lastName:"apellido",
    email:"correo",
    password:"Contraseña",
    phone:"télefono",
    whoYouAre:"Quien eres",
  };
  formValidation.validation(//muestra error del front
    form.value,
    noValidate,
    "",
    errorMessage
  );


  if (formValidation.exito.value) {
  form.value.role_id = 1;
  const data = await authentication.register(form.value)
  console.log('DATA', data);
  if (data.status === 200) router.push({ name: 'Login' });
  if (data.status === 422) errors.value = data.error; //muestra error del back 
  }
}

const isPasswordVisible = ref(false)
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16">
      <!-- 👉 Top shape -->
      <VImg
        :src="authV1TopShape"
        class="auth-v1-top-shape d-none d-sm-block"
      />

      <!-- 👉 Bottom shape -->
      <VImg
        :src="authV1BottomShape"
        class="auth-v1-bottom-shape d-none d-sm-block"
      />

      <!-- 👉 Auth card -->
      <VCard
        class="auth-card pa-4"
        max-width="448"
      >
        <VCardItem class="justify-center">
          <template #prepend>
            <div class="d-flex">
              <VNodeRenderer :nodes="themeConfig.app.logo" />
            </div>
          </template>

          <VCardTitle class="font-weight-bold text-h5 py-1">
            {{ themeConfig.app.title }}
          </VCardTitle>
        </VCardItem> 

        <VCardText>
          <VForm @submit.prevent="() => {}">
            <VRow> 
              <VCol cols="12">
                <VTextField
                  v-model="form.name"
                  label="Nombres"
                  :error-messages="errors.name"
                  @keypress="formValidation.solotextoYcarateres($event,form.name,20);errors.name = ''"
                />
              </VCol> 
              <VCol cols="12">
                <VTextField
                  v-model="form.lastName"
                  label="Apellidos"
                  :error-messages="errors.lastName"
                  @keypress="formValidation.solotextoYcarateres($event,form.lastName,20);errors.lastName = ''"
                />
              </VCol>
              <!-- email -->
              <VCol cols="12">
                <VTextField
                  v-model="form.email"
                  label="Email"
                  type="email"
                  :error-messages="errors.email"
                  @keypress="errors.email = ''"
                />
              </VCol>
              <!-- password -->
              <VCol cols="12">
                <VTextField
                  v-model="form.password"
                  label="Password"
                  :error-messages="errors.password"
                  @keypress="errors.password = ''"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <VCol cols="12">
                <VTextField
                  v-model="form.phone"
                  :error-messages="errors.phone"
                  @keypress="errors.phone = '';formValidation.isNumber($event,form.phone,15)"
                  label="Teléfono"
                />
              </VCol>

              <VCol cols="12">
                <VSelect
                :error-messages="errors.whoYouAre"
                @keypress="errors.whoYouAre=''"
                  :items="arrayWhoYouAre"
                  v-model="form.whoYouAre"
                  label="¿Quién eres?"
                ></VSelect>
              </VCol>

              <VCol cols="12">
                <VBtn
                @click="register()"
                class="mt-2"
                  block
                  type="submit"
                >
                  Registrarse
                </VBtn>
              </VCol>

              <!-- login instead -->
              <VCol
                cols="12"
                class="text-center text-base"
              > 
                <RouterLink
                  class="text-primary ms-2"
                  :to="{ name: 'Login' }"
                >
                  Iniciar sesión
                </RouterLink>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </div>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
