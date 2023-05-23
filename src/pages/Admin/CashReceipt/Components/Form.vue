<script lang="ts" setup>
import { useCrudCashReceiptStore } from "@/stores/Admin/useCrudCashReceiptStore";
import {
  requiredValidator,soloNumeros
} from "@validators";
import type { VForm } from "vuetify/components";
import { useImageUpload } from "@/composables/useImageUpload";
import { AuthenticationStore } from "@/stores/Authentication";
import { useSelect2Infite } from "@/composables/useSelect2Infite";
const formValidation = ref<VForm>();
const authentication = AuthenticationStore();
const cashReceiptStore = useCrudCashReceiptStore();
const archive = ref(useImageUpload());
const {
  formulario,
  arrayPerformA,
  arrayCurrencies,
  customers_arrayInfo,
  customers_countLinks,
  loading,
  arrayAuxSubAux,
  auxSubAux_countLinks,
  arrayArchives,
  formArchive,
  errorsArrayArchive,
  arrayAdvanced,
  arrayAuxSubAuxAvanced,
  auxSubAuxAvanced_countLinks,
  cashReceiptConfiguration_arrayInfo,
  cashReceiptConfiguration_countLinks,
} = storeToRefs(cashReceiptStore);
const errors = ref<Array<string>>([]);
const photo = ref(useImageUpload());

const arrayValidation = ref<Array<string | boolean>>([]);
const changeScreen = async (typeAction: string) => {
  cashReceiptStore.clearFormulario();
  cashReceiptStore.clearFormArchive();
  cashReceiptStore.typeAction = typeAction;
  arrayValidation.value = [];
  errors.value = [];
  photo.value.clearData();
  await formValidation.value?.resetValidation();
  if (typeAction != "back") cashReceiptStore.keyList++;
};

const submitForm = async () => {
  formulario.value.company_id = authentication.company.id;
  const validation = await formValidation.value?.validate();
  if (validation?.valid) {
    const data = await cashReceiptStore.fetchSave();
    if (data.status === 200) changeScreen("list");
    if (data.status === 422) errors.value = data.error; //muestra error del back
  }
};

//AGREGAR ARCHIVO
const addArchive = () => {
  formArchive.value.archive = archive.value.imageFile;
  console.log("FORARCHIVE", formArchive.value);
  if (!formArchive.value.name || !archive.value.imageFile) {
    if (!formArchive.value.name)
      errorsArrayArchive.value.name = "Este campo es obligatorio";
    if (!formArchive.value.archive)
      errorsArrayArchive.value.archive = "Este campo es obligatorio";
    return false;
  }
  cashReceiptStore.addArrayArchives();
  archive.value.key++;
};

//ADD DESCRIPCION DEL ARRAY
const changeDescription = (id: number, item: object) => {
  const val = selectInfinite2.dataNueva.value.find((e) => e.id === id);
  if (val) item.description = val.name;
};

//TOTAL DEBITO
const total_debit = computed(() => {
  let totalDebit = 0;
  if (arrayAdvanced.value.length > 0) {
    arrayAdvanced.value.forEach((ele) => {
      const value = Number(ele.debit ?? 0);
      totalDebit += value;
    }, 0);
    return totalDebit ?? 0;
  }
});
//TOTAL CREDITO
const total_credit = computed(() => {
  let totalCredit = 0;
  if (arrayAdvanced.value.length > 0) {
    arrayAdvanced.value.forEach((ele) => {
      const value = Number(ele.credit ?? 0);
      totalCredit += value;
    }, 0);
    return totalCredit ?? 0;
  }
});
//DIFERENCIA TOTAL CREDITO Y TOTAL DEBITO
const difference_credit_debit = computed(() => {
  let differenceCreditDebit = 0;
  if (!total_credit.value && total_debit.value)
    differenceCreditDebit += total_debit.value;
  if (!total_debit.value && total_credit.value)
    differenceCreditDebit += total_credit.value;
  if (total_credit.value && total_debit.value) {
    if (total_credit.value > total_debit.value)
      differenceCreditDebit =
        (total_credit.value ?? 0) - (total_debit.value ?? 0);
    if (total_credit.value < total_debit.value)
      differenceCreditDebit =
        (total_debit.value ?? 0) - (total_credit.value ?? 0);
  }
  formulario.value.total_debit = total_debit.value;
  formulario.value.total_credit = total_credit.value;
  formulario.value.difference_credit_debit = differenceCreditDebit;
  return differenceCreditDebit;
});

