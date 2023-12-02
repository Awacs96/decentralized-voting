import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavbarTop = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand href="/">Voting</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Link href="/votes">Votes</Nav.Link>
                        <Nav.Link href="/create-vote">Create a Vote</Nav.Link>
                        <Button variant="success">Become Member</Button>
                    </Nav>
                    <Nav>
                        <Button>Connect to Metamask</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarTop;