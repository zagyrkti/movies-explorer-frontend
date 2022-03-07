import './signin.css'
import ServiceTitle from '../../components/service-title/service-title';
import FormInput from '../../components/form-input/form-input';
import useForm from '../../utils/use-form';
import SignxButton from '../../components/signx-button/signx-button';
import RedirectCall from '../../components/redirect-call/redirect-call';
import ServerError from '../../components/server-error/server-error';

function Signin() {

  const { values, handleChange, resetFrom, errors, isValid } = useForm();

  const emailConstrains = {required: true}
  const passwordConstrains = {minLength: '3', maxLength: '30', required: true}

  const serverError = null;

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <main className='signin'>
      <ServiceTitle>Рады видеть!</ServiceTitle>
      <form className='signin__form' onSubmit={handleSubmit}>
        <FormInput
          type='email' name='email' placeholder='E-mail'
          value={values.email || 'pochta@yandex.ru'}
          onChange={handleChange}
          constrains={emailConstrains}
          error={errors.email}
        />
        <FormInput
          type='text' name='password' placeholder='Пароль'
          value={values.password || '••••••••••••••'}
          onChange={handleChange}
          constrains={passwordConstrains}
          error={errors.password}
        />
        <ServerError error={serverError} className='signin__server-error'/>
        <SignxButton className='signup__signx-button' isFormValid={isValid}>Войти</SignxButton>
      </form>
      <RedirectCall
        className='signin__redirect-call'
        message='Ещё не зарегистрированы?'
        toText='Регистрация'
        toPath='/signup'
      />
    </main>
  )
}

export default Signin;