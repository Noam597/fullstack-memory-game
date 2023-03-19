import React,{useState} from 'react'
import styles from './footer.module.css'
import axios from 'axios'
const Footer = () => {

const [newsLetter, setNewsLetter] = useState({
    name:'',
    email:''
})
const [response, setResponse] = useState()


const handleChangeNewsLetter = (e)=>{
    setNewsLetter({
      ...newsLetter,[e.target.name]:e.target.value,
    })
  }
  const subscribe = async (e)=>{
    e.preventDefault()
    axios.post(`http://localhost:3001/members/subscribe`,{
      name:newsLetter.name,
      email:newsLetter.email

    }).then(res=>{
      const answer = res.data
      console.log(res.data)
      if(answer.message){
        setResponse(answer.message)
      }
      if(answer.response){
        setResponse(answer.response)
      }
      setNewsLetter({name:'',email:''})
    }).catch(err=>{console.log(err)})
  }


  return (
    <footer className={styles.footer} onSubmit={subscribe}>
        <form>
            <h4>Subscribe To News Letter</h4>
            <label htmlFor='name'>Name:</label>
            <input id='name' type='text' name='name' value={newsLetter.name} onChange={handleChangeNewsLetter}/>
            <label htmlFor='email'>Email:</label>
            <input id='email' type='email' name='email' value={newsLetter.email}  onChange={handleChangeNewsLetter}/>
            {response && <p style={{color:'red'}}>{response}</p>}
            <input type='submit'/>
        </form>
    </footer>
  )
}

export default Footer