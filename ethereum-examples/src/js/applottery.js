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
      $.getJSON('Lottery.json', function(data) {
        var LotteryArtifact = data;
        App.contracts.Lottery = TruffleContract(LotteryArtifact);
        App.contracts.Lottery.setProvider(App.web3Provider);
      });
    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-buyTicket', App.buyTicket);
    $(document).on('click', '.btn-finalizeResult', App.finalizeResult);
    $(document).on('click', '.btn-getBalance', App.getBalance);
    $(document).on('click', '.btn-getEntries', App.getEntries);
    $(document).on('click', '.btn-clearFromScreen', App.clearFromScreen);
  },

  clearFromScreen: function(event) {
    event.preventDefault();
    document.getElementById("fundsbalance").value="";
  },

  getBalance: function(event) {
    event.preventDefault();
    var lotteryInstance;
    web3.eth.getAccounts(function(error, accounts) {
    
      if (error) {
        alert("error:"+error);
      }

      var account = accounts[0];

      App.contracts.Lottery.deployed().then(function(instance) {
          lotteryInstance = instance;
          return lotteryInstance.getBalance.call();
      }).then(function(_val) {
        document.getElementById("fundsbalance").value=_val;
        return result;
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  getEntries: function(event) {
    event.preventDefault();
    var lotteryInstance;
    web3.eth.getAccounts(function(error, accounts) {
    
      if (error) {
        alert("error:"+error);
      }

      var account = accounts[0];

      App.contracts.Lottery.deployed().then(function(instance) {
          lotteryInstance = instance;
          return lotteryInstance.getEntries.call();
      }).then(function(_val) {
        document.getElementById("fundsbalance").value=_val;
        return result;
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  buyTicket: function(event) {
    event.preventDefault();
    var lotteryInstance;
    web3.eth.getAccounts(function(error, accounts) {
    
      if (error) {
        alert("error:"+error);
      }

      var account = accounts[0];

      App.contracts.Lottery.deployed().then(function(instance) {
          lotteryInstance = instance;
          lotteryInstance.buyTicket({from: account, value: 1000000000000000000});
          return 1;
      }).then(function(_name) {
          return result;
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  finalizeResult: function(event) {
    event.preventDefault();
    var lotteryInstance;
    web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      alert("error:"+error);
    }

    var account = accounts[0];
    
        App.contracts.Lottery.deployed().then(function(instance) {
          lotteryInstance = instance;
          lotteryInstance.finalizeResult({from: account});
          return 1;
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
