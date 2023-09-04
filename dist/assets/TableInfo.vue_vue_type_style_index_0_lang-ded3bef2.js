import{_ as S}from"./AppDateTimePicker.vue_vue_type_style_index_0_lang-183cbde0.js";import{u as D}from"./useCrudMecanicStore-f3b34f5c.js";import{e as N,g as P,s as B,r as f,y as A,o as M,c as z,d as e,w as t,A as _,B as r,k as l,E as p,b as y,I as $,J as R,a as k,z as U,t as E,C as O,V as j}from"./index-5157f066.js";import{u as J}from"./useCrudIncomeVehicleStore-f17a0984.js";import{V}from"./VDivider-43847767.js";import{V as b}from"./VDataTable-dd0cef76.js";const q={class:"d-flex justify-content-end my-4"},G=k("h3",null,"Total a pagar ",-1),ee=N({__name:"TableInfo",setup(H){const g=J();P();const i=D(),{formulario:c,incomeVehiclesSi:C,incomeVehiclesNo:v}=B(i),I=async(m,a=null)=>{i.clearFormulario(),i.typeAction=m,a&&g.fetchInfo(a)},F=[{title:"Tipo de vehiculo",key:"type_vehicle"},{title:"Marca",key:"brand"},{title:"Fecha de ingreso",key:"date_init"},{title:"Pago mano de obra",key:"pay_labor"},{title:"Valor mano de obra 60%",key:"paid_labor"},{title:"Fecha Pago Mano De Obra",key:"date_pay_labor"}],w=[{title:"Tipo de vehiculo",key:"type_vehicle"},{title:"Marca",key:"brand"},{title:"Fecha de ingreso",key:"date_init"},{title:"Pago mano de obra",key:"pay_labor"},{title:"Valor mano de obra 60%",key:"paid_labor"},{title:"Fecha Pago Mano De Obra",key:"date_pay_labor"},{title:"Acción",key:"actions"}],s=f([]),u=f(!1),h=A(()=>v.value.filter(a=>s.value.includes(a.id)).reduce((a,d)=>a+Number(d.paid_labor??0),0)),x=async()=>{u.value=!0,await i.fetchPay({mecanic_id:c.value.id,totalPay:h.value,selected:s.value}),await i.fetchInfo({id:c.value.id}),u.value=!1},n=f({dateInitial:null,dateFinal:null}),T=async()=>{await i.fetchInfo({id:c.value.id,dateInitial:n.value.dateInitial,dateFinal:n.value.dateFinal})};return(m,a)=>{const d=S;return M(),z("div",null,[e($,{fluid:""},{default:t(()=>[e(_,null,{default:t(()=>[e(r,{cols:"12",sm:"5"},{default:t(()=>[e(d,{label:"Fecha inicial",modelValue:l(n).dateInitial,"onUpdate:modelValue":a[0]||(a[0]=o=>l(n).dateInitial=o)},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",sm:"5"},{default:t(()=>[e(d,{label:"Fecha final",modelValue:l(n).dateFinal,"onUpdate:modelValue":a[1]||(a[1]=o=>l(n).dateFinal=o)},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",sm:"2",class:"mt-7"},{default:t(()=>[e(p,{color:"primary",onClick:a[2]||(a[2]=o=>T())},{default:t(()=>[y("Buscar")]),_:1})]),_:1})]),_:1})]),_:1}),e(V),e(l(b),{headers:F,items:l(v),"items-per-page":5,modelValue:l(s),"onUpdate:modelValue":a[3]||(a[3]=o=>R(s)?s.value=o:null),"show-select":!0},null,8,["items","modelValue"]),e(V),k("div",q,[e(O,{width:"400px"},{default:t(()=>[e(U,null,{default:t(()=>[e(_,null,{default:t(()=>[e(r,null,{default:t(()=>[G,y(" "+E(l(h)),1)]),_:1})]),_:1}),e(_,null,{default:t(()=>[e(r,null,{default:t(()=>[e(p,{loading:l(u),color:"success",onClick:a[4]||(a[4]=o=>x())},{default:t(()=>[y("Pagar")]),_:1},8,["loading"])]),_:1})]),_:1})]),_:1})]),_:1})]),e(V,{class:"mt-6"}),e(l(b),{headers:w,items:l(C),"items-per-page":5},{"item.actions":t(({item:o})=>[e(p,{icon:"",size:"x-small",color:"default",variant:"text",onClick:K=>I("visualizeData",o.raw.id)},{default:t(()=>[e(j,{size:"22",icon:"mdi-eye"})]),_:2},1032,["onClick"])]),_:1},8,["items"])])}}});export{ee as _};