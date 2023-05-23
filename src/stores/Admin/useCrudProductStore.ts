import { defineStore } from 'pinia'
import { ref } from "vue";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

import type IProductForm from "@/interfaces/Admin/Product/IProductForm";
import axiosIns from "@/plugins/axios";
import { useToast } from "@/composables/useToast";
import type IProductList from "@/interfaces/Admin/Product/IProductList";
import { usePreloadStore } from '@/stores/usePreloadStore';
import { useCrudQuoteStore } from '@/stores/Admin/useCrudQuoteStore';

const toast = useToast();

export const useCrudProductStore = defineStore('useCrudProductStore', {
  state: () => ({
    openModal: false as boolean,
    typeAction: "list" as string,
    keyList: 0 as number,
    loading: true as boolean,
    show: false as boolean,
    products: [] as Array<object>,
    showModalStoreProduct: false as boolean,
    formulario: ref<IProductForm>({
      typeProduct_id: 1,
      company_id: null,
      code: null,
      ivaIncluded: null,
      name: null,
      price: null,
      taxCharge_id: null,
      unitOfMeasurement_id: null,
      unitOfMeasurement: null,
      factoryReference: null,
      barcode: null,
      description: null,
      taxClassification_id: null,
      withholdingTaxes_id: null,
      valueInpoconsumo: null,
      applyConsumptionTax: null,
      model: null,
      tariffCode: null,
      mark: null,
    }),
    currentPage: ref<number>(1),
    totalCompanies: ref<number>(0),
    totalPage: ref<number>(0),
    lastPage: 0 as number,
    totalData: ref<number>(0),
    typeProducts: [] as Array<object>,
    taxCharges: [] as Array<object>,
    taxClassifications: [] as Array<object>,
    withholdingTaxes: [] as Array<object>,
    arrayImages: [] as Array<object>,
    pathExcel: "" as string,
    searchProduct: {} as object,
    //import
    fileExcel: null as File | null,
    errorsImport: [] as Array<object>,
    formImport: {} as object
  }),
  //persist: true,
  getters: {
  },
  actions: {
    clearFormulario() {
      this.formulario = <IProductForm>({
        typeProduct_id: 1,
        company_id: null,
        code: null,
        ivaIncluded: null,
        name: null,
        price: null,
        taxCharge_id: null,
        unitOfMeasurement_id: null,
        unitOfMeasurement: null,
        factoryReference: null,
        barcode: null,
        description: null,
        taxClassification_id: null,
        withholdingTaxes_id: null,
        valueInpoconsumo: null,
        applyConsumptionTax: null,
        model: null,
        tariffCode: null,
        mark: null,
      });
    },
    /****** listar productos ******/
    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns
        .post("/product-list", params)
        .then((result) => {
          this.loading = false
          this.products = result.data.products;
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
    async fetchDataForm(company_id: number | string): Promise<void> {
      // const preload = usePreloadStore()
      // preload.isLoading = true
      await axiosIns
        .post("/product-dataForm", { company_id: company_id })
        .then((result) => {
          // preload.isLoading = false
          this.typeProducts = result.data.typeProducts;
          this.taxCharges = result.data.taxCharges;
          this.withholdingTaxes = result.data.withholdingTaxes;
          this.taxClassifications = result.data.taxClassifications;
        })
        .catch(async (error) => {
          // preload.isLoading = false
          console.log(await error);
        });
    },

    async fetchSave(): Promise<object> {
      const formData = new FormData();
      for (const key in this.formulario) formData.append(key, this.formulario[key]);

      formData.append("cantImageProducts", String(this.arrayImages.length));
      this.arrayImages.forEach((element, key) => {
        formData.append("imageProduct" + key, element.imageFile);

        formData.append("imageProduct_id" + key, String(element.id));
        formData.append("imageProduct_delete" + key, String(element.delete));
      });

      const preload = usePreloadStore()
      preload.isLoading = true
      const response = await axiosIns
        .post("/product-create", formData)
        .then(async (result) => {
          preload.isLoading = false
          if (result.data.code === 200) {
            toast.toast("Éxito", result.data.message, "success");
            if(this.openModal){
              const quoteStore = useCrudQuoteStore()
              await quoteStore.fetchProductList({
                company_id: this.formulario.company_id,
              })
            }
            this.openModal = false
          }

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
        .delete(`/product-delete/${id}`)
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
    async fetchInfoProduct(id: number): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .get(`/product-info/${id}`)
        .then(async (result) => {
          preload.isLoading = false
          this.formulario = await result.data.data;
          this.arrayImages = await result.data.arrayImages;
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
        .post("/product-excel", params)
        .then((result) => {
          preload.isLoading = false
          this.pathExcel = result.data.path;
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
          axiosIns.post("/product-changeState", objeto)
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

    async importExcel(): Promise<object> {
      if (this.fileExcel !== null) {
        const preload = usePreloadStore()
        const formData = new FormData();
        for (const key in this.formulario) formData.append(key, this.formulario[key]);
        formData.append('fileExcel', this.fileExcel);

        return await axiosIns.post('/product-importExcel', formData
        ).then(result => {
          preload.isLoading = false
          console.log("result", result.data);
          if (result.data.code === 200) {
            toast.toast("Éxito", result.data.message, "success");
          }
          if (result.data.code === 500)
            toast.toast("Error", result.data.message, "danger");
          if (result.data.code === 422) {
            toast.toast("Error", result.data.message, "danger");

            this.errorsImport = result.data.errorsImport;
            console.log("this.errorsImport", this.errorsImport);
            return { status: result.data.code };
          }
          return { status: result.data.code, formedit: result.data.data };
        }).catch(async error => {
          preload.isLoading = false
          console.log('datadata', error.response)
          return error.response.status;
        })
      }
      return {}
    }
  },
})
