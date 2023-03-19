import axios from 'axios';
import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import Form from '../form/Form';
import formValidator from '../formValidator';
const ChangePassword = () => {

  

    const [changePassword, setChangePassword] = useState({
        email:false,
        password:false
        });
        const [user, setUser] = useState({
            email:'',
            question1:'',
            question2:""
        })

    const [info, setInfo] = useState({
        answer1:"",
        answer2:"",
        password1:"",
        password2:"",
    })
    const [passwordChanged, setpasswordChanged] = useState(false)

    const [error, setError] = useState({})

    const verifyEmail = (e)=>{
        e.preventDefault();
        axios.post(`http://localhost:3001/changepassword`,{
            email:user.email
        }).then(res=>{
            console.log(res.data[0])
            const data = res.data[0]
            setChangePassword({...changePassword, email:true})
            setUser({...user,question1:data.question1,question2:data.question2})
        }).catch(err=>{console.log(err)})
    }

    const verifyPlayer = (e)=>{
        e.preventDefault();
        if(user.email){
        axios.post(`http://localhost:3001/changepassword/change`,{
            email:user.email,
            answer1:info.answer1,
            answer2:info.answer2,
        }).then(res=>{
            console.log(res)
            setChangePassword({...changePassword, password:true})
           
        }).catch(err=>{console.log(err)})
        setError(formValidator(info))
    }else{
        return
    }
    }

    const resetPassword = (e)=>{
        e.preventDefault();
        if(user.email && info.password1 === info.password2){
            axios.post(`http://localhost:3001/changepassword/changepassword`,{
                email:user.email,
                password1:info.password1,
                password2:info.password2,
            }).then(res=>{
                console.log(res)
                setChangePassword({...changePassword,email:false,password:false})
                setInfo({...info,
                 answer1:"",
                answer2:"",
                password1:"",
                password2:"",})
                setUser({...user,      
                    email:'',
                    question1:'',
                    question2:""})
                    setpasswordChanged(true)
            }).catch(err=>{console.log(err)})
            setError(formValidator(info))
        }
    }
    

    const handleChange = (e) =>{
        setInfo({
            ...info,[e.target.name]:e.target.value,
              })
    }
  return (
    <section style={{background:"black"}}>
        {passwordChanged?
        <Form>
            <h2>Password changed successfully</h2>
        </Form>:
        <Form>
          { changePassword.password && changePassword.email ?<>
          <label>password</label>
          <input name='password1' value={info.password1} onChange={handleChange} />
          <label>Repeat password</label>
          <input name='password2' value={info.password2} onChange={handleChange} />
          <input type="submit" onClick={resetPassword}/>
          </>:<>
                { !changePassword.email && !changePassword.password?
          <>
            <h3>email</h3> 
            <input name='email' type='email' value={user.email} onChange={(e)=>{setUser({...user,email:e.target.value})}}/>
            {error.email && <p>{error.email}</p>}
            <input type='submit' onClick={verifyEmail}/>
          </>
            :<>
            <h3>{user.email}</h3>
            <h3>{user.question1}</h3>
            <input name='answer1' type='text' value={info.answer1} onChange={handleChange} />
            <h3>{user.question2}</h3>
            <input name='answer2' type='text' value={info.answer2} onChange={handleChange}/>
            <input type="submit" onClick={verifyPlayer}/>
            </>}
            </>}
            <Link to={`/login`}>Back To Login Page</Link>
        </Form>}
    </section>
  )
}

export default ChangePassword