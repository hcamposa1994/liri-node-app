require("dotenv").config();
var keys = require("./keys");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

spotify
  .search({ type: 'track', query: 'Despacito', limit: 1 })
  .then(function(response) {
    console.log(JSON.stringify(response.tracks.items[0].artists[0].name, null, 2));
})
  .catch(function(err) {
    console.log(err);
  });