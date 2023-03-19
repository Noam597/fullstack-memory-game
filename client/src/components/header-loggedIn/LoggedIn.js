import React from 'react'
import { LoggedInUsers, LogInData } from '../AppContext'
import AdminHeader from './AdminHeader';
import HeaderLoggedIn from './HeaderLoggedIn';
const LoggedIn = () => {

    const {isLoggedIn} =LoggedInUsers();
    const {player} = LogInData()

  return (
    <div>{isLoggedIn && player && player.admin ?
    <AdminHeader/>:<HeaderLoggedIn user={player.name}/>}</div>
  )
}

export default LoggedIn