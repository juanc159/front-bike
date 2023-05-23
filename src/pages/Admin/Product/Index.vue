<script setup lang="ts">

import TableList from '@/pages/Admin/Product/Components/TableList.vue';
import Form from '@/pages/Admin/Product/Components/Form.vue';
import { AuthenticationStore } from '@/stores/Authentication';
import { useCrudProductStore } from '@/stores/Admin/useCrudProductStore';

const productStore = useCrudProductStore();
const auth = AuthenticationStore();
const { typeAction, showModalStoreProduct } = storeToRefs(productStore);

const changeScreen = async (typeAction: string) => {
  // await formValidation.value?.resetValidation();
  productStore.typeAction = typeAction
  if (typeAction != 'back')
    productStore.keyList++
}

onUnmounted(() => {
  productStore.$reset();
})

</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard v-show="typeAction !== 'form'" title="Listado Productos">
          <VCardText>
            <TableList  :key="productStore.keyList" />
          </VCardText>
        </VCard>
        <VCard  v-show="typeAction === 'form'"  >
          <template v-slot:title>
            <VRow>
              <VCol class="d-flex justify-content-between">
                Nuevo Producto / Servicio
                <!-- <VBtn color="secondary" @click="changeScreen('back')">
                  Atras
                </VBtn> -->
              </VCol>
            </VRow>
          </template>
          <template v-slot:subtitle>
            Todos los campos marcados con * son obligatorios
          </template>
          <VCardText >
            <Form />
          </VCardText>
          <VCardText />
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<route lang="yaml">
meta:  
  name: Admin-Products-Index
  action: read
  subject: Auth
  title: Productos
  redirectIfLoggedIn: true
  requiresAuth: true
  requiredPermission: admin.product.index
</route>
