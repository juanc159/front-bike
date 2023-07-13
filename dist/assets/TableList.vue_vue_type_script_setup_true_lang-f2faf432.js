import{d as O,z as W,k as x,y as X,ar as Y,G as A,bj as Z,I as ee,o as k,c as S,p as e,w as o,V as d,q as n,E as g,au as le,K as w,m as l,L as C,H as U,F as ae,a as te,x as p,A as N}from"./index-333f41b8.js";import{S as oe}from"./sweetalert2.all-689f8ffb.js";import{V as P,_ as ne,a as se}from"./VPagination-627eb1b7.js";import{u as ie}from"./useCrudUserStore-a8bc3847.js";import{d as z,V as E,c as ue}from"./VCard-faba0bf7.js";import{V as b,a as c}from"./VRow-d2a2c669.js";import{V as F}from"./VSpacer-87e0b677.js";import{V as D}from"./VDivider-6040cd18.js";import{V as I}from"./VSelect-026de29d.js";import{V as L}from"./VCheckbox-1615657a.js";import{V as T}from"./VTextField-e0c3ad65.js";import{V as re}from"./VTable-3c216502.js";import{V as de}from"./VSwitch-86d31d27.js";const ce={class:"mt-4"},me=l("span",null,"Estado",-1),fe={class:"mt-4"},pe={class:"me-3",style:{width:"80px"}},ve={class:"app-user-search-filter d-flex align-center flex-wrap gap-4"},Ve={style:{width:"10rem"}},_e=l("thead",null,[l("tr",null,[l("th",{scope:"col"}," Nombre usuario "),l("th",{scope:"col"}," Número de identificación "),l("th",{scope:"col"}," Teléfono "),l("th",{scope:"col"}," Correo "),l("th",{scope:"col"}," Rol "),l("th",{scope:"col"}," Acciones "),l("th",{scope:"col"}," Estado ")])],-1),he={colspan:"6"},ye={class:"text-center",style:{width:"5rem"}},xe=l("tr",null,[l("td",{colspan:"7",class:"text-center"}," No se encuentran resultados ")],-1),ge=[xe],we={class:"text-sm text-disabled"},Fe=O({__name:"TableList",setup(Ce){const R=W(),r=ie(),m=x(!0),{users:_,totalPage:h,lastPage:j,currentPage:i,totalData:q,arrayRoles:M,loading:B}=X(r),f=x(10),v=x(""),s=x({}),V=async()=>{await r.fetchAll({company_id:R.company.id,perPage:f.value,page:i.value,searchQuery:v.value,role_id:s.value.role_id,state:s.value.state,name:s.value.name,identification:s.value.identification})};Y(async()=>{await V()}),A(i,async()=>{i.value>h.value&&(i.value=h.value)}),A(f,async()=>{i.value=1}),Z([i,v,f],async()=>{await V()});const Q=ee(()=>{const u=_.value.length?(i.value-1)*h.value+1:0,a=_.value.length+(i.value-1)*h.value;return`Mostrando ${u} a ${a} de ${q.value} registros`}),$=async(u,a=null)=>{r.clearFormulario(),r.typeAction=u,a&&r.fetchInfo(a)},G=async(u,a)=>{r.changeState(u,a)},H=()=>{s.value={},V()},K=async u=>{oe.fire({title:"¿Desea eliminar el registro?",showDenyButton:!0,showCancelButton:!1,confirmButtonText:"Si",denyButtonText:"No"}).then(async a=>{a.isConfirmed?(await r.fetchDelete(u),await V()):a.isDenied})};return(u,a)=>(k(),S("div",null,[e(E,{title:"Listado Usuario"},{default:o(()=>[e(z,null,{default:o(()=>[e(b,null,{default:o(()=>[e(c,{cols:"12"},{default:o(()=>[e(E,null,{default:o(()=>[e(ue,null,{default:o(()=>[e(d,{color:"orange-lighten-2",variant:"text",onClick:a[0]||(a[0]=t=>m.value=!n(m))},{default:o(()=>[g(" Criterios de búsqueda ")]),_:1}),e(F),e(d,{icon:n(m)?"mdi-chevron-up":"mdi-chevron-down",onClick:a[1]||(a[1]=t=>m.value=!n(m))},null,8,["icon"])]),_:1}),e(le,null,{default:o(()=>[w(l("div",null,[e(D),e(z,null,{default:o(()=>[e(b,null,{default:o(()=>[e(c,{cols:"12",md:"6"},{default:o(()=>[l("div",null,[e(I,{modelValue:n(s).role_id,"onUpdate:modelValue":a[2]||(a[2]=t=>n(s).role_id=t),items:n(M),"item-title":"name","item-value":"id",label:"Tipo de usuario"},null,8,["modelValue","items"])]),l("div",ce,[e(b,null,{default:o(()=>[e(c,{cols:"12",sm:"2",md:"2"},{default:o(()=>[me]),_:1}),e(c,{cols:"12",sm:"4",md:"4"},{default:o(()=>[e(L,{modelValue:n(s).state,"onUpdate:modelValue":a[3]||(a[3]=t=>n(s).state=t),label:"Activo",value:1},null,8,["modelValue"])]),_:1}),e(c,{cols:"12",sm:"4",md:"4"},{default:o(()=>[e(L,{modelValue:n(s).state,"onUpdate:modelValue":a[4]||(a[4]=t=>n(s).state=t),value:0,label:"Inactivo"},null,8,["modelValue"])]),_:1})]),_:1})])]),_:1}),e(c,{cols:"12",md:"6"},{default:o(()=>[l("div",null,[e(T,{modelValue:n(s).name,"onUpdate:modelValue":a[5]||(a[5]=t=>n(s).name=t),label:"Usuario"},null,8,["modelValue"])]),l("div",fe,[e(T,{modelValue:n(s).identification,"onUpdate:modelValue":a[6]||(a[6]=t=>n(s).identification=t),label:"Número de identificación"},null,8,["modelValue"])])]),_:1})]),_:1}),e(b,null,{default:o(()=>[e(c,{cols:"12 d-flex justify-content-center"},{default:o(()=>[e(d,{color:"primary",class:"mr-2",onClick:V},{default:o(()=>[g(" Buscar ")]),_:1}),e(d,{color:"primary",onClick:H},{default:o(()=>[g(" Limpiar Filtros ")]),_:1})]),_:1})]),_:1})]),_:1})],512),[[C,n(m)]])]),_:1})]),_:1})]),_:1})]),_:1}),e(P,{fluid:"",class:"d-flex flex-wrap py-4 gap-4"},{default:o(()=>[l("div",pe,[e(I,{modelValue:n(f),"onUpdate:modelValue":a[7]||(a[7]=t=>U(f)?f.value=t:null),density:"compact",variant:"outlined",items:[10,20,30,50]},null,8,["modelValue"])]),e(F),l("div",ve,[l("div",Ve,[e(T,{modelValue:n(v),"onUpdate:modelValue":a[8]||(a[8]=t=>U(v)?v.value=t:null),placeholder:"Buscar",density:"compact"},null,8,["modelValue"])]),e(d,{color:"primary",onClick:a[9]||(a[9]=t=>$("form"))},{default:o(()=>[g(" Agregar ")]),_:1})])]),_:1}),e(D),e(re,{class:"text-no-wrap"},{default:o(()=>[_e,l("tbody",null,[w(l("tr",null,[l("td",he,[e(ne)])],512),[[C,n(B)]]),(k(!0),S(ae,null,te(n(_),(t,J)=>w((k(),S("tr",{key:J,style:{height:"3.75rem"}},[l("td",null,[l("span",null,p(t.name),1)]),l("td",null,[l("span",null,p(t.identification),1)]),l("td",null,[l("span",null,p(t.phone),1)]),l("td",null,[l("span",null,p(t.email),1)]),l("td",null,[l("span",null,p(t.role),1)]),l("td",null,[e(de,{modelValue:t.state,"onUpdate:modelValue":y=>t.state=y,color:"success",inset:"",value:t.state,"true-value":1,"false-value":0,"hide-details":"",onClick:y=>G(t,t.state)},null,8,["modelValue","onUpdate:modelValue","value","onClick"])]),l("td",ye,[e(d,{size:"x-small",color:"error",variant:"text",onClick:y=>K(t.id)},{default:o(()=>[e(N,{size:"22",icon:"tabler-trash"})]),_:2},1032,["onClick"]),e(d,{icon:"",size:"x-small",color:"default",variant:"text",onClick:y=>$("form",t.id)},{default:o(()=>[e(N,{size:"22",icon:"tabler-edit"})]),_:2},1032,["onClick"])])])),[[C,!n(B)]])),128))]),w(l("tfoot",null,ge,512),[[C,!n(_).length]])]),_:1}),e(D),e(P,{fluid:"",class:"d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5"},{default:o(()=>[l("span",we,p(n(Q)),1),e(se,{modelValue:n(i),"onUpdate:modelValue":a[10]||(a[10]=t=>U(i)?i.value=t:null),size:"small","total-visible":5,length:n(j)},null,8,["modelValue","length"])]),_:1})]),_:1})]),_:1})]))}});export{Fe as _};