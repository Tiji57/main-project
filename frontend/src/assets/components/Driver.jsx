import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Driver = () => {
  const [students, setStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);  // Storing all students data
  const [filteredStudents, setFilteredStudents] = useState([]);  // Filtered students by busNo
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const busNoFromLocalStorage = localStorage.getItem("busNo");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Fetch all students data
    axios
      .get("http://localhost:4000/api/students/all")
      .then((response) => {
        console.log("All students:", response.data);

        // Filter students based on busNo from localStorage
        const studentsForBus = response.data.filter(
          (student) => student.busNo === busNoFromLocalStorage
        );

        setAllStudents(response.data);
        setFilteredStudents(studentsForBus);

        console.log("Filtered students:", studentsForBus);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, [busNoFromLocalStorage]);

  const fetchDriverData = async () => {
    try {
      setLoading(true);

      if (!busNoFromLocalStorage) {
        setError("Bus number not found in localStorage");
        setLoading(false);
        return;
      }

      // If there's no error, set the students data
      setStudents(filteredStudents); // Set the filtered students
      setError("");
    } catch (err) {
      console.error("Error fetching driver data:", err);
      setError(err.response?.data?.message || "Error fetching driver data");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (busNoFromLocalStorage) fetchDriverData();
  }, [busNoFromLocalStorage, filteredStudents]);

  const handleMarkAttendance = async (studentId, status) => {
    try {
      const response = await axios.post("http://localhost:4000/api/students/mark", {
        studentId,
        status,
        userId,
      });

      console.log(response.data); // Log the success message
      fetchDriverData(); // Reload students data after marking attendance
    } catch (err) {
      console.error("Error marking attendance:", err);
      setError(err.response?.data?.message || "Error marking attendance");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <header
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          textAlign: "center",
        }}
      >
        <h1>Driver/Helper Dashboard</h1>
        <nav>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <li style={{ margin: "0 15px" }}>
              <Link
                to="/"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "16px",
                }}
              >
                Home
              </Link>
            </li>
            <li style={{ margin: "0 15px" }}>
              <Link
                to="/attendence"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "16px",
                }}
              >
                Attendance
              </Link>
            </li>
           
          </ul>
        </nav>
      </header>

      {loading && <p style={{ textAlign: "center", color: "blue" }}>Loading...</p>}

      {error && (
        <p style={{ color: "red", textAlign: "center" }} className="error">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          {filteredStudents.length > 0 ? (
            <div style={{ marginTop: "20px" }}>
              <h3 style={{ textAlign: "center", color: "#3b3b3b" }}>
                Students on Bus {busNoFromLocalStorage}
              </h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: "20px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: "12px",
                        borderBottom: "2px solid #ddd",
                        textAlign: "left",
                        backgroundColor: "#f4f4f4",
                      }}
                    >
                      Name
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        borderBottom: "2px solid #ddd",
                        textAlign: "left",
                        backgroundColor: "#f4f4f4",
                      }}
                    >
                      Class/Division
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        borderBottom: "2px solid #ddd",
                        textAlign: "left",
                        backgroundColor: "#f4f4f4",
                      }}
                    >
                      Dropping Point
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        borderBottom: "2px solid #ddd",
                        textAlign: "center",
                        backgroundColor: "#f4f4f4",
                      }}
                    >
                      Mark Attendance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student._id}>
                      <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                        {student.name}
                      </td>
                      <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                        {student.class}/{student.division}
                      </td>
                      <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                        {student.droppingPoint}
                      </td>
                      <td
                        style={{
                          padding: "12px",
                          borderBottom: "1px solid #ddd",
                          textAlign: "center",
                        }}
                      >
                        <button
                          onClick={() => handleMarkAttendance(student._id, "present")}
                          style={{
                            padding: "8px 16px",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => handleMarkAttendance(student._id, "absent")}
                          style={{
                            padding: "8px 16px",
                            backgroundColor: "#f44336",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginLeft: "10px",
                          }}
                        >
                          Absent
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ textAlign: "center", fontSize: "16px", color: "#888" }}>
              No students found for Bus {busNoFromLocalStorage}.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Driver;
