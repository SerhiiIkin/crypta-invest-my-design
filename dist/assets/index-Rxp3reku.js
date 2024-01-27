(function(){const m=document.createElement("link").relList;if(m&&m.supports&&m.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))E(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const h of o.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&E(h)}).observe(document,{childList:!0,subtree:!0});function L(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function E(a){if(a.ep)return;a.ep=!0;const o=L(a);fetch(a.href,o)}})();const z=document.querySelector(".header__menu"),k=document.querySelector(".header__burger");k.addEventListener("click",K);function K(){z.classList.toggle("active"),k.classList.toggle("active")}function R({selector:v}){const m=document.querySelector(v),L=m.querySelectorAll("input"),E=m.querySelector("button[type=reset]"),a=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,o=document.createElement("div");o.classList.add("error");const h=m.querySelector("textarea"),g={};E&&E.addEventListener("click",()=>{L.forEach(i=>{i.classList.remove("invalid"),i.nextElementSibling&&i.nextElementSibling.remove()})}),m.addEventListener("submit",x),L.forEach(i=>{i.addEventListener("input",l),i.addEventListener("focusout",e)});function b(i){a.test(i.value)?(i.nextElementSibling&&i.nextElementSibling.remove(),i.classList.remove("invalid")):a.test(i.value)||(o.textContent="invalid email",i.classList.add("invalid"),!i.nextElementSibling&&i.insertAdjacentElement("afterend",o.cloneNode(!0)))}function u(i){i.value.length>2?(i.nextElementSibling&&i.nextElementSibling.remove(),i.classList.remove("invalid")):(o.textContent="too short",!i.nextElementSibling&&i.insertAdjacentElement("afterend",o.cloneNode(!0)),i.classList.add("invalid"))}function e(i){i.target.getAttribute("name")==="email"?b(i.target):u(i.target)}function l(i){i.target.getAttribute("name")==="email"?b(i.target):u(i.target)}function x(i){i.preventDefault(),L.forEach(p=>{g[p.getAttribute("name")]=p.value,p.getAttribute("name")==="email"?b(p):u(p)}),g[h.getAttribute("name")]=h.value,i.target.querySelectorAll(".error").length===0?console.table(g):console.error("cant send data")}}function G({selector:v,draggable:m,buttons:L,paggination:E,interval:a,slidesPerView:o=1,breakpoints:h,effect:g}){const b=document.querySelector(v),u=b.querySelector("div"),e=u.querySelector("div"),l=e.children,x=[...l],i=l.length;let y=!1,p,B,c=0,X;const I="active",w="show";if(P(),L&&F(),E&&M(),a&&q(),m&&!g&&(u.classList.add("draggable"),u.addEventListener("mousedown",T),u.addEventListener("touchstart",T)),g||(e.insertBefore(l[l.length-1],l[0]),e.style.transform="translateX(-100%)"),g==="cube"&&e.insertBefore(l[l.length-1],l[0]),o>1&&H(o),h)for(let t=0;t<Object.keys(h).length;t++){const s=Object.entries(h)[t];+s[0]<=window.innerWidth&&(o=s[1].slidesPerView,H(o))}let $=[...l].reduce((t,s)=>t.offsetHeight>s.offsetHeight?t.offsetHeight:s.offsetHeight);u.style.height=$+80+"px",window.addEventListener("resize",t=>{const s=t.target.outerWidth;$=[...l].reduce((n,f)=>n.offsetHeight>f.offsetHeight?n.offsetHeight:f.offsetHeight),u.style.height=$+80+"px",h&&Object.entries(h).forEach(n=>{+n[0]-20<=s&&s<=+n[0]+20&&(o=n[1].slidesPerView,H(o))})});function F(){const t=document.createElement("button");t.setAttribute("type","button");const s=t.cloneNode(!0);u.append(s),u.append(t),t.classList.add("slider-btn__left"),s.classList.add("slider-btn__right"),s.addEventListener("click",()=>S("right")),t.addEventListener("click",()=>S("left"))}function M(){const t=document.createElement("div");t.classList.add("pagination"),u.append(t);for(let s=0;s<l.length;s++){const n=document.createElement("button");n.setAttribute("type","button"),n.classList.add("pagination__btn"),n.textContent=`${s+1}`,t.append(n),n.addEventListener("click",()=>j(s))}C()}function W(){const t=u.querySelector(".pagination"),s=[];for(let n=0;n<l.length;n++){const f=document.createElement("button");f.setAttribute("type","button"),f.classList.add("pagination__btn"),f.textContent=`${n+1}`,s.push(f),f.addEventListener("click",()=>j(n))}c=0,t.replaceChildren(...s),C()}function j(t){N();const s=l.length,n=(t-c+s)%s,f=(c-t+s)%s,d=n<=f?n:-f;if(d>0)if(!g)e.style.translate=`${-100*d}% `,e.style.transition="translate 1s ease-in-out",setTimeout(()=>{e.style.transition="none",e.style.translate="none";for(let r=0;r<d;r++)e.appendChild(e.firstElementChild.cloneNode(!0)),e.removeChild(e.firstElementChild),c=(c+1)%l.length,C()},1001);else for(let r=0;r<d;r++)S("right");else if(g)S("left");else{e.style.translate=`${100*d}% `;for(let r=0;r<-d;r++)e.insertBefore(e.children[e.children.length-r-1].cloneNode(!0),e.firstElementChild);e.offsetWidth,e.style.transition="translate 1s ease-in-out",e.style.translate="none";for(let r=0;r<-d;r++)e.removeChild(e.lastElementChild);for(let r=0;r<-d;r++)c=(c-1+l.length)%l.length,C();setTimeout(()=>{e.style.transition="none"},1001)}q()}function C(){const s=[...u.querySelector(".pagination").children],n=s[c];let f;h&&(f=Object.keys(h)[1]),s.length<7?n&&(s.forEach((d,r)=>{d.classList.remove(I),r!=0&&r!=s.length-1&&d.classList.remove(w)}),n.classList.add(I),n.classList.add(w),n.nextSibling&&n.nextSibling.classList.add(w),n.previousSibling&&n.previousSibling.classList.add(w)):(s.forEach((d,r)=>{d.classList.remove(I),r!=0&&r!=s.length-1&&d.classList.add("hide")}),n.classList.add(I),n.classList.remove("hide"),n.nextSibling&&n.nextSibling.classList.remove("hide"),n.previousSibling&&n.previousSibling.classList.remove("hide"),window.innerWidth<f&&(n.classList.remove("right-points"),n.classList.remove("left-points"),c>=3&&c<=s.length-4?(n.nextSibling.classList.add("right-points"),n.previousSibling.classList.add("left-points"),n.previousSibling.classList.remove("right-points")):c<3?(n.nextSibling&&n.nextSibling.classList.add("right-points"),n.previousSibling&&n.previousSibling.classList.remove("right-points")):c>=s.length-4&&n.previousSibling.classList.add("left-points")))}function T(t){N(),y=!0,p=t.type.startsWith("touch")?t.touches[0].clientX:t.clientX,document.addEventListener("mousemove",A),document.addEventListener("touchmove",A),document.addEventListener("mouseup",_),document.addEventListener("touchend",_)}function A(t){if(!y)return;B=(t.type.startsWith("touch")?t.touches[0].clientX:t.clientX)-p,e.style.translate=`${B}px`}function _(t){if(!y)return;y=!1;const s=t.type.startsWith("touch")?t.changedTouches[0].clientX:t.clientX;document.removeEventListener("mousemove",A),document.removeEventListener("touchmove",A),document.removeEventListener("mouseup",_),document.removeEventListener("touchend",_),Math.abs(p-s)>100?p<s?S("left"):p>s&&S("right"):e.style.translate="none",q()}function S(t){N(),g?(t==="left"?(e.insertBefore(e.lastElementChild.cloneNode(!0),e.firstElementChild),e.removeChild(e.lastElementChild),c=(c-1+l.length)%l.length):(e.appendChild(e.firstElementChild.cloneNode(!0)),e.removeChild(e.firstElementChild),c=(c+1)%l.length),C()):(e.style.transition="translate 1s ease-in-out",t==="left"&&(e.style.translate=`${u.offsetWidth}px`),t==="right"&&(e.style.translate=`${-u.offsetWidth}px`),setTimeout(()=>{e.style.translate="none",e.style.transition="none",t==="left"?(e.insertBefore(e.lastElementChild.cloneNode(!0),e.firstElementChild),e.removeChild(e.lastElementChild),c=(c-1+l.length)%l.length):(e.appendChild(e.firstElementChild.cloneNode(!0)),e.removeChild(e.firstElementChild),c=(c+1)%l.length),C()},1001)),q()}function q(){a>=2e3&&!isNaN(a)?D():N()}function D(){X=setInterval(()=>{e.style.translate="-100%",S("right")},a)}function N(){clearInterval(X)}function H(t){var n;let s=0;if(t>1){const f=[];for(let d=0;d<Math.ceil(i/t);d++){const r=document.createElement("div");for(let O=0;O<t;O++)((n=x[s+O])==null?void 0:n.dataset.index)!==void 0&&r.append(x[s+O].cloneNode(!0));s+=t,f.push(r)}e.replaceChildren(...f),f.forEach(d=>{d.classList.add("slide-wrapper"),[...d.children].forEach(r=>r.style.flex=`0 0 ${100/t}%`)}),e.insertBefore(l[l.length-1],l[0]),e.style.transform="translateX(-100%)",W()}else e.replaceChildren(...x),e.insertBefore(l[l.length-1],l[0]),e.style.transform="translateX(-100%)",W()}function P(){switch(b.classList.value=`slider ${b.classList.value}`,u.classList.value=`slider__container ${u.classList.value}`,e.classList.value=`slider__wrapper ${e.classList.value}`,g){case"card":e.classList.add("card");break;case"cube":e.classList.add("cube");break}[...l].forEach((t,s)=>{switch(t.classList.value=`slide ${t.classList.value}`,t.setAttribute("data-index",s),g){case"card":t.classList.add("card","hide");break;case"cube":t.classList.add("cube","hide");break}})}}const J=document.querySelectorAll(".card"),Q=document.querySelector(".form"),U=new IntersectionObserver(v=>{v.forEach(m=>{m.target.classList.toggle("show",m.isIntersecting)})},{threshold:.5,rootMargin:"-50px"}),Y=new IntersectionObserver(v=>{v[0].target.classList.toggle("show",v[0].isIntersecting)},{threshold:.5});J.forEach(v=>{U.observe(v)});Y.observe(Q);const Z={selector:".my-slider",draggable:!0,buttons:!0,paggination:!0,interval:0,slidesPerView:1},V={selector:".form"};G(Z);R(V);
