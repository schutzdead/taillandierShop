import styles from '../../styles/shop.module.css'
import { articles, Article } from '../../components/products';
import { useEffect, useState } from 'react';
import { categoriesData, RightArrow, Select } from '@/pictureIndex/categories'
import Image from 'next/image';
import { Header } from '@components/Header/header'
import { Footer } from '@components/Footer/footer'
import { RemoveOrAdd } from '@components/ButtonAddRemove/addArticles';
import type { category, article } from '@/components/type';
import React from 'react';
import { UserContext } from '../_app';

function resizeSelector (variable:any, size:number) {
    variable.width = size
    variable.height = size
}

export default function Body() {

    const allCategories = categoriesData;
    const [articleData,setArticleData] = useState(articles);
    const [currentCategory, setCurrentCategory] = useState<string>("Tous les produits");
    const [filteredArticles, setFilteredArticles] = useState(articles);

    const {cart, setCart} = React.useContext(UserContext);

    function dataChange (categoryNum:string) {
        setFilteredArticles(articleData.filter(e => e.category_id == categoryNum))
    }

    function addSelector (element:any) {
        const stockName = element.target.parentElement.firstChild;
        resizeSelector(stockName, 20)
        element.view.pageYOffset = 0;
    }

    function filterCategories (e:any, categoryNum:string) {
        switch(e.target.className){
            case "all": setFilteredArticles(articleData)
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
        setArticleData(articles.filter(e => e.category_id == categoryNum))
    }

    return (
        <>
            <Header/>
            <main className={styles.containerArticles}>
                <section className={styles.categories}>
                    <h2 className={styles.titleCategories}>Catégories </h2>
                    {allCategories.map((element:any) => {
                        return(
                            <div className={styles.forTheKeyBis} key={element.id}>
                                <Category name={element.category} text={element.text} setArticleData={filterCategories} setCurrentCategory={setCurrentCategory} id={element.id}/>
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
                        {filteredArticles.map((element:any) => {
                            return(
                            <div className={styles.forTheKey} key={element.id}>
                                <ArticleC article={element} >
                                    <RemoveOrAdd article={element} cart={cart} setCart={setCart}/>
                                </ArticleC>
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

function Category({name, text, setArticleData, setCurrentCategory, id}:category & {id:number}) {



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
                        setArticleData(e, id);
                    }}>
                    {text}
                </h3>
            </a>
            )
};

type ArticleProps = {
    article:Article
};

function ArticleC ({article, children}:ArticleProps & {children:React.ReactNode}) {



    return (
        <div className={styles.eachCard}>
            {article.img &&
            <Image
                src={article.img}
                width={220}
                height={220}
                alt=""
                priority/>
            }
            <div className={styles.descriptionArt}>
                <h3 className={styles.name}>{article.title}</h3>
                <div className={styles.bottomProps}>
                    <div className={styles.leftProps}>
                        <p className={styles.price}>{article.price} €</p>
                    </div>
                    {children}
                </div>
                <div className={styles.productDescription}>
                    <p className={styles.quantity}>{article.description}</p>
                    <p className={styles.kilo_price}>{article.kilo_price}</p>
                </div>
            </div>
        </div>
    )
}