import logo from "./assets/images/logo.svg";
import "./assets/css/App.css";
import "./assets/css/style.css";
import FileUploader from "./components/FileUploader";
import CookieConsent from "react-cookie-consent";
// import ReactGA from 'react-ga';

// const TRACKING_ID = "G-RJL9QBHMKL";
// ReactGA.initialize(TRACKING_ID, {
//   debug: false,
//   titleCase: false,
//   gaOptions: {
//     siteSpeedSampleRate: 100
//   }
// });

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ol>
          <strong>Steps:</strong>
          <li> Download HTML file from Battlescribe</li>
          <li> Choose preferred styling (Double or Single Column)</li>
          <li> Upload HTML file and transform the data sheet 🎉</li>
        </ol>
      </header>
      <div className="main-section">
        <FileUploader />
        <p>
          <strong>When Printing</strong>: Remember to{" "}
          <i>add background graphics</i> OR <i>print background</i> to get
          colours
        </p>
        <p>Then save the HTML file as a PDF then print 😄</p>
        <p>You may need to refresh the page if building single and double columns at the same time</p>
      </div>
      <div className="footer">
        <CookieConsent
          debug={false}
          location="bottom"
          style={{ background: "#000", textAlign: "left" }}
          buttonStyle={{ color: "#000", background: "#fff", fontSize: "12px" }}
          expires={365}
        >
          This site uses cookies. See our{" "}
          <a target="blank" href={process.env.PUBLIC_URL + "Privacy.html"}>
            privacy policy
          </a>{" "}
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
