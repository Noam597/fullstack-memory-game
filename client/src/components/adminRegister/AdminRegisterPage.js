import React,{useState} from 'react'
import axios from 'axios'
import {AiOutlineCheckCircle } from 'react-icons/ai'
import styles from './adminRegister.module.css'
import Form from '../form/Form'
import formValidator from '../formValidator'
const AdminRegisterPage = () => {


    const [registerInfo, setRegisterInfo] = useState({
        name:'',
        email:'',
        password:''
       })
       
    
       const [registered, setRegistered] = useState(false)
    
       const [errorMessage, setErrorMessage] = useState('')

       const [error, setError] = useState({})
       const handleChangeRegister = (e)=>{
        setRegisterInfo({
      ...registerInfo,[e.target.name]:e.target.value,
        })
      }
      const addPlayer = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:3001/admin/addplayer',{
          name:registerInfo.name,
          email:registerInfo.email,
          password:registerInfo.password
        }).then((res)=>{
  
          console.log(res.data)
          if(res.data.message){
            setErrorMessage(res.data.message)
          }else{
             if(res.data.response){
          setRegisterInfo({...registerInfo,
            name:'',
            email:'',
            password:''
          })
          setErrorMessage('')
          setRegistered(true)  
          setTimeout(()=>{
            setRegistered(false)
        },3000)
        }else{
          console.log("nope")
        }
          }
         
        })
        .catch(err=>{console.log(err)})
        // setRegistered(!registered)
        setError(formValidator(registerInfo))
      }

  return (
    <section className={styles.adminRegisterPage}>
        <div className={styles.adminRegister}>
          <Form onSubmit={addPlayer}>
        { !registered?<>
           <h1>ADD NEW PLAYER</h1>
            <h3>Name</h3>
            <input type='text' name='name' value={registerInfo.name}  onChange={handleChangeRegister}/>
            {error.name && <p className={styles.error}>{error.name}</p>}
            <h3>Email</h3>
            <input type='text' name='email'  value={registerInfo.email} onChange={handleChangeRegister}/>
            {error.email && <p className={styles.error}>{error.email}</p>}
            <h3>Password</h3>
            <input type='text' name='password' value={registerInfo.password} onChange={handleChangeRegister}/>
            {error.password && <p className={styles.error}>{error.password}</p>}
            <input type={'submit'} value={'SUBMIT'}/>
            {errorMessage && <p>{errorMessage}</p>}
            </>:
            <div className={styles.success}>
                <h2>Registration Successful</h2>
                <h2><AiOutlineCheckCircle/></h2>
            </div>}
        </Form>
        </div>
    </section>
  )
}

export default AdminRegisterPage