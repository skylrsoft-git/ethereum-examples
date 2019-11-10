App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    return await App.initWeb3();
  },

  initWeb3: async function() {
      if (window.ethereum) {
        App.web3Provider = window.ethereum;
        try {
          await window.ethereum.enable();
        } catch (error) {
          console.error("User denied account access")
        }
      }
      else if (window.web3) {
        App.web3Provider = window.web3.currentProvider;
      }
      else {
        App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      }
      web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
      $.getJSON('BankGurantee.json', function(data) {
        var BankGuranteeArtifact = data;
        App.contracts.BankGurantee = TruffleContract(BankGuranteeArtifact);
        App.contracts.BankGurantee.setProvider(App.web3Provider);
        //return App.fetchNameAndShow();
      });
    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-setExporter', App.setExporter);
    $(document).on('click', '.btn-setImporter', App.setImporter);
    $(document).on('click', '.btn-initiatePayment', App.initiatePayment);
    $(document).on('click', '.btn-getBalance', App.getBalance);
    $(document).on('click', '.btn-disbursePayment', App.disbursePayment);
    $(document).on('click', '.btn-clearNameFromScreen', App.clearNameFromScreen);
  },

  clearNameFromScreen: function(event) {
    event.preventDefault();
    document.getElementById("transactionvalue").value="";
  },

  setExporter: function(event) {
    event.preventDefault();
    var bankGuranteeInstance;
    web3.eth.getAccounts(function(error, accounts) {
    
      if (error) {
        alert("error:"+error);
      }

      var account = accounts[0];

      App.contracts.BankGurantee.deployed().then(function(instance) {
          bankGuranteeInstance = instance;
          return bankGuranteeInstance.setExporter({from: account});
      }).then(function(_name) {
//        document.getElementById("personname").value=_name;
        return result;
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  setImporter: function(event) {
    event.preventDefault();
    var bankGuranteeInstance;
    web3.eth.getAccounts(function(error, accounts) {
    
      if (error) {
        alert("error:"+error);
      }

      var account = accounts[0];

      App.contracts.BankGurantee.deployed().then(function(instance) {
          bankGuranteeInstance = instance;
          return bankGuranteeInstance.setImporter({from: account});
      }).then(function(_name) {
//        document.getElementById("personname").value=_name;
        return result;
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  initiatePayment: function(event) {
    event.preventDefault();
    var bankGuranteeInstance;
    web3.eth.getAccounts(function(error, accounts) {
    
      if (error) {
        alert("error:"+error);
      }

      var account = accounts[0];

      App.contracts.BankGurantee.deployed().then(function(instance) {
          bankGuranteeInstance = instance;
          alert(document.getElementById("transactionvalue").value);
          bankGuranteeInstance.initiatePayment({from: account, value: document.getElementById("transactionvalue").value});
          return 1;
      }).then(function(_name) {
          return result;
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  getBalance: function(event) {
    event.preventDefault();
    var bankGuranteeInstance;
    web3.eth.getAccounts(function(error, accounts) {
    
      if (error) {
        alert("error:"+error);
      }

      var account = accounts[0];

      App.contracts.BankGurantee.deployed().then(function(instance) {
          bankGuranteeInstance = instance;
          return bankGuranteeInstance.getBalance({from: account});
      }).then(function(_name) {
        document.getElementById("transactionvalue").value=_name;
        return result;
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  disbursePayment: function(event) {
    event.preventDefault();
    var bankGuranteeInstance;
    web3.eth.getAccounts(function(error, accounts) {
    
      if (error) {
        alert("error:"+error);
      }

      var account = accounts[0];

      App.contracts.BankGurantee.deployed().then(function(instance) {
          bankGuranteeInstance = instance;
          return bankGuranteeInstance.disbursePayment({from: account});
      }).then(function(_name) {
        return result;
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
