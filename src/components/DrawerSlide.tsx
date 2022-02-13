import Singlearticle from "./SingleArticle";
import { Wrapper } from "./DrawerSlide.styles";
import { Cartarticle } from "../App";
type Props = {
  articles: Cartarticle[];
  addToCart: (selectedarticle: Cartarticle) => void;
  removeFromCart: (id: number) => void;
};

const DrawerSlide: React.FC<Props> = ({
  articles,
  addToCart,
  removeFromCart,
}) => {
  const calculateTotal = (articles: Cartarticle[]) => {
    return articles.reduce((total: number, article) => {
      return total + article.amount * article.price;
    }, 0);
  };
  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {articles.length === 0 ? <p>No articles in cart.</p> : null}
      {articles.map((article) => (
        <Singlearticle
          key={article.id}
          article={article}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(articles).toFixed(2)}</h2>
    </Wrapper>
  );
};
export default DrawerSlide;
