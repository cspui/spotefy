"use strict";
const PLAYLIST_KEY = 'playlist';

jQuery(async function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (!supportsAudio) {
        // no audio support
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
        return;
    }


    // initialize the player (Plyr: https://github.com/sampotts/plyr)
    var player = new Plyr('#audio1', {
        controls: [
            'restart',
            'play',
            'progress',
            'current-time',
            'duration',
            'airplay',
            'mute',
            'volume'
        ],
        seekTime: 5,
        volume: 0.5
    }),
        // initialize variables
        index = 0,
        playing = false,
        extension = '',
        counter = 0;


    const reBuiltMode = (playMode = "def") => {
        // def=default, shu=shuffle, own=playerList
        let needDelete = false;
        if (playMode === 'def') {
            curPlyList = tracks;
        } else if (playMode === 'shu') {
            // shuffle list
            for (let i = shuffleTracks.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffleTracks[i], shuffleTracks[j]] = [shuffleTracks[j], shuffleTracks[i]];
            };
            curPlyList = shuffleTracks;

        } else if (playMode === 'own') {
            curPlyList = playerList;
            needDelete = true;
        } else {
            console.warn('Play mode not available!');
        }

        // redisplay
        $('#plList').html('');
        counter = 0;
        $.each(curPlyList, (_, value) => buildPlaylist(value, needDelete));

        if (curPlyList.length == 0) {
            audio.pause();
            console.warn('No audio in the play list!');
            return
        }

        // play audio
        index = 0;
        loadTrack(index, true);

        // reattach li listener
        $('#plList li').on('click', function () {
            var id = parseInt($(this).index());
            if (id !== index) {
                index = id;
                loadTrack(id, true);
            }
        });

        // reattach delete/addPlyList listener  
        if (playMode === 'own') {
            $('#plList li #btnAddPlyList').on('click', function (e) {
                e.stopPropagation();
                var id = parseInt($(this).parent().parent().index());
                playerList.splice(id, 1);
                updateLocalStorage(PLAYLIST_KEY, playerList);
                reBuiltMode('own');
            });
        } else {
            $('#plList li #btnAddPlyList').on('click', function (e) {
                // stop event from bubbling up to row element
                e.stopPropagation();

                var id = parseInt($(this).parent().parent().index());
                console.log("adding: ", id)
                // add the track into playlist          
                if (containsObject(curPlyList[id], playerList)) {
                    console.warn("Alr exists!");
                } else {
                    playerList.push(curPlyList[id]);
                    updateLocalStorage(PLAYLIST_KEY, playerList);
                }
            });
        }
    },

        containsObject = (obj, list) => {
            for (var i = 0; i < list.length; i++) {
                if (list[i].trackName == obj.trackName) return true;
            }
            return false;
        },

        buildPlaylist = (item, isDelete = false) => {
            counter++;
            var trackNumber = counter.toString().padStart(2, "0"),
                trackName = item.trackName.substring(0, item.trackName.length - 4),
                trackDuration = item.trackLength;

            $('#plList').append(`<li> \
                <div class="plItem"> \
                    <span class="plNum">${trackNumber}.</span> \
                    <span class="plTitle">${trackName}</span> \
                    <span class="plLength">${trackDuration}</span> \
                    <span class="material-icons" id="btnAddPlyList" title="Add track">${isDelete ? 'delete' : 'playlist_add'}</span> \
                </div> \
                </li>`);
        },
        checkLocalStorage = (key) => localStorage.getItem(key) ? true : false,
        updateLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data)),
        getLocalStorage = (key) => JSON.parse(localStorage.getItem(key)),

        onClickPrev = () => {
            index = (index - 1 + curPlyList.length) % curPlyList.length;
            playing ? loadTrack(index, true) : loadTrack(index);
        },
        onClickNext = () => {
            index = (index + 1) % curPlyList.length;
            playing ? loadTrack(index, true) : loadTrack(index);
        };


    var result = await fetch('/track_list').then(r => r.json()),
        tracks = await result[0].trackList,
        shuffleTracks = JSON.parse(JSON.stringify(tracks)),
        playerList = [],
        curPlyList = tracks,
        initializePlayList = $.each(tracks, (index, value) => buildPlaylist(value)),
        npAction = $('#npAction'),
        npTitle = $('#npTitle'),
        pageTitle = $('title'),

        audio = $('#audio1').on('play', function () {
            playing = true;
            npAction.text('Now Playing...');
            pageTitle.text(`${npTitle.text()}`);
        }).on('pause', function () {
            playing = false;
            npAction.text('Paused...');
            pageTitle.text('Spotefy');
        }).on('ended', function () {
            npAction.text('Buffering...');
            index = (index + 1) % curPlyList.length;
            loadTrack(index, true);
        }).get(0),

        btnPrev = $('#btnPrev').on('click', () => onClickPrev()),
        btnNext = $('#btnNext').on('click', () => onClickNext()),

        li = $('#plList li').on('click', function () {
            var id = parseInt($(this).index());
            console.log($(this))
            if (id !== index) {
                index = id;
                loadTrack(id, true);
            }
        }),

        plyLst = $('#plList li #btnAddPlyList').on('click', function (e) {
            // stop event from bubbling up to row element
            e.stopPropagation();

            var id = parseInt($(this).parent().parent().index());
            console.log("adding: ", id)

            // add the track into playlist          
            if (containsObject(curPlyList[id], playerList)) {
                console.warn("Alr exists!");
            } else {
                playerList.push(curPlyList[id]);
                updateLocalStorage(PLAYLIST_KEY, playerList);
            }
        }),

        shufflePlayList = $('#btnShuffle').on('click', () => reBuiltMode('shu')),
        ownPlyList = $('#btnPlaylist').on('click', () => reBuiltMode('own')),
        defaultPlayList = $('#btnDefaultPlay').on('click', () => reBuiltMode('def')),

        loadTrack = function (id, play = false) {
            audio.src = "/track/" + curPlyList[id].trackId + '/' + extension;
            if (play) audio.play();

            $('.plSel').removeClass('plSel');
            $('#plList li:eq(' + id + ')').addClass('plSel');
            npTitle.text(curPlyList[id].trackName.substring(0, curPlyList[id].trackName.length - 4));

            console.log("> Now Loading: " + index);
        };

    extension = audio.canPlayType('audio/ogg') ? '.ogg' : audio.canPlayType('audio/mpeg') ? '.mp3' : '';
    loadTrack(index);
    if (checkLocalStorage(PLAYLIST_KEY)) playerList = getLocalStorage(PLAYLIST_KEY);

    /* Media Controls */
    navigator.mediaSession.setActionHandler('previoustrack', () => onClickPrev());
    navigator.mediaSession.setActionHandler('nexttrack', () => onClickNext());
    navigator.mediaSession.setActionHandler('seekbackward', () => player.rewind(5));
    navigator.mediaSession.setActionHandler('seekforward', () => player.forward(5));

});