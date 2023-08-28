import{bq as n,Y as e,br as i,bs as d}from"./index-ecce922e.js";const o=d(),c=n("useCrudThirdStore",{state:()=>({loading:!0,formulario:{id:null,name:null},typeAction:"list",keyList:0,thirds:[],totalData:0,totalPage:0,currentPage:1,lastPage:0}),getters:{},actions:{clearFormulario(){this.formulario={id:null,name:null}},async fetchAll(s){this.loading=!0,await e.post("/third-list",s).then(t=>{this.loading=!1,this.thirds=t.data.thirds,this.totalData=t.data.totalData,this.totalPage=t.data.totalPage,this.currentPage=t.data.currentPage,this.lastPage=t.data.lastPage}).catch(async t=>{this.loading=!1,console.log(await t)})},async fetchSave(){const s=i();return s.isLoading=!0,await await e.post("/third-create",this.formulario).then(a=>(s.isLoading=!1,a.data.code===200&&(this.formulario=a.data.data,this.clearFormulario(),o.toast("Éxito",a.data.message,"success")),a.data.code===500&&o.toast("Error",a.data.message,"danger"),console.log(a.data.status),a.data.status===422?(o.toast("Error",a.data.message,"danger"),{error:a.data.errors,status:a.data.status}):{status:a.data.code})).catch(async a=>(s.isLoading=!1,a.response.status===500&&o.toast("Error",a.response.data.message,"danger"),console.log(await a),{status:a.response.state}))},async fetchDelete(s){const t=i();t.isLoading=!0,await e.delete(`/third-delete/${s}`).then(a=>{t.isLoading=!1,o.toast("Éxito",a.data.message,"success")}).catch(async a=>{t.isLoading=!1,console.log(await a)})},async fetchInfo(s){const t=i();t.isLoading=!0,await e.get(`/third-info/${s}`).then(async a=>{console.log("RESULT",a),t.isLoading=!1,this.formulario=await a.data.data}).catch(async a=>{t.isLoading=!1,console.log(await a)})}}});export{c as u};