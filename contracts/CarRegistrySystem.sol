/**
 *Submitted for verification at Etherscan.io on 2023-03-20
*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;
import "hardhat/console.sol";

pragma solidity ^0.8.0;

contract CarRegistry {
    struct Car {
        address owner;
        string make;
        string model;
        uint256 year;
    }

    mapping(string => Car) private carRegistry;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() {
        emit DeployedCarRegistry(msg.sender);
    }

    modifier onlyCarOwner(string memory _carNumber){
        require(getCarOwner(_carNumber) == msg.sender, "You are not the owner of this car.");
        _;
    }

    modifier checkIfCarNumberEmpty(string memory _carNumber){
        require(bytes(_carNumber).length != 0, "Car number cannot be empty.");
        _;
    }

    modifier checkIfAlreadyCarExists(string memory _carNumber){
        require(bytes(carRegistry[_carNumber].make).length == 0, "Car already exists with this car number.");
        _;
    }

    modifier checkIfCarExists(string memory _carNumber){
        require(bytes(carRegistry[_carNumber].make).length != 0, "Car does not exist with this car number.");
        _;
    }

    function addCarDetail(string memory _carNumber, address _owner, string memory _carMake, string memory _carModel, uint256 _carYear) public checkIfAlreadyCarExists(_carNumber){
        Car memory car = Car(_owner, _carMake, _carModel, _carYear);
        carRegistry[_carNumber] = car;
    }

    function getCarDetail(string memory _carNumber) public view checkIfCarNumberEmpty(_carNumber) checkIfCarExists(_carNumber) returns (address owner, string memory make, string memory model, uint256 year){
        Car memory car = carRegistry[_carNumber];
        owner = car.owner;
        make = car.make;
        model = car.model;
        year = car.year;
    }

    function getCarOwner(string memory _carNumber) public view checkIfCarNumberEmpty(_carNumber) checkIfCarExists(_carNumber) returns (address owner){
        owner = carRegistry[_carNumber].owner; 
    }

    function transferCarOwnership(string memory _carNumber, address _newOwner) public checkIfCarExists(_carNumber) onlyCarOwner(_carNumber){
        Car memory car = carRegistry[_carNumber];
        address _oldOwner = car.owner;
        car.owner = _newOwner;
        carRegistry[_carNumber] = car;
        emit OwnershipTransferred(_oldOwner, _newOwner);
    }
    
    event DeployedCarRegistry(address indexed deployer);
}
