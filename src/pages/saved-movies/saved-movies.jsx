import './saved-movies.css'
import saveBtn from '../../images/save7.svg';
import Search from '../../components/search/search';
import ToggleSwitch from '../../components/toggle-switch/toggle-switch';
import MoviesList from '../../components/movies-list/movies-list';
import { useContext, useEffect, useState } from 'react';
import Preloader from '../../components/preloader/preloader';
import useForm from '../../utils/use-form';
import savedMoviesContext from '../../contexts/SavedMoviesContext';
import { filterShortMovies, searchMovies } from '../../utils/movies-auxiliary';
import { MOVIES_INITIAL_FORM_STATE } from '../../utils/constants';
import NothingFound from '../../components/nothing-found/nothing-found';

function SavedMovies() {

  const { savedMoviesList, savedMoviesRequestState } = useContext(savedMoviesContext)

  const { values, handleChange, resetForm, errors, isValid, setValues } = useForm(MOVIES_INITIAL_FORM_STATE);

  const [moviesToRender, setMoviesToRender] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
  }
  /* Прямых требований как должен быть реализован поиск на этой странице вроде нет */
  /* сделана мгновенная фильтрация */
  useEffect(() => {
    if (values.query && savedMoviesList.length) {
      const results = searchMovies(savedMoviesList, values.query)
      if (!values.switch) {
        setMoviesToRender(results);
        return;
      }
      setMoviesToRender(filterShortMovies(results));
    } else {
      if (!values.switch && savedMoviesList.length) {
        setMoviesToRender(savedMoviesList);
        return;
      }
      setMoviesToRender(filterShortMovies(savedMoviesList));
    }
  }, [values.switch, values.query, savedMoviesList])

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
            <MoviesList className={'saved-movies__movies-list'} movies={moviesToRender} />
        }
        {!!savedMoviesList.length && values.query && !moviesToRender.length &&
            <NothingFound />
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