import './App.css';
import React, { Component, useContext, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { CostumerProvider, CostumerContext } from './services/UserContext';
import { PostProvider } from './services/PostContext';

import ProtectedRoute from './ProtectedRoute';


/*IMPORT THE PAGES */
import Public from './routes/public/Public';
import Login from './routes/login/Login';
import Register from './routes/register/Register';

import { ChangePassword1 } from './routes/changeinfuser/ChangePassword';
// import { ChangeEmail1, ChangeEmail2 } from './routes/changeinfuser/ChangeEmail';
import SuccessePage from './routes/changeinfuser/SuccessePage';
import DeleteAccount from './routes/changeinfuser/DeleteAccount';

import Explore from './routes/explore/Explore';
import Profile from './routes/profile/Profile';
import Review from './routes/review/Review';
import Config from './routes/config/Config';
import { auth } from './services/Banco';
import { useAuthState } from 'react-firebase-hooks/auth';
import CreatePost from './components/popupmenu/CreatePost';

function App() {

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(
    () => {
      if (loading) {
        return;
      }
      if (user) navigate('/explore');

    },
    [user, loading]
  );

  // const Private = ({ children }) => {
  //   const { authenticated } = useContext(CostumerContext);


  //   // useEffect(
  //   //   () => {
  //   //     if (loading) {
  //   //       //a loading screen/component
  //   //       return;
  //   //     }
  //   //     if (user) return children;

  //   //   },
  //   //   [user, loading]
  //   // )

  //   // if (user) return children;
  //   if (user) return children;
  //   // if (!user) {
  //   //   console.log(user);
  //   //   return <Navigate to='/' />
  //   // }

  //   // return children
  // }

  return (
    <>
      <CostumerProvider>
        <Routes>
          <Route path="/" element={<Public />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/forgetpassword" element={<ChangePassword1 />} />
          {/* <Route path="/changepassword2" element={<ChangePassword2 />} />
          <Route path="/changeemail1" element={<ChangeEmail1 />} />
          <Route path="/changeemail2" element={<ChangeEmail2 />} /> */}
          <Route path="/deleteaccount" element={<DeleteAccount />} />
          <Route path="/successepage" element={<SuccessePage />} />

          {/* private routes: */}
          <Route path="/config" element={<ProtectedRoute> <Config /> </ProtectedRoute>} />
          <Route path="/explore" element={<ProtectedRoute> <Explore /> </ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
          <Route path="/review" element={<ProtectedRoute> <Review /> </ProtectedRoute>} />
        </Routes>
      </CostumerProvider>
    </>
  );
}

export default App;
