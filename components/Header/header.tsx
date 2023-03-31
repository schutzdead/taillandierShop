import { Card } from '../Cart/cart'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from "./header.module.css"
import { MainIcon, Left, ShoppingBag } from './headerIndex' 
import React from 'react'
import { UserContext } from '../../src/pages/_app'

export const Header = () => { 

    const [cardDisplay, setCardDisplay] = useState<boolean>(false)

    const cart = React.useContext(UserContext)
    const yourCard = cart.cart

    function turnOnOff () {
        setCardDisplay(true)
    }

    return (
        <header className={styles.header}>
            <Link href="/">
            <div className={styles.logoHeader}>
                <Image 
                    src={MainIcon} 
                    alt=""
                    className={styles.logoHeader}
                    priority/>
            </div>
            </Link>
            <nav>
                <ul className={styles.navBar}>
                    <Link href="/" className={styles.link}>
                        <li className={styles.accueil}>Accueil</li>
                    </Link>
                    <Link 
                        href={{
                            pathname:"/shop",
                        }} 
                        className={styles.link}>
                        <li className={styles.boutique}>Boutique</li>
                    </Link>
                    <li className={styles.shoppingBag} onClick={()=>{HTMLScroll(),turnOnOff()}}>
                        <Image
                            src={ShoppingBag}
                            alt=""
                            />
                        <Image
                            src={Left}
                            className={styles.leftArrow}
                            alt=""/>
                        <div className={styles.count}>{yourCard.length}</div>
                    </li>
                </ul>
            </nav>
            <Card OnOrOff={cardDisplay} 
                  setCardDisplay={setCardDisplay} 
            />
        </header>
        
    )
}

export function HTMLScroll () {
    const html:any = document.querySelector('html');
    if (html.style.overflow == 'auto') return html.style.overflow = 'hidden'
    html.style.overflow = 'auto'
}