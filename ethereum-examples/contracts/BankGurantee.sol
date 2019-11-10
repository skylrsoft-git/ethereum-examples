pragma solidity ^0.5.0;

contract BankGurantee {
    
    uint amountReceived;
    address payable exporter;
    address importer;
    
    function setExporter() public payable{
        exporter = msg.sender;
    }
    
    function setImporter() public payable{
        importer = msg.sender;
    }
    
    function initiatePayment() public payable{
        amountReceived=amountReceived+msg.value;
    }

    function getBalance() public view returns(uint) {
        return address(this).balance;        
    }    

    function disbursePayment() public payable{
        exporter.transfer(address(this).balance);
        exporter=address(0);
        importer=address(0);
        amountReceived=0;
    }
    

}