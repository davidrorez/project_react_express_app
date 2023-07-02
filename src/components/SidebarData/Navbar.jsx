import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.css';

function CustomNavbar({ user, onLogout }) {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <Navbar expand="lg" variant="dark">
      <Link to="/" className="navbar-brand me-2 navbar-title h1">
        Cocina
      </Link>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav">
        {user && (
          <>
            <Nav className="ml-auto">
              <Nav.Item>
                <Nav.Link as={Link} to="/" className="nav-link">
                  Inicio
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/" className="nav-link">
                  About
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Nav className="navbar-nav ms-auto">
              <Button variant="outline-light" style={{ marginRight: '15px' }} onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </Nav>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
