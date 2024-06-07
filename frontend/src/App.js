import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoanContract from './contracts/LoanContract.json';
import Home from './Home';
import AllLoans from './AllLoans';
import './App.css';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3 = new Web3(window.ethereum);
          setWeb3(web3);
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = LoanContract.networks[networkId];
          if (deployedNetwork && deployedNetwork.address) {
            const contractInstance = new web3.eth.Contract(
              LoanContract.abi,
              deployedNetwork.address,
            );
            setContract(contractInstance);
          } else {
            setError('Contract not deployed on this network');
          }
        } catch (error) {
          console.error('User denied account access or other error', error);
          setError('User denied account access or other error. Please retry.');
        }
      } else if (window.web3) {
        const web3 = window.web3;
        setWeb3(web3);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = LoanContract.networks[networkId];
        if (deployedNetwork && deployedNetwork.address) {
          const contractInstance = new web3.eth.Contract(
            LoanContract.abi,
            deployedNetwork.address,
          );
          setContract(contractInstance);
        } else {
          setError('Contract not deployed on this network');
        }
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        setError('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    };

    initWeb3();
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Loan Contract</h1>
          {error && <div className="error">{error}</div>}
          <Link to="/loans">
            <button>Show All Loans</button>
          </Link>
        </header>
        <Routes>
          <Route path="/" element={<Home web3={web3} account={account} contract={contract} setError={setError} />} />
          <Route path="/loans" element={<AllLoans web3={web3} contract={contract} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
