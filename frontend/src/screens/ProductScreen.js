import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import axios from "axios";
import Rating from "../components/Rating";

const ProductScreen = ({ match }) => {
  const { id } = useParams();

  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  return (
    <div>
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
              <Rating value={product.rating} text={`${product.numReviews}`} />
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card className="rm-border">
            <ListGroup variant="flush">
              <ListGroup.Item className="rm-border">
                <Row>
                  <Col>Price:</Col>
                  <Col> ${product.price}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="rm-border">
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item style={{ border: "none" }}>
                <Button block disabled={product.countInStock === 0}>
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
  );
};

export default ProductScreen;
