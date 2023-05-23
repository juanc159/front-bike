<script lang="ts" setup type="module">
import PreloadInterno from "@/componentsGlobal/PreloadInterno.vue";
import { useLedgerAccountStore } from "@/stores/Admin/useLedgerAccountStore";
import { AuthenticationStore } from '@/stores/Authentication';

const auth = AuthenticationStore();
const storeLedgerAccount = useLedgerAccountStore();

const {
  ledgerAccounts,
  clase,
  formulario,
  typeClick,
  titleModal,
  titleButton,
  auxiliary,
  subAuxiliary,
  routeName,
  group,
  account,
  subAccount,
  codeInitial,
  maxlength,
  minlength,
  pathExcel,
  loading
} = storeToRefs(storeLedgerAccount);
const dataShow = (
  type: string,
  claseData: object,
  groupData?: object,
  accountData?: object,
  subAccountData?: object,
  auxiliaryData?: object,
  subAuxiliaryData?: object,
) => {
  typeClick.value = type;
  formulario.value.company_id = auth.company.id;
  if (type === "clase") {
    codeInitial.value = "";
    maxlength.value = 1;
    minlength.value = 2;
    codeInitial.value = claseData.code;
    clase.value = claseData;
    group.value = {};
    account.value = {};
    subAccount.value = {};
    auxiliary.value = {};
    subAuxiliary.value = {};
    formulario.value.ledgerAccountClass_id = clase.value.id;
    titleModal.value = "Crear Grupo";
    titleButton.value = "Crear Grupo";
    routeName.value = "/ledgerAccount-group-create";
  }
  if (type === "group") {
    for (const key in groupData) {
      group.value[key] = groupData[key];
    }
    account.value = {};
    subAccount.value = {};
    auxiliary.value = {};
    subAuxiliary.value = {};
    clase.value = claseData;
    codeInitial.value = "";
    maxlength.value = 1;
    minlength.value = 2;
    codeInitial.value = groupData.code;
    titleModal.value = "Crear Cuenta";
    titleButton.value = "Crear Cuenta";
    routeName.value = "/ledgerAccount-account-create";
    formulario.value.ledgerAccountGroup_id = clase.value.id;
  }
  if (type === "account") {
    for (const key in accountData) {
      account.value[key] = accountData[key];
    }
    subAccount.value = {};
    auxiliary.value = {};
    subAuxiliary.value = {};
    group.value = groupData;
    clase.value = claseData;
    codeInitial.value = "";
    maxlength.value = 2;
    minlength.value = 4;
    codeInitial.value = accountData.code;
    titleModal.value = "Crear SubCuenta";
    titleButton.value = "Crear SubCuenta";
    routeName.value = "/ledgerAccount-subAccount-create";
    formulario.value.ledgerAccountAccount_id = group.value.id;
  }
  if (type === "subAccount") {
    for (const key in subAccountData) {
      subAccount.value[key] = subAccountData[key];
    }
    auxiliary.value = {};
    subAuxiliary.value = {};
    group.value = groupData;
    clase.value = claseData;
    codeInitial.value = "";
    maxlength.value = 2;
    minlength.value = 4;
    codeInitial.value = subAccountData.code;
    titleModal.value = "Crear Auxiliar";
    titleButton.value = "Crear Auxiliar";
    routeName.value = "/ledgerAccount-auxiliary-create";
    formulario.value.ledgerAccountSubAccount_id = account.value.id;
  }
  if (type === "auxiliary") {
    for (const key in auxiliaryData) {
      auxiliary.value[key] = auxiliaryData[key];
    }
    subAuxiliary.value = {};
    group.value = groupData;
    clase.value = claseData;
    codeInitial.value = "";
    maxlength.value = 2;
    minlength.value = 4;
    codeInitial.value = auxiliaryData.code;
    titleModal.value = "Crear Sub Auxiliar";
    titleButton.value = "Crear Sub Auxiliar";
    routeName.value = "/ledgerAccount-subAuxiliary-create";
    formulario.value.ledgerAccountAuxiliarie_id = subAccount.value.id;
  }
  if (type === "subAuxiliary") {
    for (const key in subAuxiliaryData) {
      subAuxiliary.value[key] = subAuxiliaryData[key];
    }
    group.value = groupData;
    clase.value = claseData;
    codeInitial.value = "";
    maxlength.value = 2;
    minlength.value = 4;
    codeInitial.value = subAuxiliaryData.code;
    titleModal.value = "";
    titleButton.value = "";
    routeName.value = "";
    formulario.value.ledgerAccountAuxiliarie_id = subAccount.value.id;
  }
};

