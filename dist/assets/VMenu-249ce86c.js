import{f as M}from"./forwardRefs-9d31fcaa.js";import{n as w,ag as D,ah as O,ai as b,y as m,r as v,aj as x,v as j,p as f,Y as k,d as V,ak as A,al as I}from"./index-5157f066.js";import{m as R,u as T,V as g,a as p}from"./VOverlay-886bd86f.js";import{V as U}from"./dialog-transition-27ba43fb.js";const z=w()({name:"VMenu",props:{id:String,...D(R({closeDelay:250,closeOnContentClick:!0,locationStrategy:"connected",openDelay:300,scrim:!1,scrollStrategy:"reposition",transition:{component:U}}),["absolute"])},emits:{"update:modelValue":a=>!0},setup(a,P){let{slots:t}=P;const o=O(a,"modelValue"),{scopeId:y}=T(),C=b(),i=m(()=>a.id||`v-menu-${C}`),u=v(),e=x(g,null),s=v(0);I(g,{register(){++s.value},unregister(){--s.value},closeParents(){setTimeout(()=>{s.value||(o.value=!1,e==null||e.closeParents())},40)}}),j(o,l=>{l?e==null||e.register():e==null||e.unregister()});function h(){e==null||e.closeParents()}const S=m(()=>f({"aria-haspopup":"menu","aria-expanded":String(o.value),"aria-owns":i.value},a.activatorProps));return k(()=>{const[l]=p.filterProps(a);return V(p,f({ref:u,class:["v-menu",a.class],style:a.style},l,{modelValue:o.value,"onUpdate:modelValue":r=>o.value=r,absolute:!0,activatorProps:S.value,"onClick:outside":h},y),{activator:t.activator,default:function(){for(var r=arguments.length,c=new Array(r),n=0;n<r;n++)c[n]=arguments[n];return V(A,{root:!0},{default:()=>{var d;return[(d=t.default)==null?void 0:d.call(t,...c)]}})}})}),M({id:i,ΨopenChildren:s},u)}});export{z as V};
