// Enable the youtube API for your account: https://developers.google.com/youtube/v3/quickstart/nodejs

const https = require('https');
const querystring = require("querystring") 
const SearchResult = require('../models/SearchResult.js');

function YoutubeRequest(userQuery) {
    let encodedQuery = querystring.escape(userQuery);
    var options = {
        hostname: 'youtube.googleapis.com',
        path: `/v3/search?part=snippet&maxResults=5&q=${encodedQuery}&type=video&videoCategoryId=10&key=${process.env.TOKEN}`,
        method: 'GET'
    };
    var req = https.request(options, (res) => {
        let body = [];
        res.on('data', (chunk) => {
            body.push(chunk)
        });
     
        res.on('end', () => {
            body = Buffer.concat(body).toString();
            const obj = JSON.parse(body);

            let items = []
            obj.items.forEach(function(value){
                let i = value.snippet
                items.push(new SearchResult(i.publishedAt, i.channelId, i.title, i.description, i.channelTitle, i.publishTime))
                
              });

            // TODO implement callback
            console.log(items)
        });
     
    })
    
    req.on("error", (err) => {
        console.log("Error: ", err)
    }).end()
}

YoutubeRequest("purple rain")
