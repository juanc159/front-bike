import{u as x}from"./useCrudThirdStore-6f30dfd3.js";import{d as b,k as d,z as C,y as N,ar as S,o as h,c as B,p as a,w as t,m as F,V,E as y,q as s}from"./index-ecce922e.js";import{r as I}from"./validators-da167dd6.js";import{a as f,V as m}from"./VRow-1ecd9fa6.js";import{V as T}from"./VTextField-a151c4b5.js";import{V as g}from"./VForm-a9ea2bae.js";const q={class:"col-md-6 d-flex justify-content-end"},G=b({__name:"Form",props:{userId:{type:Number,default:null,required:!1}},setup(_){const c=_,i=d(),v=C(),l=x(),{formulario:u}=N(l),n=d([]),k=d([]),p=async o=>{var e;l.typeAction=o,k.value=[],n.value=[],await((e=i.value)==null?void 0:e.resetValidation()),o!="back"&&l.keyList++},w=async()=>{var e;u.value.company_id=v.company.id;const o=await((e=i.value)==null?void 0:e.validate());if(o!=null&&o.valid){const r=await l.fetchSave();r.status===200&&p("list"),r.status===422&&(n.value=r.error)}};return S(async()=>{c.userId&&await l.fetchInfo(c.userId)}),(o,e)=>(h(),B("div",null,[a(m,null,{default:t(()=>[a(f,{cols:"12"},{default:t(()=>[F("div",q,[a(V,{color:"secondary",onClick:e[0]||(e[0]=r=>p("back"))},{default:t(()=>[y(" Atras ")]),_:1})])]),_:1})]),_:1}),a(s(g),{ref_key:"formValidation",ref:i,"lazy-validation":""},{default:t(()=>[a(m,null,{default:t(()=>[a(f,{cols:"12",md:"4"},{default:t(()=>[a(T,{modelValue:s(u).name,"onUpdate:modelValue":e[1]||(e[1]=r=>s(u).name=r),rules:[s(I)],autocomplete:"off","error-messages":s(n).name,label:"Nombre",onKeypress:e[2]||(e[2]=r=>s(n).name="")},null,8,["modelValue","rules","error-messages"])]),_:1})]),_:1}),a(m,null,{default:t(()=>[a(f,{cols:"12 d-flex justify-content-center"},{default:t(()=>[a(V,{color:"primary",onClick:w},{default:t(()=>[y(" Guardar ")]),_:1})]),_:1})]),_:1})]),_:1},512)]))}});export{G as _};