import './saved-movies.css'
import saveBtn from '../../images/save7.svg';
import Search from '../../components/search/search';
import ToggleSwitch from '../../components/toggle-switch/toggle-switch';
import MoviesList from '../../components/movies-list/movies-list';
import { useContext, useEffect, useMemo, useState } from 'react';
import Preloader from '../../components/preloader/preloader';
import useForm from '../../utils/use-form';
import savedMoviesContext from '../../contexts/SavedMoviesContext';
import { filterShortMovies, searchMovies } from '../../utils/movies-auxiliary';
import { MOVIES_INITIAL_FORM_STATE } from '../../constants/constants';
import NothingFound from '../../components/nothing-found/nothing-found';

function SavedMovies() {

  const { savedMoviesList, savedMoviesRequestState } = useContext(savedMoviesContext)

  const { values, handleChange, resetForm, errors, isValid, setValues } = useForm(MOVIES_INITIAL_FORM_STATE);
  const [isNoShortsInRender, setIsNoShortsInRender] = useState(false);

  const [moviesToRender, setMoviesToRender] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
  }
  /* Прямых требований как должен быть реализован поиск на этой странице вроде нет */
  /* сделана мгновенная фильтрация */

  useEffect(() => {
    if (!savedMoviesList.length) {
      setIsNoShortsInRender(false);
      setMoviesToRender([]);
      return;
    }

    if (values.query) {
      setIsNoShortsInRender(false);
      const results = searchMovies(savedMoviesList, values.query)

      if (!results.length) {
        setMoviesToRender([]);
        return;
      }

      if (!values.switch) {
        setMoviesToRender(results);
        return;
      }

      const shortsToRender = filterShortMovies(results);
      if (shortsToRender.length) {
        setMoviesToRender(shortsToRender);
        return;
      }

      setMoviesToRender([]);
      setIsNoShortsInRender(true);

    } else {

      if (!values.switch) {
        setMoviesToRender(savedMoviesList);
        return;
      }

      const shortsToRender = filterShortMovies(savedMoviesList);
      if (shortsToRender.length) {
        setMoviesToRender(shortsToRender);
        return;
      }

      setMoviesToRender([]);
      setIsNoShortsInRender(true);
    }
  }, [values.switch, values.query, savedMoviesList])


  const moviesList = useMemo(() => <MoviesList className={'saved-movies__movies-list'}
                                               movies={moviesToRender} />, [moviesToRender])

  return (
      <main className='saved-movies'>
        {!savedMoviesRequestState.sent &&
            <>
              <Search className={'saved-movies__search'} onSearch={handleSearch} onChange={handleChange}
                      values={values} />
              <ToggleSwitch className={'saved-movies__switch'} onChange={handleChange} values={values} />
            </>
        }
        {savedMoviesRequestState.sent &&
            <Preloader />
        }
        {!savedMoviesRequestState.sent && !!moviesToRender.length &&
            moviesList
        }
        {!!savedMoviesList.length && values.query && !moviesToRender.length && !isNoShortsInRender &&
            <NothingFound />
        }
        {values.switch && isNoShortsInRender && !!savedMoviesList.length &&
            <NothingFound>Только полный метр</NothingFound>
        }
        {!savedMoviesList.length &&
            <div className='saved-movies__call'>
              <p className='saved-movies__call-text'>Пусто, сохранить в коллекцию</p>
              <img className='saved-movies__call-img' src={saveBtn} alt="" />
            </div>
        }
        {savedMoviesRequestState.failed &&
            <p className='saved-movies__error'>Не удалось получить сохраненные фильмы</p>
        }
        {!!moviesToRender.length &&
            <div className='saved-movies__placeholder' />
        }

      </main>
  )
}

export default SavedMovies;