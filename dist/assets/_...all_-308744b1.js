import{e as l,o as t,c as r,t as s,l as a,d as o,w as p,b as h,E as f,a as k,k as n,j as i,aN as _}from"./index-5157f066.js";import{u as g,m as x,a as y}from"./misc-mask-light-fbc66912.js";const w={class:"text-center"},C={key:0,class:"text-h1 font-weight-medium"},V={key:1,class:"text-h4 font-weight-medium mb-3"},v={key:2},N=l({__name:"ErrorHeader",props:{errorCode:null,errorTitle:null,errorDescription:null},setup(c){const e=c;return(m,d)=>(t(),r("div",w,[e.errorCode?(t(),r("h1",C,s(e.errorCode),1)):a("",!0),e.errorTitle?(t(),r("h4",V,s(e.errorTitle),1)):a("",!0),e.errorDescription?(t(),r("p",v,s(e.errorDescription),1)):a("",!0)]))}}),b="/assets/404-c6f3c581.png",B={class:"misc-wrapper"},D={class:"misc-avatar w-100 text-center"},T=l({__name:"[...all]",setup(c){const e=g(y,x);return(m,d)=>{const u=N;return t(),r("div",B,[o(u,{"error-title":"Page Not Found :(","error-description":"We couldn't find the page you are looking for."}),o(f,{to:"/",class:"mb-12"},{default:p(()=>[h(" Back to Home ")]),_:1}),k("div",D,[o(i,{src:n(b),alt:"Coming Soon","max-width":200,class:"mx-auto"},null,8,["src"])]),o(i,{src:n(e),class:"misc-footer-img d-none d-md-block"},null,8,["src"])])}}});typeof _=="function"&&_(T);export{T as default};