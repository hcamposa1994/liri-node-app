require("dotenv").config();
var keys = require("./keys");

var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require('moment');

var argument = process.argv[2];

if(argument === "spotify-this-song")
{
    var spotify = new Spotify(keys.spotify);
    var song = process.argv[3] || "The Sign";
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
};

if(argument === "concert-this")
{
    var artist = process.argv[3];
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