import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const getThlData = async (place_name) => {
  const url = "https://kreek.netlify.app/.netlify/functions/data";
  const res = await axios.get(url, { params: { place: place_name } });
  return res;
};

export default function Graph({ place, styleObj }) {
  const [thl_data, set_thl_data] = useState({});

  useEffect(() => {
    async function fetchData() {
      let parsed_data = [];

      const res = await getThlData(place);
      let pop_data = res.data.pop_data[place];
      let percent_data = 0;

      for (const [key, value] of Object.entries(res.data.vaccine_data.value)) {
        percent_data = (value / pop_data) * 100 + percent_data;
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          <p className="label-percent">{`${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="graph-container" style={{ width: styleObj.width }}>
      <h3>Rokotuskattavuus</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart width={400} height={300} data={thl_data}>
          <defs>
            <linearGradient id="chartcolor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--graph-fill-color)"
                stopOpacity={0.4}
              />
              <stop
                offset="75%"
                stopColor="var(--graph-fill-color)"
                stopOpacity={0.05}
              />
            </linearGradient>
          </defs>
          <Area
            dataKey="part"
            stroke="var(--graph-stroke)"
            fill="url(#chartcolor)"
          />
          <XAxis stroke="var(--text-color)" dataKey="key" />
          <YAxis
            stroke="var(--text-color)"
            dataKey="part"
            type="number"
            domain={[0, 100]}
            tickFormatter={(num) => `${num}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
