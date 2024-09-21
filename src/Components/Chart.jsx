import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';



export default function PieActiveArc({topProfits}) {
  
  const color = [
    "rgb(94, 105, 202)",
    "rgb(245, 144, 122)",
    "rgb(42,31,86)",
    
  ]
  // const t = topProfits;
  const data = []
  console.log(topProfits);
  let i = 0;
  for(const e of topProfits){
    data.push({ id: i, value: e.payments_sum_cost, label: `course ${i + 1}`, color : color[i]},)
    i++;
  }
  
  
// { id: 1, value: topProfits[1].payments_sum_cost, label: 'course 2'},
    // { id: 2, value: topProfits[2].payments_sum_cost, label: 'course 3'},
  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          color:color,
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={200}
      
    />
    
  );
}
