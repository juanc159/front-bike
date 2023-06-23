import{u as D}from"./useCrudRoleStore-55c1aee8.js";import{d as I,y as N,z as U,k as y,ar as z,o as d,c as p,p as o,w as r,A as M,B as V,q as t,m as q,H as K,F as b,a as w,x as L,b as A,C as E}from"./index-13e9e9f8.js";import{r as F,l as B,a as G}from"./validators-e0eb24cc.js";import{a as m,V as c}from"./VRow-cb5cfbd1.js";import{V as R}from"./VTextField-2e327a5c.js";import{V as S}from"./VCheckbox-3cbf426b.js";import{V as H,a as P,b as J,e as O}from"./VCard-15e81e81.js";import{V as Q}from"./VForm-ceb26d7c.js";const te=I({__name:"Form",setup(W){const s=D(),{formulario:n}=N(s),g=U(),i=y([]),f=y(),v=y(),k=async a=>{var e;s.typeAction=a,await((e=v.value)==null?void 0:e.resetValidation()),i.value=[],a!="back"&&s.keyList++},T=async()=>{var e;const a=await((e=v.value)==null?void 0:e.validate());if(a!=null&&a.valid){n.value.company_id=g.company.id;const l=await s.fetchSave(n.value);l.status===200&&k("list"),l.status===422&&(i.value=l.error)}},$=a=>{const e=n.value.permissions.findIndex(l=>l===a);console.log(e),e!=-1?(f.value=!1,n.value.permissions.splice(e,1)):n.value.permissions.push(a)},C=()=>{n.value.permissions=[];for(let a=0;a<s.arrayMenus.length;a++)for(let e=0;e<s.arrayMenus[a].permissions.length;e++)s.arrayMenus[a].permissions[e].estado="Inactivo"},j=()=>{if(f.value)C();else{n.value.permissions=[];for(let a=0;a<s.arrayMenus.length;a++)for(let e=0;e<s.arrayMenus[a].permissions.length;e++)n.value.permissions.push(s.arrayMenus[a].permissions[e].id),s.arrayMenus[a].permissions[e].estado="Activo"}};return z(async()=>{if(C(),await s.fetchDataForm(),s.roleData.id){n.value.permissions=[],await s.fetchInfoRole(s.roleData.id);for(let a=0;a<s.arrayMenus.length;a++)for(let e=0;e<s.arrayMenus[a].permissions.length;e++)for(let l=0;l<n.value.permissions.length;l++)n.value.permissions.includes(s.arrayMenus[a].permissions[e].id)&&(s.arrayMenus[a].permissions[e].estado="Activo")}}),(a,e)=>(d(),p("div",null,[o(c,null,{default:r(()=>[o(m,{cols:"12",class:"d-flex justify-content-end"},{default:r(()=>[o(M,{color:"secondary",onClick:e[0]||(e[0]=l=>k("back"))},{default:r(()=>[V(" Atras ")]),_:1})]),_:1})]),_:1}),o(t(Q),{ref_key:"formValidation",ref:v,"lazy-validation":""},{default:r(()=>[o(c,null,{default:r(()=>[o(m,{cols:"12",md:"4"},{default:r(()=>[o(R,{modelValue:t(n).name,"onUpdate:modelValue":e[1]||(e[1]=l=>t(n).name=l),maxlength:"20",rules:[t(F),t(B)(t(n).name,20),t(G)(t(n).name,8)],"error-messages":t(i).name,label:"Nombre",onKeypress:e[2]||(e[2]=l=>t(i).name="")},null,8,["modelValue","rules","error-messages"])]),_:1}),o(m,{cols:"12",md:"4"},{default:r(()=>[o(R,{modelValue:t(n).description,"onUpdate:modelValue":e[3]||(e[3]=l=>t(n).description=l),rules:[t(F),t(B)(t(n).description,50)],maxlength:"50","error-messages":t(i).description,label:"Descripción",onKeypress:e[4]||(e[4]=l=>t(i).description="")},null,8,["modelValue","rules","error-messages"])]),_:1})]),_:1}),o(c,null,{default:r(()=>[o(m,null,{default:r(()=>[q("span",null,[V("Todos "),o(S,{modelValue:t(f),"onUpdate:modelValue":e[5]||(e[5]=l=>K(f)?f.value=l:null),label:"Todos",onClick:j},null,8,["modelValue"])])]),_:1})]),_:1}),o(c,null,{default:r(()=>[(d(!0),p(b,null,w(t(s).arrayMenus,(l,_)=>(d(),p("div",{key:_},[o(m,{cols:"3"},{default:r(()=>[o(H,{width:"215"},{default:r(()=>[o(P,null,{default:r(()=>[o(J,null,{default:r(()=>[V(L(l.title),1)]),_:2},1024),(d(!0),p(b,null,w(l.permissions,(u,h)=>(d(),A(O,{key:h},{default:r(()=>[t(g).permissions.includes(u.name)?(d(),A(S,{key:0,id:`check${_}-${h}`,modelValue:u.estado,"onUpdate:modelValue":x=>u.estado=x,label:u.name,"true-value":"Activo","false-value":"Inactivo",value:u.estado,onClick:x=>$(u.id)},null,8,["id","modelValue","onUpdate:modelValue","label","value","onClick"])):E("",!0)]),_:2},1024))),128))]),_:2},1024)]),_:2},1024)]),_:2},1024)]))),128))]),_:1}),o(c,null,{default:r(()=>[o(m,{cols:"12 d-flex justify-content-center"},{default:r(()=>[o(M,{color:"primary",onClick:T},{default:r(()=>[V(" Guardar ")]),_:1})]),_:1})]),_:1})]),_:1},512)]))}});export{te as _};