const buscadorCode = ref<string>("");
const buscadorName = ref<string>("");

//DESCARGAR EXCEL
const dowloadExcel = async () => {
  await storeLedgerAccount.excel({
    companyId: auth.company.id
  });
  window.open(pathExcel.value, '_blank');
}

onMounted(async () => {
  await storeLedgerAccount.fetchAll(auth.company.id);
});
</script>
<template>
  <div>
    <VRow>
      <VCol cols="5">
        <VTextField v-model="buscadorCode" prepend-inner-icon="mdi-magnify" pre label="Codigo" />
      </VCol>

      <VCol cols="6">
        <VTextField v-model="buscadorName" prepend-inner-icon="mdi-magnify" label="Nombre" />
      </VCol>
      <VCol cols="1">
        <VBtn mt-2 size="x-small" color="default" variant="text" title="Descargar" @click="dowloadExcel()">
          <VIcon size="30" icon="mdi-file-excel" @click="dowloadExcel()"></VIcon>
          Excel
        </VBtn>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12">
        <div v-show="loading">
          <PreloadInterno /> 
        </div>
        <v-list v-show="!loading">
          <!-- Lista de clase -->
          <v-list-group v-for="(item, i) in ledgerAccounts" :key="i">
            <template v-slot:activator="{ props }">
              <v-list-item @click="dataShow('clase', item)" v-bind="props"
                :title="item.code + ' - ' + item.name"></v-list-item>
            </template>
            <!-- Lista de grupo dentro de la clase -->
            <v-list-group v-for="(item2, i2) in item.group" :key="i2">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" :title="item2.code + ' - ' + item2.name"
                  @click="dataShow('group', item, item2)"></v-list-item>
              </template>
              <!-- Lista de cuenta dentro grupo -->
              <v-list-group v-for="(item3, i3) in item2.account" :key="i3">
                <template v-slot:activator="{ props }">
                  <v-list-item v-bind="props" :title="item3.code + ' - ' + item3.name"
                    @click="dataShow('account', item, item2, item3)"></v-list-item>
                </template>
                <!-- Lista de subcuenta dentro de cuenta -->
                <v-list-group v-for="(item4, i4) in item3.sub_account" :key="i4">
                  <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" :title="item4.code + ' - ' + item4.name"
                      @click="dataShow('subAccount', item, item2, item3, item4)"></v-list-item>
                  </template>
                  <!-- Lista de auxiliares dentro de sub cuenta -->
                  <v-list-group v-for="(item5, i5) in item4.auxiliaries" :key="i5">
                    <template v-slot:activator="{ props }">
                      <v-list-item v-bind="props" @click="dataShow('auxiliary', item, item2, item3, item4, item5)">
                        <VListItemTitle color="red">
                          <span :style="!item5.active ? 'color: red' : ''">{{ item5.code }}</span> - {{ item5.name }}
                        </VListItemTitle>
                      </v-list-item>
                    </template>
                    <!-- Lista de sub auxiliares dentro de auxiliar -->
                    <v-list-group v-for="(item6, i6) in item5.sub_auxiliaries" :key="i6">
                      <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props" @click="dataShow('subAuxiliary', item, item2, item3, item4, item5, item6)">
                          <VListItemTitle color="red">
                            <span :style="!item6.active ? 'color: red' : ''">{{ item6.code }}</span> - {{ item6.name }}
                          </VListItemTitle>
                        </v-list-item>
                      </template>
                    </v-list-group>
                  </v-list-group>
                </v-list-group>
              </v-list-group>
            </v-list-group>
          </v-list-group>
        </v-list>
      </VCol>
    </VRow>

  </div>
</template>
