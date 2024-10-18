import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";

// Define the props for the StoreItem component
type StoreItemProps = {
    id: number;        // Unique identifier for the item
    name: string;      // Name of the item
    price: number;     // Price of the item
    imgUrl: string;    // URL of the item's image
};

// StoreItem component definition
export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
    // Destructure functions from the ShoppingCartContext
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();
    
    // Get the current quantity of the item in the cart
    const quantity = getItemQuantity(id);
    
    return (
        <Card className="h-100">
            {/* Image at the top of the card */}
            <Card.Img
                variant="top"
                src={imgUrl}
                height="200px"
                style={{ objectFit: "contain" }} // Ensures the image fits within the designated area
            />
            <Card.Body className="d-flex flex-column">
                {/* Card title with item name and price */}
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">${price.toFixed(2)}</span>
                </Card.Title>

                <div className="mt-auto">
                    {/* Conditional rendering based on item quantity in the cart */}
                    {quantity === 0 ? (
                        <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
                            + Add To Cart
                        </Button>
                    ) : (
                        <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>
                            <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem" }}>
                                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                                <div>
                                    <span className="fs-3">{quantity}</span> in cart
                                </div>
                                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                            </div>
                            <Button onClick={() => removeFromCart(id)} variant="danger" size="sm">
                                Remove
                            </Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}