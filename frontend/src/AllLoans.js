import React, { useEffect, useState } from 'react';

const AllLoans = ({ web3, contract }) => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const allLoans = await contract.methods.showAllLoans().call();
        const formattedLoans = allLoans.map(loan => ({
          id: loan.id.toString(),
          borrower: loan.borrower,
          name: loan.name,
          amount: web3.utils.fromWei(loan.amount.toString(), 'ether'),
          interest: web3.utils.fromWei(loan.interest.toString(), 'ether'),
          repaid: loan.repaid
        }));
        setLoans(formattedLoans);
      } catch (error) {
        console.error('Error showing loans:', error);
      }
    };

    if (contract) {
      fetchLoans();
    }
  }, [contract, web3]);

  return (
    <div className="container">
      <div className="loans">
        {loans.map((loan, index) => (
          <div key={index} className="loan-card">
            <p><strong>ID:</strong> {loan.id}</p>
            <p><strong>Borrower:</strong> {loan.borrower}</p>
            <p><strong>Name:</strong> {loan.name}</p>
            <p><strong>Amount:</strong> {loan.amount} ETH</p>
            <p><strong>Interest:</strong> {loan.interest} ETH</p>
            <p><strong>Repaid:</strong> {loan.repaid ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllLoans;
