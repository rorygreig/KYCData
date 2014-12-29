var representatives = require('./data/US_CongressMembers/USRepresentatives.json');
var senators = require('./data/US_CongressMembers/USSenators.json');

console.log(extractValues(representatives[0].content));

function formatResults(members, house){
  var members = Array();
  var results = Array();

  members.forEach(function(member){
    results.push(extractValues(member.content));
  });

  return results;
}

function extractValues(nameStr){
  var result = Object();
  values = nameStr.split(" ");
  result.party = values.pop();
  console.log(values);
  result.lastName = values[0];
  result.firstName = values[1];
  return result;
}
