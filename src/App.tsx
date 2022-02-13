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

export type Cartarticle = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<Cartarticle[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

function App() {
  const [openCart, setOpenCart] = useState(false);
  const [cartarticles, setCartarticles] = useState<Cartarticle[]>([]);
  const { data, isLoading, error } = useQuery<Cartarticle[]>(
    "products",
    getProducts
  );

  const addToCart = (selectedarticle: Cartarticle) => {
    setCartarticles((prevarticle) => {
      const articleInCart = prevarticle.find((article) => {
        return article.id === selectedarticle.id;
      });
      if (articleInCart) {
        return prevarticle.map((article) =>
          article.id === selectedarticle.id
            ? { ...article, amount: article.amount + 1 }
            : article
        );
      }
      return [...prevarticle, { ...selectedarticle, amount: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartarticles((prevarticle) => {
      return prevarticle.reduce((total, article) => {
        if (article.id === id) {
          if (article.amount === 1) {
            return total;
          }
          return [...total, { ...article, amount: article.amount - 1 }];
        } else {
          return [...total, article];
        }
      }, [] as Cartarticle[]);
    });
  };
  const getTotal = (articles: Cartarticle[]) => {
    return articles.reduce((total: number, article) => {
      return total + article.amount;
    }, 0);
  };
  console.log(data);
  return (
    <Wrapper>
      <Drawer anchor="right" open={openCart} onClose={() => setOpenCart(false)}>
        <DrawerSlide
          articles={cartarticles}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setOpenCart(true)}>
        <Badge badgeContent={getTotal(cartarticles)} color="error">
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
