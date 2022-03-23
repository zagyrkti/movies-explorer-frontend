import './movies.css'
import Search from '../../components/search/search';
import MoviesList from '../../components/movies-list/movies-list';
import More from '../../components/more/more';
import ToggleSwitch from '../../components/toggle-switch/toggle-switch';
import { useEffect, useMemo, useState } from 'react';
import Preloader from '../../components/preloader/preloader';
import getBeatfilmMoviesRequest from '../../utils/movies-api';
import useForm from '../../utils/use-form';
import {
  filterShortMovies,
  randomSeven,
  restorePageState,
  savePageState,
  searchMovies
} from '../../utils/movies-auxiliary';
import NothingFound from '../../components/nothing-found/nothing-found';
import { MOVIES_INITIAL_FORM_STATE } from '../../utils/constants';

function Movies() {
  const { values, handleChange, resetForm, errors, isValid, setValues } = useForm(MOVIES_INITIAL_FORM_STATE);

  const [maxMoviesToRender, setMaxMoviesToRender] = useState(7)
  const [isMoreButtonShown, setIsMoreButtonShown] = useState(false)
  const [isNothingFound, setIsNothingFound] = useState(false);
  const [isBeatfilmMoviesRequestFailed, setIsBeatfilmMoviesRequestFailed] = useState(false);
  const [movies, setMovies] = useState([]);

  const [isBeatfilmMoviesRequestSent, setIsBeatfilmMoviesRequestSent] = useState(false);

  const [searchResult, setSearchResult] = useState([]);
  const [moviesToRender, setMoviesToRender] = useState([]);

  const resetStateBeforeSearch = () => {
    setMoviesToRender([]);
    setSearchResult([]);
    setMaxMoviesToRender(7);
    setIsMoreButtonShown(false)
    setIsNothingFound(false)
    setIsBeatfilmMoviesRequestFailed(false)
  }

  /*    const movieDataSource = () => {
        return (movies.length ? Promise.resolve(movies) : getBeatfilmMoviesRequest())
            .then((moviData) => {
              if (!movies.length) {
                setMovies(moviData);
                return moviData;
              }
              return moviData;
            })
      }

      const handleSearch = (event) =>  {
        event.preventDefault();
        resetStateBeforeSearch();
        setIsBeatfilmMoviesRequestSent(true);
        movieDataSource()
            .then((moviesData) => {
              let results = [];
              if (values.query === 'rnd7' && moviesData.length >= 7) {
                results = randomSeven(moviesData);
              } else {
                results = searchMovies(moviesData, values.query);
              }
              results.length ? setSearchResult(results) : setIsNothingFound(true);
              savePageState(values, results);
            })
            .catch((error) => {
              console.log(`%cCatch ${error}`, 'color: red');
              setIsBeatfilmMoviesRequestFailed(true);
            })
            .finally(() => {
            setIsBeatfilmMoviesRequestSent(false)
          })
      }*/

  /* Запросы при каждом поиске */
  /* А то так совсем не интересно + нельзя гарантировать что список фильмов не сервере не поменялся */
  /* Прелоадер опять же делал старался, а он сам себя не покажет ) */
  /* Примерная реализация без дозапросов выше, вроде работает(кнопка сохранить сама о себе заботится) */

  const handleSearch = (event) => {
    event.preventDefault();
    if (isBeatfilmMoviesRequestSent) {
      return;
    }
    if (!values.query) {
      setValues((prevState) => ({ ...prevState, query: 'Введите запрос' }))
      return;
    }
    resetStateBeforeSearch();
    setIsBeatfilmMoviesRequestSent(true);
    getBeatfilmMoviesRequest()
        .then((moviesData) => {
          let results = [];
          if (values.query === 'rnd7' && moviesData.length >= 7) {
            results = randomSeven(moviesData);
          } else {
            results = searchMovies(moviesData, values.query);
          }
          results.length ? setSearchResult(results) : setIsNothingFound(true);
          savePageState(values, results);
        })
        .catch((error) => {
          console.log(`%cCatch getBeatfilmMovies ${error}`, 'color: red');
          setIsBeatfilmMoviesRequestFailed(true);
        })
        .finally(() => {
          setIsBeatfilmMoviesRequestSent(false)
        })
  }

  const handleShowMore = () => {
    setMaxMoviesToRender((prevState) => prevState + 7);
  }

  useEffect(() => {
    if (searchResult.length) {
      if (!values.switch) {
        const limitedSearchResult = searchResult.slice(0, maxMoviesToRender);
        setIsMoreButtonShown(limitedSearchResult.length < searchResult.length)
        setMoviesToRender(limitedSearchResult);
        return;
      }
      const shortsSearchResult = filterShortMovies(searchResult);
      const limitedShortSearchResult = shortsSearchResult.slice(0, maxMoviesToRender);
      setIsMoreButtonShown(limitedShortSearchResult.length < shortsSearchResult.length)
      setMoviesToRender(filterShortMovies(searchResult));
    }
  }, [searchResult, values.switch, maxMoviesToRender])

  useEffect(() => {
    restorePageState(setValues, setSearchResult);
  }, [])

  const moviesList = useMemo(() => <MoviesList className={'movies__movies-list'}
                                               movies={moviesToRender} />, [moviesToRender])

  return (
      <main className='movies'>
        <Search className={'movies__search'} onSearch={handleSearch} onChange={handleChange} values={values} />
        <ToggleSwitch className={'movies__switch'} onChange={handleChange} values={values} />
        {isBeatfilmMoviesRequestSent &&
            <Preloader />
        }
        {!isBeatfilmMoviesRequestSent &&
            <>
              {moviesList}
              {isMoreButtonShown &&
                  <More className={'movies__more'} onClick={handleShowMore} />
              }
            </>
        }
        {isBeatfilmMoviesRequestFailed &&
            <p className='movies__error'>Ошибка при выполнении запроса</p>
        }
        {isNothingFound &&
            <NothingFound />
        }
        {!isNothingFound && !isBeatfilmMoviesRequestSent && !moviesToRender.length && !isBeatfilmMoviesRequestFailed &&
            <p className='movies__intro'>Поисковик по каталогу Beat Film Festival</p>
        }
      </main>
  )
}

export default Movies;