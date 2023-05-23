import axiosIns from "@/plugins/axios";
import Swal from 'sweetalert2';
import { defineStore } from "pinia";
import { useToast } from "@/composables/useToast";
import { usePreloadStore } from '@/stores/usePreloadStore';
const toast = useToast();

export const useSelfWithholdingStore = defineStore("useSelfWithholdingStore", {
  state: () => ({
    loading: false as boolean,
    typeAction: "list" as string,
    keyList: 0 as number,
    selfWithholdings: [] as Array<{}>,
    currentPage: 1 as number,
    lastPage: 0 as number,
    totalData: 0 as number,
    totalPage: 0 as number,
    links: 0 as number,
    /* 
    paymentMethods: [] as Array<IPaymentMethodsList>,
    relatedTos: [] as Array<IRelatedTosList>,
    ledgerAccountAuxiliar: [] as Array<object>,
    generalData: {} as IFormGeneral,
    routeName: '' as string,*/
    formulario: {
    }, 
  }),
  getters: {},
  actions: {
    /* clearFormulario() {
      this.formulario = <IFormGeneral>{
        company_id: null,
        code: null,
        name: "",
        related_to_id: null,
        ledger_account_auxiliary_id: null,
        payment_method_id: null,
      };
    },

    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns
        .post("/general-list", params)
        .then((result) => {
          this.loading = false
          this.generals = result.data.generals;
          this.paymentMethods = result.data.paymentMethod;
          this.relatedTos = result.data.relatedTo;
          this.ledgerAccountAuxiliar = result.data.ledgerAccountAuxiliar;
          this.totalData = result.data.totalData
          this.totalPage = result.data.totalPage
          this.currentPage = result.data.currentPage
          this.lastPage = result.data.lastPage
        })
        .catch(async (error) => {
          this.loading = true
          console.log(await error);
        });
    },

    async fetchSave(): Promise<object> {
      const preload=  usePreloadStore()
      preload.isLoading = true
      const response = await axiosIns
        .post('/general-create', this.formulario)
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
        this.generalData[key] = this.formulario[key]
      }
    },

    async fetchInfoGeneral(id: number): Promise<void> {
      const preload=  usePreloadStore()
      // if (id !== this.generalData.id) {
        preload.isLoading = true
        await axiosIns
          .get(`/general-info/${id}`)
          .then(async (result) => {
            preload.isLoading = false
            this.formulario = await result.data.data;
            this.clonarForm()
            this.generalData.id = id
          })
          .catch(async (error) => {
            preload.isLoading = false
            console.log(await error);
          });
      // } else {
      //   for (const key in this.generalData) {
      //     this.formulario[key] = this.generalData[key]
      //   }
      // }
    },

    changeState(objeto: object, estado: number) {
      const preload=  usePreloadStore()
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
          axiosIns.post("/general-changeState", objeto)
            .then((res) => {
              preload.isLoading = false
              if (res.data.code == 200) {
                toast.toast("Éxito", res.data.msg, "success");
              }
              if (res.data.code == 500) {
                toast.toast("Éxito", res.data.msg, "error");
              }
            });
        } else {
          t == 'activar' ? objeto.in_use = 0 : objeto.in_use = 1;
        }

      });
    },
    async fetchLedgerAccountAuxiliaryList(params: object): Promise<number> {
      this.loading = true
      const response = await axiosIns
        .post("/ledgerAccount-auxiliary-list", params)
        .then((result) => {
          this.loading = false
          this.ledgerAccountAuxiliar = result.data.ledgerAccountAuxiliar;
          return result.data.data?.links.length - 2
        })
        .catch(async (error) => {
          this.loading = false
          console.log(await error);
          return 0
        });
      return response
    },
    async fetchLedgerPaymentMethodsList(params: object): Promise<Array<object>> {
      this.loading = true
      const respuesta = await axiosIns
        .post("/paymentMethods-list", params)
        .then((result) => {
          this.loading = false
          return this.paymentMethods = result.data.paymentMethods;
        })
        .catch(async (error) => {
          this.loading = false
          console.log(await error);
        });
      return respuesta
    }, */
  },
});
