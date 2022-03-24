import { BEATFILM_API_URL } from '../constants/constants';

const getBeatfilmMoviesRequest = () => {
  return fetch(`${BEATFILM_API_URL}/beatfilm-movies`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export default getBeatfilmMoviesRequest;