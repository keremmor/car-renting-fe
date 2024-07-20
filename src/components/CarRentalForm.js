import React, { useState } from "react";

function CarRentalForm({ cars, onRent, onCarDeleted }) {
  const [customerName, setCustomerName] = useState("");
  const [days, setDays] = useState("");
  const [selectedCar, setSelectedCar] = useState(
    cars.length > 0 ? cars[0].id : null
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const car = cars.find((car) => car.id === selectedCar);
    const totalCost = car.dailyRentPrice * days;
    const rentalData = {
      customerName,
      ...car,
    };

    try {
      const response = await fetch("http://localhost:8083/cars/saveRent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rentalData),
      });

      if (response.ok) {
        setMessage("Rental successfully created!");
        const result = await response.json();
        console.log(result);
        onRent({ customerName, car, days, totalCost });
        setCustomerName("");
        setDays("");

        const deleteResponse = await fetch(
          `http://localhost:8083/cars/delete/${car.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (deleteResponse.ok) {
          setMessage("Car successfully deleted!");
          onRent({ customerName, car, days, totalCost });
          onCarDeleted();
          setCustomerName("");
          setDays("");
        } else {
          setMessage("Error deleting car.");
          console.error("Error:", deleteResponse.statusText);
        }
      } else {
        setMessage("Error creating rental.");
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      setMessage("Error creating rental.");
      console.error("There was an error!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Customer Name:
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Days:
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Car:
          <select
            value={selectedCar}
            onChange={(e) => setSelectedCar(Number(e.target.value))}
          >
            {cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.brand} {car.model} ({car.modelYear}) - $
                {car.dailyRentPrice}/day
              </option>
            ))}
          </select>
        </label>
      </div>
      <button type="submit">Rent Car</button>
    </form>
  );
}

export default CarRentalForm;
