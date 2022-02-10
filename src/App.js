import { useState } from "react";
import Cart from "./components/cart/Cart";
import Header from "./components/layout/Header";
import Meals from "./components/meal/Meals";

function App() {
    const [cartIsShown, setCartIsShown] = useState(false);
    const cartModalHandler = (shown) => setCartIsShown(shown);

    return (
        <>
            {cartIsShown && (
                <Cart onCloseCart={() => cartModalHandler(false)} />
            )}
            <Header onShowCart={() => cartModalHandler(true)} />
            <main>
                <Meals />
            </main>
        </>
    );
}

export default App;
