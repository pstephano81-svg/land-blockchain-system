// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandRegistry {

    struct Land {
        uint id;
        string owner;
        string location;
        bool verified;
    }

    mapping(uint => Land) public lands;
    uint public landCount = 0;

    function registerLand(string memory _owner, string memory _location) public {
        landCount++;
        lands[landCount] = Land(landCount, _owner, _location, false);
    }

    function verifyLand(uint _id) public {
        lands[_id].verified = true;
    }
}
