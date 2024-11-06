import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignUp from './components/loginSignup'; 
import HomePage from './components/Home'; 
import Admin from './components/admin';
import ProductPage from './components/viewProduct';
import ShowCart from './components/ShowCart';
import LoginAdmin from './components/loginforadmin';
import UserProfile from './components/userProfile';
import OrderTracking from './components/TrackOrder';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import './App.css';

function App() {


  const initialOptions = {
    "client-id": "AfIAqx5qwADS2y3HBA3G9jY9LTQxgY71yk1o5OT6ca0OwgiOfGQ2hUnNVYNRVYUDF3MgjtvljjF2m_iN",
    "enable-funding": "venmo",
    "buyer-country": "",
    currency: "USD",
    "data-page-type": "product-details",
    components: "buttons",
    "data-sdk-integration-source": "developer-studio",
  };
  return (
    <PayPalScriptProvider options={initialOptions}><Router>
    <Routes className="App">
      <Route path="/" element={<LoginSignUp />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/cart" element={<ShowCart />} />
      <Route path="/loginAdmin" element={<LoginAdmin />} />
      <Route path='/user' element={<UserProfile />} />
      <Route path='/track' element={<OrderTracking />} />
    </Routes>
  </Router></PayPalScriptProvider>
    
  );
}

export default App;
