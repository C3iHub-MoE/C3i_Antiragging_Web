import React, { useEffect } from 'react';
import * as echarts from 'echarts';

export const Chart1 = () => {
  useEffect(() => {
    const chartDom = document.getElementById('chart1');
    const myChart = echarts.init(chartDom);

    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [
            120,
            { value: 200, itemStyle: { color: '#a90000' } },
            150,
            80,
            70,
            110,
            130,
          ],
          type: 'bar',
        },
      ],
    };

    myChart.setOption(option);
  }, []);

  return <div id="chart1" style={{ width: '100%', height: '400px' }}></div>;
};


export const Chart2 = () => {
  useEffect(() => {
    const chartDom = document.getElementById('chart2');
    const myChart = echarts.init(chartDom);

    const countryColors = {
      India: '#f93',
      Japan: '#bc002d',
      China: '#ffde00',
    };

    const updateFrequency = 2000;

    // Mock fetch data
    const data = [
      ['India', 70, 72, 'India'],
      ['Japan', 84, 85, 'Japan'],
      ['China', 76, 77, 'China'],


    ];

    const years = ['2000', '2005', '2010', '2015', '2020'];

    const option = {
      grid: {
        top: 10,
        bottom: 30,
        left: 150,
        right: 80,
      },
      xAxis: {
        max: 'dataMax',
        type: 'value',
      },
      yAxis: {
        type: 'category',
        inverse: true,
        max: 10,
        animationDuration: 300,
        animationDurationUpdate: 300,
      },
      series: [
        {
          realtimeSort: true,
          seriesLayoutBy: 'column',
          type: 'bar',
          data: data.map(item => ({
            value: item.slice(1, 3),
            name: item[0],
            label: {
              formatter: item[0], // Label display
            },
          })),
          itemStyle: {
            color: function (param) {
              return countryColors[param.value[2]] || '#5470c6';
            },
          },
        },
      ],
      animationDuration: 0,
      animationDurationUpdate: updateFrequency,
    };

    myChart.setOption(option);

    // Optionally handle resize on window resize
    window.addEventListener('resize', () => myChart.resize());

    return () => {
      window.removeEventListener('resize', () => myChart.resize());
      myChart.dispose();
    };
  }, []);

  return <div id="chart2" style={{ width: '100%', height: '400px' }}></div>;
};

export const Chart3 = () => {
  useEffect(() => {
    const chartDom = document.getElementById('chart3');
    const myChart = echarts.init(chartDom);

    const option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '70%'],
          startAngle: 180,
          endAngle: 360,
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' },
          ],
        },
      ],
    };

    myChart.setOption(option);

    // Optionally handle resize on window resize
    window.addEventListener('resize', () => myChart.resize());

    return () => {
      window.removeEventListener('resize', () => myChart.resize());
      myChart.dispose();
    };
  }, []);

  return <div id="chart3" style={{ width: '100%', height: '400px' }}></div>;
};

export const GaugeChart = () => {
  useEffect(() => {
    const chartDom = document.getElementById('gaugeChart');
    const myChart = echarts.init(chartDom);

    const gaugeData = [
      {
        value: 20,
        name: 'Perfect',
        title: {
          offsetCenter: ['0%', '-30%']
        },
        detail: {
          valueAnimation: true,
          offsetCenter: ['0%', '-20%']
        }
      },
      {
        value: 40,
        name: 'Good',
        title: {
          offsetCenter: ['0%', '0%']
        },
        detail: {
          valueAnimation: true,
          offsetCenter: ['0%', '10%']
        }
      },
      {
        value: 60,
        name: 'Commonly',
        title: {
          offsetCenter: ['0%', '30%']
        },
        detail: {
          valueAnimation: true,
          offsetCenter: ['0%', '40%']
        }
      }
    ];

    const option = {
      series: [
        {
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              borderWidth: 1,
              borderColor: '#464646'
            }
          },
          axisLine: {
            lineStyle: {
              width: 40
            }
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 10
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            distance: 50
          },
          data: gaugeData,
          title: {
            fontSize: 14
          },
          detail: {
            width: 50,
            height: 14,
            fontSize: 14,
            color: 'inherit',
            borderColor: 'inherit',
            borderRadius: 20,
            borderWidth: 1,
            formatter: '{value}%'
          }
        }
      ]
    };

    myChart.setOption(option);

    // Update the gauge data every 2 seconds
    const interval = setInterval(() => {
      gaugeData[0].value = +(Math.random() * 100).toFixed(2);
      gaugeData[1].value = +(Math.random() * 100).toFixed(2);
      gaugeData[2].value = +(Math.random() * 100).toFixed(2);
      
      // Update chart data
      myChart.setOption({
        series: [
          {
            data: gaugeData
          }
        ]
      });
    }, 2000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return <div id="gaugeChart" style={{ width: '100%', height: '400px' }}></div>;
};

export const Chart4 = () => {
  useEffect(() => {
    const chartDom = document.getElementById('chart4');
    const myChart = echarts.init(chartDom);

    const option = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Rainfall', 'Evaporation'],
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Rainfall',
          type: 'bar',
          data: [120, 200, 150, 80, 70, 110, 130],
        },
        {
          name: 'Evaporation',
          type: 'line',
          data: [30, 50, 20, 100, 80, 120, 90],
        },
      ],
    };

    myChart.setOption(option);
  }, []);

  return <div id="chart4" style={{ width: '100%', height: '400px' }}></div>;
};