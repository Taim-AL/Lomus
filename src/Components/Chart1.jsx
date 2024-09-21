import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   {
//     name: 'Page A',
//     uv: 7,
//   },
//   {
//     name: 'Page B',
//     uv: 4,
//   },
//   {
//     name: 'Page C',
//     uv: 10,
    
//   },
//   {
//     name: 'Page D',
//     uv: 5,
    
    
//   },
//   {
//     name: 'Page E',
//     uv: 2,
//   },
//   {
//     name: 'Page F',
//     uv: 9,
//   },
//   {
//     name: 'Page G',
//     uv: 2,
//   },
// ];

// extends PureComponent
const Example = ({data}) =>   {
  // static demoUrl = 'https://codesandbox.io/p/sandbox/simple-bar-chart-72d7y5';
//   constructor(data) {
//     super()
//     this.data = data
// }
  // render() {   
    return (
      <div >
        <BarChart
          width={300}
          height={200}
          data={data}
          // margin={{
          //   top: 5,
          //   right: 30,
          //   left: 20,
          //   bottom: 5,
          // }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="title" AxisComp={{fill:"rgb(94, 105, 202)"}} style={{fontFamily:"Michroma",fontSize:"10px"}}/>
          {/* <YAxis /> */}
          <Tooltip  contentStyle={{fontFamily:"Michroma",fontSize:"12px"}} labelStyle={{color:"rgb(94, 105, 202)" ,fontFamily:"Michroma",fontSize:"10px"}}/>
          {/* <Legend /> */}
          <Bar dataKey="payments_count" fill="rgb(245, 144, 122)"  background={{ fill: '#ef65033a' }}  activeBar={<Rectangle fill="rgb(245, 144, 122)" stroke="rgb(245, 144, 122)" />} />
          {/* <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} /> */}
        </BarChart>
      </div>
    );
  }

  export default  Example;