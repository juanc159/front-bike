import axiosIns from '@/plugins/axios';
import { defineStore } from 'pinia';
import { useToast } from '@/composables/useToast';
import IQuoteList from '@/interfaces/Admin/Quote/IQuoteList';
import { usePreloadStore } from '@/stores/usePreloadStore';
import IQuoteForm from '@/interfaces/Admin/Quote/IQuoteForm';
import Swal from 'sweetalert2';
import IQuoteFormSearch from '@/interfaces/Admin/Quote/IQuoteFormSearch';
import IFormApproveQuoteToInvoice from '@/interfaces/Admin/Quote/IFormApproveQuoteToInvoice';
const toast = useToast();

export const useCrudQuoteStore = defineStore('useCrudQuoteStore', {
  state: () => ({
    loading: false as boolean,
    openModal: false as boolean,
    selectedQuoteId: null as null| number,
    showCriteriaSearch: false as boolean,
    typeAction: "list" as string,
    quoteData: {} as IQuoteForm,
    keyList: 0 as number,
    quotes: [] as Array<IQuoteList>,
    currencys: [] as Array<object>,
    taxCharge: [] as Array<object>,
    withholdingTaxe: [] as Array<object>,
    arrayIva: [] as Array<object>,
    arrayWithholdingTaxe: [] as Array<object>,
    products: [] as Array<object>,
    errorsArrayProduct: [] as Array<object>,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
    pathExcel: "" as string,
    campDisabledAutomaticNumbering: true as boolean | number,
    searchQuote: {} as IQuoteFormSearch,
    formulario: {
      id: null,
      typesQuote_id: null,
      customer_id: null,
      seller_id: null,
      currency_id: null,
      date_elaboration: '',
      date_expiration: '',
      observation: '',
      number: 0,
    } as IQuoteForm,
    arrayProducts: [] as Array<object>,
    statesQuotes: [] as Array<object>,

    typesQuotes_arrayInfo: [] as Array<object>,
    typesQuotes_countLinks: 0 as number,
    currencies_arrayInfo: [] as Array<object>,
    currencies_countLinks: 0 as number,
    customers_arrayInfo: [] as Array<object>,
    customers_countLinks: 0 as number,
    userSeller_arrayInfo: [] as Array<object>,
    userSeller_countLinks: 0 as number,
    products_arrayInfo: [] as Array<object>,
    products_countLinks: 0 as number,
    arrayInfo: [] as Array<object>,
    countLinks: 0 as number,

    arrayFilesEmail: [] as Array<object>,
    errorsArrayArchive: [] as Array<string>,

  }),
  getters: {
  },
  actions: {
    clearFormulario() {
      this.formulario = <IQuoteForm>{
        id: null,
        typesQuote_id: null,
        customer_id: null,
        seller_id: null,
        currency_id: null,
        date_elaboration: '',
        date_expiration: '',
        observation: '',
        number: 0,
      }
      this.arrayProducts = [];
      this.arrayIva = [];
      this.arrayWithholdingTaxe = [];
      this.arrayFilesEmail = []
    },

    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns.post(
        '/quotes-list',
        params,
      ).then(result => {
        this.loading = false
        this.quotes = result.data.quotes
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
        .post("/quotes-dataForm", { company_id: company_id, inUse: 1 })
        .then((result) => {
          preload.isLoading = false
          this.statesQuotes = result.data.statesQuotes;

          this.typesQuotes_arrayInfo = result.data.typesQuotes_arrayInfo;
          this.typesQuotes_countLinks = result.data.typesQuotes_countLinks;

          this.currencies_arrayInfo = result.data.currencies_arrayInfo;
          this.currencies_countLinks = result.data.currencies_countLinks;

          this.customers_arrayInfo = result.data.customers_arrayInfo;
          this.customers_countLinks = result.data.customers_countLinks;

          this.userSeller_arrayInfo = result.data.userSeller_arrayInfo;
          this.userSeller_countLinks = result.data.userSeller_countLinks;

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
      this.formulario.arrayIva = this.arrayIva;
      this.formulario.arrayWithholdingTaxe = this.arrayWithholdingTaxe;
      formData.append('arrayProducts', JSON.stringify(this.formulario.arrayProducts));
      formData.append('arrayIva', JSON.stringify(this.formulario.arrayIva));
      formData.append('arrayWithholdingTaxe', JSON.stringify(this.formulario.arrayWithholdingTaxe));

      if (this.arrayFilesEmail.length > 0) {
        formData.append("cantArrayArchivesEmail", String(this.arrayFilesEmail.length));
        this.arrayFilesEmail.forEach((element, key) => {
          formData.append("emailFile" + key, element.imageFile);
          formData.append("emailFile_id" + key, String(element.id));
          formData.append("emailFile_name" + key, String(element.name));
          formData.append("emailFile_delete" + key, String(element.delete));
        });
      }


      const preload = usePreloadStore();
      preload.isLoading = true;
      const response = await axiosIns.post(
        '/quotes-create',
        formData,
      ).then(result => {
        preload.isLoading = false
        if (result.data.code === 200) {
          this.formulario = result.data.data
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

    async fetchQuouteToInvoice(form: IFormApproveQuoteToInvoice, isPreload: boolean = true): Promise<object> {
      const formData = new FormData();
      formData.append('quoute_id', form.quoute_id);
      formData.append('typesReceiptInvoice_id', form.typesReceiptInvoice_id);
      formData.append('number', form.number);
      formData.append('arrayWayToPay', JSON.stringify(form.arrayWayToPay));

      const preload = usePreloadStore();
      if (isPreload) preload.isLoading = true;
      const response = await axiosIns.post(
        '/quotes-toInvoice',
        formData,
      ).then(result => {
        if (isPreload) preload.isLoading = false
        if (result.data.code === 200) {
          this.formulario = result.data.data
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
        if (isPreload) preload.isLoading = false
        if (error.response.status === 500)
          toast.toast('Error', error.response.data.message, 'danger')
        console.log(await error)
        return { status: error.response.status };
      })

      return await response
    },



    //ADD PRODUCTO 
    async addArrayProducts(): Promise<void> {
      this.errorsArrayProduct.push({ product_id: "", quantity: "", unit_value: "", discount_rate: "", tax_charge: "", withholding_tax: "", quote_id: "", value_total: "" });
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
    //ELIMINAR 
    async fetchDelete(id: number): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns.delete(
        '/quotes-delete/' + id
      ).then(result => {
        preload.isLoading = false
        toast.toast('Éxito', result.data.message, 'success')

      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
    },
    async changeState(id: number, statesQuotes_id: number): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns.post("/quotes-changeState", { id, statesQuotes_id }).then((res) => {
        preload.isLoading = false
        if (res.data.code == 200) {
          toast.toast("Éxito", res.data.msg, "success");
        }
        if (res.data.code == 500) {
          toast.toast("Éxito", res.data.msg, "danger");
        }
      });
    },
    //INFORMACION PARA EDITAR
    async fetchInfo(id: number): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .get(`/quotes-info/${id}`)
        .then(async (result) => {
          preload.isLoading = false
          this.formulario = await result.data.data;
          this.arrayProducts = result.data.data.quote_products;
          this.arrayFilesEmail = result.data.data.files;
          this.errorsArrayProduct = [];
          this.arrayProducts.forEach((element) => {
            this.errorsArrayProduct.push({
              product_id: "",
              quantity: "",
              unit_value: "",
              discount_rate: "",
              tax_charge: "",
              withholding_tax: "",
              quote_id: "",
              value_total: ""
            });
          });
          this.quoteData.id = id;
          console.log("aaa");

        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
        });
    },
    //excel TABLA
    async excel(params: object): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .post("/quotes-excel", params)
        .then((result) => {
          preload.isLoading = false
          this.pathExcel = result.data.path;
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
    //LISTA DE MONEDAS PARA SELECT2 INFINITE
    async fetchCurrenciesList(params: object): Promise<Array<object>> {
      this.loading = true
      const respuesta = await axiosIns
        .post("/currencies-select2", params)
        .then((result) => {
          this.loading = false;
          return this.currencies_arrayInfo = result.data.currencies_arrayInfo;
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

    //NUMERO AUTOMATICO
    async numberIncrementQuote(id: number) {
      const preload = usePreloadStore();
      preload.isLoading = true;
      await axiosIns.get(`/quotes-automaticNumbering/${id}`)
        .then((result) => {
          preload.isLoading = false
          this.formulario.number = Number(result.data.typesQuote.initialNumbering) + Number(result.data.typesQuote.quotes_count);
          this.campDisabledAutomaticNumbering = result.data.typesQuote.automaticNumbering;
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
        });
    },

    async addArrayArchives(formFile: object): Promise<void> {
      this.arrayFilesEmail.push({
        id: null,
        name: formFile.name,
        imageFile: formFile.imageFile,
        delete: null,
      });
    },
    deleteArrayArchives(pos: number, item: object) {
      if (item.id) {
        let archive = this.arrayFilesEmail.find((ele) => ele.id === item.id);
        archive.delete = "delete";
      } else {
        this.arrayFilesEmail.splice(pos, 1);
      }
    },
  },
})