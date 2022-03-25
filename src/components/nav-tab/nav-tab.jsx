import './nav-tab.css'

function NavTab() {
  return (
      <div className='nav-tab'>
        <a className='nav-tab__item' href="#about">
          <span className='nav-tab__text'>О проекте</span>
        </a>
        <a className='nav-tab__item' href="#tech">
          <span className='nav-tab__text'>Технологии</span>
        </a>
        <a className='nav-tab__item' href="#student">
          <span className='nav-tab__text'>Студент</span>
        </a>
      </div>
  )
}

export default NavTab;