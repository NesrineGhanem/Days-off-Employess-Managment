import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' ,
      },
      title: {
        display: true,
        text: 'Order Revenue',
      },
    },
  };
 
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => Math.random()+1000),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => Math.random()+1000),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
function DashbordBarChart(){
return(
    <>
       <Bar options={options} data={data} />;

    </>
)
}
export default DashbordBarChart()