pragma solidity ^0.5.0;
contract Lottery{
    address payable [] public owners;
    uint amountReceived;
    
    function buyTicket() public payable{
        owners.push(msg.sender);
        amountReceived=amountReceived+msg.value;
    }
    function getBalance() public view returns(uint) {
        return address(this).balance;
    }    
    function getEntries() public view returns(uint) {
        return owners.length;
    }
    
    function finalizeResult() public payable {
        uint partValue = getPercentValue(address(this).balance,75,100);
        owners[ now % owners.length ].transfer(partValue);
        amountReceived=0;
        delete owners;
    }
    
    function getPercentValue(uint _balance, uint _numerator, uint _denominator) private pure returns ( uint) {
     uint mul1 = safeMul(_balance,_numerator);
     return safeDiv(mul1,_denominator);
    }

    function safeMul(uint a, uint b) private pure returns (uint) {
        uint c = a * b;
        assert(a == 0 || c / a == b);
        return c;
    }

    function safeDiv(uint a, uint b) private pure returns (uint) {
        assert(b > 0);
        uint c = a / b;
        assert(a == b * c + a % b);
        return c;
    }
}
