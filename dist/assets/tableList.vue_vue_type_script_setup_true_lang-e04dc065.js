import{d as I,y as M,k,ar as N,G as C,bj as F,I as L,o as h,c as v,p as a,w as c,m as e,q as o,H as y,A as V,B as U,K as _,L as x,F as j,a as Q,x as f,V as D}from"./index-13e9e9f8.js";import{S as R}from"./sweetalert2.all-09c1f25c.js";import{u as q}from"./useCrudMenuStore-8ff19b91.js";import{V as b,_ as E,a as G}from"./VPagination-1ec261be.js";import{V as H}from"./VSelect-457fc5fa.js";import{V as K}from"./VSpacer-4c15bfe5.js";import{V as J}from"./VTextField-2e327a5c.js";import{V as B}from"./VDivider-bc2a7ae6.js";import{V as O}from"./VTable-a9c2f071.js";const W={class:"me-3",style:{width:"80px"}},X={class:"app-user-search-filter d-flex align-center flex-wrap gap-4"},Y={style:{width:"10rem"}},Z=e("thead",null,[e("tr",null,[e("th",{scope:"col"}," Título "),e("th",{scope:"col"}," Direccionar a "),e("th",{scope:"col"}," Icon "),e("th",{scope:"col"}," Acciones ")])],-1),ee={colspan:"4"},te={class:"text-center",style:{width:"5rem"}},ae=e("tr",null,[e("td",{colspan:"7",class:"text-center"}," No se encuentran resultados ")],-1),le=[ae],se={class:"text-sm text-disabled"},he=I({__name:"tableList",setup(oe){const n=q(),{menus:d,totalPage:p,links:S,currentPage:s,totalData:A,loading:g}=M(n),r=k(10),u=k(""),m=async()=>{await n.fetchAll({perPage:r.value,page:s.value,searchQuery:u.value})};N(async()=>{n.typeAction!="back"&&await m()}),C(s,async()=>{s.value>p.value&&(s.value=p.value)}),C(r,async()=>{s.value=1}),F([s,u,r],async()=>{await m()});const T=L(()=>{const i=d.value.length?(s.value-1)*p.value+1:0,t=d.value.length+(s.value-1)*p.value;return`Mostrando ${i} a ${t} de ${A.value} registros`}),w=async(i,t=null)=>{n.clearFormulario(),n.typeAction=i,t&&n.fetchInfo(t)},$=async i=>{R.fire({title:"¿Desea eliminar el registro?",showDenyButton:!0,showCancelButton:!1,confirmButtonText:"Si",denyButtonText:"No"}).then(async t=>{t.isConfirmed?(await n.fetchDelete(i),await m()):t.isDenied})};return(i,t)=>(h(),v("div",null,[a(b,{fluid:"",class:"d-flex flex-wrap py-4 gap-4"},{default:c(()=>[e("div",W,[a(H,{modelValue:o(r),"onUpdate:modelValue":t[0]||(t[0]=l=>y(r)?r.value=l:null),density:"compact",variant:"outlined",items:[10,20,30,50]},null,8,["modelValue"])]),a(K),e("div",X,[e("div",Y,[a(J,{modelValue:o(u),"onUpdate:modelValue":t[1]||(t[1]=l=>y(u)?u.value=l:null),placeholder:"Buscar",density:"compact"},null,8,["modelValue"])]),a(V,{color:"primary",onClick:t[2]||(t[2]=l=>w("form"))},{default:c(()=>[U(" Agregar ")]),_:1})])]),_:1}),a(B),a(O,{class:"text-no-wrap"},{default:c(()=>[Z,e("tbody",null,[_(e("tr",null,[e("td",ee,[a(E)])],512),[[x,o(g)]]),(h(!0),v(j,null,Q(o(d),(l,P)=>_((h(),v("tr",{key:P,style:{height:"3.75rem"}},[e("td",null,[e("span",null,f(l.title),1)]),e("td",null,[e("span",null,f(l.to),1)]),e("td",null,[e("span",null,f(l.icon),1)]),e("td",te,[a(V,{size:"x-small",color:"error",variant:"text",onClick:z=>$(l.id)},{default:c(()=>[a(D,{size:"22",icon:"tabler-trash"})]),_:2},1032,["onClick"]),a(V,{icon:"",size:"x-small",color:"default",variant:"text",onClick:z=>w("form",l.id)},{default:c(()=>[a(D,{size:"22",icon:"tabler-edit"})]),_:2},1032,["onClick"])])])),[[x,!o(g)]])),128))]),_(e("tfoot",null,le,512),[[x,!o(d).length]])]),_:1}),a(B),a(b,{fluid:"",class:"d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5"},{default:c(()=>[e("span",se,f(o(T)),1),a(G,{modelValue:o(s),"onUpdate:modelValue":t[3]||(t[3]=l=>y(s)?s.value=l:null),size:"small","total-visible":5,length:o(S)},null,8,["modelValue","length"])]),_:1})]))}});export{he as _};
