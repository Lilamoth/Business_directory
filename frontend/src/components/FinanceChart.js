import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const FinanceChart = ({ revenueHistory }) => {
  const chartData = {
    labels: ['2021', '2022', '2023', '2024', '2025'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: revenueHistory || [250000, 360000, 420000, 460000, 500000],
        fill: false,
        borderColor: '#06b6d4',
        tension: 0.4,
      },
      {
        label: 'CAGR (%)',
        data: [0.7, 0.8, 0.9, 0.95, 1.0],
        yAxisID: 'y1',
        borderColor: '#facc15',
        backgroundColor: '#facc15',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear',
        position: 'left',
        beginAtZero: true,
      },
      y1: {
        type: 'linear',
        position: 'right',
        beginAtZero: true,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Yearly Financial Overview',
        color: '#fff',
        font: { size: 16 },
      },
      legend: {
        labels: {
          color: '#fff',
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: '100%', padding: '1rem' }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default FinanceChart;
