import axios from 'axios';

const API_KEY = '55989973-0c204e1f9b56f2479f06f3a7c';

export async function getImagesByQuery(query, page = 1) {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: 15,
    },
  });

  return response.data;
}
