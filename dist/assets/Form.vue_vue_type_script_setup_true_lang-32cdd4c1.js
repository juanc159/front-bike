import{u as _}from"./useCrudPermissionStore-51386d6f.js";import{e as b,s as g,r as p,q as w,o as x,c as C,d as a,w as o,B as u,E as c,b as v,A as m,k as s,Q as f}from"./index-5157f066.js";import{V as F}from"./VSelect-6157aeab.js";import{V as y}from"./VTextField-f6b14139.js";import{V as $}from"./VForm-8fa3c58d.js";const q=b({__name:"Form",setup(B){const i=_(),{formulario:l}=g(i),r=p([]),d=p(),V=async n=>{var e;i.typeAction=n,await((e=d.value)==null?void 0:e.resetValidation()),r.value=[],n!="back"&&i.keyList++},k=async()=>{var e;const n=await((e=d.value)==null?void 0:e.validate());if(n!=null&&n.valid){const t=await i.fetchSave(l.value);t.status===200&&V("list"),t.status===422&&(r.value=t.error)}};return w(async()=>{await i.fetchDataForm()}),(n,e)=>(x(),C("div",null,[a(m,null,{default:o(()=>[a(u,{cols:"12",class:"d-flex justify-content-end"},{default:o(()=>[a(c,{color:"secondary",onClick:e[0]||(e[0]=t=>V("back"))},{default:o(()=>[v(" Atras ")]),_:1})]),_:1})]),_:1}),a($,{ref_key:"formValidation",ref:d,"lazy-validation":""},{default:o(()=>[a(m,null,{default:o(()=>[a(u,{cols:"4"},{default:o(()=>[a(F,{items:s(i).arrayMenus,rules:[s(f)],modelValue:s(l).menu_id,"onUpdate:modelValue":[e[1]||(e[1]=t=>s(l).menu_id=t),e[2]||(e[2]=t=>s(r).menu_id="")],"item-title":"title","item-value":"id",label:"Grupo","error-messages":s(r).menu_id},null,8,["items","rules","modelValue","error-messages"])]),_:1}),a(u,{cols:"4"},{default:o(()=>[a(y,{modelValue:s(l).name,"onUpdate:modelValue":e[3]||(e[3]=t=>s(l).name=t),rules:[s(f)],"error-messages":s(r).name,label:"Nombre",onKeypress:e[4]||(e[4]=t=>s(r).name="")},null,8,["modelValue","rules","error-messages"])]),_:1}),a(u,{cols:"4"},{default:o(()=>[a(y,{modelValue:s(l).description,"onUpdate:modelValue":e[5]||(e[5]=t=>s(l).description=t),rules:[s(f)],"error-messages":s(r).description,label:"Descripción",onKeypress:e[6]||(e[6]=t=>s(r).description="")},null,8,["modelValue","rules","error-messages"])]),_:1})]),_:1}),a(m,null,{default:o(()=>[a(u,{cols:"12 d-flex justify-content-center"},{default:o(()=>[a(c,{color:"primary",onClick:e[7]||(e[7]=t=>k())},{default:o(()=>[v("Guardar")]),_:1})]),_:1})]),_:1})]),_:1},512)]))}});export{q as _};
