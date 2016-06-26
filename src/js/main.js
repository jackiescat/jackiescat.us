///
/// Tiles
///


var image = '../images/cat.jpg';
var tileWrapper = document.querySelector('.image-tiles');
var rows = 12;
var cols = 8;
var tiles = createTiles(rows, cols, tileWrapper);

var maxOpacities = [
    [0.0, 0.2, 0.4, 0.6, 0.6, 0.4, 0.2, 0.0],
    [0.2, 0.4, 0.8, 1.0, 1.0, 0.6, 0.4, 0.2],
    [0.2, 0.4, 1.0, 1.0, 1.0, 0.8, 0.6, 0.2],
    [0.2, 0.6, 1.0, 1.0, 1.0, 1.0, 0.6, 0.2],
    [0.2, 0.6, 1.0, 1.0, 1.0, 1.0, 0.6, 0.2],
    [0.2, 0.6, 1.0, 1.0, 1.0, 1.0, 0.6, 0.2],
    [0.2, 0.4, 0.8, 1.0, 1.0, 0.8, 0.6, 0.2],
    [0.2, 0.4, 0.6, 0.8, 0.8, 0.6, 0.4, 0.1],
    [0.1, 0.2, 0.4, 0.4, 0.4, 0.4, 0.2, 0.1],
    [0.0, 0.2, 0.2, 0.2, 0.2, 0.2, 0.1, 0.1],
    [0.0, 0.1, 0.1, 0.1, 0.1, 0.1, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
];

animateTiles(tiles);

function animateTiles(tiles) {
    var timelines = [];

    for (var i = 0; i < tiles.length; i++) {
        var row = Math.floor(i / 8);
        var col = i % 8;
        var variance = 0.4;
        var maxOpacity = maxOpacities[row][col];
        var minOpacity = Math.max(0, maxOpacity - variance);
        var duration = random(0.75, 1);

        if (maxOpacity === 0) {
            TweenMax.set(tiles[i], {
                opacity: 0
            });
            continue;
        }

        var tween = TweenMax.fromTo(tiles[i], duration, {
            opacity: minOpacity
        }, {
            opacity: maxOpacity,
            ease: Sine.easeInOut
        });

        timelines[i] = new TimelineMax({
            repeat: -1,
            yoyo: true
        });
        timelines[i].add(tween);

        var start = Math.random() * duration;
        timelines[i].seek(start);
    }
}

function createTiles(rows, cols, tileWrapper) {
    var tiles = [];

    for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols; col++) {
            var tile = document.createElement('div');
            tile.className = 'tile';
            tile.style.backgroundImage = 'url(' + image + ')';
            tile.style.backgroundPosition = (-col * 50) + 'px ' + (-row * 50) + 'px';
            tiles.push(tile);
            tileWrapper.appendChild(tile);
        }
    }

    return tiles;
}

function random(min, max) {
    return Math.random() * (max - min + 1) + min;
}

////
// Quote Generator
////

var quotes = [
    "The harder a cat falls, The higher a cat bounces",
    "Believe only half of what you see and nothing that you hear.",
    "Alone. Yes, that's the key word, the most awful word in the English tongue. Murder doesn't hold a candle to it and hell is only a poor synonym.",
    "From even the greatest of horrors irony is seldom absent.",
    "Everybody is a book of blood; wherever we're opened, we're red.",
    "Give me just enough information so that I can lie convincingly.",
    "We'd stared into the face of Death, and Death blinked first. You'd think that would make us feel brave and invincible. It didn't.",
    "I know always that I am an outsider; a stranger in this century and among those who are still men.",
    "There is something at work in my soul, which I do not understand.",
    "You are so... 11:59",
    "I do not love men: I love what devours them.",
    "Despite my ghoulish reputation, I really have the heart of a small boy. I keep it in a jar on my desk.",
    "Which is the true nightmare, the horrific dream that you have in your sleep or the dissatisfied reality that awaits you when you awake?",
    "Though I walk through the valley of death I will fear no evil, for I am the evilest motherfucker in the valley",
    "Blood is really warm, it's like drinking hot chocolate but with more screaming.",
    "Demons are like obedient dogs; they come when they are called.",
    "The world outside had its own rules, and those rules were not human.",
    "The charm of horror only tempts the strong.",
    "Reality is shaped by the forces that destroy it."
]

var randomNum = Math.floor((Math.random() * quotes.length) + 1);

getQuote = function() {
    document.getElementById("quote").innerHTML = quotes[randomNum - 1];
    console.log(randomNum);
}();
