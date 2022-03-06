import './promo.css'
import bgImage from '../../images/landing-bg-image.svg'
import NavTab from '../nav-tab/nav-tab';

function Promo() {
  return (
      <section className='promo'>
        <img className='promo__bg-image' src={bgImage} alt="логотип" />
        <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
        <NavTab/>
      </section>
  )
}

export default Promo;