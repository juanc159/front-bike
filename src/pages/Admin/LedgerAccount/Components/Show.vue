<style>
.my-swal {
  z-index: 9000;
}
</style>
<script lang="ts" setup type="module">
import Swal from 'sweetalert2';
import { useLedgerAccountStore } from "@/stores/Admin/useLedgerAccountStore";
import { useFormValidation } from "@/composables/useFormValidation";
import { count } from 'console';
import { AuthenticationStore } from '@/stores/Authentication';

const auth = AuthenticationStore();
const storeLedgerAccount = useLedgerAccountStore();
const {
  clase,
  formulario,
  titleModal,
  titleButton,
  group,
  account,
  subAccount,
  auxiliary,
  subAuxiliary,
  typeClick,
  codeInitial,
  maxlength,
  minlength,
  routeName,
  ledgerAccountCategory,
  ledgerAccountBalance
} = storeToRefs(storeLedgerAccount);

const form = useFormValidation();
const errors = form.errors;
const dialog = ref<boolean>(false);
let disabledSelect = false;
const codeDisabled = ['4','5','6','7']//array de codigos para desabilitar->detallar saldo
/* asig valor al formulario.ledgerAccountCategory_id */
formulario.value.ledgerAccountCategory_id = 1
formulario.value.ledgerAccountBalance_id = 1
formulario.value.relatedTo = 'Sin asignar'
const openModal = (val: boolean,typeClickModal:string | null = null,item: string | null = null) => {  

  errors.value = []
  if (typeClick.value === "clase") {
    maxlength.value = 1;
    minlength.value = 1;
  } else {
    maxlength.value = 2;
    minlength.value = 2;
  }  
  dialog.value = val;

  /***** Limpia algunos campos del formulario modal ******/
  formulario.value.name = "";
  formulario.value.code = "";
  formulario.value.tax_difference_account = "";
  formulario.value.active = "";

  if( codeDisabled.includes(clase.value.code) ) {disabledSelect = true}//Desabilita y habilita select detallar saldo
  else {disabledSelect = false};
  
  /****** Crear Grupo *******/
  if(typeClickModal === 'create' && titleButton.value === 'Crear Grupo'){
    codeInitial.value = clase.value.code;
    typeClick.value = "clase";
    titleModal.value = "Crear Grupo";
    titleButton.value = "Crear Grupo";
    routeName.value = "/ledgerAccount-group-create";
  }
  /****** Crear cuenta *******/
  if(typeClickModal === 'create' && titleButton.value === 'Crear Cuenta'){
    codeInitial.value = group.value.code;
    typeClick.value = "group";
    titleModal.value = "Crear Cuenta";
    titleButton.value = "Crear Cuenta";
    routeName.value = "/ledgerAccount-account-create";
  }
  /****** Crear sub cuenta *******/
  if(typeClickModal === 'create' && titleButton.value === 'Crear SubCuenta'){
    codeInitial.value = account.value.code;
    titleModal.value = "Crear SubCuenta";
    typeClick.value = "account"
    titleButton.value = "Crear SubCuenta";
    routeName.value = "/ledgerAccount-subAccount-create";
  }
  
  /****** Editar sub cuenta *******/
  if(typeClickModal === 'editSubAcount'){
    titleModal.value = "Editar Sub Cuenta";
    typeClick.value = "account"
    routeName.value = "/ledgerAccount-subAccount-create";
    for (const key in item) {
      formulario.value[key] = item[key]
      formulario.value['code'] = item['code'].slice(4)//codigo  en el v-model
      codeInitial.value = item['code'].slice(0,-2)//Codigo inicial->prefix
      if(item['active'] == 1)item['active'] = true; else item['active'] = false;
      if(item['tax_difference_account'] == 1)item['tax_difference_account'] = true; else item['tax_difference_account'] = false;   
    }
  }
  
  if(typeClickModal === 'create' && titleButton.value === 'Crear Auxiliar'){
    codeInitial.value = subAccount.value.code
    titleModal.value = 'Crear Auxiliar';
    typeClick.value = "subAccount"
    routeName.value = "/ledgerAccount-auxiliary-create";
  }

  /****** Editar auxiliar *******/
  if(typeClickModal === 'editAuxiliary'){
    titleModal.value = "Editar Auxiliar";
    typeClick.value = "subAccount"
    routeName.value = "/ledgerAccount-auxiliary-create";
    for (const key in item) {
      formulario.value[key] = item[key]
      formulario.value['code'] = item['code'].slice(6)//codigo  en el v-model
      codeInitial.value = item['code'].slice(0,-2)//Codigo inicial->prefix
      if(item['active'] == 1)item['active'] = true; else item['active'] = false;
      if(item['tax_difference_account'] == 1)item['tax_difference_account'] = true; else item['tax_difference_account'] = false;   
    }
  }
  if(typeClickModal === 'create' && titleButton.value === 'Crear Sub Auxiliar'){
    codeInitial.value = auxiliary.value.code;
    titleModal.value = 'Crear Sub Auxiliar';
    typeClick.value = "auxiliary"
    routeName.value = "/ledgerAccount-subAuxiliary-create";
  }

  /****** Editar sub auxiliar *******/
  if(typeClickModal === 'editSubAuxiliary'){
    titleModal.value = "Editar Sub Auxiliar";
    typeClick.value = "auxiliary"
    routeName.value = "/ledgerAccount-subAuxiliary-create";
    for (const key in item) {
      formulario.value[key] = item[key]
      formulario.value['code'] = item['code'].slice(8)//codigo  en el v-model
      codeInitial.value = item['code'].slice(0,-2)//Codigo inicial->prefix
      if(item['active'] == 1)item['active'] = true; else item['active'] = false;
      if(item['tax_difference_account'] == 1)item['tax_difference_account'] = true; else item['tax_difference_account'] = false;   
    }
  }
  
};

