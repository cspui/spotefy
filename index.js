"use strict";

// run the local host in terminal:  node index.js       (in the same dir)
// run localtunnel host:            lt -p 3000 -s spotefy --print-requests           (https://github.com/localtunnel/server)


// ################# improvements TODO ###################
// search function frontend
// color contrast frontend
// auto scroll to the playing track when auto play frontend
// display type of category in frontend


const PATHFILE = "./public";
const PATHMUSIC = "./music";
const OGG_EXT = true;

// dependencies
const express = require("express");
const compression = require("compression");
const fs = require("fs");
const path = require("path");
const getMP3Duration = require("get-mp3-duration");

const app = express();
app.use(express.static("public")); // share the public folder as static files
app.use(express.json());
app.use(compression());

// store all the category in PATHMUS and each track inside trackList
let category = [];

// listen to port 3000 and accept request
// SET PORT=4080 && node server.js (work on cmd !powershell to chg port)
var server = app.listen(process.env.PORT || 3000, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Server is listening at http://%s:%s", host, port);
});

// generate all mp3 file into trackList inside the path given
const getMusicList = (musicPath, catId) => {
    let tracks = [];

    // read and store all the music inside musicPath dir synchronize
    fs.readdirSync(musicPath).forEach((file) => {
        if (path.extname(file) == ".mp3") {
            const buffer = fs.readFileSync(path.join(musicPath, file));
            const durationMS = getMP3Duration(buffer); // duration gotten from using getMP3Duration (https://www.npmjs.com/package/get-mp3-duration)
            const duration = String(
                Math.floor(durationMS / 1000 / 60) +
                ":" +
                Math.floor((durationMS / 1000) % 60)
                    .toLocaleString()
                    .padStart(2, "0")
            );

            const curId = tracks.length;

            // each track properties
            let eachTrack = {
                trackName: file,
                trackLength: duration,
                trackId: curId,
            };

            tracks.push(eachTrack);
        }
    });
    return tracks;
};

// generate all trackList inside each folder in PATHMUS
fs.readdir(PATHMUSIC, (err, files) => {
    if (err) console.log(err);
    else {
        files.forEach((file) => {
            var thePath = path.join(PATHMUSIC, file); // path to each folder
            var stats = fs.statSync(thePath);

            // get all the music tracks in the directory
            if (stats.isDirectory()) {
                let tracks = getMusicList(thePath, category.length);

                // each category properties
                let eachCat = {
                    catName: file,
                    trackList: tracks,
                };

                category.push(eachCat);
            }
        });
    }
});

// stream the music track requested back
app.get("/track/:key/:ext", (req, res) => {
    let id = req.params.key;
    let ext = req.params.ext;
    if (OGG_EXT == false) ext = ".mp3";
    let trackpath = path.join(
        PATHMUSIC,
        `mixed/${category[0].trackList[id].trackName.substring(
            0,
            category[0].trackList[id].trackName.length - 4
        ) + ext
        }`
    );

    console.log(trackpath);

    const contentType = ext == ".mp3" ? "audio/mpeg" : "audio/ogg";

    const stat = fs.statSync(trackpath);
    const fileSize = stat.size;
    const range = req.headers.range;
    console.log(req.headers);

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = end - start + 1;

        console.log(parts, start, end, chunksize);

        const file = fs.createReadStream(trackpath, { start, end });
        const head = {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunksize,
            "Content-Type": contentType,
            "Cache-Control": "max-age=86400, must-revalidate",
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            "Content-Length": fileSize,
            "Content-Type": contentType,
            "Cache-Control": "max-age=86400, must-revalidate",
        };
        res.writeHead(200, head);
        fs.createReadStream(trackpath).pipe(res);
    }
});

// send the category list
app.get("/track_list", (req, res) => {
    res.header;
    res.send(JSON.stringify(category));
    res.end();
});
