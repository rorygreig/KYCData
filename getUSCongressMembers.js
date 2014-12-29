var yql = require('yql');
var fs = require('fs');
var async = require('async');

var targets = Array();

var pages = [1,2,3];

var queryFuncs = Array();

var memberResults = Array();

pages.forEach(function(page){

  // var url = "https://www.congress.gov/members?pageSize=250&q=%7B\"congress\"%3A\"113\"%7D&page=\"" + page + "\"";
  var url = "https://www.congress.gov/members?pageSize=250&q=%7B%22congress%22%3A%22113%22%7D&page=%22" + page + "%22"
  var getMembersQuery = "select * from html where url='" + url + "'";

  var results = Array();

  console.log(getMembersQuery);

  queryFuncs.push(function(callback){
    new yql.exec(getMembersQuery, function(response) {
      console.log(response.query.results);
      // if(response.query.results !== null){
      //   console.log(response.query.results.body);
      //   var results = response.query.results.body;
      //   var members = Array();
      //
      //   memberResults = memberResults.concat(results);
      // }
      callback();
    });
  });

});

async.parallel(queryFuncs, function(){
  //save concatenated results here
  console.log(memberResults);
  // saveToJSON(memberResults, './data/USCongressMembers/USCongressMembers.json');
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
