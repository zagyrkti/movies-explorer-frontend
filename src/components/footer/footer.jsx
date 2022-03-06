import './footer.css'
import Links from '../links/links';
import { useLocation } from 'react-router-dom';

function Footer() {

  const location = useLocation();

  let isFooterShown;
  switch (location.pathname) {
    case '/signup':
      isFooterShown = 'footer_state_hidden';
      break;
    case '/signin':
      isFooterShown = 'footer_state_hidden';
      break;
    case '/profile':
      isFooterShown = 'footer_state_hidden';
      break;
    default:
      isFooterShown = '';
  }

  return (
    <footer className={`footer ${isFooterShown}`}>
      <p className='footer__org'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <span className='footer__year'>© 2022</span>
      <Links className='footer__links'/>
    </footer>
  )
}

export default Footer;

