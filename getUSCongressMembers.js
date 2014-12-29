var yql = require('yql');
var fs = require('fs');
var async = require('async');

var url = "https://www.congress.gov/members"
var getMembersQuery = "select * from html where url='" + url + "' and compat='html5' and xpath='//*[@id=\"content\"]/div'";

console.log(getMembersQuery);

new yql.exec(getMembersQuery, function(response) {
  console.log(response.query.results);
  var targets = response.query.results
  saveToJSON(targets, './data/USCongressMembers/USCongressMembers.json');
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
