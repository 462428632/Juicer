(function(){var a=function(){var b=[].slice.call(arguments);b.push(a.options);if(arguments.length==1){return a.compile.apply(a,b);}if(arguments.length>=2){return a.to_html.apply(a,b);}};this.__escapehtml={__escapehash:{"<":"&lt;",">":"&gt;",'"':"&quot;","&":"&amp;"},__escapereplace:function(b){return __escapehtml.__escapehash[b];},__escape:function(b){return typeof(b)!=="string"?b:b.replace(/[&<>"]/igm,__escapehtml.__escapereplace);},__detection:function(b){return typeof(b)==="undefined"?"":b;}};a.__cache={};a.version="0.3.0-dev";a.settings={forstart:/{@each\s*([\w\.]*?)\s*as\s*(\w*?)(,\w*?)?}/igm,forend:/{@\/each}/igm,ifstart:/{@if\s*([^}]*?)}/igm,ifend:/{@\/if}/igm,elsestart:/{@else}/igm,interpolate:/\${([\s\S]+?)}/igm,noneencode:/\$\${([\s\S]+?)}/igm,inlinecomment:/{#[^}]*?}/igm,rangestart:/{@each\s*(\w*?)\s*in\s*range\((\d+?),(\d+?)\)}/igm};a.options={cache:true,strip:true,errorhandling:true};a.set=function(b,c){this.options[b]=c;};a.template=function(){var b=this;this.__interpolate=function(d,g,e){var c=d.split("|"),f="";if(c.length>1){d=c.shift();f=c.shift();}return"<%= "+(g?"__escapehtml.__escape":"")+"("+(!e||e.detection!==false?"__escapehtml.__detection":"")+"("+f+"("+d+"))) %>";};this.__shell=function(d,c){var e=0;d=d.replace(a.settings.forstart,function(j,g,i,h){var i=i||"value",h=h&&h.substr(1);var f="i"+e++;return"<% for(var "+f+"=0,l="+g+".length;"+f+"<l;"+f+"++) {var "+i+"="+g+"["+f+"];"+(h?("var "+h+"="+f+";"):"")+" %>";}).replace(a.settings.forend,"<% } %>").replace(a.settings.ifstart,function(f,g){return"<% if("+g+") { %>";}).replace(a.settings.ifend,"<% } %>").replace(a.settings.elsestart,function(f){return"<% } else { %>";}).replace(a.settings.noneencode,function(g,f){return b.__interpolate(f,false,c);}).replace(a.settings.interpolate,function(g,f){return b.__interpolate(f,true,c);}).replace(a.settings.inlinecomment,"").replace(a.settings.rangestart,function(i,h,j,f){var g="j"+e++;return"<% for(var "+g+"=0;"+g+"<"+(f-j)+";"+g+"++) {var "+h+"="+g+"; %>";});if(!c||c.errorhandling!==false){d="<% try { %>"+d+'<% } catch(e) {console && console.warn("Juicer Render Exception: "+e.message);} %>';}return d;};this.__pure=function(d,c){return this.__convert(d,!c||c.strip);};this.__lexical=function(e){var d=[];var h="";var g=function(j,l){for(var k=0;k<j.length;k++){if(j[k]==l){return k;}}return -1;};var c=function(j,i){i=i.match(/\w+/igm)[0];(d.indexOf?d.indexOf(i):g(d,i))===-1&&d.push(i);};e.replace(a.settings.forstart,c).replace(a.settings.interpolate,c).replace(a.settings.ifstart,c);for(var f=0;f<d.length;f++){h+="var "+d[f]+"=data."+d[f]+";";}return"<% "+h+" %>";};this.__convert=function(d,e){var c=[].join("");c+="var data=data||{};";c+="var out='';out+='";if(e!==false){c+=d.replace(/\\/g,"\\\\").replace(/[\r\t\n]/g," ").replace(/'(?=[^%]*%>)/g,"\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g,"';out+=$1;out+='").split("<%").join("';").split("%>").join("out+='")+"';return out;";}else{c+=d.replace(/\\/g,"\\\\").replace(/[\r]/g,"\\r").replace(/[\t]/g,"\\t").replace(/[\n]/g,"\\n").replace(/'(?=[^%]*%>)/g,"\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g,"';out+=$1;out+='").split("<%").join("';").split("%>").join("out+='")+"';return out.replace(/[\\r\\n]\\t+[\\r\\n]/g,'\\r\\n');";}return c;};this.parse=function(d,c){if(!c||c.loose!==false){d=this.__lexical(d)+d;}d=this.__shell(d,c);d=this.__pure(d,c);d='"use strict";'+d;this.render=new Function("data",d);return this;};};a.compile=function(c,b){try{var d=this.__cache[c]?this.__cache[c]:new this.template().parse(c,b);if(!b||b.cache!==false){this.__cache[c]=d;}return d;}catch(f){console&&console.warn("Juicer Compile Exception: "+f.message);return{render:function(){}};}};a.to_html=function(c,d,b){return this.compile(c,b).render(d);};typeof(module)!=="undefined"&&module.exports?module.exports=a:this.juicer=a;})();