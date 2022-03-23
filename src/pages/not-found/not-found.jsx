import './not-found.css';
import Modal from '../../components/modal/modal';
import { useNavigate } from 'react-router-dom';

function NotFound() {

  const navigate = useNavigate();

  const handleBackBtnClick = () => {
      navigate(-2);
  }

  return (
    <Modal>
      <div className='not-found'>
        <p className='not-found__error-code'>404</p>
        <p className='not-found__message'>Страница не найдена</p>
        <button className='not-found__link' onClick={handleBackBtnClick}>Назад</button>
      </div>
    </Modal>
  )
}

export default NotFound;