<script setup lang="ts">
import { useTheme } from 'vuetify';

import { hexToRgb } from '@layouts/utils';
import TabContainer from "@/components/TabContainer.vue"
import { useThemeConfig } from '@core/composable/useThemeConfig';
import { AuthenticationStore } from '@/stores/Authentication';
import PreloadExterno from '@/componentsGlobal/PreloadExterno.vue';
import { usePreloadStore } from '@/stores/usePreloadStore'; 
const preloadStore = usePreloadStore()
const { isLoading } = storeToRefs(preloadStore) 

AuthenticationStore()

const { syncInitialLoaderTheme, syncVuetifyThemeWithTheme: syncConfigThemeWithVuetifyTheme, isAppRtl } = useThemeConfig()

const { global } = useTheme()

// ℹ️ Sync current theme with initial loader theme
syncInitialLoaderTheme()
syncConfigThemeWithVuetifyTheme() 
</script>

<template>
  <PreloadExterno v-show="isLoading" />
  <VLocaleProvider :rtl="isAppRtl" v-show="!isLoading">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
      <RouterView />
    </VApp>
  </VLocaleProvider>
</template>
