# liri-node-app

#### What is this app doing and why?
The goal of this app is to combine three APIs (node-spotify-api, OMDB API, and Bands In Town API) in a node application for ease of use and convinience. Extra apis were added in for both functionality (Axios for OMDB and Bands In Town API, plus DotEnv for spotify key privacy) and formality (moment.js used for formatting time). It runs on a node.js environment (command prompt). 

#### How is the app organized?
Code needed to initialize all the apis are written at the start of the app. From there a variable `argument` is created and set equal to `process.argv[2]` in order to get from the user which api they want to use. Functions were written below that to be able to not only run the apis when needed, but repeatedly if we have to as well. Finally if, else-if statements are used that depending on what the user set `argument` as, it would either run the appropriate api, or throw an error.

### How to run this app
First you'll be needing [node.js](https://nodejs.org/en/download/) along with the following apis in order to run the app:
```
[Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
[Axios](https://www.npmjs.com/package/axios) to run OMDB and Bands In Town API
[Moment](https://www.npmjs.com/package/moment)
[DotEnv](https://www.npmjs.com/package/dotenv)
```
Create a .env file with the following:
```
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret
```
With the .env on hand, you can now use your own spotify keys for this app.

on the command terminal, the way you run this code is via the command: `node liri.js argument selector` you have a choice between the following arguments:
```
spotify-this-song
concert-this
movie-this
do-what-it-says
```
###### spotify-this-song
Allows you to use the Spotify API using songs as the selector, in order to get information including artist(s), preview link, etc.

###### concert-this
Allows you to use the Bands in Town API using a band/artist as the selector. It gives you info on where the venue is plus the date they perform.

###### movie-this
Allows you to use the OMDB API via Axios. Using a movie as a selector, it outputs a variety of info such as ratings, plot, actors involved, etc.

###### do-what-it-says
Allows you to use a `random.txt` file to issue a command to the app to run one of the three arguments above along with a selector.
