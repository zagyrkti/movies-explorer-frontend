import './hamburger-menu.css';
import { NavLink } from 'react-router-dom';
import profileIcon from '../../images/profile-icon-mod-hamburger-menu.svg'


function HamburgerMenu(props) {

  const setLinkStyle = ({ isActive }) => {
    return isActive ? 'hamburger-menu__link hamburger-menu__link_state_active' : 'hamburger-menu__link';
  }

  return (
      <nav className='hamburger-menu'>
        <button className='hamburger-menu__close' onClick={props.onCloseClick} />

        {!props.isLoggedIn &&
            <>
              <NavLink className={setLinkStyle} to='/' onClick={props.onCloseClick}>
                <span className='hamburger-menu__link-text'>Главная</span>
              </NavLink>
              <NavLink className={setLinkStyle} to='/signup' onClick={props.onCloseClick}>
                <span className='hamburger-menu__link-text'>Регистрация</span>
              </NavLink>
              <NavLink className={setLinkStyle} to='/signin' onClick={props.onCloseClick}>
                <span className='hamburger-menu__link-text'>Войти</span>
              </NavLink>
            </>
        }

        {props.isLoggedIn &&
            <>
              <NavLink className={setLinkStyle} to='/' onClick={props.onCloseClick}>
                <span className='hamburger-menu__link-text'>Главная</span>
              </NavLink>
              <NavLink className={setLinkStyle} to='/movies' onClick={props.onCloseClick}>
                <span className='hamburger-menu__link-text'>Фильмы</span>
              </NavLink>
              <NavLink className={setLinkStyle} to='/saved-movies' onClick={props.onCloseClick}>
                <span className='hamburger-menu__link-text'>Сохранённые фильмы</span>
              </NavLink>
              <div className='hamburger-menu__separator' />
              <NavLink className={setLinkStyle} to='/profile' onClick={props.onCloseClick}>
                <img className='hamburger-menu__link-icon' src={profileIcon} alt="иконка меню" />
                <span className='hamburger-menu__link-text'>Аккаунт</span>
              </NavLink>
            </>
        }
      </nav>
  )
}

export default HamburgerMenu;