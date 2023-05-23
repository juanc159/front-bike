import axiosIns from '@/plugins/axios';
import { defineStore } from 'pinia';
import { useToast } from '@/composables/useToast';
import Swal from 'sweetalert2';
import { AuthenticationStore } from '@/stores/Authentication';

import { usePreloadStore } from '@/stores/usePreloadStore';
import ICashReceiptForm from '@/interfaces/Admin/CashReceipt/ICashReceiptForm';
const authentication = AuthenticationStore();

const toast = useToast()

export const useCrudCashReceiptStore = defineStore('useCrudCashReceiptStore', {
  state: () => ({
    loading: false as boolean,
    cashReceiptData: {} as ICashReceiptForm,
    formulario: {
      crConfigurations_id:null,
      company_id:null,
      number:null,
      customer_id:null,
      date_elaboration:null,
      perform_id:null,
      auxSubAux_id:null,
      auxSubAux_table:null,
      currencie_id:null,
      received_value:null,
      observation:null,
    } as ICashReceiptForm,
    formularioPdf:{},
    formArchive:{
      name:'',
      archive:File
    },
    typeAction: "list" as string,
    third_customer:{},
    keyList: 0 as number,
    cashReceipts: [] as Array<{}>,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
    arrayAdvanced: [] as Array<object>,
    errorsArrayArchive: [] as Array<string>,
    arrayArchives: [] as Array<object>,
    arrayCurrencies: [] as Array<object>,
    arrayPerformA: [] as Array<object>,
    customers_arrayInfo:[] as Array<object>,
    customers_countLinks:0 as number,
    arrayAuxSubAux:[] as Array<object>,
    auxSubAux_countLinks:0 as number,
    cashReceiptConfiguration_arrayInfo:[] as Array<object>,
    cashReceiptConfiguration_countLinks:0 as number,
    arrayAuxSubAuxAvanced:[] as Array<object>,
    auxSubAuxAvanced_countLinks:0 as number,
    numberCumulative:0 as number,
  }),
  getters: {
  },
  actions: {
    clearFormulario() {
      this.formulario = <ICashReceiptForm>{
        crConfigurations_id:null,
        company_id:null,
        number:this.numberCumulative,
        customer_id:null,
        date_elaboration:'',
        perform_id:null,
        auxSubAux_id:null,
        auxSubAux_table:null,
        currencie_id:null,
        received_value:null,
        observation:null,
      }
      this.arrayAdvanced = [];
      this.arrayArchives = [];
    },
    clearFormArchive() {
      this.formArchive = {
        name:'',
        archive:File,
      }
    },
    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns.post(
        '/cashReceipt-list',
        params,
      ).then(result => {
        this.loading = false
        this.cashReceipts = result.data.cashReceipt
        this.totalData = result.data.totalData
        this.totalPage = result.data.totalPage
        this.currentPage = result.data.currentPage
        this.lastPage = result.data.lastPage
        this.formulario.number = Number(result.data.number) + 1;
        this.numberCumulative = Number(result.data.number) + 1;
      }).catch(async error => {
        this.loading = false
        console.log(await error)
      })
    },
    clonarForm() {
      for (const key in this.formulario) {
        this.cashReceiptData[key] = this.formulario[key]
      }
    },
    async fetchSave(): Promise<object> {
      const preload=  usePreloadStore();
      const formData = new FormData();

      for (const key in this.formulario) formData.append(key, this.formulario[key]);
      this.formulario.arrayAdvanced = this.arrayAdvanced;
      formData.append('arrayAdvanced', JSON.stringify(this.formulario.arrayAdvanced));

      formData.append("cantArrayArchives", String(this.arrayArchives.length));  
      this.arrayArchives.forEach((element,key) => {
        formData.append("arrayArchives"+key, element.archive);
        formData.append("arrayArchives_id"+key,String(element.id));
        formData.append("arrayArchives_name"+key,String(element.name));
        formData.append("arrayArchives_delete"+key,String(element.delete));
      });

      preload.isLoading = true
      const response = await axiosIns.post(
        '/cashReceipt-create',
        formData,
      ).then(result => {
        preload.isLoading = false
        if (result.data.code === 200) {
          this.formulario = result.data.data
          this.clonarForm()
          this.clearFormulario()
          toast.toast('Éxito', result.data.message, 'success')
        }

        if (result.data.code === 500)
          toast.toast('Error', result.data.message, 'danger')
        console.log(result.data.status);
        if (result.data.status === 422) {
          toast.toast('Error', result.data.message, 'danger')
          return { error: result.data.errors, status: result.data.status }
        }
        return { status: result.data.code };
      }).catch(async error => {
        preload.isLoading = false
        if (error.response.status === 500)
          toast.toast('Error', error.response.data.message, 'danger')
        console.log(await error)

        return { status: error.response.state };
      })

      return await response
    },
    async fetchDataForm(): Promise<void> {
      const preload=  usePreloadStore()
      const form: object = { company_id: authentication.company.id }
      preload.isLoading = true
      await axiosIns
        .post("/cashReceipt-dataForm", form)
        .then((result) => {
          console.log(result.data)
          preload.isLoading = false
          this.arrayCurrencies = result.data.currencies;
          this.arrayPerformA = result.data.performA;

          this.customers_arrayInfo = result.data.customers_arrayInfo;
          this.customers_countLinks = result.data.customers_countLinks;

          this.arrayAuxSubAux = result.data.arrayAuxSubAux;
          this.auxSubAux_countLinks = result.data.auxSubAux_countLinks; 

          this.arrayAuxSubAuxAvanced = result.data.arrayAuxSubAux;
          this.auxSubAuxAvanced_countLinks = result.data.auxSubAux_countLinks; 

          this.cashReceiptConfiguration_arrayInfo = result.data.cashReceiptConfiguration_arrayInfo;
          this.cashReceiptConfiguration_countLinks = result.data.cashReceiptConfiguration_countLinks; 
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
        });
    },
     //LISTA DE CLIENTES PARA SELECT2 INFINITE
     async fetchCustomerOfThirdList(params: object): Promise<Array<object>> {
      this.loading = true
      const respuesta = await axiosIns
        .post("/third-select2", params)
        .then((result) => {
          this.loading = false;
          return this.customers_arrayInfo = result.data.customers_arrayInfo;
        })
        .catch(async (error) => {
          this.loading = false
          console.log(await error);
        });
      return respuesta
    },
    //METODO DE PAGO
    async fetchLedgerAccountAuxiliaryList(params: object): Promise<number> {
      this.loading = true
      const response = await axiosIns
        .post("/invoice-listAuxiliaryAndSubAuxiliary", params)
        .then((result) => {
          this.loading = false
          return this.arrayAuxSubAux = result.data.arrayInfo;
        })
        .catch(async (error) => {
          this.loading = false
          console.log(await error);
          return 0
        });
      return response
    },
    //CUENTA CONTABLE ARRAYAVANCED
    async fetchLedgerAccountAuxiliaryAvancedList(params: object): Promise<number> {
      this.loading = true
      const response = await axiosIns
        .post("/invoice-listAuxiliaryAndSubAuxiliary", params)
        .then((result) => {
          this.loading = false
          return this.arrayAuxSubAuxAvanced = result.data.arrayInfo;
        })
        .catch(async (error) => {
          this.loading = false
          console.log(await error);
          return 0
        });
      return response
    },
    //TIPO PARA SELECT 2(TABLA->cash_receipt_configurations)
    async cashReceiptConfigurationList(params: object): Promise<number> {
      this.loading = true
      const response = await axiosIns
        .post("/cashReceiptConfiguration-select2", params)
        .then((result) => {
          this.loading = false
          return this.cashReceiptConfiguration_arrayInfo = result.data.cashReceiptConfiguration_arrayInfo;
        })
        .catch(async (error) => {
          this.loading = false
          console.log(await error);
          return 0
        });
      return response
    },
     //ADD ARCHIVO 
     async addArrayArchives(): Promise<void> {
      this.arrayArchives.push({
        id: null,
        name:this.formArchive.name, 
        archive:this.formArchive.archive, 
        delete: null,
      });
      this.clearFormArchive();
    },
    //ELIMINAR ARCHIVO
    deleteArrayArchives(pos: number, item: object) {
      if (item.id) {
        let archive = this.arrayArchives.find((ele) => ele.id === item.id);
        archive.delete = "delete";
      } else {
        this.arrayArchives.splice(pos, 1);
      }
    },
    //ADD AVANZADO 
    async addArrayAdvanced(): Promise<void> {
      this.arrayAdvanced.push({
        id: null,
        delete: null,
      });
    },
    //ELIMINAR AVANZADO
    deleteArrayAdvanced(pos: number, item: object) {
      if (item.id) {
        let advanced = this.arrayAdvanced.find((ele) => ele.id === item.id);
        advanced.delete = "delete";
        advanced.debit = "0";
        advanced.credit = "0";
      } else {
        this.arrayAdvanced.splice(pos, 1);
      }
    },
    //FUNCION EDITAR
    async fetchInfoCashReceipt(id: number): Promise<void> {
      const preload=  usePreloadStore()
      //if (id !== this.cashReceiptData.id) {
        preload.isLoading = true
        await axiosIns.get(
          `/cashReceipt-info/${id}`,
        ).then(async result => {
          console.log('RESULT INFO', result)
          preload.isLoading = false
          this.formulario = await result.data.data
          this.arrayAdvanced = await result.data.data.cash_receipt_advanceds;
          this.arrayArchives = await result.data.data.archives_cashreceipts;
          
          this.clonarForm()
          this.cashReceiptData.id = id
        }).catch(async error => {
          preload.isLoading = false
          console.log(await error)
        })
      /* } else {
        for (const key in this.cashReceiptData) {
          this.formulario[key] = this.cashReceiptData[key]
        }
      } */
    },
    //FUNCION PDF
    async fetchInfoPdf(id: number): Promise<void> {
      const preload=  usePreloadStore()
        preload.isLoading = true
        await axiosIns.get(
          `/cashReceipt-infoPdf/${id}`,
        ).then(async result => {
          console.log('RESULT PDF', result)
          preload.isLoading = false
          this.formularioPdf = await result.data.data
          this.arrayAdvanced = await result.data.data.cash_receipt_advanceds;
          this.arrayArchives = await result.data.data.archives_cashreceipts;
          this.third_customer = await result.data.data.third_customer;
          
          this.clonarForm()
          this.cashReceiptData.id = id
        }).catch(async error => {
          preload.isLoading = false
          console.log(await error)
        });
    },
    //FUNCION IMPRIMIR PDF
    async printPdf(id: number): Promise<void> {
      const preload=  usePreloadStore()
        preload.isLoading = true
        await axiosIns.get(
          `/cashReceipt-pdf/${id}`,
        ).then(async result => {
          preload.isLoading = false;
          if (result.data.code === 200) {
            this.formulario = result.data.data
            toast.toast('Éxito', result.data.message, 'success')
          }  
          if (result.data.code === 500)
            toast.toast('Error', result.data.message, 'danger')
        }).catch(async error => {
          preload.isLoading = false
          console.log(await error)
        });
    },
    //FUNCION ENVIAR E-MAIL-PDF
    async sendMailPdf(): Promise<void> {
      const preload=  usePreloadStore();
      const formData = new FormData();
      for (const key in this.formularioPdf) formData.append(key, this.formularioPdf[key]);
        preload.isLoading = true
        await axiosIns.post(
          '/cashReceipt-sendMailPdf',formData
        ).then(async result => {
          preload.isLoading = false;
          if (result.data.code === 200) {
            this.formulario = result.data.data
            toast.toast('Éxito', result.data.message, 'success')
          }  
          if (result.data.code === 500)
            toast.toast('Error', result.data.message, 'danger')
        }).catch(async error => {
          preload.isLoading = false
          console.log(await error)
        });
    },
    /* async fetchDelete(id: number): Promise<void> {
      const preload=  usePreloadStore()
      preload.isLoading = true
      await axiosIns.delete(
        '/cashReceipt-delete/' + id
      ).then(result => {
        preload.isLoading = false
        toast.toast('Éxito', result.data.message, 'success')

      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
    }, */
  },
})
