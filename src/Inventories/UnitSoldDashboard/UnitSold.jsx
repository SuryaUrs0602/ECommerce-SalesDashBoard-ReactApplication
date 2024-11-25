import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { HubConnectionBuilder } from '@microsoft/signalr';

const UnitSold = () => {

    const [unitSoldYearly, setUnitSoldYearly] = useState([]);
    const [unitSoldMonthly, setUnitSoldMonthly] = useState([]);
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

            connection.on('ReceiveUnitSold', (unitSoldData) => {
                setUnitSoldYearly(unitSoldData);
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
        const fetchYearlyUnitSold = async () => {
            try {
                const response = await axios.get(`https://localhost:7148/api/SalesPerformances/unit-sold/2020/2024`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUnitSoldYearly(response.data);
            } catch (error) {
                console.log(error, 'Error occurred while fetching yearly unit sold count');
                setError('An issue occurred while fetching the yearly ordered user count data');
            }
        };
        fetchYearlyUnitSold();
    }, []);


    useEffect(() => {
        if (selectedYear) {
            const fetchMonthlyUnitSold = async () => {
                try {
                    const response = await axios.get(`https://localhost:7148/api/SalesPerformances/unit-sold/${selectedYear}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUnitSoldMonthly(response.data);
                } catch (error) {
                    console.log(error, 'Error occurred while fetching monthly unit sold count');
                    setError('An issue occurred while fetching the monthly ordered user count data');
                }
            };
            fetchMonthlyUnitSold();
        }
    }, [selectedYear]);

    const years = ['2020', '2021', '2022', '2023', '2024'];
    const unitSold = unitSoldYearly.map(item => item.countOfUnitSold);
    const yearlyChartData = {
        labels: years,
        datasets: [
            {
                label: 'Units Sold (Yearly)',
                data: unitSold,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
                tension: 0.1,
                pointStyle: 'rectRounded',
                pointRadius: 5,
                pointHoverRadius: 7,
                borderWidth: 2,
            },
        ],
    };


    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyUnitSold = unitSoldMonthly.map(item => item.countOfUnitSold);
    const monthlyChartData = {
        labels: months,
        datasets: [
            {
                label: `Units Sold (Monthly - ${selectedYear})`,
                data: monthlyUnitSold,
                fill: false,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                tension: 0.1,
                pointStyle: 'rectRounded',
                pointRadius: 5,
                pointHoverRadius: 7,
                borderWidth: 2,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Unit Sold Dashboard</h2>
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
        </div>
    )
}

export default UnitSold
