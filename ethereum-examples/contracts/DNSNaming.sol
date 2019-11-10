pragma solidity ^0.5.0;
contract DNSNaming {
    struct DNSSubscription{
        string dnsName;
        uint subscriptionYears;
    }
    DNSSubscription [] private  subscriptions;     
    function getSubscription(uint _index) public view returns(string memory,uint) {
        return (subscriptions[_index].dnsName,subscriptions[_index].subscriptionYears);
    }
    function getSubscriptionName(uint _index) public view returns(string memory) {
        return subscriptions[_index].dnsName;
    }
    function getSubscriptionYears(uint _index) public view returns(uint) {
        return subscriptions[_index].subscriptionYears;
    }
    function getSubscriptionLength() public view returns(uint) {
        return subscriptions.length;
    }
    function buyDNSName(string memory _dnsName) public payable returns(uint) {
    	 bool entryFound = false;
        for (uint i=0; i<subscriptions.length; i++) {
            if (stringsEqual(subscriptions[i].dnsName,_dnsName)) {
                 subscriptions[i].subscriptionYears = subscriptions[i].subscriptionYears +msg.value;
            	 entryFound = true;	
            }
        }
        if(entryFound ==false){
        subscriptions.length++;
        subscriptions[subscriptions.length-1].dnsName = _dnsName;
        subscriptions[subscriptions.length-1].subscriptionYears = msg.value;
        }
        return subscriptions.length;
     }
	function stringsEqual(string storage _a, string memory _b) private view returns (bool) {
		bytes storage a = bytes(_a);
		bytes memory b = bytes(_b);
		if (a.length != b.length)
			return false;
		for (uint i = 0; i < a.length; i ++)
			if (a[i] != b[i])
				return false;
		return true;
	}
   
}