import axiosIns from '@/plugins/axios';
import { defineStore } from 'pinia';
import { useToast } from '@/composables/useToast';
import { usePreloadStore } from '@/stores/usePreloadStore';
import ICreditNoteForm from '@/interfaces/Admin/Invoice/ICreditNoteForm';
const toast = useToast();

export const useCrudNoteCreditStore = defineStore('useCrudNoteCreditStore', {
  state: () => ({
    loading: false as boolean,
    showInvoice: false as boolean,
    typeAction: "form" as string,
    invoicesList_arrayInfo:[] as Array<object>,
    invoicesList_countLinks:0 as number,
    typesCreditNoteList_countLinks:0 as number,
    typesCreditNoteList_arrayInfo:[] as Array<object>,
    dianReasons_arrayInfo:[] as Array<object>,
    keyList: 0 as number,
    formulario: {
      invoice_id: null,
      types_credit_note_id: null,
      reason_dian_id:  null,
      cuaf: null,
    } as ICreditNoteForm ,
  }),
  getters: {
  },
  actions: {


    async fetchSave(): Promise<object> {      
      const formData = new FormData();
      for (const key in this.formulario) formData.append(key, this.formulario[key]);
      const preload = usePreloadStore();
      preload.isLoading = true;
      const response = await axiosIns.post(
        '/creditNote-create',
        formData,
      ).then(result => {
        preload.isLoading = false
        if (result.data.code === 200) {
          this.formulario = result.data.data
          // this.clearFormulario()
          toast.toast("Éxito", result.data.message, "success");
        }
        if (result.data.code === 500)
          toast.toast("Error", result.data.message, "danger");
        if (result.data.code === 205){
          toast.toast("Error", result.data.message, "danger");}
        if (result.data.status === 422) {
          toast.toast("Error", result.data.message, "danger");
          return { error: result.data.errors, status: result.data.status };
        }
        return { status: result.data.code };
      }).catch(async error => {
        preload.isLoading = false
        if (error.response.status === 500)
          toast.toast('Error', error.response.data.message, 'danger')
        console.log(await error)
        return { status: error.response.status };
      })

      return await response
    },

    async fetchDataForm(company_id: number | string): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .post("/creditNote-dataForm",{company_id:company_id})
        .then((result) => {
          preload.isLoading = false
          this.invoicesList_arrayInfo = result.data.invoicesList_arrayInfo;
          this.invoicesList_countLinks = result.data.invoicesList_countLinks;

          this.typesCreditNoteList_arrayInfo = result.data.typesCreditNoteList_arrayInfo;
          this.typesCreditNoteList_countLinks = result.data.typesCreditNoteList_countLinks;

          this.dianReasons_arrayInfo = result.data.dianReasons_arrayInfo.data;
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
        });
    },

    async fetchInvoiceSelect(params: object): Promise<Array<object>> {
      this.loading = true
      const respuesta = await axiosIns
        .post("/invoiceSale-select2", params)
        .then((result) => {
          this.loading = false;
          return this.invoicesList_arrayInfo = result.data.invoicesList_arrayInfo;
        })
        .catch(async (error) => {
          this.loading = false
          console.log(await error);
        });
      return respuesta
    },

    async fetchTypesCreditNoteSelect(params: object): Promise<Array<object>> {
      this.loading = true
      const respuesta = await axiosIns
        .post("/invoiceSale-select2", params)
        .then((result) => {
          this.loading = false;
          return this.invoicesList_arrayInfo = result.data.invoicesList_arrayInfo;
        })
        .catch(async (error) => {
          this.loading = false
          console.log(await error);
        });
      return respuesta
    },
  },
})