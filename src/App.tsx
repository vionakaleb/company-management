import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Overview from 'pages/overview';
import Offices from 'pages/offices';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" Component={Overview} />
                <Route path="/offices/:id" Component={Offices} />
            </Routes>
        </Router>
    );
}

export default App;
