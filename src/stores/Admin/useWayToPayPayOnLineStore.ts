import axiosIns from "@/plugins/axios";
import Swal from 'sweetalert2';
import { defineStore } from "pinia";
import { useToast } from "@/composables/useToast";
import IPayOnLineList from "@/interfaces/Admin/WayToPay/IPayOnLineList";
import IFormPayOnLine from "@/interfaces/Admin/WayToPay/IFormPayOnLine";
import IPaymentMethodsList from "@/interfaces/Admin/WayToPay/IPaymentMethodsList";
import IRelatedTosList from "@/interfaces/Admin/WayToPay/IRelatedTosList";
import { usePreloadStore } from '@/stores/usePreloadStore';
const toast = useToast();

export const useWayToPayPayOnLineStore = defineStore("useWayToPayPayOnLineStore", {
  state: () => ({
    loading: false as boolean,
    typeAction: "list" as string,
    payOnLines: [] as Array<IPayOnLineList>,
    paymentMethods: [] as Array<IPaymentMethodsList>,
    relatedTos: [] as Array<IRelatedTosList>,
    ledgerAccountAuxiliar: [] as Array<object>,
    payOnLineData: {} as IFormPayOnLine,
    keyList: 0 as number,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
    routeName: '' as string,
    formulario: {
      company_id: null,
      code: null,
      name: '',
      related_to_id: 1,
      ledger_account_auxiliary_id: null,
      payment_method_id: null,
    } as IFormPayOnLine,
  }),
  getters: {},
  actions: {
    clearFormulario() {
      this.formulario = <IFormPayOnLine>{
        company_id: null,
        code: null,
        name: "",
        related_to_id: 1,
        ledger_account_auxiliary_id: null,
        payment_method_id: null,
      };
    },

    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns
        .post("/payOnLine-list", params)
        .then((result) => {
          this.loading = false
          this.payOnLines = result.data.payOnLines;
          this.relatedTos = result.data.relatedTo;
          this.totalData = result.data.totalData
          this.totalPage = result.data.totalPage
          this.currentPage = result.data.currentPage
          this.lastPage = result.data.lastPage
        })
        .catch(async (error) => {
          this.loading = false
          console.log(await error);
        });
    },

    async fetchLedgerAccountAuxiliaryList(params: object): Promise<void> {
      this.loading = true
      await axiosIns
        .post("/ledgerAccount-auxiliary-list", params)
        .then((result) => {
          this.loading = false
          this.ledgerAccountAuxiliar = result.data.ledgerAccountAuxiliar;
          // this.ledgerAccountAuxiliar = [...new Set(this.ledgerAccountAuxiliar)];
        })
        .catch(async (error) => {
          this.loading = false
          console.log(await error);
        });
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
    },


    async fetchSave(): Promise<object> {
      const preload = usePreloadStore()
      preload.isLoading = true
      const response = await axiosIns
        .post('/payOnLine-create', this.formulario)
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
        this.payOnLineData[key] = this.formulario[key]
      }
    },

    async fetchInfoGeneral(id: number): Promise<void> {
      const preload = usePreloadStore()
      if (id !== this.payOnLineData.id) {
        preload.isLoading = true
        await axiosIns
          .get(`/payOnLine-info/${id}`)
          .then(async (result) => {
            preload.isLoading = false
            this.formulario = await result.data.data;
            this.clonarForm()
            this.payOnLineData.id = id
          })
          .catch(async (error) => {
            preload.isLoading = false
            console.log(await error);
          });
      } else {
        for (const key in this.payOnLineData) {
          this.formulario[key] = this.payOnLineData[key]
        }
      }
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
          axiosIns.post("/payOnLine-changeState", objeto)
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
          t == 'activar' ? objeto.in_use = 0 : objeto.in_use = 1;
        } 
      });
    },
  },
});
