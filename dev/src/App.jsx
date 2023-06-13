import React from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import HomePage from './pages/home';
import Dashboard from './pages/dashboard';

export default function App() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    // const location = useLocation()
    // alert(location)
    return (
        <BrowserRouter>
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="dashboard" element={<Dashboard />} />
            {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </BrowserRouter>
    )
}

