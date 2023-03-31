import styles from '../../styles/shop.module.css'
import { articles } from '../../../components/products'
import { useEffect, useState } from 'react';
import { categoriesData, RightArrow, Select } from '../../pictureIndex/categories'
import Image from 'next/image';
import { Header } from '../../../components/Header/header'
import { Footer } from '../../../components/Footer/footer'
import { RemoveOrAdd } from '../../../components/ButtonAddRemove/addArticles';
import type { category, article } from '../../../components/type';
import React from 'react';
import { memo } from 'react';

export default function Body() {

    const allCategories = categoriesData; 
    const [articleData,setArticleData] = useState(articles)
    const [currentCategory, setCurrentCategory] = useState<string>("Tous les produits")

    return (
        <>
            <Header/>
            <main className={styles.containerArticles}>
                <section className={styles.categories}>
                    <h2 className={styles.titleCategories}>Catégories </h2>
                    {allCategories.map((element:any) => {  
                        return(
                            <div className={styles.forTheKeyBis} key={element.id}>
                                <Category name={element.category} text={element.text} setArticleData={setArticleData} setCurrentCategory={setCurrentCategory}/>
                            </div>
                        )
                    })}   
                    <Image 
                        src={RightArrow}
                        alt=""
                        className={styles.rightArrow}
                    />
                </section>

                <section className={styles.globalArticles}> 
                    <h2 className={styles.titleArticles}>{currentCategory}</h2>
                    <div className={styles.articles}>
                        {articleData.map((element:any) => {
                            return(
                            <div className={styles.forTheKey} key={element.id}>
                                <Article article_number={element.id-358}/>
                            </div>
                            )
                        })}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

const Category = memo(function category({name, text, setArticleData, setCurrentCategory}:category){

    function resizeSelector (variable:any, size:number) {
        variable.width = size
        variable.height = size
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() =>{
        const firstOne = document.querySelector(`.${styles.toContain}>img`) as HTMLImageElement        
        updateSelector()
        resizeSelector(firstOne, 20)

        return()=>{
            resizeSelector(firstOne, 0)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function dataChange (categoryNum:string) {
        setArticleData(articles.filter(e => e.category_id == categoryNum))
    }

    function updateSelector () {
        const arrayOfImg = Array.from(document.querySelectorAll(`.${styles.toContain}>img`)) as HTMLImageElement[];
        arrayOfImg.forEach(element => {
            resizeSelector(element, 0)
        });
    }

    function updateName (element:any){
        const stockName = element.target.textContent;
        setCurrentCategory(stockName)
    }

    function addSelector (element:any) { 
        const stockName = element.target.parentElement.firstChild;
        resizeSelector(stockName, 20)
        element.view.pageYOffset = 0
    }

    function whichCategory (e:any) {
        switch(e.target.className){
            case "all": setArticleData(articles)
                        addSelector(e)
                        break;
            case "beef": dataChange("52")
                         addSelector(e)
                         break;
            case "chicken": dataChange("53")
                            addSelector(e)
                            break;
            case "calf": dataChange("54")
                         addSelector(e)
                         break;
            case "lamb": dataChange("55")
                         addSelector(e)
                         break;
            case "pork": dataChange("56")
                         addSelector(e)
                         break;
            case "takeAway": dataChange("57")
                             addSelector(e)
                             break;
        }
    }

    return (<a className={styles.toContain}>
                <Image 
                    src={Select.src}
                    alt=""
                    width={0}
                    height={0}
                    />
                <h3 className={name}
                    onClick={(e) => {
                        window.scrollTo({
                            top:0,
                            left:0,
                            behavior:'smooth',
                        })
                        updateSelector();
                        updateName(e)
                        whichCategory(e);
                    }}>
                    {text}
                </h3>
            </a>
            )
})

const Article = memo(function article ({article_number}:article) {

    const img_number = articles[article_number].img;    
    


    return (
        <div className={styles.eachCard}>
            <Image
                src={img_number} 
                width={220}
                height={220}
                alt="" 
                priority/>
            <div className={styles.descriptionArt}>
                <h3 className={styles.name}>{articles[article_number].title}</h3>
                <div className={styles.bottomProps}>
                    <div className={styles.leftProps}>
                        <p className={styles.price}>{articles[article_number].price} €</p>
                    </div>
                    <RemoveOrAdd article_number={article_number} />
                </div>
                <div className={styles.productDescription}>
                    <p className={styles.quantity}>{articles[article_number].description}</p>
                    <p className={styles.kilo_price}>{articles[article_number].kilo_price}</p>
                </div>
            </div>
        </div>
    )
})