// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LoanContract {
    struct Loan {
        uint id;
        address borrower;
        string name;
        uint amount;
        uint interest;
        bool repaid;
    }

    uint public loanCounter;
    mapping(uint => Loan) public loans;

    event LoanRequested(uint id, address borrower, string name, uint amount, uint interest);
    event LoanRepaid(uint id);

    function requestLoan(string memory _name, uint _amount) public {
        loanCounter++;
        uint interest = (_amount * 10) / 100;
        loans[loanCounter] = Loan(loanCounter, msg.sender, _name, _amount, interest, false);
        emit LoanRequested(loanCounter, msg.sender, _name, _amount, interest);
    }

    function showAllLoans() public view returns (Loan[] memory) {
        Loan[] memory allLoans = new Loan[](loanCounter);
        for (uint i = 1; i <= loanCounter; i++) {
            allLoans[i - 1] = loans[i];
        }
        return allLoans;
    }

    function repayLoan(uint _id) public payable {
        Loan storage loan = loans[_id];
        require(msg.sender == loan.borrower, "Only the borrower can repay the loan");
        require(!loan.repaid, "Loan is already repaid");
        require(msg.value == loan.amount + loan.interest, "Incorrect repayment amount");

        loan.repaid = true;
        emit LoanRepaid(_id);
    }
}
