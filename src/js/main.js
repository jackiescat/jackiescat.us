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


///
/// Letters
///

Letters = function() {
  this.lettersDOM = null;
  this.active = null;
  this.letters = [];
  this.alphabet = ["a", "b", "c", "d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","i","u","v","w","x","y","z","~","&","|","^","ç","@","]","[","{","}","ù","*","µ","¤","$","£","€","°",")","(","+","-","/","<",">","²","`","é","è","1","2","3","4","5","6","7","8","9","0"
  ];

  return this;
};

Letters.prototype.init = function( word ) {

  this.lettersDOM = document.querySelectorAll('.letter');
  this.active = true;
  var i;
  var nextChar;
  var lettersMax = this.lettersDOM.length;

  for ( i = 0; i < this.lettersDOM.length; i++ ) {

    if ( word.charAt( i ) != "" )
      nextChar = word.charAt( i );
    else
      nextChar = false;

    this.letters.push( new Letter( this.lettersDOM[ i ],  nextChar ) );

  }

  if ( word.length > lettersMax ) {

    var wordContainer = document.getElementById("word");

    for ( i = lettersMax; i < word.length; i++ ) {
      var letterSpan = document.createElement('span');
      letterSpan.innerHTML = "";
      letterSpan.classList.add('letter');
      wordContainer.appendChild( letterSpan );
      this.letters.push( new Letter( letterSpan,  word.charAt( i ) ) );
    }
  }

  this.animate();

  return this;

};

Letters.prototype.animate = function() {
  var i;
  var random;
  var char;

  if ( this.active ) {

    window.requestAnimationFrame( this.animate.bind(this) );

    var indexes = [];

    for ( i = 0; i < this.letters.length; i++ ) {

      var current = this.letters[ i ];

      if ( !current.isDead ) {
        random = Math.floor(Math.random() * (this.alphabet.length - 0));
        char = this.alphabet[ random ];
        current.render( char );
      } else {
        indexes.push( i );
      }
    }

    for ( i = 0; i < indexes.length; i++ ) {
      this.letters.splice( indexes[ i ], 1 );
    }

    if ( this.letters.length == 0 ) {
      this.stop();
    }
  }
};

Letters.prototype.start = function( word ) {
  this.init( word );
};

Letters.prototype.stop = function() {
  this.active = false;
};

Letter = function( DOMElement, nextChar ) {

  var scope = this;

  this.DOMEl = DOMElement;
  this.char = DOMElement.innerHTML;
  this.next = nextChar;
  this.speed = Math.floor(Math.random() * (500 - 10) );
  this.total = 0;
  this.duration = 2000;
  this.animating = true;
  this.isDead = false;

  this.timer = setInterval(function() {
    if ( scope.animating === true ) {
      scope.total += scope.speed;
    }
    scope.animating = !scope.animating;
  }, this.speed);

  this.animate();

  return this;

};

Letter.prototype.animate = function() {
  var i;
  var random;

  if ( !this.isDead ) {
    window.requestAnimationFrame( this.animate.bind(this) );
  }


  if ( this.total < this.duration ) {

    if ( this.animating ) {
      this.DOMEl.innerHTML = this.char;
    }

  } else {
    this.isDead = true;

    if ( !this.next ) {
      var parent = document.getElementById('word');
      parent.removeChild( this.DOMEl );
      return;
    }

    this.DOMEl.innerHTML = this.next;
  }
};

Letter.prototype.render = function( char ) {

  if ( !this.animating ) {
    this.char = char;
  }

};

var word = [ "I'M-JACKIE'S-CAT", "FEAR-THE-PAW", "TASTE-MAN-FLESH" ];
var nextWord = 1;

var letters = new Letters();

setTimeout( function() {

  letters.start( word[ nextWord ] );

  setInterval(function() {
    nextWord++;
    if ( nextWord >= word.length )
      nextWord = 0;

    letters.start( word[ nextWord ] );
  }, 10000);

}, 2000);
