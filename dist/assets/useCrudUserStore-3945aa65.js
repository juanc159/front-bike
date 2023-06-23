import{z as l,bq as d,Q as i,br as n,bs as g}from"./index-13e9e9f8.js";import{S as u}from"./sweetalert2.all-09c1f25c.js";const f=l(),o=g(),p=d("useCrudUserStore",{state:()=>({loading:!0,formulario:{email:"",name:"",lastName:"",role_id:null,company_id:null,photo:null,identification:"",phone:""},typeAction:"list",userData:{},keyList:0,users:[],totalData:0,totalPage:0,currentPage:1,lastPage:0,arrayRoles:[]}),getters:{},actions:{clearFormulario(){this.formulario={email:"",name:"",lastName:"",role_id:null,company_id:null,photo:null,identification:"",phone:""}},async fetchAll(s){this.loading=!0,await i.post("/user-list",s).then(t=>{this.loading=!1,this.users=t.data.user,this.totalData=t.data.totalData,this.totalPage=t.data.totalPage,this.currentPage=t.data.currentPage,this.lastPage=t.data.lastPage}).catch(async t=>{this.loading=!1,console.log(await t)})},async fetchSave(){const s=n(),t=new FormData;for(const a in this.formulario)t.append(a,this.formulario[a]);return s.isLoading=!0,await await i.post("/user-create",t).then(a=>(s.isLoading=!1,a.data.code===200&&(this.formulario=a.data.data,this.clearFormulario(),o.toast("Éxito",a.data.message,"success")),a.data.code===500&&o.toast("Error",a.data.message,"danger"),console.log(a.data.status),a.data.status===422?(o.toast("Error",a.data.message,"danger"),{error:a.data.errors,status:a.data.status}):{status:a.data.code})).catch(async a=>(s.isLoading=!1,a.response.status===500&&o.toast("Error",a.response.data.message,"danger"),console.log(await a),{status:a.response.state}))},async fetchDataForm(){const s=n(),t={company_id:f.company.id};s.isLoading=!0,await i.post("/user-dataForm",t).then(e=>{s.isLoading=!1,this.arrayRoles=e.data.roles}).catch(async e=>{s.isLoading=!1,console.log(await e)})},async fetchDelete(s){const t=n();t.isLoading=!0,await i.delete(`/user-delete/${s}`).then(e=>{t.isLoading=!1,o.toast("Éxito",e.data.message,"success")}).catch(async e=>{t.isLoading=!1,console.log(await e)})},async fetchInfo(s){const t=n();t.isLoading=!0,await i.get(`/user-info/${s}`).then(async e=>{console.log("RESULT",e),t.isLoading=!1,this.formulario=await e.data.data,console.log("this.formulario",this.formulario),this.userData.id=s}).catch(async e=>{t.isLoading=!1,console.log(await e)})},changeState(s,t){const e=n();let a="";t==0?a="activar":a="inactivar",u.fire({title:`¿Está seguro de ${a} el Registro seleccionado?`,showDenyButton:!0,confirmButtonText:"Si",denyButtonText:"No",allowOutsideClick:!1}).then(c=>{c.isConfirmed?(e.isLoading=!0,i.post("/user-changeState",s).then(r=>{e.isLoading=!1,r.data.code==200&&o.toast("Éxito",r.data.msg,"success"),r.data.code==500&&o.toast("Éxito",r.data.msg,"danger")})):a=="activar"?s.state=0:s.state=1})}}});export{p as u};
