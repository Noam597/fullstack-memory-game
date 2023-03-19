import React,{ useState,useContext,createContext } from 'react'


export const LoginContext = createContext({});

export const LoginFormContext = createContext({});

const AppContext = ({children}) => {

const [isLoggedIn, setIsLoggedIn] = useState(false);



 const [player, setPlayer] = useState([{}])
 const [token, setToken] = useState("")



  return (
    <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
      <LoginFormContext.Provider value={{player, setPlayer,token,setToken}}>
        {children}
        </LoginFormContext.Provider>
    </LoginContext.Provider>
  )
}

export default AppContext


export const LoggedInUsers = ()=>{
    return useContext(LoginContext)
}

export const LogInData = ()=>{
  return useContext(LoginFormContext)
}