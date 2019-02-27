### Backend Node test
#### Task:
Create a basic meteor application using twitter APIs

#### Descripción:
1. Create a MeteorJS application using packages functionality.
2. Create a basic html page with search bar and search button. On entering
a twitter username I should be able to get his latest 50 tweets and store
them in the database. (API name : getTweets)
3. Create More button to get extra 200 tweets
4. Create an API to get tweets with specific structure(structure given below)
and details related to user.(API name : getSummary)
5. As a user I should be able to get tweets between two different
dates(optional)
6. Details about APIs in more information section
#### Stack
Front-end – you can use any framwork of your choice(we here in Medlab are
using react)
Back-end – should be REST APIs with mongodb as the database , use any
framework (preferred express js)
#### Valuation
1. struture of the project(5%)
2. package.json(5%)
3. server.js(10%)
4. modularization of the code(5%)
5. functionality(50%)
6. error handling(10%)
7. TDD/BDD/unit tests(10%)
8. UI(5%)

#### Instructions
1. project should have two REST APIs
* a. **/getTweets** (should accept twitter name as the parameter and should also work
for more tweets and tweets between two dates, parameters
you can define and
mention them in ReadMe file in project folder)
* b. **/getSummary/:username** (this will be used to show data on UI)
2. structure for **getSummary**
```
{
    userSummary : {
      statusCount : 421,
      lists : 12,
      followers : 123,
      favorites : 34,
      reTweets_count : 45
  	},
	tweets : [{
      tweet_text : “hi”,
      username : “johndoe”,
      id : “id of the tweet”,
      date : “01/01/2018”
	}, //more tweets ],
	profileData : {
      name : John Doe,
      location : New York,
      description : profile description,
      profile_image : “profile_image_url”,
      createdAt : “01/01/2018”
	}
}
```
3. We dont expect complicated UI basic UI will work
4. UI for tweets should consist of profile image , username , date , tweet text
5. UI for profile data should consist of data mentioned in userSummary and profileData
6. please upload the code on github with **ReadMe** file with instructions on how to run
the project and define the Rest APIs (route name , params , headers)
#### More information
1. **getweets/:twittername (for storing and getting tweets)**

At any given point of time if user calls this API he should see latest tweets from
twitter database and you should store it in local mongodb
for example:
* first time user enters twitter name in search box and presses enter he should see
latest 50 tweets and tweets should be stored in mongodb
* if user again enters same twitter name first it should check for new tweets using
twitter API if NO NEW tweets then fetch it from db , if there are NEW tweets show
get them store them in db and show on UI
2. **getSummary/:twittername (for showing tweets and profile details on UI)**
While calling this API user should get structurized data ( for structure check
instructions) which can be used to show on UI
