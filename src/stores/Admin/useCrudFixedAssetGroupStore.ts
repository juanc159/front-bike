import axiosIns from '@/plugins/axios'
import { defineStore } from 'pinia'
import { useToast } from '@/composables/useToast'
import { usePreloadStore } from '@/stores/usePreloadStore';
import IFixedAssetGroupForm from '@/interfaces/Admin/FixedAssetGroup/IFixedAssetGroupForm'
import IFixedAssetGroupList from '@/interfaces/Admin/FixedAssetGroup/IFixedAssetGroupList';
import Swal from 'sweetalert2';
const toast = useToast()

export const useCrudFixedAssetGroupStore = defineStore('useCrudFixedAssetGroupStore', {
  state: () => ({
    loading: false as boolean,
    typeAction: "list" as string,
    fixedAssetGroupData: {} as IFixedAssetGroupForm,
    keyList: 0 as number,
    fixedAssetGroups: [] as Array<IFixedAssetGroupList>,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,    
    ledgerAccountGroup: [] as Array<object>,
    lastPage: 0 as number,
    formulario: {
      company_id: null,
      code: null,
      name: null,
      vrBuys_id: null,
      vrBuys_table: null,
      depreciation_id: null,
      depreciation_table: null,
      depreciationExpense_id: null,
      depreciationExpense_table: null,
      fiscalDepreciation_id: null,
      fiscalDepreciation_table: null,
      taxDepreciationExpense_id: null,
      taxDepreciationExpense_table: null,
    } as IFixedAssetGroupForm,

    //selects infinites
    vrBuysList:[] as Array<object>,
    vrBuysCountLinks:0 as number,

    depreciationList:[] as Array<object>,
    depreciationCountLinks:0 as number,

    depreciationExpenseList:[] as Array<object>,
    depreciationExpenseCountLinks:0 as number,

    fiscalDepreciationList:[] as Array<object>,
    fiscalDepreciationCountLinks:0 as number,

    taxDepreciationExpenseList:[] as Array<object>,
    taxDepreciationExpenseCountLinks:0 as number,
  }),
  getters: {
  },
  actions: {
    clearFormulario() {
      this.formulario = <IFixedAssetGroupForm>{
        company_id: null,
        code: null,
        name: null,
        vrBuys_id: null,
        vrBuys_table: null,
        depreciation_id: null,
        depreciation_table: null,
        depreciationExpense_id: null,
        depreciationExpense_table: null,
        fiscalDepreciation_id: null,
        fiscalDepreciation_table: null,
        taxDepreciationExpense_id: null,
        taxDepreciationExpense_table: null,
      }
    },
    clonarForm() {
      for (const key in this.formulario) {
        this.fixedAssetGroupData[key] = this.formulario[key]
      }
    },
    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns.post(
        '/fixedAssetGroup-list',
        params,
      ).then(result => {
        this.loading = false
        this.fixedAssetGroups = result.data.fixedAssetGroups
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
        '/fixedAssetGroup-create',
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
        '/fixedAssetGroup-delete/' + id
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
      if (id !== this.fixedAssetGroupData.id) {
        preload.isLoading = true
        await axiosIns.get(
          `/fixedAssetGroup-info/${id}`,
        ).then(async result => {
          preload.isLoading = false
          this.fixedAssetGroupData.id = id
          this.formulario = await result.data.data
          this.clonarForm()
        }).catch(async error => {
          preload.isLoading = false
          console.log(await error)
        })
      } else {
        for (const key in this.fixedAssetGroupData) {
          this.formulario[key] = this.fixedAssetGroupData[key]
        }
      }
    },
    //DATOS PARA LOS SELECTS
    async fetchDataForm(): Promise<void> {
      const preload=  usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .get("/fixedAssetGroup-dataForm")
        .then((result) => {
          preload.isLoading = false

          this.vrBuysList = result.data.arrayInfo;
          this.vrBuysCountLinks = result.data.countLinks;

          this.depreciationList = result.data.arrayInfo;
          this.depreciationCountLinks = result.data.countLinks;

          this.depreciationExpenseList = result.data.arrayInfo;
          this.depreciationExpenseCountLinks = result.data.countLinks;

          this.fiscalDepreciationList = result.data.arrayInfo;
          this.fiscalDepreciationCountLinks = result.data.countLinks;

          this.taxDepreciationExpenseList = result.data.arrayInfo;
          this.taxDepreciationExpenseCountLinks = result.data.countLinks;

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
          axiosIns.post("/fixedAssetGroup-changeState", objeto)
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
          t == 'activar' ? objeto.inUse = 0 : objeto.inUse = 1;
        } 
      });
    },

    // SELECTS INFINITES
    async fetchLedgerAccountListVrBuys(params: object): Promise<number> {
      this.loading = true
      const response = await axiosIns
        .post("/fixedAssetGroup-listAuxiliaryAndSubAuxiliary", params)
        .then((result) => {
          this.loading = false
          return this.vrBuysList = result.data.arrayInfo;
        })
        .catch(async (error) => {
          this.loading = false
          console.log(await error);
          return 0
        });
      return response
    },

    async fetchLedgerAccountListDepreciation(params: object): Promise<number> {
      this.loading = true
      const response = await axiosIns
        .post("/fixedAssetGroup-listAuxiliaryAndSubAuxiliary", params)
        .then((result) => {
          this.loading = false
          return this.depreciationList = result.data.arrayInfo;
        })
        .catch(async (error) => {
          this.loading = false
          console.log(await error);
          return 0
        });
      return response
    },

    async fetchLedgerAccountListDepreciationExpense(params: object): Promise<number> {
      this.loading = true
      const response = await axiosIns
        .post("/fixedAssetGroup-listAuxiliaryAndSubAuxiliary", params)
        .then((result) => {
          this.loading = false
          return this.depreciationExpenseList = result.data.arrayInfo;
        })
        .catch(async (error) => {
          this.loading = false
          console.log(await error);
          return 0
        });
      return response
    },

    async fetchLedgerAccountListFiscalDepreciation(params: object): Promise<number> {
      this.loading = true
      const response = await axiosIns
        .post("/fixedAssetGroup-listAuxiliaryAndSubAuxiliary", params)
        .then((result) => {
          this.loading = false
          return this.fiscalDepreciationList = result.data.arrayInfo;
        })
        .catch(async (error) => {
          this.loading = false
          console.log(await error);
          return 0
        });
      return response
    },

    async fetchLedgerAccountListTaxDepreciationExpense(params: object): Promise<number> {
      this.loading = true
      const response = await axiosIns
        .post("/fixedAssetGroup-listAuxiliaryAndSubAuxiliary", params)
        .then((result) => {
          this.loading = false
          return this.taxDepreciationExpenseList = result.data.arrayInfo;
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
