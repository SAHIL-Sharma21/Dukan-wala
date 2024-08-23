import { createContext, ReactNode, useCallback, useEffect, useState } from "react"; 


interface Items {
    id: number;
    title: string;
    price: number;
    description: string;
    images?: string[];
    category?: {
        id: number;
        name: string;
        image: string;
    };
    quantity?: number;
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
    increaseItemQuantity: (id: number) => void;
    decreaseItemQuantity: (id: number) => void;
    clearCart: () => void;
    totalPrice: number;
    totalItems: number;
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
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity! + 1}
                        : cartItem
                );
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    const removeItemFromCart = (id: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const increaseItemQuantity = (id:number) => {
        setCart(prevCart => prevCart.map(item => item.id === id ? {...item, quantity: item.quantity! + 1} : item ))
    }

    const decreaseItemQuantity = (id:number) => {
        setCart(prevCart => prevCart.map(item => item.id === id ? {...item, quantity: item.quantity! > 1 ? item.quantity! - 1 : 1} : item));
    }
    const clearCart = () => {
        setCart([]);
    };

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity!, 0);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity!, 0);

    return (
        <CartContext.Provider 
        value={{items, loading, error, cart, addItemToCart, removeItemFromCart, clearCart, totalPrice, decreaseItemQuantity, increaseItemQuantity, totalItems}}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
