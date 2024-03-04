import React from 'react';
// Import the Router Component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FetchCustomer from './Components/FetchCustomer';
import AllCustomers from './Components/AllCustomers';
import NewCustomerRecord from './Components/NewCustomerRecord';
import HomePage from './Components/HomePage';
import NewUserReg from './Components/NewUserReg';
import UserLogIn from './Components/UserLogIn';
import LandingPage from './Components/LandingPage';




//rendering the app
const App = () => {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AllCustomers" element={<AllCustomers />} />
        <Route path="/FetchCustomer" element={<FetchCustomer />} />
        <Route path="/NewCustomer" element={<NewCustomerRecord />} />
        <Route path="/NewUserReg" element={<NewUserReg />} />
        <Route path="/UserLogIn" element={<UserLogIn />} />
        <Route path="/LandingPage" element={<LandingPage />} />

      </Routes>
    </Router>
  );
};

export default App;