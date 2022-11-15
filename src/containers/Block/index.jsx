import React from "react";

const Block = ({ html }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Block;
