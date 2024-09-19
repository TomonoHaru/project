import ReactApexChart from "react-apexcharts";
import { useState, useEffect } from "react";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';



function App() {

    const [onya, setOnya] = useState(null);
    const monthLabels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    const [selectedMonth, setSelectedMonth] = useState(monthLabels[0]);

    const weeksLabels = ["1", "2", "3", "4", "5"];
    const [selectedWeeks, setSelectedWeeks] = useState(weeksLabels[0]);

    useEffect(() => {

        const fetchData = async () => {
            const res = await fetch("/onya.json");
            const data = await res.json();
            setOnya(data);
        }
        fetchData();
    }, [])

    if (onya == null) { return <div>loading...</div> }

    const handleChangeMonth = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handleChangeWeeks = (event) => {
        setSelectedWeeks(event.target.value);
    };

    // function incrementColor(rgb,increment){
    //     let [r,g,b] = rgb.match(/\d+/g).map(Number);

    //     r = (r + increment) % 256;
    //     g = (g + increment) % 256;
    //     b = (b + increment) % 256;

    //     return 'rbg(${r},${g},$[b])';

    // }

    
    // function colorScale(startColor,steps,increment){
    //     const colors = [];
    //     let color = startColor;

    //     for(let i = 0;i < steps;i++){
    //         colors.push(color);
    //         color = incrementColor(color,increment);
    //     }

    //     return colors;

    // }

    // const baseColor = "rgb(255,0,0)";
    

    const options = {
            chart:{
                toolbar:{
                    show:false,
                }
            },
            plotOptions: {
                heatmap: {
                    colorScale: {
                        ranges: [
                        {
                            from: 0,
                            to: 10,
                            color: '#ffebee',
                            name: '0~10',
                        },
                        {
                            from: 11,
                            to: 20,
                            color: '#ffcdd2',
                            name: '11~20',
                        },
                        {
                            from: 21,
                            to: 30,
                            color: '#ef9a9a',
                            name: '21~30',
                        },
                        {
                            from: 31,
                            to: 40,
                            color: '#e57373',
                            name: '31~40',
                        },
                        {
                            from: 41,
                            to: 50,
                            color: '#ef5350',
                            name: '41~50',
                        },
                        {
                            from: 51,
                            to: 60,
                            color: '#f44336',
                            name: '51~60',
                        },
                        {
                            from: 61,
                            to: 70,
                            color: '#e53935',
                            name: '61~70',
                        },
                        {
                            from: 71,
                            to: 80,
                            color: '#d32f2f',
                            name: '71~80',
                        },
                        {
                            from: 81,
                            to: 90,
                            color: '#c62828',
                            name: '81~90',
                        },
                        {
                            from: 91,
                            to: 150,
                            color: '#5f0937',
                            name: '91~150',
                        },
                        ]
                    }
                }
            }
        }

    const lineOption = {
        chart:{
          toolbar: {
            show: false
          }
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
        yaxis: {
        title: {
            text: '来客数(人)',  
            style: {
                fontSize: '14px',  
                fontWeight: '300',
                color: '#000'  
            }
        }
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

    };



    const series = Array.from(new Set(onya.Data.map(({ "day of week": DOW }) => (DOW))))
        .map((DOW) => {

            return {
                name: DOW,
                data: onya.Data
                    .filter((item) => item.month == selectedMonth)
                    .filter((item) => item["day of week"] === DOW)
                    .map(({ year: x, visitor: y }) => ({ x, y }))
            };

        })

    const lineSeries = Array.from(new Set(onya.Data.map(({ "day of week": DOW }) => (DOW))))
        .map((DOW) => {

            return {
                name: DOW,
                data: onya.Data
                    .filter((item) => item.month == selectedMonth)
                    .filter((item) => item.weeks == selectedWeeks)
                    .filter((item) => item["day of week"] === DOW)
                    .map(({ visitor }) => (visitor))
            };

        })





    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <img src="/onyasai.jpg" height="60" width="auto" />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: 50,marginLeft:5}}>
                            温野菜(本八幡店)の来客数の可視化
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>

        <div style={{display:"flex", justifyContent: "center",alignItems:"center",flexDirection:"column"}}>
            <div> 
                
                  <label>月の選択</label>

                  <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedMonth}
                      label="month"
                      onChange={handleChangeMonth}
                      sx={{marginRight:"12px",marginLeft:"12px",marginTop:"12px"}}
                >
                      {monthLabels.map((item) => (
                          <MenuItem key={item} value={item}>{item}月</MenuItem>
                      ))}
                  </Select>
                
                <label>何週目の選択</label>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedWeeks}
                    label="weeks"
                    onChange={handleChangeWeeks}
                     sx={{marginRight:"12px",marginLeft:"12px",marginTop:"12px"}}
                >
                    {weeksLabels.map((item) => (
                        <MenuItem key={item} value={item}>{item}週目</MenuItem>
                    ))}
                </Select>
            </div>

            <div id="chart">
                <ReactApexChart
                    options={options}
                    series={series}
                    type="heatmap"
                    height={350}
                    width={1000} />
            </div>

            <div id="chart">
                <ReactApexChart
                    options={lineOption}
                    series={lineSeries}
                    type="line"
                    height={350}
                    width={1000} />
            </div>





        </div>
        </div>

    );

}

export default App

