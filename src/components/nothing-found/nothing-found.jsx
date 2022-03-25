import './nothing-found.css'
import { useLocation } from 'react-router-dom';

function NothingFound(props) {
  const location = useLocation()
  const message = props.children ? props.children : 'Ничего не найдено'
  return (
      <div className='nothing-found'>
        <p className='nothing-found__text'>{message}</p>
        {location.pathname === '/movies' &&
            <p className='nothing-found__subtext'>Подборка случайных фильмов: rnd7</p>
        }
      </div>
  )
}

export default NothingFound;