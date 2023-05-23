<script setup lang="ts">
import { ref } from 'vue';
import IndexGeneral from '@/pages/Admin/WayToPay/Components/General/Index.vue';
import PayOnLine from '@/pages/Admin/WayToPay/Components/PayOnLine/Index.vue';

const tab =  ref<string>('General');
const tabsTitle = ref<Array<string>>(['General', 'Pago en linea']);
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
        value="General"
        >
          <VCard
            flat
          >
            <IndexGeneral v-show="tab === 'General'"></IndexGeneral> 
          </VCard>
        </VWindowItem>
        <VWindowItem
        value="Pago en linea"
        >
          <VCard
            flat
          > 
            <PayOnLine v-show="tab === 'Pago en linea'"> Clientes / proveedores </PayOnLine>
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