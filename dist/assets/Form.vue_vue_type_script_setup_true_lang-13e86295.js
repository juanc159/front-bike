import{u as x}from"./useCrudMecanicStore-f3b34f5c.js";import{e as C,r as f,g as w,s as S,o as A,c as B,d as l,w as o,B as u,a as N,E as y,b as v,A as c,k as a,Q as i}from"./index-5157f066.js";import{V}from"./VTextField-f6b14139.js";import{V as F}from"./VSelect-6157aeab.js";import{V as U}from"./VForm-8fa3c58d.js";const $={class:"col-md-6 d-flex justify-content-end"},R=C({__name:"Form",props:{userId:{type:Number,default:null,required:!1}},setup(E){const _=[{value:1,title:"Activo"},{value:2,title:"Inactivo"}],m=f(),b=w(),d=x(),{formulario:s}=S(d),r=f([]),k=f([]),p=async n=>{var e;d.typeAction=n,k.value=[],r.value=[],await((e=m.value)==null?void 0:e.resetValidation()),n!="back"&&d.keyList++},g=async()=>{var e;const n=await((e=m.value)==null?void 0:e.validate());if(n!=null&&n.valid){s.value.company_id=b.company.id;const t=await d.fetchSave();t.code===200&&p("list"),t.code===422&&(r.value=t.error)}};return(n,e)=>(A(),B("div",null,[l(c,null,{default:o(()=>[l(u,{cols:"12"},{default:o(()=>[N("div",$,[l(y,{color:"secondary",onClick:e[0]||(e[0]=t=>p("back"))},{default:o(()=>[v(" Atras ")]),_:1})])]),_:1})]),_:1}),l(a(U),{ref_key:"formValidation",ref:m,"lazy-validation":""},{default:o(()=>[l(c,null,{default:o(()=>[l(u,{cols:"12",md:"6"},{default:o(()=>[l(V,{modelValue:a(s).name,"onUpdate:modelValue":e[1]||(e[1]=t=>a(s).name=t),rules:[a(i)],autocomplete:"off","error-messages":a(r).name,label:"Nombre",onKeypress:e[2]||(e[2]=t=>a(r).name="")},null,8,["modelValue","rules","error-messages"])]),_:1}),l(u,{cols:"12",md:"6"},{default:o(()=>[l(V,{modelValue:a(s).last_name,"onUpdate:modelValue":e[3]||(e[3]=t=>a(s).last_name=t),rules:[a(i)],autocomplete:"off","error-messages":a(r).last_name,label:"Apellidos",onKeypress:e[4]||(e[4]=t=>a(r).last_name="")},null,8,["modelValue","rules","error-messages"])]),_:1}),l(u,{cols:"12",md:"6"},{default:o(()=>[l(V,{modelValue:a(s).identify,"onUpdate:modelValue":e[5]||(e[5]=t=>a(s).identify=t),rules:[a(i)],autocomplete:"off","error-messages":a(r).identify,label:"Cédula",onKeypress:e[6]||(e[6]=t=>a(r).identify="")},null,8,["modelValue","rules","error-messages"])]),_:1}),l(u,{cols:"12",md:"6"},{default:o(()=>[l(F,{rules:[a(i)],modelValue:a(s).status,"onUpdate:modelValue":e[7]||(e[7]=t=>a(s).status=t),clearable:"",items:_,label:"Estado"},null,8,["rules","modelValue"])]),_:1})]),_:1}),l(c,null,{default:o(()=>[l(u,{cols:"12 d-flex justify-content-center"},{default:o(()=>[l(y,{color:"primary",onClick:g},{default:o(()=>[v(" Guardar ")]),_:1})]),_:1})]),_:1})]),_:1},512)]))}});export{R as _};