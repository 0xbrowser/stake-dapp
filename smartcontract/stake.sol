// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract Stake {
    address public owner;
    mapping(address => uint256) public stake_allowance;
    mapping(address => uint256) public stake_amount;

    constructor() {
        owner = msg.sender;
    }

    // stake event
    event Staked(address indexed user, uint256 amount);
    
    // withdraw event
    event Withdrawn(address indexed user, uint256 amount);

    // stake function can be only called by verifyAndStake
    function stake() external payable {
        require(msg.value > 0, "stake amount needs to be greater than 0");
        require(msg.value <= stake_allowance[msg.sender], "stake amount needs to be not greater than allowance");
        stake_amount[msg.sender] += msg.value;
        emit Staked(msg.sender, msg.value);
    }

    // verify signature and execute
    function verifyAndExecute(string memory message, bytes memory signature) public {
        bytes32 messageHash = keccak256(abi.encodePacked(message));
        address signer = ECDSA.recover(messageHash, signature);
        require(signer == owner, "Invalid signature");

        // execute
        stake_allowance[msg.sender] += 0.1 ether;
    }

    // withdraw function
    function withdraw(uint256 amount) external {
        require(stake_amount[msg.sender] >= amount, "withdraw amount is greater than stake amount");
        stake_amount[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdrawn(msg.sender, amount);
    }

    // read user stake amount
    function getStakeAmount(address user) external view returns (uint256) {
        return stake_amount[user];
    }
}
