export type card = {
    cardImg:string, 
    name:string, 
    description:string,
    setActiveFirst:any,
}

export type firstCard = {
    cardImg:string, 
    name:string, 
    description:string,
    activeFirst:boolean
}

export type cart = {
    OnOrOff:boolean, 
    setCardDisplay:any, 
}

export type cartArticle = {
    description:string | null,
    id:string,
    price:number,
    title:string,
    quantity:number,
}

export type eachArticleOnCart = {
    idForPicture:string, 
    titleCard:string, 
    descriptionCard:string | null, 
    priceCard:number, 
    setYourCard:((yourCard: cartArticle[])=>void), 
    yourCard:cartArticle[],
}

export type up = {
    sign:number, 
    currentTitle:string
}

export type erase = {
    yourCard:any, 
    setYourCard:any, 
    title:string, 
    quantity:number
}

export type category = {
    name:string, 
    text:string, 
    setArticleData:any, 
    setCurrentCategory:any
}

export type article = {
    article_number:number, 
}

export type removeOrAdd = {
    article_number:number
}

export type buttonAdd = {
    fctSupp:any,
    fctAdd:any,
    quantity:any,
}

export type formInput = {
    label:string,
    placeholder:string,
    span:string,
    pattern:string,
}

export type formCB = {
    type:string,
    placeholder:string,
    span:string,
    pattern:string,
}

export type resume = {
    Htext:string,
    Ptext:number | string
}
