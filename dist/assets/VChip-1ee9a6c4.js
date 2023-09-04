import{n as L,at as Y,X as z,b6 as J,az as E,am as R,b7 as T,an as w,b8 as Q,b9 as Z,ap as r,Y as ee,d as l,ba as ae,as as h,bb as x,bc as le,ay as te,bd as ne,be as se,aU as ie,bf as ce,bg as de,av as oe,bh as ue,bi as re,aA as ve,bj as fe,aW as be,bk as ke,ah as me,bl as pe,bm as ye,y as C,G as V,aG as G,bn as he,bo as Ce,V as v,ak as f,H as Ve,K as D,i as _,p as Ie}from"./index-5157f066.js";const $=Symbol.for("vuetify:v-chip-group");L()({name:"VChipGroup",props:{column:Boolean,filter:Boolean,valueComparator:{type:Function,default:Y},...z(),...J({selectedClass:"v-chip--selected"}),...E(),...R(),...T({variant:"tonal"})},emits:{"update:modelValue":e=>!0},setup(e,b){let{slots:c}=b;const{themeClasses:o}=w(e),{isSelected:t,select:k,next:m,prev:p,selected:y}=Q(e,$);return Z({VChip:{color:r(e,"color"),disabled:r(e,"disabled"),filter:r(e,"filter"),variant:r(e,"variant")}}),ee(()=>l(e.tag,{class:["v-chip-group",{"v-chip-group--column":e.column},o.value,e.class],style:e.style},{default:()=>{var u;return[(u=c.default)==null?void 0:u.call(c,{isSelected:t,select:k,next:m,prev:p,selected:y.value})]}})),{}}});const Pe=L()({name:"VChip",directives:{Ripple:ae},props:{activeClass:String,appendAvatar:String,appendIcon:h,closable:Boolean,closeIcon:{type:h,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:{type:Boolean,default:void 0},pill:Boolean,prependAvatar:String,prependIcon:h,ripple:{type:Boolean,default:!0},text:String,modelValue:{type:Boolean,default:!0},onClick:x(),onClickOnce:x(),...le(),...z(),...te(),...ne(),...se(),...ie(),...ce(),...de(),...E({tag:"span"}),...R(),...T({variant:"tonal"})},emits:{"click:close":e=>!0,"update:modelValue":e=>!0,"group:selected":e=>!0,click:e=>!0},setup(e,b){let{attrs:c,emit:o,slots:t}=b;const{t:k}=oe(),{borderClasses:m}=ue(e),{colorClasses:p,colorStyles:y,variantClasses:u}=re(e),{densityClasses:F}=ve(e),{elevationClasses:K}=fe(e),{roundedClasses:M}=be(e),{sizeClasses:O}=ke(e),{themeClasses:X}=w(e),I=me(e,"modelValue"),a=pe(e,$,!1),s=ye(e,c),j=C(()=>e.link!==!1&&s.isLink.value),i=C(()=>!e.disabled&&e.link!==!1&&(!!a||e.link||s.isClickable.value)),q=C(()=>({"aria-label":k(e.closeLabel),onClick(n){I.value=!1,o("click:close",n)}}));function g(n){var d;o("click",n),i.value&&((d=s.navigate)==null||d.call(s,n),a==null||a.toggle())}function H(n){(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),g(n))}return()=>{const n=s.isLink.value?"a":e.tag,d=!!(e.appendIcon||e.appendAvatar),N=!!(d||t.append),U=!!(t.close||e.closable),P=!!(t.filter||e.filter)&&a,A=!!(e.prependIcon||e.prependAvatar),W=!!(A||t.prepend),S=!a||a.isSelected.value;return I.value&&V(l(n,{class:["v-chip",{"v-chip--disabled":e.disabled,"v-chip--label":e.label,"v-chip--link":i.value,"v-chip--filter":P,"v-chip--pill":e.pill},X.value,m.value,S?p.value:void 0,F.value,K.value,M.value,O.value,u.value,a==null?void 0:a.selectedClass.value,e.class],style:[S?y.value:void 0,e.style],disabled:e.disabled||void 0,draggable:e.draggable,href:s.href.value,tabindex:i.value?0:void 0,onClick:g,onKeydown:i.value&&!j.value&&H},{default:()=>{var B;return[he(i.value,"v-chip"),P&&l(Ce,{key:"filter"},{default:()=>[V(l("div",{class:"v-chip__filter"},[t.filter?V(l(f,{key:"filter-defaults",disabled:!e.filterIcon,defaults:{VIcon:{icon:e.filterIcon}}},null),[[G("slot"),t.filter,"default"]]):l(v,{key:"filter-icon",icon:e.filterIcon},null)]),[[Ve,a.isSelected.value]])]}),W&&l("div",{key:"prepend",class:"v-chip__prepend"},[t.prepend?l(f,{key:"prepend-defaults",disabled:!A,defaults:{VAvatar:{image:e.prependAvatar,start:!0},VIcon:{icon:e.prependIcon,start:!0}}},t.prepend):l(D,null,[e.prependIcon&&l(v,{key:"prepend-icon",icon:e.prependIcon,start:!0},null),e.prependAvatar&&l(_,{key:"prepend-avatar",image:e.prependAvatar,start:!0},null)])]),((B=t.default)==null?void 0:B.call(t,{isSelected:a==null?void 0:a.isSelected.value,selectedClass:a==null?void 0:a.selectedClass.value,select:a==null?void 0:a.select,toggle:a==null?void 0:a.toggle,value:a==null?void 0:a.value.value,disabled:e.disabled}))??e.text,N&&l("div",{key:"append",class:"v-chip__append"},[t.append?l(f,{key:"append-defaults",disabled:!d,defaults:{VAvatar:{end:!0,image:e.appendAvatar},VIcon:{end:!0,icon:e.appendIcon}}},t.append):l(D,null,[e.appendIcon&&l(v,{key:"append-icon",end:!0,icon:e.appendIcon},null),e.appendAvatar&&l(_,{key:"append-avatar",end:!0,image:e.appendAvatar},null)])]),U&&l("div",Ie({key:"close",class:"v-chip__close"},q.value),[t.close?l(f,{key:"close-defaults",defaults:{VIcon:{icon:e.closeIcon,size:"x-small"}}},t.close):l(v,{key:"close-icon",icon:e.closeIcon,size:"x-small"},null)])]}}),[[G("ripple"),i.value&&e.ripple,null]])}}});export{Pe as V};