import{n as h,ag as S,ah as O,ai as x,y as e,r as T,p as u,Y as p,d as w}from"./index-5157f066.js";import{m as A,u as C,a as d}from"./VOverlay-886bd86f.js";import{f as I}from"./forwardRefs-9d31fcaa.js";const k=h()({name:"VTooltip",props:{id:String,text:String,...S(A({closeOnBack:!1,location:"end",locationStrategy:"connected",eager:!0,minWidth:0,offset:10,openOnClick:!1,openOnHover:!0,origin:"auto",scrim:!1,scrollStrategy:"reposition",transition:!1}),["absolute","persistent"])},emits:{"update:modelValue":t=>!0},setup(t,v){let{slots:a}=v;const n=O(t,"modelValue"),{scopeId:g}=C(),m=x(),r=e(()=>t.id||`v-tooltip-${m}`),l=T(),f=e(()=>t.location.split(" ").length>1?t.location:t.location+" center"),V=e(()=>t.origin==="auto"||t.origin==="overlap"||t.origin.split(" ").length>1||t.location.split(" ").length>1?t.origin:t.origin+" center"),y=e(()=>t.transition?t.transition:n.value?"scale-transition":"fade-transition"),P=e(()=>u({"aria-describedby":r.value},t.activatorProps));return p(()=>{const[b]=d.filterProps(t);return w(d,u({ref:l,class:["v-tooltip",t.class],style:t.style,id:r.value},b,{modelValue:n.value,"onUpdate:modelValue":o=>n.value=o,transition:y.value,absolute:!0,location:f.value,origin:V.value,persistent:!0,role:"tooltip",activatorProps:P.value,_disableGlobalStack:!0},g),{activator:a.activator,default:function(){var c;for(var o=arguments.length,s=new Array(o),i=0;i<o;i++)s[i]=arguments[i];return((c=a.default)==null?void 0:c.call(a,...s))??t.text}})}),I({},l)}});export{k as V};
