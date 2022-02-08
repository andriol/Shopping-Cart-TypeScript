import SingleArticle from "./SingleArticle";
import { Wrapper } from "./card.styles";
import { CartArticle } from "../App";
type Props = {
  articles: CartArticle[];
  addToCart: (selectedItem: CartArticle) => void;
};

const DrawerSlide: React.FC<Props> = ({ articles, addToCart }) => {
  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {articles.length === 0 ? <p>No items in cart.</p> : null}
      {articles.map((article) => (
        <SingleArticle
          key={article.id}
          article={article}
          addToCart={addToCart}
        />
      ))}
    </Wrapper>
  );
};
export default DrawerSlide;
