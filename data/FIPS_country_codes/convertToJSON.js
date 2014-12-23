var Converter=require("csvtojson").core.Converter;
var fs=require("fs");

var csvFileName="./FIPScodes.csv";
var outputFile="FIPScodes.json";
var fileStream=fs.createReadStream(csvFileName);
//new converter instance
var csvConverter=new Converter({constructResult:true});

//end_parsed will be emitted once parsing finished
csvConverter.on("end_parsed",function(jsonObj){
  console.log(jsonObj);
  fs.writeFile(outputFile,JSON.stringify(jsonObj)); //here is your result json object
});

//read from file
fileStream.pipe(csvConverter);
