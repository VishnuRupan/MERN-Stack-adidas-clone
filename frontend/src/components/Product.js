import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="abidas-product-card"  variant="top">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image}  varitant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div"> {product.name} </Card.Title>
        </Link>

        <Card.Text className="h4-price" as="h4">
          C$ {product.price}
        </Card.Text>

        <div className="empty-space"></div>
      </Card.Body>
    </Card>
  );
};

export default Product;
