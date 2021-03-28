import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keyword }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keyword} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Abidas Official Website",
  description:
    "Abidas online shop for official shoes, clothing, sport equipment",
  keyword: "clothing, shoes, brand, sports",
};

export default Meta;
