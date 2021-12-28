import './App.css';
import { Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Home from './components/Landing Page/Home';
import SignIn from './components/Register-Login Page/Login/SignIn';
import SignUp from './components/Register-Login Page/Register/SignUp';
import ContactUs from './components/Contact Us Page/ContactUs';
import About from './components/About Page/About';
import SetProfile1 from './components/SetProfile Page/SetProfile1';
import Otp from './components/OTP Page/Otp';
import Dashboard from './components/DashBoard Page/Dashboard';
import Profile from './components/Profile Page/Profile';
import Interest from './components/Interest Page/Interest';
import EditProfile from './components/Edit Profile Page/EditProfile';
import Favourite from './components/Favourite Page/Favourite';

const App = () =>{
  return(
    <>
      <Route exact path="/"><Home /></Route>
      <Route exact path="/about"><About /></Route>
      <Route exact path="/login"><SignIn /></Route>
      <Route exact path="/register"><SignUp /></Route>
      <Route exact path="/contact"><ContactUs /></Route>
      <Route exact path="/otp"><Otp /></Route>
      <Route exact path="/user"><Profile /></Route>
      <Route exact path="/interests"><Interest /></Route>
      <Route exact path="/profile"><SetProfile1 /></Route>
      <Route exact path="/home"><Dashboard /></Route>
      <Route exact path="/edit/profile"><EditProfile /></Route>
      <Route exact path="/favourites"><Favourite /></Route>
    </>
  ); 
}

export default App;
