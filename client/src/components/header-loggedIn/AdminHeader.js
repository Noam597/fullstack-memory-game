import React,{useState} from 'react'
import { LoggedInUsers, LogInData } from '../AppContext'
import { useNavigate} from 'react-router-dom';
import {FaBars} from 'react-icons/fa'
import styles from './headerLoggedIn.module.css'
const AdminHeader = () => {
 
    let navigate = useNavigate()

    const [menu, setMenu] = useState(false)
    const {isLoggedIn,setIsLoggedIn} =LoggedInUsers();
    const {setPlayer,setToken} = LogInData()
  



const logout = ()=>{
    setIsLoggedIn(!isLoggedIn)
    setPlayer({})
    setToken("")
    navigate('/')
} 

    return (
    <header className={styles.loggedIn} >
        <h1 className={styles.title}>Welcome Your Highness</h1>
        <nav className={`${styles.navBar} ${menu && styles.menu}`}>
            <ul onClick={()=>{setMenu(!menu)}}>
                <li onClick={()=>{navigate('/')}}>Players List</li>
                <li onClick={()=>{navigate('/addmember')}}>Add Member</li>
                <li onClick={()=>{navigate('/prices')}}>Prices</li>
                <li onClick={logout}>LOGOUT</li>
            </ul>
            <button className={styles.menuButton} onClick={()=>{ setMenu(!menu)  }}>
             <FaBars/>
         </button>
        </nav>
        {/* <Outlet/> */}
    </header>
  )
}

export default AdminHeader