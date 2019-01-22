var express = require('express');
var bodyParser = require('body-parser');
const router = express.Router();
const axios = require('axios')
var url = require('url');
const admin = require('firebase-admin');
var serviceAccount = require('../.serviceAccountKey.json');

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io"));

const contractAddress = "0x273f7f8e6489682df756151f5525576e322d51a3"
const contractABI = [{"constant":true,"inputs":[{"name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isPauser","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"HERO_TYPE_OFFSET","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"mintHeroAsset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"},{"name":"tokenURI","type":"string"}],"name":"mintWithTokenURI","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renouncePauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_contractType","type":"uint16"},{"name":"_supplyLimit","type":"uint16"}],"name":"setSupplyLimit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"finishMinting","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addPauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_contractType","type":"uint16"}],"name":"getSupplyLimit","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenURIPrefix","type":"string"}],"name":"setTokenURIPrefix","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isMinter","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"tokenURIPrefix","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"PauserAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"PauserRemoved","type":"event"},{"anonymous":false,"inputs":[],"name":"MintingFinished","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"MinterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"MinterRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"approved","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"operator","type":"address"},{"indexed":false,"name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"}]
const tokenURIPrefix = process.env.MCHAPI + "hero/"
const contract = new web3.eth.Contract(contractABI, contractAddress);

var bazaaarAddress = "0x19086ad22bd5b07a39EA6ae90378dCb7738F0e47"
var bazaaarABI = [ { "constant": true, "inputs": [], "name": "referralRatio", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x18f9decf" }, { "constant": true, "inputs": [], "name": "asset", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x38d52e0f" }, { "constant": false, "inputs": [], "name": "unpause", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x3f4ba83a" }, { "constant": true, "inputs": [], "name": "feeRatio", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x41744dd4" }, { "constant": true, "inputs": [ { "name": "account", "type": "address" } ], "name": "isPauser", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x46fbf68e" }, { "constant": true, "inputs": [], "name": "paused", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x5c975abb" }, { "constant": false, "inputs": [], "name": "renouncePauser", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x6ef8d66d" }, { "constant": true, "inputs": [ { "name": "account", "type": "address" } ], "name": "isSigner", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x7df73e27" }, { "constant": true, "inputs": [ { "name": "", "type": "bytes32" } ], "name": "cancelledOrFinalized", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x8076f005" }, { "constant": false, "inputs": [ { "name": "account", "type": "address" } ], "name": "addPauser", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x82dc1ec4" }, { "constant": false, "inputs": [], "name": "pause", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x8456cb59" }, { "constant": true, "inputs": [], "name": "ratioBase", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xc2fa002e" }, { "constant": true, "inputs": [], "name": "assetRoyaltyRatio", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xd2a1c515" }, { "constant": false, "inputs": [], "name": "renounceSigner", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xe5c8b03d" }, { "constant": false, "inputs": [ { "name": "account", "type": "address" } ], "name": "addSigner", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xeb12d61e" }, { "inputs": [ { "name": "assetAddress", "type": "address" }, { "name": "assetRoyaltyRecipientAddress", "type": "address" }, { "name": "uints", "type": "uint256[4]" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor", "signature": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "hash", "type": "bytes32" } ], "name": "OrderCancelled", "type": "event", "signature": "0x5152abf959f6564662358c2e52b702259b78bac5ee7842a0f01937e670efcc7d" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "hash", "type": "bytes32" } ], "name": "OrdersMatched", "type": "event", "signature": "0x96d7baa6f920467d51c60293e0c5a942ec6f91956094de5ed0db2bdcfa10319b" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "account", "type": "address" } ], "name": "Paused", "type": "event", "signature": "0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "account", "type": "address" } ], "name": "Unpaused", "type": "event", "signature": "0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "account", "type": "address" } ], "name": "PauserAdded", "type": "event", "signature": "0x6719d08c1888103bea251a4ed56406bd0c3e69723c8a1686e017e7bbe159b6f8" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "account", "type": "address" } ], "name": "PauserRemoved", "type": "event", "signature": "0xcd265ebaf09df2871cc7bd4133404a235ba12eff2041bb89d9c714a2621c7c7e" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "account", "type": "address" } ], "name": "SignerAdded", "type": "event", "signature": "0x47d1c22a25bb3a5d4e481b9b1e6944c2eade3181a0a20b495ed61d35b5323f24" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "account", "type": "address" } ], "name": "SignerRemoved", "type": "event", "signature": "0x3525e22824a8a7df2c9a6029941c824cf95b6447f1e13d5128fd3826d35afe8b" }, { "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x3ccfd60b" }, { "constant": false, "inputs": [ { "name": "assetRoyaltyRecipientAddress", "type": "address" }, { "name": "uints", "type": "uint256[4]" } ], "name": "update", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xceda36d2" }, { "constant": false, "inputs": [ { "name": "addrs", "type": "address[4]" }, { "name": "uints", "type": "uint256[4]" }, { "name": "v", "type": "uint8" }, { "name": "r", "type": "bytes32" }, { "name": "s", "type": "bytes32" } ], "name": "orderMatch_", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function", "signature": "0xd5efe843" }, { "constant": false, "inputs": [ { "name": "addrs", "type": "address[3]" }, { "name": "uints", "type": "uint256[4]" }, { "name": "v", "type": "uint8" }, { "name": "r", "type": "bytes32" }, { "name": "s", "type": "bytes32" } ], "name": "orderCancell_", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xc11bf16c" }, { "constant": true, "inputs": [ { "name": "addrs", "type": "address[3]" }, { "name": "uints", "type": "uint256[4]" }, { "name": "v", "type": "uint8" }, { "name": "r", "type": "bytes32" }, { "name": "s", "type": "bytes32" } ], "name": "requireValidOrder_", "outputs": [ { "name": "", "type": "bytes32" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x4faf028a" }];
const bazaaar = new web3.eth.Contract(bazaaarABI, bazaaarAddress);


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

router.post('/set', async function(req, res) {
  
  const param = req.body;
  console.log(param)

  // var owner = await contract.methods.ownerOf(param.id).call()
  // var approved = await contract.methods.getApproved(param.id).call()
  if(true){
  // if(owner == param.maker || approved == bazaaarAddress){
    var uri = tokenURIPrefix + param.id
    var response = await axios.get(uri)
    var metadata = response.data;
    var date = new Date();
    var time = date.getTime();

    var data = {
      orderid: param.data,
      maker: param.maker,
      feeRecipient: param.feeRecipient,
      id: param.id,
      price: param.price,
      salt: param.salt,
      data: param.data,
      sig: param.sig,
      metadata: metadata,
      flag: 1,
      timestamp: time,
    };

    orderid = String(param.data)
    var setDoc = db.collection('order').doc(orderid).set(data);
    res.json({status: true})
  }else{
    res.json({status: false})
    console.log(err)
  }
  

});

router.get('/get', async function(req, res) {
  
    var urlParts = url.parse(req.url, true);
    var parameters = urlParts.query;
    console.log(parameters)
    var id = parameters.id;
    id = String(id)

    var cityRef = db.collection('order').doc(id);
    var getDoc = cityRef.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          console.log('Document data:', doc.data());
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
});

router.get('/getAll', async function(req, res) {
  
  var urlParts = url.parse(req.url, true);
  var parameters = urlParts.query;
  var id = parameters.id;

  db.collection('order').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });

});



module.exports = router;