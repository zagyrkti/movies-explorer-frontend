import './signup.css';
import ServiceTitle from '../../components/service-title/service-title';
import FormInput from '../../components/form-input/form-input';
import useForm from '../../utils/use-form';
import SignxButton from '../../components/signx-button/signx-button';
import RedirectCall from '../../components/redirect-call/redirect-call';
import ServerError from '../../components/server-error/server-error';
import { SIGNIN_ERROR_MESSAGES, SIGNUP_ERROR_MESSAGES, SIGNUP_INITIAL_FORM_STATE } from '../../utils/constants';
import { useState } from 'react';
import { signUpRequest } from '../../utils/main-api';
import { useNavigate } from 'react-router-dom';

function Signup({ onSignIn }) {
  const [signUpError, setSignUpError] = useState('');

  const { values, handleChange, resetForm, errors, isValid } = useForm(SIGNUP_INITIAL_FORM_STATE);
  const [isSignXRequestSent, setIsSignXRequestSent] = useState(false)

  const nameConstrains = { minLength: '2', maxLength: '30', required: true }
  const emailConstrains = { required: true }
  const passwordConstrains = { minLength: '6', maxLength: '20', required: true}

  const handleErrorClear = () => {
    setSignUpError('');
  }

  const handleSignUp = () => {
    setIsSignXRequestSent(true);
    return signUpRequest(values.name, values.email, values.password)
        .then(() => {
          resetForm(SIGNUP_INITIAL_FORM_STATE);
          return true;
        })
        .catch((error) => {
          console.log(`%cCatch handleSignUp ${error}`, 'color: red');
          const errorMessage = error === '409' ? SIGNUP_ERROR_MESSAGES.conflict : SIGNUP_ERROR_MESSAGES.default;
          setSignUpError(errorMessage)
          return false;
        })
        .finally(() => {
          setIsSignXRequestSent(false);
        })
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isValid || isSignXRequestSent) {
      return;
    }
    handleErrorClear();
    const isSignUpSuccess = await handleSignUp();
    if (isSignUpSuccess) {
      setIsSignXRequestSent(true);
      onSignIn(values.email, values.password)
          .catch((error) => {
            console.log(`%cCatch handleSignUp ${error}`, 'color: red');
            setIsSignXRequestSent(false);
            setSignUpError(SIGNIN_ERROR_MESSAGES.autologinFail)
          })
    }
  }

  const SignXBtnText = isSignXRequestSent ? '...Работаем над этим' : 'Зарегистрироваться'

  return (
      <main className='signup'>
        <ServiceTitle>Добро пожаловать!</ServiceTitle>
        <form className='signup__form' onSubmit={handleSubmit} noValidate>
          <FormInput
              type='text' name='name' placeholder='Имя'
              value={values.name}
              onChange={handleChange}
              constrains={nameConstrains}
              error={errors.name}
              disabled={isSignXRequestSent}
          />
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
          <ServerError error={signUpError} className='signup__server-error' onErrorClear={handleErrorClear} />
          <SignxButton className='signup__signx-button' disabled={isSignXRequestSent} isFormValid={isValid}>
            {SignXBtnText}
          </SignxButton>
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