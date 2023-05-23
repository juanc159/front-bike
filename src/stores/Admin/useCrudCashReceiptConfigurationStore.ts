import { defineStore } from 'pinia'
import { ref } from "vue";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

import axiosIns from "@/plugins/axios";
import { useToast } from "@/composables/useToast";
import { usePreloadStore } from '@/stores/usePreloadStore';
import ICashReceiptConfigurationList from '@/interfaces/Admin/CashReceiptConfiguration/ICashReceiptConfigurationList';
import ICashReceiptConfigurationForm from '@/interfaces/Admin/CashReceiptConfiguration/ICashReceiptConfigurationForm';
const toast = useToast();

export const useCrudCashReceiptConfigurationStore = defineStore('useCrudCashReceiptConfigurationStore', {
  state: () => ({
    typeAction: "form" as string,
    keyList: 0 as number,
    loading: true as boolean,
    cashReceiptConfigurationData: {},
    formulario: {
      id: null,
      company_id: null,
      code: null,
      title: null,
      description: null,
      printFormat: null,
      manageCostCenters: null,
      isRequired: 1,
      default: null,
      automaticNumbering: null,
      consecutive: null,
      subject: null,
      ledgerAccount_id: null,
      table: null,
    } as ICashReceiptConfigurationForm,
    cashReceiptConfigurations: ref<Array<ICashReceiptConfigurationList>>([]),
    currentPage: ref<number>(1),
    totalCashReceiptConfigurations: ref<number>(0),
    totalPage: ref<number>(0),
    lastPage: 0 as number,
    totalData: ref<number>(0),
    arrayInfo: [] as Array<object>,
    countLinks: 0 as number,
  }),
  //persist: true,
  getters: {
  },
  actions: {
    clearFormulario() {
      this.formulario = <ICashReceiptConfigurationForm>({
        id: null,
        company_id: null,
        code: null,
        title: null,
        description: null,
        printFormat: null,
        manageCostCenters: null,
        isRequired: 1,
        default: null,
        automaticNumbering: null,
        consecutive: null,
        subject: null,
        ledgerAccount_id: null,
        table: null,
      });
    }, 

    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns
        .post("/cashReceiptConfiguration-list", params)
        .then((result) => {
          this.loading = false
          this.cashReceiptConfigurations = result.data.cashReceiptConfigurations;
          this.totalPage = result.data.totalPage;
          this.currentPage = result.data.currentPage;
          this.lastPage = result.data.lastPage
          this.totalData = result.data.totalData
        })
        .catch(async (error) => {
          this.loading = false
          console.log(await error);
        });
    },

    //DATOS PARA LOS SELECTS
    async fetchDataForm(): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .post("/cashReceiptConfiguration-dataForm")
        .then((result) => {
          preload.isLoading = false
          this.arrayInfo = result.data.arrayInfo;
          this.countLinks = result.data.countLinks;
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
        });
    },

    async fetchSave(): Promise<object> {
      const preload = usePreloadStore()
      preload.isLoading = true
      const response = await axiosIns
        .post("/cashReceiptConfiguration-create", this.formulario)
        .then((result) => {
          preload.isLoading = false
          if (result.data.code === 200)
            toast.toast("Éxito", result.data.message, "success");

          if (result.data.code === 500)
            toast.toast("Error", result.data.message, "danger");

          if (result.data.status === 422) {
            toast.toast('Error', result.data.message, 'danger')
            return { error: result.data.errors, status: result.data.status }
          }
          return { status: result.data.code };
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
          if (error.response.state === 500)
            toast.toast("Error", error.response.data.message, "danger");

          return { status: error.response.state };
        });

      return await response;
    },

    async fetchDelete(id: number): Promise<number> {
      const preload = usePreloadStore()
      preload.isLoading = true
      const response = await axiosIns
        .delete(`/cashReceiptConfiguration-delete/${id}`)
        .then((result) => {
          preload.isLoading = false
          if (result.data.code === 200)
            toast.toast("Éxito", result.data.message, "success");

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

    async fetchInfo(id: number): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns.get(
        `/cashReceiptConfiguration-info/${id}`,
      ).then(async result => {
        preload.isLoading = false
        this.cashReceiptConfigurationData.id = id
        this.formulario = await result.data.data
      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
    },

    //METODO DE PAGO
    async fetchLedgerAccountAuxiliaryList(params: object): Promise<number> {
      this.loading = true
      const response = await axiosIns
        .post("/invoice-listAuxiliaryAndSubAuxiliary", params)
        .then((result) => {
          this.loading = false
          return this.arrayInfo = result.data.arrayInfo;
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
