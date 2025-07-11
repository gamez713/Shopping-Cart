import { useEffect, useState } from "react"         // React hooks for managing state and side effects
import { Col, Row } from "react-bootstrap"          // Bootstrap grid components for layout
import { StoreItem } from "../components/StoreItem" // Importing the StoreItem component to display each item

// Structure of product item from API
type Product = {
    id: number;
    name: string;
    price: number;
    imgUrl: string
}

export function Store() {
  // Local state to hold the fetched product list
  const [storeItems, setStoreItems] = useState<Product[]>([])

  // Fetch product data from the backend when the component mounts
  useEffect(() => {
    fetch("http://localhost:5135/api/products")
      // Parse JSON response
      .then(res => res.json())
      // Store products in local state
      .then(data => setStoreItems(data))
      .catch(err => console.error("Failed to fetch products:", err))
  }, [])

  return (
    <>
      <h1>Store</h1>

      {/* Layout for products: 1 column on xs, 2 on md, 3 on lg screens */}
      <Row xs={1} md={2} lg={3} className="g-3">
        {/* Render each product using the StoreItem component */}
        {storeItems.map(item => (
          <Col key={item.id}>
            <StoreItem {...item} />  {/* Spread product props into StoreItem */}
          </Col>
        ))}
      </Row>
    </>
  )
}