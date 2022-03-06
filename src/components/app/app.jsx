import './app.css';
import { Routes, Route } from 'react-router-dom';
import Header from '../header/header';
import Movies from '../../pages/movies/movies';
import Landing from '../../pages/landing/landing';
import SavedMovies from '../../pages/saved-movies/saved-movies';
import Profile from '../../pages/profile/profile';
import Signin from '../../pages/signin/signin';
import Signup from '../../pages/signup/signup';
import Footer from '../footer/footer';
import NotFound from '../../pages/not-found/not-found';


function App() {

  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
