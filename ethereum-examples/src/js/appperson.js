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
      $.getJSON('Person.json', function(data) {
        var PersonArtifact = data;
        App.contracts.Person = TruffleContract(PersonArtifact);
        App.contracts.Person.setProvider(App.web3Provider);
        return App.fetchNameAndShow();
      });
    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-fetchNameAndShow', App.fetchNameAndShow);
    $(document).on('click', '.btn-setNameFromScreen', App.setNameFromScreen);
    $(document).on('click', '.btn-clearNameFromScreen', App.clearNameFromScreen);
  },

  clearNameFromScreen: function(event) {
    event.preventDefault();
    document.getElementById("personname").value="";
  },

  fetchNameAndShow: function(event) {
    event.preventDefault();
    var personInstance;
    web3.eth.getAccounts(function(error, accounts) {
    
      if (error) {
        alert("error:"+error);
      }

      var account = accounts[0];

      App.contracts.Person.deployed().then(function(instance) {
          personInstance = instance;
          return personInstance.getNameVar.call();
      }).then(function(_name) {
        document.getElementById("personname").value=_name;
        return result;
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  setNameFromScreen: function(event) {
    event.preventDefault();
    var personInstance;
    web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      alert("error:"+error);
    }

    var account = accounts[0];
    
        App.contracts.Person.deployed().then(function(instance) {
          personInstance = instance;
          return personInstance.setNameVar(document.getElementById("personname").value,{from: account});
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
