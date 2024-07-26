import ReactApexChart from "react-apexcharts";
import onya from '../onya.json';
import React, { useState, useEffect } from "react";
import * as d3 from "d3";


function App() {

    const
        options = {
            plotOptions: {
                heatmap: {
                    colorScale: {
                        ranges: [{
                            from: 1,
                            to: 30,
                            color: '#00A100',
                            name: 'low',
                        },
                        {
                            from: 30,
                            to: 60,
                            color: '#128FD9',
                            name: 'medium',
                        },
                        {
                            from: 60,
                            to: 90,
                            color: '#FFB200',
                            name: 'high',
                        },
                        {
                            from: 90,
                            to: 130,
                            color: '#FF0000',
                            name: 'too high',
                        }
                        ]
                    }
                }
            }
        }

    const [lineOption] = useState({
        chart: {
            zoom: {
                enabled: false
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 2
        },
        markers: {
            size: 0,
            hover: {
                sizeOffset: 6
            }
        },
        xaxis: {
            categories: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020',
                '2021', '2022', '2023'
            ],
        },
        tooltip: {
            y: [
                {
                    title: {
                        formatter: function (val) {
                            return val;
                        }
                    }
                },
                {
                    title: {
                        formatter: function (val) {
                            return val;
                        }
                    }
                },
                {
                    title: {
                        formatter: function (val) {
                            return val;
                        }
                    }
                }
            ]
        },
        colors: ['#E91E63', '#3EC400', '#FE9200', '#73D8FF', '#795548', '#FFEB3B', '#0062B1']

    });

    const yearlabels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    const [SelectedValue, SetSelectedValue] = useState(yearlabels[0]);

    const weekslabels = ["1", "2", "3", "4", "5"];
    const [Selectedweeks, SetSelectedweeks] = useState(weekslabels[0]);

    const series = Array.from(new Set(onya.Data.map(({ "day of week": DOW }) => (DOW))))
        .map((DOW) => {

            return {
                name: DOW,
                data: onya.Data
                    .filter((item) => item.month == SelectedValue)
                    .filter((item) => item["day of week"] === DOW)
                    .map(({ year: x, visitor: y }) => ({ x, y }))
            };

        })

    const lineSeries = Array.from(new Set(onya.Data.map(({ "day of week": DOW }) => (DOW))))
        .map((DOW) => {

            return {
                name: DOW,
                data: onya.Data
                    .filter((item) => item.month == SelectedValue)
                    .filter((item) => item.weeks == Selectedweeks)
                    .filter((item) => item["day of week"] === DOW)
                    .map(({ visitor }) => (visitor))
            };

        })





    return (
        <div>

            <select value={SelectedValue} onChange={e => SetSelectedValue(e.target.value)} >
                {yearlabels.map((item) => (
                    <option key={item} value={item} >{item}</option>
                ))}
            </select>
            <label> 月 </label>

            <div id="chart">
                <ReactApexChart
                    options={options}
                    series={series}
                    type="heatmap"
                    height={350}
                    width={1000} />
            </div>
            <select value={Selectedweeks} onChange={e => SetSelectedweeks(e.target.value)}>
                {weekslabels.map((item) => (
                    <option key={item} value={item}>{item}</option>
                ))}
            </select>
            <label> 週目 </label>

            <div id="chart">
                <ReactApexChart
                    options={lineOption}
                    series={lineSeries}
                    type="line"
                    height={350}
                    width={1000} />
            </div>





        </div>

    );

}

export default App

