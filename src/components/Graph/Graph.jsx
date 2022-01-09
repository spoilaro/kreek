import React, { useState, useEffect } from "react";
import { LineChart, Line } from "recharts";
import axios from "axios";

const mock_data = [
  { date: "12.1.2021", val: 2 },
  { date: "13.1.2021", val: 5 },
  { date: "14.1.2021", val: 3 },
  { date: "15.1.2021", val: 1 },
  { date: "16.1.2021", val: 7 },
];

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
      parsed_data.push({ key, value });
    }
    set_thl_data(parsed_data);
    console.log(parsed_data);
  }, []);

  return (
    <div>
      <LineChart width={400} height={600} data={thl_data}>
        <Line type="monotone" dataKey="value" stroke="black" />
      </LineChart>
    </div>
  );
}
