<script lang="ts" setup type="module">
import Swal from 'sweetalert2';
import PreloadInterno from "@/componentsGlobal/PreloadInterno.vue";
import { useCrudTypesQuoteStore } from "@/stores/Admin/useCrudTypesQuoteStore";
import { AuthenticationStore } from "@/stores/Authentication";

const authentication = AuthenticationStore();
const typesQuoteStore = useCrudTypesQuoteStore();
const { currentPage, typesQuotes, totalPage, links, totalData,loading,pathExcel } = storeToRefs(typesQuoteStore);
const rowPerPage = ref<number>(10);
const searchQuery = ref<string>("");

//Accion cambio de pantalla
const changeScreen = async (screen: string, typeRecInvId: number | null = null) => {
  typesQuoteStore.clearFormulario();
  typesQuoteStore.typeAction = screen;
  if (typeRecInvId) {
    await typesQuoteStore.fetchInfo(typeRecInvId)
  }
};

const fetchTypesQuotes = async () => {
  await typesQuoteStore.fetchAll({
    company_id: authentication.company.id,
    perPage: rowPerPage.value,
    page: currentPage.value,
    searchQuery: searchQuery.value
  });
};

watch(currentPage, async () => {
  if (currentPage.value > totalPage.value) currentPage.value = totalPage.value;
});
watch(rowPerPage, async () => {
  currentPage.value =1
})
watchArray([currentPage, searchQuery, rowPerPage], async () => {
  await fetchTypesQuotes();
});
const paginationData = computed(() => {
  const firstIndex = typesQuotes.value.length
    ? (currentPage.value - 1) * totalPage.value + 1
    : 0;
  const lastIndex =
    typesQuotes.value.length + (currentPage.value - 1) * totalPage.value;

  return `Mostrando ${firstIndex} a ${lastIndex} de ${totalData.value} registros`;
});

//DESCARGAR EXCEL
const dowloadExcel = async() => {
  console.log('dowloadExcel',typesQuotes)
  await typesQuoteStore.excel({
    company_id: authentication.company.id,
    searchQuery: searchQuery.value,
  });
  window.open(pathExcel.value,'_blank');
}

//ELIMINAR REGISTRO
const deleteData = async (id: number) => {
  Swal.fire({
    title: '¿Desea eliminar el registro?',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Si',
    denyButtonText: 'No',
  }).then(async result => {
    if (result.isConfirmed) {
      await typesQuoteStore.fetchDelete(id)
      await fetchTypesQuotes()
    }
    else if (result.isDenied) {
    }
  })
}
 

onMounted(async () => {
  await fetchTypesQuotes();
});
</script>
<template>
  <div>
    <VContainer fluid class="d-flex flex-wrap py-4 gap-4">
      <div class="me-3" style="width: 80px">
        <VSelect
          v-model="rowPerPage"
          density="compact"
          variant="outlined"
          focused          :items="[10, 20, 30, 50]"
        />
      </div>
      <div class="me-3" style="width: 80px">
        <VBtn
              mt-2
              size="x-small"
              color="default"
              variant="text"
              title="Descargar"
              @click="dowloadExcel()"
            >
            <VIcon size="30" icon="mdi-file-excel"></VIcon>
              Excel
            </VBtn>
      </div>

      <VSpacer />

      <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
        <div style="width: 10rem">
          <VTextField
            v-model="searchQuery"
            placeholder="Buscar"
            density="compact"
          />
        </div>
        <VBtn color="primary" @click="changeScreen('form')"> Crear nuevo tipo de cotización</VBtn>
      </div>
    </VContainer>

    <VDivider />

    <VTable class="text-no-wrap">
      <thead>
        <tr>
          <th scope="col">Código</th>
          <th scope="col">Nombre</th> 
          <th scope="col">En uso</th> 
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-show="loading">
          <td colspan="3" >
            <PreloadInterno /> 
          </td>
        </tr>
        <tr
        v-show="!loading"
          v-for="(item, index) in typesQuotes"
          :key="index"
          style="height: 3.75rem"
        >
          <td>
            <span> {{ item.voucherCode }} </span>
          </td>
          <td>
            <span> {{ item.voucherName }} </span>
          </td>    
          <td>
            <span> {{ item.inUse }} </span>
          </td>    

          <td class="text-center" style="width: 5rem">
            <VBtn
            icon
            size="x-small"
            color="error"
            variant="text"
            @click="deleteData(item.id)"
          >
            <VIcon
              size="22"
              icon="tabler-trash"
            />
          </VBtn>
            <VBtn
              icon
              size="x-small"
              color="default"
              variant="text"
              @click="changeScreen('form', item.id)"
            >
              <VIcon size="22" icon="tabler-edit" />
            </VBtn>
          </td>
        </tr>
      </tbody>

      <tfoot v-show="!typesQuotes.length">
            <tr>
              <td
                colspan="3"
                class="text-center"
              >
                No se encuentran resultados
              </td>
            </tr>
          </tfoot>
    </VTable>

    <VDivider />

    <VContainer
      fluid
      class="d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5"
    >
      <span class="text-sm text-disabled">
        {{ paginationData }}
      </span>

      <VPagination
        v-model="currentPage"
        size="small"
        :total-visible="5"
        :length="links"
      />
    </VContainer>
  </div>
</template>
