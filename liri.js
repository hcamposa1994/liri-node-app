require("dotenv").config();
var keys = require("./keys");

var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require('moment');
var fs = require("fs");

var argument = process.argv[2];

function spotifyThis(selector) {
    var spotify = new Spotify(keys.spotify);
    var song = process.argv[3] || selector || "The Sign";
    console.log("--SPOTIFY--")
    spotify
    .search({ type: 'track', query: song, limit: 5 })
    .then(function(response) {
        
        for (let k = 0; k < response.tracks.items.length; k++)
        {   
            console.log("\n---TRACK INFO---")
            console.log("Artist(s): ")
            for (let i = 0; i < response.tracks.items[k].artists.length; i++) {
                console.log(response.tracks.items[k].artists[i].name);
            }

            console.log("Song Title: " + response.tracks.items[k].name);

            console.log("Preview Link: " + response.tracks.items[k].external_urls.spotify);

            console.log("Album: " + response.tracks.items[k].album.name);
        }
    })
    .catch(function(err) {
        console.log(err);
    });
}

function concertThis(selector) {
    var artist = process.argv[3] || selector;
    console.log("--BANDSINTOWN--")

    axios
    .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function(response) {

        for (let i = 0; i < response.data.length; i++) {
            console.log("\n---BAND/ARTIST INFO---")
            console.log("Venue name: " + response.data[i].venue.name);
            console.log("Venue location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
            console.log("Event time: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
        }

    })
    .catch(function(error) {
        if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        } else if (error.request) {
        console.log(error.request);
        } else {
        console.log("Error", error.message);
        }
        console.log(error.config);
    });
}

function movieThis(selector) {
    console.log("--OMDB--")
    var movie = process.argv[3] || selector || "Mr. Nobody";

    axios
    .get("http://www.omdbapi.com/?apikey=trilogy&t=" + movie)
    .then(function(response) {
        var movieInfo = response.data;
        console.log("Title: " +  movieInfo.Title);
        console.log("Year released: " +  movieInfo.Year);
        console.log("IMDB rating: " +  movieInfo.imdbRating);
        for (let i = 0; i < movieInfo.Ratings.length; i++){
            if(movieInfo.Ratings[i].Source === "Rotten Tomatoes") {
                console.log("Rotten Tomatoes rating: " +  movieInfo.Ratings[i].Value);
            }
        }
        console.log("Country where movie was produced: " +  movieInfo.Country);
        console.log("languages available: " +  movieInfo.Language);
        console.log("Plot summary: " +  movieInfo.Plot);
        console.log("Actors: " +  movieInfo.Actors);


    })
    .catch(function(error) {
        if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        } else if (error.request) {
        console.log(error.request);
        } else {
        console.log("Error", error.message);
        }
        console.log(error.config);
    });
}

if(argument === "spotify-this-song")
{
    spotifyThis(undefined);
}

else if(argument === "concert-this")
{
    concertThis(undefined);
}

else if(argument === "movie-this")
{
    movieThis(undefined);
}

else if(argument === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
          return console.log(error);
        }
            
        var dataArr = data.split(",");
        var operation = "";
        if(dataArr[0] === "spotify-this-song") {
            argument = dataArr[0];
            operation = dataArr[1];
            spotifyThis(operation);
        }
        else if(dataArr[0] === "concert-this") {
            argument = dataArr[0];
            operation = dataArr[1];
            spotifyThis(operation);
        }
        else if(dataArr[0] === "concert-this") {
            argument = dataArr[0];
            operation = dataArr[1];
            spotifyThis(operation);
        }
        else {
            console.log("Error, did not read a valid argument");
        }

      });
      
}
else {
    console.log("Error, did not read a valid argument");
}
