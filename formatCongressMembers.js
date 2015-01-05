var fs = require('fs');

var representatives = require('./data/US_CongressMembers/USRepresentatives.json');
var senators = require('./data/US_CongressMembers/USSenators.json');

saveToJSON(formatResults(representatives, "Representative"), './data/US_CongressMembers/USRepresentativesFormatted.json');
saveToJSON(formatResults(senators, "Senator"), './data/US_CongressMembers/USSenatorsFormatted.json');

console.log(formatResults(representatives, "representative"));

function formatResults(members, house){
  var results = Array();

  console.log(members);

  members.forEach(function(member){
    results.push(extractValues(member.content, house));
  });

  return results;
}

function extractValues(nameStr, house){
  var result = Object();
  fields = nameStr.split(" ");
  var values = extractPartyData(fields.pop());
  console.log(values);
  console.log(fields);
  result.party = values[0];
  result.US_state = values[1];
  result.last_name = fields.shift().replace(',', ' ').trim();
  result.first_name = fields.reduce(function(accumulator, currentValue, index, array) {
    return accumulator + ' ' + currentValue.replace(',', ' ').trim();
  });
  result.full_name = result.first_name + " " + result.last_name;

  result.object = "Individual";
  result.function = "US " + house;
  result.data_source = "US Government";
  result.nationality = "USA";
  result.uri = "https://www.congress.gov/members";
  result.list_type = "PEPs";
  result.created_at = new Date().getTime();
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
