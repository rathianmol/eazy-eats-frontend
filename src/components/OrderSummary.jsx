import React from 'react';
import { useNavigate } from 'react-router-dom';

function OrderSummary() {
  const navigate = useNavigate();
  const selectedMeals = JSON.parse(localStorage.getItem('selectedMeals')) || {};

  const handleFinalizeOrder = () => {
    const token = localStorage.getItem('token');
    const orderDetails = Object.keys(selectedMeals).map((mealId) => ({
      meal_id: mealId,
      quantity: selectedMeals[mealId].quantity,
    }));

    fetch('http://localhost:8000/api/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ meals: orderDetails }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Order placed successfully!');
        navigate('/');
        localStorage.removeItem('selectedMeals');
      })
      .catch((error) => {
        console.error('Error placing order:', error);
        alert('There was an error with your order.');
      });
  };

  const calculateTotalPrice = () => {
    return Object.keys(selectedMeals).reduce((total, mealId) => {
      const meal = selectedMeals[mealId];
      const price = parseFloat(meal.price);
      return total + price * meal.quantity;
    }, 0).toFixed(2);
  };

  const calculateTotalCalories = () => {
    return Object.keys(selectedMeals).reduce((total, mealId) => {
      const meal = selectedMeals[mealId];
      return total + meal.calories * meal.quantity;
    }, 0);
  };

  const calculateTotalFats = () => {
    return Object.keys(selectedMeals).reduce((total, mealId) => {
      const meal = selectedMeals[mealId];
      return total + meal.fats * meal.quantity;
    }, 0);
  };

  const calculateTotalCarbs = () => {
    return Object.keys(selectedMeals).reduce((total, mealId) => {
      const meal = selectedMeals[mealId];
      return total + meal.carbs * meal.quantity;
    }, 0);
  };

  const calculateTotalProteins = () => {
    return Object.keys(selectedMeals).reduce((total, mealId) => {
      const meal = selectedMeals[mealId];
      return total + meal.proteins * meal.quantity;
    }, 0);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Order Summary</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="border-b bg-gray-200">
            <th className="px-4 py-2">Meal</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Calories</th>
            <th className="px-4 py-2">Fats</th>
            <th className="px-4 py-2">Carbs</th>
            <th className="px-4 py-2">Proteins</th>
            <th className="px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(selectedMeals).map((mealId) => {
            const meal = selectedMeals[mealId];
            return (
              <tr key={mealId} className="border-b">
                <td className="px-4 py-2">{meal.title}</td>
                <td className="px-4 py-2">{meal.description}</td>
                <td className="px-4 py-2 text-center">{meal.quantity}</td>
                <td className="px-4 py-2 text-center">{meal.calories * meal.quantity} kcal</td>
                <td className="px-4 py-2 text-center">{meal.fats * meal.quantity}g</td>
                <td className="px-4 py-2 text-center">{meal.carbs * meal.quantity}g</td>
                <td className="px-4 py-2 text-center">{meal.proteins * meal.quantity}g</td>
                <td className="px-4 py-2 text-center">${meal.price * meal.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-between font-bold text-xl mt-4">
        <span>Total: ${calculateTotalPrice()}</span>
        <span>Calories: {calculateTotalCalories()} kcal</span>
        <span>Fats: {calculateTotalFats()}g</span>
        <span>Carbs: {calculateTotalCarbs()}g</span>
        <span>Proteins: {calculateTotalProteins()}g</span>
      </div>
      <button
        onClick={handleFinalizeOrder}
        className="mt-6 w-full py-3 bg-red-500 text-white font-bold text-lg rounded-lg hover:bg-red-600"
      >
        Finalize Order
      </button>
    </div>
  );
}

export default OrderSummary;
