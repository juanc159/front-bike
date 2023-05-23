<script lang="ts" setup type="module">
import { useCrudPayrollStore } from '@/stores/Admin/useCrudPayrollStore';
import { requiredValidator,num_miles,validarInputNumerosMiles,lengthMaxValidator } from '@validators';
import type { VForm } from 'vuetify/components';
import { AuthenticationStore } from "@/stores/Authentication"; 
import { useImageUpload } from '@/composables/useImageUpload';
import { useConfig } from '@/composables/useConfig';
const authentication = AuthenticationStore();

const config = ref(useConfig())
const payrollStore = useCrudPayrollStore()
const { formulario,
  employees,
  transport_assistance,
  health_percentage, pension_percentage,
  employeer_pension_percentage,
  employer_compensation_box_percentage,
  layoffs_percentage,
  severance_interest_percentage,
  vacation_percentage,
  fileExcel,
errorsImport,years
} = storeToRefs(payrollStore)
const archive = ref(useImageUpload());
archive.value.allowedExtensions = ['xls','xlsx']

const formValidation = ref<VForm>();
const errors = ref<Array<string>>([]);
const meses = ref<Array<string>>(["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiember", "Octubre", "Noviembre", "Diciembre"])

const valueCheckMasive = ref<boolean>(false)


const selectedRows = ref<string[]>([])
const selectAllProject = ref(false)
// 👉 Add/Remove all checkbox ids in/from array
const selectUnselectAll = () => {
  selectAllProject.value = !selectAllProject.value
  if (selectAllProject.value) {
    employees.value.forEach(employee => {
      if (!selectedRows.value.includes(`check${employee.id}`))
        selectedRows.value.push(`check${employee.id}`)
    })
  }
  else {
    selectedRows.value = []
  }
}
// 👉 Add/Remove individual checkbox in/from array
const addRemoveIndividualCheckbox = (checkID: string) => {
  if (selectedRows.value.includes(checkID)) {
    const index = selectedRows.value.indexOf(checkID)

    selectedRows.value.splice(index, 1)
  }
  else {
    selectedRows.value.push(checkID)
    selectAllProject.value = true
  }
}

// 👉 watch if checkbox array is empty all checkbox should be uncheck
watch(selectedRows, () => {
  if (!selectedRows.value.length)
    selectAllProject.value = false
}, { deep: true })

const changeWorkedDays = (type:string) =>{
  if(type == 'Mensual' ){
    employees.value.forEach(element => {
      element.workedDays = 30;
    });
  }else{
    employees.value.forEach(element => {
      element.workedDays = 15;
    });
  }
}

const changeScreen = (typeAction: string) => {
  payrollStore.typeAction = typeAction
  if (typeAction != 'back')
    payrollStore.keyList++
}
const submitForm = async () => {
  if(valueCheckMasive.value) fileExcel.value = archive.value.imageFile;
  
  const validation = await formValidation.value?.validate();
  if (validation?.valid) { 
    formulario.value.company_id = authentication.company.id
    let data = {}
    if(valueCheckMasive.value)  data = await payrollStore.importExcel();
    else  data = await payrollStore.fetchSave(selectedRows.value);
    if (data.status === 200) changeScreen("list");
    if (data.status === 422) errors.value = data.error; //muestra error del back
  }
}

