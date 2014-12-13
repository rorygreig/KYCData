var yql = require('yql');

var targets = Array();

var url = "http://www.treasury.gov/ofac/downloads/consolidated/consolidated.xml";

var getTargetsQuery = "select * from xml where url='" + url + "'";


console.log(getTargetsQuery);

new yql.exec(getTargetsQuery, function(response) {
  console.log(response.query.results.sdnList);

});
