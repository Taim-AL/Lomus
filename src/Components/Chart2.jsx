import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

const  Chart2= ({data}) =>{
  // static demoUrl = 'https://codesandbox.io/p/sandbox/line-chart-width-xaxis-padding-8v7952';

    return (
    //   <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={262}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="date" style={{color:"rgb(94, 105, 202)" ,fontFamily:"Michroma",fontSize:"10px"}}/>
          <YAxis style={{color:"rgb(94, 105, 202)" ,fontFamily:"Michroma",fontSize:"10px"}}/>
          <Tooltip />
          {/* <Legend /> */}
          <Line type="monotone" dataKey="count" stroke="rgb(94, 105, 202)" activeDot={{ r: 8 }} />
          {/* <Line type="monotone" dataKey="uv" stroke="#333649" /> */}
        </LineChart>
    //   </ResponsiveContainer>
    );
  }

  export default Chart2 ;
