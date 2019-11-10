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
    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-decode', App.decodeText);
  },

  decodeText: function(event) {
    event.preventDefault();
    document.getElementById("outputtext").value=web3.toAscii(document.getElementById("inputtext").value);
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
