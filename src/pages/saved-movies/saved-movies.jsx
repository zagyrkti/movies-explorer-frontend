import './saved-movies.css'
import Search from '../../components/search/search';
import ToggleSwitch from '../../components/toggle-switch/toggle-switch';
import MoviesList from '../../components/movies-list/movies-list';
import { useEffect, useState } from 'react';
import api from '../../utils/api';
import Preloader from '../../components/preloader/preloader';
import useWindowDimensions from '../../utils/use-window-dimensions';

function SavedMovies() {

  const { width } = useWindowDimensions();


  const moviesNumber = 3;

  const [savedMovies, setSavedMovies] = useState([]);
  const [isMoviesLoading, setIsMoviesLoading] = useState(false);

  useEffect(() => {
    setIsMoviesLoading(true);
    api()
      .then((moviesData) => {
        setSavedMovies(moviesData.slice(0, moviesNumber));
      })
      .catch(console.log)
      .finally(() => setIsMoviesLoading(false))
  }, [])

  return (
    <main className='saved-movies'>
      <Search className={'saved-movies__search'}/>
      <ToggleSwitch className={'saved-movies__switch'}/>
      {isMoviesLoading &&
        <Preloader />
      }

      {!isMoviesLoading &&
        <MoviesList className={'saved-movies__movies-list'} movies={savedMovies}/>
      }
      <div className='saved-movies__placeholder' />
    </main>
  )
}

export default SavedMovies;