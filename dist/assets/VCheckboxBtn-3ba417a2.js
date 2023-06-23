import{ao as x,a4 as g,aM as K,a9 as L,ay as Y,Y as B,a5 as _,$ as I,a0 as w,I as o,am as j,aX as q,aO as J,ac as i,a1 as P,p as m,av as N,k as S,bu as X,K as z,aK as Q,V as W,J as h,ak as Z,aH as p,bt as D,af as ee,aY as T,aU as le}from"./index-13e9e9f8.js";import{d as te}from"./VTextField-2e327a5c.js";const O=Symbol.for("vuetify:selection-control-group"),G=x({color:String,disabled:Boolean,error:Boolean,id:String,inline:Boolean,falseIcon:g,trueIcon:g,ripple:{type:Boolean,default:!0},multiple:{type:Boolean,default:null},name:String,readonly:Boolean,modelValue:null,type:String,valueComparator:{type:Function,default:K},...L(),...Y()},"v-selection-control-group");B()({name:"VSelectionControlGroup",props:{defaultsTarget:{type:String,default:"VSelectionControl"},..._(),...G()},emits:{"update:modelValue":e=>!0},setup(e,u){let{slots:c}=u;const l=I(e,"modelValue"),t=w(),d=o(()=>e.id||`v-selection-control-group-${t}`),r=o(()=>e.name||d.value),a=new Set;return j(O,{modelValue:l,forceUpdate:()=>{a.forEach(n=>n())},onForceUpdate:n=>{a.add(n),q(()=>{a.delete(n)})}}),J({[e.defaultsTarget]:{color:i(e,"color"),disabled:i(e,"disabled"),density:i(e,"density"),error:i(e,"error"),inline:i(e,"inline"),modelValue:l,multiple:o(()=>!!e.multiple||e.multiple==null&&Array.isArray(l.value)),name:r,falseIcon:i(e,"falseIcon"),trueIcon:i(e,"trueIcon"),readonly:i(e,"readonly"),ripple:i(e,"ripple"),type:i(e,"type"),valueComparator:i(e,"valueComparator")}}),P(()=>{var n;return m("div",{class:["v-selection-control-group",{"v-selection-control-group--inline":e.inline},e.class],style:e.style,role:e.type==="radio"?"radiogroup":void 0},[(n=c.default)==null?void 0:n.call(c)])}),{}}});const R=x({label:String,trueValue:null,falseValue:null,value:null,..._(),...G()},"v-selection-control");function ae(e){const u=Z(O,void 0),{densityClasses:c}=p(e),l=I(e,"modelValue"),t=o(()=>e.trueValue!==void 0?e.trueValue:e.value!==void 0?e.value:!0),d=o(()=>e.falseValue!==void 0?e.falseValue:!1),r=o(()=>!!e.multiple||e.multiple==null&&Array.isArray(l.value)),a=o({get(){const f=u?u.modelValue.value:l.value;return r.value?f.some(s=>e.valueComparator(s,t.value)):e.valueComparator(f,t.value)},set(f){if(e.readonly)return;const s=f?t.value:d.value;let v=s;r.value&&(v=f?[...D(l.value),s]:D(l.value).filter(V=>!e.valueComparator(V,t.value))),u?u.modelValue.value=v:l.value=v}}),{textColorClasses:n,textColorStyles:b}=ee(o(()=>a.value&&!e.error&&!e.disabled?e.color:void 0)),k=o(()=>a.value?e.trueIcon:e.falseIcon);return{group:u,densityClasses:c,trueValue:t,falseValue:d,model:a,textColorClasses:n,textColorStyles:b,icon:k}}const ne=B()({name:"VSelectionControl",directives:{Ripple:N},inheritAttrs:!1,props:R(),emits:{"update:modelValue":e=>!0},setup(e,u){let{attrs:c,slots:l}=u;const{group:t,densityClasses:d,icon:r,model:a,textColorClasses:n,textColorStyles:b,trueValue:k}=ae(e),f=w(),s=o(()=>e.id||`input-${f}`),v=S(!1),V=S(!1),C=S();t==null||t.onForceUpdate(()=>{C.value&&(C.value.checked=a.value)});function A(y){v.value=!0,(!T||T&&y.target.matches(":focus-visible"))&&(V.value=!0)}function F(){v.value=!1,V.value=!1}function E(y){e.readonly&&t&&le(()=>t.forceUpdate()),a.value=y.target.checked}return P(()=>{var U,$;const y=l.label?l.label({label:e.label,props:{for:s.value}}):e.label,[M,H]=X(c);return m("div",h({class:["v-selection-control",{"v-selection-control--dirty":a.value,"v-selection-control--disabled":e.disabled,"v-selection-control--error":e.error,"v-selection-control--focused":v.value,"v-selection-control--focus-visible":V.value,"v-selection-control--inline":e.inline},d.value,e.class]},M,{style:e.style}),[m("div",{class:["v-selection-control__wrapper",n.value],style:b.value},[(U=l.default)==null?void 0:U.call(l),z(m("div",{class:["v-selection-control__input"]},[r.value&&m(W,{key:"icon",icon:r.value},null),m("input",h({ref:C,checked:a.value,disabled:e.disabled,id:s.value,onBlur:F,onFocus:A,onInput:E,"aria-disabled":e.readonly,type:e.type,value:k.value,name:e.name,"aria-checked":e.type==="checkbox"?a.value:void 0},H),null),($=l.input)==null?void 0:$.call(l,{model:a,textColorClasses:n,textColorStyles:b,props:{onFocus:A,onBlur:F,id:s.value}})]),[[Q("ripple"),e.ripple&&[!e.disabled&&!e.readonly,null,["center","circle"]]]])]),y&&m(te,{for:s.value,clickable:!0},{default:()=>[y]})])}),{isFocused:v,input:C}}}),oe=x({indeterminate:Boolean,indeterminateIcon:{type:g,default:"$checkboxIndeterminate"},...R({falseIcon:"$checkboxOff",trueIcon:"$checkboxOn"})},"v-checkbox-btn"),ce=B()({name:"VCheckboxBtn",props:oe(),emits:{"update:modelValue":e=>!0,"update:indeterminate":e=>!0},setup(e,u){let{slots:c}=u;const l=I(e,"indeterminate"),t=I(e,"modelValue");function d(n){l.value&&(l.value=!1)}const r=o(()=>e.indeterminate?e.indeterminateIcon:e.falseIcon),a=o(()=>e.indeterminate?e.indeterminateIcon:e.trueIcon);return P(()=>m(ne,h(e,{modelValue:t.value,"onUpdate:modelValue":[n=>t.value=n,d],class:["v-checkbox-btn",e.class],style:e.style,type:"checkbox",inline:!0,falseIcon:r.value,trueIcon:a.value,"aria-checked":e.indeterminate?"mixed":void 0}),c)),{}}});export{ce as V,R as a,ne as b,oe as m};
