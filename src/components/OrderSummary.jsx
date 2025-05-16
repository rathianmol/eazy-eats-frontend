import React from 'react';
import { useNavigate } from 'react-router-dom';

function OrderSummary() {
  const navigate = useNavigate();
  const selectedMeals = JSON.parse(localStorage.getItem('selectedMeals')) || {};

  // Create an array to hold the meal details in the correct format
  const orderDetails = Object.keys(selectedMeals).map((mealId) => ({
    meal_id: mealId,  // The meal ID
    quantity: selectedMeals[mealId].quantity,  // The quantity selected for that meal
  }));

  // Calculate total price
  const totalPrice = orderDetails.reduce((total, meal) => {
    const mealData = selectedMeals[meal.meal_id];  // Get meal data from selectedMeals
    return total + mealData.price * meal.quantity; // Calculate total price for each meal
  }, 0).toFixed(2);

  const handleFinalizeOrder = () => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:8000/api/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        meals: orderDetails, // Pass the meals array
        total_price: totalPrice, // Pass the total price
      }),
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
        <span>Total: ${totalPrice}</span>
        <span>Calories: {Object.keys(selectedMeals).reduce((total, mealId) => total + (selectedMeals[mealId].calories * selectedMeals[mealId].quantity), 0)} kcal</span>
        <span>Fats: {Object.keys(selectedMeals).reduce((total, mealId) => total + (selectedMeals[mealId].fats * selectedMeals[mealId].quantity), 0)}g</span>
        <span>Carbs: {Object.keys(selectedMeals).reduce((total, mealId) => total + (selectedMeals[mealId].carbs * selectedMeals[mealId].quantity), 0)}g</span>
        <span>Proteins: {Object.keys(selectedMeals).reduce((total, mealId) => total + (selectedMeals[mealId].proteins * selectedMeals[mealId].quantity), 0)}g</span>
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
