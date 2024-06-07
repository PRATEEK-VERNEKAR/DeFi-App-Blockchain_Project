import React, { useState } from 'react';

const Home = ({ web3, account, contract, setError }) => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [loanId, setLoanId] = useState('');
  const [repayAmount, setRepayAmount] = useState('');

  const requestLoan = async () => {
    try {
      await contract.methods.requestLoan(name, web3.utils.toWei(amount, 'ether')).send({ from: account });
      alert('Loan requested!');
      setError('');
    } catch (error) {
      console.error('Error requesting loan:', error);
      setError('Error requesting loan: ' + error.message);
    }
  };

  const repayLoan = async () => {
    try {
      await contract.methods.repayLoan(loanId).send({
        from: account,
        value: web3.utils.toWei(repayAmount, 'ether'),
      });
      alert('Loan repaid!');
      setError('');
    } catch (error) {
      console.error('Error repaying loan:', error);
      setError('Error repaying loan: ' + error.message);
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h2>Request Loan</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Loan Amount (ETH)"
        />
        <button onClick={requestLoan}>Request Loan</button>
      </div>
      <div className="form">
        <h2>Repay Loan</h2>
        <input
          type="number"
          value={loanId}
          onChange={(e) => setLoanId(e.target.value)}
          placeholder="Loan ID"
        />
        <input
          type="number"
          value={repayAmount}
          onChange={(e) => setRepayAmount(e.target.value)}
          placeholder="Repay Amount (ETH)"
        />
        <button onClick={repayLoan}>Repay Loan</button>
      </div>
    </div>
  );
};

export default Home;
