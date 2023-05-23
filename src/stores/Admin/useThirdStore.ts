import axiosIns from "@/plugins/axios";
import Swal from "sweetalert2";
import { defineStore } from "pinia";
import { useToast } from "@/composables/useToast";
import IThirdForm from "@/interfaces/Admin/Third/IThirdForm";
import IThirdList from "@/interfaces/Admin/Third/IThirdList";
import { usePreloadStore } from '@/stores/usePreloadStore';

const toast = useToast();

export const useThirdStore = defineStore("useThirdStore", {
  state: () => ({
    loading: true as boolean,
    typeAction: "list" as string,
    keyList: 0 as number,
    show: false as boolean,
    showContact: false as boolean,
    showSeller: false as boolean,
    showObservation: false as boolean,
    basicDataType: [] as Array<object>,
    fiscalResponsability: [] as Array<object>,
    typeIdentification: [] as Array<object>,
    typeOfThird: [] as Array<object>,
    typeRegimeIva: [] as Array<object>,
    arrayPhone: [] as Array<object>,
    arrayContact: [] as Array<object>,
    errorsArrayContact: [] as Array<object>,
    errorsArrayPhone: [] as Array<object>,
    userCompany: [] as Array<object>,
    thirds: [] as Array<IThirdList>,
    departaments: [],
    cities: [],
    thirdData: {} as IThirdForm,
    searchThird: {},
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
    pathExcel: "" as string,
    formulario: {
      name: "",
      last_name: "",
      trade_name: "",
      identifications: "",
      branch_code: "",
      departament_id: null,
      city_id: null,
      address: "",
      contact_name: "",
      contact_last_name: "",
      email_fac: "",
      indicative: "",
      phone_fac: "",
      postal_code: "",
      observations: "",
      basic_data_types_id: null,
      type_identifications_id: null,
      type_regime_ivas_id: null,
      seller_id: null,
      debt_seller_id: null,
      company_id: null,
      arrayFiscalResponsability: [5],
      arrayTypeThird: [],
    } as IThirdForm,
  }),
  //persist: true,
  getters: {},
  actions: {
    clearFormulario() {
      this.formulario = <IThirdForm>{
        name: "",
        last_name: "",
        trade_name: "",
        identifications: "",
        branch_code: "",
        departament_id: null,
        city_id: null,
        address: "",
        contact_name: "",
        contact_last_name: "",
        email_fac: "",
        indicative: "",
        phone_fac: "",
        postal_code: "",
        observations: "",
        basic_data_types_id: null,
        type_identifications_id: null,
        type_regime_ivas_id: null,
        seller_id: null,
        debt_seller_id: null,
        company_id: null,
        arrayFiscalResponsability: [5],
        arrayTypeThird: [],
      };
      this.fiscalResponsability.forEach((element) => {
        element.estado = "Inactivo";
        if (element.id == 5) {
          element.estado = "Activo";
        }
      });
      /* this.typeOfThird.forEach((element) => {
        element.estado = "Inactivo";
      }); */
      this.arrayPhone = [];
      this.arrayContact = [];
    },
    clearArrayOfThirds(){
      this.typeOfThird.forEach((element) => {
        element.estado = "Inactivo";
        if (element.id == 1) {
          this.addTypeThird(element.id);
          element.estado = "Activo";
        }
      });
    },
    //LISTA TABLA
    async fetchAll(params: object): Promise<void> {
      this.loading = true 
      await axiosIns
        .post("/third-list",params)
        .then((result) => { 
          this.loading = false 
          this.thirds = result.data.thirds;  
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
    //AGREGAR TELEFONO
    addFormPhone() {
      this.errorsArrayPhone.push({indicative: "",phone: "", extension: ""});
      this.arrayPhone.push({
        id: null,
        indicative: null,
        phone: null,
        extension: null,
      });
    },
    //ELIMINAR TELEFONO
    deleteFormPhone(pos: number, item: object) {
      if (item.id) {
        let phone = this.arrayPhone.find((ele) => ele.id === item.id);
        phone.delete = "delete";
      } else {
        this.arrayPhone.splice(pos, 1);
      }
    },
    //AGREGAR CONTACTO
    addFormContact() {
      this.errorsArrayContact.push({ name: "", email: "" });
      this.arrayContact.push({
        id: null,
        name: null,
        last_name: null,
        email: null,
        charge: null,
        indicative: null,
        phone: null,
        delete: null,
      });
    },
    //ELIMINAR CONTACTO
    deleteFormContact(pos: number, item: object) {
      if (item.id) {
        let contact = this.arrayContact.find((ele) => ele.id === item.id);
        contact.delete = "delete";
      } else {
        this.arrayContact.splice(pos, 1);
      }
    },
    //CHECK FISCAL RESPONSABILIDAD
    addFiscalResponsability(id: number) {
      if (this.formulario.arrayFiscalResponsability.includes(id)) {
        // Si el ID ya está en el array, quítalo
        this.formulario.arrayFiscalResponsability =
          this.formulario.arrayFiscalResponsability.filter((ele) => ele !== id);
      } else {
        // Si el ID no está en el array, agrégalo
        this.formulario.arrayFiscalResponsability.push(id);
      }
    },
    //CHECK FISCAL RESPONSABILIDAD
    addTypeThird(id: number) {
      if (this.formulario.arrayTypeThird.includes(id)) {
        // Si el ID ya está en el array, quítalo
        this.formulario.arrayTypeThird =
          this.formulario.arrayTypeThird.filter((ele) => ele !== id);
      } else {
        // Si el ID no está en el array, agrégalo
        this.formulario.arrayTypeThird.push(id);
      }
    },
    //DATOS PARA LOS SELECTS
    async fetchDataForm(company_id:number|string): Promise<void> {
      const preload=  usePreloadStore()
      preload.isLoading = true 
      await axiosIns
        .post("/third-dataForm",{company_id:company_id})
        .then((result) => { 
          preload.isLoading = false 
          this.basicDataType = result.data.basicDataType;
          this.fiscalResponsability = result.data.fiscalResponsability;
          this.typeIdentification = result.data.typeIdentification;
          this.typeOfThird = result.data.typeOfThird;
          this.typeRegimeIva = result.data.typeRegimeIva;
          this.userCompany = result.data.userCompany;
          this.departaments = result.data.departaments;
        })
        .catch(async (error) => {
          preload.isLoading = false 
          console.log(await error);
        });
    },
    //GUARDAR REGISTROS
    async fetchSave(): Promise<object> {
      const preload=  usePreloadStore()
      preload.isLoading = true 
      const response = await axiosIns
        .post('/third-create', this.formulario)
        .then(async result => {
          preload.isLoading = false  
          if (result.data.code === 200){
            toast.toast("Éxito", result.data.message, "success");              
          }
          if (result.data.code === 500)
            toast.toast("Error", result.data.message, "danger");
          if (result.data.status === 422) {
            toast.toast("Error", result.data.message, "danger");
            return { error: result.data.errors, status: result.data.status };
          }
          return { status: result.data.code };
        })
        .catch(async (error) => {
          preload.isLoading = false 
          console.log('datadata',error.response)
          return { status: error.response.status };
        });

      return await response;
    },
    clonarForm() {
      for (const key in this.formulario) {
        this.thirdData[key] = this.formulario[key];
      }
    } /* contacts_thirds,fiscal_responsability_thirds,phones_thirds */,

    async fetchInfoThird(id: number): Promise<void> {
      const preload=  usePreloadStore()
      //if (id !== this.thirdData.id) {
        preload.isLoading = true 
        await axiosIns
          .get(`/third-info/${id}`)
          .then(async (result) => {
            console.log('RESULT',result.data)
            preload.isLoading = false 
            this.formulario = await result.data.data;
            this.arrayPhone = result.data.data.phones_thirds;
            this.arrayContact = result.data.data.contacts_thirds;
            this.formulario.arrayFiscalResponsability = [];
            result.data.data.fiscal_responsability_thirds.forEach((element) => {
              this.formulario.arrayFiscalResponsability.push(element.id);
            });
            this.formulario.arrayTypeThird = [];
            result.data.data.types_thirds.forEach((element) => {
              this.formulario.arrayTypeThird.push(element.id);
            });
            this.clonarForm();
            this.errorsArrayContact = [];
            this.errorsArrayPhone = [];
            this.arrayContact.forEach((element) => {
              this.errorsArrayContact.push({ 
                name: "",
                email: "",
                last_name: "",
                charge: "",
                indicative: "",
                phone: "",
              });
            });
            this.arrayPhone.forEach((element) => {
              this.errorsArrayPhone.push({ 
                indicative: "",
                phone: "",
                extension: "",
              });
            });
            this.thirdData.id = id;
            console.log();
            
          })
          .catch(async (error) => {
            preload.isLoading = false 
            console.log(await error);
          });
      /* } else {
        for (const key in this.thirdData) {
          this.formulario[key] = this.thirdData[key];
        }
      } */
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
          axiosIns.post("/third-state", objeto).then((res) => {
            preload.isLoading = false
            if (res.data.code == 200) {
              toast.toast("Éxito", res.data.msg, "success");
            }
            if (res.data.code == 500) {
              toast.toast("Éxito", res.data.msg, "error");
            }
          });
        } else {
          t == "activar" ? (objeto.state = 0) : (objeto.state = 1);
        }
      });
    },
    //excel TABLA
    async excel(params: object): Promise<void> {
      const preload=  usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .post("/third-excel", params)
        .then((result) => {
          preload.isLoading = false
          this.pathExcel = result.data.path;
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
        });
    },

    //TRAE CIUDAD
    async getCities(): Promise<void> {
      const preload=  usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .post("/invoice-cities", { departament_id: this.formulario.departament_id })
        .then((result) => {
          this.formulario.city_id = null;
          preload.isLoading = false;
          this.cities = result.data.cities;
        })
        .catch(async (error) => {
          this.formulario.city_id = null;
          preload.isLoading = false
          console.log(await error);
        });
    },
  },
});
