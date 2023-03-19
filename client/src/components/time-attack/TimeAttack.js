import React,{useState,useEffect,useRef,useCallback} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {shuffle} from 'lodash'
import styles from './timeAttack.module.css'
import Overlay from '../overlay/Overlay';
import { timeAttackArray,backCard } from '../arrays/timeAttackArray';
import { LogInData } from '../AppContext';

export const TimeAttack = () => {


    let navigate = useNavigate()

    const gameTimerRef = useRef()

    const [cards, setCards] = useState(shuffle([...timeAttackArray,...timeAttackArray]))
    const [flippedCard, setFlippedCard] = useState([]);
    const [matches, setMatches] = useState([]);
    const [start, setStart] = useState(true)
    const [win, setWin] = useState(false)
    const [lost, setLost] = useState(false)
    const [timeAninmation, setTimeAninmation] = useState('')
    const [clicks, setClicks] = useState(0)
    const [seconds, setSeconds] = useState(50)
    const [minutes, setMinutes] = useState(1);
  


    const{player,token} = LogInData()

    const payToPlay = ()=>{
        axios.post(`http://localhost:3001/payment/paytoplay/${player.id}`,{
            token:token,
            pay:player.coins}
        ).then(
            setStart(false)
        ).catch(err=> {throw err})
    }
   
 

    const bestsCore = ()=>{
        axios.post(`http://localhost:3001/scores/bestscore`,{
            token:token,
            level:'time_attack',
            player_id:player.id,
            clicks:clicks,
            time:`${minutes}:${seconds}`  
        }).then(res=>console.log(res)).catch(err=>console.log(err))
    }

    
    var numSec 
   
    if(seconds < 10){
        numSec = "0" + seconds
    }else{
        numSec = seconds
    }
  
    
    const flipTheCard =(index)=>{
        setClicks(clicks + 1)
        if(flippedCard.length === 0){
            setFlippedCard([index]) 
        }
        if(flippedCard.length === 1){
            console.log(flippedCard)
            const firstCard = flippedCard[0];
            const secondCard = index;

            if(flippedCard.includes(index)){
                setFlippedCard([index])
        }else{
            if(cards[firstCard] === cards[secondCard]){
                console.log("match found")
                if(matches.length + 2 === cards.length){
                    setWin(true) 
                    bestsCore()
                }
                setMatches([...matches,firstCard,secondCard]);
                console.log(matches)
            }
            setFlippedCard([...flippedCard,index])
        }}
        if(flippedCard.length === 2){
            console.log(flippedCard)
            console.log(matches)
            setFlippedCard([index]) 
        }
    }

    const begin = ()=>{
        payToPlay()
        setSeconds(prevSeconds =>prevSeconds - 1);
    } 

  const countDown = useCallback(()=>{
        if(seconds === 0){
            setMinutes(minutes - 1)
            setSeconds(59)
        }
        if(seconds === 1 && minutes === 0 && matches.length + 2 === cards.length){
            
             setWin(true)
        }
        else if(seconds === 1 && minutes === 0 && matches.length + 2 !== cards.length){
            setLost(true);  
        } 
    },[seconds,minutes,cards,matches])

  const beginCountDown =  useCallback(()=>{
        if(start === false){
           setSeconds(prevSeconds =>prevSeconds - 1);
             countDown()
             console.log(seconds)
      }
    
        },[seconds,countDown,start])

    useEffect(() => {
                gameTimerRef.current =  setInterval(beginCountDown,1000)
            if(seconds === 0 && minutes === 0){
                clearInterval(gameTimerRef.current)
            }
                if(win){
                    clearInterval(gameTimerRef.current)
                }

                if(seconds <=10 && seconds > 0 && minutes === 0){
                    setTimeAninmation(`${styles.timer}`)
                }else{
                    setTimeAninmation(``)
                }
        return ()=>{
            clearInterval(gameTimerRef.current)
            }
    },[beginCountDown,seconds,minutes,win])

  



    const reset = ()=>{
        setFlippedCard([])
        setMatches([]);
        payToPlay()
        setWin(false);
        setLost(false)
        setClicks(0)
        reshuffle()
        setMinutes(1)
        setSeconds(50)
    }

    

    useEffect(()=>{
        const timer = setTimeout(() => {
            setFlippedCard([])
        }, 2000);
        return ()=> {clearTimeout(timer)}
    })

    function reshuffle() {
         const shuffler = setTimeout(() => {
           setCards(shuffle([...timeAttackArray,...timeAttackArray])); 
        }, 500);
        return ()=> clearTimeout(shuffler)
    }


    return (
        <div className={styles.gameBoard}>
         
            {start &&(<Overlay
            start={styles.start}
            playAgain={begin}
            title='Start Game'
            />)}

            {win &&(<Overlay
            start={styles.won}
            playAgain={reset}
            title='You Won Congratulations!'
            filler={`Number of Clicks: ${clicks}    Time:${minutes}:${numSec}`}
            filler2='want to play again?'
            matches='All Matches Found'
            />)}
            
            {lost &&(<Overlay
            start={styles.lost}
                playAgain={reset}
                title='Times Up! You Lose!'
                matches={`Matches Found ${matches.length}`}
                filler2='want to play again?'
            />)}
            <p onClick={()=>{navigate('/React-memory-game')}}><b><u>Return to Main Menu</u></b></p>
             <h1 className={styles.title}>Difficulty: Time Attack <span className={timeAninmation}>{minutes}:{numSec}</span></h1>
            <div className={styles.tablesize} >
                {cards.map((card,i)=>{
                    const flippedOver = (flippedCard.indexOf(i) !== -1) || matches.indexOf(i) !== -1;
                
      
                  return (<div id={card.id} className={`${styles.cardSize} ` + (flippedOver? `${styles.flipped}`:``)} key={i} onClick={()=>flipTheCard(i)}>
                  
                  <div className={styles.inner}>
              <div className={styles.front}>
                  <img src={backCard.img} alt={backCard.alt}/>
              </div>
              <div className={styles.back}>
                  <img src={card.img} alt={card.alt} />
                  </div>
                  </div>
              </div>)
                  })} 
                  </div>
                  <div className={styles.stats}>
                  <>
                  
                  </>
                  <h2>
                  Clicks: {clicks}
                  </h2>
                  <h2> Pairs found: {matches.length/2}</h2>
                   <button  onClick={reset}>reshuffle</button>
                  </div>
              
        </div>
    )
}
