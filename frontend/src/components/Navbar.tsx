import { Button, Container, Nav, Navbar as NavbarBS } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useShoppingCart } from "../context/ShoppingCartContext"

export function Navbar() {
    const { openCart, cartQuantity } = useShoppingCart()
    return (
        // main Navbar component from react-bootstrap "white background, shadow, margin-bottom"
        <NavbarBS sticky="top" className="bg-white shadow-sm mb-3">
            <Container>
                {/* me-auto adds auto margin to push the nav links to the left (Bootstrap utility class) */}
                <Nav className="me-auto">
                    {/* Each Nav.Link is a link to a different route, using NavLink from react-router-dom */}
                    {/* "to" specifies the route, and "as={NavLink}" tells Bootstrap to treat this as a React Router link */}
                    <Nav.Link to="/" as={NavLink}>
                        Home
                    </Nav.Link>

                    <Nav.Link to="/store" as={NavLink}>
                        Store
                    </Nav.Link>

                    <Nav.Link to="/about" as={NavLink}>
                        About
                    </Nav.Link>
                </Nav>
                { cartQuantity > 0 && (
                    <Button
                        onClick={openCart}
                        style={{ width: "3rem", height: "3rem", position: "relative"}}
                        variant="outline-primary"
                        className="rounded-circle"
                    >
                        {/* SVG Cart Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            width="1.5rem"
                            height="1.5rem"
                        >
                            <path d="M7 4h14l-1.68 7.28a3 3 0 01-2.92 2.34H8.6l-.4 2H18v2H6a1 1 0 01-1-1c0-.04.01-.09.01-.13L6.22 6H4V4h3zm0 2l1.28 5.75c.05.23.26.25.32.25h7.73a1 1 0 00.98-.78L18.38 6H7z" />
                        </svg>
                        <div 
                            className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                            style={{
                                color: "white",
                                width: "1.5rem",
                                height: "1.5rem",
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                transform: "translate(30%, 30%)",
                                boxShadow: "0 0 5px rgba(0,0,0,0.3)"
                            }}
                        >
                            {cartQuantity}
                        </div>
                    </Button>
                )}       
            </Container>
        </NavbarBS>
    )    
}