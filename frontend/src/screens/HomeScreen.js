import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts } from "../actions/productAction";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";

const HomeScreen = ({ match }) => {
  // checking for search keyword
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  //
  const [filterProducts, setFilterProducts] = useState([]);

  const lowToHigh = (a, b) => {
    if (a.price < b.price) return -1;
    if (a.price > b.price) return 1;
    return 0;
  };

  const highToHigh = (a, b) => {
    if (a.price > b.price) return -1;
    if (a.price < b.price) return 1;
    return 0;
  };

  const highlow = () => {
    setFilterProducts(products.sort(highToHigh));
  };

  const lowhigh = () => {
    console.log("herro");
    setFilterProducts(products.sort(lowToHigh));
  };

  function something() {
    console.log(filterProducts);
  }

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber, filterProducts]);

  return (
    <div>
      <Meta />

      <h1 style={{ marginLeft: "-1rem" }}> Products</h1>

      <button onClick={highlow}> High </button>
      <button onClick={lowhigh}> Low </button>

      {loading ? (
        <h2>
          <Loader />
        </h2>
      ) : error ? (
        <h3>
          <Message variant="danger" children={error} />
        </h3>
      ) : (
        <div>
          <Row>
            {filterProducts.length === 0
              ? products.map((product) => (
                  <Col
                    className="abidas-card"
                    sm={12}
                    md={6}
                    lg={4}
                    xl={4}
                    key={product._id}
                  >
                    <Product product={product} />
                  </Col>
                ))
              : filterProducts.map((product) => (
                  <Col
                    className="abidas-card"
                    sm={12}
                    md={6}
                    lg={4}
                    xl={4}
                    key={product._id}
                  >
                    <Product product={product} />
                  </Col>
                ))}
          </Row>

          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
