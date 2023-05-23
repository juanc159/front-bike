<script lang="ts" setup>
import { useCrudEmployeeStore } from "@/stores/Admin/useCrudEmployeeStore";
import { AuthenticationStore } from '@/stores/Authentication';
import { emailValidator, requiredValidator,soloNumeros,lengthMaxValidator } from '@validators'
import type { VForm } from 'vuetify/components'
const authentication = AuthenticationStore();

const employeeStore = useCrudEmployeeStore();
const { formulario, typeIdentifications, departamentsOfResidence, citiesOfResidence, paymentMethods, departamentsOfOffice, citiesOfOffice,kind_procedures,banking_entitys,accountTypes } = storeToRefs(employeeStore);
const errors = ref<Array<string>>([]);
const changeScreen = (typeAction: string) => {
    errors.value = [];
    employeeStore.typeAction = typeAction
    if (typeAction != 'back')
        employeeStore.keyList++
}
const formValidation = ref<VForm>()
const submitForm = async () => {
    formulario.value.company_id = authentication.company.id    
    const validation = await formValidation.value?.validate()
    if(validation?.valid){
        const data = await employeeStore.fetchSave();
        // if (data.status === 200) changeScreen("list");
        if (data.status === 422) errors.value = data.error; //muestra error del back
    }
    
};

const showCitiesOfResidence = (value) => {
    errors.value.residenceDepartament_id = ''
    formulario.value.residenceDepartament_id = value;
    employeeStore.getCitiesOfResidence()
}
const showCitiesOfOffice = (value) => {
    errors.value.officeDepartament_id = ''
    formulario.value.officeDepartament_id = value;
    employeeStore.getCitiesOffice()
}


