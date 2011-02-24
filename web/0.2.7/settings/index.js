/*
 blade/func Copyright (c) 2010, The Dojo Foundation All Rights Reserved.
 Available via the MIT, GPL or new BSD license.
 see: http://github.com/jrburke/blade for details
 blade/object Copyright (c) 2010, The Dojo Foundation All Rights Reserved.
 Available via the MIT, GPL or new BSD license.
 see: http://github.com/jrburke/blade for details
 blade/jig Copyright (c) 2010, The Dojo Foundation All Rights Reserved.
 Available via the MIT, GPL or new BSD license.
 see: http://github.com/jrburke/blade for details
 blade/array Copyright (c) 2010, The Dojo Foundation All Rights Reserved.
 Available via the MIT, GPL or new BSD license.
 see: http://github.com/jrburke/blade for details
 blade/url Copyright (c) 2010, The Dojo Foundation All Rights Reserved.
 Available via the MIT, GPL or new BSD license.
 see: http://github.com/jrburke/blade for details
*/
define("blade/fn",[],function(){var f=Array.prototype.slice,b=Object.prototype.toString;return{is:function(d){return b.call(d)==="[object Function]"},bind:function(d,c){if(!c)return d;if(typeof c==="string")c=d[c];var a=f.call(arguments,2);return function(){return c.apply(d,a.concat(f.call(arguments,0)))}}}});
define("blade/object",["./fn"],function(f){function b(){}var d={},c=function(a,e,k){a=a||{};var h,o=c.create(a.prototype,e);a=function(m,q,n){return o[q].apply(m,n)};e=c.create(o);c.mixin(e,f.is(k)?k(a):k,true);h=function(){if(!(this instanceof h))throw new Error('blade/object: constructor function called without "new" in front');this.init&&this.init.apply(this,arguments)};h.prototype=e;return h};c.create=function(a,e){b.prototype=a;a=new b;var k,h;b.prototype=null;if(e)for(k=0;h=e[k];k++)c.mixin(a,
h);return a};c.mixin=function(a,e,k){for(var h in e)if(!(h in d)&&(!(h in a)||k))a[h]=e[h]};return c});
define("blade/jig",["require","./object"],function(f,b){function d(g){return y.call(g)==="[object Array]"}function c(g,i,j){i=i;var l,p;for(l=0;i&&(p=g[l]);l++)i=typeof i==="object"&&p in i?i[p]:j&&l===0&&p in j?j[p]:undefined;return i}function a(g){return g?parseInt(g,10):0}function e(g,i,j){var l=/\[([\w0-9\.'":]+)\]/,p=g,u=i,r=true,w,z;if(g===t)return i;if(F.test(g))return a(g);if(g==="")return"";w=g.charAt(0);if(w==="'"||w==="'")return g.substring(1,g.length-1);if((w=g.indexOf("("))!==-1){l=g.lastIndexOf(")");
r=g.substring(0,w);p=j.fn[r];if(!p){n.error("Cannot find function named: "+r+" for "+g);return""}r=g.substring(w+1,l);if(r.indexOf(",")!==-1){r=r.split(",");for(u=r.length-1;u>=0;u--)r[u]=e(r[u],i,j);p=p.apply(null,r)}else p=p(e(r,i,j));if(l<g.length-1){if(g.charAt(l+1)===".")l+=1;return e(g.substring(l+1,g.length),p,j)}else return p}for(;w=l.exec(p);){i=w[1].replace(/['"]/g,"");z=p.substring(0,w.index);p=p.substring(w.index+w[0].length,p.length);if(p.indexOf(".")===0)p=p.substring(1,p.length);u=
c(z.split("."),u,r?j.context:null);r=false;if(!u&&i){n.error('blade/jig: No property "'+i+'" on '+u);return""}if(i.indexOf(":")!==-1){w=i.split(":");i=a(w[0]);u=(w=a(w[1]))?u.slice(i,w):u.slice(i)}else{j.strict&&!(i in u)&&n.error('blade/jig: no property "'+i+'"');u=u[i]}u=u}p=p?c(p.split("."),u,r?j.context:null):u;j.strict&&p===undefined&&n.error('blade/jig: undefined value for property "'+g+'"');return p}function k(g,i){i=i||{};var j=n.cache(g,i);if(j===undefined&&typeof document!=="undefined"){(j=
document.getElementById(g))&&n.parse([j],i);j=n.cache(g,i)}if(j===undefined)throw new Error("blade/jig: no template or node with ID: "+g);return j}function h(g,i){for(var j=[],l=0,p=false,u=0,r,w,z,M,N,J;(r=g.indexOf(i.startToken,l))!==-1;){r!==l&&j.push(g.substring(l,r));l=g.substring(r);if(w=i.endRegExp.exec(l)){l=r+w[0].length;z=g.substring(r+i.startToken.length,r+w[0].length-i.endToken.length).trim();z=x(z);if(D.test(z))throw new Error("blade/jig: end block tags should not be commented: "+z);
r=z.charAt(0);if(r==="]"&&u){p=z.substring(1).trim();if(p==="[")r=">";else{r=p.charAt(0);z=p}}if(r&&!i.propertyRegExp.test(r))z=z.substring(1).trim();else r="_default_";if(p=z.indexOf(i.rawHtmlToken)===0)z=z.substring(i.rawHtmlToken.length,z.length);if(r===E)p=true;z=z.split(i.argSeparator);M=z[z.length-1];N=M.charAt(M.length-1);J=null;if(r==="]"){if(N!=="["){j.templateEnd=l;j.endControl=true}else j.templateEnd=l-w[0].length;return j}else if(N==="["){u||(u=I++);z[z.length-1]=M.substring(0,M.length-
1);J=h(g.substring(l),i);l+=J.templateEnd}if(r==="+")i.templates[z[0]]=J;else if(r!=="/"){if(z.length>1)for(w=z.length-1;w>=0;w--)if(z[w].charAt(z[w].length-1)===","){z[w]+=z[w+1];z.splice(w+1,1)}j.push({action:i.commands[r].action,useRawHtml:p,args:z,controlId:u,children:J})}if(J&&J.endControl)u=0}else{j.push(l);return j}}l!==g.length-1&&j.push(g.substring(l,g.length));return j}function o(g,i){var j,l=g.id;j=i.templates||A;if(j[l])return j[l];i.onBeforeParse&&i.onBeforeParse(g);if(g.nodeName.toUpperCase()===
"SCRIPT"){j=g.text.trim();g.parentNode&&g.parentNode.removeChild(g)}else{L.appendChild(g);g.removeAttribute("id");(j=(g.getAttribute("class")||"").trim())&&g.setAttribute("class",j.replace(G,"$1$3"));j=L.innerHTML.replace(/%7B/g,"{").replace(/%7D/g,"}");L.removeChild(g)}g=n.compile(j,i);n.cache(l,g,i);return g}function m(g,i,j){var l="",p,u,r,w,z;if(typeof g==="string")l=g;else if(d(g))for(p=0;p<g.length;p++){r=g[p].controlId;if(!r||r!==u||!z){w=m(g[p],i,j);l+=w;if(r){u=r;z=w}}}else if(l=g.action(g.args,
i,j,g.children,m)){if(!g.useRawHtml&&!g.children)l=n.htmlEscape(l.toString())}else l="";if(j.attachData)if(B.test(l)){g="id"+H++;l=l.replace(B,'$& data-blade-jig="'+g+'" ');K[g]=i}return l}function q(g){g.fn.jig=function(i,j){j=j||{};var l=this.selector;if(l.charAt(0)!=="#")throw new Error('blade/jig: only ID selectors, like "#something" are allowed with jig()');l=l.substring(1,l.length);(l=(j.templates||A)[l])||(l=o(this[0]));return g(n.render(l,i,j))}}var n,v,y=Object.prototype.toString,x=typeof decodeURIComponent===
"undefined"?function(){}:decodeURIComponent,E="#",s=/[_\[\^\w]/,t="_",B=/<\s*\w+/,F=/^\d+$/,D=/\/(\/)?\s*\]/,A={},C={openCurly:function(){return"{"},closeCurly:function(){return"}"},eq:function(g,i){return g===i},gt:function(g,i){return g>i},gte:function(g,i){return g>=i},lt:function(g,i){return g<i},lte:function(g,i){return g<=i},or:function(g,i){return g||i},and:function(g,i){return g&&i},is:function(g){return!!g},eachProp:function(g){var i,j=[];for(i in g)g.hasOwnProperty(i)&&j.push({prop:i,value:g[i]});
return j.sort(function(l,p){return l.prop>p.prop?1:-1})}},H=1,I=1,K={},L=typeof document!=="undefined"&&document.createElement?document.createElement("div"):null,G=/(\s*)(template)(\s*)/;v={_default_:{doc:"Property reference",action:function(g,i,j,l,p){var u=g[0]?e(g[0],i,j):i,r=g[1]?e(g[1],i,j):undefined,w="";if(g[1]){r=u===r;u=i}else r=u;if(r===false||r===null||r===undefined||d(r)&&!r.length)return"";else if(l)if(d(u))for(g=0;g<u.length;g++)w+=p(l,u[g],j);else{if(typeof u==="boolean")u=i;w=p(l,
u,j)}else w=u;return w}},"!":{doc:"Not",action:function(g,i,j,l,p){var u=e(g[0],i,j),r=g[1]?e(g[1],i,j):undefined;r=g[1]?u===r:u;if(l&&!r)return p(l,i,j);return""}},"#":{doc:"Template reference",action:function(g,i,j,l,p){l=k(g[0],j);i=e(g.length>1?g[1]:t,i,j);return p(l,i,j)}},".":{doc:"Variable declaration",action:function(g,i,j){j.context[g[0]]=e(g[1],i,j);return""}},">":{doc:"Else",action:function(g,i,j,l,p){if(l)return p(l,i,j);return""}}};n=function(g,i,j){if(typeof g==="string")if(g.charAt(0)===
"#"){g=g.substring(1,g.length);g=k(g,j)}else g=n.compile(g,j);return n.render(g,i,j)};n.htmlEscape=function(g){return g.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")};n.compile=function(g,i){i=i||{};b.mixin(i,{startToken:"{",endToken:"}",rawHtmlToken:"^",propertyRegExp:s,commands:v,argSeparator:" ",templates:A});i.endRegExp=/[^\r\n]*?}/;I=1;return h(g,i)};n.parse=function(g,i){if(g&&!g.length){i=g;g=null}i=i||{};g=g||document.querySelectorAll('.template, script[type="text/template"]');
var j,l;for(l=g.length-1;l>-1&&(j=g[l]);l--)o(j,i)};n.render=function(g,i,j){var l,p="";j=j||{};b.mixin(j,{templates:A,attachData:false,strict:n.strict});if(j.fn)b.mixin(j.fn,C);else j.fn=C;j.context=j.context||b.create(i);if(d(i)){for(l=0;l<i.length;l++)p+=m(g,i[l],j);return p}return m(g,i,j)};n.strict=false;n.error=function(g){throw g;};n.addFn=function(g){b.mixin(C,g,true)};n.data=function(g,i){if(typeof g!=="string"){g.nodeType||(g=g[0]);g=g.getAttribute("data-blade-jig")}return i!==undefined?
(K[g]=i):K[g]};n.removeData=function(g){delete K[g]};n.getObject=e;n.cache=function(g,i,j){if(typeof i==="string")i=n.compile(i,j);if(!d(i)){j=i;i=undefined}j=j&&j.templates||A;if(i!==undefined)j[g]=i;return j[g]||A[g]};typeof jQuery!=="undefined"&&q(jQuery);return n});
define("friendly",["require","exports","module"],function(){var f={timestamp:function(b){return f.date(new Date(b*1E3))},date:function(b){var d=((new Date).getTime()-b.getTime())/1E3,c=Math.floor(d/86400),a={friendly:b.toLocaleDateString(),additional:b.toLocaleTimeString(),utc:b.toUTCString(),locale:b.toLocaleString()};if(c<0){a.friendly="in the future";return a}else if(isNaN(c)){a.friendly=a.additional="unknown";return a}if(c===0){if(d<60){a.friendly="just now";return a}if(d<150){a.friendly="a minute ago";
return a}if(d<3600){a.friendly=Math.floor(d/60)+" minutes ago";return a}if(d<7200){a.friendly="1 hour ago";return a}if(d<86400){a.friendly=Math.floor(d/3600)+" hours ago";return a}}if(c===1){a.friendly="yesterday";return a}if(c<7){a.friendly=c+" days ago";return a}if(c<8){a.friendly="last week";return a}if(c<31){a.friendly=Math.ceil(c/7)+" weeks ago";return a}if(c<62){a.friendly="a month ago";return a}if(c<365){a.friendly=Math.ceil(c/31)+" months ago";return a}if(c>=365&&c<730){a.additional=b.toLocaleDateString();
a.friendly="a year ago";return a}if(c>=365){a.additional=b.toLocaleDateString();a.friendly=Math.ceil(c/365)+" years ago";return a}return a},name:function(b){b=b.split(" ")[0];if(b.indexOf("@")!==-1)b=b.split("@")[0];b=b.replace(" ","");b=b.replace("'","");return b=b.replace('"',"")}};return f});
define("isoDate",[],function(){var f=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+\-](\d{2}):(\d{2}))|Z)?)?$/,b=function(d,c){var a=f.exec(d);d=null;var e,k;if(a){a.shift();a[1]&&a[1]--;if(a[6])a[6]*=1E3;if(c){c=new Date(c);["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"].map(function(h){return c["get"+h]()}).forEach(function(h,o){a[o]=a[o]||h})}d=new Date(a[0]||1970,a[1]||0,a[2]||1,a[3]||0,a[4]||0,a[5]||0,a[6]||0);if(a[0]<100)d.setFullYear(a[0]||
1970);e=0;k=a[7]&&a[7].charAt(0);if(k!=="Z"){e=(a[8]||0)*60+(Number(a[9])||0);if(k!=="-")e*=-1}if(k)e-=d.getTimezoneOffset();e&&d.setTime(d.getTime()+e*6E4)}return d};b.toIsoString=function(d,c){var a=function(o){return o<10?"0"+o:o},e,k,h;c=c||{};e=[];k=c.zulu?"getUTC":"get";h="";if(c.selector!=="time"){h=d[k+"FullYear"]();h=["0000".substr((h+"").length)+h,a(d[k+"Month"]()+1),a(d[k+"Date"]())].join("-")}e.push(h);if(c.selector!=="date"){h=[a(d[k+"Hours"]()),a(d[k+"Minutes"]()),a(d[k+"Seconds"]())].join(":");
k=d[k+"Milliseconds"]();if(c.milliseconds)h+="."+(k<100?"0":"")+a(k);if(c.zulu)h+="Z";else if(c.selector!=="time"){d=d.getTimezoneOffset();c=Math.abs(d);h+=(d>0?"-":"+")+a(Math.floor(c/60))+":"+a(c%60)}e.push(h)}return e.join("T")};return b});var EXPORTED_SYMBOLS=["hex_md5"],hexcase=0,b64pad="";function hex_md5(f){return rstr2hex(rstr_md5(str2rstr_utf8(f)))}function b64_md5(f){return rstr2b64(rstr_md5(str2rstr_utf8(f)))}function any_md5(f,b){return rstr2any(rstr_md5(str2rstr_utf8(f)),b)}
function hex_hmac_md5(f,b){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(f),str2rstr_utf8(b)))}function b64_hmac_md5(f,b){return rstr2b64(rstr_hmac_md5(str2rstr_utf8(f),str2rstr_utf8(b)))}function any_hmac_md5(f,b,d){return rstr2any(rstr_hmac_md5(str2rstr_utf8(f),str2rstr_utf8(b)),d)}function md5_vm_test(){return hex_md5("abc").toLowerCase()=="900150983cd24fb0d6963f7d28e17f72"}function rstr_md5(f){return binl2rstr(binl_md5(rstr2binl(f),f.length*8))}
function rstr_hmac_md5(f,b){var d=rstr2binl(f);if(d.length>16)d=binl_md5(d,f.length*8);var c=Array(16);f=Array(16);for(var a=0;a<16;a++){c[a]=d[a]^909522486;f[a]=d[a]^1549556828}b=binl_md5(c.concat(rstr2binl(b)),512+b.length*8);return binl2rstr(binl_md5(f.concat(b),640))}function rstr2hex(f){for(var b=hexcase?"0123456789ABCDEF":"0123456789abcdef",d="",c,a=0;a<f.length;a++){c=f.charCodeAt(a);d+=b.charAt(c>>>4&15)+b.charAt(c&15)}return d}
function rstr2b64(f){for(var b="",d=f.length,c=0;c<d;c+=3)for(var a=f.charCodeAt(c)<<16|(c+1<d?f.charCodeAt(c+1)<<8:0)|(c+2<d?f.charCodeAt(c+2):0),e=0;e<4;e++)b+=c*8+e*6>f.length*8?b64pad:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(a>>>6*(3-e)&63);return b}
function rstr2any(f,b){var d=b.length,c,a,e,k,h,o=Array(Math.ceil(f.length/2));for(c=0;c<o.length;c++)o[c]=f.charCodeAt(c*2)<<8|f.charCodeAt(c*2+1);var m=Math.ceil(f.length*8/(Math.log(b.length)/Math.log(2)));f=Array(m);for(a=0;a<m;a++){h=Array();for(c=k=0;c<o.length;c++){k=(k<<16)+o[c];e=Math.floor(k/d);k-=e*d;if(h.length>0||e>0)h[h.length]=e}f[a]=k;o=h}d="";for(c=f.length-1;c>=0;c--)d+=b.charAt(f[c]);return d}
function str2rstr_utf8(f){for(var b="",d=-1,c,a;++d<f.length;){c=f.charCodeAt(d);a=d+1<f.length?f.charCodeAt(d+1):0;if(55296<=c&&c<=56319&&56320<=a&&a<=57343){c=65536+((c&1023)<<10)+(a&1023);d++}if(c<=127)b+=String.fromCharCode(c);else if(c<=2047)b+=String.fromCharCode(192|c>>>6&31,128|c&63);else if(c<=65535)b+=String.fromCharCode(224|c>>>12&15,128|c>>>6&63,128|c&63);else if(c<=2097151)b+=String.fromCharCode(240|c>>>18&7,128|c>>>12&63,128|c>>>6&63,128|c&63)}return b}
function str2rstr_utf16le(f){for(var b="",d=0;d<f.length;d++)b+=String.fromCharCode(f.charCodeAt(d)&255,f.charCodeAt(d)>>>8&255);return b}function str2rstr_utf16be(f){for(var b="",d=0;d<f.length;d++)b+=String.fromCharCode(f.charCodeAt(d)>>>8&255,f.charCodeAt(d)&255);return b}function rstr2binl(f){for(var b=Array(f.length>>2),d=0;d<b.length;d++)b[d]=0;for(d=0;d<f.length*8;d+=8)b[d>>5]|=(f.charCodeAt(d/8)&255)<<d%32;return b}
function binl2rstr(f){for(var b="",d=0;d<f.length*32;d+=8)b+=String.fromCharCode(f[d>>5]>>>d%32&255);return b}
function binl_md5(f,b){f[b>>5]|=128<<b%32;f[(b+64>>>9<<4)+14]=b;b=1732584193;for(var d=-271733879,c=-1732584194,a=271733878,e=0;e<f.length;e+=16){var k=b,h=d,o=c,m=a;b=md5_ff(b,d,c,a,f[e+0],7,-680876936);a=md5_ff(a,b,d,c,f[e+1],12,-389564586);c=md5_ff(c,a,b,d,f[e+2],17,606105819);d=md5_ff(d,c,a,b,f[e+3],22,-1044525330);b=md5_ff(b,d,c,a,f[e+4],7,-176418897);a=md5_ff(a,b,d,c,f[e+5],12,1200080426);c=md5_ff(c,a,b,d,f[e+6],17,-1473231341);d=md5_ff(d,c,a,b,f[e+7],22,-45705983);b=md5_ff(b,d,c,a,f[e+8],7,
1770035416);a=md5_ff(a,b,d,c,f[e+9],12,-1958414417);c=md5_ff(c,a,b,d,f[e+10],17,-42063);d=md5_ff(d,c,a,b,f[e+11],22,-1990404162);b=md5_ff(b,d,c,a,f[e+12],7,1804603682);a=md5_ff(a,b,d,c,f[e+13],12,-40341101);c=md5_ff(c,a,b,d,f[e+14],17,-1502002290);d=md5_ff(d,c,a,b,f[e+15],22,1236535329);b=md5_gg(b,d,c,a,f[e+1],5,-165796510);a=md5_gg(a,b,d,c,f[e+6],9,-1069501632);c=md5_gg(c,a,b,d,f[e+11],14,643717713);d=md5_gg(d,c,a,b,f[e+0],20,-373897302);b=md5_gg(b,d,c,a,f[e+5],5,-701558691);a=md5_gg(a,b,d,c,f[e+
10],9,38016083);c=md5_gg(c,a,b,d,f[e+15],14,-660478335);d=md5_gg(d,c,a,b,f[e+4],20,-405537848);b=md5_gg(b,d,c,a,f[e+9],5,568446438);a=md5_gg(a,b,d,c,f[e+14],9,-1019803690);c=md5_gg(c,a,b,d,f[e+3],14,-187363961);d=md5_gg(d,c,a,b,f[e+8],20,1163531501);b=md5_gg(b,d,c,a,f[e+13],5,-1444681467);a=md5_gg(a,b,d,c,f[e+2],9,-51403784);c=md5_gg(c,a,b,d,f[e+7],14,1735328473);d=md5_gg(d,c,a,b,f[e+12],20,-1926607734);b=md5_hh(b,d,c,a,f[e+5],4,-378558);a=md5_hh(a,b,d,c,f[e+8],11,-2022574463);c=md5_hh(c,a,b,d,f[e+
11],16,1839030562);d=md5_hh(d,c,a,b,f[e+14],23,-35309556);b=md5_hh(b,d,c,a,f[e+1],4,-1530992060);a=md5_hh(a,b,d,c,f[e+4],11,1272893353);c=md5_hh(c,a,b,d,f[e+7],16,-155497632);d=md5_hh(d,c,a,b,f[e+10],23,-1094730640);b=md5_hh(b,d,c,a,f[e+13],4,681279174);a=md5_hh(a,b,d,c,f[e+0],11,-358537222);c=md5_hh(c,a,b,d,f[e+3],16,-722521979);d=md5_hh(d,c,a,b,f[e+6],23,76029189);b=md5_hh(b,d,c,a,f[e+9],4,-640364487);a=md5_hh(a,b,d,c,f[e+12],11,-421815835);c=md5_hh(c,a,b,d,f[e+15],16,530742520);d=md5_hh(d,c,a,
b,f[e+2],23,-995338651);b=md5_ii(b,d,c,a,f[e+0],6,-198630844);a=md5_ii(a,b,d,c,f[e+7],10,1126891415);c=md5_ii(c,a,b,d,f[e+14],15,-1416354905);d=md5_ii(d,c,a,b,f[e+5],21,-57434055);b=md5_ii(b,d,c,a,f[e+12],6,1700485571);a=md5_ii(a,b,d,c,f[e+3],10,-1894986606);c=md5_ii(c,a,b,d,f[e+10],15,-1051523);d=md5_ii(d,c,a,b,f[e+1],21,-2054922799);b=md5_ii(b,d,c,a,f[e+8],6,1873313359);a=md5_ii(a,b,d,c,f[e+15],10,-30611744);c=md5_ii(c,a,b,d,f[e+6],15,-1560198380);d=md5_ii(d,c,a,b,f[e+13],21,1309151649);b=md5_ii(b,
d,c,a,f[e+4],6,-145523070);a=md5_ii(a,b,d,c,f[e+11],10,-1120210379);c=md5_ii(c,a,b,d,f[e+2],15,718787259);d=md5_ii(d,c,a,b,f[e+9],21,-343485551);b=safe_add(b,k);d=safe_add(d,h);c=safe_add(c,o);a=safe_add(a,m)}return Array(b,d,c,a)}function md5_cmn(f,b,d,c,a,e){return safe_add(bit_rol(safe_add(safe_add(b,f),safe_add(c,e)),a),d)}function md5_ff(f,b,d,c,a,e,k){return md5_cmn(b&d|~b&c,f,b,a,e,k)}function md5_gg(f,b,d,c,a,e,k){return md5_cmn(b&c|d&~c,f,b,a,e,k)}
function md5_hh(f,b,d,c,a,e,k){return md5_cmn(b^d^c,f,b,a,e,k)}function md5_ii(f,b,d,c,a,e,k){return md5_cmn(d^(b|~c),f,b,a,e,k)}function safe_add(f,b){var d=(f&65535)+(b&65535);return(f>>16)+(b>>16)+(d>>16)<<16|d&65535}function bit_rol(f,b){return f<<b|f>>>32-b}define("md5",function(){});
define("rdapi",["require","jquery","blade/object","blade/jig","friendly","isoDate","md5"],function(f,b,d,c,a,e){function k(s){if(typeof s==="string")s={template:s};else if(s.templateId)s.template=c.cache(s.templateId);if(!("attachData"in s))s.attachData=q.attachTemplateData;if(s.emptyTemplateId)s.emptyTemplate=c.cache(s.emptyTemplateId);return s}function h(){var s=v.exec(document.cookie);return s&&s[1]?s[1]:null}function o(s,t){t.url=E.baseUrl+E.apiPath+s;d.mixin(t,{limit:30,message_limit:3,dataType:"json",
error:function(D,A,C){throw C;}});var B=t.success,F=h();t.success=function(D){D&&D.contacts&&d.mixin(y,D.contacts,true);return B?B.apply(null,arguments):D};if(F)t.beforeSend=function(D){D.setRequestHeader(n,F)};b.ajax(t)}function m(s,t){var B=t.forId?document.getElementById(t.forId):null;if(B)B.innerHTML=s;t.onTemplateDone&&t.onTemplateDone(s);b(document).trigger("rdapi-done",B)}var q,n="X-CSRF",v=/csrf=([^\; ]+)/,y={},x={contact:function(s){return s.iid&&s.domain?y[s.iid]||{}:s},contactPhotoUrl:function(s){var t=
"i/face2.png",B,F;s=x.contact(s);if((B=s.photos)&&B.length){t=B[0].value;B.forEach(function(D){if(D.primary)t=D.value})}else if(s.emails&&s.emails.length){F=s.emails[0].value;s.emails.forEach(function(D){if(D.primary)F=D.value});t="http://www.gravatar.com/avatar/"+hex_md5(F)+"?s=24 &d=identicon"}return t},allMessages:function(s){return[s.topic].concat(s.messages||[])},friendlyDate:function(s){return a.date(e(s)).friendly},htmlBody:function(s){return c.htmlEscape(s).replace(/\n/g,"<br>")}},E={baseUrl:"/",
apiPath:"api/",saveTemplateData:true};c.addFn(x);q=function(s,t){t=k(t);d.mixin(t,{success:function(B){var F=t.template,D=t.emptyTemplate,A="";if(t.forId&&F){if(t.prop)B=c.getObject(t.prop,B,t);if(f.isArray(B))if(B.length)B.forEach(function(C){A+=c(F,C,t)});else A+=c(D,B,t);else A+=c(!B?D:F,B,t);m(A,t)}},error:function(B,F,D){if(t.emptyTemplate){B=c(t.emptyTemplate,D,t);m(B,t)}else throw D;}});o(s,t)};q.contactPhotoUrl=x.contactPhotoUrl;q.attachTemplateData=false;f.ready(function(){var s=[];c.parse({onBeforeParse:function(t){var B=
t.id,F=t.getAttribute("data-rdapi"),D=t.getAttribute("data-rdfor"),A=t.getAttribute("data-rdprop");F&&s.push({templateId:B,api:F,forId:D,prop:A});["data-rdapi","data-rdprop","data-rdfor"].forEach(function(C){t.removeAttribute(C)})}});s.forEach(function(t){q(t.api,t)})});return q});define("storage",[],function(){function f(){return b}var b=localStorage,d="localStorage";try{b.tempVar="temp";delete b.tempVar}catch(c){b={};d="memory"}f.type=d;return f});
define("dispatch",["jquery"],function(){var f=location.protocol+"//"+location.host;return{sub:function(b,d,c,a){c=c||window;a=a||f;var e=function(k){if(k.origin===a||k.origin==="chrome://browser")try{var h=JSON.parse(k.data),o=h.topic;o&&o===b&&d(h.data)}catch(m){}};c.addEventListener("message",e,false);return e},unsub:function(b,d){d=d||window;d.removeEventListener("message",b,false)},pub:function(b,d,c){c=c||window;c.postMessage(JSON.stringify({topic:b,data:d}),f)}}});
define("blade/array",[],function(){var f=Object.prototype.toString,b=Array.prototype.slice;return{is:function(d){return f.call(d)==="[object Array]"},to:function(){return[].concat(b.call(arguments,0))}}});
define("TextCounter",["jquery","blade/object","blade/fn"],function(f,b,d){return b(null,null,{init:function(c,a,e){this.dom=f(c);this.domPlaceholderText=this.dom[0].getAttribute("placeholder")||"";this.countDom=f(a);this.limit=e;this.dom.bind("keyup",d.bind(this,"checkCount"));this.checkCount()},checkCount:function(){var c=this.dom[0].value;if(c.trim()===this.domPlaceholderText)c="";c=this.limit-c.length;c<0?this.countDom.addClass("TextCountOver"):this.countDom.removeClass("TextCountOver");this.countDom.text(c===
this.limit?"":c)},updateLimit:function(c){this.limit=c;this.checkCount()},isOver:function(){return this.dom[0].value.length>this.limit}})});
define("services",["rdapi","blade/object","blade/array","TextCounter"],function(f,b,d){function c(h,o){if(h){this.name=h;this.type=h.replace(/\s/g,"").toLowerCase();this.tabName=this.type+"Tab";this.icon="i/"+this.type+"Icon.png";this.autoCompleteWidget=null;this.acformat="{name}";this.features={counter:false,direct:false,subject:false};b.mixin(this,o,true)}}function a(){c.constructor.apply(this,arguments);this.features.direct=true;this.features.subject=true;this.acformat="{name} {email}"}var e,k;
c.constructor=c;c.prototype={clearCache:function(h){delete h[this.type+"Contacts"]},getContacts:function(h){if(h[this.type+"Contacts"]){var o=JSON.parse(h[this.type+"Contacts"]);if(!e.isFF36&&o&&d.is(o)){o=null;delete h[this.type+"Contacts"]}return o}return null},setContacts:function(h,o){h[this.type+"Contacts"]=JSON.stringify(o)},getFormattedContacts:function(h){var o={};h.forEach(function(m){m.accounts&&m.accounts.length&&m.accounts.forEach(function(q){o[m.displayName]={email:"",userid:q.userid,
username:q.username}})});return o},get36FormattedContacts:function(){return null}};a.prototype=new c;a.constructor=a;a.prototype.validate=function(h){if(!h.to||!h.to.trim())return false;return true};a.prototype.getFormattedContacts=function(h){var o={};h.forEach(function(m){m.emails&&m.emails.length&&m.emails.forEach(function(q){o[m.displayName?m.displayName:q.value]={email:q.value,userid:null,username:null}})});return o};a.prototype.get36FormattedContacts=function(h){var o=[];h.forEach(function(m){m.emails&&
m.emails.length&&m.emails.forEach(function(q){o.push({displayName:m.displayName?m.displayName:q.value,email:q.value})})});return o};e={domains:{"twitter.com":new c("Twitter",{features:{direct:true,subject:false,counter:true},shareTypes:[{type:"public",name:"public"},{type:"direct",name:"direct message",showTo:true,toLabel:"type in name of recipient"}],acformat:"{username}",textLimit:140,shorten:true,serviceUrl:"http://twitter.com",revokeUrl:"http://twitter.com/settings/connections",signOutUrl:"http://twitter.com/logout",
accountLink:function(h){return"http://twitter.com/"+h.username}}),"facebook.com":new c("Facebook",{features:{direct:true,subject:false,counter:true},shareTypes:[{type:"wall",name:"my wall"},{type:"groupWall",name:"group wall",showTo:true,toLabel:"type in the name of the group"}],textLimit:420,serviceUrl:"http://facebook.com",revokeUrl:"http://www.facebook.com/editapps.php?v=allowed",signOutUrl:"http://facebook.com",accountLink:function(h){return"http://www.facebook.com/profile.php?id="+h.userid}}),
"google.com":new a("Gmail",{shareTypes:[{type:"direct",name:"direct",showTo:true}],serviceUrl:"https://mail.google.com",revokeUrl:"https://www.google.com/accounts/IssuedAuthSubTokens",signOutUrl:"http://google.com/preferences",accountLink:function(h){return"http://google.com/profiles/"+h.username}}),"googleapps.com":new a("Google Apps",{shareTypes:[{type:"direct",name:"direct",showTo:true}],icon:"i/gmailIcon.png",serviceUrl:"https://mail.google.com",revokeUrl:"https://www.google.com/accounts/IssuedAuthSubTokens",
signOutUrl:"http://google.com/preferences",accountLink:function(h){return"http://google.com/profiles/"+h.username}}),"yahoo.com":new a("Yahoo",{shareTypes:[{type:"direct",name:"direct",showTo:true}],name:"Yahoo!",serviceUrl:"http://mail.yahoo.com",revokeUrl:"https://api.login.yahoo.com/WSLogin/V1/unlink",signOutUrl:"https://login.yahoo.com/config/login?logout=1",accountLink:function(h){return"http://profiles.yahoo.com/"+h.username}}),"linkedin.com":new c("LinkedIn",{isNew:true,features:{direct:true,
subject:true,counter:false},shareTypes:[{type:"public",name:"anyone"},{type:"myConnections",name:"connections only",specialTo:"connections-only"},{type:"contact",name:"send message",showTo:true,toLabel:"type in the name of the contact"}],serviceUrl:"http://linkedin.com",revokeUrl:"http://linkedin.com/settings/connections",signOutUrl:"http://linkedin.com/logout",accountLink:function(h){return"http://linkedin.com/"+h.username},overlays:{"widgets/AccountPanel":"widgets/AccountPanelLinkedIn"}})},domainList:[],
svcBaseProto:c.prototype};for(k in e.domains)e.domains.hasOwnProperty(k)&&e.domainList.push(k);return e});
define("accounts",["storage","dispatch","rdapi","services"],function(f,b,d,c){function a(m,q,n,v){return m.domain===q&&(n&&m.userid===n||v&&m.username===v)}function e(m,q){return o.accounts(m,q)}function k(){location.reload()}var h=f(),o;o={localStorage:{accounts:function(m,q){var n=h.accountCache,v=h.serviceCache;n=n?JSON.parse(n):[];if(v){v=v?JSON.parse(v):[];m&&m(n,v)}else o.fetch(m,q)},update:function(m){var q=h.accountCache,n=h.serviceCache,v=false,y,x;q=q?JSON.parse(q):[];y=m.profile;for(x=
0;x<q.length;x++)if(q[x].providerName===y.providerName){q[x]=y;v=true;break}v||q.push(y);h.accountCache=JSON.stringify(q);if(n){v=false;n=JSON.parse(n);for(q=0;q<n.length;q++)if(a(n[q],m.domain,m.userid,m.username)){n[q]=m;v=true;break}}else n=[];v||n.push(m);h.serviceCache=JSON.stringify(n);o.changed()},fetch:function(m,q){d("account/get/full",{success:function(n){if(n.error)n=[];h.serviceCache=JSON.stringify(n);var v=[],y,x;for(x=0;x<n.length;x++){v.push(n[x].profile);y=c.domains[n[x].domain];y.clearCache(h)}h.accountCache=
JSON.stringify(v);m&&m(v,n)},error:q||function(){}})},remove:function(m,q,n){var v=h.accountCache,y=h.serviceCache,x,E;if(y){y=JSON.parse(y);for(x=0;E=y[x];x++)if(a(E,m,q,n)){y.splice(x,1);break}h.serviceCache=JSON.stringify(y)}if(v){v=JSON.parse(v);for(x=0;x<v.length;x++){E=v[x].accounts;for(y=0;y<E.length;y++)if(a(E[y],m,q,n)){v.splice(x,1);break}}h.accountCache=JSON.stringify(v)}c.domains[m].clearCache(h);o.changed()},getService:function(m,q,n){var v=h.serviceCache,y,x;if(v){v=JSON.parse(v);for(y=
0;x=v[y];y++)if(a(x,m,q,n))return x}return null},changed:function(){h.accountChanged=(new Date).getTime();opener&&!opener.closed&&b.pub("accountsChanged",null,opener);b.pub("accountsChanged")},onChange:function(m){var q=h.accountChanged;window.addEventListener("storage",function(){h.accountChanged!==q&&m()},false);b.sub("accountsChanged",m)}},memory:{accounts:function(){},changed:function(){h.accountChanged=(new Date).getTime();opener&&b.pub("accountsChanged",null,opener);b.pub("accountsChanged")},
onChange:function(m){b.sub("accountsChanged",m)}}}[f.type];e.update=function(m){o.update(m)};e.remove=function(m,q,n){o.remove(m,q,n)};e.fetch=function(m,q){o.fetch(m,q)};e.getService=function(m,q,n){return o.getService(m,q,n)};e.clear=function(){delete h.accountCache;delete h.serviceCache};e.changed=function(){return o.changed()};e.onChange=function(m){return o.onChange(m||k)};return e});
define("oauth",["accounts"],function(f){var b,d,c=0;window.addEventListener("message",function(a){var e;try{e=JSON.parse(a.data)}catch(k){return}if(e.target){if(e.target==="oauth_success"&&e.account){a=true;f.update(e.account)}else a=false;d=null;if(b){b(a);b=null}}},false);return function(a,e){if(e)b=e;e=location.protocol+"//"+location.host+"/0.2.7/auth.html";var k=(new Date).getTime();if(d&&d.closed)d=null;if(k>c+4E3){c=k;a=e+"?domain="+a;try{d=window.open(a,"ffshareOAuth","dialog=yes, modal=yes, width=900, height=500, scrollbars=yes");
d.focus()}catch(h){window.location=a+"&end_point_success="+encodeURI(window.location)}}else d&&d.focus()}});define("dotCompare",[],function(){function f(b,d){b=b||"0";d=d||"0";b=b.split(".");d=d.split(".");var c,a,e,k=b.length>d.length?b.length:d.length;for(c=0;c<k;c++){a=parseInt(b[c]||"0",10);e=parseInt(d[c]||"0",10);if(a>e)return 1;else if(a<e)return-1}return 0}return f});
define("blade/url",["./array"],function(f){var b=Object.prototype.toString;return{objectToQuery:function(d){var c=encodeURIComponent,a=[],e={},k,h,o,m;for(k in d)if(d.hasOwnProperty(k)){h=d[k];if(h!==e[k]){o=c(k)+"=";if(f.is(h))for(m=0;m<h.length;m++)a.push(o+c(h[m]));else a.push(o+c(h))}}return a.join("&")},queryToObject:function(d){var c={};d=d.split("&");var a=decodeURIComponent,e,k,h;d.forEach(function(o){if(o.length){e=o.split("=");k=a(e.shift());h=a(e.join("="));if(typeof c[k]==="string")c[k]=
[c[k]];if(b.call(c[k])==="[object Array]")c[k].push(h);else c[k]=h}});return c}}});
define("placeholder",["jquery"],function(f){function b(a){var e=!("placeholder"in a),k=a.getAttribute("placeholder"),h=a.value.trim();if(!h||h===k){if(e){f(a).addClass("placeholder");a.value=k;if(k==="password"&&a.type==="password")a.type="text"}}else f(a).removeClass("placeholder")}function d(a){a=a.target;var e=a.getAttribute("placeholder");if(a.value===e){if(!("placeholder"in a)){a.value="";if(e==="password"&&a.type==="text")a.type="password"}f(a).removeClass("placeholder")}}function c(a){b(a.target)}
return function(a){f('input[type="text"], input[type="password"], textarea',a).each(function(e,k){if(k.getAttribute("data-rdwPlaceholder")!=="set"){f(k).focus(d).blur(c);k.setAttribute("data-rdwPlaceholder","set")}b(k)})}});
(function(f){function b(a){var e;if(a&&a.constructor==Array&&a.length==3)return a;if(e=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(a))return[parseInt(e[1]),parseInt(e[2]),parseInt(e[3])];if(e=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(a))return[parseFloat(e[1])*2.55,parseFloat(e[2])*2.55,parseFloat(e[3])*2.55];if(e=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(a))return[parseInt(e[1],16),parseInt(e[2],
16),parseInt(e[3],16)];if(e=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(a))return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)];return c[f.trim(a).toLowerCase()]}function d(a,e){var k;do{k=f.curCSS(a,e);if(k!=""&&k!="transparent"||f.nodeName(a,"body"))break;e="backgroundColor"}while(a=a.parentNode);return b(k)}f.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(a,e){f.fx.step[e]=function(k){if(k.state==
0){k.start=d(k.elem,e);k.end=b(k.end)}k.elem.style[e]="rgb("+[Math.max(Math.min(parseInt(k.pos*(k.end[0]-k.start[0])+k.start[0]),255),0),Math.max(Math.min(parseInt(k.pos*(k.end[1]-k.start[1])+k.start[1]),255),0),Math.max(Math.min(parseInt(k.pos*(k.end[2]-k.start[2])+k.start[2]),255),0)].join(",")+")"}});var c={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,
100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,
128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0]}})(jQuery);define("jquery.colorFade",function(){});
(function(f){var b=document.documentElement.style,d="textOverflow"in b||"OTextOverflow"in b,c=function(a,e){var k=0,h=[],o=function(m){var q=0,n;if(!(k>e))for(q=0;q<m.length;q+=1)if(m[q].nodeType===1){n=m[q].cloneNode(false);h[h.length-1].appendChild(n);h.push(n);o(m[q].childNodes);h.pop()}else if(m[q].nodeType===3){if(k+m[q].length<e)h[h.length-1].appendChild(m[q].cloneNode(false));else{n=m[q].cloneNode(false);n.textContent=f.trim(n.textContent.substring(0,e-k));h[h.length-1].appendChild(n)}k+=m[q].length}else h.appendChild(m[q].cloneNode(false))};
h.push(a.cloneNode(false));o(a.childNodes);return f(h.pop().childNodes)};f.extend(f.fn,{textOverflow:function(a,e){var k=a||"&#x2026;";return d?this:this.each(function(){var h=f(this),o=h.clone(),m=h.clone(),q=h.text(),n=h.width(),v=0,y=0,x=q.length,E=function(){if(n!==h.width()){h.replaceWith(m);h=m;m=h.clone();h.textOverflow(a,false);n=h.width()}};h.after(o.hide().css({position:"absolute",width:"auto",overflow:"visible","max-width":"inherit"}));if(o.width()>n){for(;v<x;){y=Math.floor(v+(x-v)/2);
o.empty().append(c(m.get(0),y)).append(k);if(o.width()<n)v=y+1;else x=y}v<q.length&&h.empty().append(c(m.get(0),v-1)).append(k)}o.remove();e&&setInterval(E,200)})}})})(jQuery);define("jquery.textOverflow",function(){});
define("index",["require","jquery","blade/fn","rdapi","oauth","blade/jig","dispatch","storage","accounts","dotCompare","blade/url","services","placeholder","jquery.colorFade","jquery.textOverflow"],function(f,b,d,c,a,e,k,h,o,m,q,n,v){function y(A,C){b("div.status").addClass("hidden");b("#"+A).removeClass("hidden");C&&b("#"+A+" .message").text(C)}function x(A,C,H){A.status===503?y("statusServerBusyClose"):y("statusServerError",H)}var E=h(),s=E.shortenPrefs,t=m(E.extensionVersion,"0.7.3")>-1,B=m(E.extensionVersion,
"0.7.4")>-1,F=q.queryToObject(location.href.split("#")[1]||"")||{},D=F.show==="new";e.addFn({domainType:function(A){return(A=n.domains[A.accounts[0].domain])?A.type:""},domainName:function(A){return(A=n.domains[A.accounts[0].domain])?A.name:""},accountName:function(A,C){return C.username&&C.username!==A?A+", "+C.username:A}});o.onChange();o(function(A){b(function(){var C="";A.forEach(function(H){var I=n.domainList.indexOf(H.accounts[0].domain);I!==-1&&n.domainList.splice(I,1);C+=e("#accountTemplate",
H)});if(C){b("#existingHeader").removeClass("hidden");b("#existing").append(C).removeClass("hidden")}C="";n.domainList.forEach(function(H){n.domains[H].domain=H;C+=e("#addTemplate",n.domains[H])});if(C){b("#availableHeader").removeClass("hidden");b("#available").append(C).removeClass("hidden")}D&&b(function(){b("li.newItem").animate({backgroundColor:"#ffff99"},200).delay(1E3).animate({backgroundColor:"#fafafa"},3E3)})})},x);b(function(){function A(){var j={};G.find(".error").addClass("hidden");b.each(G[0].elements,
function(l,p){l=b(p).val().trim();if(p.getAttribute("placeholder")===l)l="";p.value=l;if(p.value)j[p.name]=p.value});if(j.login&&j.apiKey)return j;else if(j.login&&!j.apiKey)b("#bitlyApiKeyMissing").removeClass("hidden");else j.apiKey&&!j.login&&b("#bitlyLoginMissing").removeClass("hidden");return null}function C(){G.find('[name="login"]').val("");G.find('[name="apiKey"]').val("");G.find('[name="domain"]').val("")}function H(j){b.each(G[0].elements,function(l,p){(l=j[p.getAttribute("name")])&&b(p).val(l)});
v(G[0])}function I(){g[0].checked=true;G.slideDown("100")}function K(){g[0].checked=false;G.slideUp("100",function(){G.css({display:"none"})})}function L(){C();delete E.shortenPrefs;K()}if(D){delete F.show;location.replace(location.href.split("#")[0]+"#"+q.objectToQuery(F))}var G=b("#shortenForm"),g=b("#bitlyCheckbox"),i;b(window).bind("load resize",function(){var j=b(window).height();b("#wrapper").css({"min-height":j})});if(s){s=JSON.parse(s);H(s);I()}else K();b("body").delegate("#bitlyCheckbox",
"click",function(){g[0].checked?I():L()}).delegate("#shortenForm","submit",function(j){var l=A();l?b.ajax({url:"http://api.bitly.com/v3/validate",type:"GET",data:{format:"json",login:l.login,x_login:l.login,x_apiKey:l.apiKey,apiKey:l.apiKey},dataType:"json",success:function(p){if(p.status_code===200&&p.data.valid)E.shortenPrefs=JSON.stringify(l);else{b("#bitlyNotValid").removeClass("hidden");delete E.shortenPrefs}},error:function(){b("#bitlyNotValid").removeClass("hidden");delete E.shortenPrefs}}):
L();j.preventDefault()}).delegate(".close","click",function(){window.close()}).delegate(".auth","click",function(j){j=j.target.getAttribute("data-domain");var l=n.domains[j].type;a(j,function(p){if(p)E.lastSelection=l;else y("statusOAuthFailed")})}).delegate(".refresh","click",function(){for(var j in n.domains)n.domains[j].clearCache(E);o.changed()}).delegate(".remove","click",function(j){var l=j.target,p=l.getAttribute("data-domain"),u=l.getAttribute("data-username");l=l.getAttribute("data-userid");
try{o.remove(p,l,u)}catch(r){o.clear()}j.preventDefault()}).delegate('#settings [type="checkbox"]',"click",function(j){var l=j.target;j=l.id;l=l.checked;E["prefs."+j]=l;opener&&!opener.closed&&k.pub("prefChanged",{name:j,value:l},opener)});i=(i=E["prefs.use_accel_key"])?JSON.parse(i):false;b("#use_accel_key")[0].checked=i||false;i=(i=E["prefs.bookmarking"])?JSON.parse(i):false;b("#bookmarking")[0].checked=i||false;b(function(){b(".overflow").textOverflow(null,true)});t&&b('li[data-tab="settings"]').removeClass("hidden");
B&&b('li[data-tab="advanced"]').removeClass("hidden");b("body").delegate("ul#tabs li","click",function(){var j=b(this),l=b("#"+j.attr("data-tab"));j.addClass("selected");j.siblings().removeClass("selected");if(l.is(":hidden")){l.fadeIn(200);l.siblings().fadeOut(0)}});window.onFeedLoad=function(j,l){var p,u,r;if(l&&l.feed&&l.feed.entries)for(j=0;r=l.feed.entries[j];j++)if(r.categories&&r.categories.indexOf("Sharing")!==-1){u=r.link;p=r.title;break}if(u){b("#newsFooter .headline").removeClass("invisible");
b("#rssLink").attr("href",u).text(p)}};i=document.createElement("script");i.charset="utf-8";i.async=true;i.src="http://www.google.com/uds/Gfeeds?v=1.0&callback=onFeedLoad&context=&output=json&q=http%3A%2F%2Fmozillalabs.com%2Fmessaging%2Ffeed%2F";b("head")[0].appendChild(i)})});