import{d as l,o as t,c as r,x as s,C as a,p as o,w as p,B as h,A as f,m as g,q as n,a3 as i}from"./index-e5b1715d.js";import{u as k,m as x,a as y}from"./misc-mask-light-09b6aeb0.js";import{b as _}from"./route-block-83d24a4e.js";const C={class:"text-center"},w={key:0,class:"text-h1 font-weight-medium"},V={key:1,class:"text-h4 font-weight-medium mb-3"},v={key:2},B=l({__name:"ErrorHeader",props:{errorCode:null,errorTitle:null,errorDescription:null},setup(c){const e=c;return(m,d)=>(t(),r("div",C,[e.errorCode?(t(),r("h1",w,s(e.errorCode),1)):a("",!0),e.errorTitle?(t(),r("h4",V,s(e.errorTitle),1)):a("",!0),e.errorDescription?(t(),r("p",v,s(e.errorDescription),1)):a("",!0)]))}}),b="/assets/404-c6f3c581.png",D={class:"misc-wrapper"},N={class:"misc-avatar w-100 text-center"},T=l({__name:"[...all]",setup(c){const e=k(y,x);return(m,d)=>{const u=B;return t(),r("div",D,[o(u,{"error-title":"Page Not Found :(","error-description":"We couldn't find the page you are looking for."}),o(f,{to:"/",class:"mb-12"},{default:p(()=>[h(" Back to Home ")]),_:1}),g("div",N,[o(i,{src:n(b),alt:"Coming Soon","max-width":200,class:"mx-auto"},null,8,["src"])]),o(i,{src:n(e),class:"misc-footer-img d-none d-md-block"},null,8,["src"])])}}});typeof _=="function"&&_(T);export{T as default};
