// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title KAD - CertiKad Governance & Utility Token
 * @notice ERC20 token with voting capabilities for CertiKad DAO governance
 * @dev Extends ERC20Votes for delegation and voting power tracking
 */
contract KAD is ERC20, ERC20Votes, ERC20Permit, Ownable2Step, Pausable {
    
    // ============ CONSTANTS ============
    
    /// @notice Maximum total supply (100M tokens)
    uint256 public constant MAX_SUPPLY = 100_000_000 ether;
    
    /// @notice Initial supply allocated at deployment (10M tokens)
    uint256 public constant INITIAL_SUPPLY = 10_000_000 ether;
    
    // ============ STATE VARIABLES ============
    
    /// @notice Treasury address for protocol funds
    address public treasury;
    
    /// @notice Mapping of addresses that can mint tokens (DAO contracts)
    mapping(address => bool) public minters;
    
    // ============ EVENTS ============
    
    event TreasuryUpdated(address indexed oldTreasury, address indexed newTreasury);
    event MinterAdded(address indexed minter);
    event MinterRemoved(address indexed minter);
    event TokensMinted(address indexed to, uint256 amount, address indexed minter);
    event TokensBurned(address indexed from, uint256 amount);
    
    // ============ ERRORS ============
    
    error ExceedsMaxSupply();
    error NotAuthorizedMinter();
    error InvalidAddress();
    error InvalidAmount();
    
    // ============ CONSTRUCTOR ============
    
    /**
     * @notice Deploy KAD token with CertiKad-specific addresses
     * @dev Treasury: 0x8863D56419952099543A9D2a54cAD12C2dAd9Cd6 (DAO)
     * @dev Initial Holder: 0xF3fF97272973Ca4db72e596636eD6E94a6748112
     */
    constructor() 
        ERC20("CertiKad Token", "KAD") 
        ERC20Permit("CertiKad Token")
        Ownable(msg.sender) // Pass initial owner to Ownable constructor
    {
        // Set treasury to DAO address
        treasury = 0x8863D56419952099543A9D2a54cAD12C2dAd9Cd6;
        
        // Mint initial supply to specified address
        _mint(0xF3fF97272973Ca4db72e596636eD6E94a6748112, INITIAL_SUPPLY);
        
        emit TreasuryUpdated(address(0), treasury);
    }
    
    // ============ MINTING FUNCTIONS ============
    
    /**
     * @notice Mint tokens - only callable by authorized minters (DAO contracts)
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint
     */
    function mint(address to, uint256 amount) external whenNotPaused {
        if (!minters[msg.sender]) revert NotAuthorizedMinter();
        if (to == address(0)) revert InvalidAddress();
        if (amount == 0) revert InvalidAmount();
        if (totalSupply() + amount > MAX_SUPPLY) revert ExceedsMaxSupply();
        
        _mint(to, amount);
        emit TokensMinted(to, amount, msg.sender);
    }
    
    /**
     * @notice Burn tokens from caller's balance
     * @param amount Amount of tokens to burn
     */
    function burn(uint256 amount) external {
        if (amount == 0) revert InvalidAmount();
        _burn(msg.sender, amount);
        emit TokensBurned(msg.sender, amount);
    }
    
    /**
     * @notice Burn tokens from specified address (requires allowance)
     * @param from Address to burn tokens from
     * @param amount Amount of tokens to burn
     */
    function burnFrom(address from, uint256 amount) external {
        _spendAllowance(from, msg.sender, amount);
        _burn(from, amount);
        emit TokensBurned(from, amount);
    }
    
    // ============ ADMIN FUNCTIONS ============
    
    /**
     * @notice Add authorized minter (DAO governance only)
     * @param minter Address to authorize for minting
     */
    function addMinter(address minter) external onlyOwner {
        if (minter == address(0)) revert InvalidAddress();
        minters[minter] = true;
        emit MinterAdded(minter);
    }
    
    /**
     * @notice Remove authorized minter (DAO governance only)
     * @param minter Address to remove minting authorization
     */
    function removeMinter(address minter) external onlyOwner {
        minters[minter] = false;
        emit MinterRemoved(minter);
    }
    
    /**
     * @notice Update treasury address (DAO governance only)
     * @param _newTreasury New treasury address
     */
    function updateTreasury(address _newTreasury) external onlyOwner {
        if (_newTreasury == address(0)) revert InvalidAddress();
        address oldTreasury = treasury;
        treasury = _newTreasury;
        emit TreasuryUpdated(oldTreasury, _newTreasury);
    }
    
    /**
     * @notice Pause token transfers (emergency only)
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @notice Unpause token transfers
     */
    function unpause() external onlyOwner {
        _unpause();
    }
    
    // ============ VIEW FUNCTIONS ============
    
    /**
     * @notice Get current voting power of an account
     * @param account Address to check voting power for
     * @return Current voting power (delegated balance)
     */
    function getVotingPower(address account) external view returns (uint256) {
        return getVotes(account);
    }
    
    /**
     * @notice Get historical voting power at specific block
     * @param account Address to check voting power for
     * @param blockNumber Block number to check at
     * @return Historical voting power
     */
    function getVotingPowerAt(address account, uint256 blockNumber) external view returns (uint256) {
        return getPastVotes(account, blockNumber);
    }
    
    /**
     * @notice Check if address is authorized minter
     * @param account Address to check
     * @return True if authorized minter
     */
    function isMinter(address account) external view returns (bool) {
        return minters[account];
    }
    
    // ============ REQUIRED OVERRIDES ============
    
    /**
     * @notice Override _update for pause functionality and voting power updates
     */
    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Votes)
        whenNotPaused
    {
        super._update(from, to, value);
    }
    
    /**
     * @notice Override nonces for ERC20Permit and ERC20Votes compatibility
     */
    function nonces(address owner)
        public
        view
        override(ERC20Permit, Nonces)
        returns (uint256)
    {
        return super.nonces(owner);
    }
}