import { useState, useEffect, useRef } from 'react';
import { getAllUsers, deleteUser } from '../BackendAPI/UserAPI';
import UpdateUserForm from '../../pages/Form/updateform/UpdateUserForm';
const User = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const userRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
        console.log(usersData);
      } catch (error) {
        console.error('Error fetching users data:', error);
      }
    };

    fetchData();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    userRef.current.scrollIntoView({ behavior: 'smooth' });
    setShowUpdateForm(false);
  };

  const handleClosePopUp = () => {
    setSelectedUser(null);
  };

  const handleUpdateUser = () => {
    setShowUpdateForm(true);
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(selectedUser._id);
      setUsers(users.filter(user => user._id !== selectedUser._id));
      setSelectedUser(null);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDataRefetch = async () => {
    try {
      const updatedUserData = await getAllUsers();
      setUsers(updatedUserData);
      if (selectedUser) {
        const updatedSelectedUser = updatedUserData.find(user => user._id === selectedUser._id);
        setSelectedUser(updatedSelectedUser);
      }
    } catch (error) {
      console.error('Error refetching data:', error);
    }
  };

  const filteredUsers = users.filter(user => 
    user?.firstName?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  return (
    <div className="mt-4 relative">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by first name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded w-full"
        />
      </div>
      <div ref={userRef} />
      {selectedUser && (
        <div className="bg-white mb-10 dark:bg-gray-800 shadow-md rounded-lg p-6 col-span-full">
          <h2 className="text-lg font-semibold mb-2 text-blue-400">User Details</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">ID:</span> {selectedUser._id}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Name:</span> {selectedUser.firstName} {selectedUser.lastName}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Email:</span> {selectedUser.email}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Username:</span> {selectedUser.username}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-2">Role Information</h2>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Role ID:</span> {selectedUser.userRole._id}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Role Name:</span> {selectedUser.userRole.roleName}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4 mr-5" onClick={handleClosePopUp}>
              Close
            </button>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 mt-4 mr-5" onClick={handleUpdateUser}>
              Update
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-4 mr-5" onClick={handleDeleteUser}>
              Delete
            </button>
          </div>
          {showUpdateForm && <UpdateUserForm User={selectedUser}  onRefetch={handleDataRefetch}  onClose={() => setShowUpdateForm(false)} />}

        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filteredUsers.map((user, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">User Details</h2>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Name:</span> {user.firstName} {user.lastName}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Username:</span> {user.username}
            </p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4" onClick={() => handleUserClick(user)}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
