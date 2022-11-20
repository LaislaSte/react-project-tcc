// HOOKS AND LIBS 
import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';

// ARCHIVES FROM PROJECT
import './App.css';
import { auth } from './services/Banco';
import { CostumerProvider } from './services/UserContext';
import ProtectedRoute from './ProtectedRoute';

/*PAGES AND COMPONENTS */
import Public from './routes/public/Public';
import Login from './routes/login/Login';
import Register from './routes/register/Register';
import ChangeEmail from './routes/changeinfuser/ChangeEmail';
import ChangePassword from './routes/changeinfuser/ChangePassword';
import SuccessPage from './routes/changeinfuser/SuccessPage';
import DeleteAccount from './routes/changeinfuser/DeleteAccount';
import Explore from './routes/explore/Explore';
import Profile from './routes/profile/Profile';
import Review from './routes/review/Review';
import Config from './routes/config/Config';

function App() {

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(
    () => {
      if (loading) {
        //a loading screen/component
        return;
      }
      if (user) navigate('/explore');

    },
    [user, loading]
  );

  return (
    <>
      <CostumerProvider>
        <Routes>
          <Route path="/" element={<Public />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* private routes: */}
          <Route path="/changepassword" element={<ProtectedRoute> <ChangePassword /> </ProtectedRoute>} />
          <Route path="/changeemail" element={<ProtectedRoute> <ChangeEmail /> </ProtectedRoute>} />
          <Route path="/deleteaccount" element={<ProtectedRoute> <DeleteAccount /> </ProtectedRoute>} />
          <Route path="/successpage" element={<ProtectedRoute> <SuccessPage /> </ProtectedRoute>} />
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
