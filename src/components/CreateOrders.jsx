import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateOrders() {
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Load selected meals from localStorage if available
    const storedMeals = JSON.parse(localStorage.getItem("selectedMeals")) || {};
    setSelectedMeals(storedMeals);

    if (token) {
      fetch("http://localhost:8000/api/v1/meals", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setMeals(data))
        .catch((error) => console.error("Error fetching meals:", error));
    }
  }, []);

  // Update localStorage every time selectedMeals changes
  useEffect(() => {
    localStorage.setItem("selectedMeals", JSON.stringify(selectedMeals));
  }, [selectedMeals]);

  const handleCheckboxChange = (mealId) => {
    setSelectedMeals((prevState) => {
      const updatedMeals = { ...prevState };
      const meal = meals.find((meal) => meal.id === mealId);
  
      // If checked, set quantity to 1
      if (!updatedMeals[mealId]) {
        updatedMeals[mealId] = { ...meal, quantity: 1 };
      } else {
        delete updatedMeals[mealId]; // If unchecked, remove from the state
      }
  
      return updatedMeals;
    });
  };

  const handleCounterChange = (mealId, change) => {
    setSelectedMeals((prevState) => {
      const updatedMeals = { ...prevState };
      const currentMeal = updatedMeals[mealId] || {};
  
      // Calculate new count after applying the change
      const newCount = currentMeal.quantity + change;
  
      // Update the state: Ensure count doesn't go below 0
      if (newCount > 0) {
        updatedMeals[mealId] = { ...currentMeal, quantity: newCount };
      } else {
        delete updatedMeals[mealId]; // Remove meal if count is 0
      }
  
      return updatedMeals;
    });
  };

  const handlePlaceOrder = () => {
    navigate("/order-summary");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Choose Your Meals</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="border-b bg-gray-200">
            <th className="px-4 py-2">Select</th>
            <th className="px-4 py-2">Meal</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Calories</th>
            <th className="px-4 py-2">Fats (g)</th>
            <th className="px-4 py-2">Carbs (g)</th>
            <th className="px-4 py-2">Proteins (g)</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {meals.map((meal) => (
            <tr key={meal.id} className="border-b">
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  id={`meal-${meal.id}`}
                  checked={selectedMeals[meal.id] ? true : false}
                  onChange={() => handleCheckboxChange(meal.id)}
                  className="w-5 h-5"
                />
              </td>
              <td className="px-4 py-2">{meal.title}</td>
              <td className="px-4 py-2">{meal.description}</td>
              <td className="px-4 py-2 text-center">{meal.calories} kcal</td>
              <td className="px-4 py-2 text-center">{meal.fats}g</td>
              <td className="px-4 py-2 text-center">{meal.carbs}g</td>
              <td className="px-4 py-2 text-center">{meal.proteins}g</td>
              <td className="px-4 py-2 text-center">${meal.price}</td>
              <td className="px-4 py-2 text-center">
                {selectedMeals[meal.id] && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleCounterChange(meal.id, -1)}
                      className="px-2 py-1 border rounded-md"
                    >
                      -
                    </button>
                    <span className="text-gray-600">{selectedMeals[meal.id]?.quantity || 0}</span>
                    <button
                      onClick={() => handleCounterChange(meal.id, 1)}
                      className="px-2 py-1 border rounded-md"
                    >
                      +
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handlePlaceOrder}
        className="mt-6 w-full py-3 bg-red-500 text-white font-bold text-lg rounded-lg hover:bg-red-600"
      >
        Go to Order Summary
      </button>
    </div>
  );
}

export default CreateOrders;
