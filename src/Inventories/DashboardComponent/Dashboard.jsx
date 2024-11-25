import React from 'react';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">

      <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-center mb-4">Dashboard</h1>
        <p className="text-gray-700 text-center">
          A dashboard is a visual interface that displays key metrics and data points in a consolidated view, 
          allowing users to monitor and analyze performance at a glance. It typically aggregates information 
          from various sources and presents it through charts, graphs, tables, and other visual elements. 
          Dashboards are widely used in business intelligence to facilitate data-driven decision-making, enabling 
          users to track progress, identify trends, and gain insights into specific areas of interest.
        </p>
      </div>


      <div className="flex justify-between w-full max-w-3xl mb-6">

        <NavLink to="/salesdashboard" className="bg-white shadow-md rounded-lg p-6 w-full mr-2 transition-transform transform hover:scale-105 hover:shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-4">Sales Dashboard</h1>
          <p className="text-gray-700 text-center">
            A sales dashboard is a specialized type of dashboard focused on tracking sales performance metrics. 
            It provides real-time insights into key indicators such as total orders, average order value (AOV), 
            number of users registered to the application, number of user who have ordered, number of units sold
            and sales growth rate.
            By visualizing data related to customer interactions, lead generation, and 
            product performance, a sales dashboard helps sales teams and management make informed decisions to 
            optimize their strategies, enhance customer engagement, and ultimately increase sales effectiveness.
          </p>
        </NavLink>      


        <NavLink to="/revenuedashboard" className="bg-white shadow-md rounded-lg p-6 w-full ml-2 transition-transform transform hover:scale-105 hover:shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-4">Revenue Dashboard</h1>
          <p className="text-gray-700 text-center">
            A revenue dashboard is designed to monitor and analyze an organization's revenue generation activities. 
            It presents metrics such as total revenue, revenue per order, revenue growth rate, total cost, cost per order. 
            By offering a clear view of revenue trends and performance, this type of 
            dashboard allows businesses to assess their financial health, identify areas for improvement, and 
            develop strategies for increasing profitability. It serves as a crucial tool for financial planning 
            and analysis, helping organizations align their operations with their revenue goals.
          </p>
        </NavLink>
      </div>
    </div>
  );
};

export default Dashboard;
