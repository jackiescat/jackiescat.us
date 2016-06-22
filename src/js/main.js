///
/// Tiles
///


var image = '../images/cat.jpg';
var tileWrapper = document.querySelector('.image-tiles');
var rows =  12;
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
      TweenMax.set(tiles[i], {opacity: 0 });
      continue;
    }

    var tween = TweenMax.fromTo(tiles[i], duration, {
      opacity: minOpacity
    }, {
      opacity: maxOpacity,
      ease: Sine.easeInOut
    });

    timelines[i] = new TimelineMax({ repeat: -1, yoyo: true});
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
