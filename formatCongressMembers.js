var fs = require('fs');

var representatives = require('./data/US_CongressMembers/USRepresentatives.json');
var senators = require('./data/US_CongressMembers/USSenators.json');

saveToJSON(formatResults(representatives, "representatives"), './data/US_CongressMembers/USRepresentativesFormatted.json');
saveToJSON(formatResults(senators, "senators"), './data/US_CongressMembers/USSenatorsFormatted.json');

console.log(formatResults(representatives, "representatives"));

function formatResults(members, house){
  var results = Array();

  console.log(members);

  members.forEach(function(member){
    results.push(extractValues(member.content));
  });

  return results;
}

function extractValues(nameStr){
  var result = Object();
  fields = nameStr.split(" ");
  var values = extractPartyData(fields.pop());
  console.log(values);
  console.log(fields);
  result.party = values[0];
  result.state = values[1];
  result.lastName = fields.shift().replace(',', ' ').trim();
  result.firstName = fields.reduce(function(accumulator, currentValue, index, array) {
    return accumulator + ' ' + currentValue.replace(',', ' ').trim();
  });
  return result;
}

function extractPartyData(inputStr){
  var values = inputStr.replace('[', '').replace(']', '').split('-');
  return values;
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
