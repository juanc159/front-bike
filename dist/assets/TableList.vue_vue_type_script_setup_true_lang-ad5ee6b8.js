import{d as I,z as F,y as M,k as C,ar as L,G as k,bj as U,I as j,o as d,c as p,p as a,w as c,m as e,q as o,H as v,A as _,B as E,K as y,L as V,F as Q,a as R,x as g,V as S}from"./index-e5b1715d.js";import{S as q}from"./sweetalert2.all-09c1f25c.js";import{V as b,_ as G,a as H}from"./VPagination-2a43a654.js";import{u as K}from"./useCrudMecanicStore-e023b914.js";import{V as J}from"./VSelect-25a384f7.js";import{V as O}from"./VSpacer-8ebd0f28.js";import{V as W}from"./VTextField-7b882186.js";import{V as B}from"./VDivider-8a24bc85.js";import{V as X}from"./VTable-75e60859.js";const Y={class:"me-3",style:{width:"80px"}},Z={class:"app-user-search-filter d-flex align-center flex-wrap gap-4"},ee={style:{width:"10rem"}},te=e("thead",null,[e("tr",null,[e("th",{scope:"col"}," Nombre Completo "),e("th",{scope:"col"}," Cédula "),e("th",{scope:"col"}," Estado "),e("th",{scope:"col"}," Acciones ")])],-1),ae={colspan:"4"},le={key:0},se={key:1},oe={class:"text-center",style:{width:"5rem"}},ne=e("tr",null,[e("td",{colspan:"4",class:"text-center"}," No se encuentran resultados ")],-1),ie=[ne],re={class:"text-sm text-disabled"},Ve=I({__name:"TableList",setup(ce){const D=F(),n=K(),{mecanic:m,totalPage:f,lastPage:A,currentPage:s,totalData:P,loading:x}=M(n),i=C(10),u=C(""),h=async()=>{await n.fetchAll({perPage:i.value,page:s.value,searchQuery:u.value,company_id:D.company.id})};L(async()=>{await h()}),k(s,async()=>{s.value>f.value&&(s.value=f.value)}),k(i,async()=>{s.value=1}),U([s,u,i],async()=>{await h()});const T=j(()=>{const r=m.value.length?(s.value-1)*f.value+1:0,t=m.value.length+(s.value-1)*f.value;return`Mostrando ${r} a ${t} de ${P.value} registros`}),w=async(r,t=null)=>{n.clearFormulario(),n.typeAction=r,t&&n.fetchInfo(t)},$=async r=>{q.fire({title:"¿Desea eliminar el registro?",showDenyButton:!0,showCancelButton:!1,confirmButtonText:"Si",denyButtonText:"No"}).then(async t=>{t.isConfirmed?(await n.fetchDelete(r),await h()):t.isDenied})};return(r,t)=>(d(),p("div",null,[a(b,{fluid:"",class:"d-flex flex-wrap py-4 gap-4"},{default:c(()=>[e("div",Y,[a(J,{modelValue:o(i),"onUpdate:modelValue":t[0]||(t[0]=l=>v(i)?i.value=l:null),density:"compact",variant:"outlined",items:[10,20,30,50]},null,8,["modelValue"])]),a(O),e("div",Z,[e("div",ee,[a(W,{modelValue:o(u),"onUpdate:modelValue":t[1]||(t[1]=l=>v(u)?u.value=l:null),placeholder:"Buscar",density:"compact"},null,8,["modelValue"])]),a(_,{color:"primary",onClick:t[2]||(t[2]=l=>w("form"))},{default:c(()=>[E(" Agregar ")]),_:1})])]),_:1}),a(B),a(X,{class:"text-no-wrap"},{default:c(()=>[te,e("tbody",null,[y(e("tr",null,[e("td",ae,[a(G)])],512),[[V,o(x)]]),(d(!0),p(Q,null,R(o(m),(l,z)=>y((d(),p("tr",{key:z,style:{height:"3.75rem"}},[e("td",null,[e("span",null,g(l.name+" "+l.last_name),1)]),e("td",null,[e("span",null,g(l.identify),1)]),e("td",null,[l.status==1?(d(),p("span",le," Activo ")):(d(),p("span",se," Inactivo "))]),e("td",oe,[a(_,{size:"x-small",color:"error",variant:"text",onClick:N=>$(l.id)},{default:c(()=>[a(S,{size:"22",icon:"tabler-trash"})]),_:2},1032,["onClick"]),a(_,{icon:"",size:"x-small",color:"default",variant:"text",onClick:N=>w("form",l.id)},{default:c(()=>[a(S,{size:"22",icon:"tabler-edit"})]),_:2},1032,["onClick"])])])),[[V,!o(x)]])),128))]),y(e("tfoot",null,ie,512),[[V,!o(m).length]])]),_:1}),a(B),a(b,{fluid:"",class:"d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5"},{default:c(()=>[e("span",re,g(o(T)),1),a(H,{modelValue:o(s),"onUpdate:modelValue":t[3]||(t[3]=l=>v(s)?s.value=l:null),size:"small","total-visible":5,length:o(A)},null,8,["modelValue","length"])]),_:1})]))}});export{Ve as _};
