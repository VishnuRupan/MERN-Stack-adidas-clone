import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

const Footer = () => {
  return (
    <footer>
      <br />
      <hr />
      <br />
      <Container>
        <Row>
          <br />
          <br />
          <Col md={5} className="footer-p">
            <h4> About </h4>

            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga ea
              hic atque sint rem laudantium optio delectus perferendis ullam
              voluptatem voluptate officiis adipisci id reprehenderit alias
              eligendi, omnis sed, illo quia, autem possimus eos pariatur.
              Ducimus odit beatae sequi deleniti?
            </p>
          </Col>

          <Col md={3}>
            <FooterContainer>
              {" "}
              <h4>Products</h4>
              <ul>
                <li>Shoes</li>
                <li>Clothing</li>
                <li>Accessories</li>
                <li>New Arrivals</li>
                <li>Best Seller</li>
              </ul>{" "}
            </FooterContainer>
          </Col>

          <Col md={3}>
            <FooterContainer>
              <h4>Company Info</h4>
              <ul>
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Sustainability</li>
                <li>Mobile Apps</li>
              </ul>
            </FooterContainer>
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col className="text-center py-3">
            Copyright &copy; Abidas | Not a real site | Demo purposes only
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

const FooterContainer = styled.div`
  li,
  ul {
    text-decoration: none;
    list-style: none;
  }

  li:hover {
    text-decoration: underline;
    color: orange;
    cursor: pointer;
  }

  ul {
    padding: 0rem;
  }
`;

export default Footer;
