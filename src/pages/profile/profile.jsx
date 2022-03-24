import './profile.css'
import ServiceTitle from '../../components/service-title/service-title';
import FormInput from '../../components/form-input/form-input';
import useForm from '../../utils/use-form';
import { useContext, useEffect, useRef, useState } from 'react';
import SignxButton from '../../components/signx-button/signx-button';
import ServerError from '../../components/server-error/server-error';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Profile({ onSignOut, onUpdateUserData }) {

  const { email, name } = useContext(CurrentUserContext)
  const ref = useRef();

  const initialFormState = {
    email: '',
    name: '',
  }

  const nameConstrains = { minLength: '2', maxLength: '30', required: true }
  const emailConstrains = { required: true }

  const { values, handleChange, resetForm, errors, isValid, setValues } = useForm(initialFormState);
  const [isProfileUpdateRequestSent, setIsProfileUpdateRequestSent] = useState(false)
  const [profileError, setProfileError] = useState('');

  const [isEditingInProgress, setIsEditingInProgress] = useState(false);

  const handleEditBtnClick = () => {
    setProfileError('');
    setIsEditingInProgress(true)
  }

  const handleChancelBtnClick = () => {
    setIsEditingInProgress(false);
  }

  const handleErrorClear = () => {
    setProfileError('');
  }
  /* Кнопки отмена при апдейте данных не предусмотрено */
  /* Блокировать ее если данные не поменялись сомнительный маневр */
  /* чтоб получить доступ к Выйти нужно перегрузить страницу\сменить роут или поменять данные */

  /* Поэтому выполняется псевдосохранение */
  function handleSubmit(event) {
    event.preventDefault();
    if (!isValid || isProfileUpdateRequestSent) {
      return;
    }
    if (values.email === email && values.name === name) {
      setIsEditingInProgress(false)
      setProfileError('Данные идентичны начальным, обновление не выполнено')
      return;
    }
    setIsProfileUpdateRequestSent(true);
    handleErrorClear();
    onUpdateUserData(values.name, values.email)
        .then(() => {
          setProfileError('Данные успешно обновлены')
        })
        .catch((error) => {
          console.log(`%cCatch handleUpdateUserData ${error}`, 'color: red');
          setProfileError('Обновление данных не удалось')
        })
        .finally(() => {
          setIsProfileUpdateRequestSent(false);
          setIsEditingInProgress(false)
        })
  }

  useEffect(() => {
    setValues({ email, name })
  }, [email, name])

  useEffect(() => {
    if (isEditingInProgress) {
      if (ref.current) {
        ref.current.focus();
      }
    }
  }, [isEditingInProgress])

  const signxButtonClassName = isEditingInProgress ? '' : 'profile__signx-button_state_hidden';
  const serverErrorClassName = isEditingInProgress || profileError ? '' : 'profile__server-error_state_hidden';

  const SignXBtnText = isProfileUpdateRequestSent ? '...Работаем над этим' : 'Сохранить'

  const isInputsDisabled = !isEditingInProgress || isProfileUpdateRequestSent

  return (
      <main className='profile'>
        <ServiceTitle>Привет, {name}!</ServiceTitle>
        <form className='profile__form' onSubmit={handleSubmit} noValidate>
          <FormInput
              type='text' name='name' placeholder='Имя'
              value={values.name}
              onChange={handleChange}
              disabled={isInputsDisabled}
              constrains={nameConstrains}
              error={errors.name}
              ref={ref}
          />
          <FormInput
              type='email' name='email' placeholder='E-mail'
              value={values.email}
              onChange={handleChange}
              disabled={isInputsDisabled}
              constrains={emailConstrains}
              error={errors.email}
          />
          <ServerError error={profileError} className={`profile__server-error ${serverErrorClassName}`}
                       onErrorClear={handleErrorClear} />
          <SignxButton className={`profile__signx-button ${signxButtonClassName}`} disabled={isProfileUpdateRequestSent}
                       isFormValid={isValid}>{SignXBtnText}</SignxButton>
          {isEditingInProgress && !isProfileUpdateRequestSent &&
              <button type='button' className='profile__button profile__button_type_sub'
                      onClick={handleChancelBtnClick}>Отмена</button>
          }
        </form>

        {!isEditingInProgress &&
            <>
              <button className='profile__button' type='button' onClick={handleEditBtnClick}>Редактировать</button>
              <button className='profile__button profile__button_type_danger' type='button' onClick={onSignOut}>Выйти из
                аккаунта
              </button>
            </>
        }
      </main>
  )
}

export default Profile;