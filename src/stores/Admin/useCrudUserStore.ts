import axiosIns from '@/plugins/axios';
import { defineStore } from 'pinia';
import { useToast } from '@/composables/useToast';
import Swal from 'sweetalert2';
import IUserForm from '@/interfaces/Admin/User/IUserForm';
import IUserList from '@/interfaces/Admin/User/IUserList';
import { AuthenticationStore } from '@/stores/Authentication';

import { usePreloadStore } from '@/stores/usePreloadStore';
const authentication = AuthenticationStore();

const toast = useToast()

export const useCrudUserStore = defineStore('useCrudUserStore', {
  state: () => ({
    loading: true as boolean,
    formulario: {
      email: '', 
      name: '',
      lastName: '',
      role_id: null,
      company_id: null,
      photo: null,
      identification: '',
      phone: '',
    } as IUserForm,
    typeAction: "list" as string,
    userData: {} as IUserForm,
    keyList: 0 as number,
    users: [] as Array<IUserList>,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
    arrayRoles: [] as Array<object>,
  }),
  getters: {
  },
  actions: {
    clearFormulario() {
      this.formulario = <IUserForm>{
        email: '', 
        name: '',
        lastName: '',
        role_id: null,
        company_id: null,
        photo: null,
        identification: '',
        phone: '',
      }
    },
    clonarForm() {
      for (const key in this.formulario) {
        this.userData[key] = this.formulario[key]
      }
    },

    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns.post(
        '/user-list',
        params,
      ).then(result => {
        this.loading = false
        this.users = result.data.user
        this.totalData = result.data.totalData
        this.totalPage = result.data.totalPage
        this.currentPage = result.data.currentPage
        this.lastPage = result.data.lastPage
      }).catch(async error => {
        this.loading = false
        console.log(await error)
      })
    },


    async fetchSave(): Promise<object> {
      const preload=  usePreloadStore()
      const formData = new FormData()

      for (const key in this.formulario)
        formData.append(key, this.formulario[key])
      
        preload.isLoading = true
      const response = await axiosIns.post(
        '/user-create',
        formData,
      ).then(result => {
        preload.isLoading = false
        if (result.data.code === 200) {
          this.formulario = result.data.data
          this.clonarForm()
          this.clearFormulario()
          toast.toast('Éxito', result.data.message, 'success')
        }

        if (result.data.code === 500)
          toast.toast('Error', result.data.message, 'danger')
        console.log(result.data.status);
        if (result.data.status === 422) {
          toast.toast('Error', result.data.message, 'danger')
          return { error: result.data.errors, status: result.data.status }
        }
        return { status: result.data.code };
      }).catch(async error => {
        preload.isLoading = false
        if (error.response.status === 500)
          toast.toast('Error', error.response.data.message, 'danger')
        console.log(await error)

        return { status: error.response.state };
      })

      return await response
    },


    async fetchDataForm(): Promise<void> {
      const preload=  usePreloadStore()
      const form: object = { company_id: authentication.company.id }
      preload.isLoading = true
      await axiosIns
        .post("/user-dataForm", form)
        .then((result) => {
          preload.isLoading = false
          this.arrayRoles = result.data.roles;
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
        });
    },


    async fetchDelete(id: number): Promise<void> {
      const preload=  usePreloadStore()
      preload.isLoading = true
      await axiosIns.delete(
        '/user-delete/' + id
      ).then(result => {
        preload.isLoading = false
        toast.toast('Éxito', result.data.message, 'success')

      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
    },

    async fetchInfoUser(id: number): Promise<void> {
      const preload=  usePreloadStore()
      if (id !== this.userData.id) {
        preload.isLoading = true
        await axiosIns.get(
          `/user-info/${id}`,
        ).then(async result => {
          console.log('RESULT', result)
          preload.isLoading = false
          this.formulario = await result.data.data
          console.log("this.formulario",this.formulario);
          
          this.clonarForm()
          this.userData.id = id
        }).catch(async error => {
          preload.isLoading = false
          console.log(await error)
        })
      } else {
        for (const key in this.userData) {
          this.formulario[key] = this.userData[key]
        }
      }
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
  },
})
