import { useToast } from '@/composables/useToast'
import type IAdministrationForm from '@/interfaces/Admin/Administration/IAdministrationForm'
import type IAdministrationList from '@/interfaces/Admin/Administration/IAdministrationList'
import axiosIns from '@/plugins/axios'
import { usePreloadStore } from '@/stores/usePreloadStore'
import { defineStore } from 'pinia'

const toast = useToast()

export const useCrudAdministrationStore = defineStore('useCrudAdministrationStore', {
  state: () => ({
    loading: true as boolean,
    formulario: {
      id: null,
      name: null,
      cost: null,
      init_date: null,
      final_date: null,
      status: 1,
      company_id: null
    } as IAdministrationForm,
    typeAction: 'list' as string,
    keyList: 0 as number,
    administrations: [] as Array<IAdministrationList>,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
  }),
  getters: {
  },
  actions: {
    clearFormulario() {
      this.formulario = <IAdministrationForm>{
        id: null,
        name: null,
        cost: null,
        init_date: null,
        final_date: null,
        status: 1,
        company_id: null
      }
    },
    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns.post(
        '/administration-list',
        params,
      ).then(result => {
        this.loading = false
        this.administrations = result.data.administrations
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
        '/administration-create',
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
        console.log(result.data.status)
        if (result.data.status === 422) {
          toast.toast('Error', result.data.message, 'danger')

          return { error: result.data.errors, status: result.data.status }
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
        `/administration-delete/${id}`,
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
        `/administration-info/${id}`,
      ).then(async result => {
        console.log('RESULT', result)
        preload.isLoading = false
        this.formulario = await result.data.data
      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
    },

  },
})
