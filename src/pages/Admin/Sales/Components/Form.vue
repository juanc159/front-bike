<script lang="ts" setup>
import { useCrudSaleStore } from '@/stores/Admin/useCrudSaleStore';
import { useAuthenticationStore } from '@/stores/useAuthenticationStore';
import { integerValidator, requiredValidator } from '@validators';
import Swal from 'sweetalert2';
import { VForm } from 'vuetify/components';

const props = defineProps({
  userId: {
    type: Number,
    default: null,
    required: false,
  },
})

const formValidation = ref<VForm>()
const formThirdValidation = ref<VForm>()
const authentication = useAuthenticationStore()
const saleStore = useCrudSaleStore()
const { formulario, inventories, thirds } = storeToRefs(saleStore)
const errors = ref<Array<string>>([])

const arrayValidation = ref<Array<string | boolean>>([])

const changeScreen = async (typeAction: string) => {
  saleStore.typeAction = typeAction
  arrayValidation.value = []
  errors.value = []
  await formValidation.value?.resetValidation()
  if (typeAction != 'back')
    saleStore.keyList++
}

const form = ref({
  id: null,
  amount: null,
})
const addThird = async () => {

  const validation = await formThirdValidation.value?.validate()
  if (validation?.valid) {
    const third = thirds.value.find(ele => ele.id == form.value.id)
    if (third) {
      formulario.value.thirds.push({
        id: third.id,
        name: third.name,
        amount: form.value.amount,
      })
      form.value = {
        id: null,
        amount: null
      }
    }
  }
}
const deleteThird = (id: number) => {
  formulario.value.thirds = formulario.value.thirds.filter(ele => ele.id != id)
}

const submitForm = async () => {
  formulario.value.company_id = authentication.company.id
  formulario.value.total = total.value
  formulario.value.utilities = utilities.value
  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    if (formulario.value.thirds.length == 0) {
      Swal.fire("Debe agregar almenos un tercero")
      return false
    }

    const data = await saleStore.fetchSave()
    if (data.status === 200) changeScreen('list')
    if (data.status === 422) errors.value = data.error // muestra error del back
  }
}

const purchaseValue = computed(() => {
  const inv = inventories.value.find(ele => ele.id == formulario.value.inventory_id)
  return inv?.purchaseValue ?? 0
});
const saleValue = computed(() => {
  const inv = inventories.value.find(ele => ele.id == formulario.value.inventory_id)
  return inv?.saleValue ?? 0
});

const total = computed(() => {
  return formulario.value.thirds.reduce((acumulador, item) => {
    return Number(acumulador) + Number(item.amount);
  }, 0);
});
const utilities = computed(() => {
  const inventory = inventories.value.find(ele => ele.id == formulario.value.inventory_id)
  return inventory?.saleValue - (Number(inventory?.purchaseValue ?? 0) + Number(total.value ?? 0))
});


onMounted(async () => {
  await saleStore.fetchDataForm()
  if (props.userId)
    await saleStore.fetchInfo(props.userId)
})
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <div class="col-md-6 d-flex justify-content-end">
          <VBtn color="secondary" @click="changeScreen('back')">
            Atras
          </VBtn>
        </div>
      </VCol>
    </VRow>
    <VForm ref="formValidation" lazy-validation>
      <VRow>
        <VCol cols="12" md="4">
          <VSelect clearable v-model="formulario.inventory_id" item-title="reference" item-value="id" :items="inventories"
            :rules="[requiredValidator]" :error-messages="errors.inventory_id" label="Inventario"
            @update:model-value="errors.inventory_id = ''" />
          <div>
            <b>Valor Compra: {{ purchaseValue }}</b> <br>
            <b>Valor Venta: {{ saleValue }}</b>
          </div>
        </VCol>
        <VCol cols="12" md="8">
          <VForm ref="formThirdValidation" lazy-validation>
            <VRow>
              <VCol cols="12" md="4">
                <VSelect :rules="[requiredValidator]" clearable v-model="form.id" item-title="name" item-value="id"
                  :items="thirds" label="Tercero" />
              </VCol>
              <VCol cols="12" md="4">
                <VTextField :rules="[requiredValidator, integerValidator]" v-model="form.amount" label="Monto" />
              </VCol>
              <VCol cols="12" md="4">
                <VBtn size="40" @click="addThird()" flat icon color="primary">
                  <VIcon icon="tabler-plus"></VIcon>
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" md="4">
          <VTextarea clearable v-model="formulario.description" :rules="[requiredValidator]"
            :error-messages="errors.description" label="Descripcion" @keypress="errors.description = ''" />
        </VCol>
        <VCol cols="12" md="6">
          <VTable class="text-no-wrap">
            <thead>
              <tr>
                <th>
                  Tercero
                </th>
                <th>
                  Monto
                </th>
                <th>
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in formulario.thirds" :key="index">
                <td>
                  {{ item.name }}
                </td>
                <td>
                  {{ item.amount }}
                </td>
                <td>
                  <VBtn @click="deleteThird(item.id)" flat icon color="error" size="40">
                    <VIcon icon="tabler-trash"></VIcon>
                  </VBtn>
                </td>
              </tr>
              <tr>
                <td><b> Total</b></td>
                <td>{{ total }}</td>
              </tr>
              <tr>
                <td><b> Utilidades</b></td>
                <td>{{ utilities }}</td>
              </tr>
            </tbody>
          </VTable>
        </VCol>

      </VRow>
      <VRow>
      </VRow>
      <VRow>
        <VCol cols="12 d-flex justify-content-center">
          <VBtn color="primary" @click="submitForm">
            Guardar
          </VBtn>
        </VCol>
      </VRow>
    </VForm>
  </div>
</template>
