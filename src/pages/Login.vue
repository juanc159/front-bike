<script setup lang="ts">
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { emailValidator, requiredValidator } from '@validators'

import { AuthenticationStore } from '@/stores/Authentication'
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
import authV2MaskDark from '@images/pages/misc-mask-dark.png'
import authV2MaskLight from '@images/pages/misc-mask-light.png'


const authThemeImg = useGenerateImageVariant(authV2LoginIllustrationLight, authV2LoginIllustrationDark, authV2LoginIllustrationBorderedLight, authV2LoginIllustrationBorderedDark, true)

const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)

const router = useRouter()

const isPasswordVisible = ref(false)

const formulario = reactive({
  email: '',
  password: '',
})

const authentication = AuthenticationStore()

const login = async () => {
  await authentication.login(formulario).then(resp => {
    if (authentication.user.company_id) router.push({ name: 'index' })
    else router.push({ name: 'Admin-Company-Index' })
  })
}
</script>

<template>
  <div>
    <VRow
      no-gutters
      class="auth-wrapper"
    >
      <VCol
        lg="8"
        class="d-none d-lg-flex"
      >
        <div class="position-relative auth-bg rounded-lg w-100 ma-8 me-0">
          <div class="d-flex align-center justify-center w-100 h-100">
            <VImg
              max-width="505"
              :src="authThemeImg"
              class="auth-illustration mt-16 mb-2"
            />
          </div>
  
          <VImg
            :src="authThemeMask"
            class="auth-footer-mask"
          />
        </div>
      </VCol>
  
      <VCol
        cols="12"
        lg="4"
        class="d-flex align-center justify-center"
      >
        <VCard
          flat
          :max-width="500"
          class="mt-12 mt-sm-0 pa-4"
        >
          <VCardText>
            <VNodeRenderer
              :nodes="themeConfig.app.logo"
              class="mb-6"
            />
  
            <h5 class="text-h5 font-weight-semibold mb-1">
              Bienvenido al sistema contable! 👋🏻
            </h5>
          </VCardText>
          <VCardText>
            <VForm @submit.prevent="() => { }">
              <VRow>
                <!-- email -->
                <VCol cols="12">
                  <VTextField
                    v-model="formulario.email"
                    label="Email"
                    type="email"
                    :rules="[requiredValidator, emailValidator]"
                  />
                </VCol>
  
                <!-- password -->
                <VCol cols="12">
                  <VTextField
                    v-model="formulario.password"
                    label="Password"
                    :rules="[requiredValidator]"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  />
  
                  
                  <div class="d-flex align-center flex-wrap justify-space-between mt-2 mb-4">
                    <RouterLink
                    class="text-primary ms-2"
                    :to="{ name: 'Register' }"
                  >
                  Crea una cuenta
                  </RouterLink>
                  </div>
  
                  <VBtn
                    block
                    type="submit"
                    @click="login"
                  >
                  Iniciar sesión
                  </VBtn>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>
