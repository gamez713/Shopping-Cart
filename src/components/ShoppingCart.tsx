import { Offcanvas } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext"; // Custom hook to access shopping cart context

// Define the props type for the ShoppingCart component
type ShoppingCartProps = {
    isOpen: boolean; // Boolean prop to determine if the cart is open
};

// Functional component for the shopping cart
export function ShoppingCart({ isOpen }: ShoppingCartProps) {
    const { closeCart } = useShoppingCart(); // Destructure the closeCart

    return (
        // Offcanvas component to create a slide-in cart UI from the right
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
        </Offcanvas>
    );
}
