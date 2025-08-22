'use client';
import React from 'react'
import {
  ResponsiveContainer,

  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface EmotionData {
  name: string;
  value: number;
}

interface EmotionDistributionChartProps {
  emotionData: EmotionData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


function EmotionDistributionChart({ emotionData }: EmotionDistributionChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <Pie
          data={emotionData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {emotionData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom"  />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default EmotionDistributionChart