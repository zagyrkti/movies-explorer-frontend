const BEATFILM_API_URL = 'https://api.nomoreparties.co'

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