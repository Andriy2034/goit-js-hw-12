import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  clearGallery,
  createGallery,
  hideLoader,
  showLoader,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let page = 1;
const PER_PAGE = 15;

form.addEventListener('submit', onSearchSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);
loadMoreBtn.classList.add('is-hidden');

async function onSearchSubmit(event) {
  event.preventDefault();

  const searchForm = event.currentTarget;
  const query = searchForm.elements['search-text'].value.trim();

  if (!query) {
    iziToast.error({
      message: 'Please fill in the search field!',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  page = 1;

  clearGallery();
  loadMoreBtn.classList.add('is-hidden');
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    const isEndOfCollection = PER_PAGE * page >= data.totalHits;

    if (!isEndOfCollection) {
      loadMoreBtn.classList.remove('is-hidden');
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error(error);
  } finally {
    hideLoader();
    searchForm.reset();
  }
}

async function onLoadMore() {
  page += 1;

  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    createGallery(data.hits);
    smoothScroll();

    const isEndOfCollection = page * PER_PAGE >= data.totalHits;

    if (isEndOfCollection) {
      loadMoreBtn.classList.add('is-hidden');

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Failed to load more images.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

function smoothScroll() {
  const galleryItem = document.querySelector('.gallery-item');

  if (!galleryItem) return;

  const cardHeight = galleryItem.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
