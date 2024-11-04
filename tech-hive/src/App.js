import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignUp from './components/loginSignup'; 
import HomePage from './components/Home'; 
import Admin from './components/admin';
import ProductPage from './components/viewProduct';
import ShowCart from './components/ShowCart';
import './App.css';

function App() {
  return (
    <Router>
      <Routes className="App">
        <Route path="/" element={<LoginSignUp />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<ShowCart />} />
      </Routes>
    </Router>
  );
}

export default App;
