const {Web3}= require("web3");
const crypto = require("crypto");
const web3 = new Web3("http://127.0.0.1:7545");

function generateHash(data){
  return crypto.createHash("sha256").update(data).digest("hex");
}

module.exports = { generateHash };




module.exports = web3;
