import React from 'react'
import MemoryGame from '../newGame/MemoryGame'
import { cardsArray } from '../arrays/cardArrays'

const EasyMemoryGame = () => {
  return (
    <section>
         <MemoryGame difficulty="Easy" array={cardsArray}/>
    </section>
  )
}

export default EasyMemoryGame