onMounted(() => {
    employeeStore.fetchDataForm(authentication.company.id);
});
</script>
<template>
    <div>
        <VCard>
            <VCardText>
                <VForm ref="formValidation" lazy-validation  > 
                    <VRow>
                        <VCol cols="12">
                            <div class="d-flex flex-column">
                                <b> Datos Empelados</b>
                                <span>Ingresa los siguientes datos para crear el empleado</span>
                            </div>
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="12">
                            <b> Datos Básicos</b>
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="6">
                            <VTextField :error-messages="errors.name" @keypress="errors.name=''" maxlength="50" :rules="[requiredValidator,lengthMaxValidator(formulario.name,50)]"
                                v-model="formulario.name" label="Nombres" placeholder="Nombres"></VTextField>
                        </VCol>
                        <VCol cols="6">
                            <VTextField :error-messages="errors.last_name" @keypress="errors.last_name=''" maxlength="50" :rules="[requiredValidator,lengthMaxValidator(formulario.last_name,50)]"
                                v-model="formulario.last_name" label="Apellidos" placeholder="Apellidos"></VTextField>
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="6">
                            <VSelect :error-messages="errors.type_identifications_id" item-value="id" item-title="name"
                            :rules="[requiredValidator]"  :items="typeIdentifications" @update:model-value="errors.type_identifications_id=''"
                                label="Tipo de documento" v-model="formulario.type_identifications_id"></VSelect>
                        </VCol>
                        <VCol cols="6">
                            <VTextField type="number" :error-messages="errors.document_number" @keypress="errors.document_number='';soloNumeros($event)" v-model="formulario.document_number"    label="Número de documento"
                            :rules="[requiredValidator,lengthMaxValidator(formulario.document_number,15)]"
                                placeholder="Número de documento"></VTextField>
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="6">
                            <VTextField type="email" :error-messages="errors.email" @keypress="errors.email = ''"
                                v-model="formulario.email" label="Coreo electrónico" 
                                :rules="[requiredValidator, emailValidator]" placeholder="Coreo electrónico"></VTextField>
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="12">
                            <b> Datos Personales</b>
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="6">
                            <VSelect :error-messages="errors.residenceDepartament_id" :items="departamentsOfResidence"
                                item-title="name" item-value="id" label="Departamento" :rules="[requiredValidator]" 
                                v-model="formulario.residenceDepartament_id" @update:modelValue="showCitiesOfResidence">
                            </VSelect>
                        </VCol>
                        <VCol cols="6">
                            <VSelect :error-messages="errors.residenceCity_id" :items="citiesOfResidence" item-title="name"
                                label="Ciudad" item-value="id" v-model="formulario.residenceCity_id" :rules="[requiredValidator]" @update:modelValue="errors.residenceCity_id = ''"></VSelect>
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="6">
                            <VTextField :error-messages="errors.residenceAddress" maxlength="100" :rules="[requiredValidator,lengthMaxValidator(formulario.residenceAddress,100)]"
                                v-model="formulario.residenceAddress" @keypress="errors.residenceAddress=''"
                                label="Dirección de residencia" placeholder="Dirección de residencia"></VTextField>
                        </VCol>
                        <VCol cols="6">
                            <VTextField :error-messages="errors.cellPhoneNumber" type="number"   :rules="[requiredValidator,lengthMaxValidator(formulario.cellPhoneNumber,10)]"
                                  v-model="formulario.cellPhoneNumber" @keypress="errors.cellPhoneNumber=''"
                                label="Número de celular" placeholder="Número de celular">
                            </VTextField>
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="12">
                            <b> Datos de pago</b>
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="6"> 
                            <VSelect :error-messages="errors.paymentMethod_id" :items="paymentMethods" item-title="name"
                                item-value="id" label="Método de pago" v-model="formulario.paymentMethod_id" @update:modelValue="errors.paymentMethod_id = ''"
                                :rules="[requiredValidator]">
                            </VSelect>
                        </VCol>
                        <VCol cols="6"> 
                            <VSelect v-if="formulario.paymentMethod_id==77" :error-messages="errors.kind_procedure_id" :items="kind_procedures" item-title="name"
                                item-value="id" label="Tipo de trámite" v-model="formulario.kind_procedure_id" @update:modelValue="errors.kind_procedure_id = ''"
                                :rules="[requiredValidator]">
                            </VSelect>                             
                            <VSelect v-if="formulario.paymentMethod_id==78" :error-messages="errors.banking_entity_id" :items="banking_entitys" item-title="name"
                                item-value="id" label="Entidad bancaria" v-model="formulario.banking_entity_id" @update:modelValue="errors.banking_entity_id = ''"
                                :rules="[requiredValidator]">
                            </VSelect>                             
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="6">
                            <VTextField v-if="formulario.paymentMethod_id==77" type="number" :error-messages="errors.cellPhoneNumberPay"   :rules="[requiredValidator,lengthMaxValidator(formulario.cellPhoneNumberPay,10)]"
                                  v-model="formulario.cellPhoneNumberPay" @keypress="errors.cellPhoneNumberPay=''"
                                label="Número de teléfono celular" placeholder="Número de teléfono celular">
                            </VTextField>
                            <VSelect v-if="formulario.paymentMethod_id==78" :error-messages="errors.account_type_id" :items="accountTypes" item-title="name"
                                item-value="id" label="Tipo de cuenta" v-model="formulario.account_type_id" @update:modelValue="errors.account_type_id = ''"
                                :rules="[requiredValidator]">
                            </VSelect> 
                            
                        </VCol>
                        <VCol cols="6"> 
                            <VTextField v-if="formulario.paymentMethod_id==78" type="number" :error-messages="errors.account_number"   :rules="[requiredValidator,lengthMaxValidator(formulario.account_number,20)]"
                                  v-model="formulario.account_number" @keypress="errors.account_number=''"
                                label="Número de cuenta" placeholder="Número de cuenta">
                            </VTextField>
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="12">
                            <b> Datos de oficina</b>
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="6">
                            <VSelect :error-messages="errors.officeDepartament_id" :items="departamentsOfOffice"
                                item-title="name" item-value="id" label="Departamento" :rules="[requiredValidator]"
                                v-model="formulario.officeDepartament_id" @update:modelValue="showCitiesOfOffice">
                            </VSelect>
                        </VCol>
                        <VCol cols="6">
                            <VSelect :error-messages="errors.officeCity_id" :items="citiesOfOffice" item-title="name"
                                label="Ciudad" item-value="id" v-model="formulario.officeCity_id" :rules="[requiredValidator]"
                                @update:modelValue="errors.officeCity_id = ''"></VSelect>
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="6">
                            <VTextField :error-messages="errors.residenceOffice" maxlength="100"
                                @keypress="errors.residenceOffice = ''" v-model="formulario.residenceOffice" :rules="[requiredValidator,lengthMaxValidator(formulario.residenceOffice,100)]"
                                label="Dirección de oficina" placeholder="Dirección de oficina" ></VTextField>
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="12" class="d-flex justify-content-center align-items-center">
                            <VBtn color="success"    @click="submitForm()">Guardar</VBtn>
                        </VCol>
                    </VRow>
                </VForm>
            </VCardText>
        </VCard>
    </div>
</template>

<style scoped></style>