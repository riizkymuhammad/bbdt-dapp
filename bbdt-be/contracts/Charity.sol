pragma solidity ^0.8.0;

contract Charity {
    struct Case {
        uint256 caseId;
        address needy;
        string description;
        uint256 targetAmount;
        uint256 currentAmount;
        bool isApproved;
        bool isCompleted;
    }

    mapping(uint256 => Case) public cases;
    uint256 public nextCaseId;

    function createCase(string memory _description, uint256 _targetAmount) public {
        cases[nextCaseId] = Case(nextCaseId, msg.sender, _description, _targetAmount, 0, false, false);
        nextCaseId++;
    }

    function donate(uint256 _caseId) public payable {
        require(cases[_caseId].isApproved, "Case is not approved");
        cases[_caseId].currentAmount += msg.value;

        if (cases[_caseId].currentAmount >= cases[_caseId].targetAmount) {
            cases[_caseId].isCompleted = true;
        }
    }
}