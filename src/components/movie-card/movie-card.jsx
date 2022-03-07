import './movie-card.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function
MovieCard(props) {
  const title = props.movieData.nameRU;
  const imgUrl = `https://api.nomoreparties.co/${props.movieData.image.url}`;
  const { description, duration } = props.movieData;
  const { director, country, year } = props.movieData;
  const { trailerLink } = props.movieData;

  const [isFullDescriptionShown, setIsFullDescriptionShown] = useState(false);
  const moreBtnText = isFullDescriptionShown ? 'СКРЫТЬ' : 'ПОКАЗАТЬ ПОЛНОСТЬЮ';

  const handleShowAll = () => {
    setIsFullDescriptionShown(!isFullDescriptionShown)
  }

  const convertMinsToHrsMins = (mins) => {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    m = m < 10 ? '0' + m : m;
    return `${h}:${m}`;
  }

  const formattedDuration = convertMinsToHrsMins(duration)

  const descriptionStyle = isFullDescriptionShown
    ? 'movie-card__description movie-card__description_type_full'
    : 'movie-card__description';

  const cardInfoStyle = isFullDescriptionShown
    ? 'movie-card__info movie-card__info_type_full'
    : 'movie-card__info'

  const location = useLocation();

  const isSaved = props.movieData.id === 1 || props.movieData.id === 3;
  let favoriteBtnStyle = '';

  switch (location.pathname) {
    case '/movies':
      favoriteBtnStyle = isSaved ? 'movie-card__favorite movie-card__favorite_type_active' : 'movie-card__favorite';
      break;
    case '/saved-movies':
      favoriteBtnStyle = 'movie-card__favorite movie-card__favorite_type_delete';
      break;
    default:
      favoriteBtnStyle = 'movie-card__favorite';
  }

  return (
    <li className='movie-card'>
      <h3 className='movie-card__title'>{title}</h3>
      <div className='movie-card__body'>
        <a className='movie-card__img-wrapper' href={trailerLink} rel='noreferrer noopener' target='_blank' >
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
            <button type='button' className={favoriteBtnStyle} />
          </div>
        </div>0.7826086956521739
      </div>
    </li>
  )
}

export default MovieCard;