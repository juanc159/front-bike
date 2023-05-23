import axiosIns from '@/plugins/axios'
import { defineStore } from 'pinia'
import { useToast } from '@/composables/useToast'
import IEmployeeList from '@/interfaces/Admin/Employee/IEmployeeList'
import IEmployeeForm from '@/interfaces/Admin/Employee/IEmployeeForm'
import { usePreloadStore } from '@/stores/usePreloadStore';
const toast = useToast()

export const useCrudEmployeeStore = defineStore('useCrudEmployeeStore', {
  state: () => ({
    loading: false as boolean,
    typeIdentifications: [] as Array<object>,
    typeAction: "list" as string,
    employeeData: {} as IEmployeeForm,
    keyList: 0 as number,
    employees: [] as Array<IEmployeeList>,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
    formulario: {
      id:null,
      name: null,
      last_name: null,
      type_identifications_id: null,
      document_number: null,
      email: null,
      company_id: null,
      cellPhoneNumber: null,
      residenceAddress: null,
      residenceDepartament_id: null,
      residenceCity_id: null,
      officeDepartament_id: null,
      officeCity_id: null,
      paymentMethod_id: null,
      residenceOffice: null,
      kind_procedure_id: null,
      cellPhoneNumberPay: null,
      banking_entity_id: null,
      account_number: null,
      account_type_id: null,
    } as IEmployeeForm,
    departamentsOfResidence: [],
    citiesOfResidence: [],
    departamentsOfOffice: [],
    citiesOfOffice: [],
    paymentMethods: [],
    kind_procedures: [],
    banking_entitys: [],
    accountTypes: [],
  }),
  getters: {
  },
  actions: {
    clearFormulario() {
      this.formulario = <IEmployeeForm>{
        name: null,
        last_name: null,
        type_identifications_id: null,
        document_number: null,
        email: null,
        company_id: null,
        cellPhoneNumber: null,
        cellPhoneNumberPay: null,
        residenceAddress: null,
        residenceDepartament_id: null,
        residenceCity_id: null,
        officeDepartament_id: null,
        officeCity_id: null,
        paymentMethod_id: null,
        residenceOffice: null,
        kind_procedure_id: null,
        banking_entity_id: null,
        account_number: null,
        account_type_id: null,
      }
    },
    clonarForm() {
      for (const key in this.formulario) {
        this.employeeData[key] = this.formulario[key]
      }
    },
    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns.post(
        '/employee-list',
        params,
      ).then(result => {
        this.loading = false
        this.employees = result.data.employees
        this.totalData = result.data.totalData
        this.totalPage = result.data.totalPage
        this.currentPage = result.data.currentPage
        this.lastPage = result.data.lastPage
      }).catch(async error => {
        this.loading = false
        console.log(await error)
      })
    },

    //DATOS PARA LOS SELECTS
    async fetchDataForm(company_id: number | string): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .get("/employee-basicData-dataForm")
        .then((result) => {
          preload.isLoading = false
          this.typeIdentifications = result.data.typeIdentifications;
          this.departamentsOfResidence = result.data.departamentsOfresidence;
          this.departamentsOfOffice = result.data.departamentsOfOffice;
          this.paymentMethods = result.data.paymentMethods;
          this.kind_procedures = result.data.kind_procedures;
          this.banking_entitys = result.data.banking_entitys;
          this.accountTypes = result.data.accountTypes;
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
        });
    },

    async fetchSave(): Promise<object> {
      const preload = usePreloadStore()
      preload.isLoading = true
      const response = await axiosIns.post(
        '/employee-create',
        this.formulario,
      ).then(result => {
        preload.isLoading = false
        if (result.data.code === 200) {
          this.formulario = result.data.data
          this.clonarForm()
          // this.clearFormulario()
          toast.toast("Éxito", result.data.message, "success");
        }
        if (result.data.code === 500)
          toast.toast("Error", result.data.message, "danger");
        if (result.data.status === 422) {
          toast.toast("Error", result.data.message, "danger");
          return { error: result.data.errors, status: result.data.status };
        }
        return { status: result.data.code };
      }).catch(async error => {
        preload.isLoading = false
        if (error.response.status === 500)
          toast.toast('Error', error.response.data.message, 'danger')
        console.log(await error)
        return { status: error.response.status }; 
      })

      return await response
    },

    async fetchDelete(id: number): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns.delete(
        '/employee-delete/' + id
      ).then(result => {
        preload.isLoading = false
        toast.toast('Éxito', result.data.message, 'success')
      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
    },

    async fetchInfoEmployee(id: number): Promise<void> {
      const preload = usePreloadStore()
      if (id !== this.employeeData.id) {
        preload.isLoading = true
        await axiosIns.get(
          `/employee-info/${id}`,
        ).then(async result => {
          preload.isLoading = false
          this.employeeData.id = id
          this.formulario = await result.data.data
          let idCityRes = this.formulario.residenceCity_id
          let idCityOffice = this.formulario.officeCity_id
          await this.getCitiesOfResidence()
          await this.getCitiesOffice()
          this.formulario.residenceCity_id = idCityRes
          this.formulario.officeCity_id = idCityOffice
          this.clonarForm()
        }).catch(async error => {
          preload.isLoading = false
          console.log(await error)
        })
      } else {
        for (const key in this.employeeData) {
          this.formulario[key] = this.employeeData[key]
        }
      }
    },

    //TRAE CIUDAD DE RESIDENCIA
    async getCitiesOfResidence(): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .post("/invoice-cities", { departament_id: this.formulario.residenceDepartament_id })
        .then((result) => {
          this.formulario.residenceCity_id = null;
          preload.isLoading = false;
          this.citiesOfResidence = result.data.cities;
        })
        .catch(async (error) => {
          this.formulario.residenceCity_id = null;
          preload.isLoading = false
          console.log(await error);
        });
    },
    //TRAE CIUDAD DE OFICINA
    async getCitiesOffice(): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .post("/invoice-cities", { departament_id: this.formulario.officeDepartament_id })
        .then((result) => {
          this.formulario.officeCity_id = null;
          preload.isLoading = false;
          this.citiesOfOffice = result.data.cities;
        })
        .catch(async (error) => {
          this.formulario.officeCity_id = null;
          preload.isLoading = false
          console.log(await error);
        });
    },

  },
})