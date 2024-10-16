import { Button, Card } from "react-bootstrap"

type StoreItemProps = {
    id: number,
    name: string,
    price: number,
    imgUrl: string
}

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
    const quantity = 0
    return (
        <Card className="h-100">
            {/* Image at the top of the card */}
            <Card.Img
                variant="top"
                src={imgUrl}
                height="200px"
                style={{ objectFit: "contain" }}
            />
            <Card.Body className="d-flex flex-column">
                {/* Card title with item name and price */}
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2"> {name} </span>
                    <span className="ms-2 text-muted"> ${price.toFixed(2)} </span>
                </Card.Title>

                <div className="mt-auto">
                    {quantity === 0 ? (
                        <Button className="w-100">+ Add To Cart</Button>
                    ):(
                        <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem"}}>
                            <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem"}}>
                                <Button>-</Button>
                                <div>
                                    <span className="fs-3"> {quantity} </span> in cart
                                </div>
                                <Button>+</Button>
                            </div>
                            <Button variant="danger" size="sm">
                                Remove
                            </Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    )
}