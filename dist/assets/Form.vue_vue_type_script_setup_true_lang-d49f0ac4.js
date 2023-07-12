import{u as U}from"./useCrudInventoryStore-46126776.js";import{d as $,k as y,z as w,y as K,ar as T,o as g,c as A,b as I,w as s,p as o,m as N,A as v,B as b,C as q,q as e}from"./index-e5b1715d.js";import{r as n,i as F}from"./validators-e0eb24cc.js";import{a as u,V as f}from"./VRow-0d53bcfe.js";import{V as M}from"./VSelect-25a384f7.js";import{V as m}from"./VTextField-7b882186.js";import{V as R}from"./VForm-d55aee7b.js";const j={class:"col-md-6 d-flex justify-content-end"},J=$({__name:"Form",props:{userId:{type:Number,default:null,required:!1},btnBack:{type:Boolean,default:!0,required:!1}},emits:["executeAction"],setup(k,{emit:x}){const V=k,p=y(),S=w(),i=U(),{formulario:a}=K(i),t=y([]),C=y([]),c=async d=>{var l;i.typeAction=d,C.value=[],t.value=[],await((l=p.value)==null?void 0:l.resetValidation()),d!="back"&&i.keyList++},B=async()=>{var l;a.value.company_id=S.company.id;const d=await((l=p.value)==null?void 0:l.validate());if(d!=null&&d.valid){const r=await i.fetchSave();r.status===200&&(c("list"),x("executeAction",{save:!0})),r.status===422&&(t.value=r.error)}};return T(async()=>{V.userId&&await i.fetchInfo(V.userId)}),(d,l)=>(g(),A("div",null,[V.btnBack==!0?(g(),I(f,{key:0},{default:s(()=>[o(u,{cols:"12"},{default:s(()=>[N("div",j,[o(v,{color:"secondary",onClick:l[0]||(l[0]=r=>c("back"))},{default:s(()=>[b(" Atras ")]),_:1})])]),_:1})]),_:1})):q("",!0),o(e(R),{ref_key:"formValidation",ref:p,"lazy-validation":""},{default:s(()=>[o(f,null,{default:s(()=>[o(u,{cols:"12",md:"4"},{default:s(()=>[o(M,{items:["moto","carro"],modelValue:e(a).vehicleType,"onUpdate:modelValue":l[1]||(l[1]=r=>e(a).vehicleType=r),label:"Tipo de Vehículo",rules:[e(n)]},null,8,["modelValue","rules"])]),_:1}),o(u,{cols:"12",md:"4"},{default:s(()=>[o(m,{modelValue:e(a).reference,"onUpdate:modelValue":l[2]||(l[2]=r=>e(a).reference=r),rules:[e(n)],autocomplete:"off","error-messages":e(t).reference,label:"Referencia",onKeypress:l[3]||(l[3]=r=>e(t).reference="")},null,8,["modelValue","rules","error-messages"])]),_:1}),o(u,{cols:"12",md:"4"},{default:s(()=>[o(m,{modelValue:e(a).brand,"onUpdate:modelValue":l[4]||(l[4]=r=>e(a).brand=r),rules:[e(n)],"error-messages":e(t).brand,label:"Marca",onKeypress:l[5]||(l[5]=r=>e(t).brand="")},null,8,["modelValue","rules","error-messages"])]),_:1})]),_:1}),o(f,null,{default:s(()=>[o(u,{cols:"12",md:"4"},{default:s(()=>[o(m,{modelValue:e(a).model,"onUpdate:modelValue":l[6]||(l[6]=r=>e(a).model=r),rules:[e(n)],"error-messages":e(t).model,label:"Modelo",onKeypress:l[7]||(l[7]=r=>e(t).model="")},null,8,["modelValue","rules","error-messages"])]),_:1}),o(u,{cols:"12",md:"4"},{default:s(()=>[o(m,{modelValue:e(a).color,"onUpdate:modelValue":l[8]||(l[8]=r=>e(a).color=r),maxlength:"10",rules:[e(n)],"error-messages":e(t).color,label:"Color",onKeypress:l[9]||(l[9]=r=>{e(t).color=""})},null,8,["modelValue","rules","error-messages"])]),_:1}),o(u,{cols:"12",md:"4"},{default:s(()=>[o(m,{modelValue:e(a).plate,"onUpdate:modelValue":l[10]||(l[10]=r=>e(a).plate=r),maxlength:"15",rules:[e(n)],"error-messages":e(t).plate,label:"Placa",onKeypress:l[11]||(l[11]=r=>{e(t).plate=""})},null,8,["modelValue","rules","error-messages"])]),_:1}),o(u,{cols:"12",md:"6"},{default:s(()=>[o(m,{modelValue:e(a).registrationSite,"onUpdate:modelValue":l[12]||(l[12]=r=>e(a).registrationSite=r),maxlength:"15",rules:[e(n)],"error-messages":e(t).registrationSite,label:"Sitio de matricula",onKeypress:l[13]||(l[13]=r=>{e(t).registrationSite=""})},null,8,["modelValue","rules","error-messages"])]),_:1}),o(u,{cols:"12",md:"6"},{default:s(()=>[o(m,{modelValue:e(a).purchaseValue,"onUpdate:modelValue":l[14]||(l[14]=r=>e(a).purchaseValue=r),maxlength:"15",rules:[e(n),e(F)],"error-messages":e(t).purchaseValue,label:"Valor de Compra",onKeypress:l[15]||(l[15]=r=>{e(t).purchaseValue=""})},null,8,["modelValue","rules","error-messages"])]),_:1})]),_:1}),o(f,null,{default:s(()=>[o(u,{cols:"12 d-flex justify-content-center"},{default:s(()=>[o(v,{color:"primary",onClick:B},{default:s(()=>[b(" Guardar ")]),_:1})]),_:1})]),_:1})]),_:1},512)]))}});export{J as _};