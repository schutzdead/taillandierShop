import styles from "../../styles/cartIndex.module.css"
import Link from "next/link"
import Image from "next/image"
import { Check, ArrowLeft, Lock, Visa } from "@/pictureIndex/indexCart"
import { MainIcon } from "../../../components/Header/headerIndex"
import { UserContext } from "../_app"
import React, { useEffect, useState } from "react"
import { cartArticle, resume } from "../../../components/type"
import { EachArticleOnCard } from "../../../components/Cart/cart"
import { FormInput, FormCB } from "../../../components/form/form"
import { useRouter } from "next/router"
import { EndMessage } from "../../../components/endMessage/endMessage"
import { HTMLScroll } from "../../../components/Header/header"

export default function CheckOut () {

    const [endDisplay, setEndDisplay] = useState<boolean>(false)

    const handleSubmit = (e:any) => {
        window.scrollTo({
            top:0,
            left:0,
        })
        HTMLScroll()
        setEndDisplay(true)      
        // Stop the form from submitting and refreshing the page.
        e.preventDefault()
    }

    const cart = React.useContext(UserContext)
    const yourCard = cart.cart
    const setYourCard = cart.setCart 

    const [isBox, setIsBox] = useState(false)

    const clicked = { display:"unset" }
    const unClicked = { display:"none" }

    let [total, setTotal] = useState<number>(0)    
    let subTotal = 0

    const { push } = useRouter()

    useEffect(()=> {
        for(let article of yourCard){
            // eslint-disable-next-line react-hooks/exhaustive-deps
            subTotal += article.price*article.quantity
        }
        if(subTotal == 0){
            push('/shop')
        }
        setTotal(Math.round(subTotal*100)/100)
    
        return () => {
            subTotal=0
        }
    }, [yourCard])

    return(
    <div className={styles.global}>
        <header className={styles.header}>
            <div>
                <h1>PAIEMENT</h1>
                <Link href="/" className={styles.logoHeader}>
                    <Image
                        src={MainIcon}
                        alt=""
                        priority/>
                </Link>
            </div>
        </header>
        <main className={styles.main}>
                   
            <section className={styles.payment}>
                <Link href="/shop" className={styles.back}>
                    <Image 
                        src={ArrowLeft} 
                        alt="" />
                    <p>Retourner au magasin</p>
                </Link>

                <div className={styles.delivery}>
                    <h2>Option de livraison </h2>
                    <div className={styles.choiceDelivery}>
                        <button>A emporter</button>
                        <button>Livraison<br/>
                            <span>(bientôt diponible)</span>
                        </button>
                    </div>
                </div>

                <form className={styles.form}
                        onSubmit={handleSubmit}
                        >
                    <div>
                        <h2>Informations</h2>
                        <div className={styles.infos}>
                            <FormInput label="Email *" placeholder="abc@abc.fr" span="Format : exemple@exemple.exemple" pattern="[^@\s]+@[^@\s]+\.[^@\s]+"/>
                            <FormInput label="Téléphone *" placeholder="0612345678" span="10 chiffres, tous attachés" pattern="[0-9]{10}"/>
                        </div>
                    </div>
                    <div>
                        <div className={styles.visa}>
                            <Image
                                src={Visa}
                                alt=""/>
                            <h2>Carte de paiement</h2>
                        </div>
                        <div className={styles.cb}>
                            <FormCB type="text" placeholder="Numéro bancaire" span="16 chiffres sans espace" pattern="[0-9]{16}"/>
                            <FormCB type="text" placeholder="Date d'expiration (JJ/MM)" span="Format : 01/01" pattern="[0-9]{2}/[0-9]{2}"/>
                            <FormCB type="text" placeholder="CVV" span="3 chiffres sans espace" pattern="[0-9]{3}"/>
                            <FormCB type="text" placeholder="Nom du titulaire" span="Uniquement des lettres" pattern="[a-zA-ZÀ-ÿ]{1,}"/>
                            <div className={styles.saveCard}>
                            <Image
                                src={Check}
                                alt=""
                                priority
                                style={isBox ? clicked : unClicked}/>
                                <input  type="checkbox"
                                        className={styles.checkBox}
                                        onClick={() => setIsBox(!isBox)}
                                         />
                                <label>Sauvegarder ma carte</label>
                            </div>
                        </div>
                    </div>
                <div className={styles.buttonDiv}>
                    <button className={styles.endButton}
                            type="submit">
                        <Image
                            src={Lock}
                            alt=""
                            priority/>
                        <p>Confirmer et payer</p>
                    </button>
                </div>
                </form>
            </section>

            <section className={styles.cart}>
                <div className={styles.resume}>
                    <h1>Récapitulatif</h1>
                    <div>
                        <Resume Htext="Sous-Total" 
                                Ptext={total+"€"}/>
                        <Resume Htext="Frais de livraison" Ptext={0+"€"}/>
                        <Resume Htext="Total" Ptext={total+"€"}/>
                    </div>
                </div>
                <section className={styles.yourCart}>
                    <h1>Votre commande</h1>
                    <div className={styles.sumUp}>
                        {yourCard.map((element:cartArticle)=>{
                            return(
                                <div className={styles.forTheKeyCard} key={element.id}>
                                    <EachArticleOnCard
                                        idForPicture = {element.id}
                                        titleCard={element.title}
                                        descriptionCard={element.description}
                                        priceCard = {element.price}
                                        setYourCard = {setYourCard}
                                        yourCard={yourCard}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </section>
            </section>
        </main>
        <EndMessage endDisplay={endDisplay}/>
      </div>
    )
}

function Resume ({Htext, Ptext}:resume) {
    return(
    <div>
        <h2>{Htext}</h2>
        <p>{Ptext}</p>
    </div>
    )
}