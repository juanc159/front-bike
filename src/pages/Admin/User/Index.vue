<script setup lang="ts">
import Form from '@/pages/Admin/User/Components/Form.vue';
import TableList from '@/pages/Admin/User/Components/TableList.vue';
import { useCrudUserStore } from '@/stores/Admin/useCrudUserStore';
import { useRoute } from 'vue-router';

const storeUser = useCrudUserStore()
storeUser.fetchDataForm()
const { typeAction } = storeToRefs(storeUser)
const route = useRoute() 
console.log("route",route);
 
 
onUnmounted(() => {
  storeUser.$reset();
})
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard v-show="typeAction !== 'form'" title="Listado Usuario">
          <VCardText>
          <TableList :key="storeUser.keyList"/>
          </VCardText>
        </VCard>
        <VCard v-show="typeAction === 'form'" title="Formulario Usuario">          
          <VCardText>
            <Form />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>


