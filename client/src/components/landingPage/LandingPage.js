import React from 'react'
import LoginForm from '../loginForm/LoginForm'
import styles from './landingPage.module.css'

const frontImage ='https://images.unsplash.com/photo-1501003878151-d3cb87799705?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyZCUyMGdhbWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
         <div className={styles.cover}>
            <img src={frontImage} alt='cards'/>
        </div>
        <LoginForm/>
    </div>
  )
}

export default LandingPage