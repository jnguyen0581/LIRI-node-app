require("dotenv").config();

const NodeSpotify = require("node-spotify-api");
const request = require("request");
const keys = require("./keys.js");
const moment = require("moment");
const fs = require ("fs");

// get the user input
const input = process.argv[2];
const nodeArg = process.argv;

//  make a decision based on the command
switch (input) {
    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;
    default:
        console.log("I don't understand, ask Google");
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
}

function spotifyThisSong(){
    console.log("SPOTIFY THIS SONG")
}

function concertThis() {
    console.log("CONCERT THIS");
}

function movieThis(){
    console.log("MOVIE THIS")
}

function doWhatItSays (){
    console.log("DO WHAT IT SAYS")
}