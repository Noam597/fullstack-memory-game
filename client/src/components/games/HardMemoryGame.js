import React from 'react'
import MemoryGame from '../newGame/MemoryGame'
import { animalsArray } from '../arrays/animalsArray'
const HardMemoryGame = () => {
  return (
    <section>
           <MemoryGame difficulty="Hard" array={animalsArray}/>
    </section>
  )
}

export default HardMemoryGame