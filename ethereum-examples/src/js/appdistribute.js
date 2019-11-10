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
      $.getJSON('Distribute.json', function(data) {
        var DistributeArtifact = data;
        App.contracts.Distribute = TruffleContract(DistributeArtifact);
        App.contracts.Distribute.setProvider(App.web3Provider);
      });
    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-getFundsBalanceOfContract', App.getFundsBalanceOfContract);
    $(document).on('click', '.btn-distributeFunds', App.distributeFunds);
    $(document).on('click', '.btn-clearFromScreen', App.clearFromScreen);
  },

  clearFromScreen: function(event) {
    event.preventDefault();
    document.getElementById("fundsbalance").value="";
  },

  getFundsBalanceOfContract: function(event) {
    event.preventDefault();
    var distributeInstance;
    web3.eth.getAccounts(function(error, accounts) {
    
      if (error) {
        alert("error:"+error);
      }

      var account = accounts[0];

      App.contracts.Distribute.deployed().then(function(instance) {
          distributeInstance = instance;
          return distributeInstance.getFundsBalanceOfContract.call();
      }).then(function(_val) {
        document.getElementById("fundsbalance").value=_val;
        return result;
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  distributeFunds: function(event) {
    event.preventDefault();
    var distributeInstance;
    web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      alert("error:"+error);
    }

    var account = accounts[0];
    
        App.contracts.Distribute.deployed().then(function(instance) {
          distributeInstance = instance;
          return distributeInstance.distributeFunds({from: account});
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
