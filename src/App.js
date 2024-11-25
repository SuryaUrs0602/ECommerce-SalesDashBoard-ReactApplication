import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/HeaderComponent/Header';
import Home from './Components/HomeComponent/Home';
import About from './Components/AboutComponent/About';
import Products from './Components/ProductsComponent/Products';
import Footer from './Components/FooterComponent/Footer';
import Login from './Components/LoginComponent/Login';
import SignUp from './Components/LoginComponent/SignUp';
import PrivateRoute from './Utils/PrivateRoute';
import Dashboard from './Inventories/DashboardComponent/Dashboard';
import Profile from './Components/ProfileComponent/Profile';
import InventoryTable from './Inventories/InventoryComponent/InventoryTable';
import EditProfile from './Components/ProfileComponent/EditProfile';
import AddProduct from './Inventories/InventoryComponent/AddProduct';
import UpdateProduct from './Inventories/InventoryComponent/UpdateProduct';
import Orders from './Inventories/InventoryComponent/Orders';
import UsersOrders from './Components/OrderComponent/UsersOrders';
import OrderConfirm from './Components/OrderConfirmComponent/OrderConfirm';
import SalesDashboard from './Inventories/DashboardComponent/SalesDashboard';
import RevenueDashborad from './Inventories/DashboardComponent/RevenueDashborad';
import PaymentConfirm from './Components/PaymentComponent/PaymentConfirm';
import PageNotFound from './Components/PageNotFoundComponent/PageNotFound';

function App() {
  return (
    <div className="App">
        <Router>
          <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/products' element={<Products />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='*' element={<PageNotFound />} />

                <Route element={<PrivateRoute />}>
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/inventory' element={<InventoryTable />} />
                  <Route path='/editprofile' element={<EditProfile />} />
                  <Route path='/addproduct' element={<AddProduct />} />
                  <Route path='/editproduct/:id' element={<UpdateProduct />} />
                  <Route path='/orderdetails' element={<Orders />} />
                  <Route path='/userorders' element={<UsersOrders />} />
                  <Route path='/ordersconfirm' element={<OrderConfirm />} />
                  <Route path='/salesdashboard' element={<SalesDashboard />} />
                  <Route path='/revenuedashboard' element={<RevenueDashborad />} />
                  <Route path='/confirmpayment' element={<PaymentConfirm />} />
                </Route>    
            </Routes>
          <Footer />
        </Router>
    </div>
  );
}

export default App;
