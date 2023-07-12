/* empty css              */import{Y as $,a5 as R,a8 as F,a1 as w,p as s,E as J,o as D,c as N,bk as X,F as Y,m as M,d as H,k as E,bl as Q,a4 as P,ax as Z,ay as ee,aA as ae,a7 as te,bm as ne,a9 as le,aC as ie,$ as se,ae as re,b8 as ue,aE as oe,b6 as ve,aO as C,bn as ce,I as m,bo as k,ac as g,A as x,J as L,bp as S,aU as B}from"./index-e5b1715d.js";const Le=$()({name:"VContainer",props:{fluid:{type:Boolean,default:!1},...R(),...F()},setup(e,f){let{slots:i}=f;return w(()=>s(e.tag,{class:["v-container",{"v-container--fluid":e.fluid},e.class],style:e.style},i)),{}}}),de={},fe=M("h2",{class:"mb-2"},"Cargando información",-1);function ge(e,f){return D(),N(Y,null,[fe,s(X,{rotate:360,size:"50",color:"primary",indeterminate:""})],64)}const be=J(de,[["render",ge]]),me={class:"py-5 d-flex justify-content-center align-items-center flex-column"},he=H({__name:"PreloadInterno",setup(e){return(f,i)=>(D(),N("div",null,[M("div",me,[s(be)])]))}});function ye(){const e=E([]);Q(()=>e.value=[]);function f(i,V){e.value[V]=i}return{refs:e,updateRef:f}}const Pe=$()({name:"VPagination",props:{activeColor:String,start:{type:[Number,String],default:1},modelValue:{type:Number,default:e=>e.start},disabled:Boolean,length:{type:[Number,String],default:1,validator:e=>e%1===0},totalVisible:[Number,String],firstIcon:{type:P,default:"$first"},prevIcon:{type:P,default:"$prev"},nextIcon:{type:P,default:"$next"},lastIcon:{type:P,default:"$last"},ariaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.root"},pageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.page"},currentPageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.currentPage"},firstAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.first"},previousAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.previous"},nextAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.next"},lastAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.last"},ellipsis:{type:String,default:"..."},showFirstLastPage:Boolean,...Z(),...R(),...ee(),...ae(),...te(),...ne(),...F({tag:"nav"}),...le(),...ie({variant:"text"})},emits:{"update:modelValue":e=>!0,first:e=>!0,prev:e=>!0,next:e=>!0,last:e=>!0},setup(e,f){let{slots:i,emit:V}=f;const l=se(e,"modelValue"),{t:b,n:z}=re(),{isRtl:h}=ue(),{themeClasses:T}=oe(e),{width:K}=ve(),p=E(-1);C(void 0,{scoped:!0});const{resizeRef:O}=ce(a=>{if(!a.length)return;const{target:t,contentRect:n}=a[0],o=t.querySelector(".v-pagination__list > *");if(!o)return;const v=n.width,_=o.offsetWidth+parseFloat(getComputedStyle(o).marginRight)*2;p.value=I(v,_)}),r=m(()=>parseInt(e.length,10)),u=m(()=>parseInt(e.start,10)),c=m(()=>e.totalVisible?parseInt(e.totalVisible,10):p.value>=0?p.value:I(K.value,58));function I(a,t){const n=e.showFirstLastPage?5:3;return Math.max(0,Math.floor(+((a-t*n)/t).toFixed(2)))}const U=m(()=>{if(r.value<=0||isNaN(r.value)||r.value>Number.MAX_SAFE_INTEGER)return[];if(c.value<=1)return[l.value];if(r.value<=c.value)return k(r.value,u.value);const a=c.value%2===0,t=a?c.value/2:Math.floor(c.value/2),n=a?t:t+1,o=r.value-t;if(n-l.value>=0)return[...k(Math.max(1,c.value-1),u.value),e.ellipsis,r.value];if(l.value-o>=(a?1:0)){const v=c.value-1,_=r.value-v+u.value;return[u.value,e.ellipsis,...k(v,_)]}else{const v=Math.max(1,c.value-3),_=v===1?l.value:l.value-Math.ceil(v/2)+u.value;return[u.value,e.ellipsis,...k(v,_),e.ellipsis,r.value]}});function y(a,t,n){a.preventDefault(),l.value=t,n&&V(n,t)}const{refs:W,updateRef:j}=ye();C({VPaginationBtn:{color:g(e,"color"),border:g(e,"border"),density:g(e,"density"),size:g(e,"size"),variant:g(e,"variant"),rounded:g(e,"rounded"),elevation:g(e,"elevation")}});const q=m(()=>U.value.map((a,t)=>{const n=o=>j(o,t);if(typeof a=="string")return{isActive:!1,key:`ellipsis-${t}`,page:a,props:{ref:n,ellipsis:!0,icon:!0,disabled:!0}};{const o=a===l.value;return{isActive:o,key:a,page:z(a),props:{ref:n,ellipsis:!1,icon:!0,disabled:!!e.disabled||+e.length<2,color:o?e.activeColor:e.color,ariaCurrent:o,ariaLabel:b(o?e.currentPageAriaLabel:e.pageAriaLabel,a),onClick:v=>y(v,a)}}}})),d=m(()=>{const a=!!e.disabled||l.value<=u.value,t=!!e.disabled||l.value>=u.value+r.value-1;return{first:e.showFirstLastPage?{icon:h.value?e.lastIcon:e.firstIcon,onClick:n=>y(n,u.value,"first"),disabled:a,ariaLabel:b(e.firstAriaLabel),ariaDisabled:a}:void 0,prev:{icon:h.value?e.nextIcon:e.prevIcon,onClick:n=>y(n,l.value-1,"prev"),disabled:a,ariaLabel:b(e.previousAriaLabel),ariaDisabled:a},next:{icon:h.value?e.prevIcon:e.nextIcon,onClick:n=>y(n,l.value+1,"next"),disabled:t,ariaLabel:b(e.nextAriaLabel),ariaDisabled:t},last:e.showFirstLastPage?{icon:h.value?e.firstIcon:e.lastIcon,onClick:n=>y(n,u.value+r.value-1,"last"),disabled:t,ariaLabel:b(e.lastAriaLabel),ariaDisabled:t}:void 0}});function A(){var t;const a=l.value-u.value;(t=W.value[a])==null||t.$el.focus()}function G(a){a.key===S.left&&!e.disabled&&l.value>+e.start?(l.value=l.value-1,B(A)):a.key===S.right&&!e.disabled&&l.value<u.value+r.value-1&&(l.value=l.value+1,B(A))}return w(()=>s(e.tag,{ref:O,class:["v-pagination",T.value,e.class],style:e.style,role:"navigation","aria-label":b(e.ariaLabel),onKeydown:G,"data-test":"v-pagination-root"},{default:()=>[s("ul",{class:"v-pagination__list"},[e.showFirstLastPage&&s("li",{key:"first",class:"v-pagination__first","data-test":"v-pagination-first"},[i.first?i.first(d.value.first):s(x,L({_as:"VPaginationBtn"},d.value.first),null)]),s("li",{key:"prev",class:"v-pagination__prev","data-test":"v-pagination-prev"},[i.prev?i.prev(d.value.prev):s(x,L({_as:"VPaginationBtn"},d.value.prev),null)]),q.value.map((a,t)=>s("li",{key:a.key,class:["v-pagination__item",{"v-pagination__item--is-active":a.isActive}],"data-test":"v-pagination-item"},[i.item?i.item(a):s(x,L({_as:"VPaginationBtn"},a.props),{default:()=>[a.page]})])),s("li",{key:"next",class:"v-pagination__next","data-test":"v-pagination-next"},[i.next?i.next(d.value.next):s(x,L({_as:"VPaginationBtn"},d.value.next),null)]),e.showFirstLastPage&&s("li",{key:"last",class:"v-pagination__last","data-test":"v-pagination-last"},[i.last?i.last(d.value.last):s(x,L({_as:"VPaginationBtn"},d.value.last),null)])])]})),{}}});export{Le as V,he as _,Pe as a};