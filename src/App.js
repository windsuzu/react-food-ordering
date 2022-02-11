import { useState } from "react";
import Cart from "./components/cart/Cart";
import Header from "./components/layout/Header";
import Meals from "./components/meal/Meals";
import CartProvider from "./store/CartProvider";

function App() {
    const [cartIsShown, setCartIsShown] = useState(false);
    const cartModalHandler = (shown) => setCartIsShown(shown);

    return (
        <CartProvider>
            {cartIsShown && (
                <Cart onCloseCart={() => cartModalHandler(false)} />
            )}
            <Header onShowCart={() => cartModalHandler(true)} />
            <main>
                <Meals />
            </main>
        </CartProvider>
    );
}

export default App;
