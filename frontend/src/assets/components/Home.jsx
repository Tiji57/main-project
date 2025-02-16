import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Create a separate CSS file for styles

const Home = () => {
  const [statistics, setStatistics] = useState({
    totalStudents: 0,
    totalBusEmployees: 0, // Updated variable to store helpers/drivers count
    totalBuses: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/user/statistics');
        const data = await response.json();
        setStatistics({
          totalStudents: data.totalStudents,
          totalBusEmployees: data.totalBusEmployees, // Ensure API returns this key
          totalBuses: data.totalBuses,
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div className="home-page">
      <header className="header">
        <div className="header-title">
          EduTransmit
        </div>
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Userlogin">User</Link></li>
            <li><Link to="/Login">Admin</Link></li>
          </ul>
        </nav>
      </header>

      <section className="intro-section">
        <div className="image-section">
          <img
            src="https://t3.ftcdn.net/jpg/04/58/08/30/360_F_458083018_GWf89ndA62i30YOJBD7rjUd30uXylPO5.jpg"
            alt="School Bus"
            className="image"
          />
        </div>
        <div className="text-content">
          <h1>Welcome to School Bus Management System</h1>
          <p>
            Manage your school’s bus fleet and student transportation efficiently with our easy-to-use system.
            Track buses, routes, attendance, and more!
          </p>
          <Link to="/register">
            <button className="cta-btn">Get Started</button>
          </Link>
        </div>
      </section>

      <section className="statistics-section">
        <h1>SCHOOL BUS STATISTICS</h1>
        <div className="statistics-cards">
          {[
            { label: 'Total Students', count: statistics.totalStudents },
            { label: 'Bus Employees', count: statistics.totalBusEmployees }, // Updated label
            { label: 'Total Buses', count: statistics.totalBuses }
          ].map((stat, index) => (
            <div key={index} className="statistics-card">
              <h2>{stat.label}</h2>
              <p>{stat.count}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
