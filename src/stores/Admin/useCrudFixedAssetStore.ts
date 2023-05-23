import axiosIns from '@/plugins/axios'
import { defineStore } from 'pinia'
import { useToast } from '@/composables/useToast'
import { usePreloadStore } from '@/stores/usePreloadStore';
import IFixedAssetForm from '@/interfaces/Admin/FixedAsset/IFixedAssetForm'
import IFixedAssetList from '@/interfaces/Admin/FixedAsset/IFixedAssetList';
import Swal from 'sweetalert2';
const toast = useToast()

export const useCrudFixedAssetStore = defineStore('useCrudFixedAssetStore', {
  state: () => ({
    loading: false as boolean,
    typeAction: "list" as string,
    fixedAssetData: {} as IFixedAssetForm,
    keyList: 0 as number,
    fixedAssets: [] as Array<IFixedAssetList>,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,    
    ledgerAccountGroup: [] as Array<object>,
    lastPage: 0 as number,
    formulario: {
      id: null,
      code: null,
      name: null,
      fixed_asset_group_id: null
    } as IFixedAssetForm,

    //selects infinites
    fixedAssetGroupsList:[] as Array<object>,
    fixedAssetGroupsCountLinks:0 as number,
  }),
  getters: {
  },
  actions: {
    clearFormulario() {
      this.formulario = <IFixedAssetForm>{
        id: null,
        code: null,
        name: null,
        fixed_asset_group_id: null
      }
    },
    clonarForm() {
      for (const key in this.formulario) {
        this.fixedAssetData[key] = this.formulario[key]
      }
    },
    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns.post(
        'fixedAsset-list',
        params,
      ).then(result => {
        this.loading = false
        this.fixedAssets = result.data.fixedAssets
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
        'fixedAsset-create',
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
        return { status: result.data.code};
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
        'fixedAsset-delete/' + id
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
      if (id !== this.fixedAssetData.id) {
        preload.isLoading = true
        await axiosIns.get(
          `fixedAsset-info/${id}`,
        ).then(async result => {
          preload.isLoading = false
          this.fixedAssetData.id = id
          this.formulario = await result.data.data
          this.clonarForm()
        }).catch(async error => {
          preload.isLoading = false
          console.log(await error)
        })
      } else {
        for (const key in this.fixedAssetData) {
          this.formulario[key] = this.fixedAssetData[key]
        }
      }
    },
    //DATOS PARA LOS SELECTS
    async fetchDataForm(params:object): Promise<void> {
      const preload=  usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .post("fixedAsset-dataForm",params)
        .then((result) => {
          preload.isLoading = false

          this.fixedAssetGroupsList = result.data.fixedAssetGroups_arrayInfo;
          this.fixedAssetGroupsCountLinks = result.data.fixedAssetGroups_countLinks;


        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
        });
    },
    
    

    changeState(objeto: object, estado: number) {
      const preload = usePreloadStore()
      let t = "";
      estado == 0 ? (t = "activar") : (t = "inactivar");
      Swal.fire({
        title: "¿Está seguro de " + t + " el Registro seleccionado?",
        showDenyButton: true,
        confirmButtonText: "Si",
        denyButtonText: `No`,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          preload.isLoading = true
          axiosIns.post("fixedAsset-changeState", objeto)
            .then((res) => {
              preload.isLoading = false
              if (res.data.code == 200) {
                toast.toast("Éxito", res.data.msg, "success");
              }
              if (res.data.code == 500) {
                toast.toast("Éxito", res.data.msg, "danger");
              }
            });
        } else {
          t == 'activar' ? objeto.state = 0 : objeto.state = 1;
        } 
      });
    },

    // SELECTS INFINITES
    async fetchSelect2FixedAsset(params: object): Promise<number> {
      this.loading = true
      const response = await axiosIns
        .post("fixedAsset-select2InfiniteList", params)
        .then((result) => {
          this.loading = false
          return this.fixedAssetGroupsList = result.data.fixedAssetGroups_arrayInfo;
        })
        .catch(async (error) => {
          this.loading = false
          console.log(await error);
          return 0
        });
      return response
    },




  },
})
