import { Button, Container, Nav, Navbar as NavbarBS } from "react-bootstrap"
import { NavLink } from "react-router-dom"

export function Navbar() {
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
                {/* A simple button added next to the nav links, will add svg later */}
                <Button 
                    style={{ width: "3rem", height: "3rem", position: "relative"}}
                    variant="outline-primary"
                    className="rounded-circle"
                >
                    O
                    <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                    style={{
                        color: "white",
                        width: "1.5rem",
                        height: "1.5rem",
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        transform: "translate(25%,25%)"
                        }}
                    >
                        {/* Static number of items in cart for now, to be dynamically updated */}
                        12
                    </div>
                </Button>
            </Container>
        </NavbarBS>
    )    
}