var yql = require('yql');
var fs =  require('fs');
var countryCodes = require('./data/ISOCountryCodes');

var results = Array();

var urls = Array();

countryCodes.forEach(function(country){
  // console.log(country);
  urls.push("https://www.cia.gov/library/publications/world-leaders-1/" + country["alpha-2"] + ".html");
});

// console.log(urls);

var queries = Array();

urls.forEach(function(url){
  var query = "select * from data.html.cssselect where url='" + url + "' AND css='.list-style'";
  queries.push(query);
});

// console.log(queries);
console.log(queries[0]);

new yql.exec(queries[0], function(response) {
  console.log(response.query.results.results);
  var results = response.query.results.results;

  saveToJSON(results, './data/CIAWorldLeaders/worldLeaders.json');

});

function saveToJSON(targets, fileName){

  fs.writeFile(fileName, JSON.stringify(targets, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + fileName);
    }
  });

}
