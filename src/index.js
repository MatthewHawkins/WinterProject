import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";

import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import MapChart from "./MapChart";
import FooterTable from "./FooterTable";

function App() {
  const [content, setContent] = useState("");
  return (
    <div>
      <div>
        <center><h2>Ryan and Matthew's Cool Financial Site Thing</h2></center>
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip html={true} className="tooltip">{content}</ReactTooltip>
      </div>
      <div>
      <FooterTable/>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);