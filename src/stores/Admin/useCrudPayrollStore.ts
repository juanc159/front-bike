import axiosIns from '@/plugins/axios'
import { defineStore } from 'pinia'
import { useToast } from '@/composables/useToast'
import IPayrollForm from '@/interfaces/Admin/Payroll/IPayrollForm'
import IPayrollList from '@/interfaces/Admin/Payroll/IPayrollList'
import { usePreloadStore } from '@/stores/usePreloadStore';
const toast = useToast()

export const useCrudPayrollStore = defineStore('useCrudPayrollStore', {
  state: () => ({
    loading: false as boolean,
    typeAction: "list" as string,
    payrollData: {} as IPayrollForm,
    keyList: 0 as number,
    payrolls: [] as Array<IPayrollList>,
    errorsImport: [] as Array<object>,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
    employees: [] as Array<object>,
    years: [] as Array<string>,

    //parametriozaciones
    generalParametrization: [] as Array<object>,
    transport_assistance: 0 as number,
    health_percentage: 0 as number,
    pension_percentage: 0 as number,
    employeer_pension_percentage: 0 as number,
    employer_compensation_box_percentage: 0 as number,
    layoffs_percentage: 0 as number,
    severance_interest_percentage: 0 as number,
    vacation_percentage: 0 as number,

    fileExcel: null as File | null,
    formulario: {
      name: null,
      settlement_type: null,
      month: null,
      year: null,
      company_id: null,
    } as IPayrollForm,
  }),
  getters: {
  },
  actions: {
    clearFormulario() {
      this.formulario = <IPayrollForm>{
        name: null,
        settlement_type: null,
        month: null,
        year: null,
        company_id: null,
      }
    },
    clonarForm() {
      for (const key in this.formulario) {
        this.payrollData[key] = this.formulario[key]
      }
    },

    async fetchDataForm(company_id: number): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .get("/payroll-dataForm/" + company_id)
        .then((result) => {
          preload.isLoading = false
          this.generalParametrization = result.data.generalParametrization;

          const transport_assistance = this.generalParametrization.find(ele => ele.id == 1)
          this.transport_assistance = transport_assistance?.value ?? 0
          const health_percentage = this.generalParametrization.find(ele => ele.id == 2)
          this.health_percentage = health_percentage?.value ?? 0
          const pension_percentage = this.generalParametrization.find(ele => ele.id == 3)
          this.pension_percentage = pension_percentage?.value ?? 0
          const employeer_pension_percentage = this.generalParametrization.find(ele => ele.id == 4)
          this.employeer_pension_percentage = employeer_pension_percentage?.value ?? 0
          const employer_compensation_box_percentage = this.generalParametrization.find(ele => ele.id == 5)
          this.employer_compensation_box_percentage = employer_compensation_box_percentage?.value ?? 0
          const layoffs_percentage = this.generalParametrization.find(ele => ele.id == 6)
          this.layoffs_percentage = layoffs_percentage?.value ?? 0
          const severance_interest_percentage = this.generalParametrization.find(ele => ele.id == 7)
          this.severance_interest_percentage = severance_interest_percentage?.value ?? 0
          const vacation_percentage = this.generalParametrization.find(ele => ele.id == 8)
          this.vacation_percentage = vacation_percentage?.value ?? 0
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
        });
    },
    async fetchDataFormRefresh(company_id: number): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .get("/payroll-dataFormRefresh/" + company_id)
        .then((result) => {
          preload.isLoading = false
          this.years = result.data.years; 
          this.employees = result.data.employees;
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
        });
    },
 
    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns.post(
        '/payroll-list',
        params,
      ).then(result => {
        this.loading = false
        this.payrolls = result.data.payrolls
        this.totalData = result.data.totalData
        this.totalPage = result.data.totalPage
        this.currentPage = result.data.currentPage
        this.lastPage = result.data.lastPage
      }).catch(async error => {
        this.loading = false
        console.log(await error)
      })
    },

    async fetchSave(selectedRows: Array<string>): Promise<object> {
      const preload = usePreloadStore()
      preload.isLoading = true
      const dataEmployees = this.employees.filter(ele => selectedRows.includes('check' + ele.id))
      if(dataEmployees.length < 1){
        toast.toast("Información", 'Debe selecionar almenos un empleado', "warning");
        preload.isLoading = false
        return {};
      }
      const formData = new FormData();
      for (const key in this.formulario) formData.append(key, this.formulario[key]);
      formData.append("dataEmployees", JSON.stringify(dataEmployees));

      const response = await axiosIns.post(
        '/payroll-create',
        formData,
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
  

    async importExcel(): Promise<object> {
      if (this.fileExcel !== null) {
        const preload = usePreloadStore()
        const formData = new FormData();
        for (const key in this.formulario) formData.append(key, this.formulario[key]);
        formData.append('fileExcel', this.fileExcel);

        return await axiosIns.post('/payroll-importExcel', formData
        ).then(result => {
          preload.isLoading = false
          if (result.data.code === 200) {
            toast.toast("Éxito", result.data.message, "success");
          }
          if (result.data.code === 500)
            toast.toast("Error", result.data.message, "danger");
          if (result.data.code === 422) {
            toast.toast("Error", result.data.message, "danger");
            this.errorsImport = result.data.errorsImport;
            return { status: result.data.code };
          }
          return { status: result.data.code, formedit: result.data.data };
        }).catch(async error => {
          preload.isLoading = false
          console.log('datadata', error.response)
          return error.response.status;
        })
      }
      return {}
    }

  },
})
