(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{131:function(e,t,a){(t=a(53)(!1)).push([e.i,"._1pRTfe6aPQblmqaJ-AlkKT {\n  width: 60%;\n  height: 30px;\n  padding-left: 10px;\n  border: 1px solid black;\n  display: 'inline';\n}\n.iDezEjF15w3riTF_lrKIL {\n  width: 25%;\n  font-size: 15px;\n  margin-left: 15px;\n}\n.iDezEjF15w3riTF_lrKIL:hover {\n  color: #eb1700;\n}\n._1fEmZq7SxNDtIVOpjNGuK6 {\n  width: 90%;\n  padding: 20px;\n  justify-content: space-between;\n  align-items: center;\n}\n._1fEmZq7SxNDtIVOpjNGuK6 div img {\n  width: 64px;\n  height: 64px;\n  border-radius: 5px;\n}\n._1fEmZq7SxNDtIVOpjNGuK6 div span {\n  font-size: 20px;\n  font-weight: 600;\n  margin-left: 5px;\n}\n@media screen and (max-width: 576px) {\n  ._2IrJCkeOu4m8uWy3dOfKvV {\n    display: flex;\n    flex-direction: column;\n  }\n  ._2IrJCkeOu4m8uWy3dOfKvV ._1pRTfe6aPQblmqaJ-AlkKT {\n    width: 100%;\n  }\n  ._2IrJCkeOu4m8uWy3dOfKvV .iDezEjF15w3riTF_lrKIL {\n    width: 50%;\n    margin: 10px auto;\n  }\n}\n@media screen and (max-width: 767px) {\n  ._1fEmZq7SxNDtIVOpjNGuK6 {\n    width: 100%;\n  }\n}\n",""]),t.locals={input:"_1pRTfe6aPQblmqaJ-AlkKT",button:"iDezEjF15w3riTF_lrKIL",infoWrapper:"_1fEmZq7SxNDtIVOpjNGuK6",wrapper:"_2IrJCkeOu4m8uWy3dOfKvV"},e.exports=t},132:function(e,t,a){(t=a(53)(!1)).push([e.i,"._3MuRu25zRGguXZNBdhnq8W {\n  text-align: center;\n  font-size: 20px;\n  font-weight: bold;\n}\n._3WHNe2GHDUgwFgZSxlNcto {\n  text-align: center;\n}\n._3WHNe2GHDUgwFgZSxlNcto span {\n  display: block;\n  font-size: 18px;\n}\n._3WHNe2GHDUgwFgZSxlNcto i {\n  font-size: 90px;\n  padding: 32px;\n}\n",""]),t.locals={title:"_3MuRu25zRGguXZNBdhnq8W",small:"_3WHNe2GHDUgwFgZSxlNcto"},e.exports=t},134:function(e,t,a){var n=a(52),l=a(131);"string"==typeof(l=l.__esModule?l.default:l)&&(l=[[e.i,l,""]]);var i={insert:"head",singleton:!1},r=n(l,i);if(!l.locals||e.hot.invalidate){var o=l.locals;e.hot.accept(131,(function(){"string"==typeof(l=(l=a(131)).__esModule?l.default:l)&&(l=[[e.i,l,""]]),function(e,t,a){if(!e&&t||e&&!t)return!1;var n;for(n in e)if((!a||"default"!==n)&&e[n]!==t[n])return!1;for(n in t)if(!(a&&"default"===n||e[n]))return!1;return!0}(o,l.locals)?(o=l.locals,r(l)):e.hot.invalidate()}))}e.hot.dispose((function(){r()})),e.exports=l.locals||{}},135:function(e,t,a){var n=a(52),l=a(132);"string"==typeof(l=l.__esModule?l.default:l)&&(l=[[e.i,l,""]]);var i={insert:"head",singleton:!1},r=n(l,i);if(!l.locals||e.hot.invalidate){var o=l.locals;e.hot.accept(132,(function(){"string"==typeof(l=(l=a(132)).__esModule?l.default:l)&&(l=[[e.i,l,""]]),function(e,t,a){if(!e&&t||e&&!t)return!1;var n;for(n in e)if((!a||"default"!==n)&&e[n]!==t[n])return!1;for(n in t)if(!(a&&"default"===n||e[n]))return!1;return!0}(o,l.locals)?(o=l.locals,r(l)):e.hot.invalidate()}))}e.hot.dispose((function(){r()})),e.exports=l.locals||{}},138:function(e,t,a){"use strict";a.r(t);var n=a(17),l=a.n(n),i=a(0),r=a.n(i),o=a(128),s=a(130),c=a(54),m=a.n(c),p=a(134),f=a.n(p);var u=function(e){var t=Object(i.useState)(""),a=l()(t,2),n=a[0],o=a[1],s=Object(i.useState)(!1),c=l()(s,2),p=c[0],u=c[1],g=Object(i.useState)(!1),d=l()(g,2),A=d[0],E=d[1],w=Object(i.useState)(""),N=l()(w,2),K=N[0],y=N[1],M=Object(i.useState)(""),x=l()(M,2),h=x[0],B=x[1],S=Object(i.useState)(!1),b=l()(S,2),D=b[0],I=b[1],j=function(){e.otherName&&e.otherName===n?y("playOneName is same of platTwoName!!"):(u(!0),m.a.get("https://api.github.com/users/".concat(n)).then((function(t){t.data.message?console.log("fail"):(B(t.data.avatar_url),I(!0),y(""),e.getSuccessData&&e.getSuccessData(n)),u(!1)})).catch((function(e){u(!1),E(!0),y("Not Found")})))};return r.a.createElement("div",null,r.a.createElement("div",{style:{display:D?"none":"flex"}},r.a.createElement("div",{style:{width:"100%"},className:f.a.wrapper},r.a.createElement("input",{className:f.a.input,value:n,onChange:function(e){o(e.target.value),E(!1)},onKeyDown:function(e){return function(e){13===e.nativeEvent.keyCode&&e.target.value.length>0&&!p&&!A&&j()}(e)}}),r.a.createElement("button",{className:f.a.button,disabled:!(n.length>0&&!p&&!A),onClick:j},"Submit ",r.a.createElement("i",{className:"fa fa-spinner fa-spin fa-1x",style:{display:p?"inline":"none"}})))),r.a.createElement("div",{style:{backgroundColor:"rgb(200,200,200)",display:D?"flex":"none"},className:f.a.infoWrapper},r.a.createElement("div",{style:{display:"flex",alignItems:"center"},id:"img-left"},r.a.createElement("img",{src:h,alt:"logoImg",id:"img1"}),r.a.createElement("span",null,n)),r.a.createElement("div",{onClick:function(){I(!1),o(""),e.getSuccessData&&e.getSuccessData("")}},r.a.createElement("img",{src:"data:image/png;base64,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",style:{width:36,height:36}}))),r.a.createElement("span",{style:{fontSize:13,color:"#eb1700"}},K))},g=a(63),d=a(135),A=a.n(d);t.default=function(){var e=Object(i.useState)(""),t=l()(e,2),a=t[0],n=t[1],c=Object(i.useState)(""),m=l()(c,2),p=m[0],f=m[1];return r.a.createElement("div",null,r.a.createElement("p",{className:A.a.title},"Instructions"),r.a.createElement(o.a,{style:{display:"flex",justifyContent:"space-around"}},r.a.createElement(s.a,{className:A.a.small,md:8,sm:12,xs:24},r.a.createElement("span",{style:{display:"block",fontSize:18}},"Enter two Github:"),r.a.createElement("i",{className:"fa fa-users",style:{color:"rgb(255, 191, 116)",backgroundColor:"#eee"}})),r.a.createElement(s.a,{className:A.a.small,md:8,sm:12,xs:24},r.a.createElement("span",{style:{display:"block",fontSize:18}},"Battle:"),r.a.createElement("i",{className:"fa fa-fighter-jet",style:{color:"gray",backgroundColor:"#eee"}})),r.a.createElement(s.a,{className:A.a.small,md:8,sm:12,xs:24},r.a.createElement("span",{style:{display:"block",fontSize:18}},"See the winner:"),r.a.createElement("i",{className:"fa fa-trophy",style:{color:"rgb(244,234,47)",backgroundColor:"#eee",fontSize:100}}))),r.a.createElement("p",{style:{textAlign:"center",fontSize:24,fontWeight:"bold"}},"Players"),r.a.createElement(o.a,{style:{display:"flex",width:"100%"}},r.a.createElement(s.a,{style:{width:"100%",paddingTop:15},md:12,sm:24},r.a.createElement("p",{style:{fontSize:24,fontWeight:"bold"}},"Player One"),r.a.createElement(u,{getSuccessData:function(e){return n(e)},otherName:p})),r.a.createElement(s.a,{style:{width:"100%",paddingTop:15},md:12,sm:24},r.a.createElement("p",{style:{fontSize:24,fontWeight:"bold"}},"Player Two"),r.a.createElement(u,{getSuccessData:function(e){return f(e)},otherName:a}))),r.a.createElement("div",{style:{width:"100%",justifyContent:"center",marginTop:50,display:a.length>0&&p.length>0?"flex":"none"}},r.a.createElement("button",{style:{fontSize:15,width:180,paddingTop:8,paddingBottom:8,textAlign:"center"},onClick:function(){Object(g.a)({page:"results",query:{play1:a,play2:p}})}},"Battle")))}}}]);