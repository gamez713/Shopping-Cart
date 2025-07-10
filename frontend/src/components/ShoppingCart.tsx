import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext"; // Custom hook to access shopping cart context
import { CartItem } from "./CartItem";
import storeItems from "../data/milk/items.json";

// Define the props type for the ShoppingCart component
type ShoppingCartProps = {
    isOpen: boolean;
};

// Functional component for the shopping cart
export function ShoppingCart({ isOpen }: ShoppingCartProps) {
    // Destructure closeCart and cartItems from the context
    const { closeCart, cartItems } = useShoppingCart();

    // Calculate the total price of items in the cart
    const cartTotal = cartItems.reduce((total, cartItem) => {
        const item = storeItems.find(i => i.id === cartItem.id);
        return total + (item?.price || 0) * cartItem.quantity;
    }, 0);

    return (
        // Offcanvas component to create a slide-in cart UI from the right
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            
            {/* Header with title and close button */}
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>

            {/* Body containing the list of cart items */}
            <Offcanvas.Body>
                {/* Stack component for spacing cart items */}
                <Stack gap={3}>
                    {/* Map over cart items to render each one */}
                    {cartItems.map(item => (
                        <CartItem key={item.id} {...item} />
                    ))}
                    
                    {/* Display total price in bold, aligned to the right */}
                    <div className="ms-auto fw-bold fs-5">
                        Total: ${cartTotal.toFixed(2)}
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}