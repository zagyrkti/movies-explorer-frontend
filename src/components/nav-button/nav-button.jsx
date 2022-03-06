import './nav-button.css'
import { NavLink, useLocation } from 'react-router-dom';

function NavButton(props) {
  const to = props.to ? props.to : '/'
  const location = useLocation();
  const icon = props.icon ? props.icon : false;

  const buttonClassName = props.type === 'priority'
    ? 'nav-button__link nav-button__link_type_priority'
    : 'nav-button__link nav-button__link_type_normal'

  const underlineFeature = location.pathname === to
    ? 'nav-button nav-button_type_active'
    : 'nav-button'

  const propsClassName = props.className ? props.className : '';

  return (
    <div className={`${underlineFeature} ${propsClassName}`}>
      <NavLink className={buttonClassName} to={to}>
        { icon && <img className='nav-button__icon' src={icon} alt="иконка кнопки" /> }
        <span className='nav-button__text'>{props.children}</span>
      </NavLink>
    </div>
  )
}

export default NavButton;