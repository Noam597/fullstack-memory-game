import React,{useState} from 'react'
import { LoggedInUsers, LogInData } from '../AppContext'
import { Link, useNavigate} from 'react-router-dom';
import styles from './loginForm.module.css'
import axios from 'axios'
import {AiOutlineCheckCircle } from 'react-icons/ai'
import formValidator from '../formValidator';

const passwordCheck =/^(?=.*[a-z])(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[!@#$%&])[a-zA-Z0-9?!@#$%&]{8,}$/g
const emailCheck = /^([a-zA-Z0-9\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,3})?$/g


const LoginForm = () => {


  let navigate = useNavigate()
    const [flip, setFlip] = useState(false)

    const [loginInfo, setLoginInfo] = useState({
    email:'',
    password:''
   })

   const [registerInfo, setRegisterInfo] = useState({
    name:'',
    email:'',
    password:'',
    question1:'',
    answer1:'',
    question2:'',
    answer2:''
   })
   

  const [error, setError] = useState({})

   const [registered, setRegistered] = useState(false)

   const [errorMessage, setErrorMessage] = useState('')

   const { setIsLoggedIn} = LoggedInUsers()


  const {player, setPlayer,setToken} = LogInData()

    const flipPage = ()=>{
      setFlip(!flip)
      setRegistered(false)
      setErrorMessage('')
      setError({})
    }
    const handleChangeLogin = (e)=>{
      setLoginInfo({
        ...loginInfo,[e.target.name]:e.target.value,
      })
    }
    const handleChangeRegister = (e)=>{
      setRegisterInfo({
    ...registerInfo,[e.target.name]:e.target.value,
      })
    }
  

    const login =async (e)=>{
      e.preventDefault()
      axios.post('http://localhost:3001/members/login',{
        email:loginInfo.email,
        password:loginInfo.password
      }).then((res)=>{
        if(res.data.message){
          return setErrorMessage(res.data.message)
        }
        setPlayer(res.data.user)
        setToken(res.data.token)
        console.log(res.data.user)
        console.log(player)
        setIsLoggedIn(true)
        navigate('/')

      })
      .catch(err=>{console.log(err)})
      setError(formValidator(loginInfo))
    }

    const register = async (e)=>{
      e.preventDefault()
      console.log(registerInfo)
      if(!emailCheck.test(registerInfo.email)||
      !passwordCheck.test(registerInfo.password)
      ){
        console.log('fail')
        return setError(formValidator(registerInfo))
      }else{
      axios.post('http://localhost:3001/members/signup',{
        name:registerInfo.name,
        email:registerInfo.email,
        password:registerInfo.password,
        question1:registerInfo.question1,
        question2:registerInfo.question2,
        answer1:registerInfo.answer1,
        answer2:registerInfo.answer2
      }).then((res)=>{

        console.log(res.data)
        if(res.data.message){
          setErrorMessage(res.data.message)
        }else{
           if(res.data.response){
        setRegisterInfo({...registerInfo,
          name:'',
          email:'',
          password:'',
          answer1:'',
          answer2:''
        })
        setErrorMessage('')
        setRegistered(true)
      }else{
        console.log("nope")
      }
        }
       
      })
      .catch(err=>{console.log(err)})
      setError(formValidator(registerInfo))
    }
    }

  return (

    <form className={styles.loginForm}>
      <div className={`${styles.form} ` + (flip?`${styles.signUp}`:``)}>
        <div className={styles.login}>
            <h1>LOGIN</h1>
            <h3>Email</h3>
            <input type='email' name='email' value={loginInfo.email} onChange={handleChangeLogin}/>
            <h3>Password</h3>
            <input type='password' name='password' value={loginInfo.password} onChange={handleChangeLogin}/>
            {errorMessage && <h2 className={styles.error}>{errorMessage}</h2>}
             <button onClick={login}>LOGIN</button>
            <p>Not a member? <span onClick={flipPage}>Click here to Sign Up</span></p>
            <Link to={`/changepassword`}>Forgot password? Click Here</Link>
        </div>
        <div className={styles.register}>
           { !registered?<>
           <h1>SIGN UP</h1>
            <h3>Name</h3>
            <input type='text' name='name' value={registerInfo.name}  onChange={handleChangeRegister}/>
            {error.name && <p className={styles.error}>{error.name}</p>}
            <h3>Email</h3>
            <input type='email' name='email'  value={registerInfo.email} onChange={handleChangeRegister}/>
            {error.email && <p className={styles.error}>{error.email}</p>}
            <h3>Password</h3>
            <input type='text' name='password' value={registerInfo.password} onChange={handleChangeRegister}/>
            {error.password && <p className={styles.error}>{error.password}</p>}
            
            <select name='question1'value={registerInfo.question1} onChange={handleChangeRegister}>
            <option readOnly>Select a question </option>
              <option>Where we're you born?</option>
              <option>What was your Mothers maiden name?</option>
              <option>What is your pets name?</option>
            </select>
            <h3>Answer 1</h3>
            <input type='text' name='answer1'  value={registerInfo.answer1} onChange={handleChangeRegister}/>
            {error.answer1 && <p className={styles.error}>{error.answer1}</p>}
            <select name='question2' value={registerInfo.question2} onChange={handleChangeRegister}>
              <option>Select a question </option>
              <option>What city do you live in?</option>
              <option>What was your first job?</option>
              <option>What your first school?</option>
            </select>
            <h3>Answer 2</h3>
            <input type='text' name='answer2'  value={registerInfo.answer2} onChange={handleChangeRegister}/>
            {error.answer1 && <p className={styles.error}>{error.answer1}</p>}
            <button onClick={register}>SUBMIT</button>
            {errorMessage && <p>{errorMessage}</p>}
            <p>Already a member? <span onClick={flipPage}>Click here to Log In</span></p></>:
            <div className={styles.success}>
            <h2>Registration Successful</h2>
            <h2><AiOutlineCheckCircle/></h2>
            <p><span  onClick={flipPage}>Click Here To Log In</span></p>
            </div>}
            
        </div>
     </div>
    </form>
  )
}

export default LoginForm