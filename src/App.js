import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import RegistrationForm from './components/RegistrationForm';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route
                exact
                path="/"
                element={<LoginPage />}
            />
            <Route
                exact
                path="/registration"
                element={<RegistrationForm />}
            />
            <Route
                exact
                path="/admin"
                element={<AdminPage />}
            />
             <Route
                exact
                path="/dashboard"
                element={<Dashboard />}
            />
        </Routes>
    </BrowserRouter>
</>
  )
}

 export default App