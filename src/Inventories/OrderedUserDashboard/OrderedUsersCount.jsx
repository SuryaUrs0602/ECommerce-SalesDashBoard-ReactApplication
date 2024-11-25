import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { HubConnectionBuilder } from '@microsoft/signalr';

const OrderedUsersCount = () => {
    const [orderedUserCountYearly, setOrderedUserCountYearly] = useState([]);
    const [orderedUserCountMonthly, setOrderedUserCountMonthly] = useState([]);
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

            connection.on('ReceiveOrderedUsersCount', (updatedOrderedUserCount) => {
                setOrderedUserCountYearly(updatedOrderedUserCount);
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
        const fetchYearlyOrderedUserCount = async () => {
            try {
                const response = await axios.get('https://localhost:7148/api/SalesPerformances/ordered-user/2020/2024', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrderedUserCountYearly(response.data);
            } catch (error) {
                console.log(error, 'Error occurred while fetching yearly ordered user count');
                setError('An issue occurred while fetching the yearly ordered user count data');
            }
        };
        fetchYearlyOrderedUserCount();
    }, []);

    useEffect(() => {
        if (selectedYear) {
            const fetchMonthlyOrderedUserCount = async () => {
                try {
                    const response = await axios.get(`https://localhost:7148/api/SalesPerformances/ordered-user/${selectedYear}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setOrderedUserCountMonthly(response.data);
                } catch (error) {
                    console.log(error, 'Error occurred while fetching monthly ordered user count');
                    setError('An issue occurred while fetching the monthly ordered user count data');
                }
            };
            fetchMonthlyOrderedUserCount();
        }
    }, [selectedYear]);

    const years = ['2020', '2021', '2022', '2023', '2024'];
    const orderedUserDataYearly = orderedUserCountYearly.map(user => user.countOfOrderedUser);
    const yearlyChartData = {
        labels: years,
        datasets: [
            {
                label: 'Ordered User Count (Yearly)',
                data: orderedUserDataYearly,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const orderedUserDataMonthly = orderedUserCountMonthly.map(user => user.countOfOrderedUser);
    const monthlyChartData = {
        labels: months,
        datasets: [
            {
                label: `Ordered User Count (Monthly - ${selectedYear})`,
                data: orderedUserDataMonthly,
                backgroundColor: 'rgba(255, 159, 64, 0.7)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
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
            <h2 className="text-xl font-semibold mb-4">Ordered User Count Dashboard</h2>
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
                    <Bar data={yearlyChartData} options={options} />
                </div>

                {selectedYear && (
                    <div className="bg-white p-4 rounded shadow w-1/2">
                        <Bar data={monthlyChartData} options={options} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrderedUsersCount;
