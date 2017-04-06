var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

  request("https://news.ycombinator.com/news", function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);
  var result=[];
  $('tr.athing:has(td.votelinks)').each(function( index ) {
    var title = $(this).find('td.title > a').text().trim();
    var link = $(this).find('td.title > a').attr('href');
    result.push({title:title,link:link});
  });
  fs.appendFileSync('hackernews.json',JSON.stringify(result,null,4));
});
});
app.listen(3000);
