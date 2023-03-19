import React from 'react'
import MemoryGame from '../newGame/MemoryGame'
import { luxuryCarsArray } from '../arrays/luxuryCarsArray'

const ModerateMemoryGame = () => {
  return (
    <section>
         <MemoryGame difficulty="Moderate" array={luxuryCarsArray}/>
    </section>
  )
}

export default ModerateMemoryGame