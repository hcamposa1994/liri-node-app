require("dotenv").config();
var keys = require("./keys");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var argument = process.argv[2];

if(argument === "spotify-this-song")
{
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
