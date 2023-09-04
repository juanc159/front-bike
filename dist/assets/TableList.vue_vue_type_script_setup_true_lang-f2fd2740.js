import{e as E,g as F,a4 as L,s as M,r as S,q as Q,v as C,x as R,y as j,o as v,c as V,d as l,w as u,a as e,k as n,J as y,E as g,b as q,I as D,G as _,H as x,K as G,L as H,t as i,Z as k,V as P,S as J}from"./index-5157f066.js";import{_ as K,V as O}from"./VPagination-4258e78a.js";import{V as Z}from"./VSelect-6157aeab.js";import{V as W}from"./VSpacer-a82be323.js";import{V as X}from"./VTextField-f6b14139.js";import{V as B}from"./VDivider-43847767.js";import{V as Y}from"./VSwitch-68c1df87.js";import{V as ee}from"./VTable-bba866c0.js";const te={class:"me-3",style:{width:"80px"}},ae={class:"app-user-search-filter d-flex align-center flex-wrap gap-4"},le={style:{width:"10rem"}},se=e("thead",null,[e("tr",null,[e("th",{scope:"col"}," Nombre "),e("th",{scope:"col"}," Descripción "),e("th",{scope:"col"}," ¿Se permite permuta? "),e("th",{scope:"col"}," Precio "),e("th",{scope:"col"}," Oferta "),e("th",{scope:"col"}," Dias "),e("th",{scope:"col"}," Estado "),e("th",{scope:"col"}," Acciones ")])],-1),ne={colspan:"8"},oe={class:"text-center",style:{width:"5rem"}},re=e("tr",null,[e("td",{colspan:"8",class:"text-center"}," No se encuentran resultados ")],-1),ie=[re],ce={class:"text-sm text-disabled"},ge=E({__name:"TableList",setup(ue){const $=F(),r=L(),{publications:p,totalPage:f,lastPage:T,currentPage:s,totalData:A,loading:w}=M(r),c=S(10),d=S(""),h=async()=>{await r.fetchAll({company_id:$.company.id,perPage:c.value,page:s.value,searchQuery:d.value})};Q(async()=>{await h()}),C(s,async()=>{s.value>f.value&&(s.value=f.value)}),C(c,async()=>{s.value=1}),R([s,d,c],async()=>{await h()});const N=j(()=>{const o=p.value.length?(s.value-1)*f.value+1:0,a=p.value.length+(s.value-1)*f.value;return`Mostrando ${o} a ${a} de ${A.value} registros`}),b=async(o,a=null)=>{r.clearFormulario(),r.typeAction=o,a&&r.fetchInfo(a)},z=async o=>{J.fire({title:"¿Desea eliminar el registro?",showDenyButton:!0,showCancelButton:!1,confirmButtonText:"Si",denyButtonText:"No"}).then(async a=>{a.isConfirmed?(await r.fetchDelete(o),await h()):a.isDenied})},U=async(o,a)=>{r.changeState(o,a)};return(o,a)=>(v(),V("div",null,[l(D,{fluid:"",class:"d-flex flex-wrap py-4 gap-4"},{default:u(()=>[e("div",te,[l(Z,{modelValue:n(c),"onUpdate:modelValue":a[0]||(a[0]=t=>y(c)?c.value=t:null),density:"compact",variant:"outlined",items:[10,20,30,50]},null,8,["modelValue"])]),l(W),e("div",ae,[e("div",le,[l(X,{modelValue:n(d),"onUpdate:modelValue":a[1]||(a[1]=t=>y(d)?d.value=t:null),placeholder:"Buscar",density:"compact"},null,8,["modelValue"])]),l(g,{color:"primary",onClick:a[2]||(a[2]=t=>b("form"))},{default:u(()=>[q(" Agregar ")]),_:1})])]),_:1}),l(B),l(ee,{class:"text-no-wrap"},{default:u(()=>[se,e("tbody",null,[_(e("tr",null,[e("td",ne,[l(K)])],512),[[x,n(w)]]),(v(!0),V(G,null,H(n(p),(t,I)=>_((v(),V("tr",{key:I,style:{height:"3.75rem"}},[e("td",null,[e("span",null,i(t.name),1)]),e("td",null,[e("span",null,i(t.description),1)]),e("td",null,[e("span",null,i(t.barter),1)]),e("td",null,[e("span",null,i(n(k)(t.price)),1)]),e("td",null,[e("span",null,i(n(k)(t.offer)),1)]),e("td",null,[e("span",null,i(t.days),1)]),e("td",null,[e("span",null,[l(Y,{modelValue:t.status,"onUpdate:modelValue":m=>t.status=m,color:"success",inset:"",value:t.status,"true-value":1,"false-value":0,"hide-details":"",onClick:m=>U(t,t.status)},null,8,["modelValue","onUpdate:modelValue","value","onClick"])])]),e("td",oe,[l(g,{size:"x-small",color:"error",variant:"text",onClick:m=>z(t.id)},{default:u(()=>[l(P,{size:"22",icon:"tabler-trash"})]),_:2},1032,["onClick"]),l(g,{icon:"",size:"x-small",color:"default",variant:"text",onClick:m=>b("form",t.id)},{default:u(()=>[l(P,{size:"22",icon:"tabler-edit"})]),_:2},1032,["onClick"])])])),[[x,!n(w)]])),128))]),_(e("tfoot",null,ie,512),[[x,!n(p).length]])]),_:1}),l(B),l(D,{fluid:"",class:"d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5"},{default:u(()=>[e("span",ce,i(n(N)),1),l(O,{modelValue:n(s),"onUpdate:modelValue":a[3]||(a[3]=t=>y(s)?s.value=t:null),size:"small","total-visible":5,length:n(T)},null,8,["modelValue","length"])]),_:1})]))}});export{ge as _};