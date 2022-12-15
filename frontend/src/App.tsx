import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { checkAuth } from './redux/authReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.scss'
import Header from './components/header/Header';
import LoginForm from './components/loginForm/LoginForm';
import { useAppDispatch } from './redux/hooks';
import RegistrationForm from './components/registrationForm/registrationForm';
import Catalog from './components/catalog/Catalog';
import NotFound from './components/notFound/NotFound';

const App: React.FC = () => {

  const dispatch = useAppDispatch()

  useEffect(()=>{
    if (localStorage.getItem('token')){
      dispatch(checkAuth())
    }
  },[dispatch])


  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Catalog />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/registration' element={<RegistrationForm />} />

          <Route path='*' element={<NotFound/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
