import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts } from "../actions/productAction";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";

const FilterScreen = ({ match }) => {
  // checking for search keyword
  const keyword = match.params.keyword;

  const pathname =
    window.location.pathname.toString().substring(1).charAt(0).toUpperCase() +
    window.location.pathname.slice(2);

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const menProducts = products.filter((p) => p.sex === pathname);

  const [priceFilter, setPriceFilter] = useState(false);
  const [catFilter, setCatFilter] = useState(false);

  //
  const [filterProducts, setFilterProducts] = useState([]);

  // Sorting Functions

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

  // Filter Handlers

  const onHoverCardsHandler = () => {
    setCatFilter(false);
    setPriceFilter(false);
  };

  const categoryFilterHandler = () => {
    setCatFilter(!catFilter);
    setPriceFilter(false);
  };

  const priceFilterHandler = () => {
    setCatFilter(false);
    setPriceFilter(!priceFilter);
  };

  const topFilter = () => {
    setFilterProducts(
      products
        .sort(highToHigh)
        .filter((p) => p.category === "Top")
        .filter((p) => p.sex === pathname)
    );
  };

  const pantFilter = () => {
    setFilterProducts(
      products
        .sort(highToHigh)
        .filter((p) => p.category === "Pants")
        .filter((p) => p.sex === pathname)
    );
  };

  const highlow = () => {
    setFilterProducts(
      products.sort(highToHigh).filter((p) => p.sex === pathname)
    );
  };

  const lowhigh = () => {
    setFilterProducts(
      products.sort(lowToHigh).filter((p) => p.sex === pathname)
    );
  };

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber, filterProducts]);

  return (
    <div>
      <Meta />

      <h1 style={{ marginLeft: "-1rem", fontStyle: "italic" }}>
        {" "}
        {pathname}S Clothing
      </h1>

      <FilterContainer>
        <h5>Filter: </h5>

        <div className="price-container">
          <button onClick={priceFilterHandler} className="price-filter">
            PRICE
          </button>

          {priceFilter === true ? (
            <div className="price-filter-container">
              <button onClick={highlow}> High </button>
              <button onClick={lowhigh}> Low </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <div className="price-container">
          <button onClick={categoryFilterHandler} className="price-filter">
            CATEGORY
          </button>

          {catFilter === true ? (
            <div className="price-filter-container">
              <button onClick={topFilter}> Tops </button>
              <button onClick={pantFilter}> Pants </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </FilterContainer>

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
          <Row onMouseOver={onHoverCardsHandler}>
            {filterProducts.length === 0
              ? menProducts.map((product) => (
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

const FilterContainer = styled.div`
  width: 100%;
  min-height: 10vh;
  position: relative;
  display: flex;
  align-items: center;

  .price-container {
    position: relative;
    margin-right: 1px;
  }

  h5 {
    margin-right: 1rem;
  }

  .price-filter {
    background: white;
    border: 1px solid black;
    padding: 0.2rem 0.9rem;
  }

  .price-filter-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    background: white;
    z-index: 2;
    border: solid 1px black;

    button {
      border: none;
      background: white;
      padding: 0.5rem 2rem;
      &:hover {
        background: #e2e2e2;
      }
    }
  }
`;

export default FilterScreen;
