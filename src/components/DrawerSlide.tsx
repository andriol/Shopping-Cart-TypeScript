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
    </Wrapper>
  );
};
export default DrawerSlide;
