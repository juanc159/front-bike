import{bq as n,Q as o,br as i,bs as r}from"./index-e5b1715d.js";const e=r(),d=n("useCrudMenuStore",{state:()=>({loading:!0,typeAction:"list",menuData:{},keyList:0,menus:[],totalData:0,totalPage:0,currentPage:1,lastPage:0,formulario:{title:"",to:"",icon:"",requiredPermission:""}}),getters:{},actions:{clearFormulario(){this.formulario={title:"",to:"",icon:"",requiredPermission:""}},clonarForm(){for(const s in this.formulario)this.menuData[s]=this.formulario[s]},async fetchAll(s){this.loading=!0,await o.post("/menu-list",s).then(t=>{this.loading=!1,this.menus=t.data.menu,this.totalData=t.data.totalData,this.totalPage=t.data.totalPage,this.currentPage=t.data.currentPage,this.lastPage=t.data.lastPage}).catch(async t=>{this.loading=!1,console.log(await t)})},async fetchSave(){const s=i();return s.isLoading=!0,await await o.post("/menu-create",this.formulario).then(a=>(s.isLoading=!1,a.data.code===200&&(this.clonarForm(),this.clearFormulario(),e.toast("Éxito",a.data.message,"success")),a.data.code===500&&e.toast("Error",a.data.message,"danger"),a.data.status===422?(e.toast("Error",a.data.message,"danger"),{error:a.data.errors,status:a.data.status}):{status:a.data.code})).catch(async a=>(s.isLoading=!1,a.response.status===500&&e.toast("Error",a.response.data.message,"danger"),console.log(await a),{status:a.response.state}))},async fetchDelete(s){const t=i();t.isLoading=!0,await o.delete("/menu-delete/"+s).then(a=>{t.isLoading=!1,e.toast("Éxito",a.data.message,"success")}).catch(async a=>{t.isLoading=!1,console.log(await a)})},async fetchInfo(s){const t=i();if(s!==this.menuData.id)t.isLoading=!0,await o.get(`/menu-info/${s}`).then(async a=>{t.isLoading=!1,this.menuData.id=s,this.formulario=await a.data.data,this.clonarForm()}).catch(async a=>{t.isLoading=!1,console.log(await a)});else for(const a in this.menuData)this.formulario[a]=this.menuData[a]}}});export{d as u};
