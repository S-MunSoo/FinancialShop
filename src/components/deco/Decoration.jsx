import React from 'react'
import cards from '../../../public/assets/cards.png'
import box from '../../../public/assets/box.png'
import styles from '../../scss/Decoration.module.scss'
const Decoration = () => {
  return (
    <div className={styles.decoration}>
      <div className={styles.container}>
        <div className={styles.circle}></div>
        <img src={cards} alt='card' className={styles.cards} />
        <img src={box} alt='box' className={styles.box} />
      </div>
    </div>
  )
}

export default Decoration
