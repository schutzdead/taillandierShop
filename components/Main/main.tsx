import { useState } from "react"
import { textMain } from "./data"
import Link from "next/link"
import styles from "./main.module.css"
import type {card, firstCard} from '../type' 

export function Main() {

    const [activeFirst, setActiveFirst] = useState<boolean>(false)

    return (
        <main className={styles.experience}>
            <h1 className={styles.butcherName}>
                <span>Boucherie</span>
                <span><u>Tail</u>landier</span>
                <span>Laissez nous vous présenter les meilleures viandes de notre terroir.</span>
            </h1>

            <section className={styles.slide}>
                <FirstCard cardImg={textMain[0].id} name={textMain[0].name} description={textMain[0].description} activeFirst={activeFirst} />
                <Card cardImg={textMain[1].id} name={textMain[1].name} description={textMain[1].description} setActiveFirst={setActiveFirst} />
                <Card cardImg={textMain[2].id} name={textMain[2].name} description={textMain[2].description} setActiveFirst={setActiveFirst} />
            </section>
        </main>
    )
}

const Card = ({cardImg, name, description, setActiveFirst}:card) => {

    const [active, setActive] = useState<boolean>(false)

    const handleMouseOver = () => {
        setActive(true)
        setActiveFirst(true)    
    }
   
    const handleMouseLeave = () => {
        setActive(false)
        setActiveFirst(false) 
    }

    const divStyle = {
        backgroundImage: `url(${cardImg})`,
    };

    return (
        <Link href="/shop" className={styles.linkBody}>
            <div className={styles.forBorder}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}>
                <div 
                className={active ? `${styles.card}` : `${styles.waitingCard}`} 
                style={divStyle}>
                    <section className={active ? `${styles.text}` : `${styles.waitingText}`}>
                        <h2 className={styles.nameImg}>{name}</h2>
                        <p className={styles.description}>{description}</p>
                    </section>
                </div>
            </div>
        </Link>
    )
}

const FirstCard = ({cardImg, name, description, activeFirst}:firstCard) => {

    const divStyle = {
    backgroundImage: `url(${cardImg})`,
    };

    return (
    <Link href="/shop" className={styles.linkBody}>
        <div className={styles.forBorder}>
            <div
                className={activeFirst ? `${styles.waitingCard}` : `${styles.card}`}
                style={divStyle}>
                <section className={activeFirst ? `${styles.waitingText}` : `${styles.text}`}>
                    <h2 className={styles.nameImg}>{name}</h2>
                    <p className={styles.description}>{description}</p>
                </section>
            </div>
        </div>
    </Link>
    )
}