import React,{useState} from "react";
import { LogInData } from "../AppContext";
import { Link, Outlet } from "react-router-dom";
import styles from "./games.module.css";

const Games = () => {

const [difficultyMenu, setdifficultyMenu] = useState(false)
const [canPlay, setCanPlay] = useState(true)

const {player} = LogInData()

  return (
    <section className={styles.games}>
      <h2>coins X{player.coins}</h2>
      <h1>Games</h1>
      <h2><u>Memory Game</u></h2>
   { canPlay?  <nav  className={`${styles.navBar} ${difficultyMenu && styles.menu}`}>
        <ul onClick={()=>{setdifficultyMenu(!difficultyMenu)}}>
          <li>
            <Link to="easy">EASY</Link>
          </li>
          <li>
            <Link to="moderate">MODERATE</Link>
          </li>
          <li>
            <Link to="hard">HARD</Link>
          </li>
          <li>
            <Link to="timeattack">TIME-ATTACK</Link>
          </li>
        </ul>
        <button  onClick={()=>{setdifficultyMenu(!difficultyMenu)}} className={styles.difficultyBtn}>
          Difficulty Level
          </button>
      </nav>:<></>}
      <Outlet />
    </section>
  );
};

export default Games;
