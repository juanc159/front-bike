import{E as s,z as o,j as i,o as n,c as r}from"./index-e5b1715d.js";const u={setup(){const e=o(),t=i();return{authentication:e,router:t}},data(){return{sessionTimeout:null}},mounted(){document.addEventListener("mousemove",this.resetSessionTimeout),document.addEventListener("keypress",this.resetSessionTimeout),document.addEventListener("click",this.resetSessionTimeout),this.resetSessionTimeout()},beforeUnmount(){document.removeEventListener("mousemove",this.resetSessionTimeout),document.removeEventListener("keypress",this.resetSessionTimeout),document.removeEventListener("click",this.resetSessionTimeout)},methods:{resetSessionTimeout(){clearTimeout(this.sessionTimeout),this.sessionTimeout=setTimeout(()=>{},10*60*1e3)},logout(){this.authentication.logout(),this.router.push({name:"Login"})}}};function m(e,t,c,a,d,h){return n(),r("div")}const p=s(u,[["render",m]]);export{p as default};
