import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CreateOrders from './components/CreateOrders';
import OrderSummary from './components/OrderSummary';
import UserOrders from './components/UserOrders';
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home />} />
        
        {/* Login and Register routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes - wrapped inside PrivateRoute */}
        <Route path="/create-orders" element={<PrivateRoute element={<CreateOrders />} />} />
        <Route path="/order-summary" element={<PrivateRoute element={<OrderSummary />} />} />
        <Route path="/user-orders" element={<PrivateRoute element={<UserOrders />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
