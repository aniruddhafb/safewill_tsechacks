pragma solidity ^0.8.0;
// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/utils/Counters.sol";

contract WillFactory{
    using Counters for Counters.Counter;
    Counters.Counter private will_id;
    address public admin;

    mapping(uint256 => Will_Info) public get_will_by_id;

    struct Will_Info {
        uint256 id;
        string title;
        address will_creator;
        string description;
        address[] beneficiaries;
        uint256 time_created_at;
        bool is_inActive;
        Will will;          
    }

    mapping(address => mapping(uint256 => Will_Info)) public will_creator_beneficiaries;
     
    function create_will(
        uint256[] memory _amount,
        address[] memory _beneficiaries,
        string memory _title,
        string memory _description
    ) public payable {
        uint256 total_amount;
        for(uint256 i = 0; i < _amount.length; i++) {
            total_amount = total_amount + _amount[i];
        }
        require(msg.value == total_amount, "Please send a valid amount");
        uint256 _id = will_id.current();
        uint256 current_time = block.timestamp;
        Will newWill = new Will(msg.sender, _amount, _beneficiaries, current_time);
        Will_Info memory _will_info = Will_Info(
            _id,
            _title,
            msg.sender,
            _description,
            _beneficiaries,
            current_time,
            false,
            newWill
        );
        get_will_by_id[_id] = _will_info;
        will_id.increment();
        payable(address(newWill)).transfer(msg.value);
    }

    function get_wills() public view returns(Will_Info[] memory){
        uint256 id = will_id.current();
        uint256 currentIndex = 0;
        Will_Info[] memory wills = new Will_Info[](id);
        for(uint256 i = 0; i < id; i++){
            Will_Info memory current_will = get_will_by_id[i];
            wills[currentIndex] = current_will;
            currentIndex++;
        }
        return wills;
    }

    function get_beneficiary_by_id(uint256 _id) public view returns (address[] memory) {
        address[] storage beneficiaries = get_will_by_id[_id].beneficiaries;
        return beneficiaries;
    }

    function get_wills_by_beneficiary () public view returns(Will_Info[] memory) {
        uint256 id = will_id.current();
        uint256 currentIndex = 0;
        Will_Info[] memory user_wills = new Will_Info[](id);
        for(uint256 i = 0; i < id; i++) {
            if(get_will_by_id[i].will_creator == msg.sender){
                Will_Info memory current_Will_Info = get_will_by_id[i];
                user_wills[currentIndex] = current_Will_Info;
                currentIndex++;
            }
        }
        return user_wills;
    }

    receive() external payable {}

}

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

    function resetExpiry() public{
        require(msg.sender == will_owner, "only will creator can reset expiry");
        time_of_will_creation = block.timestamp;                
    }

    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }

    function cancelWill() public {
        require(msg.sender == will_owner, "You are nit the owner of this will");
        payable(will_owner).transfer(address(this).balance);        
    }

    receive() external payable {}

}