// src/HtmlToPdfConverter.js

import React from 'react';
import html2pdf from 'html2pdf.js';

function HtmlToPdfConverter({ htmlBlob }) {
  const convertToPdf = () => {
    const reader = new FileReader();

    reader.onload = function () {
      const htmlContent = reader.result;

      const element = document.createElement('div');
      element.innerHTML = htmlContent;

      html2pdf(element);
    };

    reader.readAsText(htmlBlob);
  };

  return (
    <div>
      <button onClick={convertToPdf}>Convert to PDF</button>
    </div>
  );
}

export default HtmlToPdfConverter;
