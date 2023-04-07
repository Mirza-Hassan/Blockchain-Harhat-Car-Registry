import React, { useState } from 'react';
import { ethers } from 'ethers';
import CarRegistryContract from './CarRegistryContract'; // import your smart contract ABI here

const TransferOwnershipForm = () => {
  const [carId, setCarId] = useState('');
  const [newOwner, setNewOwner] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CarRegistryContract.address, CarRegistryContract.abi, signer);
    const tx = await contract.transferOwnership(carId, newOwner);
    await tx.wait();
    alert('Ownership transferred successfully!');
    setCarId('');
    setNewOwner('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Car ID:
        <input type="text" value={carId} onChange={(e) => setCarId(e.target.value)} required />
      </label>
      <label>
        New Owner:
        <input type="text" value={newOwner} onChange={(e) => setNewOwner(e.target.value)} required />
      </label>
      <button type="submit">Transfer Ownership</button>
    </form>
  );
};

export default TransferOwnershipForm;