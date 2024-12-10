
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: '', desiredArrivalTime: '' });

  useEffect(() => {
    // Load customer data from localStorage
    const storedCustomers = JSON.parse(localStorage.getItem('customers')) || [];
    setCustomers(storedCustomers);
  }, []);

  const handleAddCustomer = () => {
    // Add a new customer to the queue
    const newCustomerId = Math.random().toString(36).substring(2, 8);
    const newCustomerData = { id: newCustomerId, ...newCustomer, userId: getLoggedInUserId() };
    const updatedCustomers = [...customers, newCustomerData];
    setCustomers(updatedCustomers);
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    setNewCustomer({ name: '', desiredArrivalTime: '' });
  };

  const handleEditCustomer = (customer) => {
    // Edit an existing customer's record
    const updatedCustomers = customers.map((c) =>
      c.id === customer.id ? { ...c, ...customer } : c
    );
    setCustomers(updatedCustomers);
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
  };

  const handleDeleteCustomer = (customerId) => {
    // Delete a customer's record
    const updatedCustomers = customers.filter((c) => c.id !== customerId);
    setCustomers(updatedCustomers);
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
  };

  const getLoggedInUserId = () => {
    // Simulate getting the logged-in user's ID
    const user = JSON.parse(localStorage.getItem('user'));
    return user.username;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customer Queue</h1>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Customer Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Enter customer name"
          value={newCustomer.name}
          onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="desiredArrivalTime">
          Desired Arrival Time
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="desiredArrivalTime"
          type="text"
          placeholder="Enter desired arrival time"
          value={newCustomer.desiredArrivalTime}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, desiredArrivalTime: e.target.value })
          }
        />
      </div>
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleAddCustomer}
        >
          Add Customer
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Customer Name</th>
            <th className="px-4 py-2 text-left">Desired Arrival Time</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className={
                customer.userId === getLoggedInUserId()
                  ? 'bg-gray-100 hover:bg-gray-200'
                  : 'hover:bg-gray-100'
              }
            >
              <td className="px-4 py-2">{customer.name}</td>
              <td className="px-4 py-2">{customer.desiredArrivalTime}</td>
              <td className="px-4 py-2">
                {customer.userId === getLoggedInUserId() && (
                  <>
                    <button
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                      type="button"
                      onClick={() => handleEditCustomer(customer)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={() => handleDeleteCustomer(customer.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
