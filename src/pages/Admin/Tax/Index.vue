<script setup lang="ts">
import { ref } from 'vue';
import IndexTaxes from '@/pages/Admin/Tax/Components/Taxes/Index.vue';
import IndexSelfWithholding from '@/pages/Admin/Tax/Components/SelfWithholding/Index.vue';

const tab =  ref<string>('Impuestos');
const tabsTitle = ref<Array<string>>(['Impuestos', 'Autoretenciones']);
</script>
<template>
    <VCard>  
      <VTabs
        v-model="tab"
        bg-color="transparent"
        grow
      >
        <VTab
          v-for="item in tabsTitle"
          :key="item"
          :value="item"
        >
          {{ item }}
        </VTab>
      </VTabs>
  
      <VWindow v-model="tab">
        <VWindowItem
        value="Impuestos"
        >
          <VCard
            flat
          >
            <IndexTaxes v-show="tab === 'Impuestos'"></IndexTaxes> 
          </VCard>
        </VWindowItem>
        <VWindowItem
        value="Autoretenciones"
        >
          <VCard
            flat
          > 
            <IndexSelfWithholding v-show="tab === 'Autoretenciones'"></IndexSelfWithholding>
          </VCard>
        </VWindowItem>
      </VWindow>
    </VCard>
  </template>

<route lang="yaml">
  menu:
    action: read
    subject: Auth
    redirectIfLoggedIn: true
    requiresAuth: true  
  </route>