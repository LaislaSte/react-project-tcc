// HOOKS AND LIBS 
import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';

// ARCHIVES FROM PROJECT
import { auth } from './services/Banco';
import { CostumerProvider } from './services/UserContext';
import ProtectedRoute from './ProtectedRoute';

/*PAGES AND COMPONENTS */
import Loader from './components/loader/Loader';

const Public = lazy(() => import('./routes/public/Public'));
const Login = lazy(() => import('./routes/login/Login'));
const Register = lazy(() => import('./routes/register/Register'));
const ChangeEmail = lazy(() => import('./routes/changeinfuser/ChangeEmail'));
const ChangePassword = lazy(() => import('./routes/changeinfuser/ChangePassword'));
const ChangePasswordLogout = lazy(() => import('./routes/changeinfuser/ChangePasswordLogout'));
const DeleteAccount = lazy(() => import('./routes/changeinfuser/DeleteAccount'));
const Explore = lazy(() => import('./routes/explore/Explore'));
const Review = lazy(() => import('./routes/review/Review'));
const Following = lazy(() => import('./routes/following/Following'));
const Profile = lazy(() => import('./routes/profile/Profile'));
const Config = lazy(() => import('./routes/config/Config'));
const UserDetail = lazy(() => import('./routes/profile/UserDetail'));
const NotFound = lazy(() => import('./routes/public/NotFound'));
const Politics = lazy(() => import('./routes/public/Politics'));
const AboutUs = lazy(() => import('./routes/public/AboutUs'));
const Faq = lazy(() => import('./routes/public/Faq'));

function App() {

  // const [user, loading, error] = useAuthState(auth);
  // const navigate = useNavigate();

  // useEffect(
  //   () => {
  //     if (loading) {
  //       return (<Loader />);
  //     }
  //     if (user) navigate('/explore');

  //   },
  //   [user, loading]
  // );

  return (
    <>
      <CostumerProvider>
        <Suspense fallback={<Loader />}>

          <Routes>
            <Route path="/" element={<Public />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/changepasswordlogout' element={<ChangePasswordLogout />} />
            <Route path='/politics' element={<Politics />} />
            <Route path='/aboutus' element={<AboutUs />} />
            <Route path='/help' element={<Faq />} />
            <Route path="*" element={<NotFound />} />

            {/* private routes: */}
            <Route path="/changepassword" element={<ProtectedRoute> <ChangePassword /> </ProtectedRoute>} />
            <Route path="/changeemail" element={<ProtectedRoute> <ChangeEmail /> </ProtectedRoute>} />
            <Route path="/deleteaccount" element={<ProtectedRoute> <DeleteAccount /> </ProtectedRoute>} />
            <Route path="/config" element={<ProtectedRoute> <Config /> </ProtectedRoute>} />
            <Route path="/explore" element={<ProtectedRoute> <Explore /> </ProtectedRoute>} />
            <Route path="/following" element={<ProtectedRoute> <Following /> </ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
            <Route path="/review" element={<ProtectedRoute> <Review /> </ProtectedRoute>} />
            <Route path="/user/:id" element={<ProtectedRoute> <UserDetail /> </ProtectedRoute>} />
          </Routes>

        </Suspense>
      </CostumerProvider>
    </>
  );
}

export default App;
