var yql = require('yql');
var fs = require('fs');

var targets = Array();

var url = "http://www.treasury.gov/ofac/downloads/consolidated/consolidated.xml";

var getTargetsQuery = "select * from xml where url='" + url + "'";

var results = Array();

console.log(getTargetsQuery);

new yql.exec(getTargetsQuery, function(response) {
  // console.log(response.query.results.sdnList.sdnEntry);
  var targets = response.query.results.sdnList.sdnEntry;
  individuals = targets.filter(function(target){
    return target.sdnType.indexOf('Individual') > -1;
  });

  // create results array
  individuals.forEach(function(target){
    var result = Object();
    result.entityType = target.sdnType;
    result.firstName = target.firstName;
    result.lastName = target.lastName;
    result.nationality = "";
    result.dataSource = "US Sanctions List";
    result.listType = "Watchlist";
    result.addressList = target.addressList;
    result.akaList = target.akaList;

    results.push(result);
  });

  console.log(targets.length);

  //save results to JSON
  saveToJSON(results, './UStargets.json');

});

function saveToJSON(targets, fileName){

  fs.appendFile(fileName, JSON.stringify(targets, null, 4), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to " + fileName);
      }
  });

}
