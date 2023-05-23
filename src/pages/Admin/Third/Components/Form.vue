<script lang="ts" setup type="module">
import Swal from "sweetalert2";
import { useThirdStore } from "@/stores/Admin/useThirdStore";
import { AuthenticationStore } from '@/stores/Authentication';
import { requiredValidator, lengthMaxValidator,emailValidator,integerValidator } from '@validators';
import type { VForm } from 'vuetify/components';

const authentication = AuthenticationStore();
const thirdStore = useThirdStore();
const {
  showContact,
  showSeller,
  basicDataType,
  fiscalResponsability,
  typeIdentification,
  typeOfThird,
  typeRegimeIva,
  showObservation,
  arrayPhone,
  arrayContact,
  userCompany,
  formulario,
  errorsArrayContact,
  departaments,
  cities,
  errorsArrayPhone
} = storeToRefs(thirdStore);
const formValidation = ref<VForm>();
const errors = ref<Array<string>>([]);
const changeScreen = async(typeAction:string) => {
  await formValidation.value?.resetValidation();
  errors.value = []
  thirdStore.typeAction = typeAction
  if(typeAction!='back')
    thirdStore.keyList++
}
const exitoContact = ref<boolean>(true);
const exitoPhone = ref<boolean>(true);
const submitForm = async () => {  
  console.log('FORMULARIO',formulario.value);
const validation = await formValidation.value?.validate()
  formulario.value.company_id = authentication.company.id;
  formulario.value.arrayPhone = arrayPhone;
  formulario.value.arrayContact = arrayContact;
//VALIDAR ARRAY CONTACTO
  exitoContact.value = true;
  arrayContact.value.forEach((element,key) => {
    if(!element.name) {
      errorsArrayContact.value[key].name = 'Este campo es obligatorio';
      exitoContact.value = false;
    }
    else errorsArrayContact.value[key].name = '';
    if(!element.email){
       errorsArrayContact.value[key].email = 'Este campo es obligatorio';
       exitoContact.value = false;
      }
    else errorsArrayContact.value[key].email = '';
    if(!element.last_name) {
      errorsArrayContact.value[key].last_name = 'Este campo es obligatorio';
      exitoContact.value = false;
    }
    else errorsArrayContact.value[key].last_name = '';
    if(!element.charge) {
      errorsArrayContact.value[key].charge = 'Este campo es obligatorio';
      exitoContact.value = false;
    }
    else errorsArrayContact.value[key].charge = '';
    if(!element.indicative) {
      errorsArrayContact.value[key].indicative = 'Este campo es obligatorio';
      exitoContact.value = false;
    }
    else errorsArrayContact.value[key].indicative = '';
    if(!element.phone) {
      errorsArrayContact.value[key].phone = 'Este campo es obligatorio';
      exitoContact.value = false;
    }
    else errorsArrayContact.value[key].phone = '';
  });
  //VALIDAR ARRAY TELEFONO
  exitoPhone.value = true;
  arrayPhone.value.forEach((element,key) => {
    if(!element.indicative) {
      errorsArrayPhone.value[key].indicative = 'Este campo es obligatorio';
      exitoPhone.value = false;
    }
    else errorsArrayPhone.value[key].indicative = '';
    if(!element.phone){
       errorsArrayPhone.value[key].phone = 'Este campo es obligatorio';
       exitoPhone.value = false;
      }
    else errorsArrayPhone.value[key].phone = '';
    if(!element.extension) {
      errorsArrayPhone.value[key].extension = 'Este campo es obligatorio';
      exitoPhone.value = false;
    }
    else errorsArrayPhone.value[key].extension = '';    
  });
  if(formulario.value.arrayTypeThird.length==0){
    Swal.fire(
      'Ingrese almenos un tipo de tercero',
      '',
      'question'
    );
    return false;
  }
  if(!exitoPhone.value  ||  arrayPhone.value.length < 1){
    Swal.fire(
      'Ingrese almenos un teléfono',
      '',
      'question'
    );
    return false;
  }
  if(!exitoContact.value  ||  arrayContact.value.length < 1){
    Swal.fire(
      'Ingrese almenos un contacto',
      '',
      'question'
    );
    return false;
  }  
  if(formulario.value.arrayFiscalResponsability.length==0){
    Swal.fire(
      'Ingrese almenos una Responsabilidad fiscal',
      '',
      'question'
    );
    return false;
  }
  
  if (validation?.valid) {
    const data = await thirdStore.fetchSave();
    if (data.status === 200) changeScreen("list");
    if (data.status === 422) errors.value = data.error; //muestra error del back
  }
};

