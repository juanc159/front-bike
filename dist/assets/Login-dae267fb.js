import{d as ee,V as te}from"./VTextField-7b882186.js";import{Y as ae,a4 as se,a5 as le,ay as oe,az as ne,aA as re,a6 as ie,be as ce,a7 as de,a8 as ue,a9 as me,aC as fe,$ as ve,I as g,aE as pe,aG as _e,aH as be,aI as ge,aJ as ye,ah as he,bg as Ve,ad as xe,af as ke,ac as Ce,ae as Pe,p as t,aL as we,V as U,al as A,A as S,J as Ie,d as V,bN as B,o as y,c as I,q as s,b as G,C as Se,bS as Le,a as H,w as l,n as $e,bP as D,bQ as z,s as Te,ag as Ae,F as Be,j as De,b7 as ze,z as Fe,k as P,m as o,a3 as F,v as R,B as v,x as Re,H as Ee}from"./index-e5b1715d.js";import{u as E,m as Ne,a as je}from"./misc-mask-light-09b6aeb0.js";import{V as Me}from"./VNodeRenderer-ca7e2a64.js";import{a as f,V as N}from"./VRow-0d53bcfe.js";import{V as Ue,d as w}from"./VCard-2bb6063b.js";import{c as Ge}from"./createSimpleFunctional-58ba5248.js";import{V as He}from"./VForm-d55aee7b.js";import{V as Je}from"./VCheckbox-df58d394.js";import{V as j}from"./VDivider-8a24bc85.js";import{b as M}from"./route-block-83d24a4e.js";import"./forwardRefs-9d31fcaa.js";/* empty css              */import"./VCheckboxBtn-09bad6bb.js";const Oe=Ge("v-alert-title"),qe=["success","info","warning","error"],Qe=ae()({name:"VAlert",props:{border:{type:[Boolean,String],validator:e=>typeof e=="boolean"||["top","end","bottom","start"].includes(e)},borderColor:String,closable:Boolean,closeIcon:{type:se,default:"$close"},closeLabel:{type:String,default:"$vuetify.close"},icon:{type:[Boolean,String,Function,Object],default:null},modelValue:{type:Boolean,default:!0},prominent:Boolean,title:String,text:String,type:{type:String,validator:e=>qe.includes(e)},...le(),...oe(),...ne(),...re(),...ie(),...ce(),...de(),...ue(),...me(),...fe({variant:"flat"})},emits:{"click:close":e=>!0,"update:modelValue":e=>!0},setup(e,u){let{emit:r,slots:a}=u;const c=ve(e,"modelValue"),i=g(()=>{if(e.icon!==!1)return e.type?e.icon??`$${e.type}`:e.icon}),p=g(()=>({color:e.color??e.type,variant:e.variant})),{themeClasses:m}=pe(e),{colorClasses:x,colorStyles:_,variantClasses:k}=_e(p),{densityClasses:n}=be(e),{dimensionStyles:h}=ge(e),{elevationClasses:d}=ye(e),{locationStyles:J}=he(e),{positionClasses:O}=Ve(e),{roundedClasses:q}=xe(e),{textColorClasses:Q,textColorStyles:W}=ke(Ce(e,"borderColor")),{t:Y}=Pe(),L=g(()=>({"aria-label":Y(e.closeLabel),onClick(C){c.value=!1,r("click:close",C)}}));return()=>{const C=!!(a.prepend||i.value),K=!!(a.title||e.title),X=!!(e.text||a.text),Z=!!(a.close||e.closable);return c.value&&t(e.tag,{class:["v-alert",e.border&&{"v-alert--border":!!e.border,[`v-alert--border-${e.border===!0?"start":e.border}`]:!0},{"v-alert--prominent":e.prominent},m.value,x.value,n.value,d.value,O.value,q.value,k.value,e.class],style:[_.value,h.value,J.value,e.style],role:"alert"},{default:()=>{var $,T;return[we(!1,"v-alert"),e.border&&t("div",{key:"border",class:["v-alert__border",Q.value],style:W.value},null),C&&t("div",{key:"prepend",class:"v-alert__prepend"},[a.prepend?t(A,{key:"prepend-defaults",disabled:!i.value,defaults:{VIcon:{density:e.density,icon:i.value,size:e.prominent?44:28}}},a.prepend):t(U,{key:"prepend-icon",density:e.density,icon:i.value,size:e.prominent?44:28},null)]),t("div",{class:"v-alert__content"},[K&&t(Oe,{key:"title"},{default:()=>{var b;return[((b=a.title)==null?void 0:b.call(a))??e.title]}}),X&&((($=a.text)==null?void 0:$.call(a))??e.text),(T=a.default)==null?void 0:T.call(a)]),a.append&&t("div",{key:"append",class:"v-alert__append"},[a.append()]),Z&&t("div",{key:"close",class:"v-alert__close"},[a.close?t(A,{key:"close-defaults",defaults:{VBtn:{icon:e.closeIcon,size:"x-small",variant:"text"}}},{default:()=>{var b;return[(b=a.close)==null?void 0:b.call(a,{props:L.value})]}}):t(S,Ie({key:"close-btn",icon:e.closeIcon,size:"x-small",variant:"text"},L.value),null)])]}})}}}),We=V({name:"AppTextField",inheritAttrs:!1}),Ye=V({...We,setup(e){const u=g(()=>{const a=B(),c=a.id||a.label;return c?`app-text-field-${c}-${Math.random().toString(36).slice(2,7)}`:void 0}),r=g(()=>B().label);return(a,c)=>(y(),I("div",{class:Te(["app-text-field flex-grow-1",a.$attrs.class])},[s(r)?(y(),G(ee,{key:0,for:s(u),class:"mb-1 text-body-2 text-high-emphasis",text:s(r)},null,8,["for","text"])):Se("",!0),t(te,D(z({...a.$attrs,class:null,label:void 0,variant:"outlined",id:s(u)})),Le({_:2},[H(a.$slots,(i,p)=>({name:p,fn:l(m=>[$e(a.$slots,p,D(z(m||{})))])}))]),1040)],2))}}),Ke={class:"d-flex justify-center flex-wrap gap-3"},Xe=V({__name:"AuthProvider",setup(e){const{global:u}=Ae(),r=[{icon:"fa-facebook",color:"#4267b2"},{icon:"fa-google",color:"#dd4b39"},{icon:"fa-twitter",color:"#1da1f2"}];return(a,c)=>(y(),I("div",Ke,[(y(),I(Be,null,H(r,i=>t(S,{key:i.icon,icon:"",variant:"tonal",size:"38",color:s(u).name.value==="dark"?i.colorInDark:i.color,class:"rounded"},{default:l(()=>[t(U,{size:"18",icon:i.icon},null,8,["icon"])]),_:2},1032,["color"])),64))]))}}),Ze="/assets/auth-v2-login-illustration-bordered-dark-a595a9b7.png",et="/assets/auth-v2-login-illustration-bordered-light-47ee3625.png",tt="/assets/auth-v2-login-illustration-dark-0878e8b9.png",at="/assets/auth-v2-login-illustration-light-d1fd488d.png",st={class:"position-relative bg-background rounded-lg w-100 ma-8 me-0"},lt={class:"d-flex align-center justify-center w-100 h-100"},ot={class:"text-h5 mb-1"},nt={class:"text-capitalize"},rt=o("p",{class:"mb-0"}," Please sign-in to your account and start the adventure ",-1),it=o("p",{class:"text-caption mb-2"},[v(" Admin Email: "),o("strong",null,"admin@demo.com"),v(" / Pass: "),o("strong",null,"admin")],-1),ct=o("p",{class:"text-caption mb-0"},[v(" Client Email: "),o("strong",null,"client@demo.com"),v(" / Pass: "),o("strong",null,"client")],-1),dt={class:"d-flex align-center flex-wrap justify-space-between mt-2 mb-4"},ut=o("a",{class:"text-primary ms-2 mb-1",href:"#"}," Forgot Password? ",-1),mt=o("span",null,"New on our platform?",-1),ft=o("a",{class:"text-primary ms-2",href:"#"}," Create an account ",-1),vt=o("span",{class:"mx-4"},"or",-1),pt=V({__name:"Login",setup(e){const u=De(),r=ze({email:"",password:""}),a=Fe(),c=async()=>{await a.login(r).then(k=>{u.push({name:"Admin-Dashboard-Index"})})},i=E(at,tt,et,Ze,!0),p=E(je,Ne),m=P(!1),x=P(),_=P(!1);return(k,n)=>{const h=Ye;return y(),G(N,{"no-gutters":"",class:"auth-wrapper bg-surface"},{default:l(()=>[t(f,{lg:"8",class:"d-none d-lg-flex"},{default:l(()=>[o("div",st,[o("div",lt,[t(F,{"max-width":"505",src:s(i),class:"auth-illustration mt-16 mb-2"},null,8,["src"])]),t(F,{src:s(p),class:"auth-footer-mask"},null,8,["src"])])]),_:1}),t(f,{cols:"12",lg:"4",class:"auth-card-v2 d-flex align-center justify-center"},{default:l(()=>[t(Ue,{flat:"","max-width":500,class:"mt-12 mt-sm-0 pa-4"},{default:l(()=>[t(w,null,{default:l(()=>[t(s(Me),{nodes:s(R).app.logo,class:"mb-6"},null,8,["nodes"]),o("h5",ot,[v(" Welcome to "),o("span",nt,Re(s(R).app.title),1),v("! 👋🏻 ")]),rt]),_:1}),t(w,null,{default:l(()=>[t(Qe,{color:"primary",variant:"tonal"},{default:l(()=>[it,ct]),_:1})]),_:1}),t(w,null,{default:l(()=>[t(s(He),{ref_key:"refVForm",ref:x,onSubmit:n[5]||(n[5]=()=>{})},{default:l(()=>[t(N,null,{default:l(()=>[t(f,{cols:"12"},{default:l(()=>[t(h,{modelValue:s(r).email,"onUpdate:modelValue":n[0]||(n[0]=d=>s(r).email=d),label:"Email",type:"email",autofocus:""},null,8,["modelValue"])]),_:1}),t(f,{cols:"12"},{default:l(()=>[t(h,{modelValue:s(r).password,"onUpdate:modelValue":n[1]||(n[1]=d=>s(r).password=d),label:"Password",type:s(m)?"text":"password","append-inner-icon":s(m)?"tabler-eye-off":"tabler-eye","onClick:appendInner":n[2]||(n[2]=d=>m.value=!s(m))},null,8,["modelValue","type","append-inner-icon"]),o("div",dt,[t(Je,{modelValue:s(_),"onUpdate:modelValue":n[3]||(n[3]=d=>Ee(_)?_.value=d:null),label:"Remember me"},null,8,["modelValue"]),ut]),t(S,{block:"",type:"button",onClick:n[4]||(n[4]=d=>c())},{default:l(()=>[v(" Login ")]),_:1})]),_:1}),t(f,{cols:"12",class:"text-center"},{default:l(()=>[mt,ft]),_:1}),t(f,{cols:"12",class:"d-flex align-center"},{default:l(()=>[t(j),vt,t(j)]),_:1}),t(f,{cols:"12",class:"text-center"},{default:l(()=>[t(Xe)]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1})}}});typeof M=="function"&&M(pt);export{pt as default};