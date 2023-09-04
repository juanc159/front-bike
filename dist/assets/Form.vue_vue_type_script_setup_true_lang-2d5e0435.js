import{u as j}from"./useCrudRoleStore-279b58c3.js";import{e as D,s as I,g as N,r as y,q as K,o as d,c as p,d as o,w as r,B as m,E as x,b as v,A as f,k as t,Q as b,U as w,a0 as L,a as q,J as z,K as A,L as B,C as E,a1 as G,a2 as J,t as P,h as F,a3 as Q,l as H}from"./index-5157f066.js";import{V as R}from"./VTextField-f6b14139.js";import{V as S}from"./VCheckbox-5f708799.js";import{V as O}from"./VForm-8fa3c58d.js";const se=D({__name:"Form",setup(W){const s=j(),{formulario:n}=I(s),g=N(),i=y([]),c=y(),V=y(),k=async a=>{var e;s.typeAction=a,await((e=V.value)==null?void 0:e.resetValidation()),i.value=[],a!="back"&&s.keyList++},T=async()=>{var e;const a=await((e=V.value)==null?void 0:e.validate());if(a!=null&&a.valid){n.value.company_id=g.company.id;const l=await s.fetchSave(n.value);l.status===200&&k("list"),l.status===422&&(i.value=l.error)}},U=a=>{const e=n.value.permissions.findIndex(l=>l===a);console.log(e),e!=-1?(c.value=!1,n.value.permissions.splice(e,1)):n.value.permissions.push(a)},C=()=>{n.value.permissions=[];for(let a=0;a<s.arrayMenus.length;a++)for(let e=0;e<s.arrayMenus[a].permissions.length;e++)s.arrayMenus[a].permissions[e].estado="Inactivo"},$=()=>{if(c.value)C();else{n.value.permissions=[];for(let a=0;a<s.arrayMenus.length;a++)for(let e=0;e<s.arrayMenus[a].permissions.length;e++)n.value.permissions.push(s.arrayMenus[a].permissions[e].id),s.arrayMenus[a].permissions[e].estado="Activo"}};return K(async()=>{if(C(),await s.fetchDataForm(),s.roleData.id){n.value.permissions=[],await s.fetchInfoRole(s.roleData.id);for(let a=0;a<s.arrayMenus.length;a++)for(let e=0;e<s.arrayMenus[a].permissions.length;e++)for(let l=0;l<n.value.permissions.length;l++)n.value.permissions.includes(s.arrayMenus[a].permissions[e].id)&&(s.arrayMenus[a].permissions[e].estado="Activo")}}),(a,e)=>(d(),p("div",null,[o(f,null,{default:r(()=>[o(m,{cols:"12",class:"d-flex justify-content-end"},{default:r(()=>[o(x,{color:"secondary",onClick:e[0]||(e[0]=l=>k("back"))},{default:r(()=>[v(" Atras ")]),_:1})]),_:1})]),_:1}),o(t(O),{ref_key:"formValidation",ref:V,"lazy-validation":""},{default:r(()=>[o(f,null,{default:r(()=>[o(m,{cols:"12",md:"4"},{default:r(()=>[o(R,{modelValue:t(n).name,"onUpdate:modelValue":e[1]||(e[1]=l=>t(n).name=l),maxlength:"20",rules:[t(b),t(w)(t(n).name,20),t(L)(t(n).name,8)],"error-messages":t(i).name,label:"Nombre",onKeypress:e[2]||(e[2]=l=>t(i).name="")},null,8,["modelValue","rules","error-messages"])]),_:1}),o(m,{cols:"12",md:"4"},{default:r(()=>[o(R,{modelValue:t(n).description,"onUpdate:modelValue":e[3]||(e[3]=l=>t(n).description=l),rules:[t(b),t(w)(t(n).description,50)],maxlength:"50","error-messages":t(i).description,label:"Descripción",onKeypress:e[4]||(e[4]=l=>t(i).description="")},null,8,["modelValue","rules","error-messages"])]),_:1})]),_:1}),o(f,null,{default:r(()=>[o(m,null,{default:r(()=>[q("span",null,[v("Todos "),o(S,{modelValue:t(c),"onUpdate:modelValue":e[5]||(e[5]=l=>z(c)?c.value=l:null),label:"Todos",onClick:$},null,8,["modelValue"])])]),_:1})]),_:1}),o(f,null,{default:r(()=>[(d(!0),p(A,null,B(t(s).arrayMenus,(l,_)=>(d(),p("div",{key:_},[o(m,{cols:"3"},{default:r(()=>[o(E,{width:"215"},{default:r(()=>[o(G,null,{default:r(()=>[o(J,null,{default:r(()=>[v(P(l.title),1)]),_:2},1024),(d(!0),p(A,null,B(l.permissions,(u,h)=>(d(),F(Q,{key:h},{default:r(()=>[t(g).permissions.includes(u.name)?(d(),F(S,{key:0,id:`check${_}-${h}`,modelValue:u.estado,"onUpdate:modelValue":M=>u.estado=M,label:u.name,"true-value":"Activo","false-value":"Inactivo",value:u.estado,onClick:M=>U(u.id)},null,8,["id","modelValue","onUpdate:modelValue","label","value","onClick"])):H("",!0)]),_:2},1024))),128))]),_:2},1024)]),_:2},1024)]),_:2},1024)]))),128))]),_:1}),o(f,null,{default:r(()=>[o(m,{cols:"12 d-flex justify-content-center"},{default:r(()=>[o(x,{color:"primary",onClick:T},{default:r(()=>[v(" Guardar ")]),_:1})]),_:1})]),_:1})]),_:1},512)]))}});export{se as _};