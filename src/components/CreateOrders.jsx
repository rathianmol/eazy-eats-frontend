import React, { useState, useEffect } from "react";

function CreateOrders() {
  const [meals, setMeals] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

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

  const handleCheckboxChange = (mealId) => {
    setSelectedMeals((prevState) => {
      const updatedMeals = { ...prevState };
      if (updatedMeals[mealId]) {
        updatedMeals[mealId] = updatedMeals[mealId] > 0 ? 0 : 1;
      } else {
        updatedMeals[mealId] = 1;
      }
      return updatedMeals;
    });
  };

  const handleCounterChange = (mealId, change) => {
    setSelectedMeals((prevState) => {
      const updatedMeals = { ...prevState };
      const currentCount = updatedMeals[mealId] || 0;
      const newCount = currentCount + change;

      if (newCount <= 0) {
        delete updatedMeals[mealId]; // Remove meal if counter hits 0
      } else {
        updatedMeals[mealId] = newCount;
      }
      return updatedMeals;
    });
  };

  const handlePlaceOrder = () => {
    const token = localStorage.getItem("token");

    const orderDetails = Object.keys(selectedMeals).map((mealId) => ({
      meal_id: mealId,
      quantity: selectedMeals[mealId],
    }));

    fetch("http://localhost:8000/api/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ meals: orderDetails }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Order placed successfully!");
        setSelectedMeals({});
      })
      .catch((error) => console.error("Error placing order:", error));
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
                  checked={selectedMeals[meal.id] > 0}
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
                {selectedMeals[meal.id] > 0 && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleCounterChange(meal.id, -1)}
                      className="px-2 py-1 border rounded-md"
                    >
                      -
                    </button>
                    <span className="text-gray-600">{selectedMeals[meal.id]}</span>
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
        Place Order
      </button>
    </div>
  );
}

export default CreateOrders;
