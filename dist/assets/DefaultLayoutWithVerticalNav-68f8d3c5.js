import{y as w,z as h,d as C,j as T,r as k,o,b as r,w as t,p as e,V as u,A as p,B as x,q as a,P as I,c as d,F as V,a as b,s as R,m as l,x as v,t as z,i as A,C as $,T as N,e as P,D as B}from"./index-e5b1715d.js";import{V as S}from"./VMenu-3cefba11.js";import{V as D,a as L,b as F}from"./VCard-2bb6063b.js";import{V as M}from"./VDivider-8a24bc85.js";import{V as j,a as E}from"./VRow-0d53bcfe.js";import W from"./Footer-a762a5ab.js";import{_ as O}from"./NavbarThemeSwitcher.vue_vue_type_script_setup_true_lang-6dd33d65.js";import{_ as U}from"./UserProfile.vue_vue_type_script_setup_true_lang-7bccc741.js";import q from"./ResetSessionTimeout-4f9aeee8.js";import{V as G}from"./VSpacer-8ebd0f28.js";import"./forwardRefs-9d31fcaa.js";import"./VOverlay-9d119453.js";import"./dialog-transition-227f722f.js";import"./createSimpleFunctional-58ba5248.js";/* empty css              */import"./VTooltip-623141ce.js";import"./VList-7903b835.js";import"./VListItemAction-b90c3fb2.js";const{getMenuData:H}=w(h()),J=H,K={class:"text-base font-weight-semibold mt-2 mb-0"},Q={class:"mx-5"},X={style:{"list-style-type":"circle","text-align":"initial"}},Y=C({__name:"NavbarMenuTop",setup(y){const c=[{title:"Proceso de ventas",links:[{icon:"tabler-user",title:"Factura",to:{name:"Admin-Invoice-Index"}},{icon:"tabler-user",title:"Recibo Caja",to:{name:"Admin-CashReceipt-Index"}}]},{title:"Proceso de compras",links:[]},{title:"Otros",links:[]},{title:"Catalogos",links:[{icon:"tabler-user",title:"Tercero",to:{name:"Admin-Third-Index"}},{icon:"tabler-user",title:"Usuario",to:{name:"Admin-User-Index"}},{icon:"tabler-user",title:"Empleado",to:{name:"Admin-Employee-Index"}},{icon:"tabler-user",title:"Nómina",to:{name:"Admin-Payroll-Index"}},{icon:"tabler-user",title:"Producto/Servicio",to:{name:"Admin-Product-Index"}}]}],m=T();return(_,g)=>{const f=k("RouterLink");return o(),r(p,{variant:"text",color:"default",size:"small",icon:""},{default:t(()=>[e(u,{size:"24",icon:"tabler-layout-grid-add"}),e(S,{activator:"parent",offset:"14px",location:"bottom end"},{default:t(()=>[e(D,{width:"430","max-height":"560",class:"d-flex flex-column"},{default:t(()=>[e(L,{class:"py-4"},{append:t(()=>[e(p,{size:"x-small",variant:"text",color:"default",icon:""},{default:t(()=>[e(u,{size:"22",icon:"tabler-layout-grid-add"})]),_:1})]),default:t(()=>[e(F,null,{default:t(()=>[x("Módulos")]),_:1})]),_:1}),e(M),e(a(I),{options:{wheelPropagation:!1}},{default:t(()=>[e(j,{class:"ma-0 mt-n1"},{default:t(()=>[(o(),d(V,null,b(c,(s,n)=>e(E,{key:s.title,cols:"6",class:R(["text-center border-t cursor-pointer pa-4",(n+1)%2?"border-e":""]),onClick:i=>a(m).push(s.to)},{default:t(()=>[l("h6",K,v(s.title),1),l("ul",Q,[(o(!0),d(V,null,b(s.links,(i,te)=>(o(),d("li",X,[e(f,{to:i.to,class:"mr-2"},{default:t(()=>[x(v(i.title),1)]),_:2},1032,["to"])]))),256))])]),_:2},1032,["class","onClick"])),64))]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}}}),Z={class:"d-flex h-100 align-center"},ee=l("div",{class:"d-flex justify-space-around mr-2"},null,-1),he=C({__name:"DefaultLayoutWithVerticalNav",setup(y){const{appRouteTransition:c,isLessThanOverlayNavBreakpoint:m}=z(),{width:_}=A();return h(),(g,f)=>{const s=k("RouterView");return o(),r(a(B),{"nav-items":a(J)},{navbar:t(({toggleVerticalOverlayNavActive:n})=>[l("div",Z,[a(m)(a(_))?(o(),r(p,{key:0,icon:"",variant:"text",color:"default",class:"ms-n3",size:"small",onClick:i=>n(!0)},{default:t(()=>[e(u,{icon:"tabler-menu-2",size:"24"})]),_:2},1032,["onClick"])):$("",!0),e(O),e(G),e(Y),ee,e(q),e(U)])]),footer:t(()=>[e(W)]),default:t(()=>[e(s,null,{default:t(({Component:n})=>[e(N,{name:a(c),mode:"out-in"},{default:t(()=>[(o(),r(P(n)))]),_:2},1032,["name"])]),_:1})]),_:1},8,["nav-items"])}}});export{he as default};
