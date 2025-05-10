// components/Chart/SalesChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'T1', sales: 2400 },
  { month: 'T2', sales: 1398 },
  { month: 'T3', sales: 9800 },
  { month: 'T4', sales: 3908 },
  { month: 'T5', sales: 4800 },
];

function SalesChart() {
  return (
    <div className="chart-container">
      <h3>Doanh thu theo tháng</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;
