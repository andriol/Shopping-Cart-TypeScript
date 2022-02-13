import { useState } from "react";
import { useQuery } from "react-query";
import Card from "./components/Card";
import DrawerSlide from "./components/DrawerSlide";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
// Styles
import { Wrapper, StyledButton } from "./App.styles";

export type CartArticle = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartArticle[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

function App() {
  const [openCart, setOpenCart] = useState(false);
  const [cartArticles, setCartArticles] = useState<CartArticle[]>([]);
  const { data, isLoading, error } = useQuery<CartArticle[]>(
    "products",
    getProducts
  );

  const addToCart = (selectedArticle: CartArticle) => {
    setCartArticles((prevArticle) => {
      const itemInCart = prevArticle.find((article) => {
        return article.id === selectedArticle.id;
      });
      if (itemInCart) {
        return prevArticle.map((article) =>
          article.id === selectedArticle.id
            ? { ...article, amount: article.amount + 1 }
            : article
        );
      }
      return [...prevArticle, { ...selectedArticle, amount: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartArticles((prevArticle) => {
      return prevArticle.reduce((total, article) => {
        if (article.id === id) {
          if (article.amount === 1) {
            return total;
          }
          return [...total, { ...article, amount: article.amount - 1 }];
        } else {
          return [...total, article];
        }
      }, [] as CartArticle[]);
    });
  };
  const getTotal = (articles: CartArticle[]) => {
    return articles.reduce((total: number, article) => {
      return total + article.amount;
    }, 0);
  };
  console.log(data);
  return (
    <Wrapper>
      <Drawer anchor="right" open={openCart} onClose={() => setOpenCart(false)}>
        <DrawerSlide
          articles={cartArticles}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setOpenCart(true)}>
        <Badge badgeContent={getTotal(cartArticles)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((article) => (
          <Grid item key={article.id} xs={12} sm={4}>
            <Card article={article} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
