import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  CartesianGrid,
} from "recharts";
import axios from "axios";

const get_thl_data = async () => {
  const url = "https://kreek.netlify.app/.netlify/functions/data";
  const res = await axios.get(url);
  return res;
};

export default function Graph() {
  const [thl_data, set_thl_data] = useState({});

  useEffect(async () => {
    let parsed_data = [];

    const res = await get_thl_data();

    for (const [key, value] of Object.entries(res.data.value)) {
      //parsed_data.push({ key, value: value / 5.531 });
      parsed_data.push({ key: `Week ${key}`, value });
    }
    parsed_data.pop();
    set_thl_data(parsed_data);
    console.log(parsed_data);
  }, []);

  return (
    <div
      style={{
        fontSize: "0.5rem",
      }}
    >
      <AreaChart width={400} height={300} data={thl_data}>
        <defs>
          <linearGradient id="chartcolor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="pink" stopOpacity={0.4} />
            <stop offset="75%" stopColor="pink" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <Area dataKey="value" stroke="red" fill="url(#chartcolor)" />
        <XAxis dataKey="key" />
        <YAxis dataKey="value" type="number" domain={[0, 300000]} />
        <Tooltip />
        <CartesianGrid opacity={0.1} vertical={false} />
      </AreaChart>
    </div>
  );
}
