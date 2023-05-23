<script lang="ts" setup>
import FormMinimal from "@/pages/Admin/Product/Components/Form.vue";
import { useCrudProductStore } from '@/stores/Admin/useCrudProductStore';
const productStore = useCrudProductStore();
const { openModal } = storeToRefs(productStore)

</script>

<template>
    <div>
        <VDialog v-model="openModal" persistent width="100rem">
            <VCard>
                <VToolbar dark color="primary"  >
                    <VToolbarTitle>Nuevo Producto / Servicio</VToolbarTitle> 
                    <VBtn icon color="" @click="openModal = false">
                        <VIcon>mdi-close</VIcon>
                    </VBtn>
                </VToolbar> 
                <VCardText>
                    <FormMinimal :minimalData="true"></FormMinimal>
                </VCardText>
                <VCardActions class="d-flex justify-content-between"> 
                    <VBtn @click="openModal = false">
                        Cerrar
                    </VBtn>
                    <VBtn :to="{name: 'Admin-Product-Index'}" @click="openModal = false">
                        Creación completa de producto
                    </VBtn>
                </VCardActions>
            </VCard>
        </VDialog>
    </div>
</template>

<style scoped></style>