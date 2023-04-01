import { Card } from '../Cart/cart'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from "./header.module.css"
import { MainIcon, Left, ShoppingBag } from './headerIndex' 
import React from 'react'
import { UserContext } from '../../src/pages/_app'
import * as BSL from 'body-scroll-lock';

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
                    <li className={styles.shoppingBag} onClick={()=>{HTMLScroll(),turnOnOff(), BSLDisable(), docHeight()}}>
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
    window.scrollTo({
        top:0,
        left:0,
    })
    const html = document.querySelector('html') as HTMLHtmlElement;
    if (html.style.overflow == 'hidden') return html.style.overflow = 'auto'
    html.style.overflow = 'hidden'
}

export function BSLDisable () {
    const body = document.querySelector('body') as HTMLElement;
    BSL.disableBodyScroll(body)
}

export function BSLEnable () {
    const body = document.querySelector('body') as HTMLElement;
    BSL.enableBodyScroll(body)
}

const docHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
  }