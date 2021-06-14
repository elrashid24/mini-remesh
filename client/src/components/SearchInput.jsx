import React, { useState } from "react";

const SearchInput = ({ placeHolder, onSubmit, onReset }) => {
  const [searchBody, setSearchBody] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(searchBody);
    return;
  };

  const handleReset = () => {
    setSearchBody("");
    onReset();
    return;
  };

  return (
    <div className="conversation-container">
      <form className="d-flex-column mt-5" onSubmit={handleSubmit}>
        <textarea
          type="text"
          placeholder={placeHolder}
          className="form-control text-center font-size-20"
          value={searchBody}
          onChange={(e) => setSearchBody(e.target.value)}
        />
        <div className="btn-container mt-2">
          <button className="btn btn-secondary" onClick={handleReset}>
            Reset
          </button>
          <button className="btn btn-success">Search</button>
        </div>
      </form>
    </div>
  );
};
export default SearchInput;
