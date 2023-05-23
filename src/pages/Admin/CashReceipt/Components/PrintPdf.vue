<script lang="ts" setup>
import { AuthenticationStore } from "@/stores/Authentication";
import { useCrudCashReceiptStore } from "@/stores/Admin/useCrudCashReceiptStore";
import { useImageUpload } from '@/composables/useImageUpload';
const cashReceiptStore = useCrudCashReceiptStore();
const {
  formularioPdf,
  third_customer,
} = storeToRefs(cashReceiptStore);
const authentication = AuthenticationStore();
const archive = ref(useImageUpload());
const changeScreen = async (typeAction: string) => {
  cashReceiptStore.typeAction = typeAction;
};

const submitPrintPdf = (type:string) =>{
    formularioPdf.value.attachFile = archive.value.imageFile;
    if(type === 'email') cashReceiptStore.sendMailPdf();
    if(type === 'print') cashReceiptStore.printPdf(formularioPdf.value.id);
}
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
    <VRow justify="center" align="center">
      <VCol cols="8">
        <VCard class="mx-auto mb-3">
          <VContainer>
            <VRow justify="center" align="center">
              <VCol cols="auto">
                <v-btn density="compact" @click="submitPrintPdf('email')">Enviar por email</v-btn>
              </VCol>
              <VCol cols="auto">
                <v-btn density="compact" @click="submitPrintPdf('print')">Descargar e imprimir</v-btn>
              </VCol>
              <VCol cols="2">
                <VSelect
                  :items="['Editar', 'Anular', 'Borrar','Ver Contabilización']"
                  label="Mas"
                ></VSelect>
              </VCol>
            </VRow>
          </VContainer>
        </VCard>
      </VCol>
    </VRow>

    <VRow justify="center" align="center">
      <VCol cols="10">
        <VCard>
          <div class="d-flex flex-no-wrap justify-space-between">
            <VCol cols="4">
              <v-avatar class="ma-3" size="125" rounded="0">
                <v-img :src="authentication.company.logo"></v-img>
              </v-avatar>
            </VCol>
            <VCol cols="6">
              <div>
                <v-card-title class="text-h5">
                  {{ authentication.company.name }}
                </v-card-title>
                <v-card-subtitle
                  >NIT {{ authentication.company.nit }}</v-card-subtitle
                >
                <v-card-subtitle
                  >CL {{ authentication.company.phone }}</v-card-subtitle
                >
                <v-card-subtitle
                  >TEL
                  {{
                    authentication.company.phoneLegalRepresentative
                  }}</v-card-subtitle
                >
                <v-card-subtitle>Bogotá - Colombia</v-card-subtitle>
              </div>
            </VCol>
            <VCol cols="2">
              <div class="ma-3">Recibo N° {{ formularioPdf.number }}</div>
            </VCol>
          </div>

          <div class="d-flex flex-no-wrap justify-space-between">
            <VCol cols="8">
              <VTable>
                <tr>
                  <th class="font-color">Recibimos de</th>
                  <td colspan="6">{{ third_customer.name }} {{ third_customer.last_name }}</td>
                </tr>
                <tr>
                  <th class="font-color">NIT</th>
                  <td colspan="3">{{ third_customer.identifications }}</td>
                  <th class="font-color">Teléfono</th>
                  <td colspan="3">{{ third_customer.phone_fac }}</td>
                </tr>
                <tr>
                  <th class="font-color">Dirección</th>
                  <td colspan="3">{{ third_customer.address }}</td>
                  <th class="font-color">Ciudad</th>
                  <td colspan="3">{{ third_customer.city?.name }}</td>
                </tr>
              </VTable>
            </VCol>

            <VCol cols="4">
              <table>
                <tr>
                  <th class="font-color">Fecha de recibo</th>
                  <th class="font-color">Forma de pago</th>
                </tr>
                <tr>
                  <td>{{ formularioPdf.date_elaboration }}</td>
                  <td>{{ formularioPdf.auxSubAux_name }}</td>
                </tr>
              </table>
            </VCol>
          </div>

          <div class="d-flex flex-no-wrap justify-space-between">
            <VCol cols="12">
              <VTable>
                <tr>
                  <th colspan="2" class="font-color">El valor de</th>
                  <td colspan="6">{{ formularioPdf.numberName }}</td>
                  <td colspan="4">{{ formularioPdf.received_value }}</td>
                </tr>
              </VTable>
            </VCol>
          </div>

          <div class="d-flex flex-no-wrap justify-space-between">
            <VCol cols="12">
              <table>
                <thead>
                  <tr>
                    <th colspan="10" class="font-color">Concepto</th>
                    <th colspan="2" class="font-color">Valor</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td colspan="2">15/07</td>
                    <td colspan="2">$200,00</td>
                    <td colspan="2">$50,00</td>
                    <td colspan="3">$0</td>
                    <td colspan="2">{{ formularioPdf.received_value }}</td>
                  </tr>
                </tbody>

                <tfoot>
                  <tr>
                    <th colspan="10" class="font-color">Total COP</th>
                    <td colspan="2">{{ formularioPdf.received_value }}</td>
                  </tr>
                </tfoot>
              </table>
            </VCol>
          </div>
          <div class="d-flex flex-no-wrap justify-space-between">
            <VCol cols="12">
              <span>Observaciones: {{ formularioPdf.observation }}</span>
            </VCol>
          </div>
          <div class="d-flex flex-no-wrap justify-space-between">
            <VCol cols="6">
              <span class="underline-signature"> Firma elaborado </span>
            </VCol>
            <VCol cols="6">
              <span class="underline-signature"> Firma recibido </span>
            </VCol>
          </div>
          <div class="d-flex flex-no-wrap justify-space-between">
            <VCol cols="6">
              <VCard>
                <v-card-title class="text-h5">
                  INFORMACIÓN GENERAL 
                </v-card-title>

                <v-card-subtitle>
                    Cliente: {{ third_customer.name }} {{ third_customer.last_name }}
                </v-card-subtitle>
                <v-card-subtitle>
                    Contacto: 
                </v-card-subtitle>
              </VCard>
            </VCol>
            <VCol cols="6">
              <VCard>
                <v-card-title class="text-h5">
                  ANEXOS 
                </v-card-title>
                <VFileInput label="Adjuntar archivo" @change="archive.handleImageSelected"></VFileInput>
              </VCard>
            </VCol>
          </div>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
<style scoped lang="scss">
table {
  border-collapse: collapse; /* combina bordes contiguos en un único borde */
  width: 100%; /* ancho de la tabla */
}
th,
td {
  border: 1px solid rgb(133, 132, 132); /* bordes de 1px con línea sólida negra */
  padding: 8px; /* espacio de relleno interno */
  text-align: left; /* alineación del texto */
}
th{
    color: black;
}
.font {
  &-color {
    background-color: #e4e4e4 !important;
  }
}

.underline-signature {
  border-top: 1px dashed;
  display: block;
  text-align: center;
}
</style>
