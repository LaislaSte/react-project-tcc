import './App.css';
import React, {useContext} from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import { CostumerProvider, CostumerContext } from './services/UserContext';

/*IMPORT THE PAGES */
import Public from './routes/public/Public';
import Login from './routes/login/Login';
import Register from './routes/register/Register';
import Explore from './routes/explore/Explore';
import Create from './routes/create/Create';
import Profile from './routes/profile/Profile';
import Review from './routes/review/Review';
import Config from './routes/config/Config';
// import Notification from './routes/notification/Notification';

function App() {

  const Private = ({ children }) => {
    const { authenticated } = useContext(CostumerContext)

    // if (!authenticated) {
    //   return <Navigate to='/' />
    // }

    return children
  }

  return (
    <>
      <CostumerProvider>
        <Routes>
          <Route path="/" element={<Public />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/register" element={<Register />} />

          <Route path="/config" element={ <Private> <Config /> </Private>} />
          <Route path="/create" element={ <Private> <Create /> </Private>} />
          <Route path="/explore" element={ <Private> <Explore /> </Private>} />
          {/* <Route path="/notification" element={<Notification />} /> */}
          <Route path="/profile" element={ <Private> <Profile /> </Private> } />
          <Route path="/review" element={ <Private> <Review /> </Private> } />
        </Routes>
      </CostumerProvider>
    </>
  );
}

export default App;
