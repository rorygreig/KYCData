var yql = require('yql');
var fs = require('fs');

var results = Array();

var url = "http://web.worldbank.org/external/default/main?theSitePK=84266&contentMDK=64069844&menuPK=116730&pagePK=64148989&piPK=64148984";

var getTargetsQuery = "select * from data.html.cssselect where url='" + url + "' AND css='.tableBorderGrey'";

console.log(getTargetsQuery);

new yql.exec(getTargetsQuery, function(response) {
  targets = response.query.results.results.table.tr;
  // console.log(targets);

  //remove first three rows
  console.log(targets.shift());
  console.log(targets.shift());
  console.log(targets.shift());

  var results = Array();

  targets.forEach(function(target){
    var result = Object();
    var values = target.td;

    result.object = "firm";
    result.entity_name = values[0].font.content;

    result.address_country = values[2].font.content;

    var address = values[1].font.content.split(',');

    var city = address.pop().trim();
    if(city !== ""){
      result.address_city = city;
    };

    if(address.length > 0){
       var address = address.pop().split('\n').reduce(function(accumulator, currentValue) {
        return accumulator + ', ' + currentValue.trim();
      }).trim();
    }

    if(address !== ""){
      result.address_street1 = address;
    }

    result.data_source = "World Bank Sanctions";
    result.uri = url;
    result.list_type = "sanctions";
    result.created_at = new Date().getTime();



    results.push(result);
  });

  console.log(results);

  saveToJSON(targets, './data/WorldBankSanctionsRaw.json');
  saveToJSON(results, './data/WorldBankSanctions.json');

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
