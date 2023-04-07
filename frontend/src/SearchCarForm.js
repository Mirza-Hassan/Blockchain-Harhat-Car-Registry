import React, { useState } from 'react';
import { ethers } from 'ethers';
import CarRegistryContract from './CarRegistryContract'; // import your smart contract ABI here

const SearchCarForm = () => {
  const [carId, setCarId] = useState('');
  const [car, setCar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(CarRegistryContract.address, CarRegistryContract.abi, provider);
    const carData = await contract.getCar(carId);
    setCar(carData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Car ID:
        <input type="text" value={carId} onChange={(e) => setCarId(e.target.value)} required />
      </label>
      <button type="submit">Search Car</button>
      {car && (
        <div>
          <p>Make: {car.make}</p>
          <p>Model: {car.model}</p>
          <p>Year: {car.year}</p>
          <p>Owner: {car.owner}</p>
        </div>
      )}
    </form>
  );
};

export default SearchCarForm;