import React from 'react'
import styles from './errorPage.module.css'
const ErrorPage = () => {



  const image = `https://images.unsplash.com/photo-1610010837631-b623ac96d569?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNhcmRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60`
  return (
    <section>
      <div className={styles.cover}>
      <img src={image} alt="background cover"/>
      <h1>Page Not Found</h1>
      </div>
    </section>
  )
}

export default ErrorPage