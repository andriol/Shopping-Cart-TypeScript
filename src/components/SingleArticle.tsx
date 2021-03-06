import { Cartarticle } from "../App";
import { Wrapper } from "./SingleArticle.styles";
import Button from "@material-ui/core/Button";

type Props = {
  article: Cartarticle;
  addToCart: (selectedarticle: Cartarticle) => void;
  removeFromCart: (id: number) => void;
};

const Singlearticle: React.FC<Props> = ({
  article,
  addToCart,
  removeFromCart,
}) => (
  <Wrapper>
    <div>
      <h3>{article.title}</h3>
      <div className="information">
        <p>Price: ${article.price}</p>
        <p>Total: ${(article.amount * article.price).toFixed(2)}</p>
      </div>
      <div className="buttons">
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => removeFromCart(article.id)}
        >
          -
        </Button>
        <p>{article.amount}</p>
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => addToCart(article)}
        >
          +
        </Button>
      </div>
    </div>
    <img src={article.image} alt={article.title} />
  </Wrapper>
);
export default Singlearticle;
