import ReactApexChart from "react-apexcharts";
import { useState, useEffect } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function App() {

    const [onya, setOnya] = useState(null);
    const monthlabels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    const [selectedMonth, setSelectedMonth] = useState(monthlabels[0]);

    const weekslabels = ["1", "2", "3", "4", "5"];
    const [selectedWeeks, setSelectedWeeks] = useState(weekslabels[0]);

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

    const lineOption = {
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
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ m: 3 }}
                        >
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: 40 }}>
                            温野菜の来客数の可視化
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <div>
                <label>月の選択</label>

                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedMonth}
                    label="month"
                    onChange={handleChangeMonth}
                    sx={{ ml: 5 }}
                >
                    {monthlabels.map((item) => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                </Select>
            </div>


            <div>
                <label>曜日の選択</label>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedWeeks}
                    label="weeks"
                    onChange={handleChangeWeeks}
                    sx={{ ml: 3 }}
                >
                    {weekslabels.map((item) => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
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

    );

}

export default App

