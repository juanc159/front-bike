import axiosIns from '@/plugins/axios';
import { defineStore } from 'pinia';
import { useToast } from '@/composables/useToast';
import IInvoiceList from '@/interfaces/Admin/Invoice/IInvoiceList';
import { usePreloadStore } from '@/stores/usePreloadStore';
// import IInvoiceForm from '@/interfaces/Admin/Invoice/IInvoiceForm';
const toast = useToast();

export const useCrudNoteDebitStore = defineStore('useCrudNoteDebitStore', {
  state: () => ({
    loading: false as boolean,
    showInvoice: false as boolean,
    typeAction: "form" as string,
    invoicesList_arrayInfo:[] as Array<object>,
    invoicesList_countLinks:0 as number,
    keyList: 0 as number,
  }),
  getters: {
  },
  actions: {
    async fetchDataForm(company_id: number | string): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .post("/debitNote-dataForm",{company_id:company_id})
        .then((result) => {
          preload.isLoading = false
          this.invoicesList_arrayInfo = result.data.invoicesList_arrayInfo;
          this.invoicesList_countLinks = result.data.invoicesList_countLinks;
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
  },
})