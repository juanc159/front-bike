import { useToast } from '@/composables/useToast'
import type IForm from '@/pages/Admin/Publication/Interfaces/IForm'
import type IList from '@/pages/Admin/Publication/Interfaces/IList'
import axiosIns from '@/plugins/axios'
import { usePreloadStore } from '@/stores/usePreloadStore'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'

const toast = useToast()

export const useCrudPublicationStore = defineStore('useCrudPublicationStore', {
  state: () => ({
    loading: true as boolean,
    formulario: {
      id: null,
      name: null,
      company_id: null,
      description: null,
      barter: null,
      price: null,
      offer: null,
      days: null,
      model: null,
      year: null,
      files: [],
    } as IForm,
    typeAction: 'list' as string,
    keyList: 0 as number,
    publications: [] as Array<IList>,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
  }),
  getters: {
  },
  actions: {
    clearFormulario() {
      this.formulario = <IForm>{
        id: null,
        name: null,
        company_id: null,
        description: null,
        barter: null,
        price: null,
        offer: null,
        days: null,
        model: null,
        year: null,
        files: [],
      }
    },
    async fetchAllData(params: object): Promise<void> {
      this.loading = true
      await axiosIns.post(
        '/publication-listData',
        params,
      ).then(result => {
        this.loading = false
        this.publications = result.data.publications
      }).catch(async error => {
        this.loading = false
        console.log(await error)
      })
    },
    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns.post(
        '/publication-list',
        params,
      ).then(result => {
        this.loading = false
        this.publications = result.data.publications
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
      const preload = usePreloadStore()
      preload.isLoading = true

      const formData = new FormData();

      formData.append("id", String(this.formulario.id));
      formData.append("company_id", String(this.formulario.company_id));
      formData.append("name", String(this.formulario.name));
      formData.append("model", String(this.formulario.model));
      formData.append("year", String(this.formulario.year));
      formData.append("description", String(this.formulario.description));
      formData.append("barter", String(this.formulario.barter));
      formData.append("price", String(this.formulario.price));
      formData.append("offer", String(this.formulario.offer));
      formData.append("days", String(this.formulario.days));


      formData.append("countFiles", String(this.formulario.files.length));
      this.formulario.files.forEach((element, key) => {
        formData.append("file" + key, element.file);
        formData.append("file_id" + key, String(element.id));
        formData.append("file_order" + key, String(element.order));
        // formData.append("file_name" + key, String(element.name));
        formData.append("file_delete" + key, String(element.delete));
      });



      const response = await axiosIns.post(
        '/publication-create',
        formData,
      ).then(result => {
        preload.isLoading = false
        if (result.data.code === 200) {
          this.formulario = result.data.data
          this.clearFormulario()
          toast.toast('Éxito', result.data.message, 'success')
        }

        if (result.data.code === 500)
          toast.toast('Error', result.data.message, 'danger')
        console.log(result.data.status)
        if (result.data.status === 422) {
          toast.toast('Error', result.data.message, 'danger')

          return { error: result.data.errors, status: result.data.status }
        }

        return { status: result.data.code }
      }).catch(async error => {
        preload.isLoading = false
        if (error.response.status === 500)
          toast.toast('Error', error.response.data.message, 'danger')
        console.log(await error)

        return { status: error.response.state }
      })

      return await response
    },

    async fetchDelete(id: number): Promise<void> {
      const preload = usePreloadStore()

      preload.isLoading = true
      await axiosIns.delete(
        `/publication-delete/${id}`,
      ).then(result => {
        preload.isLoading = false
        toast.toast('Éxito', result.data.message, 'success')
      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
    },

    async fetchInfo(id: number): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns.get(
        `/publication-info/${id}`,
      ).then(async result => {
        console.log('RESULT', result)
        preload.isLoading = false
        this.formulario = await result.data.data
      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
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
          axiosIns.post("/publication-changeState", objeto)
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
          t == 'activar' ? objeto.status = 0 : objeto.status = 1;
        }

      });
    },

  },
})