const showCities = (value)=>{
  formulario.value.departament_id = value;
  thirdStore.getCities()
}

onMounted(() => {  
  thirdStore.fetchDataForm(authentication.company.id);
});
</script>
<template>
  <div class="mt-4 mb-4">
    <VRow>
      <VCol cols="12" class="d-flex justify-content-end">
        <VBtn color="secondary" @click="changeScreen('back')"> Atras </VBtn>
      </VCol>
    </VRow>
    <VForm ref="formValidation" lazy-validation>
      <VRow>
        <VCol cols="12">
          <span>Todos los campos marcados con * son obligatorios para la creación del tercero</span>
        </VCol>
        <VCol cols="12">
          <VCard>
            <VRow class="px-5 py-5">
              <VCol cols="12">
                <span>Tipo de tercero *</span>
              </VCol>
              <VCol cols="4" v-for="(item, index) in typeOfThird">
                <VCheckbox :label="item.name" :value="item.id" @click="thirdStore.addTypeThird(item.id)"
                true-value="Activo"
                false-value="Inactivo"
                v-model="item.estado"
                ></VCheckbox>
                <span>
                  {{ item.description }}
                </span>
              </VCol>
            </VRow>
          </VCard>
        </VCol>

        <VCol cols="6">
          <VRow>
            <VCol>
              <VCard class="mx-auto" >
                <VCardText>
                  <VRow>
                    <VCol cols="12">
                      <span>* Datos básicos</span>
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="6">
                      <VTextField maxlength="50" label="Nombres *" v-model="formulario.name" :error-messages="errors.name" @keypress="errors.name = ''" @keyup="formulario.contact_name = formulario.name" :rules="[requiredValidator,lengthMaxValidator(formulario.name,50)]"/>
                    </VCol>
                    <VCol cols="6">
                      <VTextField maxlength="50" label="Apellidos *" v-model="formulario.last_name" :error-messages="errors.last_name" @keypress="errors.last_name = ''" @keyup="formulario.contact_last_name = formulario.last_name" :rules="[requiredValidator,lengthMaxValidator(formulario.name,50)]"/>
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="6">
                      <VTextField maxlength="255" :error-messages="errors.trade_name" @keypress="errors.trade_name = ''" label="Nombre comercial" v-model="formulario.trade_name"/>
                    </VCol>
                    <VCol cols="6">
                      <VSelect
                        :items="basicDataType"
                        item-title="name"
                        item-value="id"
                        label="Tipo *"
                        v-model="formulario.basic_data_types_id"
                        :error-messages="errors.basic_data_types_id" 
                        @update:model-value="errors.basic_data_types_id = ''"
                        :rules="[requiredValidator]"
                      ></VSelect>
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="6">
                      <VSelect
                        :items="typeIdentification"
                        item-title="name"
                        item-value="id"
                        label="Tipo de identificación"
                        v-model="formulario.type_identifications_id"
                      ></VSelect>
                    </VCol>
                    <VCol cols="6">
                      <VTextField maxlength="50" label="Identificación *" v-model="formulario.identifications" :error-messages="errors.identifications" @keypress="errors.identifications = ''" :rules="[requiredValidator,lengthMaxValidator(formulario.identifications,50)]"/>
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="6">
                      <VTextField maxlength="3" label="Codigo de la sucursal" v-model="formulario.branch_code"/>
                    </VCol>
                    <VCol cols="6">
                      <VSelect
                        :items="departaments"
                        item-title="name"
                        item-value="id"
                        label="Departamento"
                        :error-messages="errors.departament_id" 
                        v-model="formulario.departament_id"
                        @update:modelValue="showCities" 
                        :rules="[requiredValidator]"                     
                      ></VSelect> 
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="6">
                      <VSelect
                        :items="cities"
                        item-title="name"
                        label="Ciudad"
                        item-value="id"
                        :error-messages="errors.city_id" 
                        v-model="formulario.city_id"
                        @update:modelValue="formulario.city_id" 
                        :rules="[requiredValidator]"
                      ></VSelect>
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="12">
                      <VTextField maxlength="255" label="Dirección" v-model="formulario.address"/>
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="12">
                      <VBtn @click="thirdStore.addFormPhone()">+ Agregar Teléfono</VBtn>
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="12">
                      <VRow v-for="(item,index) in arrayPhone" :key="index" v-show="item.delete != 'delete'">
                          <VCol cols="3">
                              <VTextField v-model="item.indicative" maxlength="10" label="Indicativo" :error-messages="errorsArrayPhone[index]?.indicative" :rules="[requiredValidator,integerValidator]" @keypress="errorsArrayPhone[index].indicative = ''"/>
                          </VCol>
                          <VCol cols="4">
                              <VTextField v-model="item.phone" maxlength="10" label="# de Teléfono" :error-messages="errorsArrayPhone[index]?.phone" :rules="[requiredValidator,integerValidator]" @keypress="errorsArrayPhone[index].phone = ''"/>
                          </VCol>
                          <VCol cols="4">
                              <VTextField v-model="item.extension" maxlength="10" label="Extensión" :error-messages="errorsArrayPhone[index]?.extension" :rules="[requiredValidator,integerValidator]" @keypress="errorsArrayPhone[index].extension = ''"/>
                          </VCol>
                          <VCol cols="1">
                              <VBtn size="x-small" color="error" variant="text" @click="thirdStore.deleteFormPhone(index,item)">
                                  <VIcon size="22" icon="tabler-trash"/>
                              </VBtn>
                          </VCol>
                      </VRow>
                    </VCol>
                  </VRow>
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
        </VCol>
        <VCol cols="6">
          <VRow>
            <VCol>
              <VCard class="mx-auto" >
                <VCardText>
                  <VRow>
                    <VCol cols="12">
                      <span>* Datos para facturación y envío</span>
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="6">
                      <VTextField maxlength="50" label="Nombres del contacto *" v-model="formulario.contact_name" :error-messages="errors.contact_name" @keypress="errors.contact_name = ''" :rules="[requiredValidator,lengthMaxValidator(formulario.contact_name,50)]"/>
                    </VCol>
                    <VCol cols="6">
                      <VTextField maxlength="50" label="Apellidos del contacto" v-model="formulario.contact_last_name"/>
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="6">
                      <VTextField maxlength="50" label="Correo electrónico *" v-model="formulario.email_fac" :error-messages="errors.email_fac" @keypress="errors.email_fac = ''" :rules="[requiredValidator,emailValidator,lengthMaxValidator(formulario.email_fac,50)]"/>
                    </VCol>
                    <VCol cols="6">
                      <VSelect
                        :items="typeRegimeIva"
                        item-title="name"
                        item-value="id"
                        label="Tipo de régimen IVA"
                        v-model="formulario.type_regime_ivas_id"
                      ></VSelect>
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="4">
                      <VTextField maxlength="50" label="Indicativo" v-model="formulario.indicative"/>
                    </VCol>
                    <VCol cols="8">
                      <VTextField maxlength="50" label="# de telefono"    v-model="formulario.phone_fac"/>
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="12">
                      <VTextField maxlength="50" label="Código postal" v-model="formulario.postal_code"/>
                    </VCol>
                  </VRow>

                  <VRow>
                    <VCol cols="12">
                      <span>Responsabilidad fiscal</span><br />
                      <span
                        >Verifica la responsabilidad en el RUT de tu cliente
                        mínimo asignar R-99-PN</span
                      >
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="12" v-for="(item, index) in fiscalResponsability">
                      <VCheckbox
                        :label="item.name + ' ' + item.description"  
                        true-value="Activo"
                        false-value="Inactivo"
                        v-model="item.estado"                    
                        @click="thirdStore.addFiscalResponsability(item.id)"
                      ></VCheckbox>
                    </VCol>
                  </VRow>
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
        </VCol>

        <VCol cols="12">
          <VCard>
            <VCardActions>
              <VBtn
                :icon="showContact ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="showContact = !showContact"
              ></VBtn>
              <VBtn color="orange-lighten-2" variant="text" @click="showContact = !showContact"> Contactos </VBtn>
            </VCardActions>

            <VExpandTransition>
              <div v-show="showContact">
                <VDivider></VDivider>

                <VCardText>
                  <VRow>
                      <VCol cols="12">
                          <VBtn @click="thirdStore.addFormContact()">+ Agregar contacto</VBtn>
                      </VCol>
                      <VCol cols="12">
                          <VRow v-for="(item,index) in arrayContact" :key="index" v-show="item.delete != 'delete'">
                              <VCol cols="2">
                                  <VTextField v-model="item.name" maxlength="50" label="Nombre" :error-messages="errorsArrayContact[index]?.name" :rules="[requiredValidator]" @keypress="errorsArrayContact[index].name = ''"/>
                              </VCol>
                              <VCol cols="2">
                                  <VTextField v-model="item.last_name" maxlength="50" label="Apellido" :error-messages="errorsArrayContact[index]?.last_name" :rules="[requiredValidator]" @keypress="errorsArrayContact[index].last_name = ''"/>
                              </VCol>
                              <VCol cols="2">
                                  <VTextField v-model="item.email" maxlength="50" label="Correo electrónico" :error-messages="errorsArrayContact[index]?.email" :rules="[requiredValidator,emailValidator]" @keypress="errorsArrayContact[index].email = ''" />
                              </VCol>
                              <VCol cols="2">
                                  <VTextField v-model="item.charge" maxlength="50" label="Cargo" :error-messages="errorsArrayContact[index]?.charge" :rules="[requiredValidator]" @keypress="errorsArrayContact[index].charge = ''"/>
                              </VCol>
                              <VCol cols="2">
                                  <VTextField v-model="item.indicative" maxlength="10" label="Indicativo" :error-messages="errorsArrayContact[index]?.indicative" :rules="[requiredValidator]" @keypress="errorsArrayContact[index].indicative = ''"/>
                              </VCol>
                              <VCol cols="2">
                                  <VTextField   v-model="item.phone" maxlength="10" label="# de Teléfono" :error-messages="errorsArrayContact[index]?.phone" :rules="[requiredValidator,integerValidator]" @keypress="errorsArrayContact[index].phone = ''"/>
                              </VCol>
                              <VCol cols="1">
                                  <VBtn size="x-small" color="error" variant="text" @click="thirdStore.deleteFormContact(index,item)">
                                      <VIcon size="22" icon="tabler-trash"/>
                                  </VBtn>
                              </VCol>
                          </VRow>
                      </VCol>
                  </VRow>
                </VCardText>
              </div>
            </VExpandTransition>
          </VCard>
        </VCol>

        <VCol cols="12">
          <VRow>
            <VCol cols="6">
              <VCard>
                <VCardActions>
                  <VBtn
                    :icon="showSeller ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                    @click="showSeller = !showSeller"
                  ></VBtn>
                  <VBtn color="orange-lighten-2" variant="text" @click="showSeller = !showSeller">
                    Vendedor y cobrador
                  </VBtn>
                </VCardActions>

                <VExpandTransition>
                  <div v-show="showSeller">
                    <VDivider></VDivider>

                    <VCardText>
                      <VRow>
                          <VCol cols="6">
                              <VSelect
                              :items="userCompany"
                              item-title="name"
                              item-value="id"
                              label="Vendedor"
                              v-model="formulario.seller_id"
                              ></VSelect>
                          </VCol>
                          <VCol cols="6">
                              <VSelect
                              :items="userCompany"
                              item-title="name"
                              item-value="id"
                              label="Cobrador"
                              v-model="formulario.debt_seller_id"
                              ></VSelect>
                          </VCol>
                      </VRow>
                    </VCardText>
                  </div>
                </VExpandTransition>
              </VCard>
            </VCol>
            <VCol cols="6">
              <VCard>
                <VCardActions>
                  <VBtn
                    :icon="showObservation ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                    @click="showObservation = !showObservation"
                  ></VBtn>
                  <VBtn color="orange-lighten-2" variant="text" @click="showObservation = !showObservation">
                    Observaciones
                  </VBtn>
                </VCardActions>

                <VExpandTransition>
                  <div v-show="showObservation">
                    <VDivider></VDivider>

                    <VCardText>
                      <VRow>
                          <VTextField maxlength="50" label="Observaciones" v-model="formulario.observations"/>
                      </VRow>
                    </VCardText>
                  </div>
                </VExpandTransition>
              </VCard>
            </VCol>
          </VRow>
          <VRow>
        <VCol cols="12 d-flex justify-content-center">
          <VBtn color="primary" @click="submitForm()">Guardar</VBtn>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </VForm>
  </div>
</template>
