import './signup.css';
import ServiceTitle from '../../components/service-title/service-title';
import FormInput from '../../components/form-input/form-input';
import useForm from '../../utils/use-form';
import SignxButton from '../../components/signx-button/signx-button';
import RedirectCall from '../../components/redirect-call/redirect-call';
import ServerError from '../../components/server-error/server-error';

function Signup() {

  const userName = 'Виталий';
  const userEmail = 'pochta@yandex.ru'
  const userPassword = '••••••••••••••'
  const serverError = null;

  const { values, handleChange, resetFrom, errors, isValid } = useForm({
    name: userName,
    email: userEmail,
    password: userPassword
  });

  const nameConstrains = { minLength: '2', maxLength: '30', required: true }
  const emailConstrains = { required: true }
  const passwordConstrains = { minLength: '3', maxLength: '30', required: true }

  function handleSubmit(event) {
    event.preventDefault();
  }


  return (
    <main className='signup'>
      <ServiceTitle>Добро пожаловать!</ServiceTitle>
      <form className='signup__form' onSubmit={handleSubmit}>
        <FormInput
          type='text' name='name' placeholder='Имя'
          value={values.name || 'Виталий'}
          onChange={handleChange}
          constrains={nameConstrains}
          error={errors.name}
        />
        <FormInput
          type='email' name='email' placeholder='E-mail'
          value={values.email || 'pochta@yandex.ru'}
          onChange={handleChange}
          constrains={emailConstrains}
          error={errors.email}
        />
        <FormInput
          type='password' name='password' placeholder='Пароль'
          value={values.password || '••••••••••••••'}
          onChange={handleChange}
          constrains={passwordConstrains}
          error={errors.password || 'Что-то пошло не так...'}
        />
        <ServerError error={serverError} className='signup__server-error'/>
        <SignxButton className='signup__signx-button' isFormValid={isValid}>Зарегистрироваться</SignxButton>
      </form>
      <RedirectCall
        className='signup__redirect-call'
        message='Уже зарегистрированы?'
        toText='Войти'
        toPath='/signin'
      />
    </main>
  )
}

export default Signup;