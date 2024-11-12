import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { RiArrowGoBackFill, RiEdit2Line, RiDeleteBinLine } from "react-icons/ri";  // Import icons

function UserDash() {
  const [users, setUsers] = useState([]);  // State to store fetched user data
  const navigate = useNavigate(); // useNavigate for redirection after edit or delete

  useEffect(() => {
    // Fetch user data from backend API on component mount
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.FORM_API_URL}/users`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  // Function to handle user deletion
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3032/users/${userId}`); // Make DELETE request to backend
      setUsers(users.filter(user => user._id !== userId)); // Update state to remove deleted user
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Function to navigate to the edit page for a user
  const handleEdit = (userId) => {
    navigate(`/edit-user/${userId}`);  // Redirect to edit page
  };

  return (
    <div className='userDash'>
      <h1>User Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>  {/* New column for actions (edit and delete) */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>
              <td>{user.email}</td>
              <td>{user.normalPassword}</td>
              <td className='actions d-flex'>
                <button className='btn btn-info' onClick={() => handleEdit(user._id)}>
                  <RiEdit2Line />
                </button>
                <button className='btn btn-danger' onClick={() => handleDelete(user._id)}>
                  <RiDeleteBinLine />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link className='btn btn-dark' to={'/login'}><RiArrowGoBackFill /> Back</Link>
    </div>
  );
}

export default UserDash;
