import React,{useState,useEffect} from 'react'
import axios from 'axios'
import styles from './adminPrices.module.css'
import Form from '../form/Form'

const AdminPrices = () => {

    const [memoryGamePrices, setMemoryGamePrices] = useState([])
  
    const [edit, setedit] = useState(true)
useEffect(() => {
  axios.get(`http://localhost:3001/prices`)
  .then(res=>{
    console.log(res.data[0])
    setMemoryGamePrices(res.data[0])
  })
  .catch(err=>{console.log(err)})
}, [])

const editPrice = (e)=>{
  e.preventDefault();
  setedit(!edit)
}

const updateThePrice = (e)=>{
  e.preventDefault();
  axios.post(`http://localhost:3001/prices/updateprices`,
  {
    easy:memoryGamePrices.easy,
    moderate:memoryGamePrices.moderate,
    hard:memoryGamePrices.hard,
    time_attack:memoryGamePrices.time_attack
  }).then(res=>{
    if(res.data.message){
      setedit(false)
       return console.log(res.data.message)
    }
    setedit(!edit)
  })
  .catch(err=>{
    console.log(err)
  })
  
}

const handleChange = (e)=>{
  setMemoryGamePrices({
    ...memoryGamePrices,[e.target.name]:e.target.value,
  })
}
  return (
    <section  className={styles.adminPricesPage}>
      <div className={styles.adminPrices}>
        {memoryGamePrices && 
            <Form>
            <h2>{memoryGamePrices.game} Prices</h2>
            <h3>Easy</h3>
            <input name='easy' type='number' value={memoryGamePrices.easy} onChange={handleChange} readOnly={edit}/> ILS
            <h3>Moderate</h3>
            <input name='moderate' type='number' value={memoryGamePrices.moderate} onChange={handleChange} readOnly={edit}/> ILS
            <h3>Hard</h3>
            <input name='hard' type='number' value={memoryGamePrices.hard} onChange={handleChange} readOnly={edit}/> ILS
            <h3>Time Attack</h3>
            <input name='time_attack' type='number' value={memoryGamePrices.time_attack} onChange={handleChange} readOnly={edit}/> ILS        
            {edit?<input type="submit" value="Edit" onClick={editPrice}/>:<input value="Update" type="submit" onClick={updateThePrice}/>}

            </Form>
            }
            </div>
    </section>
  )
}

export default AdminPrices