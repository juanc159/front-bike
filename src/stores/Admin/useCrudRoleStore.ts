import axiosIns from '@/plugins/axios'
import { defineStore } from 'pinia'
import { useToast } from '@/composables/useToast'

import type IFormRole from "@/interfaces/Admin/Role/IRoleForm";
import type IRoleList from "@/interfaces/Admin/Role/IRoleList";
import { usePreloadStore } from '@/stores/usePreloadStore';
const toast = useToast()

export const useCrudRoleStore = defineStore('useCrudRoleStore', {
  state: () => ({
    loading: true as boolean,
    typeAction: "list" as string,
    roleData: {} as IFormRole,
    keyList: 0 as number,
    roles: [] as Array<IRoleList>,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
    arrayMenus: [] as Array<object>,
    formulario: {
      company_id: null,
      name: "",
      description: "",
      permissions: []
    } as IFormRole,
  }),
  getters: {
  },
  actions: {
    clearFormulario() {
      this.roleData= <IFormRole>{
        company_id: null,
        name: "",
        description: "",
      }
      this.formulario = <IFormRole>{
        id:null,
        company_id: null,
        name: "",
        description: "",
        permissions: []
      }
    },
    clonarForm() {
      for (const key in this.formulario) {
        this.roleData[key] = this.formulario[key]
      }
    },

    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns
        .post("/role-list", params)
        .then((result) => {
          this.loading = false
          this.roles = result.data.roles;
          this.totalData = result.data.totalData;
          this.totalPage = result.data.totalPage;
          this.currentPage = result.data.currentPage;
          this.lastPage = result.data.lastPage
        })
        .catch(async (error) => {
          this.loading = false
          console.log(await error);
        });
    },

    async fetchDataForm(): Promise<void> {
      const preload=  usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .get("/role-dataForm")
        .then((result) => {
          preload.isLoading = false
          this.arrayMenus = result.data.menus;
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
        });
    },

    async fetchSave(formulario: object): Promise<object> {
      const preload=  usePreloadStore()
      preload.isLoading = true
      const response = await axiosIns
        .post("/role-create", formulario)
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
          console.log("RESPONSE", await error.response.data);
          if (error.response.state === 500)
            toast.toast("Error", error.response.data.message, "danger");

          return { status: error.response.state };
        });

      return await response;
    },

    async fetchDelete(id: number): Promise<number> {
      const preload=  usePreloadStore()
      preload.isLoading = true
      const response = await axiosIns
        .delete(`/role-delete/${id}`)
        .then((result) => {
          preload.isLoading = false
          if (result.data.code === 200){
            this.clonarForm()
            toast.toast("Éxito", result.data.message, "success");
          }

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

    async fetchInfoRole(id: number): Promise<void> {
      const preload=  usePreloadStore()
      if (id !== this.roleData.id) {
        preload.isLoading = true
        await axiosIns
          .get(`/role-info/${id}`)
          .then(async (result) => {
            preload.isLoading = false
            this.formulario = await result.data.data;
            this.clonarForm()
            this.roleData.id = id
          })
          .catch(async (error) => {
            preload.isLoading = false
            console.log(await error);
          });
      }else {
        for (const key in this.roleData) {
          this.formulario[key] = this.roleData[key]
        }
      }
    } 
  },
})
