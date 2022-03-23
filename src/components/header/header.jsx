import './header.css'
import logo from '../../images/logo.svg'
import profileIcon from '../../images/icon-profile.png'
import NavButton from '../nav-button/nav-button';
import { Link, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import HamburgerMenu from '../hamburger-menu/hamburger-menu';
import useWindowDimensions from '../../utils/use-window-dimensions';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Header() {
  const location = useLocation();
  const { isLoggedIn } = useContext(CurrentUserContext)
  const { width } = useWindowDimensions();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleHamburgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
      <header className='header'>
        <div className='header__content'>
          <Link className='header__logo-link' to='/'>
            <img className='header__logo' src={logo} alt="логотип сайта" />
          </Link>

          {(location.pathname !== '/' || isLoggedIn) &&
              <button className='header__hamburger' onClick={handleHamburgerClick} />
          }
          {isMenuOpen &&
              <HamburgerMenu onCloseClick={handleHamburgerClick} isLoggedIn={isLoggedIn} />
          }

          {isLoggedIn &&
              <div className='header__main-nav'>
                <div className='header__film-block'>
                  <NavButton to={'/movies'}>Фильмы</NavButton>
                  <NavButton to={'/saved-movies'} className='header__nav-button'>Сохраненные фильмы</NavButton>
                </div>
                <NavButton to={'/profile'} icon={profileIcon}>Аккаунт</NavButton>
              </div>
          }

          {!isLoggedIn && (width > 670 || location.pathname === '/') &&
              <div className='header__signx'>
                <NavButton to={'/signup'}>Регистрация</NavButton>
                <NavButton className='header__nav-button' to={'/signin'} type={'priority'}>Войти</NavButton>
              </div>
          }
        </div>
      </header>
  )
}

export default Header;