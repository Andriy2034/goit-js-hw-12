import{a as b,S,i as c}from"./assets/vendor-DcHCnVjq.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(e){if(e.ep)return;e.ep=!0;const a=o(e);fetch(e.href,a)}})();const w="55989973-0c204e1f9b56f2479f06f3a7c";async function u(t,s=1){return(await b.get("https://pixabay.com/api/",{params:{key:w,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:15}})).data}const f=document.querySelector(".gallery"),p=document.querySelector(".loader"),E=new S(".gallery a",{captionsData:"alt",captionDelay:250});function m(t){const s=t.map(({webformatURL:o,largeImageURL:r,tags:e,likes:a,views:n,comments:v,downloads:L})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${r}">
            <img
              class="gallery-image"
              src="${o}"
              alt="${e}"
              loading="lazy"
            />
            <div class="card-content">
              <div class="card-meta">
                <span class="card-label">Likes</span>
                <span class="card-value">${a}</span>
              </div>
              <div class="card-meta">
                <span class="card-label">Views</span>
                <span class="card-value">${n}</span>
              </div>
              <div class="card-meta">
                <span class="card-label">Comments</span>
                <span class="card-value">${v}</span>
              </div>
              <div class="card-meta">
                <span class="card-label">Downloads</span>
                <span class="card-value">${L}</span>
              </div>
            </div>
          </a>
        </li>`).join("");f.insertAdjacentHTML("beforeend",s),E.refresh()}function O(){f.innerHTML=""}function g(){p.classList.add("is-visible")}function h(){p.classList.remove("is-visible")}const P=document.querySelector(".form"),l=document.querySelector(".load-more");let d="",i=1;const y=15;P.addEventListener("submit",q);l.addEventListener("click",R);l.classList.add("is-hidden");async function q(t){t.preventDefault();const s=t.currentTarget,o=s.elements["search-text"].value.trim();if(!o){c.error({message:"Please fill in the search field!",position:"topRight"});return}d=o,i=1,O(),l.classList.add("is-hidden"),g();try{const r=await u(d,i);if(r.hits.length===0){c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}m(r.hits),y*i>=r.totalHits||l.classList.remove("is-hidden")}catch(r){c.error({message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(r)}finally{h(),s.reset()}}async function R(){i+=1,g();try{const t=await u(d,i);m(t.hits),$(),i*y>=t.totalHits&&(l.classList.add("is-hidden"),c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{c.error({message:"Failed to load more images.",position:"topRight"})}finally{h()}}function $(){const t=document.querySelector(".gallery-item");if(!t)return;const s=t.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
