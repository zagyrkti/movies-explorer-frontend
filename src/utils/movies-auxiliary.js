import { BEATFILM_API_URL } from '../constants/constants';

function limitedRandomNumbers(max) { // min and max included
  const randomNumbers = [];
  while(randomNumbers.length < 7){
    const randomNumber = Math.floor(Math.random() * max);
    if(randomNumbers.indexOf(randomNumber) === -1) randomNumbers.push(randomNumber);
  }
  return randomNumbers
}

function randomSeven(moviesList) {
  const randomNumbers = limitedRandomNumbers(moviesList.length);
  const sevenMovies = [];
  for (let i = 0; i < 7; i++) {
    sevenMovies.push(moviesList[randomNumbers[i]])
  }
  return sevenMovies;
}

const searchMovies = (moviesList, searchQuery) => {
  return moviesList.filter((movie) => (
          movie.nameRU?.toLowerCase().includes(searchQuery.toLowerCase())
          || movie.nameEN?.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );
};

/*const savePageState = (searchFormState, searchResult) => {
  if (searchFormState) {
    localStorage.setItem('searchFormState', JSON.stringify(searchFormState));
  }
  if (searchResult) {
    localStorage.setItem('searchResult', JSON.stringify(searchResult));
  }
};*/

const savePageState = () => {
  const getFormState = () => {
    return localStorage.getItem('searchFormState') ? JSON.parse(localStorage.getItem('searchFormState')) : {};
  }
  const saveFormState = (stateToSave) => {
    if (typeof stateToSave === 'function') {
      const result = stateToSave(getFormState());
      localStorage.setItem('searchFormState', JSON.stringify(result))
      return;
    }
    localStorage.setItem('searchFormState', JSON.stringify(stateToSave))
  }

  const saveSearchResult = (searchResult) => {
    localStorage.setItem('searchResult', JSON.stringify(searchResult));
  }

  return [saveFormState, saveSearchResult];
};

const restorePageState = (searchFormStateSetter, searchResultSetter) => {
  if (localStorage.getItem('searchFormState')) {
    const reviver = (key, value) => value === "true" ? true : value === "false" ? false : value;
    const searchFormState = JSON.parse(localStorage.getItem('searchFormState'), reviver);
    if (searchFormState.query) {
      searchFormStateSetter(searchFormState)
      const results = JSON.parse(localStorage.getItem('searchResult'))
      results.length ? searchResultSetter(results) : searchResultSetter([])
    }
  }
};

const filterShortMovies = (movies) => {
  return movies.filter((movie) => movie.duration < 40)
}

function isURL(url) {
  return /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/.test(url);
}

const convertBeatfilmMovieToServerFormat = (movie) => {
  const imageURL = `${BEATFILM_API_URL}${movie.image.url}`;

  const thumbnailURL = `${BEATFILM_API_URL}${movie.image.formats.thumbnail.url}`;

  const nameRU = movie.nameRU;
  const nameEN = movie.nameEN ? movie.nameEN : movie.nameRU;
  const { description, duration } = movie;
  const { director, year } = movie;
  const country = movie.country ? movie.country : 'n/a'
  const movieId = movie.id;

  const image = isURL(imageURL) ? imageURL : `${BEATFILM_API_URL}/uploads/maxresdefault_2_4747cae75c.jpeg`;
  const thumbnail = isURL(thumbnailURL) ? thumbnailURL : `${BEATFILM_API_URL}/uploads/maxresdefault_2_4747cae75c.jpeg`;
  const trailer = isURL(movie.trailerLink) ? movie.trailerLink : 'https://youtube.com';

  return {
    movieId,
    nameRU,
    nameEN,
    director,
    country,
    year,
    duration,
    description,
    image,
    thumbnail,
    trailer,
  }
}

const isMovieBeatfilApiMovie = (movie) => {
  return !!movie.created_at
}

function convertMinsToHrsMins (mins) {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  m = m < 10 ? '0' + m : m;
  return `${h}:${m}`;
}

const searchForCopyInSaved = (movie, savedMovies) => {
  const result = savedMovies.find((savedMovie) => movie.id === savedMovie.movieId)
  return result ? result : null;
}

const getUnifiedProperties = (movieData, isMovieBelongsToBeatfilmApi) => {
  const title = movieData.nameRU;
  const { description, duration } = movieData;
  const { director, country, year } = movieData;

  let imgUrl = '';
  let trailerLink = '';
  if (isMovieBelongsToBeatfilmApi) {
    imgUrl = `https://api.nomoreparties.co/${movieData.image.url}`;
    trailerLink = isURL(movieData.trailerLink) ? movieData.trailerLink : 'https://youtube.com';
  } else {
    imgUrl = movieData.image;
    trailerLink = isURL(movieData.trailer) ? movieData.trailer : 'https://youtube.com';
  }
  return [title, description, duration, director, country, year, imgUrl, trailerLink]
}

export {
  searchMovies,
  savePageState,
  restorePageState,
  filterShortMovies,
  isURL,
  convertBeatfilmMovieToServerFormat,
  isMovieBeatfilApiMovie,
  convertMinsToHrsMins,
  searchForCopyInSaved,
  randomSeven,
  getUnifiedProperties,
}