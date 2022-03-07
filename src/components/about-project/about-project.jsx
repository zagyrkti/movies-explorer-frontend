import './about-project.css'
import LandingSectionHeader from '../landing-section-header/landing-section-header';
import Stage from '../stage/stage';

function AboutProject() {

  return (
    <section className='about-project' id='about'>
      <LandingSectionHeader>О проекте</LandingSectionHeader>

      <div className='about-project__content'>
        <div className='about-project__timeline'>
          <Stage className='about-project__timeline-stage'>Back-end</Stage>
          <Stage className='about-project__timeline-stage'>Front-end</Stage>
          <Stage className='about-project__timeline-stage'>Front-end</Stage>
          <Stage className='about-project__timeline-stage'>Front-end</Stage>
          <Stage className='about-project__timeline-stage'>Front-end</Stage>
        </div>

        <h3 className='about-project__title about-project__title_type_stages-title'>5 этапов</h3>
        <h3 className='about-project__title about-project__title_type_weeks-title'>5 недель</h3>

        <div className='about-project__stages'>
          <Stage className='about-project__stage'>Планирование</Stage>
          <Stage className='about-project__stage'>Бэкэнд</Stage>
          <Stage className='about-project__stage'>Верстка</Stage>
          <Stage className='about-project__stage'>Функционал</Stage>
          <Stage className='about-project__stage'>Доработки</Stage>
        </div>

        <div className='about-project__weeks'>
          <Stage className='about-project__stage'>Дедлайны</Stage>
          <Stage className='about-project__stage'>Hard work</Stage>
          <Stage className='about-project__stage'>Поиск решений</Stage>
          <Stage className='about-project__stage'>Стресс</Stage>
          <Stage className='about-project__stage'>Радость</Stage>
        </div>

        <p className='about-project__text custom-scroll'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum
        </p>
      </div>
    </section>
  )
}

export default AboutProject