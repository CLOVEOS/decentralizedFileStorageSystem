import { useState } from "react";
import { ethers } from "ethers";
import ContractABI from "./DecentralizedFileStorage.json";
import "./App.css";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
const pinataJWT = import.meta.env.VITE_PINATA_JWT;

function App() {
  const [fileUrl, setFileUrl] = useState("");
  const [status, setStatus] = useState("");

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setStatus("Uploading to Pinata...");

      // Upload to Pinata
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${pinataJWT}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload to Pinata failed");

      const data = await res.json();
      const cid = data.IpfsHash;
      const url = `https://gateway.pinata.cloud/ipfs/${cid}`;
      setFileUrl(url);

      // Save CID on blockchain
      if (!window.ethereum) throw new Error("MetaMask not found");

      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        ContractABI,
        signer
      );

      setStatus("Saving CID on blockchain...");

      const tx = await contract.uploadFile(cid);
      await tx.wait();

      setStatus("Uploaded and CID stored on blockchain successfully.");
    } catch (err) {
      console.error(err);
      setStatus("Upload failed: " + err.message);
    }
  };

  return (
    <div className="container">
      <h2>Blockchain DFS Demo (Sepolia + Pinata)</h2>

      <input type="file" onChange={uploadFile} />

      {status && (
        <p className="status">
          {status}
        </p>
      )}

      {fileUrl && (
        <p>
          File uploaded:{" "}
          <a href={fileUrl} target="_blank" rel="noreferrer">
            {fileUrl}
          </a>
        </p>
      )}
    </div>
  );
}

export default App;
