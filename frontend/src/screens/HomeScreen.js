import { useEffect } from "react";
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

  //
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div>
      <Meta />


      <h1> Products</h1>

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
            {products.map((product) => (
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
