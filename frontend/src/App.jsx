import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import IndexPage from "./Pages/IndexPage/Components/IndexPage.jsx";
import LoginPage from "./Pages/LoginPage/Components/LoginPage.jsx";
import "./App.css";
import ProtectedRoutes from "./RouteComponent/ProtectedRoutes.jsx";
import HomeNavBar from "./Pages/ProtectedPage/HomeNavBar/Components/HomeNavBar.jsx";
import EventsPage from "./Pages/ProtectedPage/EventsPage/Components/EventsPage.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path={"/"} element={<IndexPage />} />
                <Route path={"/login"} element={<LoginPage />} />
                <Route path={"/home"} element={<ProtectedRoutes><HomeNavBar /></ProtectedRoutes>}>
                    <Route path={"/home/events"} element={<EventsPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

