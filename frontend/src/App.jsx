import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import IndexPage from "./Pages/IndexPage/IndexPage.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path={"/"} element={<IndexPage />}>

                </Route>
            </Routes>
        </Router>
    );
}

export default App;

