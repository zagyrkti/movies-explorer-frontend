import './nothing-found.css'
import { useLocation } from 'react-router-dom';

function NothingFound() {
  const location = useLocation()

  return (
      <div className='nothing-found'>
        <p className='nothing-found__text'>Ничего не найдено</p>
        {location.pathname === '/movies' &&
          <p className='nothing-found__subtext'>Подборка случайных фильмов: rnd7</p>
        }
      </div>
  )
}

export default NothingFound;