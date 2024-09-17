import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import IndexPage from "./Pages/IndexPage/Components/IndexPage.jsx";
import LoginPage from "./Pages/LoginPage/Components/LoginPage.jsx";
import "./App.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path={"/"} element={<IndexPage />}></Route>
                <Route path={"/login"} element={<LoginPage />}></Route>
            </Routes>
        </Router>
    );
}

export default App;

