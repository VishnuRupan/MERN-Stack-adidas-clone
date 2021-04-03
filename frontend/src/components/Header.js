import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter, Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";

const Header = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
    window.location.reload();
  };

  return (
    <>
      <div className="shipping-label">
        <h4 className="shipping-h4">
          <i class="fas fa-truck"></i> FREE SHIPPING OVER $100
        </h4>
      </div>
      <header style={{ width: "100vw" }}>
        <Navbar bg="light" expand="lg" collapseOnSelect>
          <Container className="abidas-nav-ctn">
            <LinkContainer to="/">
              <Navbar.Brand>
                <i class="fas fa-align-right fa-xs"></i> Abidas
              </Navbar.Brand>
            </LinkContainer>

            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="secondary-container"
            />

            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <div className="abidas-product-nav-links">
                  <LinkContainer to="/men">
                    <Nav.Link>Men</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/women">
                    <Nav.Link>Women</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/sports">
                    <Nav.Link>Sports</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/brands">
                    <Nav.Link>Brands</Nav.Link>
                  </LinkContainer>
                </div>

                <SearchBox />
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <i className="fas fa-shopping-cart fa-lg"></i>
                  </Nav.Link>
                </LinkContainer>

                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Site Data" id="adminmenu">
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item> Users</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item> Products</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to="/admin/orderlist">
                      <NavDropdown.Item> Orders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}

                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item> Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-user fa-lg"></i>
                    </Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>{" "}
    </>
  );
};

export default withRouter(Header);
