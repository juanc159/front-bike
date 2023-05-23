<script lang="ts" setup>
import Swal from 'sweetalert2';
import PreloadInterno from "@/componentsGlobal/PreloadInterno.vue";
import { useCrudProductStore } from "@/stores/Admin/useCrudProductStore";
import { AuthenticationStore } from '@/stores/Authentication'; 
import ModalImport from '@/pages/Admin/Product/Components/ModalImport.vue';

const authentication = AuthenticationStore();
const productStore = useCrudProductStore();
const { show, currentPage, products, totalPage, lastPage, totalData, loading, pathExcel, searchProduct, typeProducts } =
  storeToRefs(productStore);
const rowPerPage = ref<number>(10);
const searchQuery = ref<string>("");

//Accion cambio de pantalla
const changeScreen = async (screen: string, thirdId: number | null = null) => {
  productStore.clearFormulario();
  productStore.typeAction = screen;
  if (thirdId) {
    await productStore.fetchInfoProduct(thirdId)
  }
};

const fetchProducts = async () => {
  await productStore.fetchAll({
    company_id: authentication.company.id,
    perPage: rowPerPage.value,
    page: currentPage.value,
    searchQuery: searchQuery.value,
    state: searchProduct.value.state,
    name: searchProduct.value.name,
    typeProduct_id: searchProduct.value.typeProduct_id,
  });
};

watch(currentPage, async () => {
  if (currentPage.value > totalPage.value) currentPage.value = totalPage.value;
});
watch(rowPerPage, async () => {
  currentPage.value = 1
})
watchArray([currentPage, searchQuery, rowPerPage], async () => {
  await fetchProducts();
});
const paginationData = computed(() => {
  const firstIndex = products.value.length
    ? (currentPage.value - 1) * totalPage.value + 1
    : 0;
  const lastIndex =
    products.value.length + (currentPage.value - 1) * totalPage.value;

  return `Mostrando ${firstIndex} a ${lastIndex} de ${totalData.value} registros`;
});

// DESCARGAR EXCEL
const dowloadExcel = async () => {
  await productStore.excel({
    company_id: authentication.company.id,
    searchQuery: searchQuery.value,
  }).then(resp => {
    window.open(pathExcel.value, '_blank');
  });
}

//LIMPIA VAMPOS A BUSCAR
const clearSearchProduct = () => {
  searchProduct.value = {};
  fetchProducts();
}

const deleteData = async (id: number) => {
  Swal.fire({
    title: '¿Desea eliminar el registro?',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Si',
    denyButtonText: 'No',
  }).then(async result => {
    if (result.isConfirmed) {
      await productStore.fetchDelete(id)
      await fetchProducts()
    }
    else if (result.isDenied) {
    }
  })
}
//Accion cambio de estado
const changeState = async (object: object, state: number) => {
  productStore.changeState(object, state);
}

const dialog = ref<boolean>(false)
onMounted(async () => {
  await fetchProducts();
});
</script>
<template>
  <div>
    <!-- INICIO CARD BUSQUEDA --> 
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardActions>
            <VBtn @click="show = !show" color="orange-lighten-2" variant="text">
              Criterios de búsqueda
            </VBtn>
            <VSpacer></VSpacer>
            <VBtn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></VBtn>
          </VCardActions>

          <VExpandTransition>
            <div v-show="show">
              <VDivider></VDivider>
              <VCardText>
                <VRow>
                  <VCol cols="12" md="4">
                    <VSelect clearable :items="[{ id: 1, name: 'Activo' }, { id: 0, name: 'Inactivo' }]" item-title="name"
                      v-model="searchProduct.state" item-value="id" label="Estado"></VSelect>
                  </VCol>
                  <VCol cols="12" md="4">
                    <VTextField clearable label="Producto" v-model="searchProduct.name" />
                  </VCol>
                  <VCol cols="12" md="4">
                    <VSelect clearable :items="typeProducts" item-title="name" v-model="searchProduct.typeProduct_id" item-value="id"
                      label="Tipo"></VSelect>
                  </VCol>
                </VRow>
                <VRow>
                  <VCol cols="12 d-flex justify-content-center">
                    <VBtn color="primary" class="mr-2" @click="fetchProducts">Buscar</VBtn>
                    <VBtn color="primary" @click="clearSearchProduct">Limpiar Filtros</VBtn>
                  </VCol>
                </VRow>
              </VCardText>
            </div>
          </VExpandTransition>
        </VCard>
      </VCol>
    </VRow>
    <!-- FIN CARD -->
    <VContainer fluid class="d-flex flex-wrap py-4 gap-4">
      <div class="me-3" style="width: 80px">
        <VSelect v-model="rowPerPage" density="compact" variant="outlined" :items="[10, 20, 30, 50]" />
      </div>
      <div class="me-3" style="width: 80px">
        <VBtn mt-2 size="x-small" color="default" variant="text" title="Descargar" @click="dowloadExcel()">
          <VIcon size="30" icon="mdi-file-excel"></VIcon>
          Excel
        </VBtn>
      </div>
      <div class="me-3" style="width: 80px">
        <ModalImport></ModalImport>
        
      </div>

      <VSpacer />

      <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
        <div style="width: 10rem">
          <VTextField v-model="searchQuery" placeholder="Buscar" density="compact" />
        </div>
        <VBtn color="primary" @click="changeScreen('form')"> Crear </VBtn>
      </div>
    </VContainer>

    <VDivider />

    <VTable class="text-no-wrap">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Tipo</th>
          <th scope="col">Referencia fábrica</th>
          <th scope="col">Impuesto cargo</th>
          <th scope="col">Descripción larga</th>
          <th scope="col">Estado</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-show="loading">
          <td colspan="9">
            <PreloadInterno />
          </td>
        </tr>
        <tr v-show="!loading" v-for="(item, index) in products" :key="index" style="height: 3.75rem">
          <td>
            <span> {{ item.name }} </span>
          </td>
          <td>
            <span> {{ item.type_name }} </span>
          </td>
          <td>
            <span> {{ item.factoryReference }} </span>
          </td>
          <td>
            <span> {{ item.taxCharge_name }} </span>
          </td>
          <td>
            <span> {{ item.description }} </span>
          </td>

          <td>
            <VSwitch v-model="item.state" color="success" inset :value="item.state" :true-value="1" :false-value="0"
              hide-details @click="changeState(item, item.state)"></VSwitch>
          </td>
          <td class="text-center" style="width: 5rem">
            <VBtn icon size="x-small" color="error" variant="text" @click="deleteData(item.id)">
              <VIcon size="22" icon="tabler-trash" />
            </VBtn>

            <VBtn icon size="x-small" color="default" variant="text" @click="changeScreen('form', item.id)">
              <VIcon size="22" icon="tabler-edit" />
            </VBtn>
          </td>
        </tr>
      </tbody>

      <tfoot v-show="!products.length">
        <tr>
          <td colspan="7" class="text-center">
            No se encuentran resultados
          </td>
        </tr>
      </tfoot>
    </VTable>

    <VDivider />

    <VContainer fluid class="d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5">
      <span class="text-sm text-disabled">
        {{ paginationData }}
      </span>

      <VPagination v-model="currentPage" size="small" :total-visible="5" :length="lastPage" />
    </VContainer>
 
  </div>
</template>
