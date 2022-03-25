import './person-data.css'
import personPhoto from '../../images/person-photo.png'
import LinkButton from '../link-button/link-button';

function PersonData() {
  return (
      <div className='person-data'>
        <img className='person-data__photo' src={personPhoto} alt="фото" />
        <div className='person-data__info'>
          <p className='person-data__name'>Виталий</p>
          <p className='person-data__status'>Фронтенд-разработчик</p>
          <p className='person-data__about'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть
            жена и дочь. Я люблю слушать
            музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После
            того,
            как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <LinkButton className='person-data__link-button' link='https://www.facebook.com/'>Facebook</LinkButton>
          <LinkButton className='person-data__link-button' priority='high'
                      link='https://github.com/zagyrkti'>GitHub</LinkButton>
        </div>
      </div>
  )
}

export default PersonData;