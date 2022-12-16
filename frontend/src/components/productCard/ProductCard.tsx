import React from 'react'
import styles from './productCard.module.scss'
import scooterImage from '../../assets/scooter-2.webp'
import accumulator from '../../assets/accumulator.svg'
import speed from '../../assets/speedometr.svg'
import power from '../../assets/power.svg'
import timer from '../../assets/timer.svg'
import cart from '../../assets/cart-outlined.svg'
import heart from '../../assets/Heart.svg'
import { HandySvg } from 'handy-svg';


const ProductCard = () => {
    return (
        <div className={styles.productCard}>
            <div className={`mb-2 ${styles.photo}`}>
                <img src={scooterImage} alt='scooter' />
            </div>
            <div className={styles.content}>
                <p className={`m-0 mb-2 ${styles.title}`}>Kugoo Kirin M4</p>
                <div className={`px-2 mb-2 ${styles.characteristics}`}>
                    <div className="accumulator d-flex align-items-center"><HandySvg src={accumulator} className={`${styles.icon} me-1`} width="18" height="14" /><p className='m-0'>{'2000'} mAh</p></div>
                    <div className="power d-flex align-items-center"><HandySvg src={power} className={`${styles.icon} me-1`} width="18" height="14" /><p className='m-0'> {'1.2'} л/с</p></div>
                    <div className="speed d-flex align-items-center"><HandySvg src={speed} className={`${styles.icon} me-1`} width="18" height="14" /><p className='m-0'> {'60'} км/ч</p></div>
                    <div className="time d-flex align-items-center"><HandySvg src={timer} className={`${styles.icon} me-1`} width="18" height="14" /><p className='m-0'> {'5'} ч</p></div>
                </div>
                <div className={styles.options}>
                    <p className={`m-0 ${styles.price}`}>9999₽</p>
                    <HandySvg src={cart} className={`${styles.optionsIcon} `} width="20" height="20" />
                    <HandySvg src={heart} className={`${styles.optionsIcon} `} width="20" height="20" />
                </div>
            </div>
        </div>
    )
}

export default ProductCard