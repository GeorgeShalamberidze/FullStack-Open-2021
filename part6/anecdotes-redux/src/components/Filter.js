import React from "react";
import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch({
      type: "FILTER",
      data: e.target.value,
    });
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;