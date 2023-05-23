import axiosIns from "@/plugins/axios";
import { defineStore } from "pinia";
import { useToast } from "@/composables/useToast";
import ILedgerAccountList from "@/interfaces/Admin/LedgerAccount/ILedgerAccountList";
import ILedgerAccountCategoryList from "@/interfaces/Admin/LedgerAccount/ILedgerAccountCategoryList";
import ILedgerAccountBalanceList from "@/interfaces/Admin/LedgerAccount/ILedgerAccountBalanceList";
import ILedgerAccountForm from "@/interfaces/Admin/LedgerAccount/ILedgerAccountForm";
import { AuthenticationStore } from '@/stores/Authentication';
import { usePreloadStore } from '@/stores/usePreloadStore';
const authentication = AuthenticationStore();
const toast = useToast();

export const useLedgerAccountStore = defineStore("useLedgerAccountStore", {
  state: () => ({
    loading: true as boolean,
    ledgerAccounts: [] as Array<ILedgerAccountList>,
    ledgerAccountCategory: [] as Array<ILedgerAccountCategoryList>,
    ledgerAccountBalance: [] as Array<ILedgerAccountBalanceList>,
    clase: {} as object,
    group: {} as object,
    account: {} as object,
    subAccount: {} as object,
    auxiliary: {} as object,
    subAuxiliary: {} as object,
    typeClick:'' as string,
    titleModal:'' as string,
    titleButton:'' as string,
    codeInitial:null as number|null,
    maxlength:null as number|null,
    minlength:null as number|null,
    routeName:'' as string,
    pathExcel: "" as string,
    formulario: {
      code: "",
      name: "",
      company_id:null
    } as ILedgerAccountForm,
  }),
  getters: {},
  actions: {
    clearFormulario() {
      this.formulario = <ILedgerAccountForm>{
        code: "",
        name: "",
      };
    },

    async fetchAll(companyId:number|string): Promise<void> {
      this.loading = true
      await axiosIns
        .post("/ledgerAccount-list",{companyId:companyId})
        .then((result) => {
          this.loading = false 
          this.ledgerAccounts = result.data.ledgerAccount;
          this.ledgerAccountCategory = result.data.ledgerAccountCategory;
          this.ledgerAccountBalance = result.data.ledgerAccountBalance;
        })
        .catch(async (error) => {
          this.loading = false
          console.log(await error);
        });
    },

    async fetchSave(editRoute:string|null=null,form:object): Promise<object> {
      const preload=  usePreloadStore()
      const peticionRuta = editRoute ?? this.routeName
      const peticionForm = form ?? this.formulario
      preload.isLoading = true
      const response = await axiosIns
        .post(peticionRuta, peticionForm)
        .then(result => {
          preload.isLoading = false 
          if (result.data.data === 401 && result.data.code === 200) {
            return { error: {code:['Codigo ya esta en uso']}, status: 422 };
          }
          if (result.data.code === 200){
            this.fetchAll(peticionForm.company_id)
            toast.toast("Éxito", result.data.message, "success");
          }
          if (result.data.code === 500)
            toast.toast("Error", result.data.message, "danger");
          if (result.data.status === 422) {
            toast.toast("Error", result.data.message, "danger");
            return { error: result.data.errors, status: result.data.status };
          }          
          return { status: result.data.code, formedit:result.data.data };
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log('datadata',error.response)
          return error.response.status;
        });

      return await response;
    },

    async fetchDelete(id: number,routeDelete:string): Promise<number> {
      const preload=  usePreloadStore()
      preload.isLoading = false
      const response = await axiosIns
        .delete(`${routeDelete}/${id}`)
        .then((result) => {
          preload.isLoading = false
          if (result.data.code === 200)
            toast.toast("Éxito", result.data.message, "success");
            this.fetchAll(authentication.company.id)
  
          if (result.data.code === 500)
            toast.toast("Error", result.data.message, "danger");
  
          return result.data.code;
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
          if (error.response.state === 500)
            toast.toast("Error", error.response.data.message, "danger");
  
          return error.response.state;
        });
  
      return await response;
    },
    //excel TABLA
    async excel(params: object): Promise<void> {
      await axiosIns
        .post("/ledgerAccount-excel", params)
        .then((result) => {
          this.pathExcel = result.data.path;
        })
        .catch(async (error) => {
          console.log(await error);
        });
    },
  },
});
