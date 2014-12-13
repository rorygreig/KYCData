var yql = require('yql');

var targets = Array();

var url = "http://hmt-sanctions.s3.amazonaws.com/sanctionsconlist.htm";
// var url = "./UKsanctions.html";

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

  individuals.forEach(function(target){
    var details = target.p.content;
    details = details.split("\n");
    details.forEach(function(detail){
      detail = detail.trim();
    });
    console.log(details);
  });

});
