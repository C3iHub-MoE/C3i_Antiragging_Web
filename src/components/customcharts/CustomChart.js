import React from "react";
import ReactECharts from "echarts-for-react"

const CustomChart = ({ options }) => {
    return (
      <ReactECharts
        option={options}
        style={{ height: "300px", width: "100%" }}
      />
    );
  };
  
  export default CustomChart;