import{d as _,j as h,r as g,o,b as l,w as e,p as t,V as n,A as V,B as x,D as C,E as v,q as p,P as y,G as S,c as A,F as B,a as I,H as k,s as w,S as D,m as d,x as m}from"./index-62eefdbf.js";import{V as N}from"./VMenu-7d428786.js";import{V as z}from"./VDivider-b9b8fa2a.js";import"./forwardRefs-9d31fcaa.js";import"./VOverlay-4803d0cb.js";import"./dialog-transition-354d6aff.js";const F={class:"text-base font-weight-medium mt-2 mb-0"},M={class:"text-sm"},P=_({__name:"Shortcuts",props:{togglerIcon:{default:"tabler-layout-grid-add"},shortcuts:null},setup(r){const s=r,c=h();return(b,i)=>{const u=g("IconBtn");return o(),l(u,null,{default:e(()=>[t(n,{size:"26",icon:s.togglerIcon},null,8,["icon"]),t(N,{activator:"parent",offset:"14px",location:"bottom end"},{default:e(()=>[t(V,{width:"340","max-height":"560",class:"d-flex flex-column"},{default:e(()=>[t(x,{class:"py-4"},{append:e(()=>[t(u,null,{default:e(()=>[t(n,{icon:"tabler-layout-grid-add"})]),_:1})]),default:e(()=>[t(C,null,{default:e(()=>[v("Shortcuts")]),_:1})]),_:1}),t(z),t(p(y),{options:{wheelPropagation:!1}},{default:e(()=>[t(S,{class:"ma-0 mt-n1"},{default:e(()=>[(o(!0),A(B,null,I(s.shortcuts,(a,f)=>(o(),l(k,{key:a.title,cols:"6",class:w(["text-center border-t cursor-pointer pa-4 shortcut-icon",(f+1)%2?"border-e":""]),onClick:$=>p(c).push(a.to)},{default:e(()=>[t(D,{variant:"tonal",size:"48"},{default:e(()=>[t(n,{icon:a.icon},null,8,["icon"])]),_:2},1024),d("h6",F,m(a.title),1),d("span",M,m(a.subtitle),1)]),_:2},1032,["class","onClick"]))),128))]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}}});const q=_({__name:"NavbarShortcuts",setup(r){const s=[{icon:"tabler-calendar",title:"Calendar",subtitle:"Appointments",to:{name:"apps-calendar"}},{icon:"tabler-file",title:"Invoice App",subtitle:"Manage Accounts",to:{name:"apps-invoice-list"}},{icon:"tabler-user",title:"Users",subtitle:"Manage Users",to:{name:"apps-user-list"}},{icon:"tabler-layout",title:"Dashboard",subtitle:"Dashboard Analytics",to:{name:"dashboards-analytics"}},{icon:"tabler-settings",title:"Settings",subtitle:"Account Settings",to:{name:"pages-account-settings-tab",params:{tab:"account"}}},{icon:"tabler-help",title:"Help Center",subtitle:"FAQs & Articles",to:{name:"pages-help-center"}}];return(c,b)=>{const i=P;return o(),l(i,{shortcuts:s})}}});export{q as default};
