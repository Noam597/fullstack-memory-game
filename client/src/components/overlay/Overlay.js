import React from 'react'
import {FaHandPointLeft,FaHandPointRight} from 'react-icons/fa'
import styles from './overlay.module.css'
import { LogInData } from '../AppContext';
import PaymentPage from '../payment-page/PaymentPage';


const Overlay = ({start,title,filler,filler2,matches,playAgain}) => {
    const {player} = LogInData()

  return (
    <>
   { player.coins ?<div className={styles.overlay}>
                <div className={start} onClick={playAgain}>
                 <h1>{title}</h1>
                 <p>{filler}</p>
                <p>{filler2}</p>
                <h2>{matches}</h2>
                <p><FaHandPointRight/><b>Click Here</b><FaHandPointLeft/></p> 
                 </div>
            </div>:<div className={styles.overlay}>
                
                  <h1 style={{color:"white"}}>You have no coins</h1>
                  <p>buy more to keep playing</p>
                  <PaymentPage/>

                </div>}
            
            </>
  )
}

export default Overlay