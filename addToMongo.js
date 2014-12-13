var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/kyc",function(err,db){
	if(err){
		console.log('Error connecting to Mongo');
	} else {
		console.log('Successfully connected');
		require("./UK_MPs/uk_mps.json").forEach(function(element){
			db.collection('mps').insert(element,{w:0});			
		});
	}
});