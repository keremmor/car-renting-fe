import React, { useState } from "react";

function CarTable({ cars, onPriceChange }) {
  const [editingCarId, setEditingCarId] = useState(null);
  const [newPrice, setNewPrice] = useState("");

  const handleEditClick = (carId, currentPrice) => {
    setEditingCarId(carId);
    setNewPrice(currentPrice);
  };

  const handlePriceChange = (event) => {
    setNewPrice(event.target.value);
  };

  const handleSaveClick = (carId) => {
    onPriceChange(carId, newPrice);
    setEditingCarId(null);
  };

  return (
    <div>
      <h2>Available Cars</h2>
      <table border="1">
        <thead>
          <tr>
            <th>#</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Year</th>
            <th>Daily Rent Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car, index) => (
            <tr key={car.id}>
              <td>{index + 1}</td>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.modelYear}</td>
              <td>
                {editingCarId === car.id ? (
                  <input
                    type="number"
                    value={newPrice}
                    onChange={handlePriceChange}
                  />
                ) : (
                  `$${car.dailyRentPrice}`
                )}
              </td>
              <td>
                {editingCarId === car.id ? (
                  <button onClick={() => handleSaveClick(car.id)}>Save</button>
                ) : (
                  <button
                    onClick={() => handleEditClick(car.id, car.dailyRentPrice)}
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CarTable;
