<script lang="ts" setup>
import { useCrudEmployeeStore } from "@/stores/Admin/useCrudEmployeeStore";
import BasicData from './BasicData.vue';
import WorkingInformation from './WorkingInformation.vue';
const employeeStore = useCrudEmployeeStore();
const { formulario} = storeToRefs(employeeStore);


const tab = ref('Datos Básicos');
const changeScreen = (typeAction:string) => {
    employeeStore.typeAction = typeAction
  if(typeAction!='back')
    employeeStore.keyList++
}
</script>

<template>
    <div>
        <VRow>
            <VCol cols="12" class="d-flex justify-content-end">
                <VBtn color="secondary" @click="changeScreen('back')">
                    Atras
                </VBtn>
            </VCol>
        </VRow>
        <VRow>
            <VCol cols="12">
                <VCard>
                    <VTabs v-model="tab" bg-color="transparent" grow>
                        <VTab value="Datos Básicos">
                            Datos Básicos
                        </VTab>
                        <VTab v-show="formulario.id" value="Información Laboral">
                            Información Laboral
                        </VTab>
                    </VTabs>

                    <VWindow v-model="tab">
                        <VWindowItem value="Datos Básicos">
                            <BasicData></BasicData>
                        </VWindowItem>
                        <VWindowItem value="Información Laboral">
                            <WorkingInformation></WorkingInformation>
                        </VWindowItem>
                    </VWindow>
                </VCard>
            </VCol>
        </VRow>
    </div>
</template>

<style scoped></style>