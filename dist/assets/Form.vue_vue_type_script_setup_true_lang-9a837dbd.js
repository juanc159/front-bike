import{_ as X}from"./AppDateTimePicker.vue_vue_type_style_index_0_lang-395fb60e.js";import{d as Z,k as g,z as h,y as ee,I as b,ar as le,o as w,c as ae,b as O,w as o,p as t,m as te,V as U,E as B,B as q,x as M,q as l,H as _,bs as oe}from"./index-ecce922e.js";import{u as se}from"./useCrudIncomeVehicleStore-af97f5d6.js";import{n as k,r as m,v as E}from"./validators-da167dd6.js";import{a as u,V as C}from"./VRow-1ecd9fa6.js";import{V as D}from"./VSelect-d4be5138.js";import{V as p}from"./VTextField-a151c4b5.js";import{V as re}from"./VDataTable-6b5c6364.js";import{V as z}from"./VForm-a9ea2bae.js";const ue={class:"col-md-6 d-flex justify-content-end"},ye=Z({__name:"Form",props:{userId:{type:Number,default:null,required:!1},btnBack:{type:Boolean,default:!0,required:!1},btnSave:{type:Boolean,default:!0,required:!1}},setup(P){const c=P,R=oe(),j=[{title:"Nombre",key:"name"},{title:"Valor",key:"amount"},{title:"Acción",key:"action"}],$=g(),L=h(),V=se(),{formulario:s,operatives:G,typeArrangement:x,thirds:f}=ee(V),n=g([]),H=g([]),F=async r=>{var e;V.typeAction=r,H.value=[],n.value=[],await((e=$.value)==null?void 0:e.resetValidation()),r!="back"&&V.keyList++},S=b(()=>{const r=String(v.value).replaceAll(".",""),e=String(s.value.value_parts).replaceAll(".","");return k(Number(r??0)+Number(e??0))}),A=b(()=>{const r=String(v.value).replaceAll(".","");return k(Number(r??0)*60/100)}),y=b(()=>{const r=String(v.value).replaceAll(".","");return k(Number(r??0)*40/100)}),N=b(()=>y.value),v=b(()=>{let r=0;return f.value.forEach(e=>{const i=String(e.amount).replaceAll(".","");r+=Number(i??0)}),k(r)}),Y=async()=>{var e;s.value.company_id=L.company.id,s.value.total_costs=Number(String(S.value).replaceAll(".","")),s.value.paid_labor=Number(String(A.value).replaceAll(".","")),s.value.value_labor=Number(String(v.value).replaceAll(".","")),s.value.value_labor40=Number(String(y.value).replaceAll(".","")),s.value.utilites=Number(String(N.value).replaceAll(".","")),s.value.value_parts=Number(String(s.value.value_parts).replaceAll(".","")),s.value.arrayNoDelete=K.value;const r=await((e=$.value)==null?void 0:e.validate());if(r!=null&&r.valid){const i=await V.fetchSave();i.status===200&&F("list"),i.status===422&&(n.value=i.error)}},I=g(),K=b(()=>f.value.filter(r=>r.delete!="delete")),d=g({type:null,amount:null}),J=()=>{d.value={type:null,amount:null}},Q=async()=>{var e;const r=await((e=I.value)==null?void 0:e.validate());if(r!=null&&r.valid)if(f.value.find(a=>a.type_id==d.value.type))R.toast("Este Tipo De Arreglo Ya Esta Seleccionado","","danger");else{const a=x.value.find(T=>T.id==d.value.type);f.value.push({type_id:d.value.type,name:a.name,amount:d.value.amount.replaceAll(".","")})}J()},W=async r=>{f.value[r].id?f.value[r].delete="delete":f.value.splice(r,1)};return le(async()=>{await V.fetchDataForm(),c.userId&&await V.fetchInfo(c.userId)}),(r,e)=>{const i=X;return w(),ae("div",null,[c.btnBack?(w(),O(C,{key:0},{default:o(()=>[t(u,{cols:"12"},{default:o(()=>[te("div",ue,[t(U,{color:"secondary",onClick:e[0]||(e[0]=a=>F("back"))},{default:o(()=>[B(" Atras ")]),_:1})])]),_:1})]),_:1})):q("",!0),B(" "+M(c.btnBack)+" "+M(c.btnSave)+" ",1),t(l(z),{ref_key:"formValidation",ref:$,"lazy-validation":""},{default:o(()=>[t(C,null,{default:o(()=>[t(u,{cols:"12",md:"4",class:"mt-1"},{default:o(()=>[t(i,{modelValue:l(s).date_init,"onUpdate:modelValue":e[1]||(e[1]=a=>l(s).date_init=a),label:"Fecha Ingreso"},null,8,["modelValue"])]),_:1}),t(u,{cols:"12",md:"4",class:"mt-2"},{default:o(()=>[t(D,{items:l(G),modelValue:l(s).mecanic_id,"onUpdate:modelValue":e[2]||(e[2]=a=>l(s).mecanic_id=a),label:"Operario","item-value":"id","item-title":"name",rules:[l(m)],class:"mt-5"},null,8,["items","modelValue","rules"])]),_:1}),t(u,{cols:"12",md:"4",class:"mt-2"},{default:o(()=>[t(D,{items:["Moto","Carro"],modelValue:l(s).type_vehicle,"onUpdate:modelValue":e[3]||(e[3]=a=>l(s).type_vehicle=a),label:"Tipo de Vehículo",rules:[l(m)],class:"mt-5"},null,8,["modelValue","rules"])]),_:1}),t(u,{cols:"12",md:"4",class:"mt-5"},{default:o(()=>[t(p,{modelValue:l(s).brand,"onUpdate:modelValue":e[4]||(e[4]=a=>l(s).brand=a),rules:[l(m)],autocomplete:"off","error-messages":l(n).brand,label:"Marca",onKeypress:e[5]||(e[5]=a=>l(n).brand=""),class:"mt-3"},null,8,["modelValue","rules","error-messages"])]),_:1}),t(u,{cols:"12",md:"4",class:"mt-2"},{default:o(()=>[t(D,{items:["Si","No"],modelValue:l(s).pay_labor,"onUpdate:modelValue":e[6]||(e[6]=a=>l(s).pay_labor=a),label:"Pago Mano De Obra",rules:[l(m)],class:"mt-5"},null,8,["modelValue","rules"])]),_:1}),t(u,{cols:"12",md:"4",class:"mt-5"},{default:o(()=>[t(p,{modelValue:l(s).plate,"onUpdate:modelValue":e[7]||(e[7]=a=>l(s).plate=a),rules:[l(m)],autocomplete:"off","error-messages":l(n).plate,label:"Placa",onKeypress:e[8]||(e[8]=a=>l(n).plate="")},null,8,["modelValue","rules","error-messages"])]),_:1}),t(u,{cols:"12",md:"4",class:"mt-5"},{default:o(()=>[t(p,{modelValue:l(s).value_parts,"onUpdate:modelValue":e[9]||(e[9]=a=>l(s).value_parts=a),rules:[l(m)],autocomplete:"off","error-messages":l(n).value_parts,onBlur:e[10]||(e[10]=a=>l(s).value_parts=l(E)(l(s).value_parts)),label:"Valor Repuestos",onKeypress:e[11]||(e[11]=a=>l(n).value_parts="")},null,8,["modelValue","rules","error-messages"])]),_:1}),t(u,{cols:"12",md:"4",class:"mt-1"},{default:o(()=>[t(i,{modelValue:l(s).date_pay_labor,"onUpdate:modelValue":e[12]||(e[12]=a=>l(s).date_pay_labor=a),label:"Fecha Pago Mano De Obra"},null,8,["modelValue"])]),_:1}),t(u,{cols:"12",md:"4",class:"mt-5"},{default:o(()=>[t(p,{modelValue:l(A),"onUpdate:modelValue":e[13]||(e[13]=a=>_(A)?A.value=a:null),rules:[l(m)],autocomplete:"off","error-messages":l(n).paid_labor60,disabled:"",label:"Valor Mano De Obra 60%",onKeypress:e[14]||(e[14]=a=>l(n).paid_labor=""),class:"mt-3"},null,8,["modelValue","rules","error-messages"])]),_:1}),t(u,{cols:"12",md:"4",class:"mt-5"},{default:o(()=>[t(p,{modelValue:l(y),"onUpdate:modelValue":e[15]||(e[15]=a=>_(y)?y.value=a:null),rules:[l(m)],autocomplete:"off",label:"Valor Mano De Obra 40%",disabled:"",class:"mt-3"},null,8,["modelValue","rules"])]),_:1}),t(u,{cols:"12",md:"4",class:"mt-3"},{default:o(()=>[t(p,{modelValue:l(S),"onUpdate:modelValue":e[16]||(e[16]=a=>_(S)?S.value=a:null),rules:[l(m)],autocomplete:"off","error-messages":l(n).total_costs,label:"Total Costos",onKeypress:e[17]||(e[17]=a=>l(n).total_costs=""),class:"mt-2",disabled:""},null,8,["modelValue","rules","error-messages"])]),_:1}),t(u,{cols:"12",md:"4",class:"mt-5"},{default:o(()=>[t(p,{modelValue:l(N),"onUpdate:modelValue":e[18]||(e[18]=a=>_(N)?N.value=a:null),rules:[l(m)],autocomplete:"off","error-messages":l(n).utilites,label:"Utilidades",onKeypress:e[19]||(e[19]=a=>l(n).utilites=""),class:"mt-3",disabled:""},null,8,["modelValue","rules","error-messages"])]),_:1}),t(u,{cols:"12",md:"4",class:"mt-5"},{default:o(()=>[t(p,{modelValue:l(v),"onUpdate:modelValue":e[20]||(e[20]=a=>_(v)?v.value=a:null),rules:[l(m)],autocomplete:"off","error-messages":l(n).value_labor,disabled:"",label:"Valor Mano De Obra",onKeypress:e[21]||(e[21]=a=>l(n).value_labor="")},null,8,["modelValue","rules","error-messages"])]),_:1})]),_:1})]),_:1},512),t(l(z),{ref_key:"formValidate",ref:I,"lazy-validation":""},{default:o(()=>[t(C,null,{default:o(()=>[t(u,{cols:"12",md:"5",class:""},{default:o(()=>[t(D,{items:l(x),label:"Tipo De Arreglo",modelValue:l(d).type,"onUpdate:modelValue":e[22]||(e[22]=a=>l(d).type=a),"item-value":"id","item-title":"name",rules:[l(m)],class:"mt-5"},null,8,["items","modelValue","rules"])]),_:1}),t(u,{cols:"12",md:"5",class:"mt-3"},{default:o(()=>[t(p,{modelValue:l(d).amount,"onUpdate:modelValue":e[23]||(e[23]=a=>l(d).amount=a),class:"mt-2",label:"Valor",onBlur:e[24]||(e[24]=a=>l(d).amount=l(E)(l(d).amount)),rules:[l(m)]},null,8,["modelValue","rules"])]),_:1}),t(u,{cols:"12",md:"2",class:"mt-0"},{default:o(()=>[t(U,{color:"primary",icon:"tabler-plus",class:"ml-2 mt-3",onClick:e[25]||(e[25]=a=>Q())})]),_:1})]),_:1})]),_:1},512),t(u,{cols:"12",md:"12",class:"mt-2 d-flex mb-5"},{default:o(()=>[t(l(re),{headers:j,items:l(K),height:"300","fixed-header":""},{"item.amount":o(({item:a})=>[B(M(l(k)(a.raw.amount)),1)]),bottom:o(()=>[]),"item.action":o(({item:a,index:T})=>[t(U,{color:"error",icon:"tabler-trash",onClick:ne=>W(T),size:"30"},null,8,["onClick"])]),_:1},8,["items"])]),_:1}),c.btnSave?(w(),O(C,{key:1},{default:o(()=>[t(u,{cols:"12 d-flex justify-content-center"},{default:o(()=>[t(U,{color:"primary",onClick:Y},{default:o(()=>[B(" Guardar ")]),_:1})]),_:1})]),_:1})):q("",!0)])}}});export{ye as _};
