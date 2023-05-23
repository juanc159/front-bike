import axiosIns from '@/plugins/axios';
import { defineStore } from 'pinia';
import { useToast } from '@/composables/useToast';
import IInvoiceList from '@/interfaces/Admin/Invoice/IInvoiceList';
import { usePreloadStore } from '@/stores/usePreloadStore';
import IInvoiceForm from '@/interfaces/Admin/Invoice/IInvoiceForm';
const toast = useToast();

export const useCrudInvoiceStore = defineStore('useCrudInvoiceStore', {
  state: () => ({
    controlFunction: 0 as number,
    loading: false as boolean,
    showInvoice: false as boolean|string,
    typeAction: "list" as string,
    invoiceData: {} as IInvoiceForm,
    keyList: 0 as number,
    invoices: [] as Array<IInvoiceList>,
    currencys: [] as Array<object>,
    taxCharge: [] as Array<object>,
    withholdingTaxe: [] as Array<object>,
    arrayIva: [] as Array<object>,
    arrayWithholdingTaxe: [] as Array<object>,
    products: [] as Array<object>,
    errorsArrayProduct: [] as Array<object>,
    errorsArrayWayToPay: [] as Array<object>,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
    pathExcel: "" as string,
    campDisabledAutomaticNumbering: true as boolean | number,
    searchInvoice: {},
    formulario: {
      id: null,
      typesReceiptInvoice_id: null,
      customer_id: null,
      seller_id: null,
      currency_id: null,
      date_elaboration: '',
      observation: '',
      number: 0,
      attachFile: null,
    } as IInvoiceForm,
    arrayWayToPay: [] as Array<object>,
    arrayProducts: [] as Array<object>,

    customers_arrayInfo: [] as Array<object>,
    customers_countLinks: 0 as number,
    userSeller_arrayInfo: [] as Array<object>,
    userSeller_countLinks: 0 as number,
    typesReceiptInvoices_arrayInfo: [] as Array<object>,
    typesReceiptInvoices_countLinks: 0 as number,
    products_arrayInfo: [] as Array<object>,
    products_countLinks: 0 as number,
    arrayInfo: [] as Array<object>,
    countLinks: 0 as number,

  }),
  getters: {
  },
  actions: {
    clearFormulario() {
      this.formulario = <IInvoiceForm>{
        id: null,
        typesReceiptInvoice_id: null,
        customer_id: null,
        seller_id: null,
        currency_id: null,
        date_elaboration: '',
        observation: '',
        number: 0,
        attachFile: null,
      }
      this.arrayWayToPay = [];
      this.arrayProducts = [];
      this.arrayIva = [];
      this.arrayWithholdingTaxe = [];
    },
    clonarForm() {
      for (const key in this.formulario) {
        this.invoiceData[key] = this.formulario[key]
      }
    },
    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns.post(
        '/invoiceSale-list',
        params,
      ).then(result => {
        this.loading = false
        this.invoices = result.data.invoices
        this.totalData = result.data.totalData
        this.totalPage = result.data.totalPage
        this.currentPage = result.data.currentPage
        this.lastPage = result.data.lastPage
      }).catch(async error => {
        this.loading = false
        console.log(await error)
      })
    },

    //DATOS PARA LOS SELECTS
    async fetchDataForm(company_id: number | string): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .post("/invoiceSale-dataForm", { company_id: company_id })
        .then((result) => {
          preload.isLoading = false
          this.currencys = result.data.currencys;

          this.customers_arrayInfo = result.data.customers_arrayInfo;
          this.customers_countLinks = result.data.customers_countLinks;

          this.userSeller_arrayInfo = result.data.userSeller_arrayInfo;
          this.userSeller_countLinks = result.data.userSeller_countLinks;

          this.typesReceiptInvoices_arrayInfo = result.data.typesReceiptInvoices_arrayInfo;
          this.typesReceiptInvoices_countLinks = result.data.typesReceiptInvoices_countLinks;

          this.products_arrayInfo = result.data.products_arrayInfo;
          this.products_countLinks = result.data.products_countLinks;

          this.arrayInfo = result.data.arrayInfo;
          this.countLinks = result.data.countLinks;

          this.taxCharge = result.data.taxCharge;
          this.withholdingTaxe = result.data.withholdingTaxe;
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
        });
    },

    async fetchSave(): Promise<object> {
      const formData = new FormData();
      for (const key in this.formulario) formData.append(key, this.formulario[key]);
      this.formulario.arrayProducts = this.arrayProducts;
      this.formulario.arrayWayToPay = this.arrayWayToPay;
      this.formulario.arrayIva = this.arrayIva;
      this.formulario.arrayWithholdingTaxe = this.arrayWithholdingTaxe;
      formData.append('arrayProducts', JSON.stringify(this.formulario.arrayProducts));
      formData.append('arrayWayToPay', JSON.stringify(this.formulario.arrayWayToPay));
      formData.append('arrayIva', JSON.stringify(this.formulario.arrayIva));
      formData.append('arrayWithholdingTaxe', JSON.stringify(this.formulario.arrayWithholdingTaxe));
      const preload = usePreloadStore();
      preload.isLoading = true;
      const response = await axiosIns.post(
        '/invoiceSale-create',
        formData,
      ).then(result => {
        preload.isLoading = false
        if (result.data.code === 200) {
          this.formulario = result.data.data
          this.clonarForm()
          // this.clearFormulario()
          toast.toast("Éxito", result.data.message, "success");
        }
        if (result.data.code === 500)
          toast.toast("Error", result.data.message, "danger");
        if (result.data.code === 205) {
          toast.toast("Error", result.data.message, "danger");
        }
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

    //ADD FORMA DE PAGO 
    async addWayToPay(): Promise<void> {
      this.errorsArrayWayToPay.push({ ledgerAccount_id: "", amount: "" });
      this.arrayWayToPay.push({
        id: null,
        ledgerAccount_id: null,
        amount: null,
        delete: null,
      });
    },
    //ELIMINAR FORMA DE PAGO 
    deleteWayToPay(pos: number, item: object) {
      if (item.id) {
        let wayToPay = this.arrayWayToPay.find((ele) => ele.id === item.id);
        wayToPay.delete = "delete";
        wayToPay.amount = '0';
      } else {
        this.arrayWayToPay.splice(pos, 1);
      }
    },
    //ADD PRODUCTO 
    async addArrayProducts(): Promise<void> {
      this.errorsArrayProduct.push({ product_id: "", quantity: "", unit_value: "", discount_rate: "", tax_charge: "", withholding_tax: "", invoice_id: "", value_total: "" });
      this.arrayProducts.push({
        id: null,
        delete: null,
      });
    },
    //ELIMINAR PRODUCTO
    deleteArrayProducts(pos: number, item: object) {
      if (item.id) {
        let product = this.arrayProducts.find((ele) => ele.id === item.id);
        product.delete = "delete";
        product.quantity = "0";
        product.unit_value = "0";
        product.discount_rate = "0";
      } else {
        this.arrayProducts.splice(pos, 1);
      }
    },
    //LISTA DE PRODUCTOS PARA SELECT2 INFINITE
    async fetchProductList(params: object): Promise<Array<object>> {
      this.loading = true
      const respuesta = await axiosIns
        .post("/product-select2", params)
        .then((result) => {
          this.loading = false;
          return this.products_arrayInfo = result.data.products_arrayInfo;
        })
        .catch(async (error) => {
          this.loading = false
          console.log(await error);
        });
      return respuesta
    },
    //ELIMINAR INVOICE
    async fetchDelete(id: number): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns.delete(
        '/invoiceSale-delete/' + id
      ).then(result => {
        preload.isLoading = false
        toast.toast('Éxito', result.data.message, 'success')

      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
    },
    //INFORMACION PARA EDITAR
    async fetchInfoInvoice(id: number): Promise<void> {
      const preload = usePreloadStore()
      //if (id !== this.thirdData.id) {
      preload.isLoading = true
      await axiosIns
        .get(`/invoiceSale-info/${id}`)
        .then(async (result) => {
          preload.isLoading = false
          this.formulario = await result.data.data;
          this.arrayWayToPay = result.data.data.invoice_payment_method;
          this.arrayProducts = result.data.data.invoice_products;
          this.clonarForm();
          this.errorsArrayProduct = [];
          this.errorsArrayWayToPay = [];
          this.arrayProducts.forEach((element) => {
            this.errorsArrayProduct.push({
              product_id: "",
              quantity: "",
              unit_value: "",
              discount_rate: "",
              tax_charge: "",
              withholding_tax: "",
              invoice_id: "",
              value_total: ""
            });
          });
          this.arrayWayToPay.forEach((element) => {
            this.errorsArrayWayToPay.push({
              ledgerAccount_id: "",
              amount: ""
            });
          });
          this.invoiceData.id = id;
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
        });
      /* } else {
        for (const key in this.thirdData) {
          this.formulario[key] = this.thirdData[key];
        }
      } */
    },
    //excel TABLA
    async excel(params: object): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .post("/invoiceSale-excel", params)
        .then((result) => {
          preload.isLoading = false
          this.pathExcel = result.data.path;
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
        });
    },
    //NUMERO AUTOMATICO
    async numberIncrementInvoice(id: number, isPreload: boolean = true): Promise<void> {
      const preload = usePreloadStore();
      if (isPreload)  preload.isLoading = true;
      await axiosIns.get(`/invoiceSale-automaticNumbering/${id}`)
        .then((result) => {
          if (isPreload) preload.isLoading = false
          this.formulario.number = result.data.typesReceiptInvoices.prefix + (Number(result.data.typesReceiptInvoices.initialNumbering) + Number(result.data.typesReceiptInvoices.invoices_count));
          this.campDisabledAutomaticNumbering = result.data.typesReceiptInvoices.automaticNumbering;
        })
        .catch(async (error) => {
          if (isPreload) preload.isLoading = false
          console.log(await error);
        });
    },
    //LISTA DE TIPOS PARA SELECT2 INFINITE
    async fetchTypeReceipInvoicetList(params: object): Promise<Array<object>> {
      this.loading = true
      const respuesta = await axiosIns
        .post("/invoice-select2", params)
        .then((result) => {
          this.loading = false;
          return this.typesReceiptInvoices_arrayInfo = result.data.typesReceiptInvoices_arrayInfo;
        })
        .catch(async (error) => {
          this.loading = false
          console.log(await error);
        });
      return respuesta
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
    //LISTA DE VENDEDOR PARA SELECT2 INFINITE
    async fetchSellerOfUserList(params: object): Promise<Array<object>> {
      this.loading = true
      const respuesta = await axiosIns
        .post("/user-select2", params)
        .then((result) => {
          this.loading = false;
          return this.userSeller_arrayInfo = result.data.userSeller_arrayInfo;
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