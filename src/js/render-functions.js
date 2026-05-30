import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

export const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function clearGallery() {
  gallery.innerHTML = '';
}

export function createGallery(images) {
  const markup = images
    .map(
      img => `
      <li class="gallery-item">
        <a href="${img.largeImageURL}">
          <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy"/>
          
          <div class="card-content">
              <div class="card-meta">
                <span class="card-label">Likes</span>
                <span class="card-value">${img.likes}</span>
              </div>
              <div class="card-meta">
                <span class="card-label">Views</span>
                <span class="card-value">${img.views}</span>
              </div>
              <div class="card-meta">
                <span class="card-label">Comments</span>
                <span class="card-value">${img.comments}</span>
              </div>
              <div class="card-meta">
                <span class="card-label">Downloads</span>
                <span class="card-value">${img.downloads}</span>
              </div>
            </div>
        </a>
      </li>
    `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

export function showLoadMoreBtn() {
  loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('is-hidden');
}

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
}

export function scrollByCards() {
  const card = document.querySelector('.gallery-item');

  if (!card) return;

  const height = card.getBoundingClientRect().height;

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
