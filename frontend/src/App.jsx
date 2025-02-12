import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './assets/components/Dashboard';
import Register from './assets/components/Register';
import Home from './assets/components/Home';
import Login from './assets/components/Login';
import Userlogin from './assets/components/Userlogin';
import Teacher from './assets/components/Teacher';
import Driver from './assets/components/Driver';
import Finance from './assets/components/Finance';
import { UserProvider } from './context/usercontext';  // Ensure this is the correct path
import DisplayStudents from './assets/components/DisplayStudents';
import Fee from './assets/components/Fee';
import FeeRecord from './assets/components/FeeRecord';
import Attendance from './assets/components/Attendence';
import Students from './assets/components/Students';
import Expense from './assets/components/Expense';
import Income from './assets/components/Income';
import IncomesAndExpenses from './assets/components/IncomesAndexpenses';
import UpdateUser from './assets/components/UpdateUser';
import SummaryPage from './assets/components/SummaryPage';
import ReportPage from './assets/components/ReportPage';





function App() {
    return (


        <UserProvider>  {/* Wrap the routes with UserProvider */}
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/Userlogin" element={<Userlogin/>}/>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/Teacher" element={<Teacher/>} />
                    <Route path="/Driver" element={<Driver/>} />
                    <Route path="/Finance" element={<Finance/>} />
                    <Route path="/Fee" element={<Fee/>} />
                    <Route path="/Record" element={<FeeRecord/>} />
                    <Route path="/Display" element={<DisplayStudents/>} />
                    <Route path="/attendence" element={<Attendance/>} />
                    <Route path="/Students" element={<Students/>} />
                    <Route path="/Expense" element={<Expense/>} />
                    <Route path="/Income" element={<Income/>} />
                    <Route path="/All" element={<IncomesAndExpenses/>} />
                    <Route path="/Update" element={<UpdateUser/>} />
                    <Route path="/Summary" element={<SummaryPage/>} />
                    <Route path="/Report" element={<ReportPage/>} />




                

                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
