import React from "react";

function CarList({ rentals }) {
  return (
    <ul>
      {rentals.map((rental, index) => (
        <li key={index}>
          {rental.customerName} rented a {rental.car.brand} {rental.car.model} (
          {rental.car.year}) for {rental.days} days. Total cost: $
          {rental.totalCost}
        </li>
      ))}
    </ul>
  );
}

export default CarList;
