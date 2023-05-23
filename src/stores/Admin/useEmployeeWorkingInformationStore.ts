import axiosIns from '@/plugins/axios'
import { defineStore } from 'pinia'
import { useToast } from '@/composables/useToast'
import { usePreloadStore } from '@/stores/usePreloadStore';
import IWorkingInformationForm from '@/interfaces/Admin/Employee/IWorkingInformationForm'
import { AuthenticationStore } from '@/stores/Authentication';
const authentication = AuthenticationStore();
const toast = useToast()

export const useEmployeeWorkingInformationStore = defineStore('useEmployeeWorkingInformationStore', {
  state: () => ({
    loading: false as boolean,
    typeAction: "list" as string,
    workingInformationData: {} as IWorkingInformationForm,
    keyList: 0 as number,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
    formulario: {
      typeContract_id: null,
      employee_id: null,
      company_id: null,
      contractStartDate: null,
      contractFinalDate: null,
      salary: null,
      comprehensive_salary: null,
      contract_number: null,
      payroll_group: null,
      charge_id: null,
      typeContributor_id:null,
      subTypeContributor_id:null,
      health_background_id:null,
      health_fund_percentage:null,
      pension_fund_id:null,
      pension_fund_percentage:null,
      arl_id:null,
      risk_class_id:null,
      code_ciiu:null,
      code_id:null,
      compensation_box_id:null,
      severance_fund_id:null,
      withholding_deductions:null,
      reasonRetirement_id:null,
    } as IWorkingInformationForm,
    typeContracts: [] as Array<object>,
    reasonRetirements: [] as Array<object>,
    payrollGroups: [] as Array<object>,
    chargeCatalogs: [] as Array<object>,
    contributingTypes: [] as Array<object>,
    contributingSubTypes: [] as Array<object>,
    healthBackgrounds: [] as Array<object>,
    pensionFunds: [] as Array<object>,
    compensationBoxs: [] as Array<object>,
    arls: [] as Array<object>,
    riskClass: [] as Array<object>,
    codes: [1,2,3,4,5,6],
  }),
  getters: {
  },
  actions: {
    clearFormulario() {
      this.formulario = <IWorkingInformationForm>{
        typeContract_id: null,
        employee_id: null,
        company_id: null,
        contractStartDate: null,
        contractFinalDate: null,
        salary: null,
        comprehensive_salary: null,
        contract_number: null,
        payroll_group: null,
        charge_id: null,
        typeContributor_id:null,
        subTypeContributor_id:null,
        health_background_id:null,
        health_fund_percentage:null,
        pension_fund_id:null,
        pension_fund_percentage:null,
        arl_id:null,
        risk_class_id:null,
        code_ciiu:null,
        code_id:null,
        compensation_box_id:null,
        severance_fund_id:null,
        withholding_deductions:null,
        reasonRetirement_id:null,
      }
    },
    clonarForm() {
      for (const key in this.formulario) {
        this.workingInformationData[key] = this.formulario[key]
      }
    },

    //DATOS PARA LOS SELECTS
    async fetchDataForm(): Promise<void> {
      const preload=  usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .post("/employee-workingInformation-dataForm",{company_id:authentication.company.id})
        .then((result) => {
          preload.isLoading = false
          this.typeContracts = result.data.typeContracts;
          this.reasonRetirements = result.data.reasonRetirements;
          this.payrollGroups = result.data.payrollGroups;
          this.chargeCatalogs = result.data.chargeCatalogs;
          this.contributingTypes = result.data.contributingTypes;
          this.contributingSubTypes = result.data.contributingSubTypes;
          this.healthBackgrounds = result.data.healthBackgrounds;
          this.pensionFunds = result.data.pensionFunds;
          this.compensationBoxs = result.data.compensationBoxs;
          this.arls = result.data.arls;
          this.riskClass = result.data.riskClass;
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
        });
    },

    async fetchSave(): Promise<object> {
      const preload=  usePreloadStore()
      preload.isLoading = true
      const response = await axiosIns.post(
        '/employee-workingInformation-create',
        this.formulario,
      ).then(result => {
        preload.isLoading = false
        if (result.data.code === 200) {
          this.clonarForm()
          this.clearFormulario()
          toast.toast("Éxito", result.data.message, "success");
        }
        if (result.data.code === 500)
          toast.toast("Error", result.data.message, "danger");
        if (result.data.status === 422) {
          toast.toast("Error", result.data.message, "danger");
          return { error: result.data.errors, status: result.data.status };
        }
        return { status: result.data.code, formedit: result.data.data };
      }).catch(async error => {
        preload.isLoading = false
        if (error.response.status === 500)
          toast.toast('Error', error.response.data.message, 'danger')
        console.log(await error)
        return error.response.status
      })

      return await response
    },

    async fetchDelete(id: number): Promise<void> {
      const preload=  usePreloadStore()
      preload.isLoading = true
      await axiosIns.delete(
        '/chargeCatalog-delete/' + id
      ).then(result => {
        preload.isLoading = false
        toast.toast('Éxito', result.data.message, 'success')
      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
    },

    async fetchInfoWorkingInformationData(id: number): Promise<void> {
      const preload=  usePreloadStore()
        preload.isLoading = true
        await axiosIns.get(
          `/employee-workingInformation-info/${id}`,
        ).then(async result => {
          preload.isLoading = false
          if(result.data.data){
            this.formulario = await result.data.data
          }
          this.clonarForm()
        }).catch(async error => {
          preload.isLoading = false
          console.log(await error)
        })
      
    },

    //TRAE CIUDAD DE RESIDENCIA
    async getCitiesOfResidence(): Promise<void> {
      const preload=  usePreloadStore()
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
      const preload=  usePreloadStore()
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