import './App.css';
import { Route, Routes } from "react-router-dom";
import Navtest from "./components/navbar/Navtest";

/*IMPORT THE PAGES */
import Home from './routes/home/Home';
import Login from './routes/login/Login';
import Register from './routes/register/Register';
import Explore from './routes/explore/Explore';
import Create from './routes/create/Create';
import Profile from './routes/profile/Profile';
import Config from './routes/config/Config';
import Notification from './routes/notification/Notification';

function App() {
  return (
    <>
      <Navtest />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/config" element={<Config />} />
        <Route path="/create" element={<Create />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
