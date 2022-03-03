import React from 'react';
import { Nav, Navbar } from "react-bootstrap";
import { Logo } from "../../logo.png";
import firebase from "../../utils/Firebase";
import "firebase/auth";

// import "bootstrap/dist/css/bootstrap.min.css";

import './Hamburgesa.scss'

export default function Hamburgesa() {

  const logOut = () => {
    firebase.auth().signOut();
  }

  return (
    <Navbar collapseOnSelect expand={false} bg="dark" variant="dark">
      <Navbar.Brand href="/">

        Spanish for Business
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/Lesson1">Lesson 1</Nav.Link>
          <Nav.Link href="/Lesson2">Lesson 2</Nav.Link>
          <Nav.Link href="/Lesson3">Lesson 3</Nav.Link>
          <Nav.Link href="/Lesson4">Lesson 4</Nav.Link>
          <Nav.Link href="/Lesson5">Lesson 5</Nav.Link>
          <Nav.Link href="/L1work">L1 work</Nav.Link>
          <Nav.Link href="/L2work">L2 work</Nav.Link>
          <Nav.Link href="/U1test">U1 test</Nav.Link>
          <Nav.Link href="/Videos">Videos</Nav.Link>
          <Nav.Link onClick={logOut}>Close session</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
