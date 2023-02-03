pragma solidity ^0.8.0;
// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/utils/Counters.sol";
import './Will.sol';
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