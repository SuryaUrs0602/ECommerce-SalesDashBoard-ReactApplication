import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { HubConnectionBuilder } from '@microsoft/signalr';

const RevenueGrowthRate = () => {

    const [revenueGrowthRateYearly, setRevenueGrowthRateYearly] = useState([]);
    const [revenueGrowthRateMonthly, setRevenueGrowthRateMonthly] = useState([]);
    const [error, setError] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const token = sessionStorage.getItem('Token');
    const [hubConnection, setHubConnection] = useState(null);


    useEffect(() => {
        const connectToSignalR = async () => {
            const connection = new HubConnectionBuilder()
                .withUrl('https://localhost:7148/salesHub', {
                    accessTokenFactory: () => token,
                })
                .withAutomaticReconnect()
                .build();

            connection.on('ReceiveRevenueGrowthRate', (updatedRevenueGrowthRate) => {
                setRevenueGrowthRateYearly(updatedRevenueGrowthRate);
            });


            try {
                await connection.start();
                console.log('Connected to SignalR');
            } catch (err) {
                console.error('Error connecting to SignalR:', err);
            }

            setHubConnection(connection);
        };

        connectToSignalR();

        return () => {
            if (hubConnection) {
                hubConnection.stop();
            }
        };
    }, []);


    useEffect(() => {
        const fetchRevenuePerOrderData = async() => {
            try {
                const response = await axios.get(`https://localhost:7148/api/Revenues/revenue-growth-rate/2020/2024`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRevenueGrowthRateYearly(response.data);
            } catch (error) {
                console.log(error, 'Error occurred while fetching yearly ordered user count');
                setError('An issue occurred while fetching the revenue growth rate data');
            }
        }
        fetchRevenuePerOrderData();
    }, []);



    useEffect(() => {
        if (selectedYear) {
            const fetchRevenuePerOrder = async() => {
                try {
                    const response = await axios.get(`https://localhost:7148/api/Revenues/revenue-growth-rate/${selectedYear}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setRevenueGrowthRateMonthly(response.data);
                } catch (error) {
                    console.log(error, 'Error occurred while fetching yearly ordered user count');
                    setError('An issue occurred while fetching the revenue growth rate data');
                }
            }
            fetchRevenuePerOrder();
        }
    }, [selectedYear]);


    const years = ['2020', '2021', '2022', '2023', '2024'];
    const revenueGrowthRateDataYearly = revenueGrowthRateYearly.map(item => item.revenueGrowthRate);
    const yearlyChartData = {
        labels: years,
        datasets: [
            {
                label: 'Revenue Growth Rate (Yearly)',
                data: revenueGrowthRateDataYearly,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
                borderWidth: 2,
            },
        ],
    };


    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const revenueGrowthRateDataMonthly = revenueGrowthRateMonthly.map(item => item.revenueGrowthRate);
    const monthlyChartData = {
        labels: months,
        datasets: [
            {
                label: `Revenue Growth Rate (Monthly - ${selectedYear})`,
                data: revenueGrowthRateDataMonthly,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: false,
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

  return (
    <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Revenue Growth Rate</h2>
            {error && <p className="text-red-500">{error}</p>}

            <div className="mb-4">
                <label htmlFor="year-select" className="mr-2">Select Year:</label>
                <select
                    id="year-select"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="border rounded px-2 py-1"
                >
                    <option value="">-- Select Year --</option>
                    {Array.from({ length: 11 }, (_, i) => 2020 + i).map(year => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex space-x-4">
                <div className="bg-white p-4 rounded shadow w-1/2">
                    <Line data={yearlyChartData} options={options} />
                </div>

                {selectedYear && (
                    <div className="bg-white p-4 rounded shadow w-1/2">
                        <Line data={monthlyChartData} options={options} />
                    </div>
                )}
            </div>
        </div>
  )
}

export default RevenueGrowthRate
