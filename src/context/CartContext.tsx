import { createContext, ReactNode, useCallback, useEffect, useState } from "react"; 


interface Items {
    id: number;
    title: string;
    price: number;
    description: string;
    images?: string[];
    creationAt?: string;
    updatedAt?: string;
}

interface CartContextType {
    items: Items[] | null;
    cart: Items[];
    error?: string | null;
    loading: boolean;
    addItemToCart: (item: Items) => void;
    removeItemFromCart: (id: number) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);

const CartProvider = ({children}: {children: ReactNode}) => {

    const [items, setItems] = useState<Items[] | null>(null);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [cart, setCart] = useState<Items[]>([]);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/products');
            if (!response.ok) {
                throw new Error('Error making API request');
            }
            const data = await response.json();
            setItems(data);
        } catch (error: any) {
            console.log(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const addItemToCart = (item: Items) => {
        console.log("Adding item:", item);
        setCart(prevCart => [...prevCart, item]);
    };

    const removeItemFromCart = (id: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };
    
    return (
        <CartContext.Provider value={{items, loading, error, cart, addItemToCart, removeItemFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
