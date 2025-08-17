import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, XAxis, YAxis, Bar, CartesianGrid, Legend } from "recharts";
import { Card, CardContent } from '../components/Card';

const statsData = [
  { name: "Users", value: 120 },
  { name: "Posts", value: 450 },
  { name: "Active", value: 75 },
  { name: "Comments", value: 320 },
];
const COLORS = ["#4ade80", "#60a5fa", "#facc15", "#f87171"];
const DashboardHome = () => {
    return (
        <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold text-center text-gray-950">📊 Overview Dashboard</h2>

      {/* Pie Chart */}
      <Card className="p-4 shadow-lg">
        <CardContent>
          <h3 className="text-xl font-semibold mb-4 text-gray-950">User & Activity Stats</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statsData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {statsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <Card className="p-4 shadow-lg">
        <CardContent>
          <h3 className="text-xl font-semibold mb-4 text-gray-950">Post & Comments Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
    );
};

export default DashboardHome;