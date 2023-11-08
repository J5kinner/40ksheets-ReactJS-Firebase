import React, { useState } from "react";
import singleColumnImg from "../assets/images/singleCol.webp";
import doubleColumnImg from "../assets/images/doubleCol.webp";
import Preview from "./Preview";
import "../assets/css/style.css";
import SheetStyleSelectorButtons from "./SheetStyleSelectorButtons";
import singleCol from "../assets/sheetStyle/singleCol.js";
import doubleCol from "../assets/sheetStyle/doubleCol.js";
import Form from "react-bootstrap/Form";
import MemoryStorage from "memorystorage";
import HtmlToPdfConverter from "./HtmlToPdfConverter";

function FileUploader() {
  let htmlData;
  let fileInput = React.createRef();
  let imageContent;
  let formContent;
  const fileName = "fName";
  const defaultFileType = "html";
  const [radioValue, setRadioValue] = useState("2"); //default 2 column because it seems to be popular
  const radios = [
    { name: "Single Column", value: "1" },
    { name: "Double Column", value: "2" },
  ];

  const [selectFile, setFile] = useState({
    fileType: defaultFileType,
    fileDownloaderURL: null,
    status: "",
    newFileName: "",
    data: "",
  });

  const [htmlBlob, setHtmlBlob] = useState(null);

  let DB = new MemoryStorage("repo"); // our alias for localStorage
  /*
   * showFile and show2ColFile remove and replace the style tag
   * found in the uploaded HTML file.
   *
   * @Return The replaced style is the the corresponding code for either 1 column or 2
   */

  const show1ColFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.fileName = e.name;
    reader.onload = async (fileEvent) => {
      const fName = fileInput.current.files[0].name;
      DB.setItem("fName", fName);
      // console.log(DB.getItem('fName'));
      const textSave = fileEvent.target.result;
      htmlData = textSave;
      if (radioValue === "1") {
        htmlData = textSave.replace(/(<style[\w\W]+style>)/g, singleCol);
      } else {
        htmlData = textSave.replace(/(<style[\w\W]+style>)/g, doubleCol);
      }
      setFile({ data: htmlData });
    };
    reader.readAsText(e.target.files[0]);
  };

  /*
   * The transform and transform2Col take the htmlData stored in selectFile state
   * and creates a blob for the new HTML file we are going to return to the user.
   *
   * @return blob containing the new HTML file which looks prettier.
   */

  const transform = async (e) => {
    e.preventDefault();
    const blob = new Blob([selectFile.data], { type: "text/html" });
    const fileDownloadUrl = URL.createObjectURL(blob);
    let userFName = DB.getItem(fileName);
    try {
      setFile(
        { fileDownloaderURL: fileDownloadUrl, newFileName: userFName },
        () => {
          selectFile.dofileDownload.click();
          URL.revokeObjectURL(fileDownloadUrl); // free up storage--no longer needed.
          setFile({
            fileType: defaultFileType,
            fileDownloaderURL: null,
            status: "",
            newFileName: "",
            data: "",
          });
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

    const transformToPDF = async (e) => {
      const file = e.target.files[0];
      setHtmlBlob(new Blob([selectFile.data], { type: 'text/html' }));
    };

  if (radioValue === "1") {
    imageContent = (
      <div className="upload-type">
        <Preview title="Single Column" image={singleColumnImg} />
      </div>
    );
    formContent = (
      <div className="sheet-type">
        <Form.Group className="mb-3">
          <Form.Control
            id="file"
            type="file"
            size="lg"
            ref={fileInput}
            onChange={show1ColFile}
            accept=".html"
          />
        </Form.Group>
        {/* <Form.Label htmlFor="colorInput">Color picker</Form.Label>
        <Form.Control
          type="color"
          id="colorInput"
          defaultValue="#563d7c"
          title="Choose your color"
        /> */}

        {selectFile.newFileName ? (
          <a
            className="download"
            download={selectFile.newFileName}
            href={selectFile.fileDownloaderURL}
            ref={selectFile}
          >
            Download it
          </a>
        ) : (
          <button className="glow-on-hover" onClick={transform}>
            Transform
          </button>
        )}
      </div>
    );
  } else {
    imageContent = (
      <div className="upload-type">
        <Preview title="Double Column" image={doubleColumnImg} />
      </div>
    );
    formContent = (
      <div className="sheet-type">
        <Form.Group className="mb-3">
          <Form.Control
            id="file"
            type="file"
            size="lg"
            ref={fileInput}
            onChange={show1ColFile}
            accept=".html"
          />
        </Form.Group>

        {selectFile.newFileName ? (
          <a
            className="download"
            download={selectFile.newFileName}
            href={selectFile.fileDownloaderURL}
            ref={selectFile}
          >
            Download it
          </a>
        ) : (
          <div>
            <button className="glow-on-hover" onClick={transform}>
              Transform
            </button>
          </div>
        )}
        <input type="file" accept=".html" onChange={transformToPDF} />
      {htmlBlob && <HtmlToPdfConverter htmlBlob={htmlBlob} />}
      </div>
    );
  }

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
          onChange={(e) => setRadioValue(e.currentTarget.value)}
        />
        {formContent}
      </div>
      <br />
    </div>
  );
}

export default FileUploader;
