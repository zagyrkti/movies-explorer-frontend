import './movies.css'
import Search from '../../components/search/search';
import MoviesList from '../../components/movies-list/movies-list';
import More from '../../components/more/more';
import ToggleSwitch from '../../components/toggle-switch/toggle-switch';
import { useEffect, useState } from 'react';
import Preloader from '../../components/preloader/preloader';
import api from '../../utils/api';

function Movies() {

  const moviesNumber = 7;

  const [movies, setMovies] = useState([]);
  const [isMoviesLoading, setIsMoviesLoading] = useState(false);

  useEffect(() => {
    setIsMoviesLoading(true);
    api()
      .then((moviesData) => {
        setMovies(moviesData.slice(0, moviesNumber));
      })
      .catch(console.log)
      .finally(() => setIsMoviesLoading(false))
  }, [])

  return (
    <main className='movies'>
      <Search className={'movies__search'} />
      <ToggleSwitch className={'movies__switch'} />

      {isMoviesLoading &&
        <Preloader />
      }
      {!isMoviesLoading &&
        <>
          <MoviesList className={'movies__movies-list'} movies={movies} />
          <More className={'movies__more'} />
        </>
      }
    </main>
  )
}

export default Movies;