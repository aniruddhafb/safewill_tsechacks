contract Will{

    address public will_owner;
    
    mapping(address => uint256) public amount_to_give_beneficiary;

    uint256 public time_of_will_creation;

    constructor(address _will_owner,
     uint256[] memory _amounts,
     address[] memory _beneficiaries,
     uint256 _time_of_will_creation){
        will_owner = _will_owner;
        time_of_will_creation = _time_of_will_creation;

        for(uint256 i = 0; i < _amounts.length; i++){
            amount_to_give_beneficiary[_beneficiaries[i]] = _amounts[i];
        }
    }

    function claimTokens() public {
        require(block.timestamp > time_of_will_creation + 300, "You cannot claim tokens now");
        require(amount_to_give_beneficiary[msg.sender] > 0, "You have no tokens left to claim");
        uint256 amount_to_transfer_beneficiary = amount_to_give_beneficiary[msg.sender];
        payable(msg.sender).transfer(amount_to_transfer_beneficiary);        
    }

    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }

    function cancelWill() public {
        
    }

    receive() external payable {}

}