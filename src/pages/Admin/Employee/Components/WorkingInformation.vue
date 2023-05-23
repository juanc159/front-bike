<script lang="ts" setup>
import { useEmployeeWorkingInformationStore } from "@/stores/Admin/useEmployeeWorkingInformationStore";
import { useCrudEmployeeStore } from "@/stores/Admin/useCrudEmployeeStore";
import { AuthenticationStore } from '@/stores/Authentication';
import { requiredValidator, validarCampoNumerico, validateMinimumCharacters,  soloNumeros } from '@validators';
import type { VForm } from 'vuetify/components';

const employeeWorkingInformationStore = useEmployeeWorkingInformationStore();
const employeeStore = useCrudEmployeeStore();
const { formulario, typeContracts, reasonRetirements, payrollGroups, chargeCatalogs, contributingTypes, contributingSubTypes, healthBackgrounds, pensionFunds, compensationBoxs, arls, riskClass, codes } = storeToRefs(employeeWorkingInformationStore);

const authentication = AuthenticationStore();
const errors = ref<Array<string>>([]);

const changeScreen = (typeAction: string) => {
    errors.value = [];
    employeeStore.typeAction = typeAction
    if (typeAction != 'back')
        employeeStore.keyList++
}

const formValidation = ref<VForm>()
const submitForm = async () => {

    const validation = await formValidation.value?.validate()
    formulario.value.company_id = authentication.company.id;
    formulario.value.employee_id = employeeStore.formulario.id;
    if (validation?.valid) {
        const data = await employeeWorkingInformationStore.fetchSave();
        if (data.status === 200) changeScreen("list");
        if (data.status === 422) errors.value = data.error; //muestra error del back
    }
};

onMounted(() => {
    employeeWorkingInformationStore.fetchDataForm();
    if (!formulario.value.contract_number) formulario.value.contract_number = employeeStore.formulario.document_number;
});
</script>

