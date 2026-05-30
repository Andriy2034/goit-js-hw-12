import{S as u,a as q,i as s}from"./assets/vendor-DcHCnVjq.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(e){if(e.ep)return;e.ep=!0;const a=o(e);fetch(e.href,a)}})();const E="55989973-0c204e1f9b56f2479f06f3a7c";async function m(t,r=1){return(await q.get("https://pixabay.com/api/",{params:{key:E,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15}})).data}document.querySelector(".gallery");document.querySelector(".loader");document.querySelector(".load-more");new u(".gallery a",{captionsData:"alt",captionDelay:250});const p=document.querySelector(".gallery"),f=document.querySelector(".loader"),y=document.querySelector(".load-more"),P=new u(".gallery a",{captionsData:"alt",captionDelay:250});function h(t){const r=t.map(({webformatURL:o,largeImageURL:n,tags:e,likes:a,views:i,comments:S,downloads:w})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${n}">
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
                <span class="card-value">${i}</span>
              </div>
              <div class="card-meta">
                <span class="card-label">Comments</span>
                <span class="card-value">${S}</span>
              </div>
              <div class="card-meta">
                <span class="card-label">Downloads</span>
                <span class="card-value">${w}</span>
              </div>
            </div>
          </a>
        </li>`).join("");p.insertAdjacentHTML("beforeend",r),P.refresh()}function M(){p.innerHTML=""}function g(){f.classList.add("is-visible")}function v(){f.classList.remove("is-visible")}function L(){y.classList.remove("is-hidden")}function l(){y.classList.add("is-hidden")}const R=document.querySelector(".form"),$=document.querySelector(".load-more");let d="",c=1;const b=15;$.addEventListener("click",D);l();R.addEventListener("submit",B);async function B(t){t.preventDefault();const r=t.currentTarget.elements["search-text"].value.trim();if(!r){s.error({message:"Please fill in the search field!",position:"topRight"});return}d=r,c=1,M(),l(),g();try{const o=await m(d,c);if(!o.hits.length){s.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}h(o.hits),b>=o.totalHits?(l(),s.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):L()}catch(o){s.error({message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(o)}finally{v()}}async function D(){c+=1,l(),g();try{const t=await m(d,c);h(t.hits),O(),c*b>=t.totalHits?(l(),s.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):L()}catch{s.error({message:"Failed to load more images.",position:"topRight"})}finally{v()}}function O(){const t=document.querySelector(".gallery-item");if(!t)return;const r=t.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
