import { Stack, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/milk/items.json";

// Define properties for each cart item
type CartItemProps = {
    id: number;
    quantity: number;
};

// Component for displaying each item in the shopping cart
export function CartItem({ id, quantity }: CartItemProps) {
    const { removeFromCart } = useShoppingCart();
    
    // Find the item in the store data by its id
    const item = storeItems.find(i => i.id === id);
    
    // Return null if the item does not exist (safety check)
    if (item == null) return null;

    return (
        // Stack for flexible horizontal alignment of cart item details
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center p-2 border-bottom">
            
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
            
            {/* Display item details */}
            <div className="me-auto">

                {/* Display item name and quantity (if > 1) */}
                <div className="d-flex align-items-center">
                    {item.name}
                    {quantity > 1 && (
                        <span className="ms-2 p-1 bg-light text-muted rounded" style={{ fontSize: ".9rem" }}>
                            x{quantity}
                        </span>
                    )}
                </div>
                
                {/* Display unit price of the item */}
                <div className="text-muted" style={{ fontSize: ".9rem" }}>
                    ${item.price.toFixed(2)} each
                </div>
                
                {/* Display total price for the quantity of this item */}
                <div className="text-muted mt-1" style={{ fontSize: ".9rem", fontWeight: "bold" }}>
                    Total: ${(item.price * quantity).toFixed(2)}
                </div>
            </div>
            
            {/* Button to remove item from cart */}
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