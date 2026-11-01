var a={exports:{}},s={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var o;function p(){if(o)return s;o=1;var t=Symbol.for("react.transitional.element"),l=Symbol.for("react.fragment");function i(x,r,e){var n=null;if(e!==void 0&&(n=""+e),r.key!==void 0&&(n=""+r.key),"key"in r){e={};for(var u in r)u!=="key"&&(e[u]=r[u])}else e=r;return r=e.ref,{$$typeof:t,type:x,key:n,ref:r!==void 0?r:null,props:e}}return s.Fragment=l,s.jsx=i,s.jsxs=i,s}var c;function v(){return c||(c=1,a.exports=p()),a.exports}var d=v();const f=(t="")=>`/fdu-course-collect/${t.replace(/^\//,"")}`,E={free:"免费公开",preview:"仅可预览",paid:"付费索引",unknown:"获取方式未知"},k=["开课","合并","今年未开课","研究生已过滤","未匹配"],h=t=>({开课:"green",合并:"blue",今年未开课:"gray",研究生已过滤:"purple",未匹配:"amber"})[t]||"gray";function R(t){return/^https?:\/\//i.test(t)}function _(t){return R(t)||t.startsWith("/fdu-course-collect/")&&!t.startsWith("//")}export{h as a,E as b,R as e,f as h,d as j,k as s,_ as v};
