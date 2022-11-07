import './App.css';
import React, { useContext } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import { CostumerProvider, CostumerContext } from './services/UserContext';
import { PostProvider } from './services/PostContext';

/*IMPORT THE PAGES */
import Public from './routes/public/Public';
import Login from './routes/login/Login';
import Register from './routes/register/Register';

import { ChangePassword1, ChangePassword2 } from './routes/changeinfuser/ChangePassword';
import { ChangeEmail1, ChangeEmail2 } from './routes/changeinfuser/ChangeEmail';
import SuccessePage from './routes/changeinfuser/SuccessePage';
import DeleteAccount from './routes/changeinfuser/DeleteAccount';

import Explore from './routes/explore/Explore';
import Profile from './routes/profile/Profile';
import Review from './routes/review/Review';
import Config from './routes/config/Config';

function App() {

  const Private = ({ children }) => {
    const { authenticated } = useContext(CostumerContext)

    if (!authenticated) {
      return <Navigate to='/' />
    }

    return children
  }

  return (
    <>
      <CostumerProvider>
        <Routes>
          <Route path="/" element={<Public />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/changepassword1" element={<ChangePassword1 />} />
          <Route path="/changepassword2" element={<ChangePassword2 />} />
          <Route path="/changeemail1" element={<ChangeEmail1 />} />
          <Route path="/changeemail2" element={<ChangeEmail2 />} />
          <Route path="/deleteaccount" element={<DeleteAccount />} />
          <Route path="/successechange" element={<SuccessePage />} />

          <Route path="/config" element={<Private> <Config /> </Private>} />
          <Route path="/explore" element={<Private> <Explore /> </Private>} />
          <Route path="/profile" element={<Private> <Profile /> </Private>} />
          <Route path="/review" element={<Private> <Review /> </Private>} />
        </Routes>
      </CostumerProvider>

    </>
  );
}

export default App;
