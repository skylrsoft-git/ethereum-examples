pragma solidity ^0.5.0;

contract Distribute {

function() payable external {
}

function distributeFunds() public  payable {

	address payable owner1= 0xa52D469D495D8385cC6AB3E67F4A114a3BFb0673 ;
	address payable owner2= 0x6Ce7E34E46A14d34ed2DD7661F426a59e7Dca107 ;

	uint partValue= safeDiv(address(this).balance,2);
    owner1.transfer(partValue);
	owner2.transfer(address(this).balance);

}

function getFundsBalanceOfContract() public view returns (uint _bal)  {

	_bal=address(this).balance;
	return _bal;
}

function safeDiv(uint a, uint b) private pure returns (uint) {
    assert(b > 0);
    uint c = a / b;
    assert(a == b * c + a % b);
    return c;
}

constructor() public {
}


}

