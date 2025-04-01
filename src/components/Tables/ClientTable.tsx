import React, { useState, useEffect, useRef } from 'react';
import { getAllClients,deleteClient } from '../BackendAPI/ClientAPi';
import ReactCountryFlag from "react-country-flag";
import countryCodes from '../Charts/contrycode';
import UpdateClientForm from '../../pages/Form/updateform/updateclientForm';
const Client = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const clientRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsData = await getAllClients();
        setClients(clientsData);
        console.log(clientsData);
        
      } catch (error) {
        console.error('Error fetching clients data:', error);
      }
    };

    fetchData();
  }, []);

  const handleClientClick = (client) => {
    setSelectedClient(client);
    
    setShowUpdateForm(false); 
    clientRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClosePopUp = () => {
    setSelectedClient(null);
  };

  const handleDeleteClient = async () => {
    try {
      await deleteClient(selectedClient.id);
      setClients(clients.filter(client => client.id !== selectedClient.id));
      setSelectedClient(null);
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const handleUpdateClient = () => {
    setShowUpdateForm(true);
  };

  const handleDataRefetch = async () => {
    try {
      const updatedClientsData = await getAllClients();
      setClients(updatedClientsData);
      if (selectedClient) {
        const updatedSelectedClient = clients.find(client => client.id === selectedClient.id);
        setSelectedClient(updatedSelectedClient);
      }
    } catch (error) {
      console.error('Error refetching data:', error);
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-4 relative">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by client name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded w-full"
        />
      </div>
      <div ref={clientRef} />
      {selectedClient && (
        <div className="bg-white mb-10 dark:bg-gray-800 shadow-md rounded-lg p-6 col-span-full">
          <h2 className="text-lg font-semibold mb-2 text-blue-400">Client Details</h2>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Client Name:</span> {selectedClient.name}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Email:</span> {selectedClient.email}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Country:</span> {selectedClient.country} <ReactCountryFlag countryCode={countryCodes[selectedClient.country]} svg />
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">State:</span> {selectedClient.state}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Phone:</span> {selectedClient.phone}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Address:</span> {selectedClient.address}
          </p>
          
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4 mr-5" onClick={handleClosePopUp}>
            Close
          </button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 mt-4 mr-5" onClick={handleUpdateClient}>
            Update
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-4 mr-5" onClick={handleDeleteClient}>
            Delete
          </button>
          {showUpdateForm && <UpdateClientForm Client={selectedClient}  onRefetch={handleDataRefetch}  onClose={() => setShowUpdateForm(false)} />}
        </div>
        
      )}
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filteredClients.map((client, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">Client Details</h2>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Client Name:</span> {client.name}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Email:</span> {client.email}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Country:</span> {client.country} <ReactCountryFlag countryCode={countryCodes[client.country]} svg />
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">State:</span> {client.state}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Phone:</span> {client.phone}
            </p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4" onClick={() => handleClientClick(client)}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Client;
