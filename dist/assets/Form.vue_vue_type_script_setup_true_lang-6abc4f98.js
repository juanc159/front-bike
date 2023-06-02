import{u as S,V as B}from"./VFileInput-5733a527.js";import{u as T}from"./useCrudUserStore-731d01f3.js";import{d as q,k as p,z,y as A,L as E,aw as u,aq as P,o as x,c as R,p as o,w as t,H as d,m as j,C as k,E as w,G as g,q as e,ax as G,ay as U,az as C,b as L,a9 as M}from"./index-62eefdbf.js";import{V as m}from"./VTextField-afc15bd9.js";import{V as D}from"./VSelect-099d6728.js";import{V as H}from"./VForm-28894a98.js";const J={class:"col-md-6 d-flex justify-content-end"},_=q({__name:"Form",props:{userId:{type:Number,default:null,required:!1}},setup(N){const c=N,v=p(),I=z(),f=T(),{formulario:s,arrayRoles:F}=A(f),r=p([]),i=p(S()),V=p(!1),y=p([]),b=async n=>{var a;f.typeAction=n,y.value=[],r.value=[],i.value.clearData(),await((a=v.value)==null?void 0:a.resetValidation()),n!="back"&&f.keyList++},$=n=>{i.value.handleImageSelected(n)},K=async()=>{var a;s.value.company_id=I.company.id;const n=await((a=v.value)==null?void 0:a.validate());if(n!=null&&n.valid){i.value.imageFile&&(s.value.photo=i.value.imageFile);const l=await f.fetchSave();l.status===200&&b("list"),l.status===422&&(r.value=l.error)}};return E(s,(n,a)=>{n.id?y.value.password=[]:y.value.password=[u(n.password)]},{deep:!0}),P(async()=>{c.userId&&await f.fetchInfoUser(c.userId)}),(n,a)=>(x(),R("div",null,[o(g,null,{default:t(()=>[o(d,{cols:"12"},{default:t(()=>[j("div",J,[o(k,{color:"secondary",onClick:a[0]||(a[0]=l=>b("back"))},{default:t(()=>[w(" Atras ")]),_:1})])]),_:1})]),_:1}),o(e(H),{ref_key:"formValidation",ref:v,"lazy-validation":""},{default:t(()=>[o(g,null,{default:t(()=>[o(d,{cols:"12",md:"4"},{default:t(()=>[o(m,{modelValue:e(s).email,"onUpdate:modelValue":a[1]||(a[1]=l=>e(s).email=l),rules:[e(u),e(G)],autocomplete:"off","error-messages":e(r).email,label:"Email",onKeypress:a[2]||(a[2]=l=>e(r).email="")},null,8,["modelValue","rules","error-messages"])]),_:1}),o(d,{cols:"12",md:"4"},{default:t(()=>[o(m,{modelValue:e(s).password,"onUpdate:modelValue":a[3]||(a[3]=l=>e(s).password=l),rules:e(y).password,autocomplete:"off",type:e(V)?"text":"password","append-icon":e(V)?"mdi-eye":"mdi-eye-off","error-messages":e(r).password,label:"Contraseña","onClick:append":a[4]||(a[4]=l=>V.value=!e(V)),onKeypress:a[5]||(a[5]=l=>e(r).password="")},null,8,["modelValue","rules","type","append-icon","error-messages"])]),_:1}),o(d,{cols:"12",md:"4"},{default:t(()=>[o(m,{modelValue:e(s).name,"onUpdate:modelValue":a[6]||(a[6]=l=>e(s).name=l),rules:[e(u)],"error-messages":e(r).name,label:"Nombre",onKeypress:a[7]||(a[7]=l=>e(r).name="")},null,8,["modelValue","rules","error-messages"])]),_:1}),o(d,{cols:"12",md:"4"},{default:t(()=>[o(m,{modelValue:e(s).lastName,"onUpdate:modelValue":a[8]||(a[8]=l=>e(s).lastName=l),rules:[e(u)],"error-messages":e(r).lastName,label:"Apellido",onKeypress:a[9]||(a[9]=l=>e(r).lastName="")},null,8,["modelValue","rules","error-messages"])]),_:1}),o(d,{cols:"12",md:"4"},{default:t(()=>[o(D,{modelValue:e(s).role_id,"onUpdate:modelValue":[a[10]||(a[10]=l=>e(s).role_id=l),a[11]||(a[11]=l=>e(r).role_id="")],rules:[e(u)],items:e(F),"item-title":"name","item-value":"id",label:"Tipo de usuario","error-messages":e(r).role_id},null,8,["modelValue","rules","items","error-messages"])]),_:1}),o(d,{cols:"12",md:"4"},{default:t(()=>[o(m,{modelValue:e(s).identification,"onUpdate:modelValue":a[12]||(a[12]=l=>e(s).identification=l),maxlength:"10",rules:[e(u),e(U)(e(s).identification,10)],"error-messages":e(r).identification,label:"identificación",onKeypress:a[13]||(a[13]=l=>{e(r).identification="",e(C)(l)})},null,8,["modelValue","rules","error-messages"])]),_:1})]),_:1}),o(g,null,{default:t(()=>[o(d,{cols:"12",md:"4"},{default:t(()=>[o(m,{modelValue:e(s).phone,"onUpdate:modelValue":a[14]||(a[14]=l=>e(s).phone=l),maxlength:"15",rules:[e(u),e(U)(e(s).phone,15)],"error-messages":e(r).phone,label:"Telefono",onKeypress:a[15]||(a[15]=l=>{e(r).phone="",e(C)(l)})},null,8,["modelValue","rules","error-messages"])]),_:1}),o(d,{cols:"12",md:"4"},{default:t(()=>[(x(),L(B,{key:e(i).key,"show-size":"",counter:"",label:"Photo",accept:"image/*",onChange:a[16]||(a[16]=l=>$(l))},{default:t(()=>[w(" /> ")]),_:1}))]),_:1}),o(d,{cols:"12"},{default:t(()=>[o(M,{contain:"",src:e(i).imageUrl??e(s).photo,alt:"foto Personal","max-width":200,class:"mx-auto"},null,8,["src"])]),_:1})]),_:1}),o(g,null,{default:t(()=>[o(d,{cols:"12 d-flex justify-content-center"},{default:t(()=>[o(k,{color:"primary",onClick:K},{default:t(()=>[w(" Guardar ")]),_:1})]),_:1})]),_:1})]),_:1},512)]))}});export{_};
