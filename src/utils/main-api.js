import { convertBeatfilmMovieToServerFormat } from './movies-auxiliary';

const MAIN_API_URL = 'https://api.mexp.zagyrkti.nomoredomains.rocks'


function processResponse(res) {
  if (res.ok) {
    return res.json();
  }
  /*  return res.json()
        .then(errorRes => {
          const errorMessage = errorRes.errorMessage ? errorRes.errorMessage : errorRes.message
          throw new Error(errorMessage)
        })*/
  return Promise.reject(`${res.status}`);
}

const signUpRequest = (name, email, password) => {
  return fetch(`${MAIN_API_URL}/signup`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    })
  })
      .then(processResponse)
};

const signInRequest = (email, password) => {
  return fetch(`${MAIN_API_URL}/signin`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password,
    })
  })
      .then(processResponse)
};

const getUserDataRequest = () => {
  return fetch(`${MAIN_API_URL}/users/me`, {
    headers: {
      'authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
      .then(processResponse)
};

const updateUserDataRequest = (name, email) => {
  return fetch(`${MAIN_API_URL}/users/me`, {
    method: "PATCH",
    headers: {
      'authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email,
    })
  })
      .then(processResponse)
};

const getSavedMoviesRequest = () => {
  return fetch(`${MAIN_API_URL}/movies`, {
    headers: {
      'authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
      .then(processResponse)
};

const saveMovieRequest = (movie) => {
  const formattedMovie = convertBeatfilmMovieToServerFormat(movie);

  return fetch(`${MAIN_API_URL}/movies`, {
    method: "POST",
    headers: {
      'authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formattedMovie)
  })
      .then(processResponse)
};


const deleteMovieRequest = (id) => {
  return fetch(`${MAIN_API_URL}/movies/${id}`, {
    method: "DELETE",
    headers: {
      'authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
      .then(processResponse)
};


export {
  signUpRequest,
  signInRequest,
  getUserDataRequest,
  updateUserDataRequest,
  getSavedMoviesRequest,
  saveMovieRequest,
  deleteMovieRequest,
}