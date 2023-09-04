import{a as T}from"./VTextField-f6b14139.js";import{e as y,y as g,a5 as S,o as v,c as B,k as t,h as U,l as L,d as a,a6 as q,L as z,w as l,a7 as E,a8 as A,a9 as C,aa as M,g as R,r as _,s as j,q as K,Z as D,B as d,a as G,E as w,b as x,A as V,Q as I,$ as Q}from"./index-5157f066.js";import{V as Z}from"./VSelect-6157aeab.js";import{_ as H}from"./AppDateTimePicker.vue_vue_type_style_index_0_lang-183cbde0.js";import{_ as J}from"./AppTextField.vue_vue_type_script_setup_true_lang-f186a90f.js";import{u as O}from"./useCrudAdministrationStore-a8105c93.js";import{V as W}from"./VForm-8fa3c58d.js";const X=y({name:"AppSelect",inheritAttrs:!1}),Y=y({...X,setup(b){const c=g(()=>{const n=S(),r=n.id||n.label;return r?`app-select-${r}-${Math.random().toString(36).slice(2,7)}`:void 0}),f=g(()=>S().label);return(n,r)=>(v(),B("div",{class:M(["app-select flex-grow-1",n.$attrs.class])},[t(f)?(v(),U(T,{key:0,for:t(c),class:"mb-1 text-body-2 text-high-emphasis",text:t(f)},null,8,["for","text"])):L("",!0),a(Z,A(C({...n.$attrs,class:null,label:void 0,variant:"outlined",id:t(c),menuProps:{contentClass:["app-inner-list","app-select__content","v-select__content",n.$attrs.multiple!==void 0?"v-list-select-multiple":""]}})),q({_:2},[z(n.$slots,(s,u)=>({name:u,fn:l(p=>[E(n.$slots,u,A(C(p||{})))])}))]),1040)],2))}}),h={class:"col-md-6 d-flex justify-content-end"},re=y({__name:"Form",props:{userId:{type:Number,default:null,required:!1}},setup(b){const c=b,f=R(),n=_(),r=O(),{formulario:s}=j(r),u=_([]),p=[{value:1,title:"Pagado"},{value:0,title:"Sin Pagar"}],F=_([]),$=async i=>{var e;r.typeAction=i,F.value=[],u.value=[],await((e=n.value)==null?void 0:e.resetValidation()),i!="back"&&r.keyList++},N=async()=>{var e;const i=await((e=n.value)==null?void 0:e.validate());if(i!=null&&i.valid){s.value.cost=s.value.cost.replaceAll(".",""),s.value.company_id=f.company.id;const m=await r.fetchSave();m.status===200&&$("list"),m.status===422&&(u.value=m.error)}};return K(async()=>{c.userId&&(await r.fetchInfo(c.userId),s.value.cost=D(s.value.cost))}),(i,e)=>{const m=J,k=H,P=Y;return v(),B("div",null,[a(V,null,{default:l(()=>[a(d,{cols:"12"},{default:l(()=>[G("div",h,[a(w,{color:"secondary",onClick:e[0]||(e[0]=o=>$("back"))},{default:l(()=>[x(" Atras ")]),_:1})])]),_:1})]),_:1}),a(t(W),{ref_key:"formValidation",ref:n,"lazy-validation":""},{default:l(()=>[a(V,null,{default:l(()=>[a(d,{cols:"12",md:"6"},{default:l(()=>[a(m,{modelValue:t(s).name,"onUpdate:modelValue":e[1]||(e[1]=o=>t(s).name=o),rules:[t(I)],autocomplete:"off","error-messages":t(u).name,label:"Nombre",onKeypress:e[2]||(e[2]=o=>t(u).name="")},null,8,["modelValue","rules","error-messages"])]),_:1}),a(d,{cols:"12",md:"6"},{default:l(()=>[a(m,{modelValue:t(s).cost,"onUpdate:modelValue":e[3]||(e[3]=o=>t(s).cost=o),rules:[t(I)],autocomplete:"off","error-messages":t(u).cost,onBlur:e[4]||(e[4]=o=>t(s).cost=t(Q)(t(s).cost)),label:"Costo",onKeypress:e[5]||(e[5]=o=>t(u).cost="")},null,8,["modelValue","rules","error-messages"])]),_:1}),a(d,{cols:"12",md:"4"},{default:l(()=>[a(k,{modelValue:t(s).init_date,"onUpdate:modelValue":e[6]||(e[6]=o=>t(s).init_date=o),label:"Fecha Inicial"},null,8,["modelValue"])]),_:1}),a(d,{cols:"12",md:"4"},{default:l(()=>[a(k,{modelValue:t(s).final_date,"onUpdate:modelValue":e[7]||(e[7]=o=>t(s).final_date=o),label:"Fecha Final"},null,8,["modelValue"])]),_:1}),a(d,{cols:"12",md:"4"},{default:l(()=>[a(P,{items:p,modelValue:t(s).status,"onUpdate:modelValue":e[8]||(e[8]=o=>t(s).status=o),label:"Estado"},null,8,["modelValue"])]),_:1})]),_:1}),a(V,null,{default:l(()=>[a(d,{cols:"12 d-flex justify-content-center"},{default:l(()=>[a(w,{color:"primary",onClick:N},{default:l(()=>[x(" Guardar ")]),_:1})]),_:1})]),_:1})]),_:1},512)])}}});export{re as _};