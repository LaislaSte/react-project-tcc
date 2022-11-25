// HOOKS AND LIBS 
import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';

// ARCHIVES FROM PROJECT
import './App.css';
import { auth } from './services/Banco';
import { CostumerProvider } from './services/UserContext';
import ProtectedRoute from './ProtectedRoute';
import Loader from './components/loader/Loader';

/*PAGES AND COMPONENTS */
//testando melhoria de performance:
const Public = lazy(() => import('./routes/public/Public'));
const Login = lazy(() => import('./routes/login/Login'));
const Register = lazy(() => import('./routes/register/Register'));
const ChangeEmail = lazy(() => import('./routes/changeinfuser/ChangeEmail'));
const ChangePassword = lazy(() => import('./routes/changeinfuser/ChangePassword'));
// const SuccessPage = lazy( () =>  import('./routes/changeinfuser/SuccessPage') );
const DeleteAccount = lazy(() => import('./routes/changeinfuser/DeleteAccount'));
const Explore = lazy(() => import('./routes/explore/Explore'));
const Profile = lazy(() => import('./routes/profile/Profile'));
const Review = lazy(() => import('./routes/review/Review'));
const Config = lazy(() => import('./routes/config/Config'));
const UserDetail = lazy(() => import('./routes/profile/UserDetail'));
const NotFound = lazy(() => import('./routes/changeinfuser/NotFound'));

// import Public from './routes/public/Public';
// import Login from './routes/login/Login';
// import Register from './routes/register/Register';
// import ChangeEmail from './routes/changeinfuser/ChangeEmail';
// import ChangePassword from './routes/changeinfuser/ChangePassword';
// import SuccessPage from './routes/changeinfuser/SuccessPage';
// import DeleteAccount from './routes/changeinfuser/DeleteAccount';
// import Explore from './routes/explore/Explore';
// import Profile from './routes/profile/Profile';
// import Review from './routes/review/Review';
// import Config from './routes/config/Config';
// import UserDetail from './routes/profile/UserDetail';
// import NotFound from './routes/changeinfuser/NotFound';

function App() {

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  // useEffect(
  //   () => {
  //     if (loading) {
  //       //a loading screen/component
  //       return;
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
            <Route path="*" element={<NotFound />} />

            {/* private routes: */}
            <Route path="/changepassword" element={<ProtectedRoute> <ChangePassword /> </ProtectedRoute>} />
            <Route path="/changeemail" element={<ProtectedRoute> <ChangeEmail /> </ProtectedRoute>} />
            <Route path="/deleteaccount" element={<ProtectedRoute> <DeleteAccount /> </ProtectedRoute>} />
            {/* <Route path="/successpage" element={<ProtectedRoute> <SuccessPage /> </ProtectedRoute>} /> */}
            <Route path="/config" element={<ProtectedRoute> <Config /> </ProtectedRoute>} />
            <Route path="/explore" element={<ProtectedRoute> <Explore /> </ProtectedRoute>} />
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
