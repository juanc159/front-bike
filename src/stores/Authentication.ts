import { defineStore } from "pinia";

import axiosIns from "@/plugins/axios";

import { useToast } from "@/composables/useToast";
import type IAuth from "@/interfaces/Authentication/IAuth";
import type ILogin from "@/interfaces/Authentication/ILogin";
import type IRegister from "@/interfaces/Authentication/IRegister";
import {usePreloadStore} from '@/stores/usePreloadStore';

const toast = useToast();

export const AuthenticationStore = defineStore("authentication", {
  state: () => ({
    isAuthenticate: false as boolean,
    token:"" as string,
    user:{} as IAuth,
    menu: [],
    permissions: [],
    company:{} as object
  }),
  persist: true,
  getters: {
    getMenuData: (state) => {
      /****  Filtrar menu USUARIOS Y ROLES ***********/
      if (state.company.id) return state.menu.filter((ele) => ele.to.name != "Admin-Company-Index");
      else return state.menu.filter((ele) => ele.to.name == "Admin-Company-Index");      
    },
  },
  actions: {
    async logout(): Promise<void> {
      this.$reset();
    },
    async login(formulario: ILogin): Promise<boolean> {
      const preload = usePreloadStore()
      preload.isLoading = true
      return await axiosIns
        .post("/login", formulario)
        .then((result) => {
          preload.isLoading = false
          this.isAuthenticate = true;
          this.user = result.data.user;
          this.menu = result.data.menu;
          this.permissions = result.data.permissions;
          this.token = result.data.token;

          if(this.user.company_id){
            this.company = this.user.company
          }
          toast.toast("Éxito", result.data.message, "success");

          return true;
        })
        .catch((error) => {
          preload.isLoading = false
          console.log(error);
          this.$reset();
          toast.toast("Error", error.response.data.message, "danger");

          return false;
        });
    },

    async register(formulario: IRegister): Promise<object> {
      const preload = usePreloadStore()
      preload.isLoading = true
      const response = await axiosIns
        .post("/register", formulario)
        .then((result) => {
          preload.isLoading = false
          if (result.data.code === 200)
            toast.toast("Éxito", result.data.message, "success");
          if (result.data.code === 500)
            toast.toast("Error", result.data.message, "danger");
          console.log(result.data.status);
          if (result.data.status === 422) {
            toast.toast("Error", result.data.message, "danger");
            return { error: result.data.errors, status: result.data.status };
          }
          return { status: result.data.code };
        })
        .catch(async (error) => {
          preload.isLoading = false
          if (error.response.status === 500)
            toast.toast("Error", error.response.data.message, "danger");
          console.log(await error);

          return { status: error.response.state };
        });

      return await response;
    },
  },
});
