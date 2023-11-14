import React, { useState } from "react";
import singleColumnImg from "../assets/images/singleCol.webp";
import doubleColumnImg from "../assets/images/doubleCol.webp";
import Preview from "./Preview";
import "../assets/css/style.css";
import SheetStyleSelectorButtons from "./SheetStyleSelectorButtons";
import singleCol from "../assets/sheetStyle/singleCol.js";
import doubleCol from "../assets/sheetStyle/doubleCol.js";
import Form from "react-bootstrap/Form";
import html2pdf from "html2pdf.js";

function FileUploader() {
  const [file, setFile] = useState({ data: "", name: "" });
  const fileInputRef = React.createRef();
  let imageContent;
  let formContent;
  const [radioValue, setRadioValue] = useState("2"); //default 2 column because it seems to be popular
  const radios = [
    { name: "Single Column", value: "1" },
    { name: "Double Column", value: "2" },
  ];

  const handleFileChange = async (e) => {
    e.preventDefault();

    const loadFile = (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = (fileEvent) => {
          const fName = file.name;
          const textSave = fileEvent.target.result;
          let htmlData = textSave;

          if (radioValue === "1") {
            htmlData = textSave.replace(/(<style[\w\W]+style>)/g, singleCol);
          } else {
            htmlData = textSave.replace(/(<style[\w\W]+style>)/g, doubleCol);
          }

          resolve({ data: htmlData, name: fName });
        };

        reader.readAsText(file);
      });
    };

    const selectedFile = e.target.files[0];

    try {
      const fileData = await loadFile(selectedFile);
      setFile(fileData);
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };
  const resetFileInputNState = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFile({ data: "", name: "" });
  };


  // Currently works and downloads PDFs but not correctly
  const downloadPDF = async () => {
    const { data, name } = file;

    if (data) {
      const tempDiv = document.querySelector(".h3");
      // tempDiv.innerHTML = data;

      // Convert the HTML content to PDF using html2pdf
      const pdfBlob = await html2pdf(data).from(tempDiv).outputPdf()

      // Create a download link for the PDF
      const pdfBlobUrl = URL.createObjectURL(
        new Blob([pdfBlob], { type: "application/pdf" })
      );
      const pdfLink = document.createElement("a");
      pdfLink.href = pdfBlobUrl;
      pdfLink.download = `${name.replace(".html", "")}_modified.pdf`;
      pdfLink.click();
    }
  };

  const downloadHTML = () => {
    const { data, name } = file;

    if (data) {
      const htmlBlob = new Blob([data], { type: "text/html" });
      const htmlBlobUrl = URL.createObjectURL(htmlBlob);
      const htmlLink = document.createElement("a");
      htmlLink.href = htmlBlobUrl;
      htmlLink.download = `${name.replace(".html", "")}_modified.html`;
      htmlLink.click();
    }
  };

  if (radioValue === "1") {
    imageContent = (
      <div className="upload-type">
        <Preview title="Single Column" image={singleColumnImg} />
      </div>
    );
  } else {
    imageContent = (
      <div className="upload-type">
        <Preview title="Double Column" image={doubleColumnImg} />
      </div>
    );
  }
  formContent = (
    <div className="sheet-type">
      <Form.Group className="mb-3">
        <Form.Control
          id="file"
          type="file"
          size="lg"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".html"
        />
      </Form.Group>
    </div>
  );

  /*
   * So the user will need to press the conversion button twice to activate either of the
   * 2 functions above.
   *
   * 1. first retrieve the uploaded file and replace the current style with the new style.
   * 2. Then create a blob with the new HTML file so that the user can download it.
   */

  return (
    <div className="upload-container">
      <div className="upload-type">
        {imageContent}
        <SheetStyleSelectorButtons
          radioValue={radioValue}
          radios={radios}
          onChange={(e) => {
            setRadioValue(e.currentTarget.value);
            resetFileInputNState();
          }}
        />
        {formContent}
        <div>
          <button
            className="download"
            onClick={downloadPDF}
            disabled={true} //disabled until it starts working
          >
            PDF Incoming
          </button>
          <button
            className="download"
            onClick={downloadHTML}
            disabled={!file.data}
          >
            Download HTML
          </button>
        </div>
      </div>
      <br />
    </div>
  );
}

export default FileUploader;
