import React, { useState, useEffect } from "react";
import CarList from "./components/CarList";
import CarRentalForm from "./components/CarRentalForm";
import CarTable from "./components/CarTable";
import "./App.css";

function App() {
  const [cars, setCars] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);

  const fetchCarList = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8083/cars/getCarList");
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarList();
  }, []);

  const handleRent = (rental) => {
    setRentals([...rentals, rental]);
  };

  const handleCarDeleted = () => {
    fetchCarList();
  };

  const handleCarSelect = (car) => {
    setSelectedCar(car);
  };

  const handlePriceChange = async (carId, newPrice) => {
    try {
      const response = await fetch(
        `http://localhost:8083/cars/updatePrice/${carId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPrice),
        }
      );

      if (response.ok) {
        fetchCarList();
      } else {
        console.error("Error updating price:", response.statusText);
      }
    } catch (error) {
      console.error("There was an error updating the price!", error);
    }
  };

  if (loading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Car Rental</h1>
      <CarRentalForm
        cars={cars}
        onRent={handleRent}
        onCarDeleted={handleCarDeleted}
      />
      <h2>Rented Cars</h2>
      <CarList rentals={rentals} />
      <h2>Available Cars</h2>
      <CarTable
        cars={cars}
        onSelect={handleCarSelect}
        onPriceChange={handlePriceChange}
      />
    </div>
  );
}

export default App;
