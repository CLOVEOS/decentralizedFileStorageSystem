

# 🌐 Blockchain DFS (Decentralized File Storage)

A decentralized file storage system built on **Ethereum (Sepolia Testnet)** using **Solidity**, **React + Vite**, **ethers.js**, and **IPFS/Pinata**.

This project demonstrates how files can be uploaded to IPFS (via Pinata), and their CIDs (Content Identifiers) stored permanently on the blockchain for immutability and transparency.

---

## 🚀 Features

* Upload files to **IPFS via Pinata**
* Store **CID** on the Ethereum blockchain
* Retrieve uploaded files with **owner address + timestamp**
* Fully functional **React frontend** integrated with MetaMask
* Uses **Sepolia testnet** (gas fees paid with Sepolia ETH)
* End-to-end working decentralized storage demo

---



### Smart Contract on Remix

![Remix IDE](./screenshots/remix.png)

### React Frontend (DFS Demo)

![Frontend Demo](./screenshots/frontend.png)

---

## ⚙️ Tech Stack

* **Solidity** – Smart contract
* **Remix IDE** – Contract compilation & deployment
* **Ethereum Sepolia Testnet** – Blockchain network
* **MetaMask** – Wallet for interacting with dApp
* **IPFS + Pinata** – File storage & pinning
* **React (Vite)** – Frontend framework
* **ethers.js** – Blockchain interaction in React

---

## 🛠️ Setup Guide

### 1️⃣ Prerequisites

* Node.js & npm installed
* MetaMask wallet
* Sepolia Testnet ETH (from faucet)

### 2️⃣ Get Sepolia ETH

1. Go to a **Sepolia Faucet**:

   * [Alchemy Faucet](https://sepoliafaucet.com)
   * [Sepolia PoW Faucet](https://sepolia-faucet.pk910.de)
2. Enter your MetaMask wallet address.
3. Wait for ETH to arrive in your account. (Minimum `0.001 ETH` needed to deploy).

---

### 3️⃣ Deploy Smart Contract

1. Open [Remix IDE](https://remix.ethereum.org).
2. Create a new file `DecentralizedFileStorage.sol` and paste:

```solidity
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
```

3. Compile the contract (`Solidity ^0.8.0`).
4. Deploy on **Sepolia Testnet** via MetaMask.
5. Copy the **contract address**.

---

### 4️⃣ Setup Frontend

1. Clone or create React app with Vite:

```bash
npm create vite@latest blockchain-dfs
cd blockchain-dfs
npm install
```

2. Install dependencies:

```bash
npm install ethers axios
```

3. Create a `.env` file in project root:

```env
VITE_PINATA_JWT=your_pinata_jwt_token
VITE_CONTRACT_ADDRESS=your_deployed_contract_address
```

4. In `src/App.jsx`:



5. Start frontend:

```bash
npm run dev
```

---

## 📌 How It Works

1. User selects a file.
2. File is uploaded to **IPFS via Pinata**.
3. The returned **CID** is stored on the Ethereum blockchain.
4. Anyone can fetch all uploaded files (`getFiles()`), proving immutability.

---

## 🔑 Credentials Used

* **MetaMask** – Wallet & network provider
* **Sepolia ETH** – Gas fees
* **Pinata JWT Token** – For IPFS uploads

---

## 🎯 Demo Flow for Jury

1. Open frontend → Upload a file
2. Show the IPFS link (immutable, decentralized)
3. Show CID recorded on **Sepolia blockchain** (via Etherscan)
4. Use `getFiles()` to display all uploads (owner + timestamp)
5. Explain how this is **tamper-proof & decentralized**

---

## 📚 Future Improvements

* Add user authentication
* Support multiple storage backends (Filecoin, Arweave)
* UI enhancements with Tailwind/Material UI
* Encrypt files before upload for extra security

---

✨ **This project demonstrates the power of combining Blockchain + IPFS for secure, decentralized file storage.**

---

Would you like me to also **add a `screenshots/` folder structure** in the README with placeholders (like `screenshots/remix.png`) so you just paste your actual screenshots there for the jury?
