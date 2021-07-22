import React from "react";
import { connect } from "react-redux";
import { filterFromReducer } from "../reducers/filterReducer";

const Filter = (props) => {
  const handleChange = (e) => {
    props.filterFromReducer(e.target.value);
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

const ConnectedFilter = connect(null, { filterFromReducer })(Filter);

export default ConnectedFilter;
