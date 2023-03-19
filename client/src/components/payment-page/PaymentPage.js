import React,{useState,useRef,useCallback} from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import styles from './paymentPage.module.css'
import { LogInData } from '../AppContext';
import Button from '../button/Button';
import axios from 'axios';

const PaymentPage = () => {

  const selectRef = useRef(null)
  const payButtonRef = useRef(null)
 
  const [pay, setPay] = useState(false)

  const [payment, setPayment] = useState(10)

  const {player,token} = LogInData()

  const sendPayment = ()=>{
    axios.post(`http://localhost:3001/payment/pay/${player.id}`,{
      token:token,
      purchase: payment
    })
    .then(res=>{console.log(res.data)})
    .catch(err=>{console.log(err)})
   
  }


  const catchElement = ()=>{
    if(selectRef.current){
      console.log('gotcha')
      setPay(false) 
    }
  }
  
  const payAmmount = ()=>{
    payButtonRef.current.focus()
    setPay(!pay) 
  }




  const handleChange = (e)=>{
    setPayment(e.target.value )
  }
  const paypalOptions = {
     "client-id": `${process.env.REACT_APP_CLIENT_ID}`,
      currency:"ILS" 
}

const createOrder = useCallback((data, actions) => {
  return actions.order.create({
      purchase_units: [
          {
              amount: {
                  value: payment,
              },
          },
      ],
  });
},[payment])

const onApprove = (data, actions) => {
  return actions.order.capture().then((details) => {
      sendPayment()
      console.log('success')
  });
}

  return (
    <div className={styles.paymentPage}>
     <select ref={selectRef} onClick={catchElement} className={styles.select} value={payment} onChange={handleChange}>
        <option value="choose amount" >choose amount</option>
        <option onClick={payAmmount} value="10">10</option>
        <option onClick={payAmmount} value="25">25</option>
        <option onClick={payAmmount} value="50" >50</option>
        <option onClick={payAmmount} value="100">100</option>
        
      </select>
      <br/>
     {!pay?<div className={styles.purchase}> 
      <Button text={`Purchase`} onClick={()=>{setPay(!pay)}}/>
      </div>:
     <PayPalScriptProvider options={paypalOptions}>
        <div className={styles.paypal}>
            <PayPalButtons  createOrder={createOrder}
                onApprove={onApprove}/>
                </div>
        </PayPalScriptProvider> }
    
   
    </div>
  )
}

export default PaymentPage