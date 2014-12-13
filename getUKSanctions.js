var yql = require('yql');

var targets = Array();

var url = "http://hmt-sanctions.s3.amazonaws.com/sanctionsconlist.htm";

//get name 1 as first name

// var getTargetsQuery = "select * from html where url='" + url + "' and xpath='//li'";
var getTargetsQuery = "select * from data.html.cssselect where url='" + url + "' AND css='.SpacedOut'";


console.log(getTargetsQuery);

new yql.exec(getTargetsQuery, function(response) {
  console.log(response.query.results.results.li.length);

});
