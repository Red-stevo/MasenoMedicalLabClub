import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import IndexPage from "./Pages/IndexPage/Components/IndexPage.jsx";
import LoginPage from "./Pages/LoginPage/Components/LoginPage.jsx";
import "./App.css";
import ProtectedRoutes from "./RouterProtectionComponent/ProtectedRoutes.jsx";
import HomeNavBar from "./Pages/ProtectedPage/HomeNavBar/Components/HomeNavBar.jsx";
import EventsPage from "./Pages/ProtectedPage/EventsPage/Components/EventsPage.jsx";
import AddEventPage from "./Pages/ProtectedPage/EventsPage/Components/AddEventPage.jsx";
import AdminRouteProtection from "./RouterProtectionComponent/AdminRouteProtection.jsx";
import EventDataView from "./Pages/ProtectedPage/EventsPage/Components/EventDataView.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path={"/"} element={<IndexPage />} />
                <Route path={"/login"} element={<LoginPage />} />
                <Route path={"/home"} element={<ProtectedRoutes><HomeNavBar /></ProtectedRoutes>}>
                    <Route path={"/home/events"} element={<EventsPage />} />
                    <Route path={"/home/events/add"}
                           element={<AdminRouteProtection><AddEventPage /></AdminRouteProtection>} />
                    <Route path={"/home/events/:eventId"} element={<EventDataView />}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

