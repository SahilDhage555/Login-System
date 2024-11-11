import React, { useEffect, useState } from 'react';  // Import necessary React hooks
import axios from 'axios';  // Import axios for making HTTP requests
import { Link } from 'react-router-dom';  // Import Link for navigation
import { RiArrowGoBackFill } from "react-icons/ri";  // Import icon for the back button

function UserDash() {
  const [users, setUsers] = useState([]);  // State to store fetched user data
  console.log(users);  // For debugging purposes, logs the user data to the console

  useEffect(() => {
    // This hook runs once when the component mounts, and it fetches user data
    const fetchUserData = async () => {
      try {
        // Making an API call to fetch the user data from the backend
        const response = await axios.get('http://localhost:3032/users');
        setUsers(response.data);  // Storing the response data in the state
      } catch (error) {
        console.error('Error fetching user data:', error);  // Logging any errors encountered during the API call
      }
    };

    fetchUserData();  // Call the function to fetch user data when the component mounts
  }, []);  // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className='userDash'>
      <h1>User Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>E-mail</th>
            <th>Password</th>  {/* Display the normalPassword for each user */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            // Mapping through the users array and rendering each user's details
            <tr key={user._id}>
              <td>{user.name}</td>  {/* Display user name */}
              <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>  {/* Format and display date of birth */}
              <td>{user.email}</td>  {/* Display user email */}
              <td>{user.normalPassword}</td>  {/* Display user's normal password */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Link to navigate back to the login page */}
      <Link className='btn btn-dark' to={'/login'}><RiArrowGoBackFill /></Link>
    </div>
  );
}

export default UserDash;
