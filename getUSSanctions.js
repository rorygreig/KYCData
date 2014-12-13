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
    result.entity_type = target.sdnType;
    result.first_name = target.firstName;
    result.last_name = target.lastName;
    result.nationality = "";
    result.data_source = "US Sanctions List";
    result.list_type = "Watchlist";
    result.addressList = target.addressList;
    result.aka_list = target.akaList;

    results.push(result);
  })

  console.log(results);

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