<template>
    <div>
        <VCard flat>
            <VCardText>
                <VForm ref="formValidation" lazy-validation>
                    <VRow>
                        <VCol cols="12">
                            <div class="d-flex flex-column">
                                <span>Ingresa los siguientes datos para crear el contrato</span>
                            </div>
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="6">
                            <div class="d-flex flex-column">
                                <b>Información laboral</b>
                            </div>
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="6">
                            <VSelect :error-messages="errors.typeContract_id" item-value="id" item-title="name"
                                @update:model-value="errors.typeContract_id = ''" :items="typeContracts"
                                label="Tipo de contrato" v-model="formulario.typeContract_id" :rules="[requiredValidator]">
                            </VSelect>
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="6">
                            <VTextField :error-messages="errors.contractStartDate" type="date"
                                @keypress="errors.contractStartDate = ''" v-model="formulario.contractStartDate"
                                label="Fecha inicio de contrato" placeholder="Fecha inicio de contrato"
                                :rules="[requiredValidator]"></VTextField>
                        </VCol>
                        <VCol cols="6" v-show="formulario.contractStartDate">
                            <VTextField :error-messages="errors.contractFinalDate" type="date"
                                @keypress="errors.contractFinalDate = ''" v-model="formulario.contractFinalDate"
                                label="Fecha fin de contrato" placeholder="Fecha fin de contrato"
                                :rules="[requiredValidator]"></VTextField>
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="6">
                            <VTextField :error-messages="errors.salary" @keypress="errors.salary = '';soloNumeros($event)"
                                v-model="formulario.salary" label="Sueldo" placeholder="Sueldo"
                                :rules="[requiredValidator, validateMinimumCharacters(formulario.salary, 0)]">
                            </VTextField>
                        </VCol>
                        <VCol cols="6" v-show="formulario.contractFinalDate">
                            <VSelect :error-messages="errors.reasonRetirement_id" item-value="id" item-title="name"
                                @update:model-value="errors.reasonRetirement_id = ''" :items="reasonRetirements"
                                label="Motivo de retiro" v-model="formulario.reasonRetirement_id"
                                :rules="[requiredValidator]"></VSelect>
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="6">
                            <label for="">¿El sueldo del empleado es integral?</label>
                            <VTooltip location="top">
                                <template #activator="{ props }">
                                    <VIcon color="primary" v-bind="props" size="30" icon="mdi-help-circle" />
                                </template>
                                <span>ART. 132 CST, no aplica para aprendices. </span>
                            </VTooltip>
                            <VRadioGroup :rules="[requiredValidator]" inline v-model="formulario.comprehensive_salary"
                                :error-messages="errors.comprehensive_salary" @change="errors.comprehensive_salary = ''">
                                <VRadio label="Si" value="Si"></VRadio>
                                <VRadio label="No" value="No"></VRadio>
                            </VRadioGroup>
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="6">
                            <div class="d-flex flex-column">
                                <b>Datos de contrato</b>
                            </div>
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="6">
                            <VTextField :error-messages="errors.contract_number" @keypress="errors.contract_number = ''"
                                v-model="formulario.contract_number" label="Número de contrato"
                                placeholder="Número de contrato" :rules="[requiredValidator]"></VTextField>
                        </VCol>
                        <VCol cols="6">
                            <VSelect :error-messages="errors.payroll_group" item-value="id" item-title="name"
                                @update:model-value="errors.payroll_group = ''" :items="payrollGroups"
                                label="Grupo de nómina" v-model="formulario.payroll_group" :rules="[requiredValidator]">
                            </VSelect>
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="6">
                            <VSelect :error-messages="errors.charge_id" item-value="id" item-title="name"
                                @update:model-value="errors.charge_id = ''" :items="chargeCatalogs" label="Cargo"
                                v-model="formulario.charge_id" :rules="[requiredValidator]"></VSelect>
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="6">
                            <div class="d-flex flex-column">
                                <b>Datos para aporte de seguridad social y parafiscales</b>
                            </div>
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="6">
                            <VSelect :error-messages="errors.typeContributor_id" item-value="id" item-title="name"
                                @update:model-value="errors.typeContributor_id = ''" :items="contributingTypes"
                                label="Tipo de cotizante" v-model="formulario.typeContributor_id"
                                :rules="[requiredValidator]"></VSelect>
                        </VCol>
                        <VCol cols="6">
                            <VSelect :error-messages="errors.subTypeContributor_id" item-value="id" item-title="name"
                                @update:model-value="errors.subTypeContributor_id = ''" :items="contributingSubTypes"
                                label="Sub tipo de cotizando" v-model="formulario.subTypeContributor_id"
                                :rules="[requiredValidator]"></VSelect>
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="6">
                            <VSelect :error-messages="errors.health_background_id" item-value="id" item-title="name"
                                @update:model-value="errors.health_background_id = ''" :items="healthBackgrounds"
                                label="Fondo de salud" v-model="formulario.health_background_id"
                                :rules="[requiredValidator]"></VSelect>
                        </VCol>
                        <VCol cols="6">
                            <VTextField :error-messages="errors.health_fund_percentage"
                                @keypress="errors.health_fund_percentage = ''" v-model="formulario.health_fund_percentage"
                                label="Porcentaje fondo de salud" placeholder="Porcentaje fondo de salud"
                                :rules="[requiredValidator, validarCampoNumerico]"></VTextField>
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="6">
                            <VSelect :error-messages="errors.pension_fund_id" item-value="id" item-title="name"
                                @update:model-value="errors.pension_fund_id = ''" :items="pensionFunds"
                                label="Fondo de pensiones" v-model="formulario.pension_fund_id"
                                :rules="[requiredValidator]"></VSelect>
                        </VCol>
                        <VCol cols="6">
                            <VTextField :error-messages="errors.pension_fund_percentage"
                                @keypress="errors.pension_fund_percentage = ''" v-model="formulario.pension_fund_percentage"
                                label="Porcentaje fondo de pensiones" placeholder="Porcentaje fondo de pensiones"
                                :rules="[requiredValidator, validarCampoNumerico]"></VTextField>
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="6">
                            <VSelect :error-messages="errors.arl_id" item-value="id" item-title="name"
                                @update:model-value="errors.arl_id = ''" :items="arls" label="ARL"
                                v-model="formulario.arl_id" :rules="[requiredValidator]">
                            </VSelect>
                        </VCol>
                        <VCol cols="6">
                            <VRow>
                                <VCol cols="4">
                                    <VSelect :error-messages="errors.risk_class_id" item-value="id" item-title="name"
                                        @update:model-value="errors.risk_class_id = ''" :items="riskClass"
                                        label="Clase de riesgo" v-model="formulario.risk_class_id"
                                        :rules="[requiredValidator]"></VSelect>
                                </VCol>
                                <VCol cols="4">
                                    <VTextField v-model="formulario.code_ciiu" label="Código CIIU" maxlength="4"
                                        :error-messages="errors.code_ciiu" @keypress="errors.code_ciiu = ''"
                                        placeholder="Código CIIU">
                                    </VTextField>
                                </VCol>
                                <VCol cols="4">
                                    <VSelect clearable :error-messages="errors.code_id" item-value="id" item-title="name"
                                        @update:model-value="errors.code_id = ''" :items="codes" label="Código"
                                        v-model="formulario.code_id"></VSelect>
                                </VCol>
                            </VRow>
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="6">
                            <VSelect :error-messages="errors.compensation_box_id" item-value="id" item-title="name"
                                @update:model-value="errors.compensation_box_id = ''" :items="compensationBoxs"
                                label="Caja de compensacion" v-model="formulario.compensation_box_id"
                                :rules="[requiredValidator]"></VSelect>
                        </VCol>
                        <VCol cols="6">
                            <VSelect :error-messages="errors.severance_fund_id"
                                @update:model-value="errors.severance_fund_id = ''" item-value="id" item-title="name"
                                :items="pensionFunds" label="Fondo de cesantias" v-model="formulario.severance_fund_id" ></VSelect>
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="6">
                            <label for="">¿Desea activar deducciones de retenciones en la fuente (valores
                                mensuales)?</label>
                            <VRadioGroup inline :error-messages="errors.withholding_deductions"
                                v-model="formulario.withholding_deductions" @change="errors.withholding_deductions = ''"
                                :rules="[requiredValidator]">
                                <VRadio label="Si" value="Si"></VRadio>
                                <VRadio label="No" value="No"></VRadio>
                            </VRadioGroup>
                        </VCol>
                    </VRow>
                    <VRow>
                        <VCol cols="12" class="d-flex justify-content-center align-items-center">
                            <VBtn color="success" @click="submitForm()">Guardar y finalizar</VBtn>
                        </VCol>
                    </VRow>
                </VForm>
            </VCardText>
        </VCard>
    </div>
</template>