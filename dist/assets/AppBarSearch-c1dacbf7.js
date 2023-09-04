import{n as j,ah as G,r as x,bC as H,v as E,aI as J,y as W,p as z,Y as X,d as t,ak as Y,bD as q,e as Z,bE as ee,bF as S,b1 as te,af as se,o as p,h as C,w as a,C as ae,z as R,k as o,J as le,bG as F,a as f,V as _,b0 as oe,G as A,c as b,K as D,L as B,b as K,t as w,a7 as L,H as T,A as re,B as ne,l as Q,b3 as ie,b4 as ce,_ as ue}from"./index-5157f066.js";import{V as de}from"./VTextField-f6b14139.js";import{V as pe}from"./VDivider-43847767.js";import{V as U,d as fe,a as M,b as he}from"./VList-b7265d42.js";import{m as me,u as ve,a as N}from"./VOverlay-886bd86f.js";import{f as ge}from"./forwardRefs-9d31fcaa.js";import{V as ye}from"./dialog-transition-27ba43fb.js";const _e=j()({name:"VDialog",props:{fullscreen:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,...me({origin:"center center",scrollStrategy:"block",transition:{component:ye},zIndex:2400})},emits:{"update:modelValue":n=>!0},setup(n,v){let{slots:r}=v;const g=G(n,"modelValue"),{scopeId:$}=ve(),c=x();function u(d){var h,y;const l=d.relatedTarget,i=d.target;if(l!==i&&((h=c.value)!=null&&h.contentEl)&&((y=c.value)!=null&&y.globalTop)&&![document,c.value.contentEl].includes(i)&&!c.value.contentEl.contains(i)){const V=q(c.value.contentEl);if(!V.length)return;const e=V[0],m=V[V.length-1];l===e?m.focus():e.focus()}}H&&E(()=>g.value&&n.retainFocus,d=>{d?document.addEventListener("focusin",u):document.removeEventListener("focusin",u)},{immediate:!0}),E(g,async d=>{var l,i;await J(),d?(l=c.value.contentEl)==null||l.focus({preventScroll:!0}):(i=c.value.activatorEl)==null||i.focus({preventScroll:!0})});const P=W(()=>z({"aria-haspopup":"dialog","aria-expanded":String(g.value)},n.activatorProps));return X(()=>{const[d]=N.filterProps(n);return t(N,z({ref:c,class:["v-dialog",{"v-dialog--fullscreen":n.fullscreen,"v-dialog--scrollable":n.scrollable},n.class],style:n.style},d,{modelValue:g.value,"onUpdate:modelValue":l=>g.value=l,"aria-modal":"true",activatorProps:P.value,role:"dialog"},$),{activator:r.activator,default:function(){for(var l=arguments.length,i=new Array(l),h=0;h<l;h++)i[h]=arguments[h];return t(Y,{root:!0},{default:()=>{var y;return[(y=r.default)==null?void 0:y.call(r,...i)]}})}})}),ge({},c)}}),O=n=>(ie("data-v-fe6a7539"),n=n(),ce(),n),be={class:"d-flex align-center text-high-emphasis me-1"},Ve={class:"d-flex align-center"},ke={class:"h-100"},Se={class:"text-xs text-disabled text-uppercase"},xe={class:"h-100"},Ce={class:"app-bar-search-suggestions d-flex flex-column align-center justify-center text-high-emphasis h-100"},De={class:"d-flex align-center flex-wrap justify-center gap-2 text-h6 my-3"},we=O(()=>f("span",null,"No Result For ",-1)),Ie={key:0,class:"mt-8"},Be=O(()=>f("span",{class:"d-flex justify-center text-disabled"},"Try searching for",-1)),Ee=["onClick"],$e={class:"text-sm"},Pe=Z({__name:"AppBarSearch",props:{isDialogVisible:{type:Boolean},searchQuery:null,searchResults:null,suggestions:null,noDataSuggestion:null},emits:["update:isDialogVisible","update:searchQuery","itemSelected"],setup(n,{emit:v}){const r=n,{ctrl_k:g,meta_k:$}=ee({passive:!1,onEventFired(e){e.ctrlKey&&e.key==="k"&&e.type==="keydown"&&e.preventDefault()}}),c=x(),u=x(structuredClone(S(r.searchQuery))),P=x(),d=x(structuredClone(S(r.isDialogVisible))),l=x(structuredClone(S(r.searchResults)));E(r,()=>{d.value=structuredClone(S(r.isDialogVisible)),l.value=structuredClone(S(r.searchResults)),u.value=structuredClone(S(r.searchQuery))}),E([g,$],()=>{d.value=!0,v("update:isDialogVisible",!0)});const i=()=>{v("update:isDialogVisible",!1),v("update:searchQuery","")};te(()=>{u.value.length||(l.value=[])});const h=e=>{var m,I;e.key==="ArrowDown"?(e.preventDefault(),(m=c.value)==null||m.focus("next")):e.key==="ArrowUp"&&(e.preventDefault(),(I=c.value)==null||I.focus("prev"))},y=e=>{v("update:isDialogVisible",e),v("update:searchQuery","")},V=e=>e==="dashboards"?"Dashboards":e==="appsPages"?"Apps & Pages":e==="userInterface"?"User Interface":e==="formsTables"?"Forms Tables":e==="chartsMisc"?"Charts Misc":"Misc";return(e,m)=>{const I=se("IconBtn");return p(),C(_e,{"max-width":"600","model-value":o(d),height:e.$vuetify.display.smAndUp?"550":"100%",fullscreen:e.$vuetify.display.width<600,class:"app-bar-search-dialog","onUpdate:modelValue":y,onKeyup:F(i,["esc"])},{default:a(()=>[t(ae,{height:"100%",width:"100%",class:"position-relative"},{default:a(()=>[t(R,{class:"pt-1",style:{"min-block-size":"65px"}},{default:a(()=>[t(de,{ref_key:"refSearchInput",ref:P,modelValue:o(u),"onUpdate:modelValue":[m[0]||(m[0]=s=>le(u)?u.value=s:null),m[1]||(m[1]=s=>e.$emit("update:searchQuery",o(u)))],autofocus:"",density:"comfortable",variant:"plain",class:"app-bar-autocomplete-box",onKeyup:F(i,["esc"]),onKeydown:h},{"prepend-inner":a(()=>[f("div",be,[t(_,{size:"22",icon:"tabler-search",class:"mt-1",style:{opacity:"1"}})])]),"append-inner":a(()=>[f("div",Ve,[f("div",{class:"text-base text-disabled cursor-pointer me-1",onClick:i}," [esc] "),t(I,{size:"small",onClick:i},{default:a(()=>[t(_,{icon:"tabler-x"})]),_:1})])]),_:1},8,["modelValue","onKeyup"])]),_:1}),t(pe),t(o(oe),{options:{wheelPropagation:!1,suppressScrollX:!0},class:"h-100"},{default:a(()=>[A(t(o(U),{ref_key:"refSearchList",ref:c,density:"compact",class:"app-bar-search-list"},{default:a(()=>[(p(!0),b(D,null,B(o(l),s=>(p(),b(D,{key:s.title},["header"in s?(p(),C(o(fe),{key:0,class:"text-disabled"},{default:a(()=>[K(w(V(s.title)),1)]),_:2},1024)):L(e.$slots,"searchResult",{key:1,item:s},()=>[t(o(M),{link:"",onClick:k=>e.$emit("itemSelected",s)},{prepend:a(()=>[t(_,{size:"20",icon:s.icon,class:"me-3"},null,8,["icon"])]),append:a(()=>[t(_,{size:"20",icon:"tabler-corner-down-left",class:"enter-icon text-disabled"})]),default:a(()=>[t(he,null,{default:a(()=>[K(w(s.title),1)]),_:2},1024)]),_:2},1032,["onClick"])],!0)],64))),128))]),_:3},512),[[T,o(u).length&&!!o(l).length]]),A(f("div",ke,[L(e.$slots,"suggestions",{},()=>[t(R,{class:"app-bar-search-suggestions h-100 pa-10"},{default:a(()=>[r.suggestions?(p(),C(re,{key:0,class:"gap-y-4"},{default:a(()=>[(p(!0),b(D,null,B(r.suggestions,s=>(p(),C(ne,{key:s.title,cols:"12",sm:"6",class:"ps-6"},{default:a(()=>[f("p",Se,w(s.title),1),t(o(U),{class:"card-list"},{default:a(()=>[(p(!0),b(D,null,B(s.content,k=>(p(),C(o(M),{key:k.title,link:"",title:k.title,class:"app-bar-search-suggestion",onClick:Re=>e.$emit("itemSelected",k)},{prepend:a(()=>[t(_,{icon:k.icon,size:"20",class:"me-2"},null,8,["icon"])]),_:2},1032,["title","onClick"]))),128))]),_:2},1024)]),_:2},1024))),128))]),_:1})):Q("",!0)]),_:1})],!0)],512),[[T,!!o(l)&&!o(u)]]),A(f("div",xe,[L(e.$slots,"noData",{},()=>[t(R,{class:"h-100"},{default:a(()=>[f("div",Ce,[t(_,{size:"75",icon:"tabler-file-x"}),f("div",De,[we,f("span",null,'"'+w(o(u))+'"',1)]),r.noDataSuggestion?(p(),b("div",Ie,[Be,(p(!0),b(D,null,B(r.noDataSuggestion,s=>(p(),b("h6",{key:s.title,class:"app-bar-search-suggestion text-sm font-weight-regular cursor-pointer mt-3",onClick:k=>e.$emit("itemSelected",s)},[t(_,{size:"20",icon:s.icon,class:"me-3"},null,8,["icon"]),f("span",$e,w(s.title),1)],8,Ee))),128))])):Q("",!0)])]),_:1})],!0)],512),[[T,!o(l).length&&o(u).length]])]),_:3})]),_:3})]),_:3},8,["model-value","height","fullscreen","onKeyup"])}}});const Ue=ue(Pe,[["__scopeId","data-v-fe6a7539"]]);export{Ue as default};