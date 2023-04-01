import { useState, useEffect } from 'react'
import styles from './cart.module.css'
import { articles, Article } from '../products';
import { HTMLScroll, BSLEnable} from '../Header/header';
import Close from '../../public/assets/cart/close.svg'
import Trash from '../../public/assets/cart/trash.svg'
import Image from 'next/image';
import type {  eachArticleOnCart, cartArticle} from '../type';
import React from 'react'
import { UserContext } from '../../pages/_app'
import { ButtonToAdd } from '../ButtonAddRemove/addArticles';
import Link from 'next/link';
import { cart } from './cart.decl';

export function Card ({OnOrOff, setCardDisplay}:cart) {

    const [checkOut, setCheckOut] = useState<boolean>(false)
    let [total, setTotal] = useState<number>(0)

    const cart = React.useContext(UserContext)
    const yourCard = cart.cart
    const setYourCard = cart.setCart

    let subTotal = 0

    useEffect(()=> {
        for(let article of yourCard){
            // eslint-disable-next-line react-hooks/exhaustive-deps
            subTotal += article.price*article.quantity
        }
        setTotal(Math.round(subTotal*100)/100)

        if(yourCard.length==0) return setCheckOut(false)
        setCheckOut(true)

        return () => {
            subTotal=0
        }
    }, [yourCard])

    const turnOff = () => {
        setCardDisplay(false)
    }

    const newdivStyle = {
        fontSize:"min(5vw, 30px)",
        fontWeight:"500"
    }

    if(OnOrOff == false) return null

    return (
        <section className={styles.containerCard}>
            <section className={styles.mainContainer}>
                <div className={styles.crossDiv}>
                    <Image
                    src={Close} alt=""
                    className={styles.cross}
                    onClick={()=>{turnOff(); HTMLScroll() ; BSLEnable()}}/>
                </div>
                <h2 className={styles.titleCard}><span style={newdivStyle}>Votre</span> Panier</h2>
                <section className={checkOut ? `${styles.center}` : `${styles.noCenter}`}>
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
                </section>
                    <div className={styles.buttonDiv}>
                        <div className={checkOut ? `${styles.sub}` : `${styles.noSub}`}>
                            <p>SOUS-TOTAL</p>
                            <p>{total} €</p>
                        </div>
                        <Link href={checkOut ? "/cart" : "/"} >
                            <button
                                className={checkOut ? `${styles.checkOut}` : `${styles.noCheckOut}`}
                                onClick={()=>{
                                        turnOff()
                                        HTMLScroll()
                                        BSLEnable()
                                }}
                            >
                                {checkOut ? `Passer au paiement` : "Aucun article dans votre panier"}
                            </button>
                        </Link>
                    </div>
            </section>

            <div className={styles.sail} onClick={()=>{turnOff(); HTMLScroll(); BSLEnable()}} ></div>
        </section>
    )
}

export function EachArticleOnCard ({idForPicture, titleCard, descriptionCard, priceCard, setYourCard, yourCard}:eachArticleOnCart) {

    const imgCard = articles[parseInt(idForPicture)-358].img;

    const yourCardIndex:number = yourCard.findIndex((element:any) => element.title == titleCard);
    const currentArticle = yourCard[yourCardIndex]

    let newArr = [...yourCard]

    function upQuantity () {
        if(currentArticle!==undefined && currentArticle.quantity>=1){
            newArr[yourCardIndex].quantity += 1
            setYourCard(newArr)
        }
    }

    function lessQuantity () {
        newArr[yourCardIndex].quantity -= 1
        setYourCard(newArr)
        eraseArticle(yourCard, setYourCard, titleCard, currentArticle.quantity)
    }

    function deleteArticle () {
        newArr[yourCardIndex].quantity = 0
        setYourCard(newArr)
        eraseArticle(yourCard, setYourCard, titleCard, currentArticle.quantity)
    }


    return(
        <div className={styles.bag}>
            <Image
                src={imgCard}
                alt=""
                width={80}
                height={80}
                className={styles.pictureBag}
                />
            <section className={styles.principalBag}>
                <h3 className={styles.titleBag}>{titleCard}</h3>
                <p className={styles.descriptionBag}>{descriptionCard}</p>
                <div className={styles.quantityItem}>
                    <ButtonToAdd onDelete={lessQuantity} onAdd={upQuantity} quantity={currentArticle.quantity} />
                </div>
            </section>
            <div className={styles.rightSide}>
                <p className={styles.priceBag}>{Math.round((priceCard*currentArticle.quantity) * 100) / 100} €</p>
                <Image
                    src={Trash}
                    alt=""
                    onClick={deleteArticle}
                />
            </div>
        </div>
    )
}

export function upQuantityToArticles (sign:number, currentTitle:string) {
    const articlesIndex:number = articles.findIndex((element:any) => element.title == currentTitle);
    const articleQuantity = articles[articlesIndex];
    if(sign==-1 && articleQuantity.quantity==0) return
    articleQuantity.quantity += sign
}

export function eraseArticle (cart:Article[], setCart:any, title:string, quantity:number | undefined) {
    if(quantity !== undefined && quantity == 0) {
        const cartIndex:number = cart.findIndex((cartItem) => cartItem.title == title);
        let newArr = [...cart]
        newArr.splice(cartIndex, 1)
        setCart(newArr);
    }
}
