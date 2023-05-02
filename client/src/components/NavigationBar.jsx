import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";

const NavigationBar = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Money on My Mind</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/Create">Create</Nav.Link>
              <Nav.Link href="/Settings">Settings</Nav.Link>
            </Nav>
            <Navbar.Text>Signed in as: {user.name}</Navbar.Text>
            <LogoutButton />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  );
};

export default NavigationBar;
