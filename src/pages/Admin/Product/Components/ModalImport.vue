<script lang="ts" setup>
import ImportExcel from './ImportExcel.vue';
const dialog = ref<boolean>(false)
</script>

<template>
    <div>
        <v-dialog v-model="dialog" persistent width="800px">
            <template v-slot:activator="{ props }">
                <VBtn mt-2 size="x-small" color="default" variant="text" title="Importar" v-bind="props">
                    <VIcon size="30" icon="mdi-file-excel"></VIcon>
                    Import Excel
                </VBtn>
            </template>
            <v-card>
                <v-card-title class="text-h5">
                </v-card-title>
                <v-card-text>
                    <ImportExcel></ImportExcel>
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