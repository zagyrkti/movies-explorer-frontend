import './about-me.css';
import LandingSectionHeader from '../landing-section-header/landing-section-header';
import PersonData from '../person-data/person-data';
import Portfolio from '../portfolio/portfolio';

function AboutMe() {
  return (
    <section className='about-me' id='student'>
      <LandingSectionHeader>Студент</LandingSectionHeader>
      <PersonData />
      <Portfolio />
    </section>
  )
}

export default AboutMe;