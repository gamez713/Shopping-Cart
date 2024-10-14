import { Col, Row } from "react-bootstrap" 
import storeItems from "../data/milk/items.json" // Importing items data from a JSON file
import { StoreItem } from "../components/StoreItem" // Importing the StoreItem component to display each item

export function Store() {
    return (
        <>
            <h1>Store</h1>

            {/* Bootstrap Row to layout items, responsive to different screen sizes */}
            <Row xs={1} md={2} lg={3} className="g-3">
                {/* Loop through storeItems array and render a StoreItem for each */}
                {storeItems.map(item => (
                    <Col key={item.id}>
                        {/* Spread the item properties and pass them as props to StoreItem */}
                        <StoreItem {...item} />
                    </Col>
                ))}
            </Row>
        </>
    ) 
}