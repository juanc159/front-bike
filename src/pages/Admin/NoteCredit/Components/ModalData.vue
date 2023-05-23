<script lang="ts" setup>
import Form from '@/pages/Admin/Invoice/Components/Form.vue';
const dialog = ref<boolean>(false)
</script>

<template>
    <div>
        <v-dialog v-model="dialog" persistent width="1000px">
            <template v-slot:activator="{ props }">
                <VBtn color="success" v-bind="props">Crear Registro</VBtn>
            </template>
            <v-card>
                <v-card-title class="text-h5">
                </v-card-title>
                <v-card-text>
                    <Form />
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green-darken-1" variant="text" @click="dialog = false">
                        Cerrar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<style scoped></style>