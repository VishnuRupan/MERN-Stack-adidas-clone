import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartAction";
import Meta from "../components/Meta";

const CartScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    history.push("/cart");
  };

  const checkOutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  const dispatch = useDispatch();

  return (
    <CartContainer>
      <h2 className="your-bag"> YOUR BAG</h2>
      <Row>
        <Col md={7}>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to="/"> Go back</Link>{" "}
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row className="cart-item-card">
                    <img
                      className="image-container"
                      src={item.image}
                      alt={item.name}
                    />

                    <Col md={4} className="product-info">
                      <Row>
                        <p className="product-name">{item.name}</p>
                      </Row>
                      <Row>
                        <p>{item.color}</p>
                      </Row>

                      <Row>
                        <p> Size: {item.size}</p>
                      </Row>

                      <Row>
                        <p>C$ {item.price}.00</p>
                      </Row>

                      <Row>
                        <Form.Control
                          className="select-form"
                          as="select"
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()]
                            .slice(0, 10)
                            .map((e) => (
                              <option key={e + 1} value={e + 1}>
                                {e + 1}
                              </option>
                            ))}
                        </Form.Control>
                      </Row>
                    </Col>

                    <Col md={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-times fa-2x"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={5}>
          <ListGroup variant="flush">
            <ListGroup.Item className="padding-zero">
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                PROCEED TO CHECKOUT
              </Button>
            </ListGroup.Item>

            <div className="order-preview">
              <ListGroup.Item className="padding-zero">
                <h4>ORDER SUMMARY</h4>
              </ListGroup.Item>

              <ListGroup.Item className="padding-zero">
                <div className="order-summary-flex">
                  <p>
                    {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}{" "}
                    ITEM(S)
                  </p>

                  <p>
                    C${" "}
                    {cartItems
                      .reduce(
                        (acc, item) =>
                          acc + Number(item.qty) * Number(item.price),
                        0
                      )
                      .toFixed(2)}
                  </p>
                </div>

                <div className="order-summary-flex">
                  <p>DELIVERY</p>

                  {cartItems
                    .reduce(
                      (acc, item) =>
                        acc + Number(item.qty) * Number(item.price),
                      0
                    )
                    .toFixed(2) < 100 ? (
                    <p> C$ 100</p>
                  ) : (
                    <p> FREE</p>
                  )}
                </div>

                <div className="order-summary-flex">
                  <p>SALES TAX</p>

                  <p>-</p>
                </div>

                <div className="order-summary-flex">
                  <h4>TOTAL</h4>

                  <h4>
                    C${" "}
                    {(
                      cartItems.reduce(
                        (acc, item) =>
                          acc + Number(item.qty) * Number(item.price),
                        0
                      ) +
                      (cartItems.reduce(
                        (acc, item) =>
                          acc + Number(item.qty) * Number(item.price),
                        0
                      ) < 100
                        ? 100
                        : 0)
                    ).toFixed(2)}
                  </h4>
                </div>
              </ListGroup.Item>
            </div>
          </ListGroup>
        </Col>
      </Row>
    </CartContainer>
  );
};

const CartContainer = styled.div`
  min-height: 100vh;

  .cart-item-card {
  }

  .your-bag {
    font-family: "Arimo", sans-serif;
    font-size: 2.5rem;
    padding: 2rem 0.5rem;
  }

  .product-name {
    font-size: 0.9rem !important;
  }

  .order-preview {
    padding: 1rem 0rem;
    margin: 2rem 0rem;
    border-top: solid 1px black;
    border-bottom: solid 1px black;
  }

  .product-info {
    padding: 1rem 2rem;
  }

  .padding-zero {
    button {
      font-size: 1.1rem;
    }
  }

  .order-summary-flex {
    display: flex;
    justify-content: space-between;
  }

  .image-box {
  }

  .select-form {
    width: 5rem;
    background: white;
    border: 1px solid black;
  }

  .image-container {
    width: 15rem;
    margin-right: 1rem;
  }

  .col-md-1 {
    padding: 0rem;

    @media only screen and (max-width: 768px) {
      padding: 2rem 1rem;
      display: flex;
    }

    button {
      padding: 0rem;

      &:hover {
        background: white;
      }
    }
  }
`;

export default CartScreen;
