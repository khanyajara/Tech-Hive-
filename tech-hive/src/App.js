import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignUp from './components/loginSignup'; 
import HomePage from './components/Home'; 
import Admin from './components/admin';
import './App.css';

function App() {
  return (
    <Router>
      <Routes className="App">
        <Route path="/" element={<LoginSignUp />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
