import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  CartesianGrid,
} from "recharts";
import axios from "axios";

const get_thl_data = async (place_name) => {
  const url = "https://kreek.netlify.app/.netlify/functions/data";
  const res = await axios.get(url, { params: { place: place_name } });
  return res;
};

export default function Graph({ place }) {
  const [thl_data, set_thl_data] = useState({});

  useEffect(() => {
    async function fetchData() {
      let parsed_data = [];

      const res = await get_thl_data(place);
      let percent_data = 0;

      for (const [key, value] of Object.entries(res.data.vaccine_data.value)) {
        const whole_pop = res.data.pop_data.value["56"];
        percent_data = (value / whole_pop) * 100 + percent_data;
        parsed_data.push({
          key: `Week ${key}`,
          amount: value,
          part: Math.round(percent_data),
        });
      }
      parsed_data.pop();
      set_thl_data(parsed_data);
    }
    fetchData();
  }, [place]);

  return (
    <div
      style={{
        fontSize: "1rem",
        border: "2px solid black",
        borderRadius: "5px",
        width: "fit-content",
        height: "fit-content",
        padding: "30px",
        margin: "10px",
      }}
    >
      <h3>Rokotuskattavuus (%)</h3>
      <AreaChart width={600} height={500} data={thl_data}>
        <defs>
          <linearGradient id="chartcolor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="pink" stopOpacity={0.4} />
            <stop offset="75%" stopColor="pink" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <Area dataKey="part" stroke="red" fill="url(#chartcolor)" />
        <XAxis dataKey="key" />
        <YAxis dataKey="part" type="number" domain={[0, 100]} />
        <Tooltip />
        <CartesianGrid opacity={0.1} vertical={false} />
      </AreaChart>
    </div>
  );
}
