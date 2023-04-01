import { Article } from '../components/products';
// returns a new array of articles with the aticle quantity updated
export function addArticle(articles: Article[], articleIndex: number, quantity:number){
  const newArticles = [...articles];
  newArticles[articleIndex].quantity += quantity;
  return newArticles;
}