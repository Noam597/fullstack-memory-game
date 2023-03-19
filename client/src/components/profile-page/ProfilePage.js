import axios from 'axios'
import React,{useState, useEffect} from 'react'
import { LogInData } from '../AppContext'
import PaymentPage from '../payment-page/PaymentPage'
import styles from './profilePage.module.css'

const ProfilePage = () => {



   const {player}= LogInData()
   
  const [scores, setScores] = useState({
    easy:'',
    moderate:'',
    hard:'',
    timeAttack:'',
    bestTime:''
  })

useEffect(() => {
  if(player.id){
    axios.get(`http://localhost:3001/scores/${player.id}`)
  .then(res=>{
    console.log(res.data[0])
    const data = res.data[0]
    setScores({...scores,
      easy:data.easy,
      moderate:data.moderate,
      hard:data.hard,
      timeAttack:data.time_attack,
      bestTime:data.best_time
    })
  })
  .catch(err=>{console.log(err)})
  }
  
},[])



  return (
    <section className={styles.profilePage}>
      <div className={styles.profile}>
      <h1><i>Profile Page</i></h1>
      <h2>{player.name}</h2>
      <h1>HIGH SCORE</h1>
      <div style={{overflowX:"auto"}}>
      <table>
        <thead>
          <tr>
          <th> x</th>
          <th>best amount of clicks:</th>
          <th>Best Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>easy</td>
            <td>{scores.easy}</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Moderate</td>
            <td>{scores.moderate}</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Hard</td>
            <td>{scores.hard}</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Time Attack</td>
            <td>{scores.timeAttack}</td>
            <td>{scores.bestTime}</td>
          </tr>
        </tbody>
      </table>
      </div>
      <div>
        <h1>Number of Coins: x{player.coins}</h1>
      <PaymentPage/>
      </div>
      </div>
    </section>
  )
}

export default ProfilePage