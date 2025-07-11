import { Stack, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";

// Define properties for each cart item
type CartItemProps = {
    id: number;
    quantity: number;
};

// Component for displaying each item in the shopping cart
export function CartItem({ id, quantity }: CartItemProps) {
     // Access context for cart and product data
    const { removeFromCart, products } = useShoppingCart();

    // Find the product that matches the cart item ID
    const item = products.find(i => i.id === id);

    // If product is not found (edge case), return nothing
    if (item == null) return null;

    return (
        // Stack layout with spacing for cart item row
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center p-2 border-bottom">
            
            {/* Product image */}
            <img 
                src={item.imgUrl}
                style={{
                    width: "125px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #e0e0e0",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                }}
                alt={item.name}
            />
            
            {/* Product info section */}
            <div className="me-auto">
                <div className="d-flex align-items-center">
                    {item.name}
                    {quantity > 1 && (
                        <span className="ms-2 p-1 bg-light text-muted rounded" style={{ fontSize: ".9rem" }}>
                            x{quantity}
                        </span>
                    )}
                </div>

                {/* Unit price */}
                <div className="text-muted" style={{ fontSize: ".9rem" }}>
                    ${item.price.toFixed(2)} each
                </div>

                {/* Total price for this item */}
                <div className="text-muted mt-1" style={{ fontSize: ".9rem", fontWeight: "bold" }}>
                    Total: ${(item.price * quantity).toFixed(2)}
                </div>
            </div>
            
            {/* Remove from cart button */}
            <Button 
                variant="outline-danger" 
                size="sm" 
                onClick={() => removeFromCart(id)}
            >
                &times;
            </Button>
        </Stack>
    );
}