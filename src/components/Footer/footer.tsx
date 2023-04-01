import styles from "./footer.module.css"
import { FooterImg, Linkedin, Instagram, Facebook } from "./footerIndex";
import Image from "next/image";

const footerImg = FooterImg.src

export const Footer = () => {

    const divStyle = {
        backgroundImage: `linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0) 60%, 
        rgba(0,0,0,0.8) 100%), url(${footerImg})`
    };

    return(
    <footer className={styles.footer} style={divStyle}>
        <section className={styles.leftSide}>
            <p className={styles.rights}>Copyright 2023 TAILLANDIER</p>
        </section>
        <section className={styles.rightSide}>
                <p className={styles.terms}>Terms & Conditions</p>
                <p className={styles.privacy}>Privacy Policy</p>
            <div className="icons">
                <Image src={Facebook} alt="" className={styles.icon1}/>
                <Image src={Instagram} alt="" className={styles.icon2}/>
                <a href="https://www.linkedin.com/in/lucas-soubry" target={"_blank"}>
                    <Image src={Linkedin} alt="" className={styles.icon3}/>
                </a>
            </div>
        </section> 
    </footer>
    )
}