import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 shadow-sm" variant="top">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} varitant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div"> {product.name} </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating value={product.rating} text={`${product.numReviews}`} />
        </Card.Text>

        <Card.Text className="h4-price" as="h4">
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
