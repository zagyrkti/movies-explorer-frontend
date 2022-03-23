import './signin.css'
import ServiceTitle from '../../components/service-title/service-title';
import FormInput from '../../components/form-input/form-input';
import useForm from '../../utils/use-form';
import SignxButton from '../../components/signx-button/signx-button';
import RedirectCall from '../../components/redirect-call/redirect-call';
import ServerError from '../../components/server-error/server-error';
import { SIGNIN_ERROR_MESSAGES, SIGNIN_INITIAL_FORM_STATE } from '../../utils/constants';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signin({ onSignIn }) {
  const { values, handleChange, resetForm, errors, isValid } = useForm(SIGNIN_INITIAL_FORM_STATE);
  const [signInError, setSignInError] = useState('');
  const [isSignXRequestSent, setIsSignXRequestSent] = useState(false)

  const emailConstrains = { required: true }
  const passwordConstrains = { minLength: '6', maxLength: '20', required: true }

  const handleErrorClear = () => {
    setSignInError('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!isValid || isSignXRequestSent) {
      return;
    }
    handleErrorClear();
    setIsSignXRequestSent(true);
    onSignIn(values.email, values.password)
        .catch((error) => {
          console.log(`%cCatch handleSignUp ${error}`, 'color: red');
          setIsSignXRequestSent(false);
          const errorMessage = error === '401' ? SIGNIN_ERROR_MESSAGES.unauthorized : SIGNIN_ERROR_MESSAGES.default;
          setSignInError(errorMessage)
        })
  }

  const SignXBtnText = isSignXRequestSent ? '...Работаем над этим' : 'Войти'

  return (
      <main className='signin'>
        <ServiceTitle>Рады видеть!</ServiceTitle>
        <form className='signin__form' onSubmit={handleSubmit} noValidate>
          <FormInput
              type='email' name='email' placeholder='E-mail'
              value={values.email}
              onChange={handleChange}
              constrains={emailConstrains}
              error={errors.email}
              disabled={isSignXRequestSent}
          />
          <FormInput
              type='password' name='password' placeholder='Пароль'
              value={values.password}
              onChange={handleChange}
              constrains={passwordConstrains}
              error={errors.password}
              disabled={isSignXRequestSent}
          />
          <ServerError error={signInError} className='signup__server-error' onErrorClear={handleErrorClear} />
          <SignxButton className='signup__signx-button' disabled={isSignXRequestSent} isFormValid={isValid}>
            {SignXBtnText}
          </SignxButton>
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