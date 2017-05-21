'use strict';
var express = require('express')
var request = require('superagent')
var config = require('config')
var router = express.Router()

var getBalance = require('../services/balance')

/* GET balance page. */
router.get('/', function(req, res) {
  var code = req.query.code

  if (!code)
    res.redirect('/')
  // Request for token
  request
    .post('https://api.finnotech.ir/dev/v1/oauth2/token')
    .send({ code: code
          , redirect_uri: config.redirect_url
          , grant_type: 'authorization_code'
          })
    .auth(config.client_id, config.secret) // Basic authentication
    .end(function (err, response) {

      if (err) {
        console.log(err)
        res.render('خطای سیستمی: ' + err.message)
      }
      else {
        var access_token = response.body.access_token
        var token = access_token.value
        var nid = access_token.userId
        var deposits = access_token.deposits
        var resources = deposits[0].resources

        // Get only first deposit balance
        getBalance(token, nid, resources[0], function (err, balance) {
          if (err)
            res.render('خطای سیستمی: ' + err.message)

          res.render('balance'
                    , { deposit: { number: balance.number
                                 , balance: balance.currentBalance
                                 }
                      }
                    )
        })
      }
    })
})

module.exports = router
