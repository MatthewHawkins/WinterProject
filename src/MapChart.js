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
  "/updated.json";


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
  .domain([-3.5, 3.5])
  .range(["#ba0000", "#22ba00"]);


const MapChart = ({ setTooltipContent }) => {


  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   csv(`/vulnerability.csv`).then((data) => {
  //     setData(data);
  //   });
  // }, []);


  const [newData, setNewData] = useState([]);
  useEffect(() => {
    csv(`/ISO3_tick.csv`).then((newData) => {
      setNewData(newData);
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
                //const d = data.find((s) => s.ISO3 === geo.properties.ISO_A3);
                const d1 = newData.find((s1) => s1.ISO3 === geo.properties.ISO_A3);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      const { NAME, POP_EST, POP_RANK, Tick, Price_Change } = geo.properties;
                      setTooltipContent(`<h3>${NAME}</h3> <br />Population: ${rounded(POP_EST)} <br />Pop Rank: ${POP_RANK} <br />Exchange: ${Tick} <br />Price Change: ${Price_Change}`);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    //fill={d ? colorScale(d["2017"]) : "#F5F4F6"}
                    fill={d1 ? colorScale(d1["Price_Change"]) : "#F5F4F6"}
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
