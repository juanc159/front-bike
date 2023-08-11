import { useToast } from '@/composables/useToast'
import type IMecanicForm from '@/interfaces/Admin/Mecanic/IMecanicForm'
import type IMecanicList from '@/interfaces/Admin/Mecanic/IMecanicList'
import axiosIns from '@/plugins/axios'
import { usePreloadStore } from '@/stores/usePreloadStore'
import { defineStore } from 'pinia'

const toast = useToast()

export const useCrudMecanicStore = defineStore('useCrudMecanicStore', {
  state: () => ({
    loading: true as boolean,
    formulario: {
      id: null,
      name: null,
      last_name: null,
      identify: null,
      status: null,
      company_id: null
    } as IMecanicForm,
    typeAction: 'list' as string,
    keyList: 0 as number,
    mecanic: [] as Array<IMecanicList>,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,

    //de info
    incomeVehiclesSi: [] as Array<object>,
    incomeVehiclesNo: [] as Array<object>,
  }),
  getters: {
  },
  actions: {
    clearFormulario() {
      this.formulario = <IMecanicForm>{
        id: null,
        name: null,
        last_name: null,
        identify: null,
        status: null,
        company_id: null
      }
    },
    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns.post(
        '/mecanic-list',
        params,
      ).then(result => {
        this.loading = false
        this.mecanic = result.data.mecanics
        this.totalData = result.data.totalData
        this.totalPage = result.data.totalPage
        this.currentPage = result.data.currentPage
        this.lastPage = result.data.lastPage
      }).catch(async error => {
        this.loading = false
      })
    },

    async fetchSave(): Promise<object> {
      const preload = usePreloadStore()
      preload.isLoading = true

      const response = await axiosIns.post(
        '/mecanic-create',
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

          return { error: result.data.errors, code: result.data.code }
        }

        return { code: result.data.code }
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
        `/mecanic-delete/${id}`,
      ).then(result => {
        preload.isLoading = false
        toast.toast('Éxito', result.data.message, 'success')
      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
    },

    async fetchInfo(form: object): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns.post(
        "/mecanic-info", form,
      ).then(async result => {
        preload.isLoading = false
        this.formulario = await result.data.data

        this.incomeVehiclesSi = result.data.incomeVehiclesSi
        this.incomeVehiclesNo = result.data.incomeVehiclesNo


      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
    },

    async fetchPay(form: object): Promise<void> {
      await axiosIns.post(
        "/mecanic-pay", form
      ).then(result => {
        console.log(result)
      }).catch(async error => {
        console.log(await error)
      })
    },

  },
})
