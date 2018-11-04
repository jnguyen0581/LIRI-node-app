require("dotenv").config();

// assumes user setup has been completed (api keys...)

// get the user input
const input = process.argv[2];
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
}

function spotifyThisSong(){
    console.log("SPOTIFY THIS SONG")
}

function concertThis() {
console.log("CONCERT THIS");
}