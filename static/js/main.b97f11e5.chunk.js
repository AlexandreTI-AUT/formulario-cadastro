(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,a,t){},15:function(e,a,t){},16:function(e,a,t){"use strict";t.r(a);var n=t(0),c=t.n(n),l=t(4),r=t.n(l),o=(t(14),t(1)),s=(t(15),t(2));const i={nome:"",email:"",telefone:"",nascimento:"",genero:"",senha:"",comentario:"",termos:!1},m={email:/.+@.+\..+/,telefone:/^\(\d{2}\)\s\d{4,5}-\d{4}$/,nascimento:/^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/},u={telefone:e=>{const a=e.replace(/\D/g,"").slice(0,11);return a.length<=2?a:a.length<=7?"(".concat(a.slice(0,2),") ").concat(a.slice(2)):"(".concat(a.slice(0,2),") ").concat(a.slice(2,7),"-").concat(a.slice(7))},nascimento:e=>{const a=e.replace(/\D/g,"").slice(0,8);return a.length<=2?a:a.length<=4?"".concat(a.slice(0,2),"/").concat(a.slice(2)):"".concat(a.slice(0,2),"/").concat(a.slice(2,4),"/").concat(a.slice(4))}},d={nome:e=>e?"":"Nome \xe9 obrigat\xf3rio",email:e=>m.email.test(e)?"":"Email inv\xe1lido",senha:e=>e?e.length<6?"Senha deve ter exatamente 6 caracteres":e.length>6?"Senha n\xe3o pode ter mais de 6 caracteres":"":"Senha \xe9 obrigat\xf3ria",telefone:e=>e?m.telefone.test(e)?"":"Telefone inv\xe1lido":"Telefone \xe9 obrigat\xf3rio",nascimento:e=>{if(!e)return"Data de nascimento \xe9 obrigat\xf3ria";if(!m.nascimento.test(e))return"Data de nascimento inv\xe1lida";const[a,t,n]=e.split("/").map(Number),c=new Date(n,t-1,a);if(c.getFullYear()!==n||c.getMonth()!==t-1||c.getDate()!==a)return"Data de nascimento inv\xe1lida";if(c>new Date)return"Data de nascimento n\xe3o pode ser futura";const l=new Date,r=l.getFullYear()-c.getFullYear(),o=l.getMonth(),s=l.getDate(),i=c.getMonth(),u=c.getDate();return r<13||13===r&&(o<i||o===i&&s<u)?"Idade m\xednima permitida \xe9 13 anos":""},genero:e=>e?"":"Selecione um g\xeanero",comentario:e=>e.length>250?"Coment\xe1rio excedeu o limite de 250 caracteres":"",termos:e=>e?"":"Voc\xea deve aceitar os Termos de Uso e a Pol\xedtica de Privacidade"};var p=()=>{const[e,a]=Object(n.useState)(i),[t,l]=Object(n.useState)({}),[r,m]=Object(n.useState)(!1),[p,E]=Object(n.useState)(""),[h,g]=Object(n.useState)(0),[b,v]=Object(n.useState)({}),[f,N]=Object(n.useState)(!1),[O,j]=Object(n.useState)(!1),C=e=>{const{name:t,value:n,type:c,checked:r}=e.target;if("senha"===t&&n.length>6)return;const s="checkbox"===c?r:n,i=u[t],m=i?i(s):s;a(e=>Object(o.a)(Object(o.a)({},e),{},{[t]:m})),v(e=>Object(o.a)(Object(o.a)({},e),{},{[t]:!0})),"termos"===t&&j(r);const d=y(t,m);l(e=>Object(o.a)(Object(o.a)({},e),{},{[t]:d})),"senha"===t&&g((e=>{let a=0;return e.length>=6&&a++,e.match(/[A-Z]/)&&a++,e.match(/[a-z]/)&&a++,e.match(/[0-9]/)&&a++,e.match(/[^A-Za-z0-9]/)&&a++,a})(n)),E("")},y=(e,a)=>{const t=d[e];return t?t(a):""},D=e=>{const{name:a,value:t}=e.target;v(e=>Object(o.a)(Object(o.a)({},e),{},{[a]:!0}));const n=y(a,t);l(e=>Object(o.a)(Object(o.a)({},e),{},{[a]:n}))},k=()=>{a(i),l({}),E(""),m(!1),v({}),g(0),j(!1)};return c.a.createElement("div",{className:"container"},c.a.createElement("form",{onSubmit:a=>{a.preventDefault(),m(!0);const t={};Object.keys(e).forEach(e=>{t[e]=!0}),v(t),(()=>{const a={};return Object.keys(e).forEach(t=>{if("comentario"!==t){const n=d[t];n&&(a[t]=n(e[t]))}}),l(a),Object.values(a).every(e=>!e)})()?(E("\u2705 Cadastro realizado com sucesso!"),setTimeout(()=>{k()},15e3)):E("\u26a0\ufe0f Por favor, preencha todos os campos obrigat\xf3rios.")},className:"formulario"},c.a.createElement("h1",null,"Criar Conta"),c.a.createElement("div",null,c.a.createElement("label",null,"Nome: ",c.a.createElement("span",{className:"required"},"*")),c.a.createElement("div",{className:"input-container"},c.a.createElement(s.h,{className:"input-icon"}),c.a.createElement("input",{type:"text",name:"nome",value:e.nome,onChange:C,onBlur:D,placeholder:"","data-testid":"input-nome",className:b.nome||r?t.nome?"input-error":"input-success":""})),(b.nome||r)&&t.nome&&c.a.createElement("span",null,t.nome)),c.a.createElement("div",null,c.a.createElement("label",null,"Email: ",c.a.createElement("span",{className:"required"},"*")),c.a.createElement("div",{className:"input-container"},c.a.createElement(s.c,{className:"input-icon"}),c.a.createElement("input",{type:"email",name:"email",value:e.email,onChange:C,onBlur:D,placeholder:"","data-testid":"input-email",className:b.email||r?t.email?"input-error":"input-success":""})),(b.email||r)&&t.email&&c.a.createElement("span",null,t.email)),c.a.createElement("div",null,c.a.createElement("label",null,"Telefone (Brasil): ",c.a.createElement("span",{className:"required"},"*")),c.a.createElement("div",{className:"input-container"},c.a.createElement(s.g,{className:"input-icon"}),c.a.createElement("input",{type:"text",name:"telefone",value:e.telefone,onChange:C,onBlur:D,placeholder:"","data-testid":"input-telefone",className:b.telefone||r?t.telefone?"input-error":"input-success":""}),!e.telefone&&c.a.createElement("div",{className:"input-mask"},"(XX) XXXXX-XXXX")),(b.telefone||r)&&t.telefone&&c.a.createElement("span",null,t.telefone)),c.a.createElement("div",null,c.a.createElement("label",null,"Data de Nascimento: ",c.a.createElement("span",{className:"required"},"*")),c.a.createElement("div",{className:"input-container"},c.a.createElement(s.a,{className:"input-icon"}),c.a.createElement("input",{type:"text",name:"nascimento",value:e.nascimento,onChange:C,onBlur:D,placeholder:"","data-testid":"input-nascimento",className:b.nascimento||r?t.nascimento?"input-error":"input-success":""}),!e.nascimento&&c.a.createElement("div",{className:"input-mask"},"DD/MM/AAAA")),(b.nascimento||r)&&t.nascimento&&c.a.createElement("span",null,t.nascimento)),c.a.createElement("div",null,c.a.createElement("label",null,"G\xeanero: ",c.a.createElement("span",{className:"required"},"*")),c.a.createElement("div",{className:"genero-opcoes"},["Masculino","Feminino","Outro"].map(a=>c.a.createElement("label",{key:a},c.a.createElement("input",{type:"radio",name:"genero",value:a,checked:e.genero===a,onChange:C,onBlur:D}),a))),(b.genero||r)&&t.genero&&c.a.createElement("span",null,t.genero)),c.a.createElement("div",null,c.a.createElement("label",null,"Coment\xe1rio (at\xe9 250 caracteres):"),c.a.createElement("div",{className:"input-container"},c.a.createElement(s.b,{className:"input-icon"}),c.a.createElement("textarea",{name:"comentario",value:e.comentario,onChange:C,onBlur:D,maxLength:250,placeholder:"","data-testid":"input-comentario",className:b.comentario&&t.comentario?"input-error":""})),c.a.createElement("div",{className:"caracteres-contador"},e.comentario.length,"/250 caracteres"),(b.comentario||r)&&t.comentario&&c.a.createElement("span",null,t.comentario)),c.a.createElement("div",null,c.a.createElement("label",null,"Senha: ",c.a.createElement("span",{className:"required"},"*")),c.a.createElement("div",{className:"input-container"},c.a.createElement(s.f,{className:"input-icon"}),c.a.createElement("input",{type:f?"text":"password",name:"senha",maxlength:"6",value:e.senha,onChange:C,onBlur:D,placeholder:"","data-testid":"input-senha",className:b.senha||r?t.senha?"input-error":"input-success":""}),c.a.createElement("button",{type:"button",onClick:()=>{N(!f)},className:"toggle-password"},f?c.a.createElement(s.e,null):c.a.createElement(s.d,null))),e.senha&&c.a.createElement("div",{className:"senha-forca"},c.a.createElement("div",{className:"forca-barra"},[...Array(5)].map((e,a)=>c.a.createElement("div",{key:a,className:"forca-nivel ".concat(a<h?"ativo":"")}))),c.a.createElement("span",{className:"forca-texto"},["Muito fraca","Fraca","M\xe9dia","Forte","Muito forte"][h-1]||"")),(b.senha||r)&&t.senha&&c.a.createElement("span",null,t.senha)),c.a.createElement("div",null,c.a.createElement("label",{className:"checkbox-label"},c.a.createElement("input",{type:"checkbox",name:"termos",checked:O,onChange:C,onBlur:D}),"Li e aceito os ",c.a.createElement("a",{href:"/termos-de-uso"},"Termos de Uso")," e a"," ",c.a.createElement("a",{href:"/politica-de-privacidade"},"Pol\xedtica de Privacidade")),(b.termos||r)&&t.termos&&c.a.createElement("span",null,t.termos)),c.a.createElement("div",{className:"button-group"},c.a.createElement("button",{type:"button",onClick:k,"data-testid":"btn-reset",className:"btn-reset"},"Limpar"),c.a.createElement("button",{type:"submit","data-testid":"btn-submit"},"Cadastrar")),p&&c.a.createElement("div",{className:p.includes("sucesso")?"success-message":"error-message"},p)))};var E=function(){return c.a.createElement("div",{className:"App"},c.a.createElement(p,null))};var h=e=>{e&&e instanceof Function&&t.e(3).then(t.bind(null,17)).then(a=>{let{getCLS:t,getFID:n,getFCP:c,getLCP:l,getTTFB:r}=a;t(e),n(e),c(e),l(e),r(e)})};r.a.createRoot(document.getElementById("root")).render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(E,null))),h()},5:function(e,a,t){e.exports=t(16)}},[[5,1,2]]]);
//# sourceMappingURL=main.b97f11e5.chunk.js.map