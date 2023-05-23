<script setup lang="ts">
import type { Ref } from 'vue';
import { ref } from 'vue';
import Transaction from '@/pages/Admin/Configurations/Components/Transaction.vue';
import Users from '@/pages/Admin/Configurations/Components/Users.vue';

const tab =  ref('Transacciones');
const tabsTitle = ref(['Transacciones', 'Clientes / proveedores', 'Usuarios', 'Más configuracion',]);
</script>
<template>
    <VCard >  
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
          v-for="item in tabsTitle"
          :key="item"
          :value="item"
        >
          <VCard            
            flat
          >
            <Transaction v-show="tab === 'Transacciones'"></Transaction>
            <span v-show="tab === 'Clientes / proveedores'"> Clientes / proveedores </span>
            <Users v-show="tab === 'Usuarios'"> Usuarios </Users>
            <span v-show="tab === 'Más configuracion'"> Más configuracion </span>
          </VCard>
        </VWindowItem>
      </VWindow>
    </VCard>
  </template>

<route lang="yaml">
  meta:
    subject: Auth
    requiresAuth: true
    redirectIfLoggedIn: true
  </route>