//computed vars
const wage = computed(() => {
  return function (obj: object) {
    const value = (Number(obj.salary ?? 0) / 30) * Number(obj.workedDays ?? 0)
    obj.wage = value
    return value
  }
})
const amount_transport_assistance = computed(() => {
  return function (obj: object) {
    const value = (Number(transport_assistance.value) / 30) * Number(obj.workedDays ?? 0)
    obj.amount_transport_assistance = value
    return value
  }
})
const total_accrued = computed(() => {
  return function (obj: object) {
    const value = wage.value(obj) + Number(transport_assistance.value) + Number(obj.extra_hours.toString().replaceAll(".", "").replace(",", ".")) + Number(obj.bonuses.toString().replaceAll(".", "").replace(",", ".")) + Number(obj.commissions.toString().replaceAll(".", "").replace(",", "."))
    obj.total_accrued = value
    return value
  }
})
const deduction_health = computed(() => {
  return function (obj: object) {
    const value = (wage.value(obj) + Number(obj.extra_hours.toString().replaceAll(".", "").replace(",", ".")) + Number(obj.commissions.toString().replaceAll(".", "").replace(",", "."))) * (Number(health_percentage.value) / 100)
    obj.deduction_health = value
    return value
  }
})
const deduction_pension = computed(() => {
  return function (obj: object) {
    const value = (wage.value(obj) + Number(obj.extra_hours.toString().replaceAll(".", "").replace(",", ".")) + Number(obj.commissions.toString().replaceAll(".", "").replace(",", "."))) * (Number(pension_percentage.value) / 100)
    obj.deduction_pension = value
    return value
  }
})
const total_deductibles = computed(() => {
  return function (obj: object) {
    const value = (deduction_health.value(obj) + deduction_pension.value(obj)) + Number(obj.other_discounts.toString().replaceAll(".", "").replace(",", "."))
    obj.total_deductibles = value
    return value
  }
})
const total_paid = computed(() => {
  return function (obj: object) {
    const value = total_accrued.value(obj) - total_deductibles.value(obj)
    obj.total_paid = value
    return value
  }
})
const employer_pension = computed(() => {
  return function (obj: object) {
    const value = wage.value(obj) * (employeer_pension_percentage.value / 100)
    obj.employer_pension = value
    return value
  }
})
const employer_compensation_box = computed(() => {
  return function (obj: object) {
    const value = wage.value(obj) * (employer_compensation_box_percentage.value / 100)
    obj.employer_compensation_box = value
    return value
  }
})
const employer_arl = computed(() => {
  return function (obj: object) {
    const value = wage.value(obj) * (Number(obj.risk_class_value) / 100)
    obj.employer_arl = value
    return value
  }
})
const total_form_pension = computed(() => {
  return function (obj: object) {
    const value = deduction_pension.value(obj) + employer_pension.value(obj)
    obj.total_form_pension = value
    return value
  }
})
const total_form_health = computed(() => {
  return function (obj: object) {
    const value = deduction_health.value(obj)
    obj.total_form_health = value
    return value
  }
})
const total_form_arl = computed(() => {
  return function (obj: object) {
    const value = employer_arl.value(obj)
    obj.total_form_arl = value
    return value
  }
})
const total_form_compensation_box = computed(() => {
  return function (obj: object) {
    const value = employer_compensation_box.value(obj)
    obj.total_form_compensation_box = value
    return value
  }
})
const layoffs = computed(() => {
  return function (obj: object) {
    const value = (wage.value(obj) + amount_transport_assistance.value(obj) + Number(obj.extra_hours.toString().replaceAll(".", "").replace(",", ".")) + Number(obj.commissions.toString().replaceAll(".", "").replace(",", "."))) * (layoffs_percentage.value / 100)
    obj.layoffs = value
    return value
  }
})
const severance_interest = computed(() => {
  return function (obj: object) {
    const value = layoffs.value(obj) * (severance_interest_percentage.value / 100)
    obj.severance_interest = value
    return value
  }
})
const wage_premium = computed(() => {
  return function (obj: object) {
    const value = layoffs.value(obj)
    obj.wage_premium = value
    return value
  }
})
const vacation = computed(() => {
  return function (obj: object) {
    const value = wage.value(obj) * (vacation_percentage.value / 100)
    obj.vacation = value
    return value
  }
})
const total_provisions = computed(() => {
  return function (obj: object) {
    const value = layoffs.value(obj) + severance_interest.value(obj) + wage_premium.value(obj) + vacation.value(obj)
    obj.total_provisions = value
    return value
  }
})

