import { articles, Article } from '../products';
import styles from './addArticles.module.css'
import {eraseArticle } from '../Cart/cart'
import React from 'react'
import { UserContext } from '../../pages/_app'
import { removeOrAdd } from '../type'
import { addArticle as myAddArticle } from '../../utils/cart';

export function RemoveOrAdd ({article, cart, setCart}:removeOrAdd & {cart:Article[], setCart:(cart:Article[])=>void}) {

    const onlyArticle = article.title;

    const noArticleColor:string =  "rgb(173, 222, 201)"
    const articleColor:string =  "rgb(61, 201, 173)"

    const yourCardIndex:number = cart.findIndex((element:any) => element.title == onlyArticle);
    const currentArticle = cart[yourCardIndex];



    function addArticle () {
        const newArr = [...cart]
        if(currentArticle!==undefined && currentArticle.quantity>=1){
            setCart(myAddArticle(newArr, yourCardIndex, 1));
            return;
        }

        const newArticle:Article = {
            title:article.title,
            description:article.description,
            price:article.price,
            id:article.id,
            category_id:article.category_id,
            quantity:1,
        }

        if(cart[yourCardIndex]!==undefined)
        if(cart[yourCardIndex].quantity>1) return
        setCart([...cart, newArticle]);
    }

    function suppArticle () {
        const newArr = [...cart]
        if(cart.length === 0 || currentArticle==undefined) return
        setCart(myAddArticle(newArr, yourCardIndex, -1));
        eraseArticle(cart, setCart, onlyArticle, currentArticle.quantity);
    }

    return(
        <div className={styles.rightProps}
             style={{backgroundColor:currentArticle==undefined || currentArticle.quantity==0? noArticleColor : articleColor}}
            >
            <ButtonToAdd onDelete={suppArticle}
                         onAdd={addArticle}
                         quantity={article.quantity}
             />
        </div>
    )
}

type ButtonAddProps = {
    onDelete:any,
    onAdd:any,
    quantity:any,
}

export function ButtonToAdd ({onAdd, onDelete, quantity}:ButtonAddProps) {
    return(
        <>
            <div className={styles.forAbsolute}>
                <div className={styles.less}>-</div>
                <div className={styles.absolLess} onClick={onDelete}></div>
            </div>
            <div className={styles.number}>{quantity}</div>
            <div className={styles.forAbsolute}>
                <div className={styles.plus}>+</div>
                <div className={styles.absolPlus} onClick={onAdd}></div>
            </div>
        </>
    )
}