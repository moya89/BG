//Init SDK

const BitGoJS = require('../BitGoJS/src/index.js');
const bitgo = new BitGoJS.BitGo({env: 'test'});

////Authenticate
//console.log('username: '+username);
console.log('BitGoJS library version: ' + bitgo.version());
bitgo.authenticate({ env: 'test.bitgo.com', username: 'moya89@gmail.com', password: 'ddbitgo$4', otp: '000000' }, function(err, result) {
  if (err) {
    return console.dir(err);
  }
  console.log('Authentication Complete');
  console.dir(result);
  var username = result.user.username;
  var userID = result.user.id;
  console.log('username: '+username);
  console.log('user ID: '+userID);
  console.log('Access Token: '+result.access_token);

//-----
//List wallets to identify labels
//-----

//list wallets again
  //var wallets = bitgo.wallets();
  //wallets.list({}, function callback(err, data) {
  //// handle error, do something with wallets
  //for (var id in data.wallets) {
  //  var wallet = data.wallets[id].wallet;
  //  console.log('My Wallets Are.............');
  //  console.log(JSON.stringify(wallet, null, 4));
  //}
  //});
//---------------


//-----------
//Get Balance
//-----------

  var wallets = bitgo.wallets();
  var data = {
    "type": "bitcoin",
    "id": "2NCUWBchyuReuK7m8HwKMqRr46dEkbuprjJ",
  };
  wallets.get(data, function callback(err, wallet) {
    if (err) {
      // handle error
    }
    console.dir(wallet);
  });
  
  var wallets = bitgo.wallets();
  var data = {
    "type": "bitcoin",
    "id": "2NCUWBchyuReuK7m8HwKMqRr46dEkbuprjJ",
  };
  wallets.get(data, function callback(err, wallet) {
    if (err) {
      // handle error
    }
    // Use wallet object here
    console.dir(wallet);
    console.dir(wallet.balance());
  });

//--------------
  ////Add Wallet
//--------------

  //  "label": "BitGo Challenge for Mohammad Al-Shehabi",
  
  var data = {
    "passphrase": 'ddbitgo$4',
    "label": 'BitGo Challenge for Mohammad',
    "backupXpubProvider": "keyternal"
  }
  
  bitgo.wallets().createWalletWithKeychains(data, function(err, result) {
    if (err) { console.dir(err); throw new Error("Could not create wallet!"); }
    console.dir(result.wallet.wallet);
    console.log("User keychain encrypted xPrv: " + result.userKeychain.encryptedXprv);
    console.log("Backup keychain xPub: " + result.backupKeychain.xPub);
  });

//  console.log('Access Token is still: '+result.access_token);
 // console.log('Gotta go now... ');
 // console.dir(bitgo.wallets);
 // var walletId = '2NCUWBchyuReuK7m8HwKMqRr46dEkbuprjJ';
 // bitgo.wallets().get({ "id": walletId }, function callback(err, wallet) {
 //   if (err) { throw err; }
 //   wallet.transactions({}, function callback(err, transactions) {
 //     // handle transactions
 //     console.log(JSON.stringify(transactions, null, 4));
 //   });
 // });

//Exit Session
bitgo.logout({}, function callback(err) {
  if (err) {
    // handle error
  }
  console.log('Logging Out... ');
  // the user is now logged out.
});

});


//Q3B
//----------
//Send 1 BTC
//----------

//var destinationAddress = '2NCa2QMZaww7UCgkFRgsKTxFp6S7qXWQLHq';
var destinationAddress = '2NCUWBchyuReuK7m8HwKMqRr46dEkbuprjJ';
var amountSatoshis = 0.1 * 1e8; // send 0.1 bitcoins
var walletPassphrase = 'sechallengegoodluck!' // replace with wallet passphrase

const bitgoAuth = new BitGoJS.BitGo({env: 'test', accessToken: 'v2xca997326dc2a12cc40448e29b1f189afb89a8b14da8257dd140538b844939a69'});

//bitgo.wallets().get({id: walletId}, function(err, wallet) {
bitgoAuth.wallets().get({id: '2MuECqLd1upKs4mxvTn8en7ewMpxdho9Mrj'}, function(err, wallet) {
  if (err) { console.log("Error getting wallet!"); console.dir(err); return process.exit(-1); }
  console.log("Balance is: " + (wallet.balance() / 1e8).toFixed(4));

  wallet.sendCoins({ address: destinationAddress, amount: amountSatoshis, walletPassphrase: walletPassphrase }, function(err, result) {
    if (err) { console.log("Error sending coins!"); console.dir(err); return process.exit(-1); }

    console.dir(result);
  });
});

//Q3C
//---------------------
////Authenticate + Logging back in to check transaction history
//---------------------

//console.log('username: '+username);
console.log('BitGoJS library version: ' + bitgo.version());
bitgo.authenticate({ env: 'test.bitgo.com', username: 'moya89@gmail.com', password: 'ddbitgo$4', otp: '000000' }, function(err, result) {
  if (err) {
    return console.dir(err);
  }
  console.log('Authentication Complete');
  console.dir(result);
  var username = result.user.username;
  var userID = result.user.id;

  var walletId = '2NCUWBchyuReuK7m8HwKMqRr46dEkbuprjJ';
  bitgo.wallets().get({ "id": walletId }, function callback(err, wallet) {
    if (err) { throw err; }
    wallet.transactions({}, function callback(err, transactions) {
      console.log('Providing Wallet Transactions');
      // handle transactions
      console.log(JSON.stringify(transactions, null, 4));
    });
  });
 
//
//      console.log('Gotta go now... ');
//
////Exit Session
//      bitgo.logout({}, function callback(err) {
//        if (err) {
//          // handle error
//        }
//        console.log('Logging Out... ');
//        // the user is now logged out.
//      });
//    });
//
//  });
});


//Q4D

//--------------
//Webhook
//-------------



////Authenticate
//console.log('username: '+username);
console.log('BitGoJS library version: ' + bitgo.version());
bitgo.authenticate({ env: 'test.bitgo.com', username: 'moya89@gmail.com', password: 'ddbitgo$4', otp: '000000' }, function(err, result) {
  if (err) {
    return console.dir(err);
  }
  console.log('Authentication Complete');
  console.dir(result);
  var username = result.user.username;
  var userID = result.user.id;
  console.log('username: '+username);
  var wallets = bitgo.wallets();
  wallets.list({}, function callback(err, data) {
  // handle error, do something with wallets
    for (var id in data.wallets) {
      var wallet = data.wallets[id].wallet;
      console.log(JSON.stringify(wallet, null, 4));
      console.log('Dems da wallets');
      console.log('wallet id: '+wallet.id);
      var walletId = wallet.id;
      var url = "https://webhook.site/8362e7eb-e6b1-49d4-b78f-9cccf5e4331e";
      bitgo.wallets().get({ "id": walletId }, function(err, wallet) {
          wallet.addWebhook({ url: url, type: 'transaction' }, function callback(err, result) {
              console.dir(result);
          });
      });

    }
  });


});
