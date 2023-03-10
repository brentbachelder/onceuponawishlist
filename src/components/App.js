import React from "react";
import { AuthProvider } from "../etc/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Signup from "./Login/Signup";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";
import PrivateRoute from "./Login/PrivateRoute";
import PrivateList from "./Lists/PrivateList";
import ForgotPassword from "./Login/ForgotPassword";
import List from "./Lists/List";
import OwnerList from "./Lists/OwnerList";
import PreviewList from "./Lists/PreviewList";
import NewList from "./Lists/Components/NewList";

function App() {
    return (
        <div style={{ minWidth: "100vw", minHeight: "100vh" }}>
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<PrivateRoute><Landing /></PrivateRoute>} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/signup" element={<PrivateRoute><Signup /></PrivateRoute>} />
                        <Route path="/login" element={<PrivateRoute><Login /></PrivateRoute>} />
                        <Route path="/forgot-password" element={<PrivateRoute><ForgotPassword /></PrivateRoute>} />

                        <Route path="/list/:listId" element={<PrivateList><List /></PrivateList>} />
                        <Route path="/preview/:listId" element={<PrivateList><PreviewList /></PrivateList>} />
                        <Route path="/mylist/:listId" element={<PrivateList><OwnerList /></PrivateList>} />

                        <Route path="/newlist" element={<PrivateList><NewList /></PrivateList>} />

                        <Route path="*" element={<Dashboard />} />
                    </Routes>
                </AuthProvider>
            </Router>
        </div>
    )
}

export default App;
