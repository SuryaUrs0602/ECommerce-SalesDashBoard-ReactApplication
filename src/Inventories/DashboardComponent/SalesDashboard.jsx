import React from 'react'
import TotalOrders from '../OrdersDashboard/TotalOrders'
import AverageOrderValue from '../AOVDashboard/AverageOrderValue'
import UsersCount from '../UserCountDashboard/UsersCount'
import OrderedUsersCount from '../OrderedUserDashboard/OrderedUsersCount'
import UnitSold from '../UnitSoldDashboard/UnitSold'
import SalesGrowth from '../SalesGrowthDashboard/SalesGrowth'

const SalesDashboard = () => {
  return (
    <div>
      <TotalOrders />
      <AverageOrderValue />
      <UsersCount />
      <OrderedUsersCount />
      <UnitSold />
      <SalesGrowth />
    </div>
  )
}

export default SalesDashboard