onMounted(async () => {
  await payrollStore.fetchDataForm(authentication.company.id);
});
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
    <VForm ref="formValidation" lazy-validation>
      <VRow>
        <VCol cols="12">
          <VCard title="Información general">
            <VCardText>
              <VRow>
                <VCol cols="3">
                  <VSelect :items="['Mensual', 'Primera Quincena', 'Segunda Quincena']" item-title="name" item-value="id"
                    @update:modelValue="errors.settlement_type = '';changeWorkedDays($event)" v-model="formulario.settlement_type"
                    :error-messages="errors.settlement_type" :rules="[requiredValidator]" label="Tipo de Liquidación">
                  </VSelect>
                </VCol>
                <VCol cols="3">
                  <VTextField label="Nombre" v-model="formulario.name" maxlength="50" :rules="[requiredValidator,lengthMaxValidator(formulario.name,50)]" />
                </VCol>
                <VCol cols="3">
                  <VSelect :items="meses" item-title="name" item-value="id" @update:modelValue="errors.month = ''"
                    v-model="formulario.month" :error-messages="errors.month" :rules="[requiredValidator]" label="Mes">
                  </VSelect>
                </VCol>
                <VCol cols="3">
                  <VSelect :items="years" item-title="name" item-value="id" @update:modelValue="errors.year = ''"
                    v-model="formulario.year" :error-messages="errors.year" :rules="[requiredValidator]" label="Año">
                  </VSelect>
                </VCol>
              </VRow>
              <VRow>
                <VCol cols="12">
                  <VRadioGroup inline v-model="valueCheckMasive">
                    <VRadio label="Manual" :value="false"></VRadio>
                    <VRadio label="Masivo" :value="true"></VRadio>
                  </VRadioGroup>

                </VCol>
              </VRow>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>

      <VRow v-if="valueCheckMasive">
        <VCol cols="12">
          <VCard>
            <VCardText>
              <VRow>
                <VCol cols="12">
                  <a :href="config.baseURL+'documents/employeePayrollFormat.xlsx'" download>
                    <b>Descargar formato</b>
                    <VIcon icon="mdi-table-arrow-down"></VIcon>
                  </a>
                </VCol>
              </VRow>
              <VRow>
                <VCol cols="12">
                  <VFileInput @change="archive.handleImageSelected" :rules="[requiredValidator]" :key="archive.key">
                  </VFileInput>
                </VCol>
              </VRow>
              <VRow>
                <VCol cols="12">
                  <div class="row" v-if="errorsImport.length > 0">
                    <div class="col-12">
                      <VTable fixed-header>
                        <thead>
                          <tr>
                            <th>Fila</th>
                            <th>Columna</th>
                            <th>Error</th>
                            <th>Valor</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in errorsImport" :key="index">
                            <td>{{ item.row }}</td>
                            <td>{{ item.attribute }}</td>
                            <td>{{ item.errors }}</td>
                            <td>{{ item.values }}</td>
                          </tr>
                        </tbody>
                      </VTable>
                    </div>
                  </div>
                </VCol>
              </VRow>
              <VRow>
                <VCol cols="12 d-flex justify-content-center">
                  <VBtn color="primary" @click="submitForm()" prepend-icon="mdi-upload">Subir</VBtn>
                </VCol>
              </VRow>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>

      <VRow v-if="!valueCheckMasive">
        <VCol cols="12">
          <VCard :title="'Empleados disponibles para nómina ('+employees.length+')'">
            <VCardText>
              <VTable fixed-header>
                <thead>
                  <tr>
                    <th class="text-center border" colspan="4">
                      EMPLEADO
                    </th>
                    <th class="text-center border" colspan="7">
                      DEVENGADO
                    </th>
                    <th class="text-center border" colspan="5">
                      DEDUCCIONES
                    </th>
                    <th class="text-center border" colspan="5">
                      PRESTACIONES SOCIALES EMPLEADOR
                    </th>
                    <th class="text-center border" colspan="4">
                      TOTAL PLANILLA
                    </th>
                    <th class="text-center border" colspan="5">
                      PROVISIONES
                    </th>
                  </tr>
                  <tr>
                    <!-- 👉 Check/Uncheck all checkbox -->
                    <th scope="col" class="text-center">
                      <div style="width: 1rem;">
                        <VCheckbox :model-value="selectAllProject"
                          :indeterminate="(employees.length !== selectedRows.length) && !!selectedRows.length"
                          @click="selectUnselectAll" />
                      </div>
                    </th>
                    <th class="tableMinWidth">
                      Nombre
                    </th>
                    <th class="tableMinWidth">
                      N identificación
                    </th>
                    <th class="tableMinWidth">
                      Sueldo
                    </th>
                    <th class="tableMinWidth">
                      Dias trabajados
                    </th>
                    <th class="tableMinWidth">
                      Salario
                    </th>
                    <th class="tableMinWidth">
                      Auxilio de transporte
                    </th>
                    <th class="tableMinWidth">
                      Horas extras
                    </th>
                    <th class="tableMinWidth">
                      Bonificaciones
                    </th>
                    <th class="tableMinWidth">
                      Comisiones
                    </th>
                    <th class="tableMinWidth">
                      Total devengado
                    </th>
                    <th class="tableMinWidth">
                      Salud
                    </th>
                    <th class="tableMinWidth">
                      Pensión
                    </th>
                    <th class="tableMinWidth">
                      Otros descuentos
                    </th>
                    <th class="tableMinWidth">
                      Total deducibles
                    </th>
                    <th class="tableMinWidth">
                      Total pagado
                    </th>
                    <th class="tableMinWidth">
                      Pensión
                    </th>
                    <th class="tableMinWidth">
                      Caja compensación
                    </th>
                    <th class="tableMinWidth">
                      ARL
                    </th>
                    <th class="tableMinWidth">
                      Pensión
                    </th>
                    <th class="tableMinWidth">
                      Salud
                    </th>
                    <th class="tableMinWidth">
                      ARL
                    </th>
                    <th class="tableMinWidth">
                      Caja compensación
                    </th>
                    <th class="tableMinWidth">
                      Cesantias
                    </th>
                    <th class="tableMinWidth">
                      Intereses Cesantias
                    </th>
                    <th class="tableMinWidth">
                      Prima salarial
                    </th>
                    <th class="tableMinWidth">
                      Vacaciones
                    </th>
                    <th class="tableMinWidth">
                      Total provisiones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in employees" :key="index">
                    <!-- 👉 Individual checkbox -->
                    <td>
                      <div style="width: 1rem;">
                        <VCheckbox :id="`check${item.id}`" :model-value="selectedRows.includes(`check${item.id}`)"
                          @click="addRemoveIndividualCheckbox(`check${item.id}`)" />
                      </div>
                    </td>

                    <td>{{ item.full_name }}</td>
                    <td>{{ item.document_number }}</td>
                    <td>{{ num_miles(item.salary)}}</td>
                    <td>
                      <VTextField v-model="item.workedDays" label="Dias trabajados" />
                    </td>
                    <td>
                      {{ num_miles(wage(item)) }}
                    </td>
                    <td>
                      {{ num_miles(amount_transport_assistance(item)) }}
                    </td>
                    <td>
                      <VTextField v-model="item.extra_hours" @blur="item.extra_hours = validarInputNumerosMiles(item.extra_hours)" label="Horas extras" />
                    </td>
                    <td>
                      <VTextField v-model="item.bonuses" @blur="item.bonuses = validarInputNumerosMiles(item.bonuses)" label="Bonificaciones" />
                    </td>
                    <td>
                      <VTextField v-model="item.commissions" @blur="item.commissions = validarInputNumerosMiles(item.commissions)" label="Comisiones" />
                    </td>
                    <td>
                      <!-- total devengado -->
                      {{ num_miles(total_accrued(item)) }}
                    </td>
                    <td>
                      {{ num_miles(deduction_health(item)) }}
                    </td>
                    <td>
                      {{ num_miles(deduction_pension(item)) }}
                    </td>
                    <td>
                      <VTextField v-model="item.other_discounts" label="Otros descuentos" @blur="item.other_discounts = validarInputNumerosMiles(item.other_discounts)"/>
                    </td>
                    <td>
                      {{ num_miles(total_deductibles(item)) }}
                    </td>
                    <td>
                      <!-- total pagado -->
                      {{ num_miles(total_paid(item)) }}
                    </td>
                    <td>
                      <!--  PRESTACIONES SOICLALES EMPLEADOR 	pension -->
                      {{ num_miles(employer_pension(item)) }}
                    </td>
                    <td>
                      <!--  PRESTACIONES SOICLALES EMPLEADOR 	Caja compensación -->
                      {{ num_miles(employer_compensation_box(item)) }}
                    </td>
                    <td>
                      {{ num_miles(employer_arl(item)) }}
                    </td>
                    <td>
                      <!--  TOTAL PLANILLA 			pension -->
                      {{ num_miles(total_form_pension(item)) }}
                    </td>
                    <td>
                      <!--  TOTAL PLANILLA salud -->
                      {{ num_miles(total_form_health(item)) }}
                    </td>
                    <td>
                      <!--  TOTAL PLANILLA arl -->
                      {{ num_miles(total_form_arl(item)) }}
                    </td>
                    <td>
                      <!--  TOTAL PLANILLA caja de compensacion -->
                      {{ num_miles(total_form_compensation_box(item)) }}
                    </td>
                    <td>
                      {{ num_miles(layoffs(item)) }}
                    </td>
                    <td>
                      {{ num_miles(severance_interest(item)) }}
                    </td>
                    <td>
                      {{ num_miles(wage_premium(item)) }}
                    </td>
                    <td>
                      {{ num_miles(vacation(item)) }}
                    </td>
                    <td>
                      {{ num_miles(total_provisions(item)) }}
                    </td>
                  </tr>
                </tbody>
              </VTable>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>


      <VRow v-if="!valueCheckMasive">
        <VCol cols="12 d-flex justify-content-center">
          <VBtn color="primary" @click="submitForm()">Guardar</VBtn>
        </VCol>
      </VRow>
    </VForm>
  </div>
</template>

<style scoped>
.tableMinWidth {
  min-width: 12rem;
}
</style>
