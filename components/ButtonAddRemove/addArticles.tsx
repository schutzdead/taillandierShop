import { articles } from '../products'
import styles from './addArticles.module.css'
import {eraseArticle } from '../Cart/cart'
import React from 'react'
import { UserContext } from '../../src/pages/_app'
import { removeOrAdd, buttonAdd } from '../type'

export function RemoveOrAdd ({article_number}:removeOrAdd) {
    

    const cart = React.useContext(UserContext)
    const yourCard = cart.cart
    const setYourCard = cart.setCart
   
    const onlyArticle = articles[article_number].title;

    const noArticleColor:string =  "rgb(173, 222, 201)"
    const articleColor:string =  "rgb(61, 201, 173)"    

    const yourCardIndex:number = yourCard.findIndex((element:any) => element.title == onlyArticle);
    const currentArticle = yourCard[yourCardIndex]

    let newArr = [...yourCard]

    function addArticle () {        
        if(currentArticle!==undefined && currentArticle.quantity>=1){ 
            newArr[yourCardIndex].quantity += 1
            setYourCard(newArr)
        }

        const eachArticle:any = [{
            title:articles[article_number].title,
            description:articles[article_number].description,
            price:articles[article_number].price,
            id:articles[article_number].id,
            quantity:1,
        }]

        if(yourCard[yourCardIndex]!==undefined)
        if(yourCard[yourCardIndex].quantity>1) return
        setYourCard(yourCard.concat(eachArticle))
    }

    function suppArticle () {
        if(yourCard.length === 0 || currentArticle==undefined) return 
        newArr[yourCardIndex].quantity -= 1
        setYourCard(newArr)
        eraseArticle(yourCard, setYourCard, onlyArticle, currentArticle.quantity)
    }

    return(
        <div className={styles.rightProps}
             style={{backgroundColor:currentArticle==undefined || currentArticle.quantity==0? noArticleColor : articleColor}}
            >
            <ButtonToAdd fctSupp={suppArticle} 
                         fctAdd={addArticle} 
                         quantity={(() => {
                            if(currentArticle==undefined) return 0
                            return yourCard[yourCardIndex].quantity
                         })()}
             />
        </div>
    )
}

export function ButtonToAdd ({fctSupp, fctAdd, quantity}:buttonAdd) {
    return(
        <>
            <div className={styles.forAbsolute}>
                <div className={styles.less}>-</div>
                <div className={styles.absolLess} onClick={fctSupp}></div>
            </div>
            <div className={styles.number}>{quantity}</div>
            <div className={styles.forAbsolute}>
                <div className={styles.plus}>+</div>
                <div className={styles.absolPlus} onClick={fctAdd}></div>
            </div>
        </>
    )
}