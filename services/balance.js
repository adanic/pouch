'use strict';
var request = require('superagent')
var crypto = require("crypto")

function getBalance(token, nid, deposit, callback) {
  var trackId = 'balance-' + crypto.randomBytes(10).toString('hex')
  var url = 'https://api.finnotech.ir/oak/v1/' + nid + '/deposits/' + deposit + '/balance?trackId=' + trackId

  request
    .get(url)
    .set('Authorization', 'Bearer ' + token)
    .end(function (err, res) {
        if (err) {
          console.log(err)
          callback(err)
        } else {
          callback(err, res.body)
        }
     })
}

module.exports = getBalance
