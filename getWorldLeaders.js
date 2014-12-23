var yql = require('yql');
var fs =  require('fs');
var countryCodes = require('./data/ISOCountryCodes');

var results = Array();

var urls = Array();

countryCodes.forEach(function(country){
  // console.log(country);
  urls.push("https://www.cia.gov/library/publications/world-leaders-1/" + country["alpha-2"] + ".html");
});

// console.log(urls);

var queries = Array();

urls.forEach(function(url){
  // select * from html where url="https://www.cia.gov/library/publications/world-leaders-1/AF.html" and compat="html5" and xpath='//*[@id="cosContent1"]/div[4]/div/div/ul'

  var query = "select * from html where url='" + url + "' and compat='html5' and xpath='//*[@id=\"cosContent1\"]/div[4]/div/div/ul'";
  queries.push(query);
});

// console.log(queries);
console.log(queries[0]);

new yql.exec(queries[0], function(response) {
  var results = response.query.results.ul.li;
  var targets = Array();
  // console.log(results);

  results.forEach(function(item){
    targets.push(extractTarget(item));
  });

  saveToJSON(targets, './data/CIAWorldLeaders/targets.json');

});

function extractTarget(listItem){
  var target = Object();
  var td = listItem.table.tbody.tr.td.table.tbody.tr.td;
  target.position = td[0].span.span.content;
  target.name = td[1].span.span.content;
  console.log(target);
  return(target);
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
