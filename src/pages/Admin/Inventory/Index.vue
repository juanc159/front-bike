<script setup lang="ts">
import Form from '@/pages/Admin/Inventory/Components/Form.vue';
import TableList from '@/pages/Admin/Inventory/Components/TableList.vue';
import { useCrudInventoryStore } from '@/stores/Admin/useCrudInventoryStore';
import { useRoute } from 'vue-router';

const inventoryStore = useCrudInventoryStore()

const { typeAction } = storeToRefs(inventoryStore)
const route = useRoute() 
console.log("route",route);
 
onUnmounted(() => {
  inventoryStore.$reset();
})
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard v-show="typeAction !== 'form'" title="Listado Inventario">
          <VCardText>
          <TableList :key="inventoryStore.keyList"/>
          </VCardText>
        </VCard>
        <VCard v-show="typeAction === 'form'" title="Formulario Inventario">          
          <VCardText>
            <Form />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>


