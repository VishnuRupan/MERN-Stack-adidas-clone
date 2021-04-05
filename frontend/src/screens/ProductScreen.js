import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  clearProductDetail,
  createProductReview,
} from "../actions/productAction";
import { addToCart } from "../actions/cartAction";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import Meta from "../components/Meta";

const ProductScreen = ({ history, match }) => {
  const { id } = useParams();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("L");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  //
  const sizeHandlerXS = (e) => {
    setSize("XS");
  };
  const sizeHandlerS = (e) => {
    setSize("S");
  };
  const sizeHandlerM = (e) => {
    setSize("M");
  };
  const sizeHandlerL = () => setSize("L");
  //

  useEffect(() => {
    dispatch(listProductDetails(id));

    if (successProductReview) {
      setRating(0);
      setComment("");
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    return () => {
      dispatch(clearProductDetail());
    };
  }, [id, dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    if (qty >= product.countInStock) {
      alert("Not enough in stock");
      setQty(1);
    } else {
      dispatch(addToCart(product._id, qty, size));
      history.push(`/cart`);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" children={error} />
      ) : (
        <SecondaryContainer>
          <Row>
            <Col md={7}>
              <Image
                src={product.image}
                alt={product.name}
                className="product-img"
                fluid
              />
            </Col>

            <Col md={5}>
              <ListGroup variant="flush">
                <ListGroup.Item className="rm-border">
                  <div className="product-label">
                    <div>
                      <span>
                        {product.sex} • {product.category}
                      </span>
                    </div>

                    <div>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews}`}
                      />
                    </div>
                  </div>
                </ListGroup.Item>

                <ListGroup.Item className="rm-border">
                  <h3 className="product-name-1">{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item className="rm-border color-tag">
                  <p>{product.color}</p>
                </ListGroup.Item>

                <ListGroup.Item className="rm-border">
                  <h4>C$ {product.price}</h4>
                </ListGroup.Item>

                {product.price < 70 ? (
                  <ListGroup.Item className="rm-border">
                    {" "}
                    <p>
                      THIS PRODUCT IS EXCLUDED FROM ALL PROMOTIONS, COUPONS AND
                      VOUCHERS.
                    </p>
                    <p className="disclaimer">Not a real site</p>
                  </ListGroup.Item>
                ) : (
                  <ListGroup.Item className="rm-border">
                    <p className="disclaimer">Not a real site</p>
                  </ListGroup.Item>
                )}

                {product.countInStock > 0 && (
                  <ListGroup.Item className="rm-border">
                    <Row className="extra-padding">
                      <div>Qty &nbsp;</div>
                      <div>
                        <Form.Control
                          className="select-form"
                          as="input"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        ></Form.Control>
                      </div>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item className="rm-border">
                  <div className="product-size-btns">
                    <button className="size-btns" onClick={sizeHandlerXS}>
                      XS
                    </button>
                    <button className="size-btns" onClick={sizeHandlerS}>
                      S
                    </button>
                    <button className="size-btns" onClick={sizeHandlerM}>
                      M
                    </button>
                    <button className="size-btns" onClick={sizeHandlerL}>
                      L
                    </button>
                  </div>

                  <div className="size-guidelines">
                    <Link to="/">Size guidance</Link>
                    <Link to="/"> Size out of stock?</Link>
                  </div>
                </ListGroup.Item>

                <ListGroup.Item className="rm-border">
                  <span>
                    Status:
                    {product.countInStock > 0 ? " In Stock" : " Out of Stock"}
                  </span>
                </ListGroup.Item>

                <ListGroup.Item
                  style={{ border: "none" }}
                  className=" padding-zero extra-padding"
                >
                  <br />
                  <Button
                    block
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add To Bag
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <ListGroup variant="flush">
                <div className="product-desc">
                  <h4>Description</h4>
                  <div className="line"></div>
                  <h5> {product.name}</h5>
                  <p>{product.description}</p>
                </div>
              </ListGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <br></br>
              <br></br>

              {/* {product.reviews.length === 0 && <Message>No Reviews</Message>} */}
              <ListGroup variant="flush">
                <ListGroup.Item className="padding-zero">
                  <br></br>
                  <h4>Write a Review</h4>
                  {successProductReview && (
                    <Message variant="success">
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <div>
                      Please <Link to="/login">sign in</Link> to write a review
                    </div>
                  )}

                  <br />
                </ListGroup.Item>

                <br />

                <h5>Reviews</h5>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id} className="padding-zero">
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </SecondaryContainer>
      )}
    </div>
  );
};

const SecondaryContainer = styled.div`
  min-height: 100vh;

  .product-img {
    height: 80vh;
    object-fit: cover;
  }

  .col {
    padding: 0rem !important;
  }

  .product-name-1 {
    font-style: italic;
    font-family: "Arimo", sans-serif;
  }

  .disclaimer {
    font-size: 0.6rem;
    font-family: "Arimo", sans-serif;
  }

  .color-tag {
    padding-top: 0rem;
    p {
      color: grey;
    }
  }

  .extra-padding {
    padding: 0rem 1rem;
    div {
      display: flex;
      align-items: center;
    }

    input {
      width: 3rem;
    }
  }

  .padding-zero {
    button {
      font-family: "Arimo", sans-serif;
      font-size: 1.2rem;
    }
  }

  .product-desc {
    padding-top: 3rem;

    .line {
      height: 1px;
      width: 100%;
      background: #c2c2c2;
      margin-bottom: 2rem;
    }
  }

  .product-label,
  .size-guidelines {
    display: flex;
    justify-content: space-between;

    a {
      text-decoration: underline;
    }
  }

  .product-size-btns {
    padding: 1rem 0rem;
  }

  .product-size-btns button {
    padding: 0.2rem 2rem;
    border: solid 1px rgb(223, 223, 223);
    margin: 0rem;
    background: white;
  }

  .product-size-btns .size-btns:hover,
  .size-btns:target,
  .size-btns:active,
  .size-btns:focus {
    background: rgb(0, 0, 0);
    color: white;
  }
`;

export default ProductScreen;
