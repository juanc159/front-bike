import{d as A,y as N,k as C,aq as Q,L as b,ar as q,N as E,o as m,c as v,p as t,w as s,m as e,q as o,M as V,C as x,E as j,Q as f,R as _,F as G,a as H,x as h,V as D,at as J,H as K,A as B,au as $,b as O,G as W}from"./index-62eefdbf.js";import{S as X}from"./sweetalert2.all-09c1f25c.js";import{u as P}from"./useCrudMenuStore-aa412b47.js";import{V as M,_ as Y,a as Z}from"./VPagination-d6aadf77.js";import{V as ee}from"./VSelect-099d6728.js";import{V as te}from"./VSpacer-405bbbb1.js";import{V as ae}from"./VTextField-afc15bd9.js";import{V as S}from"./VDivider-b9b8fa2a.js";import{V as le}from"./VTable-35230ba2.js";import{_ as oe}from"./Form.vue_vue_type_script_setup_true_lang-996fdf78.js";import{b as T}from"./route-block-83d24a4e.js";import"./_commonjsHelpers-725317a4.js";import"./forwardRefs-9d31fcaa.js";import"./VList-3716d12c.js";import"./dialog-transition-354d6aff.js";import"./VMenu-7d428786.js";import"./VOverlay-4803d0cb.js";import"./VCheckboxBtn-e18c842e.js";import"./VChip-e3037494.js";import"./VForm-28894a98.js";const se={class:"me-3",style:{width:"80px"}},ne={class:"app-user-search-filter d-flex align-center flex-wrap gap-4"},re={style:{width:"10rem"}},ie=e("thead",null,[e("tr",null,[e("th",{scope:"col"}," Título "),e("th",{scope:"col"}," Direccionar a "),e("th",{scope:"col"}," Icon "),e("th",{scope:"col"}," Acciones ")])],-1),ce={colspan:"4"},ue={class:"text-center",style:{width:"5rem"}},de=e("tr",null,[e("td",{colspan:"7",class:"text-center"}," No se encuentran resultados ")],-1),pe=[de],me={class:"text-sm text-disabled"},fe=A({__name:"TableList",setup(z){const n=P(),{menus:i,totalPage:d,links:g,currentPage:r,totalData:F,loading:w}=N(n),c=C(10),p=C(""),y=async()=>{await n.fetchAll({perPage:c.value,page:r.value,searchQuery:p.value})};Q(async()=>{n.typeAction!="back"&&await y()}),b(r,async()=>{r.value>d.value&&(r.value=d.value)}),b(c,async()=>{r.value=1}),q([r,p,c],async()=>{await y()});const I=E(()=>{const u=i.value.length?(r.value-1)*d.value+1:0,a=i.value.length+(r.value-1)*d.value;return`Mostrando ${u} a ${a} de ${F.value} registros`}),k=async(u,a=null)=>{n.clearFormulario(),n.typeAction=u,a&&n.fetchInfo(a)},L=async u=>{X.fire({title:"¿Desea eliminar el registro?",showDenyButton:!0,showCancelButton:!1,confirmButtonText:"Si",denyButtonText:"No"}).then(async a=>{a.isConfirmed?(await n.fetchDelete(u),await y()):a.isDenied})};return(u,a)=>(m(),v("div",null,[t(M,{fluid:"",class:"d-flex flex-wrap py-4 gap-4"},{default:s(()=>[e("div",se,[t(ee,{modelValue:o(c),"onUpdate:modelValue":a[0]||(a[0]=l=>V(c)?c.value=l:null),density:"compact",variant:"outlined",items:[10,20,30,50]},null,8,["modelValue"])]),t(te),e("div",ne,[e("div",re,[t(ae,{modelValue:o(p),"onUpdate:modelValue":a[1]||(a[1]=l=>V(p)?p.value=l:null),placeholder:"Buscar",density:"compact"},null,8,["modelValue"])]),t(x,{color:"primary",onClick:a[2]||(a[2]=l=>k("form"))},{default:s(()=>[j(" Agregar ")]),_:1})])]),_:1}),t(S),t(le,{class:"text-no-wrap"},{default:s(()=>[ie,e("tbody",null,[f(e("tr",null,[e("td",ce,[t(Y)])],512),[[_,o(w)]]),(m(!0),v(G,null,H(o(i),(l,R)=>f((m(),v("tr",{key:R,style:{height:"3.75rem"}},[e("td",null,[e("span",null,h(l.title),1)]),e("td",null,[e("span",null,h(l.to),1)]),e("td",null,[e("span",null,h(l.icon),1)]),e("td",ue,[t(x,{size:"x-small",color:"error",variant:"text",onClick:U=>L(l.id)},{default:s(()=>[t(D,{size:"22",icon:"tabler-trash"})]),_:2},1032,["onClick"]),t(x,{icon:"",size:"x-small",color:"default",variant:"text",onClick:U=>k("form",l.id)},{default:s(()=>[t(D,{size:"22",icon:"tabler-edit"})]),_:2},1032,["onClick"])])])),[[_,!o(w)]])),128))]),f(e("tfoot",null,pe,512),[[_,!o(i).length]])]),_:1}),t(S),t(M,{fluid:"",class:"d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5"},{default:s(()=>[e("span",me,h(o(I)),1),t(Z,{modelValue:o(r),"onUpdate:modelValue":a[3]||(a[3]=l=>V(r)?r.value=l:null),size:"small","total-visible":5,length:o(g)},null,8,["modelValue","length"])]),_:1})]))}}),_e=A({__name:"Index",setup(z){const n=P(),{typeAction:i}=N(n);return J(()=>{n.$reset()}),(d,g)=>(m(),v("div",null,[t(W,null,{default:s(()=>[t(K,{cols:"12"},{default:s(()=>[f(t(B,{title:"Listado Menú"},{default:s(()=>[t($,null,{default:s(()=>[(m(),O(fe,{key:o(n).keyList}))]),_:1})]),_:1},512),[[_,o(i)!=="form"]]),f(t(B,{title:"Form Menú"},{default:s(()=>[t($,null,{default:s(()=>[t(oe)]),_:1})]),_:1},512),[[_,o(i)==="form"]])]),_:1})]),_:1})]))}});typeof T=="function"&&T(_e);export{_e as default};
