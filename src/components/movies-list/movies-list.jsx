import './movies-list.css';
import MovieCard from '../movie-card/movie-card';

function MoviesList(props) {
  const style = props.className ? props.className : '';

  return (
      <section>
        <ul className={`movies-list ${style}`}>
          {!!props.movies?.length &&
              props.movies.map((movieData) => <MovieCard movieData={movieData} key={movieData.id || movieData._id} />)
          }
        </ul>
      </section>
  )
}

export default MoviesList;