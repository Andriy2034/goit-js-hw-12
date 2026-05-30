import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  clearGallery,
  createGallery,
  hideLoader,
  showLoader,
  showLoadMoreBtn,
  hideLoadMoreBtn,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let page = 1;
const PER_PAGE = 15;

loadMoreBtn.addEventListener('click', onLoadMore);
hideLoadMoreBtn();

form.addEventListener('submit', onSearchSubmit);

async function onSearchSubmit(event) {
  event.preventDefault();

  const query = event.currentTarget.elements['search-text'].value.trim();

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
  hideLoadMoreBtn();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    if (!data.hits.length) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });

      return;
    }

    createGallery(data.hits);

    const isEnd = PER_PAGE >= data.totalHits;

    if (isEnd) {
      hideLoadMoreBtn();

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreBtn();
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error(error);
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  page += 1;

  hideLoadMoreBtn(); 
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    createGallery(data.hits);

    smoothScroll();

    const isEnd = page * PER_PAGE >= data.totalHits;

    if (isEnd) {
      hideLoadMoreBtn();

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreBtn();
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
  const item = document.querySelector('.gallery-item');

  if (!item) return;

  const height = item.getBoundingClientRect().height;

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
