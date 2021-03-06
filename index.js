var http = require('http');
var port = process.env.PORT || 5000;
var Twitter = require('twitter');
var url = require('url');
var springedge = require('springedge');
var keyWord;

http.createServer(function (request, response) {
    // Send the HTTP header 
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    response.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
    });
    

    var q = url.parse(request.url, true);
    keyWord = q.pathname;
    var parsed = keyWord.substring(1, keyWord.length);
    console.log(parsed);


    // Send the response body as "Hello World"
    if(parsed.length > 3 && parsed != '101'){
        console.log('parsed: ' + parsed); 
        getTweets(respond, parsed);
    }
    else{
        console.log('Sending Text Message...');
        sendText(respond);
    }

    function respond(r){
        if(r !== undefined){
            var output = '';
            for(var i = 0; i < r.length; i++){
                output = output + ",break," + r[i];
            }
            response.end(output);
        }
        else{
            response.end('testing........')
        }
    }

}).listen(process.env.PORT || 5000);

// Console will print the message
console.log('Server running on port:' + port);

var client = new Twitter({
  consumer_key: 'BqltzwfnkpvX0t35iBKwhA9ra',
  consumer_secret: 'yP6zWuA3oZXJqRvPX59ddK2VVTsG4zz1pIITriC2pyuqxtE1yS',
  access_token_key: '924337587946483714-baWfdwaiFDXMdIC5Rl3Fxn3wYBzpAY3',
  access_token_secret: 'vX4LPoxrHQjw0PhNHDJkW9FDyr1ubyi41ZQ4zopQYUmGT'
});

var myTweets = [];

function getTweets(callback, keyWord){
    client.get('search/tweets', {q: keyWord}, function(error, tweets, response) {
        for(var i = 0; i < 10; i++){
            myTweets[i] = tweets.statuses[i].text; 
        }
        callback(myTweets);
    });
}

function sendText(callback){
    console.log('Sending Text Message...');

    var params = {
        'apikey': '', // API Key 
        'sender': 'SEDEMO', // Sender Name 
        'to': [
            '919019xxxxxxxx'  //Moblie Number 
        ],
        'message': 'test+message'
        };

        springedge.messages.send(params, 5000, function (err, response) {
        if (err) {
            return console.log(err);
        }
        console.log(response);
        });

    callback();
}
