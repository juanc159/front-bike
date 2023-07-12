import{d as T,V as S}from"./VTextField-7b882186.js";import{d as b,I as $,bN as C,o as v,c as F,q as t,b as U,C as z,p as a,bS as q,a as L,w as s,n as R,bP as A,bQ as g,s as j,z as E,k as V,y as K,ar as M,m as D,A as I,B as w}from"./index-e5b1715d.js";import{V as G}from"./VSelect-25a384f7.js";import{_ as Q}from"./AppDateTimePicker.vue_vue_type_style_index_0_lang-131f56e0.js";import{u as h}from"./useCrudAdministrationStore-f099214e.js";import{r as x}from"./validators-e0eb24cc.js";import{a as d,V as _}from"./VRow-0d53bcfe.js";import{V as H}from"./VForm-d55aee7b.js";const J=b({name:"AppSelect",inheritAttrs:!1}),O=b({...J,setup(y){const c=$(()=>{const l=C(),n=l.id||l.label;return n?`app-select-${n}-${Math.random().toString(36).slice(2,7)}`:void 0}),f=$(()=>C().label);return(l,n)=>(v(),F("div",{class:j(["app-select flex-grow-1",l.$attrs.class])},[t(f)?(v(),U(T,{key:0,for:t(c),class:"mb-1 text-body-2 text-high-emphasis",text:t(f)},null,8,["for","text"])):z("",!0),a(G,A(g({...l.$attrs,class:null,label:void 0,variant:"outlined",id:t(c),menuProps:{contentClass:["app-inner-list","app-select__content","v-select__content",l.$attrs.multiple!==void 0?"v-list-select-multiple":""]}})),q({_:2},[L(l.$slots,(o,i)=>({name:i,fn:s(p=>[R(l.$slots,i,A(g(p||{})))])}))]),1040)],2))}}),W={class:"col-md-6 d-flex justify-content-end"},oe=b({__name:"Form",props:{userId:{type:Number,default:null,required:!1}},setup(y){const c=y,f=E(),l=V(),n=h(),{formulario:o}=K(n),i=V([]),p=[{value:1,title:"Activo"},{value:0,title:"Inactivo"}],N=V([]),k=async u=>{var e;n.typeAction=u,N.value=[],i.value=[],await((e=l.value)==null?void 0:e.resetValidation()),u!="back"&&n.keyList++},B=async()=>{var e;const u=await((e=l.value)==null?void 0:e.validate());if(u!=null&&u.valid){o.value.company_id=f.company.id;const m=await n.fetchSave();m.status===200&&k("list"),m.status===422&&(i.value=m.error)}};return M(async()=>{c.userId&&await n.fetchInfo(c.userId)}),(u,e)=>{const m=Q,P=O;return v(),F("div",null,[a(_,null,{default:s(()=>[a(d,{cols:"12"},{default:s(()=>[D("div",W,[a(I,{color:"secondary",onClick:e[0]||(e[0]=r=>k("back"))},{default:s(()=>[w(" Atras ")]),_:1})])]),_:1})]),_:1}),a(t(H),{ref_key:"formValidation",ref:l,"lazy-validation":""},{default:s(()=>[a(_,null,{default:s(()=>[a(d,{cols:"12",md:"6"},{default:s(()=>[a(S,{modelValue:t(o).name,"onUpdate:modelValue":e[1]||(e[1]=r=>t(o).name=r),rules:[t(x)],autocomplete:"off","error-messages":t(i).name,label:"Nombre",onKeypress:e[2]||(e[2]=r=>t(i).name="")},null,8,["modelValue","rules","error-messages"])]),_:1}),a(d,{cols:"12",md:"6"},{default:s(()=>[a(S,{modelValue:t(o).cost,"onUpdate:modelValue":e[3]||(e[3]=r=>t(o).cost=r),rules:[t(x)],autocomplete:"off","error-messages":t(i).cost,label:"Costo",onKeypress:e[4]||(e[4]=r=>t(i).cost=""),type:"number"},null,8,["modelValue","rules","error-messages"])]),_:1}),a(d,{cols:"12",md:"4"},{default:s(()=>[a(m,{modelValue:t(o).init_date,"onUpdate:modelValue":e[5]||(e[5]=r=>t(o).init_date=r),label:"Fecha Inicial"},null,8,["modelValue"])]),_:1}),a(d,{cols:"12",md:"4"},{default:s(()=>[a(m,{modelValue:t(o).final_date,"onUpdate:modelValue":e[6]||(e[6]=r=>t(o).final_date=r),label:"Fecha Final"},null,8,["modelValue"])]),_:1}),a(d,{cols:"12",md:"4"},{default:s(()=>[a(P,{items:p,modelValue:t(o).status,"onUpdate:modelValue":e[7]||(e[7]=r=>t(o).status=r),label:"Estado"},null,8,["modelValue"])]),_:1})]),_:1}),a(_,null,{default:s(()=>[a(d,{cols:"12 d-flex justify-content-center"},{default:s(()=>[a(I,{color:"primary",onClick:B},{default:s(()=>[w(" Guardar ")]),_:1})]),_:1})]),_:1})]),_:1},512)])}}});export{oe as _};