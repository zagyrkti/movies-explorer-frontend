import './profile.css'
import ServiceTitle from '../../components/service-title/service-title';
import FormInput from '../../components/form-input/form-input';
import useForm from '../../utils/use-form';
import { useState } from 'react';
import SignxButton from '../../components/signx-button/signx-button';
import ServerError from '../../components/server-error/server-error';

function Profile() {

  const userName = 'Виталий';
  const userEmail = 'pochta@yandex.ru'
  const serverError = null;

  const nameConstrains = {minLength: '2', maxLength: '30', required: true}
  const emailConstrains = {required: true}

  const { values, handleChange, resetFrom, errors, isValid } = useForm({name: userName, email: userEmail});

  const [isInputsDisabled, setIsInputsDisabled] = useState(true);


  const handleEditBtnClick = () => {
    setIsInputsDisabled(false)
  }

  const handleSaveBtnClick = () => {
    setIsInputsDisabled(true)
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (

    <main className='profile'>
      <ServiceTitle>Привет, {userName}!</ServiceTitle>
      <form className='profile__form' onSubmit={handleSubmit}>
        <FormInput
          type='text' name='name' placeholder='Имя'
          value={values.name}
          onChange={handleChange}
          disabled={isInputsDisabled}
          constrains={nameConstrains}
          error={errors.name}
        />
        <FormInput
          type='email' name='email' placeholder='E-mail'
          value={values.email}
          onChange={handleChange}
          disabled={isInputsDisabled}
          constrains={emailConstrains}
          error={errors.email}
        />
      </form>

      {!isInputsDisabled &&
        <>
          <ServerError error={serverError} className='profile__server-error'/>
          <SignxButton className='profile__signx-button' onClick={handleSaveBtnClick} isFormValid={isValid}>Сохранить</SignxButton>
        </>
      }
      {isInputsDisabled &&
        <>
          <button className='profile__button' type='button' onClick={handleEditBtnClick} >Редактировать</button>
          <button className='profile__button profile__button_type_danger' type='button'>Выйти из аккаунта</button>
        </>
      }
    </main>
  )
}

export default Profile;