const editForm = (routeEdit:string | null = null) => {
  if(routeEdit || titleModal.value === "Editar Sub Cuenta" || titleModal.value === "Editar Auxiliar" || titleModal.value === "Editar Sub Auxiliar"){

    Swal.fire({
      text: `Al realizar este cambio se actualizará tu información, y no se reflejará en la vista de los documentos.
       ¿Desea continuar?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      customClass: {
      container: 'my-swal'
    }
    }).then((result) => {
      if (result.isConfirmed) {
        switch (routeEdit) {
          case '/ledgerAccount-group-create':
            typeClick.value = 'group';
            break;
          case '/ledgerAccount-account-create':
            typeClick.value = 'account';
            break;        
          default:
            break;
        }       
        submitForm(routeEdit);        
      }
    });
  }else{
    submitForm();
  }
}

const submitForm = async (editRoute: string | null = null) => {
  const noValidate: Array<string> = ['tax_difference_account','active',"relatedTo"];
  const errorMessage: object = {
    code: "código",
    name: "nombre",
    ledgerAccountCategory_id:"Categoría",
    ledgerAccountBalance_id:"Detallar saldos de cartera o proveedores",
  };

  /* Datos de acuerdo al tipo de click */
  let formData = {};
  if (typeClick.value === "group") {
    formData = {
      id: group.value.id,
      code: group.value.code,
      name: group.value.name,
      ledgerAccountClass_id: clase.value.id,
      company_id: auth.company.id,
    };
  } else if (typeClick.value === "account") {
    formData = {
      id: account.value.id,
      code: account.value.code,
      name: account.value.name,
      ledgerAccountClass_id: clase.value.id,
      ledgerAccountGroup_id: group.value.id,
      company_id: auth.company.id,
    };    
  }
  if (!editRoute) {
    if (typeClick.value === "group") {
      formData = {
        code: codeInitial.value + formulario.value.code,
        name: formulario.value.name,
        ledgerAccountClass_id: clase.value.id,
        ledgerAccountGroup_id: group.value.id,
        company_id: auth.company.id,
      };
    }else if (typeClick.value === "account" || typeClick.value === "subAccount" || typeClick.value === "auxiliary") {
      formData = {
        code:codeInitial.value + formulario.value.code,
        name: formulario.value.name,
        ledgerAccountClass_id: clase.value.id,
        ledgerAccountGroup_id: group.value.id,
        company_id: auth.company.id,
        ledgerAccountAccount_id:account.value.id,
        ledgerAccountCategory_id:formulario.value.ledgerAccountCategory_id,
        ledgerAccountBalance_id:formulario.value.ledgerAccountBalance_id,
        tax_difference_account:formulario.value.tax_difference_account,
        active:formulario.value.active,
        relatedTo:formulario.value.relatedTo,
      };
      if(subAccount.value.id && typeClick.value === "account") {formData.id = subAccount.value.id} 
      if(typeClick.value === "subAccount" || typeClick.value === "auxiliary") {formData.ledgerAccountSubAccount_id = subAccount.value.id} 
      if(auxiliary)if(auxiliary.value.id && typeClick.value === "subAccount") {formData.id = auxiliary.value.id}
      if(typeClick.value === "auxiliary") {formData.ledgerAccountAuxiliarie_id = auxiliary.value.id}
      if(subAuxiliary)if(subAuxiliary.value.id && typeClick.value === "auxiliary") {formData.id = subAuxiliary.value.id}  
        
  }
  else {
      formData = {
        code: codeInitial.value + formulario.value.code,
        name: formulario.value.name,
        ledgerAccountClass_id: clase.value.id,
        company_id: auth.company.id,
      };
    }
  }
  
  form.validation(formData, noValidate, "", errorMessage);//Valida el formulario - front
  console.log('formDataformDataformData',form) 
  if (form.exito.value) {
    const data = await storeLedgerAccount.fetchSave(editRoute, formData);
    if (data.status === 422) errors.value = data.error; //muestra error del back 
    if (data.status === 200) {
    openModal(false);//cierra el modal

      /* Muestra los datos grupo agregados desde el modal */
        if(typeClick.value === "clase" && !group.id){
          for (const key in data.formedit) {
            group.value[key] = data.formedit[key];
          }
          maxlength.value = 2
          minlength.value = 2
          codeInitial.value = data.formedit.code;
          typeClick.value = "group"
          titleModal.value = 'Crear Cuenta'
          titleButton.value = 'Crear Cuenta'
          routeName.value = '/ledgerAccount-account-create'
        }
        /* Muestra los datos de la cuenta agregados desde el modal */
        if(typeClick.value === "group" && formData.ledgerAccountGroup_id != null){
          for (const key in data.formedit) {
            account.value[key] = data.formedit[key];
          }
          maxlength.value = 2
          minlength.value = 2
          codeInitial.value = data.formedit.code;
          typeClick.value = "account"
          titleModal.value = 'Crear SubCuenta'
          titleButton.value = 'Crear SubCuenta'
          routeName.value = '/ledgerAccount-subAccount-create'
        }
        /* Muestra los datos de la sub cuenta agregados desde el modal */
        if(typeClick.value === "account" && formData.ledgerAccountGroup_id != null && formData.ledgerAccountAccount_id != null){
          for (const key in data.formedit) {
            subAccount.value[key] = data.formedit[key];
          }
          maxlength.value = 2
          minlength.value = 2
          codeInitial.value = data.formedit.code;
          typeClick.value = "subAccount"
          titleModal.value = 'Crear Auxiliar'
          titleButton.value = 'Crear Auxiliar'
          routeName.value = '/ledgerAccount-auxiliary-create'
        }
        /* Muestra los datos auxiliar agregados desde el modal */
        if(typeClick.value === "subAccount" && formData.ledgerAccountGroup_id != null && formData.ledgerAccountAccount_id != null && formData.ledgerAccountSubAccount_id != null){
          for (const key in data.formedit) {
            auxiliary.value[key] = data.formedit[key];
          }
          maxlength.value = 2
          minlength.value = 2
          codeInitial.value = data.formedit.code;
          typeClick.value = "auxiliary"
          titleModal.value = 'Crear Sub Auxiliar'
          titleButton.value = 'Crear Sub Auxiliar'
          routeName.value = '/ledgerAccount-subAuxiliary-create'
        }
        /* Muestra los datos sub auxiliar agregados desde el modal */
        if(typeClick.value === "auxiliary" && formData.ledgerAccountGroup_id != null && formData.ledgerAccountAccount_id != null && formData.ledgerAccountSubAccount_id != null && formData.ledgerAccountAuxiliarie_id != null){
          for (const key in data.formedit) {
            subAuxiliary.value[key] = data.formedit[key];
          }
          maxlength.value = 2
          minlength.value = 2
          codeInitial.value = data.formedit.code;
          typeClick.value = "subAuxiliary"
          titleModal.value = ''
          titleButton.value = ''
          routeName.value = '/ledgerAccount-subAuxiliary-create'
        }
      }
    } 
  };
  
  /***** FUNCION ELIMINAR *******/
  const deleteData = async (id: number,routeDelete:string,type:string) => {
  Swal.fire({
    title: 'Las cuentas contables serán borradas y el movimiento relacionado a los auxiliares o subauxiliares se acumulará en el nivel superior',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Si',
    denyButtonText: 'No',
  }).then(async result => {
    if (result.isConfirmed) {
      await storeLedgerAccount.fetchDelete(id,routeDelete);
      switch (type) {
        case 'group':
          group.value = {};
          account.value = {};
          subAccount.value = {};
          auxiliary.value = {};
          subAuxiliary.value = {};
          typeClick.value = "group";
          titleModal.value = "Crear Grupo";
          titleButton.value = "Crear Grupo";
          break;
        case 'account':
          account.value = {};
          subAccount.value = {};
          auxiliary.value = {};
          subAuxiliary.value = {};
          typeClick.value = "account";
          titleModal.value = "Crear Cuenta";
          titleButton.value = "Crear Cuenta";
          break;
        case 'subAccount':
          subAccount.value = {};
          auxiliary.value = {};
          subAuxiliary.value = {};
          typeClick.value = "subAccount";
          titleModal.value = "Crear SubCuenta";
          titleButton.value = "Crear SubCuenta";
          break;
        case 'auxiliary':
          auxiliary.value = {};
          subAuxiliary.value = {};
          typeClick.value = "auxiliary";
          titleModal.value = "Crear Auxiliar";
          titleButton.value = "Crear Auxiliar";
          break;
        case 'subAuxiliary':
          subAuxiliary.value = {};
          typeClick.value = "subAuxiliary";
          titleModal.value = "Crear Sub Auxiliar";
          titleButton.value = "Crear Sub Auxiliar";
          break;
        default:
          break;
      }
    }
    else if (result.isDenied) {
    }
  })
}
</script>
<template>
  <div v-show="clase.code">
    <VRow>
      <VCol cols="2"> </VCol>
      <VCol cols="4">
        <label for="">Codigo</label>
      </VCol>
      <VCol cols="6">
        <label for="">Nombre</label>
      </VCol>
    </VRow>
    <VDivider></VDivider>
    <VRow class="mt-2">
      <VCol cols="2">
        <span>Clase</span>
      </VCol>
      <VCol cols="4">
        <VTextField :value="clase.code" disabled />
      </VCol>
      <VCol cols="6">
        <VTextField :value="clase.name" disabled />
      </VCol>
    </VRow>
    <VRow class="mt-2" v-if="group.id || group.code">
      <VCol cols="2">
        <span>Grupo</span>
      </VCol>
      <VCol cols="4">
        <VTextField
          :maxlength="maxlength"
          :minlength="minlength"
          v-model="group.code"
          :disabled="account.id"
        />
      </VCol>
      <VCol
        :cols="
          !account.id && group.company_id === auth.company.id ? 4 : 6
        "
      >
        <VTextField v-model="group.name" :disabled="account.id" />
      </VCol>
      <VCol
        cols="2"
        v-if="!account.id && group.company_id === auth.company.id"
      >
        <VIcon @click="editForm('/ledgerAccount-group-create')"
          >mdi-floppy</VIcon
        >
        <VBtn
            icon
            size="x-small"
            color="error"
            variant="text"
            @click="deleteData(group.id,'/ledgerAccount-group-delete','group')"
          >
        <VIcon size="22" icon="tabler-trash"/>
        </VBtn>
      </VCol>
    </VRow>
    <VRow class="mt-2" v-if="account.id">
      <VCol cols="2">
        <span>Cuenta</span>
      </VCol>
      <VCol cols="4">
        <VTextField
          :maxlength="maxlength"
          :minlength="minlength"
          v-model="account.code"
          :disabled="subAccount.id"
        />
      </VCol>
      <VCol :cols="!subAccount.id && account.company_id === auth.company.id ? 4 : 6">
        <VTextField v-model="account.name" :disabled="subAccount.id" />
      </VCol>
      <VCol cols="2" v-if="(!subAccount.id) && (account.company_id === auth.company.id)">
        <VIcon @click="editForm('/ledgerAccount-account-create')"
          >mdi-floppy</VIcon
        >
        <VBtn
            icon
            size="x-small"
            color="error"
            variant="text"
            @click="deleteData(account.id,'/ledgerAccount-account-delete','account')"
          >
        <VIcon size="22" icon="tabler-trash"/>
        </VBtn>
      </VCol>
    </VRow>
    <VRow class="mt-2" v-if="subAccount.id">
      <VCol cols="2">
        <span>Sub Cuenta</span>
      </VCol>
      <VCol cols="4">
        <VTextField
          :maxlength="maxlength"
          :minlength="minlength"
          v-model="subAccount.code"
          :disabled="subAccount.id"
        />
      </VCol>
      <VCol :cols="!auxiliary.id && subAccount.company_id === auth.company.id ? 4 : 6">
        <VTextField v-model="subAccount.name" :disabled="subAccount.id" />
      </VCol>
      <VCol cols="2" v-if="(!auxiliary.id) && (subAccount.company_id === auth.company.id)">
        <VIcon @click="openModal(true,'editSubAcount',subAccount)"
          >mdi-floppy</VIcon
        >
        <VBtn
            icon
            size="x-small"
            color="error"
            variant="text"
            @click="deleteData(subAccount.id,'/ledgerAccount-subAccount-delete','subAccount')"
          >
        <VIcon size="22" icon="tabler-trash"/>
        </VBtn>
      </VCol>
    </VRow>
    <VRow class="mt-2" v-if="auxiliary.id">
      <VCol cols="2">
        <span>Auxiliar</span>
      </VCol>
      <VCol cols="4">
        <VTextField
          :maxlength="maxlength"
          :minlength="minlength"
          v-model="auxiliary.code"
          :disabled="auxiliary.id"
        />
      </VCol>
      <VCol :cols="!subAuxiliary.id && auxiliary.company_id === auth.company.id ? 4 : 6">
        <VTextField v-model="auxiliary.name" :disabled="auxiliary.id" />
      </VCol>
      <VCol cols="2" v-if="(!subAuxiliary.id) && (auxiliary.company_id === auth.company.id)">
        <VIcon @click="openModal(true,'editAuxiliary',auxiliary)"
          >mdi-floppy</VIcon
        >
        <VBtn
            icon
            size="x-small"
            color="error"
            variant="text"
            @click="deleteData(auxiliary.id,'/ledgerAccount-auxiliary-delete','auxiliary')"
          >
        <VIcon size="22" icon="tabler-trash"/>
        </VBtn>
      </VCol>
    </VRow>
    <VRow class="mt-2" v-if="subAuxiliary.id">
      <VCol cols="2">
        <span>Sub Auxiliar</span>
      </VCol>
      <VCol cols="4">
        <VTextField
          :maxlength="maxlength"
          :minlength="minlength"
          v-model="subAuxiliary.code"
          :disabled="subAuxiliary.id"
        />
      </VCol>
      <VCol :cols="subAuxiliary.company_id === auth.company.id ? 4 : 6">
        <VTextField v-model="subAuxiliary.name" :disabled="subAuxiliary.id" />
      </VCol>
      <VCol cols="2" v-if="(subAuxiliary.id) && (subAuxiliary.company_id === auth.company.id)">
        <VIcon @click="openModal(true,'editSubAuxiliary',subAuxiliary)"
          >mdi-floppy</VIcon
        >
        <VBtn
            icon
            size="x-small"
            color="error"
            variant="text"
            @click="deleteData(subAuxiliary.id,'/ledgerAccount-subAuxiliary-delete','subAuxiliary')"
          >
        <VIcon size="22" icon="tabler-trash"/>
        </VBtn>
      </VCol>
    </VRow>
    <VRow v-if="!subAuxiliary.id">
      <VBtn color="primary" class="ml-auto mt-2" @click="openModal(true,'create')"
        >+ {{ titleButton }}</VBtn
      >
    </VRow>
  </div>

  <!-- MODAL -->

  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ titleModal }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <label for="">Codigo</label>
                <VTextField
                  :maxlength="maxlength"
                  :minlength="minlength"
                  :prefix="codeInitial"
                  :error-messages="errors.code"
                  v-model="formulario.code"
                  @keypress="errors.code = ''"
                ></VTextField>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <label for="">Nombre</label>
                <VTextField
                  :error-messages="errors.name"
                  v-model="formulario.name"
                  @keypress="errors.name = ''"
                ></VTextField>
              </v-col>
            </v-row>
          </v-container>

          <!-- Caracteristicas transacional SUBCUENTA -->
          <VContainer v-if="account.id">
            <VRow>  
              <VCol cols="12" sm="12" ms="12" class="mt-3">
                <h2 for="">Característica transaccional</h2>               
                <VDivider></VDivider>
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12" sm="6" ms="6">
                <label for="">Relacionado con</label>
                <VTextField  disabled="" v-model="formulario.relatedTo"></VTextField>
              </VCol>
              <VCol cols="12" sm="6" ms="6">
                <label for="">Categoría</label>
                <VSelect :items="ledgerAccountCategory" v-model="formulario.ledgerAccountCategory_id" item-title="name" item-value="id"
                :error-messages="errors.ledgerAccountCategory_id" @change="errors.ledgerAccountCategory_id = ''"></VSelect>
              </VCol>
            </VRow>
            <VRow>           
              <VCol cols="12" sm="6" ms="6" class="mt-3">
                <label for="">Detallar saldos de cartera o proveedores</label>
                <VSelect :disabled="disabledSelect" :items="ledgerAccountBalance" v-model="formulario.ledgerAccountBalance_id" item-title="name" item-value="id"
                :error-messages="errors.ledgerAccountBalance_id" @change="errors.ledgerAccountBalance_id = ''"></VSelect>
              </VCol>
              <VCol cols="12" sm="6" ms="6" class="mt-3">
                <label for="">Cuenta de diferencia fiscal o ajustes NIIF</label>
                <VCheckbox v-model="formulario.tax_difference_account"></VCheckbox>                
              </VCol>
            </VRow>
            <VRow> 
              <VCol cols="12" sm="6" ms="6" class="mt-3">
                <label for="">Activa</label>
                <VCheckbox v-model="formulario.active"></VCheckbox>                
              </VCol>
            </VRow>
            <VRow>  
              <VCol cols="12" sm="12" ms="12" class=" mt-3">
                <span for="">* Todas las cuentas contables se manejan a nivel de tercero</span>               
              </VCol>
            </VRow>
          </VContainer>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="openModal(false)">
            Cerrar
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="editForm()">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

  <!-- FIN MODAL -->
</template>