import styles from "./endMessage.module.css"
import { Check } from "@/pictureIndex/indexCart"
import Image from "next/image"
import { UserContext } from "@/pages/_app"
import React, { useState } from "react"

export function EndMessage () {

    const cart = React.useContext(UserContext)
    const yourCard = cart.cart
    const setYourCard = cart.setCart 

    return (
        <div className={styles.test}>aaa</div>
    )
}