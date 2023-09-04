import{u as C}from"./useCrudInventoryStore-c67f8e80.js";import{e as U,r as v,g as w,s as K,q as A,o as c,c as I,h as N,w as s,d as a,B as u,a as T,E as g,b,A as f,l as q,k as e,Q as n,$ as F}from"./index-5157f066.js";import{V as M}from"./VSelect-6157aeab.js";import{V as m}from"./VTextField-f6b14139.js";import{V as R}from"./VForm-8fa3c58d.js";const j={class:"col-md-6 d-flex justify-content-end"},Q=U({__name:"Form",props:{userId:{type:Number,default:null,required:!1},btnBack:{type:Boolean,default:!0,required:!1}},emits:["executeAction"],setup(k,{emit:x}){const p=k,V=v(),S=w(),i=C(),{formulario:o}=K(i),t=v([]),B=v([]),y=async d=>{var l;i.typeAction=d,B.value=[],t.value=[],await((l=V.value)==null?void 0:l.resetValidation()),d!="back"&&i.keyList++},$=async()=>{var l;o.value.company_id=S.company.id;const d=await((l=V.value)==null?void 0:l.validate());if(d!=null&&d.valid){o.value.purchaseValue=o.value.purchaseValue.replaceAll(".","");const r=await i.fetchSave();r.status===200&&(y("list"),x("executeAction",{save:!0})),r.status===422&&(t.value=r.error)}};return A(async()=>{p.userId&&await i.fetchInfo(p.userId)}),(d,l)=>(c(),I("div",null,[p.btnBack==!0?(c(),N(f,{key:0},{default:s(()=>[a(u,{cols:"12"},{default:s(()=>[T("div",j,[a(g,{color:"secondary",onClick:l[0]||(l[0]=r=>y("back"))},{default:s(()=>[b(" Atras ")]),_:1})])]),_:1})]),_:1})):q("",!0),a(e(R),{ref_key:"formValidation",ref:V,"lazy-validation":""},{default:s(()=>[a(f,null,{default:s(()=>[a(u,{cols:"12",md:"4"},{default:s(()=>[a(M,{items:["moto","carro"],modelValue:e(o).vehicleType,"onUpdate:modelValue":l[1]||(l[1]=r=>e(o).vehicleType=r),label:"Tipo de Vehículo",rules:[e(n)]},null,8,["modelValue","rules"])]),_:1}),a(u,{cols:"12",md:"4"},{default:s(()=>[a(m,{modelValue:e(o).reference,"onUpdate:modelValue":l[2]||(l[2]=r=>e(o).reference=r),rules:[e(n)],autocomplete:"off","error-messages":e(t).reference,label:"Referencia",onKeypress:l[3]||(l[3]=r=>e(t).reference="")},null,8,["modelValue","rules","error-messages"])]),_:1}),a(u,{cols:"12",md:"4"},{default:s(()=>[a(m,{modelValue:e(o).brand,"onUpdate:modelValue":l[4]||(l[4]=r=>e(o).brand=r),rules:[e(n)],"error-messages":e(t).brand,label:"Marca",onKeypress:l[5]||(l[5]=r=>e(t).brand="")},null,8,["modelValue","rules","error-messages"])]),_:1})]),_:1}),a(f,null,{default:s(()=>[a(u,{cols:"12",md:"4"},{default:s(()=>[a(m,{modelValue:e(o).model,"onUpdate:modelValue":l[6]||(l[6]=r=>e(o).model=r),rules:[e(n)],"error-messages":e(t).model,label:"Modelo",onKeypress:l[7]||(l[7]=r=>e(t).model="")},null,8,["modelValue","rules","error-messages"])]),_:1}),a(u,{cols:"12",md:"4"},{default:s(()=>[a(m,{modelValue:e(o).color,"onUpdate:modelValue":l[8]||(l[8]=r=>e(o).color=r),maxlength:"10",rules:[e(n)],"error-messages":e(t).color,label:"Color",onKeypress:l[9]||(l[9]=r=>{e(t).color=""})},null,8,["modelValue","rules","error-messages"])]),_:1}),a(u,{cols:"12",md:"4"},{default:s(()=>[a(m,{modelValue:e(o).plate,"onUpdate:modelValue":l[10]||(l[10]=r=>e(o).plate=r),maxlength:"15",rules:[e(n)],"error-messages":e(t).plate,label:"Placa",onKeypress:l[11]||(l[11]=r=>{e(t).plate=""})},null,8,["modelValue","rules","error-messages"])]),_:1}),a(u,{cols:"12",md:"6"},{default:s(()=>[a(m,{modelValue:e(o).registrationSite,"onUpdate:modelValue":l[12]||(l[12]=r=>e(o).registrationSite=r),maxlength:"15",rules:[e(n)],"error-messages":e(t).registrationSite,label:"Sitio de matricula",onKeypress:l[13]||(l[13]=r=>{e(t).registrationSite=""})},null,8,["modelValue","rules","error-messages"])]),_:1}),a(u,{cols:"12",md:"6"},{default:s(()=>[a(m,{modelValue:e(o).purchaseValue,"onUpdate:modelValue":l[14]||(l[14]=r=>e(o).purchaseValue=r),maxlength:"15",rules:[e(n)],"error-messages":e(t).purchaseValue,label:"Valor de Compra",onKeypress:l[15]||(l[15]=r=>{e(t).purchaseValue=""}),onBlur:l[16]||(l[16]=r=>e(o).purchaseValue=e(F)(e(o).purchaseValue))},null,8,["modelValue","rules","error-messages"])]),_:1})]),_:1}),a(f,null,{default:s(()=>[a(u,{cols:"12 d-flex justify-content-center"},{default:s(()=>[a(g,{color:"primary",onClick:$},{default:s(()=>[b(" Guardar ")]),_:1})]),_:1})]),_:1})]),_:1},512)]))}});export{Q as _};