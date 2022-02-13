import SingleArticle from "./SingleArticle";
import { Wrapper } from "./Card.styles";
import { CartArticle } from "../App";
type Props = {
  articles: CartArticle[];
  addToCart: (selectedItem: CartArticle) => void;
  removeFromCart: (id: number) => void;
};

const DrawerSlide: React.FC<Props> = ({
  articles,
  addToCart,
  removeFromCart,
}) => {
  const calculateTotal = (articles: CartArticle[]) => {
    return articles.reduce((total: number, article) => {
      return total + article.amount * article.price;
    }, 0);
  };
  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {articles.length === 0 ? <p>No items in cart.</p> : null}
      {articles.map((article) => (
        <SingleArticle
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
