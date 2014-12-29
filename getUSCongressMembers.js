var yql = require('yql');
var fs = require('fs');
var async = require('async');

var url = "https://www.congress.gov/members";

var getRepresentativesQuery = "select * from html where url='" + url + "' and compat='html5' and xpath='//*[@id=\"members-representatives\"]/option'";
var getSenatorsQuery = "select * from html where url='" + url + "' and compat='html5' and xpath='//*[@id=\"members-senators\"]/option'";

console.log(getRepresentativesQuery);

//get members of house of representatives
new yql.exec(getRepresentativesQuery, function(response) {
  var representatives = response.query.results.option;
  representatives.shift();
  console.log(representatives);
  console.log(representatives.length);
  saveToJSON(representatives, './data/USCongressMembers/USRepresentatives.json');
});

//get members of the senat
new yql.exec(getSenatorsQuery, function(response) {
  var senators = response.query.results.option;
  senators.shift();
  console.log(senators);
  console.log(senators.length);
  saveToJSON(senators, './data/USCongressMembers/USSenators.json');
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
