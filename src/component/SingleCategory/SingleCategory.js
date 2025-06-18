import React from "react";
import "./SingleCategory.scss";

function SingleCategory({ data, selected, setSelectedCategory }) {
  console.log(selected);
  return (
    <div
      onClick={() => setSelectedCategory(data)}
      className={`single-category ${
        selected?._id === data?._id ? "selected" : "not-selected"
      } `}
    >
      <p>{data?.name}</p>
    </div>
  );
}

export default SingleCategory;
