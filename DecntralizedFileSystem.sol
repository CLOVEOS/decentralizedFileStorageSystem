// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedFileStorage {
    struct File {
        string cid;
        address owner;
        uint timestamp;
    }

    File[] public files;

    event FileUploaded(string cid, address indexed owner, uint timestamp);

    function uploadFile(string memory cid) public {
        files.push(File(cid, msg.sender, block.timestamp));
        emit FileUploaded(cid, msg.sender, block.timestamp);
    }

    function getFiles() public view returns (File[] memory) {
        return files;
    }
}
