<script lang="ts" setup type="module">
import PreloadInterno from "@/componentsGlobal/PreloadInterno.vue";
import { useThirdStore } from "@/stores/Admin/useThirdStore";
import { AuthenticationStore } from '@/stores/Authentication';

const authentication = AuthenticationStore();
const thirdStore = useThirdStore();
const { show, currentPage, thirds, totalPage, links,typeOfThird, totalData,fiscalResponsability,formulario,searchThird,pathExcel,loading } =
  storeToRefs(thirdStore);
const rowPerPage = ref<number>(10);
const searchQuery = ref<string>("");

//Accion cambio de pantalla
const changeScreen = async (screen: string, thirdId: number | null = null) => {
  thirdStore.clearFormulario();
  thirdStore.typeAction = screen;
  if (thirdId) {
    await thirdStore.fetchInfoThird(thirdId)
    for(let index=0; index < fiscalResponsability.value.length; index++){
        for(let z=0; z < formulario.value.arrayFiscalResponsability.length; z++){
          if(formulario.value.arrayFiscalResponsability.includes(fiscalResponsability.value[index].id)){
            fiscalResponsability.value[index].estado = "Activo";
          }
      }
    }
    for(let index=0; index < typeOfThird.value.length; index++){
        for(let z=0; z < formulario.value.arrayTypeThird.length; z++){
          if(formulario.value.arrayTypeThird.includes(typeOfThird.value[index].id)){
            typeOfThird.value[index].estado = "Activo";
          }
      }
    }    
  }else{
    thirdStore.clearArrayOfThirds();
  };
};

const fetchThirds = async () => {
  await thirdStore.fetchAll({
    company_id: authentication.company.id,
    perPage: rowPerPage.value,
    page: currentPage.value,
    searchQuery: searchQuery.value,
    state:searchThird.value.state,
    name:searchThird.value.name,
    identifications:searchThird.value.identifications,
  });
};

watch(currentPage, async () => {
  if (currentPage.value > totalPage.value) currentPage.value = totalPage.value;
});
watch(rowPerPage, async () => {
  currentPage.value =1
})
watchArray([currentPage, searchQuery, rowPerPage], async () => {
  await fetchThirds();
});
const paginationData = computed(() => {
  const firstIndex = thirds.value.length
    ? (currentPage.value - 1) * totalPage.value + 1
    : 0;
  const lastIndex =
    thirds.value.length + (currentPage.value - 1) * totalPage.value;

  return `Mostrando ${firstIndex} a ${lastIndex} de ${totalData.value} registros`;
});

//DESCARGAR EXCEL
const dowloadExcel = async() => {
  await thirdStore.excel({
    company_id: authentication.company.id,
    searchQuery: searchQuery.value,
    state:searchThird.value.state,
    name:searchThird.value.name
  }).then(resp =>{
    window.open(pathExcel.value,'_blank');
  });
}


//Accion cambio de estado
const changeState = async (object: object, state: number) => {
  thirdStore.changeState(object, state);
}

//LIMPIA VAMPOS A BUSCAR
const clearSearchThird = ()=>{
  searchThird.value = {};
  fetchThirds();
}

onMounted(async () => {
  await fetchThirds();
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
            <VBtn
              :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              @click="show = !show"
            ></VBtn>
          </VCardActions>

          <VExpandTransition>
            <div v-show="show">
              <VDivider></VDivider>

              <VCardText>
                <VRow>
                    <VCol cols="6">
                      <div>
                        <VSelect :items="[{id:1,name:'Activo'},{id:0,name:'Inactivo'}]"  item-title="name" v-model="searchThird.state" item-value="id" label="Estado"></VSelect>
                      </div>
                    </VCol>
                    <VCol cols="6">
                      <div>
                        <VTextField label="Tercero" v-model="searchThird.name"/>
                      </div>
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="6">
                      <div>
                        <VTextField label="Identificación" v-model="searchThird.identifications"/>
                      </div>
                    </VCol>
                  </VRow>
                <VRow>
                  <VCol cols="12 d-flex justify-content-center">
                    <VBtn color="primary" class="mr-2" @click="fetchThirds">Buscar</VBtn>
                    <VBtn color="primary" @click="clearSearchThird">Limpiar Filtros</VBtn>
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
        <VSelect
          v-model="rowPerPage"
          density="compact"
          variant="outlined"
          :items="[10, 20, 30, 50]"
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
        <VBtn color="primary" @click="changeScreen('form')"> Crear </VBtn>
      </div>
    </VContainer>

    <VDivider />

    <VTable class="text-no-wrap">
      <thead>
        <tr>
          <th scope="col">Nombre tercero</th>
          <th scope="col">Tipo de identificación</th>
          <th scope="col">Identificación</th>
          <th scope="col">Tipo regimen IVA</th>
          <th scope="col">Dirección</th>
          <th scope="col">Ciudad</th>
          <th scope="col">Teléfono</th>
          <th scope="col">Nombres contacto</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-show="loading">
          <td colspan="9" >
            <PreloadInterno /> 
          </td>
        </tr>
        <tr
        v-show="!loading"
          v-for="(item, index) in thirds"
          :key="index"
          style="height: 3.75rem"
        >
          <td>
            <span> {{ item.name }} </span>
          </td>
          <td>
            <span> {{ item.nametypeIdentificaction }} </span>
          </td>
          <td>
            <span> {{ item.identifications }} </span>
          </td>
          <td>
            <span> {{ item.nametypeRegimenIva }} </span>
          </td>
          <td>
            <span> {{ item.address }} </span>
          </td>
          <td>
            <span> {{ item.city }} </span>
          </td>
          <td>
            <span> 123456 </span>
          </td>
          <td>
            <span> {{ item.contact_name }} </span>
          </td>          
          
          <td>
            <v-switch v-model="item.state" color="success" inset :value="item.state" :true-value="1" :false-value="0"
              hide-details @click="changeState(item, item.state)"></v-switch>
          </td>

          <td class="text-center" style="width: 5rem">
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

      <!-- <tfoot v-show="!generals.length">
            <tr>
              <td
                colspan="7"
                class="text-center"
              >
                No se encuentran resultados
              </td>
            </tr>
          </tfoot> -->
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
