import{u as x}from"./useCrudThirdStore-5a509418.js";import{d as C,k as d,z as b,y as N,aq as S,o as h,c as q,p as a,w as t,H as c,m as B,C as V,E as y,G as f,q as r,aw as F}from"./index-62eefdbf.js";import{V as I}from"./VTextField-afc15bd9.js";import{V as T}from"./VForm-28894a98.js";const g={class:"col-md-6 d-flex justify-content-end"},G=C({__name:"Form",props:{userId:{type:Number,default:null,required:!1}},setup(_){const m=_,u=d(),v=b(),l=x(),{formulario:i}=N(l),n=d([]),k=d([]),p=async o=>{var e;l.typeAction=o,k.value=[],n.value=[],await((e=u.value)==null?void 0:e.resetValidation()),o!="back"&&l.keyList++},w=async()=>{var e;i.value.company_id=v.company.id;const o=await((e=u.value)==null?void 0:e.validate());if(o!=null&&o.valid){const s=await l.fetchSave();s.status===200&&p("list"),s.status===422&&(n.value=s.error)}};return S(async()=>{m.userId&&await l.fetchInfo(m.userId)}),(o,e)=>(h(),q("div",null,[a(f,null,{default:t(()=>[a(c,{cols:"12"},{default:t(()=>[B("div",g,[a(V,{color:"secondary",onClick:e[0]||(e[0]=s=>p("back"))},{default:t(()=>[y(" Atras ")]),_:1})])]),_:1})]),_:1}),a(r(T),{ref_key:"formValidation",ref:u,"lazy-validation":""},{default:t(()=>[a(f,null,{default:t(()=>[a(c,{cols:"12",md:"4"},{default:t(()=>[a(I,{modelValue:r(i).name,"onUpdate:modelValue":e[1]||(e[1]=s=>r(i).name=s),rules:[r(F)],autocomplete:"off","error-messages":r(n).name,label:"Nombre",onKeypress:e[2]||(e[2]=s=>r(n).name="")},null,8,["modelValue","rules","error-messages"])]),_:1})]),_:1}),a(f,null,{default:t(()=>[a(c,{cols:"12 d-flex justify-content-center"},{default:t(()=>[a(V,{color:"primary",onClick:w},{default:t(()=>[y(" Guardar ")]),_:1})]),_:1})]),_:1})]),_:1},512)]))}});export{G as _};