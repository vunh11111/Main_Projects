// components/Chart/UserChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'T1', users: 300 },
  { month: 'T2', users: 500 },
  { month: 'T3', users: 700 },
  { month: 'T4', users: 600 },
  { month: 'T5', users: 900 },
];

function UserChart() {
  return (
    <div className="chart-container">
      <h3>Lượt khách theo tháng</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default UserChart;
