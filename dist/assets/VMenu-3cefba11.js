import{f as M}from"./forwardRefs-9d31fcaa.js";import{Y as w,Z as D,$ as O,a0 as b,I as m,k as v,ak as k,G as x,J as f,a1 as I,p as V,al as $,am as A}from"./index-e5b1715d.js";import{m as R,u as T,a as p,V as g}from"./VOverlay-9d119453.js";import{V as U}from"./dialog-transition-227f722f.js";const Y=w()({name:"VMenu",props:{id:String,...D(R({closeDelay:250,closeOnContentClick:!0,locationStrategy:"connected",openDelay:300,scrim:!1,scrollStrategy:"reposition",transition:{component:U}}),["absolute"])},emits:{"update:modelValue":a=>!0},setup(a,P){let{slots:t}=P;const o=O(a,"modelValue"),{scopeId:y}=T(),C=b(),i=m(()=>a.id||`v-menu-${C}`),u=v(),e=k(p,null),s=v(0);A(p,{register(){++s.value},unregister(){--s.value},closeParents(){setTimeout(()=>{s.value||(o.value=!1,e==null||e.closeParents())},40)}}),x(o,l=>{l?e==null||e.register():e==null||e.unregister()});function S(){e==null||e.closeParents()}const h=m(()=>f({"aria-haspopup":"menu","aria-expanded":String(o.value),"aria-owns":i.value},a.activatorProps));return I(()=>{const[l]=g.filterProps(a);return V(g,f({ref:u,class:["v-menu",a.class],style:a.style},l,{modelValue:o.value,"onUpdate:modelValue":r=>o.value=r,absolute:!0,activatorProps:h.value,"onClick:outside":S},y),{activator:t.activator,default:function(){for(var r=arguments.length,c=new Array(r),n=0;n<r;n++)c[n]=arguments[n];return V($,{root:!0},{default:()=>{var d;return[(d=t.default)==null?void 0:d.call(t,...c)]}})}})}),M({id:i,ΨopenChildren:s},u)}});export{Y as V};
