import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

// Define the props for the provider component
type ShoppingCartProviderProps = {
    children: ReactNode; // The children components that will have access to this context
};

// Define the structure of a cart item
type CartItem = {
    id: number;        // Unique identifier for the item
    quantity: number;  // Quantity of the item in the cart
};

type Product = {
    id: number
    name: string
    price: number
    imgUrl: string
}

// Define the context type
type ShoppingCartContextType = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number;
    increaseCartQuantity: (id: number) => void;
    decreaseCartQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    cartQuantity: number
    cartItems: CartItem[]
    products: Product[]
};

// Create the context with an initial value of undefined
const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

// Custom hook to access the ShoppingCartContext
export function useShoppingCart() {
    const context = useContext(ShoppingCartContext);
    if (!context) {
        // Error handling if useShoppingCart is used outside of its provider
        throw new Error("useShoppingCart must be used within a ShoppingCartProvider");
    }
    return context; // Return the context value
}

// Provider component
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        fetch("http://localhost:5135/api/products")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Failed to fetch products:", err))
    }, [])


    // State to hold the cart items, persisted in localStorage
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);
    // State to control the visibility of the shopping cart
    const [isOpen, setIsOpen] = useState(false);


    // Functions to control the cart's open/close state
    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    // Calculate the total quantity of items in the cart
    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity, 0
    );

    // Function to get the quantity of a specific item
    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    // Function to increase the quantity of a specific item
    function increaseCartQuantity(id: number) {
        setCartItems(currItems => {
            const existingItem = currItems.find(item => item.id === id);
            // If the item doesn't exist in the cart, add it with quantity 1
            if (!existingItem) {
                return [...currItems, { id, quantity: 1 }];
            } else {
                // If the item exists, increase its quantity
                return currItems.map(item =>
                    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
        });
    }

    // Function to decrease the quantity of a specific item
    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
            const existingItem = currItems.find(item => item.id === id);
            // If the item quantity is 1, remove it from the cart
            if (existingItem?.quantity === 1) {
                return currItems.filter(item => item.id !== id);
            } else {
                // Otherwise, decrease its quantity
                return currItems.map(item =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                );
            }
        });
    }

    // Function to remove an item from the cart
    function removeFromCart(id: number) {
        setCartItems(currItems => currItems.filter(item => item.id !== id));
    }

    return (
        // Provide the context value to child components
        <ShoppingCartContext.Provider
            value={{
                    getItemQuantity,
                    increaseCartQuantity,
                    decreaseCartQuantity,
                    removeFromCart,
                    openCart,
                    closeCart,
                    cartItems,
                    cartQuantity,
                    products
                }}>
            {children}
            <ShoppingCart isOpen = {isOpen}/>
        </ShoppingCartContext.Provider>
    );
}