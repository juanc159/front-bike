import{d as E,z as Q,y as R,k as b,ar as q,G as z,bj as G,I as H,o as u,c as g,p as l,w as n,m as e,q as r,H as v,A as _,B as y,K as x,L as w,F as K,a as J,b as C,x as c,C as S,V as T}from"./index-13e9e9f8.js";import{S as O}from"./sweetalert2.all-09c1f25c.js";import{V as P,_ as W,a as X}from"./VPagination-1ec261be.js";import{u as Y}from"./useCrudIncomeVehicleStore-b8157641.js";import{V as $}from"./VSelect-457fc5fa.js";import{V as Z}from"./VSpacer-4c15bfe5.js";import{V as ee}from"./VTextField-2e327a5c.js";import{V as A}from"./VDivider-bc2a7ae6.js";import{V as k}from"./VChip-bd0635b3.js";import{V as ae}from"./VTable-a9c2f071.js";const te={class:"me-3",style:{width:"80px"}},le={class:"app-user-search-filter d-flex align-center flex-wrap gap-4"},oe={style:{width:"10rem"}},se=e("thead",null,[e("tr",null,[e("th",{scope:"col"}," Dias "),e("th",{scope:"col"}," Tipo de Vehículo "),e("th",{scope:"col"}," Marca "),e("th",{scope:"col"}," Modelo "),e("th",{scope:"col"}," Placa "),e("th",{scope:"col"}," Valor Compra "),e("th",{scope:"col"}," Estado "),e("th",{scope:"col"}," Acciones ")])],-1),ne={colspan:"10"},re={class:"text-center d-flex justify-content-center aling-items-center"},ce=e("tr",null,[e("td",{colspan:"10",class:"text-center"}," No se encuentran resultados ")],-1),ie=[ce],de={class:"text-sm text-disabled"},we=E({__name:"TableList",setup(ue){const I=Q(),i=Y(),{incomeVehicles:f,totalPage:m,lastPage:N,currentPage:o,totalData:U,loading:B}=R(i),d=b(10),p=b(""),V=async()=>{await i.fetchAll({company_id:I.company.id,perPage:d.value,page:o.value,searchQuery:p.value})};q(async()=>{await V()}),z(o,async()=>{o.value>m.value&&(o.value=m.value)}),z(d,async()=>{o.value=1}),G([o,p,d],async()=>{await V()});const F=H(()=>{const s=f.value.length?(o.value-1)*m.value+1:0,t=f.value.length+(o.value-1)*m.value;return`Mostrando ${s} a ${t} de ${U.value} registros`}),D=async(s,t=null)=>{i.clearFormulario(),i.typeAction=s,t&&i.fetchInfo(t)},M=async s=>{O.fire({title:"¿Desea eliminar el registro?",showDenyButton:!0,showCancelButton:!1,confirmButtonText:"Si",denyButtonText:"No"}).then(async t=>{t.isConfirmed?(await i.fetchDelete(s),await V()):t.isDenied})},L=s=>{i.changeSate(s.id,s.state)};return(s,t)=>(u(),g("div",null,[l(P,{fluid:"",class:"d-flex flex-wrap py-4 gap-4"},{default:n(()=>[e("div",te,[l($,{modelValue:r(d),"onUpdate:modelValue":t[0]||(t[0]=a=>v(d)?d.value=a:null),density:"compact",variant:"outlined",items:[10,20,30,50]},null,8,["modelValue"])]),l(Z),e("div",le,[e("div",oe,[l(ee,{modelValue:r(p),"onUpdate:modelValue":t[1]||(t[1]=a=>v(p)?p.value=a:null),placeholder:"Buscar",density:"compact"},null,8,["modelValue"])]),l(_,{color:"primary",onClick:t[2]||(t[2]=a=>D("form"))},{default:n(()=>[y(" Agregar ")]),_:1})])]),_:1}),l(A),l(ae,{class:"text-no-wrap"},{default:n(()=>[se,e("tbody",null,[x(e("tr",null,[e("td",ne,[l(W)])],512),[[w,r(B)]]),(u(!0),g(K,null,J(r(f),(a,j)=>x((u(),g("tr",{key:j,style:{height:"3.75rem"}},[e("td",null,[a.days<30?(u(),C(k,{key:0,size:"large",color:"success"},{default:n(()=>[y(c(a.days),1)]),_:2},1024)):S("",!0),a.days>=16&&a.days<=30?(u(),C(k,{key:1,size:"large",color:"warning"},{default:n(()=>[y(c(a.days),1)]),_:2},1024)):S("",!0),a.days>30?(u(),C(k,{key:2,size:"large",color:"error"},{default:n(()=>[y(c(a.days),1)]),_:2},1024)):S("",!0)]),e("td",null,[e("span",null,c(a.vehicleType),1)]),e("td",null,[e("span",null,c(a.brand),1)]),e("td",null,[e("span",null,c(a.model),1)]),e("td",null,[e("span",null,c(a.plate),1)]),e("td",null,[e("span",null,c(a.purchaseValue),1)]),e("td",null,[l($,{modelValue:a.state,"onUpdate:modelValue":[h=>a.state=h,h=>L(a)],items:["Ingresado","Separado","Vendido"]},null,8,["modelValue","onUpdate:modelValue"])]),e("td",re,[l(_,{class:"mr-2",icon:"",size:"x-small",color:"error",onClick:h=>M(a.id)},{default:n(()=>[l(T,{size:"22",icon:"tabler-trash"})]),_:2},1032,["onClick"]),l(_,{class:"mr-2",icon:"",size:"x-small",color:"default",onClick:h=>D("form",a.id)},{default:n(()=>[l(T,{size:"22",icon:"tabler-edit"})]),_:2},1032,["onClick"])])])),[[w,!r(B)]])),128))]),x(e("tfoot",null,ie,512),[[w,!r(f).length]])]),_:1}),l(A),l(P,{fluid:"",class:"d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5"},{default:n(()=>[e("span",de,c(r(F)),1),l(X,{modelValue:r(o),"onUpdate:modelValue":t[3]||(t[3]=a=>v(o)?o.value=a:null),size:"small","total-visible":5,length:r(N)},null,8,["modelValue","length"])]),_:1})]))}});export{we as _};
