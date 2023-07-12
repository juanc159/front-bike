import{u as T}from"./useCrudRoleStore-322c3f41.js";import{d as $,y as j,z as U,k as y,aq as q,o as d,c as p,p as o,w as r,H as m,C as x,E as v,G as f,q as t,aw as b,ay as w,aN as z,m as E,M as G,F as A,a as F,A as K,B as L,D as H,x as O,b as B,aO as P,I as J}from"./index-62eefdbf.js";import{V as D}from"./VTextField-afc15bd9.js";import{V as I}from"./VCheckbox-bff7e084.js";import{V as Q}from"./VForm-28894a98.js";const se=$({__name:"Form",setup(W){const s=T(),{formulario:n}=j(s),g=U(),i=y([]),c=y(),V=y(),k=async a=>{var e;s.typeAction=a,await((e=V.value)==null?void 0:e.resetValidation()),i.value=[],a!="back"&&s.keyList++},N=async()=>{var e;const a=await((e=V.value)==null?void 0:e.validate());if(a!=null&&a.valid){n.value.company_id=g.company.id;const l=await s.fetchSave(n.value);l.status===200&&k("list"),l.status===422&&(i.value=l.error)}},R=a=>{const e=n.value.permissions.findIndex(l=>l===a);console.log(e),e!=-1?(c.value=!1,n.value.permissions.splice(e,1)):n.value.permissions.push(a)},C=()=>{n.value.permissions=[];for(let a=0;a<s.arrayMenus.length;a++)for(let e=0;e<s.arrayMenus[a].permissions.length;e++)s.arrayMenus[a].permissions[e].estado="Inactivo"},S=()=>{if(c.value)C();else{n.value.permissions=[];for(let a=0;a<s.arrayMenus.length;a++)for(let e=0;e<s.arrayMenus[a].permissions.length;e++)n.value.permissions.push(s.arrayMenus[a].permissions[e].id),s.arrayMenus[a].permissions[e].estado="Activo"}};return q(async()=>{if(C(),await s.fetchDataForm(),s.roleData.id){n.value.permissions=[],await s.fetchInfoRole(s.roleData.id);for(let a=0;a<s.arrayMenus.length;a++)for(let e=0;e<s.arrayMenus[a].permissions.length;e++)for(let l=0;l<n.value.permissions.length;l++)n.value.permissions.includes(s.arrayMenus[a].permissions[e].id)&&(s.arrayMenus[a].permissions[e].estado="Activo")}}),(a,e)=>(d(),p("div",null,[o(f,null,{default:r(()=>[o(m,{cols:"12",class:"d-flex justify-content-end"},{default:r(()=>[o(x,{color:"secondary",onClick:e[0]||(e[0]=l=>k("back"))},{default:r(()=>[v(" Atras ")]),_:1})]),_:1})]),_:1}),o(t(Q),{ref_key:"formValidation",ref:V,"lazy-validation":""},{default:r(()=>[o(f,null,{default:r(()=>[o(m,{cols:"12",md:"4"},{default:r(()=>[o(D,{modelValue:t(n).name,"onUpdate:modelValue":e[1]||(e[1]=l=>t(n).name=l),maxlength:"20",rules:[t(b),t(w)(t(n).name,20),t(z)(t(n).name,8)],"error-messages":t(i).name,label:"Nombre",onKeypress:e[2]||(e[2]=l=>t(i).name="")},null,8,["modelValue","rules","error-messages"])]),_:1}),o(m,{cols:"12",md:"4"},{default:r(()=>[o(D,{modelValue:t(n).description,"onUpdate:modelValue":e[3]||(e[3]=l=>t(n).description=l),rules:[t(b),t(w)(t(n).description,50)],maxlength:"50","error-messages":t(i).description,label:"Descripción",onKeypress:e[4]||(e[4]=l=>t(i).description="")},null,8,["modelValue","rules","error-messages"])]),_:1})]),_:1}),o(f,null,{default:r(()=>[o(m,null,{default:r(()=>[E("span",null,[v("Todos "),o(I,{modelValue:t(c),"onUpdate:modelValue":e[5]||(e[5]=l=>G(c)?c.value=l:null),label:"Todos",onClick:S},null,8,["modelValue"])])]),_:1})]),_:1}),o(f,null,{default:r(()=>[(d(!0),p(A,null,F(t(s).arrayMenus,(l,_)=>(d(),p("div",{key:_},[o(m,{cols:"3"},{default:r(()=>[o(K,{width:"215"},{default:r(()=>[o(L,null,{default:r(()=>[o(H,null,{default:r(()=>[v(O(l.title),1)]),_:2},1024),(d(!0),p(A,null,F(l.permissions,(u,M)=>(d(),B(P,{key:M},{default:r(()=>[t(g).permissions.includes(u.name)?(d(),B(I,{key:0,id:`check${_}-${M}`,modelValue:u.estado,"onUpdate:modelValue":h=>u.estado=h,label:u.name,"true-value":"Activo","false-value":"Inactivo",value:u.estado,onClick:h=>R(u.id)},null,8,["id","modelValue","onUpdate:modelValue","label","value","onClick"])):J("",!0)]),_:2},1024))),128))]),_:2},1024)]),_:2},1024)]),_:2},1024)]))),128))]),_:1}),o(f,null,{default:r(()=>[o(m,{cols:"12 d-flex justify-content-center"},{default:r(()=>[o(x,{color:"primary",onClick:N},{default:r(()=>[v(" Guardar ")]),_:1})]),_:1})]),_:1})]),_:1},512)]))}});export{se as _};