var yql = require('yql');
var fs =  require('fs');
var async = require('async');
// var countryCodes = require('./data/ISOCountryCodes');
var countryCodes = require('./data/FIPS_country_codes/FIPScodes.json');

var results = Array();
var countries = Array();
var queryFuncs = Array();
var targetResults = Array();

countryCodes.forEach(function(countryCode){
  console.log(country);
  var country = Object();
  country.url = "https://www.cia.gov/library/publications/world-leaders-1/" + countryCode.Code + ".html";
  country.name = countryCode.Name;
  countries.push(country);
});

console.log(countries);

countries.forEach(function(country){
  var query = "select * from html where url='" + country.url + "' and compat='html5' and xpath='//*[@id=\"cosContent1\"]/div[4]/div/div/ul'";

  queryFuncs.push(function(callback){
    new yql.exec(query, function(response) {
      if(response.query.results !== null){
        var results = response.query.results.ul.li;
        var targets = Array();

        results.forEach(function(item){
          var target = extractTarget(item);
          target.country = country.name;
          targets.push(target);
        });
        targetResults = targetResults.concat(targets);
      }
      callback();
    });
  });

});

async.parallel(queryFuncs, function(){
  //save concatenated results here
  console.log(targetResults);
  saveToJSON(targetResults, './data/CIAWorldLeaders/targets.json');
});

function extractTarget(listItem){
  var target = Object();
  var td = listItem.table.tbody.tr.td.table.tbody.tr.td;
  if(td !== undefined){
    target.position = td[0].span.span.content;
    target.name = td[1].span.span.content;
    console.log(target);
  }
  return(target);
}

function saveToJSON(targets, fileName){

  fs.writeFile(fileName, JSON.stringify(targets, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + fileName);
    }
  });

}
