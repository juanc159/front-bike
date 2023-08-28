<script lang="ts" setup>
import { useImageUpload } from '@/composables/useImageUpload';
import { useCrudPublicationStore } from '@/pages/Admin/Publication/Store/useCrudPublicationStore';
import { useAuthenticationStore } from '@/stores/useAuthenticationStore';
import { requiredValidator, validarInputNumerosMiles } from '@validators';
import { VForm } from 'vuetify/components';
import { VDataTable } from 'vuetify/labs/VDataTable';


const arrayBarter = ref([
  {
    value: 1,
    title: "Si",
  },
  {
    value: 0,
    title: "No",
  },
])
const props = defineProps({
  userId: {
    type: Number,
    default: null,
    required: false,
  },
})

const formValidation = ref<VForm>()
const authentication = useAuthenticationStore()
const publicationStore = useCrudPublicationStore()
const { formulario } = storeToRefs(publicationStore)
const errors = ref<Array<string>>([])

const arrayValidation = ref<Array<string | boolean>>([])

const changeScreen = async (typeAction: string) => {
  publicationStore.typeAction = typeAction
  arrayValidation.value = []
  errors.value = []
  await formValidation.value?.resetValidation()
  if (typeAction != 'back')
    publicationStore.keyList++
}


const submitForm = async () => {
  formulario.value.company_id = authentication.company.id
  formulario.value.price = String(formulario.value.price).replaceAll('.', '')
  formulario.value.offer = String(formulario.value.offer).replaceAll('.', '')


  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    const data = await publicationStore.fetchSave()
    if (data.status === 200) changeScreen('list')
    if (data.status === 422) errors.value = data.error // muestra error del back
  }
}

onMounted(async () => {
  if (props.userId)
    await publicationStore.fetchInfo(props.userId)
})

//files
const formFileValidation = ref<VForm>()

const headers = [
  // { title: 'Nombre', key: 'name' },
  { title: 'Orden', key: 'order' },
  { title: 'Imagen', key: 'path' },
  { title: 'Acciones', sortable: false, key: 'actions' }
]
const archive = ref(useImageUpload());
const arrayFiles = computed(() => {
  const data = formulario.value.files.filter(ele => ele.delete != "delete")
  return data.sort((a, b) => a.order - b.order);
})
const clearFormFile = () => {
  archive.value.clearData()
  archive.value.order = null
}
const addFile = async () => {
  const validation = await formFileValidation.value?.validate()
  if (validation?.valid) {
    formulario.value.files.push({
      file: archive.value.imageFile,
      // name: archive.value.name,
      order: archive.value.order,
      path: archive.value.imageUrl,
      delete: null,
      id: null,
    })
    clearFormFile()
  }
}
const deleteFile = (pos: number) => {
  if (formulario.value.files[pos].id) {
    formulario.value.files[pos].delete = "delete"
  } else {
    formulario.value.files.splice(pos, 1)
  }
}
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
        <VCol cols="12" md="3">
          <VTextField clearable v-model="formulario.name" :rules="[requiredValidator]" autocomplete="off"
            :error-messages="errors.name" label="Nombre" @keypress="errors.name = ''" />
        </VCol>
        <VCol cols="12" md="3">
          <VTextField clearable v-model="formulario.model" :rules="[requiredValidator]" autocomplete="off"
            :error-messages="errors.model" label="Modelo" @keypress="errors.model = ''" />
        </VCol>
        <VCol cols="12" md="3">
          <VTextField maxlength="4" clearable v-model="formulario.year" :rules="[requiredValidator]" autocomplete="off"
            :error-messages="errors.year" label="Año" @keypress="errors.year = ''" />
        </VCol>
        <VCol cols="12" md="3">
          <VTextField clearable v-model="formulario.price"
            @blur="formulario.price = validarInputNumerosMiles(formulario.price)" :rules="[requiredValidator]"
            autocomplete="off" :error-messages="errors.price" label="Precio" @keypress="errors.price = ''" />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" md="4">
          <VSelect :items="arrayBarter" clearable v-model="formulario.barter" :rules="[requiredValidator]"
            autocomplete="off" :error-messages="errors.barter" label="Se permite permutas" @keypress="errors.barter = ''">
          </VSelect>
        </VCol>
        <VCol cols="12" md="4">
          <VTextField clearable v-model="formulario.offer"
            @blur="formulario.offer = validarInputNumerosMiles(formulario.offer)" :rules="[requiredValidator]"
            autocomplete="off" :error-messages="errors.offer" label="Oferta" @keypress="errors.offer = ''" />
        </VCol>
        <VCol cols="12" md="4">
          <VTextField type="number" clearable v-model="formulario.days" :rules="[requiredValidator]" autocomplete="off"
            :error-messages="errors.days" label="Dias" @keypress="errors.days = ''" />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VTextarea clearable v-model="formulario.description" :rules="[requiredValidator]" autocomplete="off"
            :error-messages="errors.description" label="Descripción" @keypress="errors.description = ''" />
        </VCol>

      </VRow>
    </VForm>
    <VRow>
      <VCol cols="12" sm="6">
        <VRow>
          <VCol>
            <h2>Imagenes</h2>
          </VCol>
        </VRow>
        <VForm ref="formFileValidation" lazy-validation>
          <VRow>
            <VCol cols="12" sm="4">
              <VFileInput @change="archive.handleImageSelected" :rules="[requiredValidator]" :key="archive.key">
              </VFileInput>
            </VCol>
            <VCol cols="12" sm="4">
              <VTextField type="number" clearable v-model="archive.order" :rules="[requiredValidator]" label="Order" />
            </VCol>
            <VCol cols="12" sm="4">
              <VBtn color="primary" icon size="35" @click="addFile()">
                <VIcon icon="tabler-plus"></VIcon>
                <v-tooltip activator="parent" location="top">Agregar Archivo</v-tooltip>
              </VBtn>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <VDataTable :headers="headers" items-per-page="999" :items="arrayFiles">
                <template #item.path="{ item, index }">
                  <VImg :src="item.raw.path" cover max-width="200px" max-height="200px" class="my-2"></VImg>
                </template>
                <template #item.actions="{ item, index }">
                  <VBtn size="x-small" color="error" variant="text" icon @click="deleteFile(index)">
                    <VIcon size="22" icon="tabler-trash" />
                    <v-tooltip activator="parent" location="top">Borrar</v-tooltip>
                  </VBtn>
                </template>
                <template #bottom>
                </template>
              </VDataTable>
            </VCol>
          </VRow>
        </VForm>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12 d-flex justify-content-center">
        <VBtn color="primary" @click="submitForm">
          Guardar
        </VBtn>
      </VCol>
    </VRow>
  </div>
</template>
