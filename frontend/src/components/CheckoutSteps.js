import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const checkoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4 checkout-componenet">
      <Nav.Item className="checkout-nav-item">
        {step1 ? (
          <LinkContainer className="checkout-nav-item" to="/login">
            <Nav.Link className="checkout-nav-item">Sign In --- </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className="checkout-nav-item">
            Sign In ---
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item className="checkout-nav-item">
        {step2 ? (
          <LinkContainer to="/shipping" className="checkout-nav-item">
            <Nav.Link className="checkout-nav-item">Shipping ---</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link className="checkout-nav-item" disabled>
            Shipping ---
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item className="checkout-nav-item">
        {step3 ? (
          <LinkContainer className="checkout-nav-item" to="/payment">
            <Nav.Link className="checkout-nav-item">Payment ---</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link className="checkout-nav-item" disabled>
            Payment ---
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item className="checkout-nav-item">
        {step4 ? (
          <LinkContainer className="checkout-nav-item" to="/placeorder">
            <Nav.Link className="checkout-nav-item">Place Order </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link className="checkout-nav-item" disabled>
            Place Order
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default checkoutSteps;
