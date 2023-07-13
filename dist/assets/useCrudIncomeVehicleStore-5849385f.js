import{bq as d,Q as o,br as n,z as r,bs as u}from"./index-333f41b8.js";const s=u(),g=d("useCrudIncomeVehicleStore",{state:()=>({loading:!0,formulario:{id:null,date_init:null,mecanic_id:null,type_vehicle:null,brand:null,pay_labor:null,plate:null,value_labor:null,value_labor40:null,value_parts:null,total_costs:null,paid_labor:null,date_pay_labor:null,utilites:null,company_id:null},typeAction:"list",keyList:0,incomeVehicles:[],totalData:0,totalPage:0,currentPage:1,lastPage:0,operatives:[],typeArrangement:[]}),getters:{},actions:{clearFormulario(){this.formulario={id:null,date_init:null,mecanic_id:null,type_vehicle:null,brand:null,pay_labor:null,value_labor40:null,plate:null,value_labor:null,value_parts:null,total_costs:null,paid_labor:null,date_pay_labor:null,utilites:null,company_id:null}},async fetchAll(e){this.loading=!0,await o.post("/incomeVehicle-list",e).then(t=>{this.loading=!1,this.incomeVehicles=t.data.incomeVehicles,this.totalData=t.data.totalData,this.totalPage=t.data.totalPage,this.currentPage=t.data.currentPage,this.lastPage=t.data.lastPage}).catch(async t=>{this.loading=!1,console.log(await t)})},async fetchSave(){const e=n();return e.isLoading=!0,await await o.post("/incomeVehicle-create",this.formulario).then(a=>(e.isLoading=!1,a.data.code===200&&(this.formulario=a.data.data,this.clearFormulario(),s.toast("Éxito",a.data.message,"success")),a.data.code===500&&s.toast("Error",a.data.message,"danger"),console.log(a.data.code),a.data.code===422?(s.toast("Error",a.data.message,"danger"),{error:a.data.errors,status:a.data.code}):{status:a.data.code})).catch(async a=>(e.isLoading=!1,a.response.status===500&&s.toast("Error",a.response.data.message,"danger"),console.log(await a),{status:a.response.state}))},async fetchDelete(e){const t=n();t.isLoading=!0,await o.delete(`/incomeVehicle-delete/${e}`).then(a=>{t.isLoading=!1,s.toast("Éxito",a.data.message,"success")}).catch(async a=>{t.isLoading=!1,console.log(await a)})},async fetchInfo(e){const t=n();t.isLoading=!0,await o.get(`/incomeVehicle-info/${e}`).then(async a=>{console.log("RESULT",a),t.isLoading=!1,this.formulario=await a.data.data}).catch(async a=>{t.isLoading=!1,console.log(await a)})},async fetchDataForm(){const e=n(),t=r();e.isLoading=!0,await o.post("/incomeVehicle-dataForm",{company_id:t.company.id}).then(async a=>{e.isLoading=!1,this.operatives=await a.data.operatives,this.typeArrangement=await a.data.typeArrangement}).catch(async a=>{e.isLoading=!1,console.log(await a)})},async changeSate(e,t){await o.post("/incomeVehicle-changeState",{id:e,state:t}).then(async a=>{if(a.data.code===200){const i=await a.data.data,l=this.incomeVehicles.find(c=>c.id===i.id);l.state=i.state,s.toast("Éxito",a.data.message,"success")}}).catch(async a=>{console.log(await a)})}}});export{g as u};