const changeCkeckCashRecipt = () =>{
  if(formulario.value.perform_id == 1 && formulario.value.received_value) formulario.value.ckeckCashRecipt = 1;
  else formulario.value.ckeckCashRecipt = 0;
}

const changeSelectAuxSubAux = (value: number, obj: object) => {
  let ledgerAccountsDis = selectInfinite1.dataNueva.value.find(ele => ele.id === value);
  if (ledgerAccountsDis) {
    obj.auxSubAux_table = ledgerAccountsDis.table;
    obj.auxSubAux_id = ledgerAccountsDis.id;
  }
}

const selectInfinite = useSelect2Infite(
  cashReceiptStore.fetchCustomerOfThirdList,
  customers_arrayInfo,
  {
    company_id: authentication.company.id,
  }
);

const selectInfinite1 = useSelect2Infite(
  cashReceiptStore.fetchLedgerAccountAuxiliaryList,
  arrayAuxSubAux,
  {
    company_id: authentication.company.id,
  }
);
const selectInfinite2 = useSelect2Infite(
  cashReceiptStore.fetchLedgerAccountAuxiliaryAvancedList,
  arrayAuxSubAuxAvanced,
  {
    company_id: authentication.company.id,
  }
);
const selectInfinite3 = useSelect2Infite(
  cashReceiptStore.cashReceiptConfigurationList,
  cashReceiptConfiguration_arrayInfo,
  {
    company_id: authentication.company.id,
  }
);

