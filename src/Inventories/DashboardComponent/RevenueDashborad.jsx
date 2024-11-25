import React from 'react'
import TotalRevenue from '../RevenueDashboard/TotalRevenue'
import RevenuePerOrder from '../RevenuePerOrderDashboard/RevenuePerOrder'
import RevenueGrowthRate from '../RevenueGrowthDashboard/RevenueGrowthRate'
import TotalCost from '../TotalCostDashboard/TotalCost'
import CostPerOrder from '../CostPerOrderDashboard/CostPerOrder'

const RevenueDashborad = () => {
  return (
    <div>
        <TotalRevenue />
        <RevenuePerOrder />
        <RevenueGrowthRate />
        <TotalCost />
        <CostPerOrder />
    </div>
  )
}

export default RevenueDashborad
