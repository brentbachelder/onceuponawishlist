import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Signup from "./Login/Signup";
import Dashboard from "./Dashboard";
import Login from "./Login/Login";
import PrivateRoute from "./Login/PrivateRoute";
import PrivateList from "./Lists/PrivateList";
import ForgotPassword from "./Login/ForgotPassword";
import List from "./Lists/List";
import OwnerList from "./Lists/OwnerList";
import PreviewList from "./Lists/PreviewList";

function App() {
  return (
    
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: '400px' }}>
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

                <Route path="*" element={<Dashboard />} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
  )
}

export default App;
