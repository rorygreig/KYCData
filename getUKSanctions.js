var yql = require('yql');
var fs = require('fs');

var results = Array();

var url = "http://hmt-sanctions.s3.amazonaws.com/sanctionsconlist.htm";

// var getTargetsQuery = "select * from html where url='" + url + "' and xpath='//li'";
var getTargetsQuery = "select * from data.html.cssselect where url='" + url + "' AND css='.SpacedOut'";


console.log(getTargetsQuery);

new yql.exec(getTargetsQuery, function(response) {
  // console.log(response.query.results.results.li);
  targets = response.query.results.results.li;
  console.log(typeof(targets));

  var individuals = targets.filter(function isIndividual(target){
    return target.strong.indexOf('Organisation Name') == -1;
  });

  // create results array
  individuals.forEach(function(target){
    var result = Object();
    var details = target.p.content;
    details = details.split("\n");

    result.entityType = 'Individual';
    result.firstName = details[1].trim();
    result.lastName = details[0].trim();
    result.nationality = "";
    result.dataSource = "UK Sanctions List";
    result.listType = "Watchlist";
    result.addressList = "";
    result.akaList = "";

    results.push(result);
  });

  console.log(results.length)

  //save results to JSON
  saveToJSON(results, './UKtargets.json');

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
