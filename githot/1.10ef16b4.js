(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{133:function(e,a,t){(a=t(53)(!1)).push([e.i,"._3ptmhWYwBWxKAw66UHMs8J {\n  width: 100%;\n  margin: 0 auto;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-around;\n}\n._1_LwHfDlKrRNTT2cS_OcMp {\n  text-align: center;\n  padding: 20px 5px;\n  border-radius: 3px;\n  width: calc(100% - 10px);\n  background-color: #ebebeb;\n}\n._1_LwHfDlKrRNTT2cS_OcMp .yW7WzLABLU7wUvWhQAGIA {\n  font-weight: 500;\n  font-size: 18px;\n  display: block;\n  margin-bottom: 10px;\n}\n._1_LwHfDlKrRNTT2cS_OcMp div img {\n  width: 110px;\n  height: 110px;\n}\n._2JwF7EK9C6b_rF2PXH_BEE {\n  display: none;\n}\n.tIa_B6YGSmleS0rk210K3 div {\n  width: 70%;\n  text-align: left;\n}\n._3-VhhZGAYCdVpRiww3dfBa {\n  font-size: 15px;\n  margin: 10px 0;\n  display: block;\n  font-weight: 600;\n}\n.io5HpP8BIxJjHJLJwT8z {\n  color: #1890ff;\n  font-size: 18px;\n  margin: 10px 0;\n  display: block;\n  font-weight: 600;\n}\n@media screen and (max-width: 568px) {\n  ._1_LwHfDlKrRNTT2cS_OcMp {\n    display: flex;\n    flex-direction: row;\n    width: 100%;\n    text-align: left;\n  }\n  ._1_LwHfDlKrRNTT2cS_OcMp div img {\n    width: 150px;\n    height: 150px;\n  }\n  ._1_LwHfDlKrRNTT2cS_OcMp .yW7WzLABLU7wUvWhQAGIA {\n    display: none;\n  }\n  ._1_LwHfDlKrRNTT2cS_OcMp ._3dTwmn5CKXfYghWAdImFrN {\n    margin-left: 15px;\n  }\n  ._2JwF7EK9C6b_rF2PXH_BEE {\n    font-weight: 500;\n    font-size: 18px;\n    display: block;\n    margin-bottom: 0;\n  }\n  .tIa_B6YGSmleS0rk210K3 div {\n    width: 100%;\n    text-align: left;\n  }\n  ._3-VhhZGAYCdVpRiww3dfBa {\n    display: inline;\n    margin: 0;\n    margin-left: 0;\n    font-size: 14px;\n  }\n  .io5HpP8BIxJjHJLJwT8z {\n    margin: 0;\n    font-size: 14px;\n  }\n}\n",""]),a.locals={warpper:"_3ptmhWYwBWxKAw66UHMs8J",inner:"_1_LwHfDlKrRNTT2cS_OcMp",resultS:"yW7WzLABLU7wUvWhQAGIA",result576:"_2JwF7EK9C6b_rF2PXH_BEE",iconInfo:"tIa_B6YGSmleS0rk210K3",scores:"_3-VhhZGAYCdVpRiww3dfBa",name:"io5HpP8BIxJjHJLJwT8z",info:"_3dTwmn5CKXfYghWAdImFrN"},e.exports=a},136:function(e,a,t){var n=t(52),l=t(133);"string"==typeof(l=l.__esModule?l.default:l)&&(l=[[e.i,l,""]]);var r={insert:"head",singleton:!1},i=n(l,r);if(!l.locals||e.hot.invalidate){var s=l.locals;e.hot.accept(133,(function(){"string"==typeof(l=(l=t(133)).__esModule?l.default:l)&&(l=[[e.i,l,""]]),function(e,a,t){if(!e&&a||e&&!a)return!1;var n;for(n in e)if((!t||"default"!==n)&&e[n]!==a[n])return!1;for(n in a)if(!(t&&"default"===n||e[n]))return!1;return!0}(s,l.locals)?(s=l.locals,i(l)):e.hot.invalidate()}))}e.hot.dispose((function(){i()})),e.exports=l.locals||{}},137:function(e,a,t){"use strict";t.r(a);var n=t(17),l=t.n(n),r=t(0),i=t.n(r),s=t(54),c=t.n(s),o=t(128),p=t(130),m=t(129),f=t(63),d=t(136),u=t.n(d);a.default=function(){var e=Object(r.useState)({}),a=l()(e,2),t=a[0],n=a[1],s=Object(r.useState)({}),d=l()(s,2),g=d[0],w=d[1],_=Object(r.useState)(!1),E=l()(_,2),h=E[0],y=E[1],x=Object(r.useState)(""),b=l()(x,2),v=b[0],S=b[1];Object(r.useEffect)((function(){var e=Object(f.b)();e.query.play1&&e.query.play2?(c.a.get("https://api.github.com/users/".concat(e.query.play1)).then((function(e){n(e.data)})).catch((function(e){y(!0),S("API rate limit")})),c.a.get("https://api.github.com/users/".concat(e.query.play2)).then((function(e){return w(e.data)})).catch((function(e){S("API rate limit"),y(!0)}))):(y(!0),S("url error"))}),[]);var N=function(e){return(e||0).toString().replace(/(\d)(?=(?:\d{3})+$)/g,"$1,")},L=function(e,a){return e>a?"Winner":e<a?"Loser":"Draw"};return i.a.createElement("div",null,h?i.a.createElement(m.a,{message:v,type:"error",closable:!0,style:{marginTop:20}}):i.a.createElement(o.a,{className:u.a.warpper},i.a.createElement(p.a,{style:{width:"100%",padding:"10px 5px"},sm:12,xs:24},i.a.createElement("div",{className:u.a.inner},i.a.createElement("span",{className:u.a.resultS},L(t.public_repos,g.public_repos)),i.a.createElement("div",null,i.a.createElement("img",{src:t.avatar_url,alt:"avatar_url"})),i.a.createElement("div",{className:u.a.info},i.a.createElement("span",{className:u.a.result576},L(t.public_repos,g.public_repos)),i.a.createElement("span",{className:u.a.scores},"Scores: ",t.public_repos),i.a.createElement("span",{className:u.a.name},t.name),i.a.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},className:u.a.iconInfo},i.a.createElement("div",null,i.a.createElement("span",{className:"fa fa-user",style:{color:"rgb(255,191,116)",marginLeft:2}}),i.a.createElement("span",{style:{fontSize:14,fontWeight:"600",marginLeft:8}},t.location)),i.a.createElement("div",null,i.a.createElement("span",{className:"fa fa-star",style:{color:"rgb(255,215,0)"}}),i.a.createElement("span",{style:{fontSize:14,marginLeft:5}},N(t.followers))),i.a.createElement("div",null,i.a.createElement("span",{className:"fa fa-share-alt fa-rotate-270",style:{color:"rgb(147,201,242)"}}),i.a.createElement("span",{style:{fontSize:14,marginLeft:7}},N(t.following))),i.a.createElement("div",null,i.a.createElement("span",{className:"fa fa-warning",style:{color:"rgb(240,144,151)"}}),i.a.createElement("span",{style:{fontSize:14,marginLeft:5}},N(t.public_repos))))))),i.a.createElement(p.a,{style:{width:"100%",padding:"10px 5px"},sm:12,xs:24},i.a.createElement("div",{className:u.a.inner},i.a.createElement("span",{className:u.a.resultS},L(g.public_repos,t.public_repos)),i.a.createElement("div",null,i.a.createElement("img",{src:g.avatar_url,alt:"avatar_url"})),i.a.createElement("div",{className:u.a.info},i.a.createElement("span",{className:u.a.result576},L(g.public_repos,t.public_repos)),i.a.createElement("span",{className:u.a.scores},"Scores: ",g.public_repos),i.a.createElement("span",{className:u.a.name},g.name),i.a.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"}},i.a.createElement("div",{style:{width:"70%",textAlign:"left"}},i.a.createElement("span",{className:"fa fa-user",style:{color:"rgb(255,191,116)",marginLeft:2}}),i.a.createElement("span",{style:{fontSize:14,fontWeight:"600",marginLeft:8}},g.location)),i.a.createElement("div",{style:{width:"70%",textAlign:"left"}},i.a.createElement("span",{className:"fa fa-star",style:{color:"rgb(255,215,0)"}}),i.a.createElement("span",{style:{fontSize:14,marginLeft:5}},N(g.followers))),i.a.createElement("div",{style:{width:"70%",textAlign:"left"}},i.a.createElement("span",{className:"fa fa-share-alt fa-rotate-270",style:{color:"rgb(147,201,242)"}}),i.a.createElement("span",{style:{fontSize:14,marginLeft:7}},N(g.following))),i.a.createElement("div",{style:{width:"70%",textAlign:"left"}},i.a.createElement("span",{className:"fa fa-warning",style:{color:"rgb(240,144,151)"}}),i.a.createElement("span",{style:{fontSize:14,marginLeft:5}},N(g.public_repos)))))))),i.a.createElement("div",{style:{width:"100%",justifyContent:"center",marginTop:50,display:"flex"}},i.a.createElement("button",{style:{fontSize:18,width:200,paddingTop:8,paddingBottom:8},onClick:function(){window.location.href="#/battle"}},"Reset")))}}}]);