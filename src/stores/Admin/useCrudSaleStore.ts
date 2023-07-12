import { useToast } from '@/composables/useToast'
import type ISaleForm from '@/interfaces/Admin/Sale/ISaleForm'
import type ISaleList from '@/interfaces/Admin/Sale/ISaleList'
import axiosIns from '@/plugins/axios'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
import { usePreloadStore } from '@/stores/usePreloadStore'
import { defineStore } from 'pinia'

const toast = useToast()
const authenticationStore = useAuthenticationStore()

export const useCrudSaleStore = defineStore('useCrudSaleStore', {
  //son las variables
  state: () => ({
    pathExcel: null as null | string,
    loading: true as boolean,
    formulario: {
      id: null,
      inventory_id: null,
      description: null,
      thirds: [],
      total: 0,
      utilities: 0,
      price_vehicle: null,
      barter: null
    } as ISaleForm,
    typeAction: 'list' as string,
    keyList: 0 as number,
    sales: [] as Array<ISaleList>,
    inventories: [] as Array<object>,
    thirds: [] as Array<object>,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
  }),
  //getter son las variables computadas
  getters: {
  },

  //son los metodos o funciones
  actions: {
    clearFormulario() {
      this.formulario = <ISaleForm>{
        id: null,
        inventory_id: null,
        description: null,
        thirds: [],
        total: 0,
        utilities: 0,
        price_vehicle: null,
        barter: null
      }
    },
    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns.post(
        '/sale-list',
        params,
      ).then(result => {
        this.loading = false
        this.sales = result.data.sales
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
        '/sale-create',
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
        `/sale-delete/${id}`,
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
        `/sale-info/${id}`,
      ).then(async result => {
        preload.isLoading = false
        this.formulario = await result.data.data

      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
    },
    async fetchDataForm(): Promise<void> {
      const preload = usePreloadStore()
      const form: object = { company_id: authenticationStore.company.id }
      preload.isLoading = true
      await axiosIns.post(
        `/sale-dataForm`, form
      ).then(async result => {
        preload.isLoading = false
        this.inventories = await result.data.inventories
        this.thirds = await result.data.thirds
      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
    },
    //excel TABLA
    async excel(params: object): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      console.log(params, "params");

      await axiosIns
        .post("/sale-excel", params)
        .then((result) => {
          preload.isLoading = false
          this.pathExcel = result.data.path;
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
        });
    },

  },
})
