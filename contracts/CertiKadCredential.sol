// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CertiKadCredential
 * @notice Minimal ERC-721 credential NFT with enumeration support:
 *         - Only contract owner (issuer) can mint
 *         - Metadata lives on IPFS/Arweave and follows ERC-721 JSON schema
 *         - Supports enumeration for easy NFT discovery
 */
contract CertiKadCredential is ERC721URIStorage, ERC721Enumerable, Ownable {
    uint256 private _tokenIds;

    event CredentialIssued(
        uint256 indexed tokenId,
        address indexed to,
        string ipfsURI
    );

    constructor() ERC721("CertiKadCredential", "CKAD") Ownable(msg.sender) {}
    
    /**
     * @dev Mint a new credential to `recipient` with `metadataURI` (IPFS hash).
     * Note: Renamed parameter to avoid shadowing the tokenURI function
     */
    function issueCredential(address recipient, string memory metadataURI)
        external
        onlyOwner
        returns (uint256)
    {
        _tokenIds += 1;
        uint256 newId = _tokenIds;

        _safeMint(recipient, newId);
        _setTokenURI(newId, metadataURI);

        emit CredentialIssued(newId, recipient, metadataURI);
        return newId;
    }

    // Required overrides for multiple inheritance in OpenZeppelin v5.x

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}