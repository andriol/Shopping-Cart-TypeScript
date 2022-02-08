import { CartArticle } from "../App";
import { Wrapper } from "./card.styles";
import Button from "@material-ui/core/Button";

type Props = {
  article: CartArticle;
  addToCart: (selectedItem: CartArticle) => void;
};

const Card: React.FC<Props> = ({ article, addToCart }) => (
  <Wrapper>
    <img src={article.image} alt={article.title} />
    <div>
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      <h3>${article.price}</h3>
    </div>
    <Button onClick={() => addToCart(article)}>Add to cart</Button>
  </Wrapper>
);
export default Card;
