import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const onInputChange = ({ target }) => {
    console.log(target.value);
    setTerm(target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    navigate(`/search/${term}`);
  };

  return (
    <form action="" onSubmit={onFormSubmit}>
      <div>
        <input type="text" onChange={onInputChange} />
      </div>
    </form>
  );
}

export default Search;
