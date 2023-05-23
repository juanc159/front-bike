import ITypesQuoteForm from '@/interfaces/Admin/TypesQuote/ITypesQuoteForm';
import ITypesQuoteList from '@/interfaces/Admin/TypesQuote/ITypesQuoteList'
import axiosIns from '@/plugins/axios';
import { defineStore } from 'pinia'
import Swal from 'sweetalert2';
import { useToast } from "@/composables/useToast";
import { usePreloadStore } from '@/stores/usePreloadStore';
const toast = useToast();

export const useCrudTypesQuoteStore = defineStore('useCrudTypesQuoteStore', {
  state: () => ({
    showMainData: true as boolean,
    showAddOnSettings: true as boolean,
    showChargesAndDiscounts: true as boolean,
    typeAction: "list" as string,
    loading: false as boolean,
    arrayInfo: [] as Array<object>,
    keyList: 0 as number,
    typesQuotes: [] as Array<ITypesQuoteList>,
    typeQuoteData: {} as ITypesQuoteForm,
    formulario: {
      id: null,
      company_id: 0,
      inUse: 1,
      voucherCode: null,
      voucherName: null,
      initialNumbering: 0,
      proxNumberQuote: null,
      automaticNumbering: 0,
      includeDecimals: 0,
      discountTypePerItem_id: null,
      format_id: null,
      titleForDisplay: null,
      header: null,
      conditionsObservations: null,
      subjectMail: null,
      contentMail: null

    } as ITypesQuoteForm,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    links: 0 as number,

    discountPerItem: [] as Array<object>,
    formatDisplayPrintInvoice: [] as Array<object>,


    dataDetailQuoteAvailable: [] as Array<object>,
    arrayDataDetailQuoteVisualizes: [] as Array<object>,

    detailQuoteAvailables: [] as Array<object>,

    arrayFilesEmail: [] as Array<object>,
    errorsArrayArchive: [] as Array<string>,


    pathExcel: "" as string,
  }),
  getters: {
  },
  actions: {
    clearFormulario() {
      this.formulario = <ITypesQuoteForm>{
        id: null,
        company_id: 0,
        inUse: 1,
        voucherCode: null,
        voucherName: null,
        proxNumberQuote: null,
        initialNumbering: 0,
        automaticNumbering: 0,
        includeDecimals: 0,
        discountTypePerItem_id: null,
        format_id: null,
        titleForDisplay: null,
        header: null,
        conditionsObservations: null,
        subjectMail: null,
        contentMail: null
      };

      this.dataDetailQuoteAvailable = []
      this.arrayDataDetailQuoteVisualizes = []
      this.detailQuoteAvailables.forEach(element => {
        this.dataDetailQuoteAvailable.push(element)
      });
    },

    //LISTA TABLA
    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns
        .post("/typesQuote-list", params)
        .then((result) => {
          this.loading = false
          this.typesQuotes = result.data.typesQuotes;
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
        .post("/typesQuote-dataForm", { company_id: company_id })
        .then((result) => {
          preload.isLoading = false;
          this.discountPerItem = result.data.discountPerItem;
          this.formatDisplayPrintInvoice = result.data.formatDisplayPrintInvoice;
          this.detailQuoteAvailables = result.data.detailQuoteAvailables;
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
      this.formulario.arrayDataDetailQuoteVisualizes = this.arrayDataDetailQuoteVisualizes;
      formData.append('arrayDataDetailQuoteVisualizes', JSON.stringify(this.formulario.arrayDataDetailQuoteVisualizes));

      if (this.arrayFilesEmail.length > 0) {
        formData.append("cantArrayArchivesEmail", String(this.arrayFilesEmail.length));
        this.arrayFilesEmail.forEach((element, key) => {
          formData.append("emailFile" + key, element.imageFile);
          formData.append("emailFile_id" + key, String(element.id));
          formData.append("emailFile_name" + key, String(element.name));
          formData.append("emailFile_delete" + key, String(element.delete));
        });
      }

      const preload = usePreloadStore()
      preload.isLoading = true;
      console.log('this.formulario', formData);
      const response = await axiosIns
        .post('/typesQuote-create', formData)
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
    

    async fetchInfo(id: number): Promise<void> {
      const preload = usePreloadStore() 
      preload.isLoading = true
      await axiosIns
        .get(`/typesQuote-info/${id}`)
        .then(async (result) => {
          preload.isLoading = false
          this.formulario = await result.data.data;
          this.arrayFilesEmail = await result.data.files;
          this.arrayDataDetailQuoteVisualizes = result.data.data.detail_quote_visualizes;

          for (let i = 0; i < this.dataDetailQuoteAvailable.length; i++) {
            const item = this.dataDetailQuoteAvailable[i];
            if (this.arrayDataDetailQuoteVisualizes.some(obj => obj.id === item.id)) {
              this.dataDetailQuoteAvailable.splice(i, 1);
              i--;
            }
          }
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




    //excel TABLA
    async excel(params: object): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .post("/typesQuote-excel", params)
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
        .delete(`/typesQuote-delete/${id}`)
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
