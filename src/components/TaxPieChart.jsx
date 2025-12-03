'use client';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function TaxPieChart({ tax, net }) {
  const data = [
    { name: 'Utbetalt (Net)', value: net, color: '#10b981' }, // Emerald-500
    { name: 'Skatt (Vergi)', value: tax, color: '#ef4444' },  // Red-500
  ];

  return (
    // Buradaki 'h-[250px]' ve 'w-full' çok önemli, grafiğin çökmemesini sağlar
    <div style={{ width: '100%', height: 250 }} className="mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => `${value.toLocaleString()} kr`}
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}