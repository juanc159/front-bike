import{M as r,N as i,O as n,P as d}from"./index-5157f066.js";const o=d(),c=r("useCrudRoleStore",{state:()=>({loading:!0,typeAction:"list",roleData:{},keyList:0,roles:[],totalData:0,totalPage:0,currentPage:1,lastPage:0,arrayMenus:[],formulario:{company_id:null,name:"",description:"",permissions:[]}}),getters:{},actions:{clearFormulario(){this.roleData={company_id:null,name:"",description:""},this.formulario={id:null,company_id:null,name:"",description:"",permissions:[]}},clonarForm(){for(const s in this.formulario)this.roleData[s]=this.formulario[s]},async fetchAll(s){this.loading=!0,await i.post("/role-list",s).then(t=>{this.loading=!1,this.roles=t.data.roles,this.totalData=t.data.totalData,this.totalPage=t.data.totalPage,this.currentPage=t.data.currentPage,this.lastPage=t.data.lastPage}).catch(async t=>{this.loading=!1,console.log(await t)})},async fetchDataForm(){const s=n();s.isLoading=!0,await i.get("/role-dataForm").then(t=>{s.isLoading=!1,this.arrayMenus=t.data.menus}).catch(async t=>{s.isLoading=!1,console.log(await t)})},async fetchSave(s){const t=n();return t.isLoading=!0,await await i.post("/role-create",s).then(a=>(t.isLoading=!1,a.data.code===200&&o.toast("Éxito",a.data.message,"success"),a.data.code===500&&o.toast("Error",a.data.message,"danger"),a.data.status===422?(o.toast("Error",a.data.message,"danger"),{error:a.data.errors,status:a.data.status}):{status:a.data.code})).catch(async a=>(t.isLoading=!1,console.log(await a),console.log("RESPONSE",await a.response.data),a.response.state===500&&o.toast("Error",a.response.data.message,"danger"),{status:a.response.state}))},async fetchDelete(s){const t=n();return t.isLoading=!0,await await i.delete(`/role-delete/${s}`).then(a=>(t.isLoading=!1,a.data.code===200&&(this.clonarForm(),o.toast("Éxito",a.data.message,"success")),a.data.code===500&&o.toast("Error",a.data.message,"danger"),a.data.code)).catch(async a=>(t.isLoading=!1,console.log(await a),a.response.state===500&&o.toast("Error",a.response.data.message,"danger"),a.response.state))},async fetchInfoRole(s){const t=n();if(s!==this.roleData.id)t.isLoading=!0,await i.get(`/role-info/${s}`).then(async e=>{t.isLoading=!1,this.formulario=await e.data.data,this.clonarForm(),this.roleData.id=s}).catch(async e=>{t.isLoading=!1,console.log(await e)});else for(const e in this.roleData)this.formulario[e]=this.roleData[e]}}});export{c as u};
