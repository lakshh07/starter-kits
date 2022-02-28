// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Payments {
    event Transferred(address sender, address receiver, uint256 amount);

    function sendOut(address payable _to) external payable {
        require(_to != address(0), "address should not be null");
        require(msg.value != 0, "value should be greater than null");
        _to.transfer(msg.value);

        emit Transferred(msg.sender, _to, msg.value);
    }
}
