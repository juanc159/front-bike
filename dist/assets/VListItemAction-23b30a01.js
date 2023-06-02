import{Y as g,aa as x,ab as m,ac as P,ad as T,ae as b,af as L,ag as R,ah as A,ai as c,aj as I,ak as _,al as w,am as Y,an as $,a1 as f,ao as X,p as o,ap as j,Q as D,R as M,O as u,V as O}from"./index-62eefdbf.js";const q=g()({name:"VBadge",inheritAttrs:!1,props:{bordered:Boolean,color:String,content:[Number,String],dot:Boolean,floating:Boolean,icon:x,inline:Boolean,label:{type:String,default:"$vuetify.badge"},max:[Number,String],modelValue:{type:Boolean,default:!0},offsetX:[Number,String],offsetY:[Number,String],textColor:String,...m(),...P({location:"top end"}),...T(),...b(),...L(),...R({transition:"scale-rotate-transition"})},setup(e,t){const{backgroundColorClasses:n,backgroundColorStyles:v}=A(c(e,"color")),{roundedClasses:C}=I(e),{t:y}=_(),{textColorClasses:V,textColorStyles:k}=w(c(e,"textColor")),{themeClasses:B}=Y(),{locationStyles:S}=$(e,!0,a=>(e.floating?e.dot?2:4:e.dot?8:12)+(["top","bottom"].includes(a)?+(e.offsetY??0):["left","right"].includes(a)?+(e.offsetX??0):0));return f(()=>{const a=Number(e.content),s=!e.max||isNaN(a)?e.content:a<=+e.max?a:`${e.max}+`,[h,N]=X(t.attrs,["aria-atomic","aria-label","aria-live","role","title"]);return o(e.tag,u({class:["v-badge",{"v-badge--bordered":e.bordered,"v-badge--dot":e.dot,"v-badge--floating":e.floating,"v-badge--inline":e.inline},e.class]},N,{style:e.style}),{default:()=>{var l,i;return[o("div",{class:"v-badge__wrapper"},[(i=(l=t.slots).default)==null?void 0:i.call(l),o(j,{transition:e.transition},{default:()=>{var r,d;return[D(o("span",u({class:["v-badge__badge",B.value,n.value,C.value,V.value],style:[v.value,k.value,e.inline?{}:S.value],"aria-atomic":"true","aria-label":y(e.label,a),"aria-live":"polite",role:"status"},h),[e.dot?void 0:t.slots.badge?(d=(r=t.slots).badge)==null?void 0:d.call(r):e.icon?o(O,{icon:e.icon},null):s]),[[M,e.modelValue]])]}})])]}})}),{}}}),z=g()({name:"VListItemAction",props:{start:Boolean,end:Boolean,...m(),...b()},setup(e,t){let{slots:n}=t;return f(()=>o(e.tag,{class:["v-list-item-action",{"v-list-item-action--start":e.start,"v-list-item-action--end":e.end},e.class],style:e.style},n)),{}}});export{q as V,z as a};
