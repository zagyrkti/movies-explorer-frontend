import './landing.css'
import Promo from '../../components/promo/promo';
import AboutProject from '../../components/about-project/about-project';
import Techs from '../../components/techs/techs';
import AboutMe from '../../components/about-me/about-me';

function Landing() {
  return (
    <main className='landing'>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
    </main>
  )
}

export default Landing;