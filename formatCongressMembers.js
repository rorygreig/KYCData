var fs = require('fs');

var representatives = require('./data/US_CongressMembers/USRepresentatives.json');
var senators = require('./data/US_CongressMembers/USSenators.json');

// console.log(extractValues(representatives[0].content));

saveToJSON(formatResults(representatives, "representatives"), './data/US_CongressMembers/USRepresentativesFormatted.json');
saveToJSON(formatResults(senators, "senators"), './data/US_CongressMembers/USSenatorsFormatted.json');

// console.log(representatives);
// representatives = formatResults(representatives, 'representatives');


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
  values = nameStr.split(" ");
  result.party = values.pop();
  console.log(values);
  result.lastName = values.shift().replace(',', ' ').trim();
  //TODO: use array reduce function to fold firstName array into one String
  result.firstName = values.reduce(function(accumulator, currentValue, index, array) {
    return accumulator + ' ' + currentValue.replace(',', ' ').trim();
  });;
  return result;
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
