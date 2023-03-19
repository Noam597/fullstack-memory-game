import {Route,Routes} from 'react-router-dom';
import './App.css';
import { LoggedInUsers, LogInData } from './components/AppContext';
import Header from './components/header/Header';
import LandingPage from './components/landingPage/LandingPage';
import ContactPage from './components/contact page/ContactPage';
import Footer from './components/footer/Footer';
import Games from './components/games/Games';
import ProfilePage from './components/profile-page/ProfilePage';
import EasyMemoryGame from './components/games/EasyMemoryGame';
import ModerateMemoryGame from './components/games/ModerateMemoryGame';
import HardMemoryGame from './components/games/HardMemoryGame';
import { TimeAttack } from './components/time-attack/TimeAttack';
import ErrorPage from './components/error404page/ErrorPage';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import AdminPage from './components/adminPage/AdminPage';
import LoggedIn from './components/header-loggedIn/LoggedIn';
import AdminRegisterPage from './components/adminRegister/AdminRegisterPage';
import AdminPrices from './components/adminPrices/AdminPrices';
import ChangePassword from './components/changepassword/ChangePassword';

function App() {

const {isLoggedIn} =LoggedInUsers();


    const {player} = LogInData();

  return (
    <div className="App">
     
      {isLoggedIn?<LoggedIn/>:<Header/>}
      <Routes>
        <Route path='/login' element={<LandingPage/>} />
        <Route path='/changepassword' element={<ChangePassword/>} />
        {player && player.admin?<Route element={<ProtectedRoute/>}> 
        <Route path='/' element={<AdminPage/>}/>
        <Route path='/addmember' element={<AdminRegisterPage/>}/>
        <Route path='/prices' element={<AdminPrices/>}/>
        </Route>:
        <Route element={<ProtectedRoute/>}> 
          <Route path='/' element={<Games/>}>
            <Route path='easy' element={<EasyMemoryGame/>} />
            <Route path='moderate' element={<ModerateMemoryGame/>} />
            <Route path='hard' element={<HardMemoryGame/>} />
            <Route path='timeattack' element={<TimeAttack/>} />
          </Route>
          <Route path='profile' element={<ProfilePage/>}/>
          <Route path='contact' element={<ContactPage/>}/>
        
        </Route>}
        <Route path='*' element={<ErrorPage/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
