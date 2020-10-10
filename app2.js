const express = require("express");
const app = express();
const server = require("http").createServer(app);
const path = require("path");
const bodyparser = require("body-parser");
var PaytmChecksum = require("./PaytmChecksum/PaytmChecksum");
const checksum_lib = require('./paytm-node/checksum/checksum')

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render('payment');
})
app.get('/callback', (req, res) => {
    res.write('done');
})
app.post('/callback', (req, res) => {
    console.log(req.body.STATUS)
    var html = '<html><body><center><h1>recharge success</h1></center></body></html>'
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(html)
    res.end()
})
app.get('/payment', (req, res) => {
    // //const price = req.query.price;
    // //var price = (typeof req.query.price === 'undefined') ? req.query.price : 10000;
    // //console.log('price : ',price)
    // let params = {}
    // params['MID'] = 'YoXIVY07200208358470',
    //     params['WEBSITE'] = 'WEBSTAGING',
    //     params['CHANNEL_ID'] = 'WEB',
    //     params['INDUSTRY_TYPE_ID'] = 'Retail',
    //     params['ORDER_ID'] = 'ORD0001',
    //     params['CUST_ID'] = 'CUST0011',
    //     params['TXN_AMOUNT'] = `1000`,
    //     params['CALLBACK_URL'] = 'https://securegw-stage.paytm.in/order/status',
    //     // params['EMAIL'] = 'parasgupta34@gmail.com',
    //     // params['MOBILE_NO'] = '8851913402'

    // // PaytmChecksum.generateSignature(params, 'jd1asJ_rIQElbsT1', function (err, checksum) {
    // //     let txn_url = "https://securegw-stage.paytm.in/order/process"
    // //     console.log('reached1')
    // //     let form_fields = ""
    // //     for (x in params) {
    // //         form_fields += "<input type='hidden' name='" + x + "' value='" + params[x] + "'/>"
    // //     }
    // //     console.log('reached2')
    // //     form_fields += "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' />"

    // //     var html = '<html><body><center><h1>Please wait! Do not refresh the page</h1></center><form method="post" action="' + txn_url + '" name="f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit()</script></body></html>'
    // //     res.writeHead(200, { 'Content-Type': 'text/html' })
    // //     res.write(html)
    // //     res.end()
    // // })
    // checksum_lib.genchecksum(params, 'jd1asJ_rIQElbsT1', function (err, checksum) {
    //     let txn_url = "https://securegw-stage.paytm.in/order/process"

    //     let form_fields = ""
    //     for (x in params) {
    //         form_fields += "<input type='hidden' name='" + x + "' value='" + params[x] + "'/>"

    //     }
    //     form_fields += "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' />"
    //     var html = '<html><body><center><h1>Please wait! Do not refresh the page</h1></center><form method="post" action="' + txn_url + '" name="f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit()</script></body></html>'
    //     res.writeHead(200, { 'Content-Type': 'text/html' })
    //     res.write(html)
    //     res.end()
    // })

    // var PaytmChecksum = require("./PaytmChecksum");

    // var paytmParams = {};

    // /* initialize an array */
    // paytmParams["MID"] = "actxmw70992026811808";
    // paytmParams["ORDERID"] = "ORD0001";

    // /**
    // * Generate checksum by parameters we have
    // * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
    // */
    // var paytmChecksum = PaytmChecksum.generateSignature(paytmParams, "Th2L!6TOi_y_7wmS");
    // paytmChecksum.then(function (checksum) {
    //     console.log("generateSignature Returns: " + checksum);
    // }).catch(function (error) {
    //     console.log(error);
    // });

    var paytmParams = {};

    paytmParams.body = {
        "requestType": "Payment",
        "mid": "actxmw70992026811808",
        "websiteName": "WEBSTAGING",
        "orderId": "ORDERID_00918",
        "callbackUrl": "https://merchant.com/callback",
        "txnAmount": {
            "value": "1.00",
            "currency": "INR",
        },
        "userInfo": {
            "custId": "CUST_001",
        },
    };

    /*
    * Generate checksum by parameters we have in body
    * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
    */
    PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), "Th2L!6TOi_y_7wmS").then(function (checksum) {

        paytmParams.head = {
            "signature": checksum
        };

        var post_data = JSON.stringify(paytmParams);

        var options = {

            /* for Staging */
            hostname: 'securegw-stage.paytm.in',

            /* for Production */
            // hostname: 'securegw.paytm.in',

            port: 443,
            path: '/theia/api/v1/initiateTransaction?mid=actxmw70992026811808&orderId=ORDERID_00918',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': post_data.length
            }
        };

        var response = "";
        var post_req = https.request(options, function (post_res) {
            post_res.on('data', function (chunk) {
                response += chunk;
            });

            post_res.on('end', function () {
                console.log('Response: ', response);
            });
        });

        post_req.write(post_data);
        post_req.end();
    });
})

app.listen(3000, () => {
    console.log('connected')
})
