import React, { memo, useEffect, useState } from "react";
import { csv, json } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const geoUrl =
  "/newFile.json";


const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};


const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#ffedea", "#ff5233"]);


const MapChart = ({ setTooltipContent }) => {


  const [data, setData] = useState([]);
  useEffect(() => {
    csv(`/vulnerability.csv`).then((data) => {
      setData(data);
    });
  }, []);

// Promise.all([
//   json("/newFile.json"),
//   csv("/ONLY_PRICE_CHG.csv")
// ]).then(([csvData, jsonData]) => {
//   const myinfo = {};
//   csvData.forEach(d => {
//     myinfo[d.ISO_A3] = d.TICKER;
//   })
// })


  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 150 }}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const d = data.find((s) => s.ISO3 === geo.properties.ISO_A3);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      const { NAME, POP_EST, GDP_MD_EST } = geo.properties;
                      setTooltipContent(`<h3>${NAME}</h3> <br />Population: ${rounded(POP_EST)}`);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    fill={d ? colorScale(d["2017"]) : "#F5F4F6"}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
