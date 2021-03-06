import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PromotionSection from "./components/PromotionSection";
import CartScreen from "./screens/CartScreen";
import FilterScreen from "./screens/FilterScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import OrderListScreen from "./screens/OrderListScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import UserEditScreen from "./screens/UserEditScreen";
import UserListScreen from "./screens/UserListScreen";

function App() {
  return (
    <Router>
      <Header />

      <Route path="/" exact>
        <PromotionSection
          main={"TRIO 21"}
          second={"CLEARANCE"}
          link1={"SHOP MEN"}
          link2={"SHOP WOMEN"}
          to1={"/men"}
          to2={"/women"}
        />
      </Route>

      <Route path="/page/:pageNumber" exact>
        <PromotionSection
          main={"TRIO 21"}
          second={"CLEARANCE"}
          link1={"SHOP MEN"}
          link2={"SHOP WOMEN"}
          to1={"/men"}
          to2={"/women"}
        />
      </Route>

      <Route path="/men" exact>
        <PromotionSection
          main={"2021 SPORT"}
          second={"LINEUP"}
          link1={"SHOP JACKETS"}
          link2={"SHOP JOGGERS"}
          to1={"/"}
          to2={"/"}
        />
      </Route>

      <Route path="/women" exact>
        <PromotionSection
          main={"2021 SPORT"}
          second={"LINEUP"}
          link1={"SHOP JACKETS"}
          link2={"SHOP TIGHTS"}
          to1={"/"}
          to2={"/"}
        />
      </Route>

      <Route path="/sports" exact>
        <PromotionSection
          main={"NEW NHL GEAR"}
          second={"CLEARANCE"}
          link1={"SHOP JERSEY"}
          link2={"SHOP SHOES"}
          to1={"/"}
          to2={"/"}
        />
      </Route>

      <Route path="/brands" exact>
        <PromotionSection
          main={"AFFILIATED BRANDS"}
          second={"SEASON 2"}
          link1={"SHOP BAGS"}
          link2={"SHOP CAPS"}
          to1={"/"}
          to2={"/"}
        />
      </Route>

      <main className="py-3">
        <Container fluid="xl">
          <Route path="/login" component={LoginScreen} />
          <Route path="/men" component={FilterScreen} />
          <Route path="/women" component={FilterScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route
            path="/admin/productlist"
            component={ProductListScreen}
            exact
          />

          <Route
            path="/admin/productlist/:pageNumber"
            exact
            component={ProductListScreen}
          />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
          <Route path="/admin/orderlist" component={OrderListScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/profile" component={ProfileScreen} />
          {/*  optional pathname for qty*/}
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
          />
          <Route path="/" exact component={HomeScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
