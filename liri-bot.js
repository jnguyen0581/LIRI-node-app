require('dotenv').config();

// packages
let request = require('request');
const moment = require('moment');
const keys = require('./keys.js');
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);

const fs = require('fs');

let omdb = keys.omdb;
let bandsintown = keys.bandsintown;
let input = process.argv[2];
let userQuery = process.argv.slice(3).join(' ');

// make a decision based on the command
function userCommand(input, userQuery) {
	switch (input) {
		case 'concert-this':
			concertThis();
			break;
		case 'spotify-this-song':
			spotifyThisSong();
			break;
		case 'movie-this':
			movieThis();
			break;
		case 'do-what-it-says':
			doWhatItSays(userQuery);
			break;
		default:
			console.log("I'm sorry, I didn't understand what you meant");
			break;
	}
}
userCommand(input, userQuery);

// Liri seaches for concert/band
function concertThis() {
	request('https://rest.bandsintown.com/artists/' + userQuery + '/events?app_id=codingbootcamp', function(
		error,
		response,
		body
	) {
		if (!error && response.statusCode == 200) {
			let band = JSON.parse(body);
			if (band.length > 0) {
				for (let i = 0; i < band.length; i++) {
					console.log(
						`Name of Venue: ${band[i].venue.name}\nVenue Location: ${band[i].venue.city}, ${band[i].venue
							.region}, ${band[i].venue.country}\nDate of the Event: ${moment(band[i].datetime).format(
							'dddd, MMMM Do YYYY, h:mm:ss a'
						)}`
					);
				}
				//add to log.txt
				fs.appendFile(
					'log.txt',
					`Name of Venue: ${band[i].venue.name}\nVenue Location: ${band[i].venue.city}, ${band[i].venue
						.region}, ${band[i].venue.country}\nDate of the Event: ${moment(band[i].datetime).format(
						'dddd, MMMM Do YYYY, h:mm:ss a'
					)}`,
					function(error) {
						if (error) {
							console.log(error);
						}
					});
			}
		} else {
			console.log(error);
		}
	});
};

// Liri searches for songs
function spotifyThisSong() {
	if (!userQuery) {
		userQuery = '"The Sign" by Ace of Base';
	}
	spotify.search({ type: 'track', query: userQuery, limit: 1 }, function(error, data) {
		if (error) {
			return console.log('Error occurred: ' + error);
		}
		let spotifyArray = data.tracks.items;

		for (i = 0; i < spotifyArray.length; i++) {
			console.log(
				`Artist: ${spotifyArray[i].album.artists[0].name}\nSong: ${spotifyArray[i]
					.name}\nSpotify link: ${spotifyArray[i].external_urls.spotify}\nAlbum: ${spotifyArray[i].album
					.name}`
			);
		}

		//add to log.txt
		fs.appendFile(
			'log.txt',
			`Artist: ${spotifyArray[i].album.artists[0].name}\nSong: ${spotifyArray[i]
				.name}\nSpotify link: ${spotifyArray[i].external_urls.spotify}\nAlbum: ${spotifyArray[i].album.name}`,
			function(error) {
				if (error) {
					console.log(error);
				}
			}
		);
	});
}

// Liri searches for movie

function movieThis() {
	if (!userQuery) {
		userQuery = 'Mr. Nobody';
	}
	request('http://www.omdbapi.com/?t=' + userQuery + '&y=&plot=short&apikey=3525be89', function(
		error,
		response,
		body
	) {
		let aboutMovie = JSON.parse(body);

		if (!error && response.statusCode === 200) {
			console.log(
				`Title: ${aboutMovie.Title}\nRelease Year: ${aboutMovie.Year}\nIMDB Rating: ${aboutMovie.imdbRating}\nRotten Tomatoes Rating: ${aboutMovie
					.Ratings[0]
					.Value}\nCountry: ${aboutMovie.Country}\nLanguage: ${aboutMovie.Language}\nPlot: ${aboutMovie.Plot}\nActors: ${aboutMovie.Actors}`
			);
		} else {
			return console.log('Error: ' + error);
		}
	});
}

// Liri does what it says

function doWhatItSays() {
	fs.readFile('random.txt', 'utf8', function(error, data) {
		if (error) {
			return console.log(error);
		}
		let dataArray = data.split(',');
		userInput = dataArray[0];
		userQuery = dataArray[1];
		userCommand(userInput, userQuery);
	});
}
