// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TokenLocker is Ownable, ReentrancyGuard {
    IERC20 public token;
    
    // SQL Level weights (multiplied by 100 for precision)
    mapping(string => uint256) public sqlWeights;
    
    struct Lock {
        uint256 amount;
        uint256 lockStartTime;
        uint256 lockEndTime;
        string sqlLevel;
        bool isActive;
    }
    
    mapping(address => Lock) public locks;
    
    // Events
    event TokensLocked(address indexed user, uint256 amount, uint256 lockEndTime, string sqlLevel);
    event TokensUnlocked(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 amount);
    
    constructor(address _token) {
        token = IERC20(_token);
        
        // Initialize SQL weights
        sqlWeights["Free"] = 0;
        sqlWeights["Basic"] = 30;
        sqlWeights["Normal"] = 60;
        sqlWeights["High"] = 90;
        sqlWeights["VIP"] = 100;
    }
    
    function lockTokens(uint256 _amount, string memory _sqlLevel) external nonReentrant {
        require(_amount > 0, "Amount must be greater than 0");
        require(sqlWeights[_sqlLevel] > 0, "Invalid SQL level");
        require(locks[msg.sender].isActive == false, "Already has active lock");
        
        // Transfer tokens from user to contract
        require(token.transferFrom(msg.sender, address(this), _amount), "Transfer failed");
        
        // Calculate lock end time (1 year from now)
        uint256 lockEndTime = block.timestamp + 365 days;
        
        // Create lock
        locks[msg.sender] = Lock({
            amount: _amount,
            lockStartTime: block.timestamp,
            lockEndTime: lockEndTime,
            sqlLevel: _sqlLevel,
            isActive: true
        });
        
        emit TokensLocked(msg.sender, _amount, lockEndTime, _sqlLevel);
    }
    
    function unlockTokens() external nonReentrant {
        Lock storage userLock = locks[msg.sender];
        require(userLock.isActive, "No active lock");
        require(block.timestamp >= userLock.lockEndTime, "Lock period not ended");
        
        uint256 amount = userLock.amount;
        userLock.isActive = false;
        
        // Transfer tokens back to user
        require(token.transfer(msg.sender, amount), "Transfer failed");
        
        emit TokensUnlocked(msg.sender, amount);
    }
    
    function calculateReward(address _user) public view returns (uint256) {
        Lock memory userLock = locks[_user];
        if (!userLock.isActive) return 0;
        
        // Base reward is 5% per year
        uint256 baseReward = userLock.amount * 5 / 100;
        
        // Apply SQL level weight
        uint256 sqlWeight = sqlWeights[userLock.sqlLevel];
        return baseReward * sqlWeight / 100;
    }
    
    function claimReward() external nonReentrant {
        Lock storage userLock = locks[msg.sender];
        require(userLock.isActive, "No active lock");
        
        uint256 reward = calculateReward(msg.sender);
        require(reward > 0, "No reward available");
        
        // Transfer reward to user
        require(token.transfer(msg.sender, reward), "Transfer failed");
        
        emit RewardClaimed(msg.sender, reward);
    }
    
    // Admin functions
    function updateSqlWeight(string memory _level, uint256 _weight) external onlyOwner {
        sqlWeights[_level] = _weight;
    }
    
    function emergencyUnlock(address _user) external onlyOwner {
        Lock storage userLock = locks[_user];
        require(userLock.isActive, "No active lock");
        
        uint256 amount = userLock.amount;
        userLock.isActive = false;
        
        require(token.transfer(_user, amount), "Transfer failed");
        emit TokensUnlocked(_user, amount);
    }
} 