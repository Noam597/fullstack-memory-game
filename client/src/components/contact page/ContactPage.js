import React,{useState} from 'react'
import { LogInData } from '../AppContext'
import styles from './contact.module.css'
import Form from '../form/Form'
const ContactPage = () => {
   const{player} = LogInData()

const [contactMessage, setContactMessage] = useState('')
const [messageSent, setmessageSent] = useState(false)
const handleSubmit=(e)=>{
  e.preventDefault()
  setContactMessage('')
  setmessageSent(true)
}


  return (
    <section className={styles.contactForm}>
        <div className={styles.contactInfo}>
          <h2>Email: gameroom@mail.com</h2>
          <h2>Phone: (972+)555 - 5555</h2>
          <h2>Address: 1600 Pensylvania ave</h2>
        </div>
        <Form  onSubmit={handleSubmit}>
          { !messageSent?<><h1>Contact Us</h1>
            <label>Name:</label>
           <input name='name' value={player.name} readOnly/>
           <label>Email:</label>
           <input name='email' value={player.email} readOnly/>
           <label>Message:</label>
           <textarea value={contactMessage} onChange={(e)=>{setContactMessage(e.target.value)}}/>
           <input type={'submit'}/></>:
           <div className={styles.contactInfo}>
              <h2>Message Sent</h2>     
            </div>}
        </Form>
    </section>
  )
}

export default ContactPage