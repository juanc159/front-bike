import{bq as n,Q as i,br as e,bs as d}from"./index-e5b1715d.js";const o=d(),r=n("useCrudAdministrationStore",{state:()=>({loading:!0,formulario:{id:null,name:null,cost:null,init_date:null,final_date:null,status:1,company_id:null},typeAction:"list",keyList:0,administrations:[],totalData:0,totalPage:0,currentPage:1,lastPage:0}),getters:{},actions:{clearFormulario(){this.formulario={id:null,name:null,cost:null,init_date:null,final_date:null,status:1,company_id:null}},async fetchAll(s){this.loading=!0,await i.post("/administration-list",s).then(t=>{this.loading=!1,this.administrations=t.data.administrations,this.totalData=t.data.totalData,this.totalPage=t.data.totalPage,this.currentPage=t.data.currentPage,this.lastPage=t.data.lastPage}).catch(async t=>{this.loading=!1,console.log(await t)})},async fetchSave(){const s=e();return s.isLoading=!0,await await i.post("/administration-create",this.formulario).then(a=>(s.isLoading=!1,a.data.code===200&&(this.formulario=a.data.data,this.clearFormulario(),o.toast("Éxito",a.data.message,"success")),a.data.code===500&&o.toast("Error",a.data.message,"danger"),console.log(a.data.status),a.data.status===422?(o.toast("Error",a.data.message,"danger"),{error:a.data.errors,status:a.data.status}):{status:a.data.code})).catch(async a=>(s.isLoading=!1,a.response.status===500&&o.toast("Error",a.response.data.message,"danger"),console.log(await a),{status:a.response.state}))},async fetchDelete(s){const t=e();t.isLoading=!0,await i.delete(`/administration-delete/${s}`).then(a=>{t.isLoading=!1,o.toast("Éxito",a.data.message,"success")}).catch(async a=>{t.isLoading=!1,console.log(await a)})},async fetchInfo(s){const t=e();t.isLoading=!0,await i.get(`/administration-info/${s}`).then(async a=>{console.log("RESULT",a),t.isLoading=!1,this.formulario=await a.data.data}).catch(async a=>{t.isLoading=!1,console.log(await a)})}}});export{r as u};
