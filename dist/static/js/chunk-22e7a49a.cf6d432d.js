(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-22e7a49a"],{"4e2f":function(t,i,s){},"8ce9":function(t,i,s){"use strict";s.r(i);var a=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{attrs:{id:"cont"}},[s("div",{staticClass:"nav"},[s("div",{staticClass:"ic",on:{click:function(i){return t.skip("personal")}}},[s("icon",{staticClass:"icon_fs",attrs:{type:"arrowLeft"}})],1),s("span",{staticClass:"nav_title"},[t._v("账户信息")]),s("div",{staticClass:"ic"})]),s("div",{staticStyle:{width:"100%",height:"2.9rem"}}),s("div",{staticClass:"info"},[s("div",[s("span",[t._v("头像")]),s("img",{attrs:{src:"https://elm.cangdu.org/img/"+t.loginMessage.avatar,alt:""}}),s("icon",{staticClass:"icon",attrs:{type:"arrowRight"}})],1),s("div",[s("span",[t._v("用户名")]),s("span",[t._v(t._s(t.loginMessage.username))]),s("icon",{staticClass:"icon",attrs:{type:"arrowRight"}})],1),s("div",{on:{click:function(i){return t.skip("addadres")}}},[s("span",[t._v("收货地址")]),s("span"),s("icon",{staticClass:"icon",attrs:{type:"arrowRight"}})],1)]),s("div",{staticClass:"phone"},[s("div",[t._v("账号绑定")]),s("div",{on:{click:function(i){return t.alt()}}},[s("span",[s("icon",{attrs:{type:"cphone"}}),t._v("手机")],1),s("icon",{staticClass:"icon",attrs:{type:"arrowRight"}})],1)]),s("div",{staticClass:"safe"},[s("div",[t._v("账号绑定")]),s("div",{on:{click:function(i){return t.skip("forget")}}},[s("span",[t._v("登录密码")]),s("span",{staticClass:"change"},[t._v("修改")]),s("icon",{staticClass:"icon",attrs:{type:"arrowRight"}})],1)]),s("van-button",{staticStyle:{width:"90%",margin:"5%"},attrs:{type:"danger",block:""},on:{click:t.exit}},[t._v("退出登录")])],1)},n=[],c=s("5530"),e=s("2f62"),o=s("2241"),r={data:function(){return{}},methods:Object(c["a"])(Object(c["a"])({},Object(e["b"])(["chLogin"])),{},{exit:function(){var t=this;o["a"].confirm({title:"确认",message:"是否退出登录？"}).then((function(){t.$cookies.remove("token"),t.chLogin({}),t.skip("login")})).catch((function(){}))},alt:function(){o["a"].alert({message:"请在手机APP上操作"}).then((function(){}))}}),computed:Object(c["a"])({},Object(e["c"])(["loginMessage"]))},l=r,v=(s("dd40"),s("2877")),d=Object(v["a"])(l,a,n,!1,null,"9386c98c",null);i["default"]=d.exports},dd40:function(t,i,s){"use strict";s("4e2f")}}]);