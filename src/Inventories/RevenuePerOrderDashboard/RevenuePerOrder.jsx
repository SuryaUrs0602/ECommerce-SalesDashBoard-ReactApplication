import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { HubConnectionBuilder } from '@microsoft/signalr';

const RevenuePerOrder = () => {

    const [revenuePerOrderYearly, setRevenuePerOrderYearly] = useState([]);
    const [revenuePerOrderMonthly, setRevenuePerOrderMonthly] = useState([]);
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

            connection.on('ReceiveRevenuePerOrder', (updatedRevenuePerOrder) => {
                setRevenuePerOrderYearly(updatedRevenuePerOrder);
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
        const fetchRevenueData = async() => {
            try {
                const response = await axios.get(`https://localhost:7148/api/Revenues/revenue-per-order/2020/2024`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRevenuePerOrderYearly(response.data);
            } catch (error) {
                console.log(error, 'Error occurred while fetching yearly ordered user count');
                setError('An issue occurred while fetching the revenue per order data');
            }
        }
        fetchRevenueData();
    }, []);


    useEffect(() => {
        if (selectedYear) {
            const fetchRevenue = async() => {
                try {
                    const response = await axios.get(`https://localhost:7148/api/Revenues/revenue-per-order/${selectedYear}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setRevenuePerOrderMonthly(response.data);
                } catch (error) {
                    console.log(error, 'Error occurred while fetching yearly ordered user count');
                    setError('An issue occurred while fetching the revenue per order data');
                }
            }
            fetchRevenue();
        }
    }, [selectedYear]);


    const years = ['2020', '2021', '2022', '2023', '2024'];
    const rpoDataYearly = revenuePerOrderYearly.map(item => item.averageRevenuePerOrder);
    const yearlyChartData = {
        labels: years,
        datasets: [
            {
                label: 'Average Revenue Per Order (Yearly)',
                data: rpoDataYearly,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
                borderWidth: 2,
            },
        ],
    };


    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const rpoMonthly = revenuePerOrderMonthly.map(item => item.averageRevenuePerOrder);
    const monthlyChartData = {
        labels: months,
        datasets: [
            {
                label: `Average Revenue Per Order (Monthly - ${selectedYear})`,
                data: rpoMonthly,
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
            <h2 className="text-xl font-semibold mb-4">Average Revenue Per Order</h2>
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

export default RevenuePerOrder
