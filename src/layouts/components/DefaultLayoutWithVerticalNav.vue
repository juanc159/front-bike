<script lang="ts" setup type="module">
import navItems from '@/navigation/vertical'
import { useThemeConfig } from '@core/composable/useThemeConfig'

// Components
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue';
import NavbarMenuTop from '@/componentsGlobal/NavbarMenuTop.vue'
import { AuthenticationStore } from '@/stores/Authentication';
import ResetSessionTimeout from '@/pages/ResetSessionTimeout.vue';
// @layouts plugin
import { VerticalNavLayout } from '@layouts'

const { appRouteTransition, isLessThanOverlayNavBreakpoint } = useThemeConfig()
const { width: windowWidth } = useWindowSize()

const auth = AuthenticationStore();
</script>

<template>
  <VerticalNavLayout :nav-items="navItems">
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <VBtn v-if="isLessThanOverlayNavBreakpoint(windowWidth)" icon variant="text" color="default" class="ms-n3"
          size="small" @click="toggleVerticalOverlayNavActive(true)">
          <VIcon icon="tabler-menu-2" size="24" />
        </VBtn>

        <NavbarThemeSwitcher />

        <VSpacer />
        <NavbarMenuTop  />

        <!-- MENU CREAR -->
        <div class="d-flex justify-space-around mr-2"> 
        </div>
        <!-- FIN MENU CREAR -->
        <ResetSessionTimeout></ResetSessionTimeout>
        <RouterLink v-if="auth.company.id" :to="{ name: 'Admin-Configurations-Index' }" class="mr-2"><v-icon
            icon="mdi-cog"></v-icon></RouterLink>
        <UserProfile />
      </div>
    </template>

    <!-- 👉 Pages -->
    <RouterView v-slot="{ Component }">
      <Transition :name="appRouteTransition" mode="out-in">
        <Component :is="Component" />
      </Transition>
    </RouterView>

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>

    <!-- 👉 Customizer -->
    <!-- <TheCustomizer /> -->
  </VerticalNavLayout>
</template>
