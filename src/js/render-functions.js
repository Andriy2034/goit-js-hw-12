import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img
              class="gallery-image"
              src="${webformatURL}"
              alt="${tags}"
              loading="lazy"
            />
            <div class="card-content">
              <div class="card-meta">
                <span class="card-label">Likes</span>
                <span class="card-value">${likes}</span>
              </div>
              <div class="card-meta">
                <span class="card-label">Views</span>
                <span class="card-value">${views}</span>
              </div>
              <div class="card-meta">
                <span class="card-label">Comments</span>
                <span class="card-value">${comments}</span>
              </div>
              <div class="card-meta">
                <span class="card-label">Downloads</span>
                <span class="card-value">${downloads}</span>
              </div>
            </div>
          </a>
        </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('is-visible');
}

export function hideLoader() {
  loader.classList.remove('is-visible');
}

export function showLoadMoreBtn() {
  loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('is-hidden');
}

export function toggleLoadMoreBtn(shouldShow) {
  if (shouldShow) {
    showLoadMoreBtn();
  } else {
    hideLoadMoreBtn();
  }
}
