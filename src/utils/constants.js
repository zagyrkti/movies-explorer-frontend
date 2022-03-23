const USER_DATA_INITIAL = {
  email: '',
  name: '',
  _id: '',
}

const MOVIES_INITIAL_FORM_STATE = {
  query: '',
  switch: false,
}

const SIGNUP_INITIAL_FORM_STATE = {
  name: '',
  email: '',
  password: ''
}

const SIGNIN_INITIAL_FORM_STATE = {
  email: '',
  password: ''
}

const SIGNUP_ERROR_MESSAGES = {
  conflict: 'Пользователь с указанным email уже зарегистрирован',
  default: 'При регистрации произошла ошибка',
}

const SIGNIN_ERROR_MESSAGES = {
  unauthorized: 'Ошибка при вводе почты или пароля',
  autologinFail: 'При авто входе произошла ошибка',
  default: 'Ошибка при выполнении входа'
}

const MOVIE_CARD_ERROR_MESSAGES = {
  save: 'Возникла проблема при сохранении карточки',
  delete:'Возникла проблема при удалении карточки',
}

export {
  USER_DATA_INITIAL,
  MOVIES_INITIAL_FORM_STATE,
  SIGNUP_INITIAL_FORM_STATE,
  SIGNIN_INITIAL_FORM_STATE,
  SIGNUP_ERROR_MESSAGES,
  SIGNIN_ERROR_MESSAGES,
  MOVIE_CARD_ERROR_MESSAGES,
}