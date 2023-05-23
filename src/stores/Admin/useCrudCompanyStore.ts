import { defineStore } from 'pinia'
import { ref } from "vue";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

import type IFormCompany from "@/interfaces/Admin/Company/IFormCompany";
import axiosIns from "@/plugins/axios";
import { useToast } from "@/composables/useToast";
import type ICompanyList from "@/interfaces/Admin/Company/ICompanyList"; 
import {usePreloadStore} from '@/stores/usePreloadStore';
const toast = useToast();

export const useCrudCompanyStore = defineStore('useCrudCompanyStore', {
  state: () => ({ 
    typeAction: "list" as string,
    keyList: 0 as number,
    loading: true as boolean,
    formulario: ref<IFormCompany>({
      user_id: 0,
      name: "",
      email: "",
      nit: "",
      phone: "",
      address: "",
      description: "",
      nameLegalRepresentative: "",
      phoneLegalRepresentative: "",
      startDate: "",
      endDate: "",
      headerReport: "",
      footerReport: "",
      identification_rep: "",
      address_rep: "",
      email_rep: "",
      logo: null,
    }),
    companies: ref<ICompanyList[]>([]),
    currentPage: ref<number>(1),
    totalCompanies: ref<number>(0),
    totalPage: ref<number>(0),
    lastPage: 0 as number,
    totalData: ref<number>(0),
  }),
  //persist: true,
  getters: {
  },
  actions: {
    clearFormulario() {
      this.formulario = <IFormCompany>({
        user_id: 0,
        name: "",
        email: "",
        nit: "",
        phone: "",
        address: "",
        description: "",
        nameLegalRepresentative: "",
        phoneLegalRepresentative: "",
        startDate: "",
        endDate: "",
        headerReport: "",
        footerReport: "",
        identification_rep: "",
        address_rep: "",
        email_rep: "",
        logo: null,
      });
    },
    /****** listar compañias ******/
    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns
        .post("/company-list", params)
        .then((result) => {
          this.loading = false
          this.companies = result.data.companies;
          this.totalCompanies = result.data.totalCompanies;
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

    async fetchSave(): Promise<object> {
      const formData = new FormData();
      for (const key in this.formulario) formData.append(key, this.formulario[key]);

      const preload = usePreloadStore()
      preload.isLoading = true
      const response = await axiosIns
        .post("/company-create", formData)
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
        .delete(`/company-delete/${id}`)
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
    async fetchInfoCompany(id: number): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .get(`/company-info/${id}`)
        .then(async (result) => {
          preload.isLoading = false
          this.formulario = await result.data.data;
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
        });
    },

    changeState(objeto: object, estado: number) {
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
          const preload = usePreloadStore()
          preload.isLoading = true
          axiosIns.post("/company-changeState", objeto)
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
          t == 'activar' ? objeto.state = 0 : objeto.state = 1;
        }

      });
    }
  },
})
