import{a as b,S as w,i as o}from"./assets/vendor-DcHCnVjq.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&c(d)}).observe(document,{childList:!0,subtree:!0});function e(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function c(t){if(t.ep)return;t.ep=!0;const a=e(t);fetch(t.href,a)}})();const S="55989973-0c204e1f9b56f2479f06f3a7c",q="https://pixabay.com/api/";async function p(s,r=1,e=15){return(await b.get(q,{params:{key:S,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:e}})).data}const f=document.querySelector(".gallery"),h=document.querySelector(".load-more"),m=document.querySelector(".loader"),E=new w(".gallery a",{captionsData:"alt",captionDelay:250});function R(){f.innerHTML=""}function y(s){const r=s.map(e=>`
      <li class="gallery-item">
        <a href="${e.largeImageURL}">
          <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy"/>
          
          <div class="card-content">
              <div class="card-meta">
                <span class="card-label">Likes</span>
                <span class="card-value">${e.likes}</span>
              </div>
              <div class="card-meta">
                <span class="card-label">Views</span>
                <span class="card-value">${e.views}</span>
              </div>
              <div class="card-meta">
                <span class="card-label">Comments</span>
                <span class="card-value">${e.comments}</span>
              </div>
              <div class="card-meta">
                <span class="card-label">Downloads</span>
                <span class="card-value">${e.downloads}</span>
              </div>
            </div>
        </a>
      </li>
    `).join("");f.insertAdjacentHTML("beforeend",r),E.refresh()}function g(){h.classList.remove("is-hidden")}function i(){h.classList.add("is-hidden")}function v(){m.classList.remove("is-hidden")}function L(){m.classList.add("is-hidden")}function B(){const s=document.querySelector(".gallery-item");if(!s)return;const r=s.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}const M=document.querySelector(".form"),P=document.querySelector(".load-more");let u="",n=1;const l=15;i();M.addEventListener("submit",$);P.addEventListener("click",O);async function $(s){s.preventDefault();const r=s.currentTarget.elements["search-text"].value.trim();if(!r){o.error({message:"Please fill in the search field!",position:"topRight"});return}u=r,n=1,R(),i(),v();try{const e=await p(u,n,l);if(!e.hits.length){o.error({message:"Sorry, there are no images matching your search query.",position:"topRight"});return}y(e.hits),l*n>=e.totalHits?(i(),o.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):g()}catch{o.error({message:"Something went wrong. Try again later.",position:"topRight"})}finally{L()}}async function O(){n+=1,i(),v();try{const s=await p(u,n,l);y(s.hits),B(),n*l>=s.totalHits?(i(),o.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):g()}catch{o.error({message:"Failed to load more images.",position:"topRight"})}finally{L()}}
//# sourceMappingURL=index.js.map
