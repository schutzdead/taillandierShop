import styles from "./endMessage.module.css"
import { Check } from "@/pictureIndex/indexCart"
import { ArrowLeft } from "@/pictureIndex/indexCart"
import Image from "next/image"
import { UserContext } from "@/pages/_app"
import React from "react"
import Link from "next/link"

type endMessage = {
    endDisplay:boolean
}

export function EndMessage ({endDisplay}:endMessage) {

    const cart = React.useContext(UserContext)
    function reloadCart () {
        cart.setCart([]) 
    }

    if(endDisplay == false) return null

    return (
        <div className={styles.global}>
            <div className={styles.container}>
                <Link href="/" 
                      className={styles.back}
                      onClick={reloadCart}>
                    <Image
                        src={ArrowLeft}
                        alt=""
                         />
                    <p>{`Retourner à l'accueil`}</p>
                </Link>
                <div className={styles.imageContainer}>
                    <Image 
                        src={Check}
                        alt="" />
                </div>
                <div className={styles.confirmation}>
                    <p>Paiement confirmé !</p>
                    <p>Les informations concernant le <u>retrait</u> vous ont été envoyées par mail.</p>
                </div>
            </div>
        </div>
    )
}