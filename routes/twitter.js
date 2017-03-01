//router.js to handle default route

module.exports = function (res){

var express = require('express');
var router = express.Router();
var Twit = require('twit');

var config = require('../config')

var test = "test string";

var T = new Twit(config);


var options = {count: 5};

	//get functions below for twitter api. have to be bundled together to allowe to pass retreived information through on render function
	T.get('statuses/user_timeline',options, function (err, data, response) {
    
    	
	var following = [];
	var messages = [];
	var tweets = [];

		for (i = 0; i < data.length; i++) {
			
				 var timelineObject = {
					 "tweetTime": data[i].created_at,
					 "tweetText" : data[i].text,
					 "tweetRe" : data[i].retweet_count,
					 "tweetFav" : data[i].favorite_count,
					 "name" : data[i].user.name,
					 "scname" : data[i].user.screen_name,
					 "image" : data[i].user.profile_image_url
				 };
				 tweets.push(timelineObject);
         
		} // end for loop
    
    T.get('friends/list', options, function(err, data, response){
			for (i = 0; i < data.users.length; i++) {
					var followingObject = {
						"friendName" : data.users[i].name, 
						"friendscName" : data.users[i].screen_name, 
						"followingBool" : data.users[i].following,
						"friendPic" : data.users[i].profile_image_url
					}
					
					following.push(followingObject);
			}
			
						T.get('direct_messages', {count: 5, entities: "false"}, function(err,data, response) {
							for (i = 0; i < data.length; i++) {
								var messageObject = {
									"messageText" : data[i].text,
									"messageTime" : data[i].created_at,
									"messageImg" : data[i].sender.profile_image_url,
									"messageSenderScnName" : data[i].sender_screen_name
								}
								messages.push(messageObject);
							}
              
              //console.log(tweets);
							
                 res.render('index', {
                    title: "Twitter API Application",
                    tweets: tweets,
                    following: following,
                    messages: messages
                    
                    }); //end res.render
              				
							
						}); //end DMessages
			
		}); //end friends/list
		
		
	}); //end statuses


}; //end module exports

// To send tweet see below
// var tweet =  {
	// status: 'Learning to use twitter api with #nodejs'
// }

// T.post('statuses/update', tweet, tweeted);

// function tweeted(err, data, resposne) {
	// console.log("Tweeted status!");
// }
