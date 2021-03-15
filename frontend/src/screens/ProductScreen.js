import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
} from "../actions/productAction";
import { addToCart } from "../actions/cartAction";

const ProductScreen = ({ history }) => {
  const { id } = useParams();

  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(listProductDetails(id));

    return () => {
      dispatch(clearProductDetail());
    };
  }, [id, dispatch]);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
    history.push(`/cart`);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" children={error} />
      ) : (
        <div className="secondary-container">
          <Row>
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>

            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>

                {/* <ListGroup.Item>Price: ${product.price}</ListGroup.Item> */}

                <ListGroup.Item>{product.description}</ListGroup.Item>

                <ListGroup.Item className="rm-border">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews}`}
                  />
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card className="rm-border">
                <ListGroup variant="flush">
                  <ListGroup.Item className="rm-border padding-zero">
                    <Row>
                      <Col>Price:</Col>
                      <Col> ${product.price}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item className="rm-border padding-zero">
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item className="padding-zero">
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            className="select-form"
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (e) => (
                                <option key={e + 1} value={e + 1}>
                                  {e + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item
                    style={{ border: "none" }}
                    className="padding-zero"
                  >
                    <Button
                      block
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Link className="btn btn-dark my-3" to="/">
            Go Back
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
