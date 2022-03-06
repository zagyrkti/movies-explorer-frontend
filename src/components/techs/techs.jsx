import './techs.css'
import LandingSectionHeader from '../landing-section-header/landing-section-header';

function Techs() {
  return (
    <section className='techs' id='tech'>
      <LandingSectionHeader className='techs__landing-header'>Технологии</LandingSectionHeader>
      <h3 className='techs__title'>8 технологий</h3>

      <div className='techs__content'>
        <div className='techs__text'>
          <div>
            <span className='techs__promo-main'>Изучены </span>
            <p className='techs__promo-secondary techs__promo-secondary_type_main'>- за 10 месяцев курса веб-разработки от Яндекс.Практикум</p>
            <p className='techs__promo-secondary techs__promo-secondary_type_mobile'>Яндекс.Практикум.ВебРазработчик</p>
          </div>
          <div>
            <span className='techs__promo-main'>Освоены </span>
            <p className='techs__promo-secondary techs__promo-secondary_type_main'>- за время курса сделано 15 проектных работ</p>
            <p className='techs__promo-secondary techs__promo-secondary_type_mobile'>15 проектных работ</p>
          </div>
          <div>
            <span className='techs__promo-main'>Использованы </span>
            <p className='techs__promo-secondary techs__promo-secondary_type_main'>- в рамках данного проекта</p>
            <p className='techs__promo-secondary techs__promo-secondary_type_mobile'>Для построения данного проекта</p>
          </div>
        </div>

        <div className='techs__tech techs__tech_position_one'>
          <span className='techs__tech-text'>mongoDB</span>
        </div>
        <div className='techs__tech techs__tech_position_two'>
          <span className='techs__tech-text'>Express.js</span>
        </div>
        <div className='techs__tech techs__tech_position_three'>
          <span className='techs__tech-text'>React</span>
        </div>
        <div className='techs__tech techs__tech_position_four'>
          <span className='techs__tech-text'>HTML</span>
        </div>
        <div className='techs__tech techs__tech_position_five'>
          <span className='techs__tech-text'>CSS</span>
        </div>
        <div className='techs__tech techs__tech_position_six'>
          <span className='techs__tech-text'>JS</span>
        </div>
        <div className='techs__tech techs__tech_position_seven'>
          <span className='techs__tech-text'>Node.js</span>
        </div>
        <div className='techs__tech techs__tech_position_eight'>
          <span className='techs__tech-text'>Git</span>
        </div>
      </div>

    </section>
  )
}

export default Techs;