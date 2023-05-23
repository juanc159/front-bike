import axiosIns from '@/plugins/axios'
import { defineStore } from 'pinia'
import { useToast } from '@/composables/useToast'
import IChargeCatalogForm from '@/interfaces/Admin/ChargeCatalog/IChargeCatalogForm'
import IChargeCatalogList from '@/interfaces/Admin/ChargeCatalog/IChargeCatalogList'
import { usePreloadStore } from '@/stores/usePreloadStore';
const toast = useToast()

export const useCrudChargeCatalogStore = defineStore('useCrudChargeCatalogStore', {
  state: () => ({
    loading: false as boolean,
    typeAction: "list" as string,
    chargeCatalogData: {} as IChargeCatalogForm,
    keyList: 0 as number,
    chargeCatalogs: [] as Array<IChargeCatalogList>,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,    
    ledgerAccountGroup: [] as Array<object>,
    lastPage: 0 as number,
    formulario: {
      name: '',
      company_id:null,
      ledger_account_group_id:null,
    } as IChargeCatalogForm,
  }),
  getters: {
  },
  actions: {
    clearFormulario() {
      this.formulario = <IChargeCatalogForm>{
        name: '',
        company_id:null,
        ledger_account_group_id:null,
      }
    },
    clonarForm() {
      for (const key in this.formulario) {
        this.chargeCatalogData[key] = this.formulario[key]
      }
    },
    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns.post(
        '/chargeCatalog-list',
        params,
      ).then(result => {
        this.loading = false
        this.chargeCatalogs = result.data.chargeCatalogs
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
      const preload=  usePreloadStore()
      preload.isLoading = true
      const response = await axiosIns.post(
        '/chargeCatalog-create',
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

    async fetchInfo(id: number): Promise<void> {
      const preload=  usePreloadStore()
      if (id !== this.chargeCatalogData.id) {
        preload.isLoading = true
        await axiosIns.get(
          `/chargeCatalog-info/${id}`,
        ).then(async result => {
          preload.isLoading = false
          this.chargeCatalogData.id = id
          this.formulario = await result.data.data
          this.clonarForm()
        }).catch(async error => {
          preload.isLoading = false
          console.log(await error)
        })
      } else {
        for (const key in this.chargeCatalogData) {
          this.formulario[key] = this.chargeCatalogData[key]
        }
      }
    },
    //DATOS PARA LOS SELECTS
    async fetchDataForm(): Promise<void> {
      const preload=  usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .get("/chargeCatalog-dataForm")
        .then((result) => {
          preload.isLoading = false
          this.ledgerAccountGroup = result.data.ledgerAccountGroup;
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
        });
    },

  },
})
