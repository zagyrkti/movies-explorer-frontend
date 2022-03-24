import './app.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from '../header/header';
import Movies from '../../pages/movies/movies';
import Landing from '../../pages/landing/landing';
import SavedMovies from '../../pages/saved-movies/saved-movies';
import Profile from '../../pages/profile/profile';
import Signin from '../../pages/signin/signin';
import Signup from '../../pages/signup/signup';
import Footer from '../footer/footer';
import NotFound from '../../pages/not-found/not-found';
import { useEffect, useMemo, useState } from 'react';
import {
  deleteMovieRequest,
  getSavedMoviesRequest,
  getUserDataRequest,
  saveMovieRequest,
  updateUserDataRequest
} from '../../utils/main-api';
import { signInRequest } from '../../utils/main-api';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import SavedMoviesContext from '../../contexts/SavedMoviesContext';
import { SAVED_MOVIES_REQUEST_INITIAL_STATE, USER_DATA_INITIAL } from '../../constants/constants';
import ProtectedRoute from '../protected-route/protected-route';

function App() {

  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userData, setUserData] = useState(USER_DATA_INITIAL);

  const [savedMoviesList, setSavedMoviesList] = useState([])
  const [savedMoviesRequestState, setSavedMoviesRequestState] = useState(SAVED_MOVIES_REQUEST_INITIAL_STATE)

  const handleSaveMovie = (movieToAdd) => {
    return saveMovieRequest(movieToAdd)
        .then((resMovie) => {
          setSavedMoviesList((prevState) => {
            return [...prevState, resMovie]
          });
        })
  }

  const handleDeleteMovie = (id) => {
    return deleteMovieRequest(id)
        .then(() => {
          setSavedMoviesList((prevState) => {
            return prevState.filter((movie) => movie._id !== id);
          });
        })
  }

  const handleSignIn = (email, password) => {
    return signInRequest(email, password)
        .then((data) => {
          localStorage.setItem('token', data.token);
          setIsLoggedIn(true);
        })
  }

  const handleSignOut = () => {
    localStorage.clear();
    setSavedMoviesList([]);
    setUserData(USER_DATA_INITIAL)
    setIsLoggedIn(false);
  }

  const handleUpdateUserData = (name, password) => {
    return updateUserDataRequest(name, password)
        .then(({ name, email, _id }) => {
          setUserData({ name, email, _id });
        })
  }

  const processUserDataRequest = () => {
    return getUserDataRequest()
        .then((userData) => {
          return userData
        })
        .catch((error) => {
          console.log(`%cCatch processUserDataRequest ${error}`, 'color: red');
        })
  }

  const getUserData = () => {
    processUserDataRequest()
        .then(({ name, email, _id }) => {
          setUserData({ name, email, _id });
        })
        .catch((error) => {
          console.log(`%cCatch getUserData ${error}`, 'color: red');
        });
  }

  const processLoginByToken = () => {
    processUserDataRequest()
        .then(({ email, name, _id }) => {
          setUserData({ email, name, _id });
          setIsLoggedIn(true);
          navigate(location.pathname);
        })
        .catch((error) => {
          console.log(`%cCatch processLoginByToken ${error}`, 'color: red');
        })
  }

  const getSavedMovies = () => {
    setSavedMoviesRequestState(() => ({ sent: true, failed: false, savedListEmpty: false }));
    getSavedMoviesRequest()
        .then((data) => {
          setSavedMoviesRequestState(() => ({ sent: false, failed: false, savedListEmpty: false }));
          setSavedMoviesList(data);
        })
        .catch((error) => {
          if (error === '404') {
            setSavedMoviesRequestState(() => ({ sent: false, failed: false, savedListEmpty: true }));
          } else {
            setSavedMoviesRequestState(() => ({ sent: false, failed: true, savedListEmpty: false }));
            console.log(`%cCatch getSavedMovies ${error}`, 'color: red');
          }
        })
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      processLoginByToken()
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn && !userData.email) {
      getUserData();
    }
    if (isLoggedIn) {
      getSavedMovies();
    }
  }, [isLoggedIn])

  const savedMoviesContextCombinedValue = useMemo(() => {
    return { savedMoviesList, handleSaveMovie, handleDeleteMovie, savedMoviesRequestState }
  }, [savedMoviesRequestState, savedMoviesList])

  return (
      <div className='app'>
        <CurrentUserContext.Provider value={{ ...userData, isLoggedIn }}>
          <SavedMoviesContext.Provider value={savedMoviesContextCombinedValue}>
            <Header />
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/movies'
                     element={
                       <ProtectedRoute redirectTo={'/'} passCondition={isLoggedIn}>
                         <Movies />
                       </ProtectedRoute>
                     }
              />
              <Route path='/saved-movies'
                     element={
                       <ProtectedRoute redirectTo={'/'} passCondition={isLoggedIn}>
                         <SavedMovies />
                       </ProtectedRoute>
                     }
              />
              <Route path='/profile'
                     element={
                       <ProtectedRoute redirectTo={'/'} passCondition={isLoggedIn}>
                         <Profile onSignOut={handleSignOut} onUpdateUserData={handleUpdateUserData} />
                       </ProtectedRoute>
                     }
              />
              <Route path='/signin'
                     element={
                       <ProtectedRoute redirectTo={'/movies'} passCondition={!isLoggedIn}>
                         <Signin onSignIn={handleSignIn} />
                       </ProtectedRoute>
                     }
              />
              <Route path='/signup'
                     element={
                       <ProtectedRoute redirectTo={'/movies'} passCondition={!isLoggedIn}>
                         <Signup onSignIn={handleSignIn} />
                       </ProtectedRoute>
                     }
              />
              <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer />
          </SavedMoviesContext.Provider>
        </CurrentUserContext.Provider>
      </div>
  );
}

export default App;
