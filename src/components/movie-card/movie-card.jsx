import './movie-card.css';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  convertMinsToHrsMins,
  isMovieBeatfilApiMovie,
  searchForCopyInSaved,
  getUnifiedProperties
} from '../../utils/movies-auxiliary';
import savedMoviesContext from '../../contexts/SavedMoviesContext';
import { MOVIE_CARD_ERROR_MESSAGES } from '../../utils/constants';

function MovieCard({ movieData }) {
  const location = useLocation();

  const {
    savedMoviesList,
    handleSaveMovie,
    handleDeleteMovie,
    savedMoviesRequestState
  } = useContext(savedMoviesContext)

  const [isFullDescriptionShown, setIsFullDescriptionShown] = useState(false);
  const [beatfilmApiMovieCopyInSaved, setBeatfilmApiMovieCopyInSaved] = useState(null);
  const [movieSaveDeleteError, setMovieSaveDeleteError] = useState('');
  const [isDeleteSaveRequestSent, setIsDeleteSaveRequestSent] = useState(false);

  const isMovieBelongsToBeatfilmApi = useMemo(() => isMovieBeatfilApiMovie(movieData), [movieData]);

  const [title, description, duration, director, country, year, imgUrl, trailerLink]
      = getUnifiedProperties(movieData, isMovieBelongsToBeatfilmApi);

  const handleShowAll = () => {
    setIsFullDescriptionShown(!isFullDescriptionShown)
  }

  const handleSaveMovieWrapper = () => {
    if (isDeleteSaveRequestSent) {
      return;
    }
    setMovieSaveDeleteError('');
    setIsDeleteSaveRequestSent(true);
    handleSaveMovie(movieData)
        .catch((error) => {
          console.log(`%cCatch ${error}`, 'color: red');
          setMovieSaveDeleteError(MOVIE_CARD_ERROR_MESSAGES.save)
        })
        .finally(() => {
          setIsDeleteSaveRequestSent(false);
        })
  }

  const handleDeleteMovieWrapper = () => {
    if (isDeleteSaveRequestSent) {
      return;
    }
    const movieId = isMovieBelongsToBeatfilmApi ? beatfilmApiMovieCopyInSaved._id : movieData._id;
    setMovieSaveDeleteError('');
    setIsDeleteSaveRequestSent(true);
    handleDeleteMovie(movieId)
        .catch((error) => {
          console.log(`%cCatch ${error}`, 'color: red');
          setMovieSaveDeleteError(MOVIE_CARD_ERROR_MESSAGES.delete)
        })
        .finally(() => {
          setIsDeleteSaveRequestSent(false)
        })
  }

  const calculateFavoriteButton = () => {
    if (location.pathname === '/movies' && !beatfilmApiMovieCopyInSaved) {
      return <button type='button'
                     className='movie-card__favorite'
                     onClick={handleSaveMovieWrapper} />
    }
    if (location.pathname === '/movies' && beatfilmApiMovieCopyInSaved) {
      return <button type='button'
                     className='movie-card__favorite movie-card__favorite_type_active'
                     onClick={handleDeleteMovieWrapper} />
    }
    if (location.pathname === '/saved-movies') {
      return <button type='button'
                     className='movie-card__favorite movie-card__favorite_type_delete'
                     onClick={handleDeleteMovieWrapper} />
    }

    return null;
  }

  const formattedDuration = convertMinsToHrsMins(duration);

  const favoriteButton = calculateFavoriteButton();

  const moreBtnText = isFullDescriptionShown ? 'СКРЫТЬ' : 'ПОКАЗАТЬ ПОЛНОСТЬЮ';

  const descriptionStyle = isFullDescriptionShown
      ? 'movie-card__description movie-card__description_type_full'
      : 'movie-card__description';

  const cardInfoStyle = isFullDescriptionShown
      ? 'movie-card__info movie-card__info_type_full'
      : 'movie-card__info'

  useEffect(() => {
    if (isMovieBelongsToBeatfilmApi) {
      setBeatfilmApiMovieCopyInSaved(searchForCopyInSaved(movieData, savedMoviesList))
    }
  }, [savedMoviesList])

  const favoriteBtnGuard = !savedMoviesRequestState.failed && !savedMoviesRequestState.sent;

  return (
      <li className='movie-card'>
        <h3 className='movie-card__title'>{title}</h3>
        <div className='movie-card__body'>
          <a className='movie-card__img-wrapper' href={trailerLink} rel='noreferrer noopener' target='_blank'>
            <img className='movie-card__img' src={imgUrl} alt={`картинка из ${title}`} />
            <div className='movie-card__duration'>
              <span className='movie-card__duration-text'>{formattedDuration}</span>
            </div>
          </a>
          <div className={cardInfoStyle}>
            <p className={descriptionStyle} lang='ru'>{description}</p>
            <button type='button' className='movie-card__show-all'
                    onClick={handleShowAll}>{moreBtnText}
            </button>
            <div className='movie-card__subsection'>
              <div>
                <p className='movie-card__additional-info'>{director}</p>
                <div className='movie-card__sub-info'>
                  <span className='movie-card__additional-info'>{country}</span>
                  <span className='movie-card__additional-info'>{year}</span>
                </div>
              </div>
              {favoriteBtnGuard && favoriteButton}
            </div>
          </div>
        </div>
        {!!movieSaveDeleteError && <p className='movie-card__error'>{movieSaveDeleteError}</p>}
      </li>
  )
}

export default MovieCard;