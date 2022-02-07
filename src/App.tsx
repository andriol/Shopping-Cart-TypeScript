import { useState } from "react";
import { useQuery } from "react-query";

type CartItem = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItem[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

function App() {
  const [openCart, setOpenCart] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { data, isLoading, error } = useQuery<CartItem[]>(
    "products",
    getProducts
  );
  console.log(data);
  return (
    <div className="App">
      {data?.map((article) => {
        const { id, description, category, image, price, title } = article;
      })}
    </div>
  );
}

export default App;
