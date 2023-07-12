import { useToast } from '@/composables/useToast'
import type IIncomeVehicleForm from '@/interfaces/Admin/IncomeVehicle/IIncomeVehicleForm'
import type IIncomeVehicleList from '@/interfaces/Admin/IncomeVehicle/IIncomeVehicleList'
import axiosIns from '@/plugins/axios'
import { usePreloadStore } from '@/stores/usePreloadStore'
import { defineStore } from 'pinia'

import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
const toast = useToast()

export const useCrudIncomeVehicleStore = defineStore('useCrudIncomeVehicleStore', {
  state: () => ({
    loading: true as boolean,
    formulario: {
      id: null,
      date_init: null,
      mecanic_id: null,
      type_vehicle: null,
      brand: null,
      pay_labor: null,
      plate: null,
      value_labor: null,
      value_labor40: null,
      value_parts: null,
      total_costs: null,
      paid_labor: null,
      date_pay_labor: null,
      utilites: null,
      company_id: null
    } as IIncomeVehicleForm,
    typeAction: 'list' as string,
    keyList: 0 as number,
    incomeVehicles: [] as Array<IIncomeVehicleList>,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
    operatives: [] as Array<object>,
    typeArrangement: [] as Array<object>
  }),
  getters: {
  },
  actions: {
    clearFormulario() {
      this.formulario = <IIncomeVehicleForm>{
        id: null,
        date_init: null,
        mecanic_id: null,
        type_vehicle: null,
        brand: null,
        pay_labor: null,
        value_labor40: null,
        plate: null,
        value_labor: null,
        value_parts: null,
        total_costs: null,
        paid_labor: null,
        date_pay_labor: null,
        utilites: null,
        company_id: null
      }
    },
    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns.post(
        '/incomeVehicle-list',
        params,
      ).then(result => {
        this.loading = false
        this.incomeVehicles = result.data.incomeVehicles
        this.totalData = result.data.totalData
        this.totalPage = result.data.totalPage
        this.currentPage = result.data.currentPage
        this.lastPage = result.data.lastPage
      }).catch(async error => {
        this.loading = false
        console.log(await error)
      })
    },

    async fetchSave(): Promise<object> {
      const preload = usePreloadStore()
      preload.isLoading = true

      const response = await axiosIns.post(
        '/incomeVehicle-create',
        this.formulario,
      ).then(result => {
        preload.isLoading = false
        if (result.data.code === 200) {
          this.formulario = result.data.data
          this.clearFormulario()
          toast.toast('Éxito', result.data.message, 'success')
        }

        if (result.data.code === 500)
          toast.toast('Error', result.data.message, 'danger')
        console.log(result.data.code)
        if (result.data.code === 422) {
          toast.toast('Error', result.data.message, 'danger')

          return { error: result.data.errors, status: result.data.code }
        }

        return { status: result.data.code }
      }).catch(async error => {
        preload.isLoading = false
        if (error.response.status === 500)
          toast.toast('Error', error.response.data.message, 'danger')
        console.log(await error)

        return { status: error.response.state }
      })

      return await response
    },

    async fetchDelete(id: number): Promise<void> {
      const preload = usePreloadStore()

      preload.isLoading = true
      await axiosIns.delete(
        `/incomeVehicle-delete/${id}`,
      ).then(result => {
        preload.isLoading = false
        toast.toast('Éxito', result.data.message, 'success')
      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
    },

    async fetchInfo(id: number): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns.get(
        `/incomeVehicle-info/${id}`,
      ).then(async result => {
        console.log('RESULT', result)
        preload.isLoading = false
        this.formulario = await result.data.data
      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
    },

    async fetchDataForm(): Promise<void> {
      const preload = usePreloadStore()
      const authentication = useAuthenticationStore()
      preload.isLoading = true
      await axiosIns.post(
        `/incomeVehicle-dataForm`, { company_id: authentication.company.id }
      ).then(async result => {
        preload.isLoading = false
        this.operatives = await result.data.operatives
        this.typeArrangement = await result.data.typeArrangement
      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
    },


    async changeSate(id: number, state: string): Promise<void> {
      await axiosIns.post(
        `/incomeVehicle-changeState`, {
        id: id,
        state: state,
      }
      ).then(async result => {
        if (result.data.code === 200) {
          const data = await result.data.data;
          const obj = this.incomeVehicles.find(ele => ele.id === data.id)
          obj.state = data.state
          toast.toast('Éxito', result.data.message, 'success')
        }
      }).catch(async error => {
        console.log(await error)
      })
    }

  },
})
