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
      const itemInCart = prevArticle.find(
        (article) => article.id === selectedArticle.id
      );
      console.log(itemInCart);
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

  const removeFromCart = (): void => {};
  const getTotal = (): void => {};
  console.log(data);
  return (
    <Wrapper>
      <Drawer anchor="right" open={openCart} onClose={() => setOpenCart(false)}>
        <DrawerSlide articles={cartArticles} addToCart={addToCart} />
      </Drawer>
      <StyledButton onClick={() => setOpenCart(true)}>
        <Badge color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((article) => (
          <Grid key={article.id} xs={12} sm={4}>
            <Card article={article} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
