var yql = require('yql');

var targets = Array();

var url = "http://hmt-sanctions.s3.amazonaws.com/sanctionsconlist.htm";
// var url = "./UKsanctions.html";

//get name 1 as first name

// var getTargetsQuery = "select * from html where url='" + url + "' and xpath='//li'";
var getTargetsQuery = "select * from data.html.cssselect where url='" + url + "' AND css='.SpacedOut'";


console.log(getTargetsQuery);

new yql.exec(getTargetsQuery, function(response) {
  // console.log(response.query.results.results.li);
  var targetsRaw = response.query.results.results.li;
  console.log(typeof(targets));

  var individuals = targetsRaw.filter(function isIndividual(target){
    return target.strong.indexOf('Organisation Name') == -1;
  });

  individuals.forEach(function(target){
    var details = target.p.content;
    details = details.split("\n");
    console.log(details);
  });

  console.log(individuals.length);

});
