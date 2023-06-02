import{u as ce}from"./useCrudSaleStore-0acb0318.js";import{Y as fe,aD as me,$ as ve,N as b,k as x,aq as oe,L as B,aE as Ve,a1 as xe,aF as ye,p as t,O as K,F as $,Q as ee,aG as he,aH as ge,aI as J,aJ as _e,aK as pe,aL as be,d as we,z as Ce,y as ke,o as Q,c as Y,w as s,H as g,m as i,C as A,E as W,G as F,q as o,aw as G,x as S,aM as Fe,V as te,a as Se}from"./index-62eefdbf.js";import{S as Ie}from"./sweetalert2.all-09c1f25c.js";import{V as le}from"./VSelect-099d6728.js";import{m as Pe,a as Te,u as Ne,b as ae,f as Re,c as Be,d as ze,V as Me}from"./VTextField-afc15bd9.js";import{f as De}from"./forwardRefs-9d31fcaa.js";import{V as He}from"./VTable-35230ba2.js";import{V as ne}from"./VForm-28894a98.js";const Ue=fe()({name:"VTextarea",directives:{Intersect:me},inheritAttrs:!1,props:{autoGrow:Boolean,autofocus:Boolean,counter:[Boolean,Number,String],counterValue:Function,prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,noResize:Boolean,rows:{type:[Number,String],default:5,validator:e=>!isNaN(parseFloat(e))},maxRows:{type:[Number,String],validator:e=>!isNaN(parseFloat(e))},suffix:String,modelModifiers:Object,...Pe(),...Te()},emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,z){let{attrs:p,emit:I,slots:m}=z;const d=ve(e,"modelValue"),{isFocused:r,focus:w,blur:M}=Ne(e),_=b(()=>typeof e.counterValue=="function"?e.counterValue(d.value):(d.value||"").toString().length),E=b(()=>{if(p.maxlength)return p.maxlength;if(!(!e.counter||typeof e.counter!="number"&&typeof e.counter!="string"))return e.counter});function D(u,f){var c,h;!e.autofocus||!u||(h=(c=f[0].target)==null?void 0:c.focus)==null||h.call(c)}const v=x(),C=x(),H=x(""),k=x(),q=b(()=>r.value||e.persistentPlaceholder);function P(){var u;k.value!==document.activeElement&&((u=k.value)==null||u.focus()),r.value||w()}function T(u){P(),I("click:control",u)}function U(u){I("mousedown:control",u)}function a(u){u.stopPropagation(),P(),J(()=>{d.value="",_e(e["onClick:clear"],u)})}function l(u){var c;const f=u.target;if(d.value=f.value,(c=e.modelModifiers)!=null&&c.trim){const h=[f.selectionStart,f.selectionEnd];J(()=>{f.selectionStart=h[0],f.selectionEnd=h[1]})}}const n=x();function V(){e.autoGrow&&J(()=>{if(!n.value||!C.value)return;const u=getComputedStyle(n.value),f=getComputedStyle(C.value.$el),c=parseFloat(u.getPropertyValue("--v-field-padding-top"))+parseFloat(u.getPropertyValue("--v-input-padding-top"))+parseFloat(u.getPropertyValue("--v-field-padding-bottom")),h=n.value.scrollHeight,L=parseFloat(u.lineHeight),j=Math.max(parseFloat(e.rows)*L+c,parseFloat(f.getPropertyValue("--v-input-control-height"))),O=parseFloat(e.maxRows)*L+c||1/0;H.value=pe(be(h??0,j,O))})}oe(V),B(d,V),B(()=>e.rows,V),B(()=>e.maxRows,V),B(()=>e.density,V);let y;return B(n,u=>{u?(y=new ResizeObserver(V),y.observe(n.value)):y==null||y.disconnect()}),Ve(()=>{y==null||y.disconnect()}),xe(()=>{const u=!!(m.counter||e.counter||e.counterValue),f=!!(u||m.details),[c,h]=ye(p),[{modelValue:L,...j}]=ae.filterProps(e),[O]=Re(e);return t(ae,K({ref:v,modelValue:d.value,"onUpdate:modelValue":N=>d.value=N,class:["v-textarea v-text-field",{"v-textarea--prefixed":e.prefix,"v-textarea--suffixed":e.suffix,"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-textarea--auto-grow":e.autoGrow,"v-textarea--no-resize":e.noResize||e.autoGrow,"v-text-field--flush-details":["plain","underlined"].includes(e.variant)},e.class],style:e.style},c,j,{focused:r.value}),{...m,default:N=>{let{isDisabled:R,isDirty:X,isReadonly:ue,isValid:re}=N;return t(Be,K({ref:C,style:{"--v-textarea-control-height":H.value},onClick:T,onMousedown:U,"onClick:clear":a,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"],role:"textbox"},O,{active:q.value||X.value,dirty:X.value||e.dirty,disabled:R.value,focused:r.value,error:re.value===!1}),{...m,default:ie=>{let{props:{class:Z,...se}}=ie;return t($,null,[e.prefix&&t("span",{class:"v-text-field__prefix"},[e.prefix]),ee(t("textarea",K({ref:k,class:Z,value:d.value,onInput:l,autofocus:e.autofocus,readonly:ue.value,disabled:R.value,placeholder:e.placeholder,rows:e.rows,name:e.name,onFocus:P,onBlur:M},se,h),null),[[he("intersect"),{handler:D},null,{once:!0}]]),e.autoGrow&&ee(t("textarea",{class:[Z,"v-textarea__sizer"],"onUpdate:modelValue":de=>d.value=de,ref:n,readonly:!0,"aria-hidden":"true"},null),[[ge,d.value]]),e.suffix&&t("span",{class:"v-text-field__suffix"},[e.suffix])])}})},details:f?N=>{var R;return t($,null,[(R=m.details)==null?void 0:R.call(m,N),u&&t($,null,[t("span",null,null),t(ze,{active:e.persistentCounter||r.value,value:_.value,max:E.value},m.counter)])])}:void 0})}),De({},v,C,k)}}),Ae={class:"col-md-6 d-flex justify-content-end"},Ge=i("br",null,null,-1),$e=i("thead",null,[i("tr",null,[i("th",null," Tercero "),i("th",null," Monto "),i("th",null," Acción ")])],-1),Ee=i("td",null,[i("b",null," Total")],-1),qe=i("td",null,[i("b",null," Utilidades")],-1),Xe=we({__name:"Form",props:{userId:{type:Number,default:null,required:!1}},setup(e){const z=e,p=x(),I=x(),m=Ce(),d=ce(),{formulario:r,inventories:w,thirds:M}=ke(d),_=x([]),E=x([]),D=async a=>{var l;d.typeAction=a,E.value=[],_.value=[],await((l=p.value)==null?void 0:l.resetValidation()),a!="back"&&d.keyList++},v=x({id:null,amount:null}),C=async()=>{var l;const a=await((l=I.value)==null?void 0:l.validate());if(a!=null&&a.valid){const n=M.value.find(V=>V.id==v.value.id);n&&(r.value.thirds.push({id:n.id,name:n.name,amount:v.value.amount}),v.value={id:null,amount:null})}},H=a=>{r.value.thirds=r.value.thirds.filter(l=>l.id!=a)},k=async()=>{var l;r.value.company_id=m.company.id,r.value.total=T.value,r.value.utilities=U.value;const a=await((l=p.value)==null?void 0:l.validate());if(a!=null&&a.valid){if(r.value.thirds.length==0)return Ie.fire("Debe agregar almenos un tercero"),!1;const n=await d.fetchSave();n.status===200&&D("list"),n.status===422&&(_.value=n.error)}},q=b(()=>{const a=w.value.find(l=>l.id==r.value.inventory_id);return(a==null?void 0:a.purchaseValue)??0}),P=b(()=>{const a=w.value.find(l=>l.id==r.value.inventory_id);return(a==null?void 0:a.saleValue)??0}),T=b(()=>r.value.thirds.reduce((a,l)=>Number(a)+Number(l.amount),0)),U=b(()=>{const a=w.value.find(l=>l.id==r.value.inventory_id);return(a==null?void 0:a.saleValue)-(Number((a==null?void 0:a.purchaseValue)??0)+Number(T.value??0))});return oe(async()=>{await d.fetchDataForm(),z.userId&&await d.fetchInfo(z.userId)}),(a,l)=>(Q(),Y("div",null,[t(F,null,{default:s(()=>[t(g,{cols:"12"},{default:s(()=>[i("div",Ae,[t(A,{color:"secondary",onClick:l[0]||(l[0]=n=>D("back"))},{default:s(()=>[W(" Atras ")]),_:1})])]),_:1})]),_:1}),t(o(ne),{ref_key:"formValidation",ref:p,"lazy-validation":""},{default:s(()=>[t(F,null,{default:s(()=>[t(g,{cols:"12",md:"4"},{default:s(()=>[t(le,{clearable:"",modelValue:o(r).inventory_id,"onUpdate:modelValue":[l[1]||(l[1]=n=>o(r).inventory_id=n),l[2]||(l[2]=n=>o(_).inventory_id="")],"item-title":"reference","item-value":"id",items:o(w),rules:[o(G)],"error-messages":o(_).inventory_id,label:"Inventario"},null,8,["modelValue","items","rules","error-messages"]),i("div",null,[i("b",null,"Valor Compra: "+S(o(q)),1),W(),Ge,i("b",null,"Valor Venta: "+S(o(P)),1)])]),_:1}),t(g,{cols:"12",md:"8"},{default:s(()=>[t(o(ne),{ref_key:"formThirdValidation",ref:I,"lazy-validation":""},{default:s(()=>[t(F,null,{default:s(()=>[t(g,{cols:"12",md:"4"},{default:s(()=>[t(le,{rules:[o(G)],clearable:"",modelValue:o(v).id,"onUpdate:modelValue":l[3]||(l[3]=n=>o(v).id=n),"item-title":"name","item-value":"id",items:o(M),label:"Tercero"},null,8,["rules","modelValue","items"])]),_:1}),t(g,{cols:"12",md:"4"},{default:s(()=>[t(Me,{rules:[o(G),o(Fe)],modelValue:o(v).amount,"onUpdate:modelValue":l[4]||(l[4]=n=>o(v).amount=n),label:"Monto"},null,8,["rules","modelValue"])]),_:1}),t(g,{cols:"12",md:"4"},{default:s(()=>[t(A,{size:"40",onClick:l[5]||(l[5]=n=>C()),flat:"",icon:"",color:"primary"},{default:s(()=>[t(te,{icon:"tabler-plus"})]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1}),t(F,null,{default:s(()=>[t(g,{cols:"12",md:"4"},{default:s(()=>[t(Ue,{clearable:"",modelValue:o(r).description,"onUpdate:modelValue":l[6]||(l[6]=n=>o(r).description=n),rules:[o(G)],"error-messages":o(_).description,label:"Descripcion",onKeypress:l[7]||(l[7]=n=>o(_).description="")},null,8,["modelValue","rules","error-messages"])]),_:1}),t(g,{cols:"12",md:"6"},{default:s(()=>[t(He,{class:"text-no-wrap"},{default:s(()=>[$e,i("tbody",null,[(Q(!0),Y($,null,Se(o(r).thirds,(n,V)=>(Q(),Y("tr",{key:V},[i("td",null,S(n.name),1),i("td",null,S(n.amount),1),i("td",null,[t(A,{onClick:y=>H(n.id),flat:"",icon:"",color:"error",size:"40"},{default:s(()=>[t(te,{icon:"tabler-trash"})]),_:2},1032,["onClick"])])]))),128)),i("tr",null,[Ee,i("td",null,S(o(T)),1)]),i("tr",null,[qe,i("td",null,S(o(U)),1)])])]),_:1})]),_:1})]),_:1}),t(F),t(F,null,{default:s(()=>[t(g,{cols:"12 d-flex justify-content-center"},{default:s(()=>[t(A,{color:"primary",onClick:k},{default:s(()=>[W(" Guardar ")]),_:1})]),_:1})]),_:1})]),_:1},512)]))}});export{Xe as _};
