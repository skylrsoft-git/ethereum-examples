pragma solidity ^0.5.0;

contract Person {

string public name;

function setNameVar(string memory _name) public payable returns (string memory _fname) {

  name = _name;
  _fname = name;
  return _fname;
}

function getNameVar() public view returns (string memory _name) {
  _name=name;
  return name;
}

}