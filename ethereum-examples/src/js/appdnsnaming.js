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
      $.getJSON('DNSNaming.json', function(data) {
        var DNSNamingArtifact = data;
        App.contracts.DNSNaming = TruffleContract(DNSNamingArtifact);
        App.contracts.DNSNaming.setProvider(App.web3Provider);
        //return App.fetchNameAndShow();
      });
    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-getSubscription', App.getSubscription);
    $(document).on('click', '.btn-buyDNSName', App.buyDNSName);
    $(document).on('click', '.btn-clearFromScreen', App.clearFromScreen);
  },

  clearFromScreen: function(event) {
    event.preventDefault();
    document.getElementById("dnsname").value="";
    document.getElementById("dnsyear").value="";
  },

  getSubscription: function(event) {
    event.preventDefault();
    var dnsNamingInstance;
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        alert("error:"+error);
      }
      var account = accounts[0];

      App.contracts.DNSNaming.deployed().then(function(instance) {
          dnsNamingInstance = instance;
          return dnsNamingInstance.getSubscriptionLength.call();
      }).then(function(_name) {
          var subscriptionLength;

          var dnsRow = $('#dnsRow');
          dnsRow.empty();
          subscriptionLength=_name;
          var iCtr;
          for (iCtr = 0; iCtr < subscriptionLength; iCtr++) {
              dnsNamingInstance.getSubscription.call(iCtr).then(function(_name) {

                var dnsRow = $('#dnsRow');
                var dnsTemplate = $('#dnsTemplate');

                dnsTemplate.find('.panel-title').text(_name[0]);
                dnsTemplate.find('.dns-years').text(_name[1]);
                dnsRow.append(dnsTemplate.html());

                return result;
              }).catch(function(err) {
                console.log(err.message);
              });
          }
          return result;
      }).catch(function(err) {
        console.log(err.message);
      });

    });
  },

  buyDNSName: function(event) {
    event.preventDefault();
    var dnsNamingInstance;
    web3.eth.getAccounts(function(error, accounts) {
        if (error) {
          alert("error:"+error);
        }
        
        var account = accounts[0];
    
        App.contracts.DNSNaming.deployed().then(function(instance) {
          dnsNamingInstance = instance;
          return dnsNamingInstance.buyDNSName(document.getElementById("dnsname").value,{from: account,value:document.getElementById("dnsyear").value});
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
