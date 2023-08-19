import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import DetailPage from "./pages/DetailPage"; // DetailPage를 DetailPage로 수정

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/:camp" element={<DetailPage />} /> {/* DetailPage로 수정 */}
            </Routes>
        </Router>
    );
}

export default App;
