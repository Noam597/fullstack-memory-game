import axios  from 'axios'
import React,{useState,useEffect} from 'react'
import { LogInData } from '../AppContext'
import { BsX } from 'react-icons/bs'
import {FaBan,FaKey} from 'react-icons/fa'

import styles from './adminPage.module.css'
const AdminPage = () => {


  const{token} = LogInData()

  const [allPlayer, setAllPlayer] = useState([])
  const [error, setError] = useState(false)
  const [isSelected, setIsSelected] = useState([])
  const [selectPlayer, setSelectPlayer] = useState()
  const [id, setId] = useState(0)
  const [playerInfo, setPlayerInfo] = useState(false)
  const [addCoins, setAddCoins] = useState(false)
  const [addPlayerCoins, setAddPlayerCoins] = useState(0)


  useEffect(() => {
    axios.get('http://localhost:3001/admin')
    .then(res=>{
      const data = res.data
      console.log(data)
      setAllPlayer(data)
    })
    .catch(err=>{
      setError(true)
      console.log(err)
    })
  }, [selectPlayer])

  
  useEffect(() => {
      
            axios.get(`http://localhost:3001/admin/${id}`)
    .then( res=>{
      const data = res.data[0]
      if(data){
      
      console.log(data)
      setSelectPlayer(data)
      setPlayerInfo(true)
    }
    })
    .catch(err=>{
      // setError(true)
      console.log(err)
    })
  
      
    
  }, [id])

 const getPlayer =async (e)=>{
  setId(e.target.innerHTML)

 }
 const banPlayer = (e)=>{
  e.preventDefault()
  if(selectPlayer.id){
     axios.post(`http://localhost:3001/admin/banned/${selectPlayer.id}`,{
    token:token,
  })
  .then(res=>{
    console.log(res)
    if(selectPlayer && selectPlayer.banned){
      setSelectPlayer({...selectPlayer,banned:false})
    }
    else{
      setSelectPlayer({...selectPlayer,banned:true})
    }
    
  })
  .catch(err=>{console.log(err)})
  }else{
     console.log(selectPlayer)
  }
 
 }
  
  const removePlayer = (id)=>{

    axios.post(`http://localhost:3001/admin/removeplayer/${id}`,{
      token:token,
      id:id
    })
   .then(res=>{
    console.log(res.data)
    setAllPlayer(allPlayer.filter((p)=>{return p.id !== id}))
   
  })
   .catch(err=>{console.log(err)})
    console.log(id)
    console.log(allPlayer)
  }
  const exitRemove = ()=>{
    setIsSelected([])
    setId(0)
  
  }

  const selectRow =(i)=>{
    setIsSelected([i])

  }


 const selectElement = (e)=>{
  setId(e.target.innerHTML)
  console.log(e.target.innerHTML)
  
 }
 const exitPlayer = async (e)=>{
  e.preventDefault()
  setPlayerInfo(false)
   setSelectPlayer({})
  setId(null)
  setAddCoins(false);
 
 }
  
  const addMoreCoins = ()=>{
    setAddCoins(!addCoins);
  }
   const sendMoreCoins = (e)=>{
    e.preventDefault()
    setAddCoins(!addCoins);
   }
    
  

  return (
    <section className={styles.adminPage}>
      <div className={styles.table}>
        {error?<h1>Connection Error</h1>:
         <table>
          
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>email</th>
              <th>coins</th>
              <th>role</th>
              <th>ban player</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allPlayer.map((player,i)=>{
              const selectedRow = isSelected.indexOf(i) !== -1
              return <tr key={i} onClick={selectElement}>
               {!selectedRow?
               <><td onClick={getPlayer}>{player.id}</td>
                <td>{player.name}</td>
                <td>{player.email}</td>
                <td>{player.coins}</td>
                <td>{player.role}</td>
                <td>{player.banned?"Banned":"Ban"}</td>
                <td className={styles.btn} onClick={()=>selectRow(i)}>Remove</td>
                </>: <td className={styles.remove} colSpan={'7'}>are you sure you want to remove theis player?
                  <button onClick={()=>{removePlayer(player.id)}}>yes</button>
                  <button onClick={exitRemove}>no</button>
                  </td>}
              </tr>
            })}
          </tbody>
        </table>
        }
       
       
      </div> 
      {playerInfo && selectPlayer && <div className={styles.playerForm}>
          <form> 
            <h3>Name: {selectPlayer.name}<button className={styles.exit_btn} onClick={exitPlayer}><BsX/></button></h3>
            <h3>Email: {selectPlayer.email}</h3>
            {addCoins?<>
            <input name='coins' type='number' value={addPlayerCoins} onChange={(e)=>{setAddPlayerCoins(e.target.value)}}/>
            <button className={styles.addCoin}  onClick={sendMoreCoins}>Send</button></>
            :<h3>Coins: {selectPlayer.coins} <button className={styles.addCoin} onClick={addMoreCoins}>Add</button></h3>}
            <h3>Role: {selectPlayer.role}</h3>
           <h3>Status: {selectPlayer.banned?"Banned":"Ban"}  {selectPlayer.banned? <button className={styles.ban_btn} onClick={banPlayer}><FaKey/></button>
              :<button className={styles.ban_btn} onClick={banPlayer}><FaBan/></button> }
            </h3>
          </form>
        </div>}
    </section>
  )
}

export default AdminPage