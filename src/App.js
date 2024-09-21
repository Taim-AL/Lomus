import './Assets/Style.css';
import Rigestert from './Sections/Rigester';
import { Routes ,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Sections/Login';
import Forget from './Sections/ForgetPwd';
import React from 'react';
import Verify from './Sections/Verify';
import Intro from './Sections/Intro';
import Home from './Sections/Home';
import VerifyChange from './Sections/VerifyChange';
import ChangePassword from './Sections/ChangePassword';
import Layout from './Components/Layout';
import RequireAuth from './Components/RequireAuth';
import PersistLogin from './Components/PersistLogin';
import VerifyChangeContact from './Sections/VerifyChangeContact';

function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<Layout/>}>

          <Route   element={<Intro/>} path={'/'} />
          <Route   element={<Rigestert/>} path={'/rigester/*'}/>
          <Route   element={<Verify/>} path={'/verify'}/>
          <Route   element={<VerifyChangeContact/>} path={'/changeContact'}/>
          <Route   element={<VerifyChange/>} path={'/verify-password'}/>
          <Route   element={<Login/>} path={'/login'}/>
          <Route   element={<Forget/>} path={'/forget'}/>
          <Route   element={<ChangePassword/>} path={'/changePassword'}/>
          <Route element={<PersistLogin/>}>
          <Route element={<RequireAuth/>}>
            <Route   element={<Home/>} path={'/home/*'}/>
          </Route>
          </Route>
        </Route>
      </Routes>

    </>
  );
}

export default App;
