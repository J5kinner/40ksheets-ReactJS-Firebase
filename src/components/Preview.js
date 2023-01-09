import React from "react";

function Preview({ title, image }) {
  return (
    <div className="preview-container">
      <div className="single">
        <h1>{title}</h1>
        <img className="example-sheet" src={image} alt="Column design exemplar" />
      </div>
    </div>
  );
}

export default Preview;
