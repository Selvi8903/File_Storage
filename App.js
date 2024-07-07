import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import './App.css';
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        try {
          // Request accounts from MetaMask
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await  provider.getSigner();
          const address = accounts[0]; // Get the first address from the array of accounts
          console.log("Connected address:", address); // Log the connected address to the console
          setAccount(address);
          const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
          const contract = new ethers.Contract(
            contractAddress,
            Upload.abi,
            signer
          );
          setContract(contract);
          setProvider(signer);
        } catch (error) {
          console.error(error);
        }
      } else {
        alert("Metamask is not installed");
      }
    };

    loadBlockchainData();
  }, []);

  return (
    <>
      {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}

      <div className="App">
        <h1 style={{ color: "white" }}>Decentralised File Storage</h1>
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>

        <p style={{ color: "white" }}>
          Account : {account ? account : "Not connected"}
        </p>
        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>
        <Display contract={contract} account={account}></Display>
      </div>
    </>
  );
}

export default App;
