import { useToast } from '@/composables/useToast'
import type IInventoryForm from '@/interfaces/Admin/Inventory/IInventoryForm'
import type IInventoryList from '@/interfaces/Admin/Inventory/IInventoryList'
import axiosIns from '@/plugins/axios'
import { usePreloadStore } from '@/stores/usePreloadStore'
import { defineStore } from 'pinia'


const toast = useToast()

export const useCrudInventoryStore = defineStore('useCrudInventoryStore', {
  state: () => ({
    loading: true as boolean,
    formulario: {
      id: null,
      reference: null,
      brand: null,
      model: null,
      color: null,
      plate: null,
      registrationSite: null,
      purchaseValue: null,
      saleValue: null,
      vehicleType: null,
      state: "Ingresado",
      days: 0,
    } as IInventoryForm,
    typeAction: 'list' as string,
    keyList: 0 as number,
    inventories: [] as Array<IInventoryList>,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
  }),
  getters: {
  },
  actions: {
    clearFormulario() {
      this.formulario = <IInventoryForm>{
        id: null,
        reference: null,
        brand: null,
        model: null,
        color: null,
        plate: null,
        registrationSite: null,
        purchaseValue: null,
        saleValue: null,
        vehicleType: null,
        state: "Ingresado",
        days: 0,
      }
    },
    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns.post(
        '/inventory-list',
        params,
      ).then(result => {
        this.loading = false
        this.inventories = result.data.inventories
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
        '/inventory-create',
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
        `/inventory-delete/${id}`,
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
        `/inventory-info/${id}`,
      ).then(async result => {
        console.log('RESULT', result)
        preload.isLoading = false
        this.formulario = await result.data.data
      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
    },

    async changeSate(id: number, state: string): Promise<void> {
      await axiosIns.post(
        `/inventory-changeState`, {
        id: id,
        state: state,
      }
      ).then(async result => {
        if (result.data.code === 200) {
          const data = await result.data.data;
          const obj = this.inventories.find(ele => ele.id === data.id)
          obj.state = data.state
          toast.toast('Éxito', result.data.message, 'success')
        }
      }).catch(async error => {
        console.log(await error)
      })
    }

  },
})
