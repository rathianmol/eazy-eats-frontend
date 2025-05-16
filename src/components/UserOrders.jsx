import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const fetchOrders = (page) => {
    setLoading(true);
    const token = localStorage.getItem('token');

    fetch(`http://localhost:8000/api/v1/orders?page=${page}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrders(data.orders);
        setPagination(data.pagination);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
        setLoading(false);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Your Orders</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <>
          {orders.length === 0 ? (
            <p className="text-center text-gray-500">You have no orders yet.</p>
          ) : (
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="border-b bg-gray-200">
                  <th className="px-4 py-2">Order ID</th>
                  <th className="px-4 py-2">Meal</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Date Placed</th> {/* New column for order date */}
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.order_id} className="border-b">
                    <td className="px-4 py-2">{order.order_id}</td>
                    <td className="px-4 py-2">
                      {order.meals.map((meal, index) => (
                        <div key={index}>
                          <strong>{meal.title}</strong>
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-2">
                      {order.meals.map((meal, index) => (
                        <div key={index}>
                          {meal.quantity}
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-2">
                      {order.meals.map((meal, index) => (
                        <div key={index}>
                          ${meal.price.toFixed(2)}
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-2">${order.total_price.toFixed(2)}</td>
                    <td className="px-4 py-2">{order.status}</td>
                    <td className="px-4 py-2">{order.order_date}</td> {/* Displaying order date */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="flex justify-center mt-4">
            {/* Pagination Controls */}
            <button
              onClick={() => handlePageChange(pagination.current_page - 1)}
              disabled={pagination.current_page === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="mx-4">
              Page {pagination.current_page} of {pagination.last_page}
            </span>
            <button
              onClick={() => handlePageChange(pagination.current_page + 1)}
              disabled={pagination.current_page === pagination.last_page}
              className="px-4 py-2 bg-gray-300 text-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default UserOrders;
