import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationSummary from "./components/RegistrationSummary";

const App = () => {
    return (

    <BrowserRouter >
        <Routes>
            <Route path="/" element={<RegistrationForm />} />
            <Route path="/summary" element={<RegistrationSummary />} />
        </Routes>
    </BrowserRouter>
    );
};

export default App;
