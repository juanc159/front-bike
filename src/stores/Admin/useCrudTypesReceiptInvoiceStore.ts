import ITypesReceiptInvoiceForm from '@/interfaces/Admin/TypesReceiptInvoice/ITypesReceiptInvoiceForm';
import ITypesReceiptInvoiceList from '@/interfaces/Admin/TypesReceiptInvoice/ITypesReceiptInvoiceList'
import axiosIns from '@/plugins/axios';
import { defineStore } from 'pinia'
import Swal from 'sweetalert2';
import { useToast } from "@/composables/useToast";
import { usePreloadStore } from '@/stores/usePreloadStore';
import IChargesAndDiscountsList from '@/interfaces/Admin/TypesReceiptInvoice/IChargesAndDiscountsList';
import IChargesAndDiscountsForm from '@/interfaces/Admin/TypesReceiptInvoice/IChargesAndDiscountsForm';
import IPhoneForm from '@/interfaces/Admin/TypesReceiptInvoice/IPhoneForm';
const toast = useToast();

export const useCrudTypesReceiptInvoiceStore = defineStore('useCrudTypesReceiptInvoiceStore', {
  state: () => ({
    showMainData: true as boolean,
    showAddOnSettings: true as boolean,
    showElectronicBilling: true as boolean,
    showChargesAndDiscounts: true as boolean,
    showChargesAndDiscountsInvoice: true as boolean,
    typeAction: "list" as string,
    loading: false as boolean,
    arrayInfo: [] as Array<object>,
    keyList: 0 as number,
    typesReceiptInvoices: [] as Array<ITypesReceiptInvoiceList>,
    arrayChargesAndDiscounts: [] as Array<IChargesAndDiscountsList>,
    arrayPhone: [] as Array<IPhoneForm>,
    typeReceiptInvoiceData: {} as ITypesReceiptInvoiceForm,
    formulario: {
      id: null,
      company_id: 0,
      inUse: 1,
      voucherCode: null,
      voucherName: null,
      useAsElectronicDocument: 0,
      resolutionNumberDian: null,
      effectiveDate: null,
      validityInMonths_id: null,
      endDateValidity: null,
      prefix: null,
      initialNumbering: null,
      finalNumbering: null,
      nextInvoiceNumber: null,
      automaticNumbering: 0,
      deliveryOrder: 0,
      purchaseOrder: 0,
      includeDecimals: 0,
      activateVendorsByItem: 0,
      enableCrossRemittances: 0,
      discountTypePerItem_id: null,
      LedgerAccountsDiscount_id: null,
      LedgerAccountsGift_id: null,
      LedgerAccountsDiscount_table: null,
      LedgerAccountsGift_table: null,
      reteIva: 0,
      reteIca: 0,
      selfRetaining: 0,
      invoicingIncomeForThirdParties: 0,
      copaysAdvances: 0,
      format_id: 0,
      titleForDisplay: null,
      departament_id: null,
      city_id: null,
      address: null,
      observations: null,
      affair: null,
      attachFile: null,
    } as ITypesReceiptInvoiceForm,
    formChargesAndDiscounts: {
      id: null,
      in_use: 0,
      name: null,
      type_id: null,
      fee: 0,
      ledgerAccount_id: null,
      ledgerAccount_table: null,
    } as IChargesAndDiscountsForm,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    links: 0 as number,
    departaments: [],
    cities: [],
    validityInMonths: [] as Array<object>,
    discountPerItem: [] as Array<object>,
    formatDisplayPrintInvoice: [] as Array<object>,
    typeChargeAndDiscount: [] as Array<object>,
    dataDetailInvoiceAvailable: [] as Array<object>,
    arrayDataDetailInvoiceAvailable: [] as Array<object>,
    pathExcel: "" as string,
  }),
  getters: {
  },
  actions: {
    clearFormulario() {
      this.formulario = <ITypesReceiptInvoiceForm>{
        id: null,
        company_id: 0,
        inUse: 1,
        voucherCode: null,
        voucherName: null,
        useAsElectronicDocument: 0,
        resolutionNumberDian: null,
        effectiveDate: null,
        validityInMonths_id: null,
        endDateValidity: null,
        prefix: null,
        initialNumbering: null,
        finalNumbering: null,
        nextInvoiceNumber: null,
        automaticNumbering: 0,
        deliveryOrder: 0,
        purchaseOrder: 0,
        includeDecimals: 0,
        activateVendorsByItem: 0,
        enableCrossRemittances: 0,
        discountTypePerItem_id: null,
        LedgerAccountsDiscount_id: null,
        LedgerAccountsGift_id: null,
        LedgerAccountsDiscount_table: null,
        LedgerAccountsGift_table: null,
        reteIva: 0,
        reteIca: 0,
        selfRetaining: 0,
        invoicingIncomeForThirdParties: 0,
        copaysAdvances: 0,
        format_id: null,
        titleForDisplay: null,
        departament_id: null,
        city_id: null,
        address: null,
        observations: null,
        affair: null,
        attachFile: null,
      };
    },
    clearFormChargesAndDiscounts() {
      this.formChargesAndDiscounts = <IChargesAndDiscountsForm>{
        id: null,
        in_use: 0,
        name: null,
        type_id: null,
        fee: 0,
        ledgerAccount_id: null,
        ledgerAccount_table: null,
      }
    },
    clearArrays() {
      this.arrayChargesAndDiscounts = [];
      this.arrayPhone = [];
      this.arrayDataDetailInvoiceAvailable = [];
    },

    //LISTA TABLA
    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns
        .post("/invoice-list", params)
        .then((result) => {
          this.loading = false
          this.typesReceiptInvoices = result.data.typesReceiptInvoices;
          this.totalData = result.data.totalData
          this.totalPage = result.data.totalPage
          this.currentPage = result.data.currentPage
          this.links = result.data.data?.links.length - 2
        })
        .catch(async (error) => {
          this.loading = false
          console.log(await error);
        });
    },

    //DATOS PARA LOS SELECTS
    async fetchDataForm(company_id: number | string): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .post("/invoice-dataForm", { company_id: company_id })
        .then((result) => {
          preload.isLoading = false;
          this.departaments = result.data.departaments;
          this.validityInMonths = result.data.validityInMonths;
          this.discountPerItem = result.data.discountPerItem;
          this.formatDisplayPrintInvoice = result.data.formatDisplayPrintInvoice;
          this.typeChargeAndDiscount = result.data.typeChargeAndDiscount;
          this.dataDetailInvoiceAvailable = result.data.dataDetailInvoiceAvailable;
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
        });
    },

    //GUARDAR REGISTROS
    async fetchSave(): Promise<object> {
      const formData = new FormData();
      for (const key in this.formulario) formData.append(key, this.formulario[key]);
      this.formulario.arrayChargesAndDiscounts = this.arrayChargesAndDiscounts;
      this.formulario.arrayPhone = this.arrayPhone;
      this.formulario.arrayDataDetailInvoiceAvailable = this.arrayDataDetailInvoiceAvailable;
      formData.append('arrayChargesAndDiscounts', JSON.stringify(this.formulario.arrayChargesAndDiscounts));
      formData.append('arrayPhone', JSON.stringify(this.formulario.arrayPhone));
      formData.append('arrayDataDetailInvoiceAvailable', JSON.stringify(this.formulario.arrayDataDetailInvoiceAvailable));
      const preload = usePreloadStore()
      preload.isLoading = true;
      console.log('this.formulario', formData);
      const response = await axiosIns
        .post('/invoice-create', formData)
        .then(result => {
          preload.isLoading = false
          if (result.data.code === 200) {
            toast.toast("Éxito", result.data.message, "success");
          }
          if (result.data.code === 500)
            toast.toast("Error", result.data.message, "danger");
          if (result.data.status === 422) {
            toast.toast("Error", result.data.message, "danger");
            return { error: result.data.errors, status: result.data.status };
          }
          return { status: result.data.code, formedit: result.data.data };
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log('datadata', error.response)
          return error.response.status;
        });

      return await response;
    },
    clonarForm() {
      for (const key in this.formulario) {
        this.typeReceiptInvoiceData[key] = this.formulario[key]
      }
    },

    async fetchInfo(id: number): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .get(`/invoice-info/${id}`)
        .then(async (result) => {
          preload.isLoading = false
          this.formulario = await result.data.data;
          this.arrayChargesAndDiscounts = result.data.data.charges_and_discounts_invoices;
          this.arrayPhone = result.data.data.phones_type_receipt_invoice;
          this.arrayDataDetailInvoiceAvailable = result.data.data.detail_invoice_available;

          for (let i = 0; i < this.dataDetailInvoiceAvailable.length; i++) {
            const item = this.dataDetailInvoiceAvailable[i];
            if (this.arrayDataDetailInvoiceAvailable.some(obj => obj.id === item.id)) {
              this.dataDetailInvoiceAvailable.splice(i, 1);
              i--;
            }
          }

          this.clonarForm()
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
          axiosIns.post("/user-changeState", objeto)
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

    deleteArrayChargesAndDiscounts(position: number, id: number | null) {
      if (id) {
        let search = this.arrayChargesAndDiscounts.find(ele => ele.id === id);
        if (search) search.delete = 1;
      } else {
        this.arrayChargesAndDiscounts.splice(position, 1);
      }
    },
    addArrayChargesAndDiscounts() {
      this.arrayChargesAndDiscounts.push({
        id: null,
        in_use: 0,
        name: null,
        type_id: null,
        fee: 0,
        ledgerAccount_id: null,
        ledgerAccount_table: null,
      });
    },
    //AGREGAR TELEFONO
    addFormPhone() {
      this.arrayPhone.push({
        id: null,
        indicative: null,
        phone: null,
        extension: null,
      });
    },
    //ELIMINAR TELEFONO
    deleteFormPhone(pos: number, item: object) {
      if (item.id) {
        let phone = this.arrayPhone.find((ele) => ele.id === item.id);
        phone.delete = "delete";
      } else {
        this.arrayPhone.splice(pos, 1);
      }
    },
    //TRAE CIUDAD
    async getCities(): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .post("/invoice-cities", { departament_id: this.formulario.departament_id })
        .then((result) => {
          this.formulario.city_id = null;
          preload.isLoading = false;
          this.cities = result.data.cities;
        })
        .catch(async (error) => {
          this.formulario.city_id = null;
          preload.isLoading = false
          console.log(await error);
        });
    },
    async fetchLedgerAccountAuxiliaryList(params: object): Promise<number> {
      this.loading = true
      const response = await axiosIns
        .post("/invoice-listAuxiliaryAndSubAuxiliary", params)
        .then((result) => {
          this.loading = false
          this.arrayInfo = result.data.arrayInfo;
          return result.data.countLinks
        })
        .catch(async (error) => {
          this.loading = false
          console.log(await error);
          return 0
        });
      return response
    },
    //excel TABLA
    async excel(params: object): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .post("/invoice-excel", params)
        .then((result) => {
          preload.isLoading = false
          this.pathExcel = result.data.path;
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
        });
    },
    //ELIMINAR REGISTRO
    async fetchDelete(id: number): Promise<number> {
      const preload = usePreloadStore()
      preload.isLoading = true
      const response = await axiosIns
        .delete(`/invoice-delete/${id}`)
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
  },

})
