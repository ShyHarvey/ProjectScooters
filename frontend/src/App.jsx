import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { checkAuth } from './redux/authReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.scss'
import Header from './components/header/Header';
import LoginForm from './components/loginForm/LoginForm';
import { useDispatch } from 'react-redux';
import RegistrationForm from './components/registrationForm/registrationForm';

function App() {

  // const dispatch = useDispatch()

  // useEffect(()=>{
  //   if (localStorage.getItem('token')){
  //     dispatch(checkAuth())
  //   }
  // },[dispatch])


  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/login' element={<LoginForm />} />
          <Route path='/registration' element={<RegistrationForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
