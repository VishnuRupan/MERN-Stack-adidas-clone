import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Graphic tees..."
        className="mr-sm-2 ml-sm-0"
      ></Form.Control>

      <button className="search-btn-1" type="submit">
        <span>
          <i className="fas fa-search"></i>
        </span>
      </button>
    </Form>
  );
};

export default withRouter(SearchBox);
