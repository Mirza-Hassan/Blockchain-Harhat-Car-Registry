import React, { useState } from 'react';
import { ethers } from 'ethers';
import CarRegistryContract from './CarRegistryContract'; // import your smart contract ABI here

const NewCarRegistryForm = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [owner, setOwner] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CarRegistryContract.address, CarRegistryContract.abi, signer);
    const tx = await contract.addCar(make, model, year, owner);
    await tx.wait();
    alert('Car added to registry!');
    setMake('');
    setModel('');
    setYear('');
    setOwner('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Make:
        <input type="text" value={make} onChange={(e) => setMake(e.target.value)} required />
      </label>
      <label>
        Model:
        <input type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
      </label>
      <label>
        Year:
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
      </label>
      <label>
        Owner:
        <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} required />
      </label>
      <button type="submit">Add Car</button>
    </form>
  );
};

export default NewCarRegistryForm;