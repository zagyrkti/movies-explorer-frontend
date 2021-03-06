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
import {
  MOVIES_INITIAL_FORM_STATE,
  MOVIES_TO_RENDER_LIMITS,
  RANDOM_MOVIES_SAFETY_LIMIT
} from '../../constants/constants';

function Movies() {
  const { values, handleChange, resetForm, errors, isValid, setValues } = useForm(MOVIES_INITIAL_FORM_STATE);

  const [maxMoviesToRender, setMaxMoviesToRender] = useState(MOVIES_TO_RENDER_LIMITS.initial)
  const [isMoreButtonShown, setIsMoreButtonShown] = useState(false)
  const [isNothingFound, setIsNothingFound] = useState(false);
  const [isBeatfilmMoviesRequestFailed, setIsBeatfilmMoviesRequestFailed] = useState(false);

  const [isBeatfilmMoviesRequestSent, setIsBeatfilmMoviesRequestSent] = useState(false);

  const [searchResult, setSearchResult] = useState([]);
  const [moviesToRender, setMoviesToRender] = useState([]);

  const resetStateBeforeSearch = () => {
    setMoviesToRender([]);
    setSearchResult([]);
    setMaxMoviesToRender(MOVIES_TO_RENDER_LIMITS.initial);
    setIsMoreButtonShown(false)
    setIsNothingFound(false)
    setIsBeatfilmMoviesRequestFailed(false)
  }

  const movieDataSource = () => {
    const beatFilmMoviesInStore = JSON.parse(localStorage.getItem('beatFilmMovies'));
    return (beatFilmMoviesInStore ? Promise.resolve(beatFilmMoviesInStore) : getBeatfilmMoviesRequest())
        .then((moviData) => {
          if (!beatFilmMoviesInStore) {
            localStorage.setItem('beatFilmMovies', JSON.stringify(moviData));
            return moviData;
          }
          return moviData;
        })
  }

  const handleSearch = (event) => {
    event.preventDefault();
    if (isBeatfilmMoviesRequestSent) {
      return;
    }
    if (!values.query) {
      setValues((prevState) => ({ ...prevState, query: '?????????????? ????????????' }))
      return;
    }
    resetStateBeforeSearch();
    setIsBeatfilmMoviesRequestSent(true);
    movieDataSource()
        .then((moviesData) => {
          let results = [];
          if (values.query === 'rnd7' && moviesData.length >= RANDOM_MOVIES_SAFETY_LIMIT) {
            results = randomSeven(moviesData);
          } else {
            results = searchMovies(moviesData, values.query);
          }
          results.length ? setSearchResult(results) : setIsNothingFound(true);
          const [saveFormState, saveSearchResult] = savePageState();
          saveFormState(values);
          saveSearchResult(results);
        })
        .catch((error) => {
          console.log(`%cCatch ${error}`, 'color: red');
          setIsBeatfilmMoviesRequestFailed(true);
        })
        .finally(() => {
          setIsBeatfilmMoviesRequestSent(false)
        })
  }

  /* ?????????????? ?????? ???????????? ???????????? */
  /* ?? ???? ?????? ???????????? ???? ?????????????????? + ???????????? ?????????????????????????? ?????? ???????????? ?????????????? ???? ?????????????? ???? ?????????????????? */
  /* ?????????????????? ?????????? ???? ?????????? ????????????????, ?? ???? ?????? ???????? ???? ?????????????? ) */
  /* ?????????????????? ???????????????????? ?????? ???????????????????? ????????, ?????????? ????????????????(???????????? ?????????????????? ???????? ?? ???????? ??????????????????) */

/*    const handleSearch = (event) => {
      event.preventDefault();
      if (isBeatfilmMoviesRequestSent) {
        return;
      }
      if (!values.query) {
        setValues((prevState) => ({ ...prevState, query: '?????????????? ????????????' }))
        return;
      }
      resetStateBeforeSearch();
      setIsBeatfilmMoviesRequestSent(true);
      getBeatfilmMoviesRequest()
          .then((moviesData) => {
            let results = [];
            if (values.query === 'rnd7' && moviesData.length >= RANDOM_MOVIES_SAFETY_LIMIT) {
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
    }*/

  const handleShowMore = () => {
    setMaxMoviesToRender((prevState) => prevState + MOVIES_TO_RENDER_LIMITS.step);
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

  useEffect(() => {
    const [saveFormState] = savePageState();
    saveFormState((state) => {
      return {...state, switch: values.switch};
    })
  }, [values.switch])

  const moviesList = useMemo(() => <MoviesList className={'movies__movies-list'}
                                               movies={moviesToRender} />, [moviesToRender])

  const lastResortGuard = !isNothingFound && !isBeatfilmMoviesRequestSent && !searchResult.length
      && !isBeatfilmMoviesRequestFailed && !searchResult.length && !moviesToRender.length;

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
            <p className='movies__error'>???????????? ?????? ???????????????????? ??????????????</p>
        }
        {isNothingFound &&
            <NothingFound />
        }
        {!!searchResult.length && !moviesToRender.length &&
            <NothingFound>???????????? ???????????? ????????</NothingFound>
        }

        {lastResortGuard &&
            <p className='movies__intro'>?????????????????? ???? ???????????????? Beat Film Festival</p>
        }
      </main>
  )
}

export default Movies;