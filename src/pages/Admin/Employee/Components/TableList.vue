<script lang="ts" setup type="module">
import Swal from 'sweetalert2';
import PreloadInterno from "@/componentsGlobal/PreloadInterno.vue";
import { useCrudEmployeeStore } from "@/stores/Admin/useCrudEmployeeStore";
import { useEmployeeWorkingInformationStore } from "@/stores/Admin/useEmployeeWorkingInformationStore";
import { AuthenticationStore } from '@/stores/Authentication';

const authentication = AuthenticationStore();
const employeeStore = useCrudEmployeeStore();
const employeeWorkingInformationStore = useEmployeeWorkingInformationStore();
const { currentPage, employees, totalPage, lastPage, totalData, loading } = storeToRefs(employeeStore);
const rowPerPage = ref<number>(10);
const searchQuery = ref<string>("");

//Accion cambio de pantalla
const changeScreen = async (screen: string, employeeId: number | null = null) => {
  employeeStore.clearFormulario();
  employeeStore.typeAction = screen;
  if (employeeId) {
    await employeeStore.fetchInfoEmployee(employeeId)
    await employeeWorkingInformationStore.fetchInfoWorkingInformationData(employeeId)
  };
};

const fetchEmployees = async () => {
  await employeeStore.fetchAll({
    company_id: authentication.company.id,
    perPage: rowPerPage.value,
    page: currentPage.value,
    searchQuery: searchQuery.value
  });
};

const deleteData = async (id: number) => {
  Swal.fire({
    title: '¿Desea eliminar el registro?',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Si',
    denyButtonText: 'No',
  }).then(async result => {
    if (result.isConfirmed) {
      await employeeStore.fetchDelete(id)
      await fetchEmployees()
    }
    else if (result.isDenied) {
    }
  })
}

watch(currentPage, async () => {
  if (currentPage.value > totalPage.value) currentPage.value = totalPage.value;
});
watch(rowPerPage, async () => {
  currentPage.value =1
})
watchArray([currentPage, searchQuery, rowPerPage], async () => {
  await fetchEmployees();
});
const paginationData = computed(() => {
  const firstIndex = employees.value.length
    ? (currentPage.value - 1) * totalPage.value + 1
    : 0;
  const lastIndex =
    employees.value.length + (currentPage.value - 1) * totalPage.value;

  return `Mostrando ${firstIndex} a ${lastIndex} de ${totalData.value} registros`;
});

onMounted(async () => {
  await fetchEmployees();
});
</script>
<template>
  <div>
    <!-- FIN CARD -->
    <VContainer fluid class="d-flex flex-wrap py-4 gap-4">
      <div class="me-3" style="width: 80px">
        <VSelect v-model="rowPerPage" density="compact" variant="outlined" :items="[10, 20, 30, 50]" />
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
          <th scope="col">Apellido</th>
          <th scope="col">Tipo de identificación</th>
          <th scope="col">Identificación</th>
          <th scope="col">email</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-show="loading">
          <td colspan="9">
            <PreloadInterno />
          </td>
        </tr>
        <tr v-show="!loading" v-for="(item, index) in employees" :key="index" style="height: 3.75rem">
          <td>
            <span> {{ item.name }} </span>
          </td>
          <td>
            <span> {{ item.last_name }} </span>
          </td>
          <td>
            <span> {{ item.type_identifications_name }} </span>
          </td>
          <td>
            <span> {{ item.document_number }} </span>
          </td>
          <td>
            <span> {{ item.email }} </span>
          </td>
          <td class="text-center" style="width: 5rem">
            <VBtn icon size="x-small" color="default" variant="text" @click="changeScreen('form', item.id)">
              <VIcon size="22" icon="tabler-edit" />
            </VBtn>
            <VBtn icon size="x-small" color="error" variant="text" @click="deleteData(item.id)">
              <VIcon size="22" icon="tabler-trash" />
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

    <VContainer fluid class="d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5">
      <span class="text-sm text-disabled">
        {{ paginationData }}
      </span>

      <VPagination v-model="currentPage" size="small" :total-visible="5" :length="lastPage" />
    </VContainer>
  </div>
</template>
