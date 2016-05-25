//Lets require/import the HTTP module
var http = require('http');
var fs = require('fs');
var file = __dirname + '/favs.json';
var page;
//Lets define a port we want to listen to
const PORT=3000; 

//serve our html rest api frontend page
fs.readFile(__dirname + '/index.html', 'utf8', function (err, html) {
		if (err) {
			console.log('Error: ' + err);
		return;
}
page = html; 
});


//our server handler function
function handleRequest(request, response){
    
		

	//parse json file and load it into an object here and then display the contents of the json file
	fs.readFile(file, 'utf8', function (err, contents) {
		if (err) {
			console.log('Error: ' + err);
		return;
	}

	this.data = JSON.parse(contents);
	});
	
	if(request.url == "/"){
		response.writeHead(200, {"Content-Type": "text/html"});  
        response.write(page); 
	}
	if(request.method === "GET") {
		//get all tweets in the archive.
		if (request.url.split("=")[0] == "/tweets") {
		  for(i=0;i<data.length;i++){
			  //response.writeHead(200, {"Content-Type": "text/html"});  
			  response.write("<br>tweet no."+(i+1)+": "+data[i].text);
			   
		  }
		}
		//get all known Twitter users included in the archive.
		else if (request.url.split("=")[0] == "/users") {
		 for(i=0;i<data.length;i++){
			  response.write("<br>user no."+(i+1)+": "+data[i].user.screen_name+"<br>user id:"+data[i].user.id+"<br><br>");
		  }
		  
		}
		//get a list of all external links included in the tweets from the archive.
		else if (request.url.split("=")[0] == "/links") {
		  for(i=0;i<data.length;i++){
			  //all urls in tweet/entities/urls/
			  console.log(data[i].entities.urls.url);
			  response.write("<br>links from tweet no."+(i+1)+":<br>"+data[i].entities.urls);
			  //all urls in user/entities/url/urls
			  response.write(""+data[i].user.entities.url.urls);
		  
		  }
		}
		//get the details about a given tweet(given the tweet's id).
		else if (request.url.split("=")[0] == "/tweets/id" && request.url.split("=")[1].length!=0) {
		  //for tweets in data object, find the tweet with id = request.url.split("=")[1]
		  for(i=0;i<data.length;i++){
			  if(data[i].id_str == request.url.split("=")[1]){
				  
			  response.write("<br>id."+data[i].id_str + "<br>tweet."+data[i].text);
			  }
		  }
		} 
		//get detailed profile information abour user on screen name input
		else if (request.url.split("=")[0] == "/users/screenname") {
		
		for(i=0;i<data.length;i++){
			 if(data[i].user.screen_name == request.url.split("=")[1]){
			   
			  response.write("<br>user:"+data[i].user.screen_name + "<br>name:"+data[i].user.name + "<br>location."+data[i].user.location + "<br>description."+data[i].user.description);
			  }
			 
		  }
		  
		} 
		//get information about users follower count by user id
		else if(request.url.split("=")[0] =="/followers/id"){
			for(i=0;i<data.length;i++){
			  if(data[i].user.id_str == request.url.split("=")[1]){
			   
			  response.write("<br>name:"+data[i].user.name+"<br>followers count: "+data[i].user.followers_count);
			  }
			 
		  }
		  
		}
    }
	response.end();
	
}

//Create a server
var server = http.createServer(handleRequest);

//Start server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});