onMounted(async () => {
  await cashReceiptStore.fetchDataForm();
  selectInfinite.dataNueva.value = customers_arrayInfo.value; //lista clientes(tabla->third)
  selectInfinite.totalLinks.value = customers_countLinks.value; //Paginado cliente(tabla->third)

  selectInfinite1.dataNueva.value = arrayAuxSubAux.value; //lista
  selectInfinite1.totalLinks.value = auxSubAux_countLinks.value; //Paginado

  selectInfinite2.dataNueva.value = arrayAuxSubAuxAvanced.value; //lista para el arrayAvanced
  selectInfinite2.totalLinks.value = auxSubAuxAvanced_countLinks.value; //Paginado para el arrayAvanced
  selectInfinite3.dataNueva.value = cashReceiptConfiguration_arrayInfo.value; //lista para el tipo
  selectInfinite3.totalLinks.value = cashReceiptConfiguration_countLinks.value; //Paginado para el tipo
});
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12" class="">
        <div class="col-md-6"></div>
        <div class="col-md-6 d-flex justify-content-end">
          <VBtn color="secondary" @click="changeScreen('list')"> Atras </VBtn>
        </div>
      </VCol>
    </VRow>
    <VForm ref="formValidation" lazy-validation>
      <VRow>
        <VCol cols="6">
          <VSelect
            item-title="title"
            item-value="id"
            label="Tipo"
            v-model="formulario.crConfigurations_id"
            :items="selectInfinite3.dataNueva.value"
            :rules="[requiredValidator]"
            :error-messages="errors.crConfigurations_id"
            @update:modelValue="errors.crConfigurations_id = ''"
          >
            <template v-slot:prepend-item>
              <VTextField
                placeholder="Buscar..."
                class="mb-2"
                v-model="selectInfinite3.searchQuery.value"
              />
              <v-divider></v-divider>
            </template>
            <template v-slot:append-item>
              <v-divider> </v-divider>
              <div class="d-flex justify-content-center aling-items-center">
                <v-progress-circular
                  v-show="loading"
                  size="24"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </div>
              <div
                v-if="!loading"
                class="d-flex justify-content-between aling-items-center p-2"
              >
                <RouterLink
                  :to="{ name: 'Admin-CashReceiptConfiguration-Index' }"
                  class="app-logo d-flex align-center gap-x-3 app-title-wrapper"
                >
                  <VBtn color="success">Crear Registro</VBtn>
                </RouterLink>
                <div>
                  <VBtn
                    class="mt-2"
                    :disabled="selectInfinite3.page.value <= 1"
                    @click="selectInfinite3.prev()"
                    color="success"
                  >
                    <VIcon icon="mdi-chevron-left"></VIcon>
                  </VBtn>
                  <VBtn
                    class="mt-2"
                    :disabled="
                      selectInfinite3.page.value >=
                      selectInfinite3.totalLinks.value
                    "
                    @click="selectInfinite3.next()"
                    color="success"
                  >
                    <VIcon icon="mdi-chevron-right"></VIcon>
                  </VBtn>
                </div>
              </div>
            </template>
          </VSelect>
        </VCol>
        <VCol cols="6">
          <VTextField
            :rules="[requiredValidator]"
            v-model="formulario.number"
            
            autocomplete="off"
            :error-messages="errors.number"
            label="Número"
            @keypress="errors.number = ''"
          />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="6">
          <VSelect
            item-title="full_name"
            item-value="id"
            label="Cliente"
            v-model="formulario.customer_id"
            :items="selectInfinite.dataNueva.value"
            :rules="[requiredValidator]"
            :error-messages="errors.customer_id"
            @update:modelValue="errors.customer_id = ''"
          >
            <template v-slot:prepend-item>
              <VTextField
                placeholder="Buscar..."
                class="mb-2"
                v-model="selectInfinite.searchQuery.value"
              />
              <v-divider></v-divider>
            </template>
            <template v-slot:append-item>
              <v-divider> </v-divider>
              <div class="d-flex justify-content-center aling-items-center">
                <v-progress-circular
                  v-show="loading"
                  size="24"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </div>
              <div
                v-if="!loading"
                class="d-flex justify-content-between aling-items-center p-2"
              >
                <RouterLink
                  :to="{ name: 'Admin-Third-Index' }"
                  class="app-logo d-flex align-center gap-x-3 app-title-wrapper"
                >
                  <VBtn color="success">Crear Registro</VBtn>
                </RouterLink>
                <div>
                  <VBtn
                    class="mt-2"
                    :disabled="selectInfinite.page.value <= 1"
                    @click="selectInfinite.prev()"
                    color="success"
                  >
                    <VIcon icon="mdi-chevron-left"></VIcon>
                  </VBtn>
                  <VBtn
                    class="mt-2"
                    :disabled="
                      selectInfinite.page.value >=
                      selectInfinite.totalLinks.value
                    "
                    @click="selectInfinite.next()"
                    color="success"
                  >
                    <VIcon icon="mdi-chevron-right"></VIcon>
                  </VBtn>
                </div>
              </div>
            </template>
          </VSelect>
        </VCol>
        <VCol cols="6">
          <VTextField
            type="date"
            :rules="[requiredValidator]"
            v-model="formulario.date_elaboration"
            autocomplete="off"
            :error-messages="errors.date_elaboration"
            label="Fecha de elaboración"
            @change="errors.date_elaboration = ''"
          />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="6">
          <VSelect
            :rules="[requiredValidator]"
            :items="arrayPerformA"
            v-model="formulario.perform_id"
            item-title="name"
            item-value="id"
            label="Realizar un"
            :error-messages="errors.perform_id"
            @update:model-value="errors.perform_id = '';changeCkeckCashRecipt()"
          ></VSelect>
        </VCol>
        <VCol cols="6">
          <VSelect
            item-title="name"
            item-value="id"
            label="Donde ingresa el dinero"
            v-model="formulario.auxSubAux_id"
            :items="selectInfinite1.dataNueva.value"
            :rules="[requiredValidator]"
            :error-messages="errors.auxSubAux_id"
            @update:modelValue="errors.auxSubAux_id = '';changeSelectAuxSubAux(formulario.auxSubAux_id,formulario)"
          >
            <template v-slot:prepend-item>
              <VTextField
                placeholder="Buscar..."
                class="mb-2"
                v-model="selectInfinite1.searchQuery.value"
              />
              <v-divider></v-divider>
            </template>
            <template v-slot:append-item>
              <v-divider> </v-divider>
              <div class="d-flex justify-content-center aling-items-center">
                <v-progress-circular
                  v-show="loading"
                  size="24"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </div>
              <div
                v-if="!loading"
                class="d-flex justify-content-between aling-items-center p-2"
              >
                <RouterLink
                  :to="{ name: 'Admin-Third-Index' }"
                  class="app-logo d-flex align-center gap-x-3 app-title-wrapper"
                >
                  <VBtn color="success">Crear Registro</VBtn>
                </RouterLink>
                <div>
                  <VBtn
                    class="mt-2"
                    :disabled="selectInfinite1.page.value <= 1"
                    @click="selectInfinite1.prev()"
                    color="success"
                  >
                    <VIcon icon="mdi-chevron-left"></VIcon>
                  </VBtn>
                  <VBtn
                    class="mt-2"
                    :disabled="
                      selectInfinite1.page.value >=
                      selectInfinite1.totalLinks.value
                    "
                    @click="selectInfinite1.next()"
                    color="success"
                  >
                    <VIcon icon="mdi-chevron-right"></VIcon>
                  </VBtn>
                </div>
              </div>
            </template>
          </VSelect>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="6">
          <VSelect
            :rules="[requiredValidator]"
            :items="arrayCurrencies"
            v-model="formulario.currencie_id"
            item-title="name"
            item-value="id"
            label="Moneda"
            :error-messages="errors.currencie_id"
            @update:model-value="errors.currencie_id = ''"
          ></VSelect>
        </VCol>
        <VCol cols="6">
          <VTextField
            maxlength="15"
            :rules="[requiredValidator]"
            v-model="formulario.received_value"
            :error-messages="errors.received_value"
            label="Valor recibido"
            placeholder="0.00"
            @keypress="errors.received_value = '';soloNumeros($event)"
            @keyup="changeCkeckCashRecipt()"
          />
        </VCol>
      </VRow>
      <VRow v-if="formulario.perform_id == 1">
        <VCol cols="12">
          <v-table class="table-style">
            <thead>
              <tr>
                <th class="celdas">
                  <VCheckbox v-model="formulario.ckeckCashRecipt" :true-value="1" :false-value="0"></VCheckbox>
                </th>
                <th class="celdas">Vencimiento</th>
                <th class="celdas">Couta</th>
                <th class="celdas">Saldo</th>
                <th class="celdas"></th>
              </tr>
            </thead>
          </v-table>
        </VCol>
      </VRow>
      <VRow v-if="formulario.perform_id == 1 && formulario.received_value">
        <VCol cols="8">
          <span class="text-center text-success">Se creará un anticipo al tercero por valor de</span>
        </VCol>
        <VCol cols="4" class="text-right">
          <span class="text-left text-success">{{ formulario.received_value }}</span>
        </VCol>
      </VRow>
      <VRow v-if="formulario.perform_id == 2 && formulario.received_value">
        <VCol cols="12">
          <div class="d-flex justify-content-center">
            <span class="text-center text-success"
              >Se creará un anticipo al tercero por valor de
              {{ formulario.received_value }}</span
            >
          </div>
        </VCol>
      </VRow>
      <VRow v-if="formulario.perform_id == 3">
        <VCol cols="12">
          <v-table>
            <thead>
              <tr>
                <th>#</th>
                <th>Cuenta contable</th>
                <th>Detalle</th>
                <th>Descripción</th>
                <th>Débito</th>
                <th>Crédito</th>
                <th>
                  <VBtn
                    color="primary"
                    @click="cashReceiptStore.addArrayAdvanced()"
                    >+</VBtn
                  >
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in arrayAdvanced" :key="index" v-show="item.delete != 'delete'">
                <td>{{ index + 1 }}</td>
                <td>
                  <VSelect
                    item-title="nameCode"
                    item-value="id"
                    v-model="item.ledgerAccount_id"
                    :items="selectInfinite2.dataNueva.value"
                    :rules="[requiredValidator]"
                    :error-messages="errors.ledgerAccount_id"
                    @update:modelValue="
                      errors.ledgerAccount_id = '';
                      changeDescription($event, item);
                    "
                  >
                    <template v-slot:prepend-item>
                      <VTextField
                        placeholder="Buscar..."
                        class="mb-2"
                        v-model="selectInfinite2.searchQuery.value"
                      />
                      <v-divider></v-divider>
                    </template>
                    <template v-slot:append-item>
                      <v-divider> </v-divider>
                      <div
                        class="d-flex justify-content-center aling-items-center"
                      >
                        <v-progress-circular
                          v-show="loading"
                          size="24"
                          color="primary"
                          indeterminate
                        ></v-progress-circular>
                      </div>
                      <div
                        v-if="!loading"
                        class="d-flex justify-content-between aling-items-center p-2"
                      >
                        <RouterLink
                          :to="{ name: 'Admin-Third-Index' }"
                          class="app-logo d-flex align-center gap-x-3 app-title-wrapper"
                        >
                          <VBtn color="success">Crear Registro</VBtn>
                        </RouterLink>
                        <div>
                          <VBtn
                            class="mt-2"
                            :disabled="selectInfinite2.page.value <= 1"
                            @click="selectInfinite2.prev()"
                            color="success"
                          >
                            <VIcon icon="mdi-chevron-left"></VIcon>
                          </VBtn>
                          <VBtn
                            class="mt-2"
                            :disabled="
                              selectInfinite2.page.value >=
                              selectInfinite2.totalLinks.value
                            "
                            @click="selectInfinite2.next()"
                            color="success"
                          >
                            <VIcon icon="mdi-chevron-right"></VIcon>
                          </VBtn>
                        </div>
                      </div>
                    </template>
                  </VSelect>
                </td>
                <td>
                  <VTextField disabled clearable v-model="item.detail" />
                </td>
                <td>
                  <VTextField
                    :disabled="!item.ledgerAccount_id"
                    clearable
                    :rules="[requiredValidator]"
                    v-model="item.description"
                  />
                </td>
                <td :style="{ width: '15%' }">
                  <VTextField
                    :disabled="!item.ledgerAccount_id"
                    clearable                    
                    v-model="item.debit"
                    @keypress="item.credit = '';soloNumeros($event)"
                    placeholder="0.00"
                  />
                </td>
                <td :style="{ width: '15%' }">
                  <VTextField
                    :disabled="!item.ledgerAccount_id"
                    clearable                    
                    v-model="item.credit"
                    @keypress="item.debit = '';soloNumeros($event)"
                    placeholder="0.00"
                  />
                </td>
                <td :style="{ width: '5%' }">
                  <VBtn
                    @click="cashReceiptStore.deleteArrayAdvanced(index, item)"
                    icon="tabler-trash"
                    variant="text"
                    color="error"
                  />
                </td>
              </tr>
            </tbody>
          </v-table>
        </VCol>
      </VRow>
      <VRow v-if="formulario.perform_id == 3">
        <VCol cols="5"></VCol>
        <VCol cols="2">Total:</VCol>
        <VCol cols="2">{{ total_debit }}</VCol>
        <VCol cols="2">{{ total_credit }}</VCol>
        <VCol cols="1"></VCol>
      </VRow>
      <VRow v-if="formulario.perform_id == 3">
        <VCol cols="5"></VCol>
        <VCol cols="2">Diferencia:</VCol>
        <VCol cols="3">{{ difference_credit_debit }}</VCol>
        <VCol cols="1"></VCol>
        <VCol cols="1"></VCol>
      </VRow>
      <VRow>
        <VCol cols="6">
          <VFileInput
            id="archive"
            show-size
            counter
            label="Archivo"
            @change="archive.handleImageSelected"
            @click="errorsArrayArchive.archive = ''"
            :key="archive.key"
            :error-messages="errorsArrayArchive.archive"
          ></VFileInput>
        </VCol>
        <VCol cols="4">
          <VTextField
            label="Nombre del archivo"
            v-model="formArchive.name"
            @keypress="errorsArrayArchive.name = ''"
            :error-messages="errorsArrayArchive.name"
          />
        </VCol>
        <VCol cols="2">
          <VBtn color="primary" @click="addArchive()">+ Agregar</VBtn>
        </VCol>
      </VRow>
      <VRow v-if="arrayArchives.length > 0">
        <VCol cols="12">
          <v-table>
            <thead>
              <tr>
                <th>Archivo</th>
                <th>Nombre</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in arrayArchives"
                :key="index"
                v-show="item.delete != 'delete'"
              >
                <td v-if="!item.id">{{ item.archive.name}}</td>
                <td v-if="item.id">
                  <a :href="item.archive">Descargar</a>
                </td>
                <td>{{ item.name }}</td>
                <td>
                  <VBtn
                    size="x-small"
                    color="error"
                    variant="text"
                    @click="cashReceiptStore.deleteArrayArchives(index, item)"
                  >
                    <VIcon size="22" icon="tabler-trash" />
                  </VBtn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VTextarea
            :rules="[requiredValidator]"
            label="Observaciones"
            v-model="formulario.observation"
          />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12 d-flex justify-content-center">
          <VBtn color="primary" @click="submitForm()">Guardar</VBtn>
        </VCol>
      </VRow>
    </VForm>
  </div>
</template>
