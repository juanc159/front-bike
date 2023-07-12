import{bq as r,Q as o,br as n,bs as c}from"./index-e5b1715d.js";const i=c(),l=r("useCrudPermissionStore",{state:()=>({loading:!0,typeAction:"list",permissionData:{},keyList:0,permissions:[],totalData:0,totalPage:0,currentPage:1,lastPage:0,arrayMenus:[],formulario:{menu_id:"",name:"",description:""}}),getters:{},actions:{clearFormulario(){this.formulario={menu_id:"",name:"",description:""}},clonarForm(){for(const s in this.formulario)this.permissionData[s]=this.formulario[s]},async fetchAll(s){this.loading=!0,await o.post("/permission-list",s).then(a=>{this.loading=!1,this.permissions=a.data.permission,this.totalData=a.data.totalData,this.totalPage=a.data.totalPage,this.currentPage=a.data.currentPage,this.lastPage=a.data.lastPage}).catch(async a=>{this.loading=!1,console.log(await a)})},async fetchDataForm(){const s=n();s.isLoading=!0,await o.get("/permission-dataForm").then(a=>{s.isLoading=!1,this.arrayMenus=a.data.menus}).catch(async a=>{s.isLoading=!1,console.log(await a)})},async fetchSave(s){const a=n();return a.isLoading=!0,await await o.post("/permission-create",s).then(t=>(a.isLoading=!1,t.data.code===200&&(this.clonarForm(),i.toast("Éxito",t.data.message,"success")),t.data.status===422?(i.toast("Error",t.data.message,"danger"),{error:t.data.errors,status:t.data.status}):(t.data.code===500&&i.toast("Error",t.data.message,"danger"),{status:t.data.code}))).catch(async t=>(a.isLoading=!1,t.response.status===500&&i.toast("Error",t.response.data.message,"danger"),console.log(await t),t.response.status))},async fetchDelete(s){const a=n();a.isLoading=!0,await o.delete("/permission-delete/"+s).then(e=>{a.isLoading=!1,i.toast("Éxito",e.data.message,"success")}).catch(async e=>{a.isLoading=!1,console.log(await e)})},async fetchInfoPermission(s){const a=n();if(s!==this.permissionData.id)a.isLoading=!0,await o.get(`/permission-info/${s}`).then(async e=>{a.isLoading=!1,this.permissionData.id=s,this.formulario=await e.data.data,this.clonarForm()}).catch(async e=>{a.isLoading=!1,console.log(await e)});else for(const e in this.permissionData)this.formulario[e]=this.permissionData[e]}}});export{l as u};
