import{Y as h,a5 as d,ay as b,a8 as m,a9 as v,aE as f,aH as u,a1 as c,p as t,aQ as g}from"./index-e5b1715d.js";const y=h()({name:"VTable",props:{fixedHeader:Boolean,fixedFooter:Boolean,height:[Number,String],hover:Boolean,...d(),...b(),...m(),...v()},setup(a,n){let{slots:e}=n;const{themeClasses:i}=f(a),{densityClasses:r}=u(a);return c(()=>t(a.tag,{class:["v-table",{"v-table--fixed-height":!!a.height,"v-table--fixed-header":a.fixedHeader,"v-table--fixed-footer":a.fixedFooter,"v-table--has-top":!!e.top,"v-table--has-bottom":!!e.bottom,"v-table--hover":a.hover},i.value,r.value,a.class],style:a.style},{default:()=>{var o,l,s;return[(o=e.top)==null?void 0:o.call(e),e.default?t("div",{class:"v-table__wrapper",style:{height:g(a.height)}},[t("table",null,[e.default()])]):(l=e.wrapper)==null?void 0:l.call(e),(s=e.bottom)==null?void 0:s.call(e)]}})),{}}});export{y as V};
