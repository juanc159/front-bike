import axiosIns from '@/plugins/axios'
import { defineStore } from 'pinia'
import { useToast } from '@/composables/useToast'
import type IPermissionForm from '@/interfaces/Admin/Permission/IPermissionForm'
import type IPermissionList from '@/interfaces/Admin/Permission/IPermissionList'
import { usePreloadStore } from '@/stores/usePreloadStore';

const toast = useToast()

export const useCrudPermissionStore = defineStore('useCrudPermissionStore', {
  state: () => ({
    loading: true as boolean,
    typeAction: "list" as string,
    permissionData: {} as IPermissionForm,
    keyList: 0 as number,
    permissions: [] as Array<IPermissionList>,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
    arrayMenus: [] as Array<object>,
    formulario: {
      menu_id: '',
      name: '',
      description: '',
    } as IPermissionForm,
  }),
  getters: {
  },
  actions: {
    clearFormulario() {
      this.formulario = <IPermissionForm>{
        menu_id: '',
        name: '',
        description: '',
      }
    },
    clonarForm() {
      for (const key in this.formulario) {
        this.permissionData[key] = this.formulario[key]
      }
    },
    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns.post(
        '/permission-list',
        params,
      ).then(result => {
        this.loading = false
        this.permissions = result.data.permission
        this.totalData = result.data.totalData
        this.totalPage = result.data.totalPage
        this.currentPage = result.data.currentPage
        this.lastPage = result.data.lastPage
      }).catch(async error => {
        this.loading = false
        console.log(await error)
      })
    },

    async fetchDataForm(): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .get("/permission-dataForm")
        .then((result) => {
          preload.isLoading = false
          this.arrayMenus = result.data.menus;
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
        });
    },

    async fetchSave(formulario: any): Promise<object> {
      const preload = usePreloadStore()
      preload.isLoading = true
      const response = await axiosIns.post(
        '/permission-create',
        formulario,
      ).then(result => {
        preload.isLoading = false
        if (result.data.code === 200) {
          this.clonarForm()
          toast.toast('Éxito', result.data.message, 'success')
        }
        if (result.data.status === 422) {
          toast.toast("Error", result.data.message, "danger");
          return { error: result.data.errors, status: result.data.status };
        }
        if (result.data.code === 500)
          toast.toast('Error', result.data.message, 'danger')

        return { status: result.data.code };
      }).catch(async error => {
        preload.isLoading = false
        if (error.response.status === 500)
          toast.toast('Error', error.response.data.message, 'danger')
        console.log(await error)
        return error.response.status
      })
      return await response
    },

    async fetchDelete(id: number): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns.delete(
        '/permission-delete/' + id
      ).then(result => {
        preload.isLoading = false
        toast.toast('Éxito', result.data.message, 'success')

      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
    },


    async fetchInfoPermission(id: number): Promise<void> {
      const preload = usePreloadStore()
      if (id !== this.permissionData.id) {
        preload.isLoading = true
        await axiosIns.get(
          `/permission-info/${id}`,
        ).then(async result => {
          preload.isLoading = false
          this.permissionData.id = id
          this.formulario = await result.data.data
          this.clonarForm()
        }).catch(async error => {
          preload.isLoading = false
          console.log(await error)
        })
      } else {
        for (const key in this.permissionData) {
          this.formulario[key] = this.permissionData[key]
        }
      }
    },
  },
})
