import logo from "./assets/images/logo.svg";
import "./assets/css/App.css";
import "./assets/css/style.css";
import FileUploader from "./components/FileUploader";
import CookieConsent from "react-cookie-consent";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="main-section">
          <p>Instructions:</p>
          <p>1. Download HTML file from battlescribe</p>
          <p>2. Upload your HTML file to which style you prefer</p>
          <FileUploader />
          <p>
            <strong>When Printing</strong>: Remember to{" "}
            <i>add background graphics</i> OR <i>print background</i> to get
            colours
          </p>
          <p>Then save the HTML file as a PDF then print 😄</p>
        </div>
      </header>
      <div className="footer">
        <CookieConsent
          debug={true}
          location="bottom"
          style={{ background: "#000", textAlign: "left" }}
          buttonStyle={{ color: "#000", background: "#fff", fontSize: "14px" }}
          expires={365}
        >
          This site uses cookies. See our <a target="blank" href={process.env.PUBLIC_URL + "Privacy.html"}>privacy policy</a>{" "}
          for more.{" "}
        </CookieConsent>
        <footer>
          <p>
            Proudly made by{" "}
            <a className="footer-a" href="https://jonahskinner.com/">
              Jonah Skinner
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
