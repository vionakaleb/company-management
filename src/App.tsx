import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Overview from 'pages/overview';
import Offices from 'pages/offices';

class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/company-management" element={<Overview />} />
                    <Route path="/company-management/offices/:id" element={<Offices />} />
                </Routes>
            </Router>
        );
    }
}

export default App;
