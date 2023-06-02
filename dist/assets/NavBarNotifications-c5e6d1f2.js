import{d as I,N as C,r as R,o as d,b as x,w as t,p as e,O as $,q as m,V as _,A as P,B as E,Q as g,E as c,x as f,R as h,D as M,P as T,c as b,F as N,a as L,I as S,S as U,m as k,s as D,U as F,W as O,C as j,k as W}from"./index-62eefdbf.js";import{V as w,a as Y}from"./VListItemAction-23b30a01.js";import{V as q}from"./VMenu-7d428786.js";import{V as H}from"./VTooltip-9ecfa142.js";import{V}from"./VDivider-b9b8fa2a.js";import{V as Q,a as A,b as B,c as G}from"./VList-3716d12c.js";import"./forwardRefs-9d31fcaa.js";import"./VOverlay-4803d0cb.js";import"./dialog-transition-354d6aff.js";const J=u=>u?u.split(" ").map(o=>o.charAt(0).toUpperCase()).join(""):"",K={key:0},X={class:"text-xs text-disabled"},Z={class:"d-flex flex-column align-center gap-4"},ee={style:{"block-size":"28px","inline-size":"28px"}},te=I({__name:"Notifications",props:{notifications:null,badgeProps:{default:void 0},location:{default:"bottom end"}},emits:["read","unread","remove","click:notification"],setup(u,{emit:l}){const o=u,r=C(()=>o.notifications.some(a=>a.isSeen===!1)),p=()=>{const a=o.notifications.map(i=>i.id);r.value?l("read",a):l("unread",a)},v=C(()=>o.notifications.filter(a=>a.isSeen===!1).length);return(a,i)=>{const n=R("IconBtn");return d(),x(n,{id:"notification-btn"},{default:t(()=>[e(w,$(o.badgeProps,{"model-value":o.notifications.some(s=>!s.isSeen),color:"error",content:m(v),class:"notification-badge"}),{default:t(()=>[e(_,{size:"26",icon:"tabler-bell"})]),_:1},16,["model-value","content"]),e(q,{activator:"parent",width:"380px",location:o.location,offset:"14px","close-on-content-click":!1},{default:t(()=>[e(P,{class:"d-flex flex-column"},{default:t(()=>[e(E,{class:"notification-section"},{append:t(()=>[g(e(n,{onClick:p},{default:t(()=>[e(_,{icon:m(r)?"tabler-mail-opened":"tabler-mail"},null,8,["icon"]),e(H,{activator:"parent",location:"start"},{default:t(()=>[c(f(m(r)?"Mark all as read":"Mark all as unread"),1)]),_:1})]),_:1},512),[[h,o.notifications.length]])]),default:t(()=>[e(M,{class:"text-lg"},{default:t(()=>[c(" Notifications ")]),_:1})]),_:1}),e(V),e(m(T),{options:{wheelPropagation:!1},style:{"max-block-size":"23.75rem"}},{default:t(()=>[e(Q,{class:"notification-list rounded-0 py-0"},{default:t(()=>[(d(!0),b(N,null,L(o.notifications,(s,z)=>(d(),b(N,{key:s.title},[z>0?(d(),x(V,{key:0})):S("",!0),e(A,{link:"",lines:"one","min-height":"66px",class:"list-item-hover-class",onClick:y=>a.$emit("click:notification",s)},{prepend:t(()=>[e(Y,{start:""},{default:t(()=>[e(U,{size:"40",color:s.color&&s.icon?s.color:void 0,image:s.img||void 0,icon:s.icon||void 0,variant:s.img?void 0:"tonal"},{default:t(()=>[s.text?(d(),b("span",K,f(m(J)(s.text)),1)):S("",!0)]),_:2},1032,["color","image","icon","variant"])]),_:2},1024)]),append:t(()=>[k("div",Z,[e(w,{dot:"",color:s.isSeen?"#a8aaae":"primary",class:D(`${s.isSeen?"visible-in-hover":""} ms-1`),onClick:F(y=>a.$emit(s.isSeen?"unread":"read",[s.id]),["stop"])},null,8,["color","class","onClick"]),k("div",ee,[e(n,{size:"small",class:"visible-in-hover",onClick:y=>a.$emit("remove",s.id)},{default:t(()=>[e(_,{size:"20",icon:"tabler-x"})]),_:2},1032,["onClick"])])])]),default:t(()=>[e(B,null,{default:t(()=>[c(f(s.title),1)]),_:2},1024),e(G,null,{default:t(()=>[c(f(s.subtitle),1)]),_:2},1024),k("span",X,f(s.time),1)]),_:2},1032,["onClick"])],64))),128)),g(e(A,{class:"text-center text-medium-emphasis",style:{"block-size":"56px"}},{default:t(()=>[e(B,null,{default:t(()=>[c("No Notification Found!")]),_:1})]),_:1},512),[[h,!o.notifications.length]])]),_:1})]),_:1}),e(V),g(e(O,{class:"notification-footer"},{default:t(()=>[e(j,{block:""},{default:t(()=>[c(" View All Notifications ")]),_:1})]),_:1},512),[[h,o.notifications.length]])]),_:1})]),_:1},8,["location"])]),_:1})}}});const ae="/assets/avatar-3-47317f35.png",se="/assets/avatar-4-b0163f21.png",oe="/assets/avatar-5-d340221a.png",ie="/assets/paypal-01b645d1.svg",ve=I({__name:"NavBarNotifications",setup(u){const l=W([{id:1,img:se,title:"Congratulation Flora! 🎉",subtitle:"Won the monthly best seller badge",time:"Today",isSeen:!0},{id:2,text:"Tom Holland",title:"New user registered.",subtitle:"5 hours ago",time:"Yesterday",isSeen:!1},{id:3,img:oe,title:"New message received 👋🏻",subtitle:"You have 10 unread messages",time:"11 Aug",isSeen:!0},{id:4,img:ie,title:"Paypal",subtitle:"Received Payment",time:"25 May",isSeen:!1,color:"error"},{id:5,img:ae,title:"Received Order 📦",subtitle:"New order received from john",time:"19 Mar",isSeen:!0}]),o=a=>{l.value.forEach((i,n)=>{a===i.id&&l.value.splice(n,1)})},r=a=>{l.value.forEach(i=>{a.forEach(n=>{n===i.id&&(i.isSeen=!0)})})},p=a=>{l.value.forEach(i=>{a.forEach(n=>{n===i.id&&(i.isSeen=!1)})})},v=a=>{a.isSeen||r([a.id])};return(a,i)=>{const n=te;return d(),x(n,{notifications:m(l),onRemove:o,onRead:r,onUnread:p,"onClick:notification":v},null,8,["notifications"])}}});export{ve as default};
