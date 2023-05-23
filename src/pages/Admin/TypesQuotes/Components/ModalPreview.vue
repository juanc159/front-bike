<script lang="ts" setup>
const dialog = ref<boolean>(false)

const { titleBtn } = defineProps({
    titleBtn: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div>
        <v-dialog v-model="dialog" persistent width="800px">
            <template v-slot:activator="{ props }">
                <VBtn :title="titleBtn" v-bind="props">
                    <VIcon size="30" icon="mdi-file-pdf"></VIcon>
                    {{ titleBtn }}
                </VBtn>
            </template>
            <v-card>
                <v-card-title class="text-h5">
                </v-card-title>
                <v-card-text>
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