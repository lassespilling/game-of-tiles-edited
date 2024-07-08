/*  Debugging ::
    Toggle unecessary API information:
        Game.unecessaryInfo = true;

    Test a trap:
        Game.trapRun('p1', P1, Game.traps.targaryen);

    Disable all traps ::
        Game.trapsActive = false;

    All traps friendly ::
        Game.trapsAreAllFriendly = true;

    Toggle play against CPU ::
        Game.cpu = true; or Game.cpu = false;
*/

// Audio object for sound effects
const Sound = {};
Sound.documentToggled = false;

Sound.sfx = {};
Sound.sfx.dom = document.getElementById('sfx');
Sound.sfx.enabled = true;
Sound.sfx.toggle = document.getElementById('sfxToggle');

Sound.music = {};
Sound.music.dom = document.getElementById('theme');
Sound.music.dom.src = 'music/cabin-lute.mp3';
Sound.music.standardVolume = 0.5;
Sound.music.dom.volume = Sound.music.standardVolume;
Sound.music.playing = false;
Sound.music.enabled = true;
Sound.music.toggle = document.getElementById('musicToggle');

Sound.voice = {};
Sound.voice.dom = document.getElementById('voice');

// Voice
Sound.voice.play = function () {
  if (Sound.sfx.enabled) {
    let promise = Sound.voice.dom.play();
    if (promise !== undefined) {
      promise.then((_) => {}).catch((error) => {});
    }
  }
};

// Music / ambience
Sound.music.play = function () {
  if (Sound.music.enabled) {
    let promise = Sound.music.dom.play();
    if (promise !== undefined) {
      promise.then((_) => {}).catch((error) => {});
    }
    Sound.music.playing = true;
  }
};
Sound.music.dom.addEventListener('ended', function () {
  Sound.music.play();
});
Sound.music.toggle.addEventListener('click', function () {
  if (Sound.music.enabled) {
    Sound.music.dom.pause();
    Sound.music.playing = false;
    this.classList.add('sound__music--disabled');
    Sound.music.enabled = false;
  } else if (Sound.music.playing == false) {
    this.classList.remove('sound__music--disabled');
    Sound.music.enabled = true;
    Sound.music.play();
    Sound.music.playing = true;
  }
});

document.addEventListener('click', function () {
  // Toggle sound on document click (since autoplay is not allowed)
  if (Sound.documentToggled) {
  } else {
    Sound.music.play();
    Sound.music.dom.volume = 0.3;
    Sound.documentToggled = true;
  }
});

Sound.music.board = function () {
  Sound.music.dom.src = 'music/board.mp3';
  Sound.music.volume = 0.7;
};
Sound.music.throneStart = function () {
  Sound.music.dom.currentTime = 18;
};

Sound.music.fadeOut = function () {
  // Fade out music function
  if (Sound.music.dom.paused == false) {
    // If music is playing
    Sound.music.fadeOutInterval = setInterval(function () {
      if (Sound.music.dom.volume > 0) {
        Sound.music.dom.volume += -0.05;
        Sound.music.dom.volume = Math.round(Sound.music.dom.volume * 100) / 100;
      } else {
        clearInterval(Sound.music.fadeOutInterval);
      }
    }, 30); // Every 50ms
  }
};

Sound.music.fadeIn = function () {
  // Fade in music function
  if (Sound.music.dom.paused == false) {
    // If music is playing
    Sound.music.fadeInInterval = setInterval(function () {
      //
      if (Sound.music.dom.volume < Sound.music.standardVolume) {
        Sound.music.dom.volume += 0.05;
        Sound.music.dom.volume = Math.round(Sound.music.dom.volume * 100) / 100;
      } else {
        clearInterval(Sound.music.fadeInInterval);
      }
    }, 30); // Every 50ms
  }
};

// Sound effects
Sound.sfx.btn = document.querySelectorAll('.btn--sfx');
for (i = 0; i < Sound.sfx.btn.length; i++) {
  Sound.sfx.btn[i].addEventListener('click', function () {
    Sound.sfx.click();
    Sound.sfx.play();
  });
}
Sound.sfx.play = function (fadeMusic = false) {
  if (Sound.sfx.enabled) {
    if (fadeMusic) {
      Sound.music.fadeOut();
      let promise = Sound.sfx.dom.play();
      if (promise !== undefined) {
        promise.then((_) => {}).catch((error) => {});
      }
      Sound.sfx.playing = true;
      Sound.sfx.dom.nearEnd = setInterval(function () {
        if (Sound.sfx.dom.currentTime > Sound.sfx.dom.duration * 0.75) {
          Sound.music.fadeIn();
          clearInterval(Sound.sfx.dom.nearEnd);
        }
      }, 10);
    } else {
      let promise = Sound.sfx.dom.play();
      if (promise !== undefined) {
        promise.then((_) => {}).catch((error) => {});
      }
      Sound.sfx.playing = true;
    }
  }
};
Sound.sfx.toggle.addEventListener('click', function () {
  // Toggle sfx play on click
  if (Sound.sfx.enabled) {
    Sound.sfx.dom.pause();
    Sound.voice.dom.pause();
    Sound.sfx.enabled = false;
    this.classList.add('sound__sfx--disabled');
  } else if (Sound.sfx.enabled == false) {
    Sound.sfx.enabled = true;
    this.classList.remove('sound__sfx--disabled');
  }
});
Sound.sfx.diceroll = function () {
  let randomSound = Math.floor(Math.random() * 6) + 1;
  if (randomSound == 1) {
    Sound.sfx.dicerollAudio = new Audio('sfx/ui/diceroll1.mp3');
  } else if (randomSound == 2) {
    Sound.sfx.dicerollAudio = new Audio('sfx/ui/diceroll2.mp3');
  } else if (randomSound == 3) {
    Sound.sfx.dicerollAudio = new Audio('sfx/ui/diceroll3.mp3');
  } else if (randomSound == 4) {
    Sound.sfx.dicerollAudio = new Audio('sfx/ui/diceroll4.mp3');
  } else if (randomSound == 5) {
    Sound.sfx.dicerollAudio = new Audio('sfx/ui/diceroll5.mp3');
  } else if (randomSound == 6) {
    Sound.sfx.dicerollAudio = new Audio('sfx/ui/diceroll6.mp3');
  }
  Sound.sfx.dicerollAudio.volume = 0.6;
  Sound.sfx.dicerollAudio.play();
};
Sound.sfx.select = function () {
  Sound.sfx.dom.src = 'sfx/ui/select.mp3';
  Sound.sfx.volume = 0.4;
};
Sound.sfx.click = function () {
  Sound.sfx.dom.src = 'sfx/ui/click.mp3';
  Sound.sfx.volume = 0.7;
};
Sound.sfx.pageShift = function () {
  Sound.sfx.dom.src = 'sfx/ui/pageshift.mp3';
  Sound.sfx.volume = 0.7;
};

/* Cards on characters page
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const Cards = {}; // Cards object
const P1 = {}; // Player 1 object
const P2 = {}; // Player 2 object
const charSelectBtn = document.querySelector('#charSelectBtn'); // Start game btn
// Cards.old = 'https://anapioficeandfire.com/api/characters?page=3&pageSize=10'; // Old api url
Cards.url = '../characters.json';

// Variables - player
const Characters = {};
const Player = {}; // Player object
Characters.page = document.getElementById('charactersPage');
P1.token = document.getElementById('playerOne');
P2.token = document.getElementById('playerTwo');
P1.num = 1;
P2.num = 2;
P1.pos = parseInt(
  document.getElementById('playerOne').getAttribute('data-tile'),
);
P2.pos = parseInt(
  document.getElementById('playerTwo').getAttribute('data-tile'),
);
Player.message = {};
P1.container = document.querySelector('#p1Container'); // Main container p1
P2.container = document.querySelector('#p2Container'); // Main container p2
P1.cardsContainer = document.querySelector('#p1Slider'); // Slider inside container p1
P2.cardsContainer = document.querySelector('#p2Slider'); // Slider inside container p2
P1.vs = document.querySelector('#vs1'); // p1 vs inside menu
P2.vs = document.querySelector('#vs2'); // p2 vs inside menu
P1.name = ''; // p1 placeholder for char name
P2.name = ''; // p2 placeholder for char name

// P1 highscores variables:
P1.thrown1 = 0; // Number of 1s thrown
P1.thrown2 = 0; // Number of 2s thrown
P1.thrown3 = 0; // Number of 3s thrown
P1.thrown4 = 0; // Number of 4s thrown
P1.thrown5 = 0; // Number of 5s thrown
P1.thrown6 = 0; // Number of 6s thrown
P1.totalThrows = 0; // Count dice rolls for highscore
P1.totalTraps = 0;
P1.totalBoosts = 0;
if (localStorage.getItem('p1wins') == null) {
  P1.totalWins = 0;
  localStorage.setItem('p1wins', P1.totalWins.toString());
} else {
  P1.totalWins = parseInt(localStorage.getItem('p1wins'));
}

// P2 highscores variables:
P2.thrown1 = 0; // Number of 1s thrown
P2.thrown2 = 0; // Number of 2s thrown
P2.thrown3 = 0; // Number of 3s thrown
P2.thrown4 = 0; // Number of 4s thrown
P2.thrown5 = 0; // Number of 5s thrown
P2.thrown6 = 0; // Number of 6s thrown
P2.totalThrows = 0; // Count dice rolls for highscore
P2.totalTraps = 0;
P2.totalBoosts = 0;
if (localStorage.getItem('p2wins') == null) {
  P2.totalWins = 0;
  localStorage.setItem('p2wins', P2.totalWins.toString());
} else {
  P2.totalWins = parseInt(localStorage.getItem('p2wins'));
}

// Variables - board

const Game = {};
Game.cpu = false;
Game.page = document.getElementById('gamePage');
Game.container = document.getElementById('gameContainer'); // Game container
Game.menu = document.getElementById('gameMenu'); // Game top menu
Game.overlay = document.getElementById('gameOverlay'); // Game right overlay
Game.tilesContainer = document.getElementById('gameTilesContainer');
Game.messageContainer = document.getElementById('messageContainer');
Game.waitTurn = false;
Game.started = false;
Game.ended = false;
Game.unecessaryInfo = false;
Game.trapsAreAllEnemies = false;
Game.traps = {
  // All traps
  dayne: {
    // * Dayne trap
    pos: 3, // Which tile the trap is on
    penalty: 'randomnegative', // Random negative value
    penaltyTo: -1, // from -1 to -2
    message: `tries to wield the <span data-trap="dayne">Greatsword of Dawn</span>, but gets injured, and steps back `,
    messageStyle: `<span data-trap="dayne">`,
    modclass: '--dayne',
    sfx: 'sfx/traps/dayne.mp3',
    friendlyTo: ['dayne', 'targaryen', 'greyjoy', 'martell'],
    allies: 'Targaryen, Greyjoy, Martell',
    enemies: 'Mormont, Dondarrion, Baratheon, Bolton, Stark',
    nemesis: 'Baelish',
    nemesisMessage: `met their nemesis: <span data-trap="dayne">Dayne House</span>, and flees `,
    friendlyBoost: [4, 5, 7],
    friendlyMessage: `wields the legendary <span data-trap="dayne">Greatsword of Dawn</span> and is rewarded with `,
  },
  martell: {
    // * Martell trap
    pos: 6, // Which tile the trap is on
    penalty: 'randomnegative', // Random negative value
    penaltyTo: -3, // from -1 to -2
    message: `is blinded by <span data-trap="martell">The Sun</span>,  trips and falls down `,
    messageStyle: `<span data-trap="martell">`,
    modclass: '--martell',
    sfx: 'sfx/traps/martell.mp3',
    friendlyTo: ['martell', 'targaryen', 'greyjoy', 'dayne'],
    allies: 'Targaryen, Greyjoy, Dayne',
    enemies: 'Mormont, Baelish, Baratheon, Bolton, Stark',
    nemesis: 'Dondarrion',
    nemesisMessage: `met their nemesis: <span data-trap="martell">The Martells</span>, and flees `,
    friendlyBoost: [7, 9, 10],
    friendlyMessage: `is filled with joy by <span data-trap="martell">The Sun</span> and prowdly walks `,
  },
  dondarrion: {
    // * Dondarrion trap
    pos: 8, // Which tile the trap is on
    penalty: 'randomnegative', // Random negative value
    penaltyTo: -1, // from -1 to -7
    message: `was struck by a <span data-trap="dondarrion">Forked Lightning</span>,  and falls `,
    messageStyle: `<span data-trap="dondarrion">`,
    modclass: '--dondarrion',
    sfx: 'sfx/traps/dondarrion.mp3', // Credits to: "Thunder, Very Close, Rain, A.wav" by InspectorJ (www.jshaw.co.uk) of Freesound.org"
    friendlyTo: ['dondarrion', 'bolton', 'baratheon'],
    allies: 'Bolton, Baratheon',
    enemies: 'Mormont, Baelish, Greyjoy, Targaryen, Stark',
    nemesis: 'Martell',
    nemesisMessage: `met their nemesis: <span data-trap="dondarrion">The Dondarrions</span>, and flees `,
    friendlyBoost: [9, 10, 12],
    friendlyMessage: `gets adrenaline by <span data-trap="dondarrion">Purple Lightning</span> and runs `,
  },
  baratheon: {
    // * Baratheon trap
    pos: 11, // Which tile the trap is on
    penalty: 'randomnegative', // Random negative value
    penaltyTo: -2, // from -1 to -10
    message: `was startled by a <span data-trap="baratheon">Black Stag</span>, and jumps `,
    messageStyle: `<span data-trap="baratheon">`,
    modclass: '--baratheon',
    sfx: 'sfx/traps/baratheon.mp3',
    friendlyTo: ['baratheon', 'dondarrion', 'bolton'],
    allies: 'Bolton, Dondarrion',
    enemies: 'Mormont, Baelish, GReyjoy, Stark, Martell',
    nemesis: 'Targaryen',
    nemesisMessage: `met their nemesis: <span data-trap="baratheon">Joffrey Baratheon</span>, and flees `,
    friendlyBoost: [12, 14, 15],
    friendlyMessage: `puts a crown on the <span data-trap="baratheon">Stag</span> and it lets him ride `,
  },
  targaryen: {
    // * Targaryen trap
    pos: 13, // Which tile the trap is on
    penalty: 'randomnegative', // Random negative value
    penaltyTo: -3, // from -1 to -10
    message: `was chased by <span data-trap="targaryen">Targaryen House</span>, and has to move back `,
    messageStyle: `<span data-trap="targaryen">`,
    modclass: '--targaryen',
    sfx: 'sfx/traps/targaryen.mp3',
    friendlyTo: ['targaryen', 'greyjoy', 'dayne'],
    allies: 'Martell, Greyjoy, Dayne',
    enemies: 'Mormont, Baelish, Dondarrion, Baratheon, Bolton',
    nemesis: 'Stark',
    nemesisMessage: `met their nemesis: <span data-trap="targaryen">The Targaryens</span>, and flees `,
    friendlyBoost: [14, 15, 18],
    friendlyMessage: `is home with <span data-trap="targaryen">Targaryen House</span> and is boosted by `,
  },
  mormont: {
    // * Mormont trap
    pos: 16, // Which tile the trap is on
    penalty: 'randomnegative', // Random negative value
    penaltyTo: -4, // from -1 to -15
    message: `was chased by <span data-trap="mormont">Bears</span>, and has to move back `,
    messageStyle: `<span data-trap="mormont">`,
    modclass: '--mormont',
    sfx: 'sfx/traps/mormont.mp3',
    friendlyTo: ['mormont', 'stark', 'baelish'],
    allies: 'Stark, Baelish',
    enemies: 'Dayne, Martell, Dondarrion, Baratheon, Bolton',
    nemesis: 'Greyjoy',
    nemesisMessage: `met their nemesis: <span data-trap="mormont">The Mormonts</span>, and flees `,
    friendlyBoost: [18],
    friendlyMessage: `feels at home at <span data-trap="mormont">Bear island</span> and rides a bear `,
  },
  greyjoy: {
    // * Greyjoy trap
    pos: 17, // Which tile the trap is on
    penalty: 'randomnegative', // Random negative value
    penaltyTo: -5, // from -1 to -15
    message: `gets attacked by <span data-trap="greyjoy">Kraken</span>,  and sinks `,
    messageStyle: `<span data-trap="greyjoy">`,
    modclass: '--greyjoy',
    sfx: 'sfx/traps/greyjoy.mp3',
    friendlyTo: ['greyjoy', 'martell', 'targaryen'],
    allies: 'Martell, Targaryen',
    enemies: 'Baelish, Dondarrion, Baratheon, Bolton, Stark',
    nemesis: 'Mormont',
    nemesisMessage: `met their nemesis: <span data-trap="greyjoy">The Greyjoys</span>, and flees `,
    friendlyBoost: [18, 20, 21],
    friendlyMessage: `is greeted by <span data-trap="greyjoy">Kraken</span>  as an ironborn, and swims `,
  },
  baelish: {
    // * Baelish trap
    pos: 22, // Which tile the trap is on
    penalty: 'randomnegative', // Random negative value
    penaltyTo: -4, // from -1 to -21
    message: `was distracted by <span data-trap="baelish">Mockingbirds</span>,  and falls `,
    messageStyle: `<span data-trap="baelish">`,
    modclass: '--baelish',
    sfx: 'sfx/traps/baelish.mp3',
    friendlyTo: ['baelish', 'mormont', 'stark'],
    allies: 'Mormont, Stark',
    enemies: 'Greyjoy, Martell, Dondarrion, Baratheon, Bolton',
    nemesis: 'Dayne',
    nemesisMessage: `met their nemesis: <span data-trap="baelish">Petyr Baelish</span>, and flees `,
    friendlyBoost: [23, 24, 26],
    friendlyMessage: `is guided by <span data-trap="baelish">Mockingbirds</span>  through a shortcut of `,
  },
  bolton: {
    // * Bolton trap
    pos: 25, // Which tile the trap is on
    penalty: 'randomnegative', // Random negative value
    penaltyTo: -4, // from -1 to -24
    message: `gets flayed at <span data-trap="bolton">Dreadfort</span>, and in awful pain stumbles `,
    messageStyle: `<span data-trap="bolton">`,
    modclass: '--bolton',
    sfx: 'sfx/traps/bolton.mp3',
    friendlyTo: ['bolton', 'baratheon', 'dondarrion'],
    allies: 'Baratheon, Dondarrion',
    enemies: 'Mormont, Baelish, Greyjoy, Targaryen, Martell',
    nemesis: 'Stark',
    nemesisMessage: `met their nemesis: <span data-trap="bolton">The Boltons</span>, and flees `,
    friendlyBoost: [28],
    friendlyMessage: `gains bloodlust at <span data-trap="bolton">Dreadfort</span>,  sees a victim and chases `,
  },
  stark: {
    // * Stark trap
    pos: 27, // Which tile the trap is on
    penalty: 'randomnegative', // Random negative value
    penaltyTo: -1, // from -1 to -26
    message: `hears howling <span data-trap="stark">Wolves</span>,  and retreats `,
    messageStyle: `<span data-trap="stark">`,
    modclass: '--stark',
    sfx: 'sfx/traps/stark.mp3',
    friendlyTo: ['stark', 'mormont', 'baelish'],
    allies: 'Mormont, Baelish',
    enemies: 'Dayne, Greyjoy, Martell, Dondarrion, Baratheon, Bolton',
    nemesis: 'Targaryen',
    nemesisMessage: `met their nemesis: <span data-trap="stark">The Starks</span>, and flees `,
    friendlyBoost: [28],
    friendlyMessage: `uses a sled of <span data-trap="stark">Wolves</span>  to cross `,
  },
  nightking: {
    // * Nightking trap
    pos: 29,
    penalty: 'randomnegative', // Random negative value
    penaltyTo: -20, // from - 1 to - 18
    message: `ran into the <span data-trap="nightking">Night King</span>, and has to run `,
    messageStyle: `<span data-trap="nightking">`,
    modclass: '--nightking',
    friendlyTo: [''],
    friendlyBoost: [30],
    sfx: 'sfx/traps/nightking.mp3',
    friendlyMessage: `is bowed down to by the <span data-trap="nightking">Nightking</span>  and wins with `,
  },
  melisandre: {
    // * Melisandre trap
    pos: 19,
    penalty: 'random', // Random positive or negative number
    penaltyFrom: 18, // from negative
    penaltyTo: 7, // to positive
    message: `was struck by <span data-trap="melisandre">Melisandre's</span> shadow magic. And escapes by `,
    messageStyle: `<span data-trap="melisandre">`,
    modclass: '--melisandre',
    sfx: 'sfx/traps/melisandre.mp3',
    friendlyTo: [''],
    friendlyBoost: [23, 24],
    friendlyMessage: `is carried by <span data-trap="melisandre">Melisandre's</span> magic  and flies `,
  },
};
Game.trapsBackup = JSON.parse(JSON.stringify(Game.traps));
Game.trapsArray = Object.values(Game.traps);
Game.messageDuration = 800; // 1s

Cpu = {};
Cpu.range = document.getElementById('cpuRange');
Cpu.value = document.getElementById('cpuValue');
Cpu.value.innerHTML = `<span data-rangestyle="playstyle-1">Pass device</span><br>- Two players play against eachother, passing the device when it is their turn.`;
Cpu.range.oninput = function () {
  if (Cpu.range.value == 1) {
    Cpu.value.innerHTML = `<span data-rangestyle="playstyle-1">Pass device</span><br>- Two players play against eachother, passing the device when it is their turn.`;
    Game.cpu = false;
  } else if (Cpu.range.value == 2) {
    Cpu.value.innerHTML = `<span data-rangestyle="playstyle-2">Against CPU</span><br>- One player (you), takes on a game against your own device.`;
    Game.cpu = true;
  }
};

// Variables - dice
var Dice = {}; // Dice object
Dice.btn = document.getElementById('rollDiceBtn');
Dice.theDice = document.getElementById('dice');
Dice.roller = document.getElementById('roller');
Dice.roll = function () {
  Sound.sfx.diceroll();
  Dice.roller.style.transform =
    'translateY(' +
    (Math.floor(Math.random() * 20) + 1) +
    'vh)' +
    ' rotate(' +
    (Math.floor(Math.random() * 360) - 360) +
    'deg)' +
    ' translateX(' +
    (Math.floor(Math.random() * 10) + 1) +
    'vw)';
};
Dice.rolled;
Dice.reroll = false; // Set default reroll to false

// Variables - results
var Results = {};
Results.winner = {};
Results.loser = {};
Results.winner.container = document.getElementById('resultsWinner');
Results.winner.highscore = document.getElementById('highscoreWinner');
Results.loser.container = document.getElementById('resultsLoser');
Results.loser.highscore = document.getElementById('highscoreLoser');
Results.page = document.querySelector('#resultsPage');
Results.revealed = false;
Results.throneContainer = document.getElementById('throneContainer');
Results.playAgain = document.getElementById('playAgainBtn');
Results.reveal = function () {
  if (
    Game.ended == true &&
    Results.page.classList.contains('results--notready')
  ) {
    Results.page.classList.add('results--ready');
    Results.page.classList.remove('results--notready');
    Game.page.classList.remove('game--started');
    Game.page.classList.add('game--notstarted');
  }
};

fetch(Cards.url) // Fetch the url
  .then((response) => {
    // Response as argument
    return response.json(); // Parse response as JSON
  })
  .then((char) => {
    // Then take the parsed JSON

    Characters.all = {
      eddard: char[338], // Eddard Stark
      lyanna: char[666], // Lyanna Mormont
      balon: char[11], // Balon Greyjoy
      beric: char[189], // Beric Dondarrion
      arthur: char[141], // Arthur Dayne
      ramsay: char[848], // Ramsay Snow
      oberyn: char[1766], // Oberyn Nymeros Martell
      daenerys: char[270], // Daenerys Targaryen
      robert: char[900], // Robert I Baratheon
      petyr: char[822], // Petyr Baelish
    };

    // Character houses
    Characters.all.eddard.house = 'Stark';
    Characters.all.lyanna.house = 'Mormont';
    Characters.all.balon.house = 'Greyjoy';
    Characters.all.beric.house = 'Dondarrion';
    Characters.all.arthur.house = 'Dayne';
    Characters.all.ramsay.house = 'Bolton';
    Characters.all.oberyn.house = 'Martell';
    Characters.all.daenerys.house = 'Targaryen';
    Characters.all.robert.house = 'Baratheon';
    Characters.all.petyr.house = 'Baelish';

    // Character allies
    Characters.all.eddard.allies = Game.traps.stark.allies;
    Characters.all.lyanna.allies = Game.traps.mormont.allies;
    Characters.all.balon.allies = Game.traps.greyjoy.allies;
    Characters.all.beric.allies = Game.traps.dondarrion.allies;
    Characters.all.arthur.allies = Game.traps.dayne.allies;
    Characters.all.ramsay.allies = Game.traps.bolton.allies;
    Characters.all.oberyn.allies = Game.traps.martell.allies;
    Characters.all.daenerys.allies = Game.traps.targaryen.allies;
    Characters.all.robert.allies = Game.traps.baratheon.allies;
    Characters.all.petyr.allies = Game.traps.baelish.allies;

    // Character enemies
    Characters.all.eddard.enemies = Game.traps.stark.enemies;
    Characters.all.lyanna.enemies = Game.traps.mormont.enemies;
    Characters.all.balon.enemies = Game.traps.greyjoy.enemies;
    Characters.all.beric.enemies = Game.traps.dondarrion.enemies;
    Characters.all.arthur.enemies = Game.traps.dayne.enemies;
    Characters.all.ramsay.enemies = Game.traps.bolton.enemies;
    Characters.all.oberyn.enemies = Game.traps.martell.enemies;
    Characters.all.daenerys.enemies = Game.traps.targaryen.enemies;
    Characters.all.robert.enemies = Game.traps.baratheon.enemies;
    Characters.all.petyr.enemies = Game.traps.baelish.enemies;

    // Character nemesis
    Characters.all.eddard.nemesis = Game.traps.stark.nemesis;
    Characters.all.lyanna.nemesis = Game.traps.mormont.nemesis;
    Characters.all.balon.nemesis = Game.traps.greyjoy.nemesis;
    Characters.all.beric.nemesis = Game.traps.dondarrion.nemesis;
    Characters.all.arthur.nemesis = Game.traps.dayne.nemesis;
    Characters.all.ramsay.nemesis = Game.traps.bolton.nemesis;
    Characters.all.oberyn.nemesis = Game.traps.martell.nemesis;
    Characters.all.daenerys.nemesis = Game.traps.targaryen.nemesis;
    Characters.all.robert.nemesis = Game.traps.baratheon.nemesis;
    Characters.all.petyr.nemesis = Game.traps.baelish.nemesis;

    // Characters sound object
    Characters.all.eddard.sfx = {};
    Characters.all.lyanna.sfx = {};
    Characters.all.balon.sfx = {};
    Characters.all.beric.sfx = {};
    Characters.all.arthur.sfx = {};
    Characters.all.ramsay.sfx = {};
    Characters.all.oberyn.sfx = {};
    Characters.all.daenerys.sfx = {};
    Characters.all.robert.sfx = {};
    Characters.all.petyr.sfx = {};

    // Characters name sfx
    Characters.all.eddard.sfx.name = 'sfx/names/eddard.mp3';
    Characters.all.lyanna.sfx.name = 'sfx/names/lyanna.mp3';
    Characters.all.balon.sfx.name = 'sfx/names/balon.mp3';
    Characters.all.beric.sfx.name = 'sfx/names/beric.mp3';
    Characters.all.arthur.sfx.name = 'sfx/names/arthur.mp3';
    Characters.all.ramsay.sfx.name = 'sfx/names/ramsay.mp3';
    Characters.all.oberyn.sfx.name = 'sfx/names/oberyn.mp3';
    Characters.all.daenerys.sfx.name = 'sfx/names/daenerys.mp3';
    Characters.all.robert.sfx.name = 'sfx/names/robert.mp3';
    Characters.all.petyr.sfx.name = 'sfx/names/petyr.mp3';

    // Quotes
    if (localStorage.getItem('daenerysQuotes')) {
    } else {
      localStorage.setItem('daenerysQuotes', '0');
    }
    if (localStorage.getItem('eddardQuotes')) {
    } else {
      localStorage.setItem('eddardQuotes', '0');
    }
    if (localStorage.getItem('lyannaQuotes')) {
    } else {
      localStorage.setItem('lyannaQuotes', '0');
    }
    if (localStorage.getItem('balonQuotes')) {
    } else {
      localStorage.setItem('balonQuotes', '0');
    }
    if (localStorage.getItem('bericQuotes')) {
    } else {
      localStorage.setItem('bericQuotes', '0');
    }
    if (localStorage.getItem('arthurQuotes')) {
    } else {
      localStorage.setItem('arthurQuotes', '0');
    }
    if (localStorage.getItem('petyrQuotes')) {
    } else {
      localStorage.setItem('petyrQuotes', '0');
    }
    if (localStorage.getItem('ramsayQuotes')) {
    } else {
      localStorage.setItem('ramsayQuotes', '0');
    }
    if (localStorage.getItem('oberynQuotes')) {
    } else {
      localStorage.setItem('oberynQuotes', '0');
    }

    Characters.all.eddard.quotes = [
      'A mad man sees what he sees.',
      'You send hired knives to kill... and still quibble about honor?',
      'The man who passes the sentence should swing the sword.',
      "I don't fight in tournaments because when I fight a man for real, I don't want him to know what I can do.",
      'Winter is coming.',
      'I will have no part in it. And good luck to him. I thought you were a better man.',
      'War was easier than daughters...',
      'I, Eddard of the House Stark, Lord of Winterfell and Warden of the North, sentence you to die.',
    ];
    Characters.all.lyanna.quotes = [
      'I might be small, Lord Glover, and I might be a girl. But I am every bit as much a Northerner as you.',
      "We are not a large house, but we're a proud one.",
      '..every man from Bear Island fights with the strength of ten mainlanders.',
      'House Mormont has kept faith with House Stark for 1,000 years. We will not break faith today.',
      "And I don't need your permission to defend the North.",
    ];
    Characters.all.balon.quotes = [
      'What kind of an Ironborn loses his senses during a storm?',
      'The ironborn will reave and pillage, as it was in the old days',
      "Was it Ned Stark's pleasure to make you his daughter?",
      'When you rule the Iron Islands, you can wage all the peace you want.',
      'No man gives me a crown. I pay the iron price. I will take my crown!',
      'We do not plow the fields or toil the mine. We take what is ours',
      "We do not sow. We are ironborn. We're not subjects. We're not slaves.",
      'Your time with the wolves has made you weak.',
    ];
    Characters.all.beric.quotes = [
      'Death is the enemy, the first enemy and the last',
      'Thoros has brought me back six times, we both serve the same Lord',
      "The Lord of Light isn't done with you yet!",
      "Second time I've been killed by a Clegane",
      "Forgive my manners, I don't see many ladies these days",
      'We serve the Lord of Light, and the Lord of Light needs that boy',
      'I sentence you to trial by combat',
      "We can defend those who can't defend themeselves",
    ];
    Characters.all.arthur.quotes = [
      'Our knees do not bend easily.',
      'And now it begins.',
      'Then you shall have it, ser.',
      'All knights must bleed, Jaime. Blood is the seal of our devotion.',
      'I wish you good fortune in the wars to come.',
    ];
    Characters.all.ramsay.quotes = [
      'If you think this has a happy ending, you haven’t been paying attention.',
      'Let’s play a game: which body part do you need the least?',
      'This isn’t happening to you for a reason. Well, one reason. I enjoy it.',
      'This is mercy. I’m not killing you. Just making a few…alterations.',
      'Jealousy bores me. You remember what happens to people who bore me.',
    ];
    Characters.all.oberyn.quotes = [
      'Longsword is a bad option in close quarters.',
      "I'm going to kill that.",
      'I will be your champion!',
      "You're saying you need us? That must be hard for you to admit.",
      "May I tell you a secret? You're not a golden lion. You're just a pink little man, who is far too slow on the draw.",
      'Today is not the day I die.',
      "Wait, are you dying? No, no, no. You can't die yet. You haven't confessed.",
    ];
    Characters.all.daenerys.quotes = [
      'They can live in my new world, or they can die in their old one.',
      'I have never been nothing. I am the blood of the dragon.',
      'I will answer injustice with justice.',
      'My reign has just begun.',
      'I will take what is mine with fire and blood.',
      'Yes, all men must die. But we are not men.',
    ];
    Characters.all.robert.quotes = [
      "I swear to you, I was never so alive as when I was winning this throne, or so dead as now that I've won it.",
      'Swear one now, or lose that stubborn head of yours.',
      'Fat? Fat, is it? Is that how you speak to your king? Ah, damn you, Ned, why are you always right?',
      'I will not kill a man for loyalty, nor for fighting well.',
    ];
    Characters.all.petyr.quotes = [
      'I did warn you not to trust me, you know.',
      'Always keep your foes confused',
      "Chaos isn't a pit. Chaos is a ladder",
      "What we don't know is what actually gets us  killed.",
      'Gold wins wars, not soldiers.',
      'The future is all that is worth discussing.',
    ];
    Cards.charArray = Object.values(Characters.all);
    Cards.creator(Cards.charArray, P1, 'p1');
    Cards.creator(Cards.charArray, P2, 'p2');
    console.log(
      '%c Character objects table for debugging:',
      'font-weight:bold;',
    );
    console.table(Cards.charArray);
  });

/* Create cards
–––––––––––––––––––––––––––––––––––––––––––––––––– */
Cards.clear = function () {
  P1.cardsContainer.innerHTML = '';
  P2.cardsContainer.innerHTML = '';
};
Cards.creator = function (characters, playerobject, playerid) {
  for (i = 0; i < characters.length; i++) {
    // Cards
    /*
        Cards are label elements
        the labels are used to select radio inputs
        to only allow selection of one */

    // Create elements
    playerobject.card = document.createElement('label'); // Card
    playerobject.cardinner = document.createElement('div');
    playerobject.radio = document.createElement('input'); // Radio inputs
    playerobject.chargender = document.createElement('p');
    playerobject.charname = document.createElement('p');
    playerobject.charallies = document.createElement('p');
    playerobject.charenemies = document.createElement('p');
    playerobject.charnemesis = document.createElement('p');
    if (Game.unecessaryInfo == true) {
      playerobject.chartitles = document.createElement('p');
      playerobject.charborn = document.createElement('p');
      playerobject.chardied = document.createElement('p');
      playerobject.charculture = document.createElement('p');
      playerobject.charaliases = document.createElement('p');
    }

    // Set attributes and classes
    playerobject.card.classList.add(playerid + '__card'); // Player class
    playerobject.cardinner.classList.add('card'); // Generic card class
    playerobject.card.setAttribute('for', playerid + '-' + [i]); // Controls id
    playerobject.radio.setAttribute('id', playerid + '-' + [i]); // Radio id
    playerobject.radio.setAttribute('type', 'radio'); // Radio type
    playerobject.radio.setAttribute('name', playerid); // Radio group name
    playerobject.radio.classList.add(playerid + '__radio'); // Radio class

    if (characters[i].sfx == '') {
    } else {
      playerobject.radio.setAttribute('data-sfx', characters[i].sfx.name);
    }

    if (characters[i].house == '') {
    } else {
      playerobject.radio.setAttribute(
        'data-house',
        characters[i].house.toLowerCase(),
      );
    }

    // Load names and get names on click
    if (characters[i].Name == '') {
    } else {
      // If character name exists
      playerobject.charname.classList.add('card__name');
      playerobject.charname.innerHTML =
        `<span>` + characters[i].Name + `</span>`;
      playerobject.radio.setAttribute('value', characters[i].Name); // Set name as value on radio input
      playerobject.cardinner.appendChild(playerobject.charname);
      playerobject.radio.addEventListener('click', function () {
        playerobject.name = this.value;
        playerobject.allies =
          Game.traps[this.getAttribute('data-house')].friendlyTo;
        playerobject.house = this.getAttribute('data-house');
        let house = this.getAttribute('data-house');
        let player = playerid;
        playerobject.sfx = this.getAttribute('data-sfx');
        Sound.voice.dom.src = this.getAttribute('data-sfx');
        Sound.voice.dom.volume = 0.4;
        Sound.sfx.select();
        Sound.sfx.play();
        Sound.voice.play();
        Sound.music.play();
        document.getElementById(player + 'house').classList = '';
        document
          .getElementById(player + 'house')
          .classList.add(player + '--' + house.toLowerCase());
        if (Game.cpu == true) {
          if (playerid == 'p2') {
            playerobject.vs.innerHTML =
              `<span>` + playerobject.name + ` (CPU) </span>`; // Set vs name
          } else {
            playerobject.vs.innerHTML =
              `<span>` + playerobject.name + `</span>`; // Set vs name
          }
        } else {
          playerobject.vs.innerHTML = `<span>` + playerobject.name + `</span>`; // Set vs name
        }
        changeBtnStyle();
      });
    }
    if (characters[i].IsFemale == false) {
      playerobject.chargender.classList.add('card__gender');
      playerobject.chargender.innerHTML = `<span data-type="label">♂</span><span data-type="info">Male</span>`;
      playerobject.cardinner.appendChild(playerobject.chargender);
    } else if (characters[i].IsFemale == true) {
      playerobject.chargender.classList.add('card__gender');
      playerobject.chargender.innerHTML = `<span data-type="label">♀</span><span data-type="info">Female</span>`;
      playerobject.cardinner.appendChild(playerobject.chargender);
    }
    if (Game.insaneMode == true) {
      if (characters[i].allies !== '') {
        playerobject.charallies.innerHTML =
          `<span data-type="label">Allies:</span>` +
          `<span data-type="info"> None </span>`;
        playerobject.cardinner.appendChild(playerobject.charallies);
      }
      if (characters[i].nemesis !== '') {
        playerobject.charnemesis.innerHTML =
          `<span data-type="label">Nemesis:</span>` +
          `<span data-type="info"><span data-trap="nightking">The Nightking</span></span>`;
        playerobject.cardinner.appendChild(playerobject.charnemesis);
      }
    } else if (Game.childlikeMode == true) {
      if (characters[i].allies !== '') {
        playerobject.charallies.innerHTML =
          `<span data-type="label">Allies:</span>` +
          `<span data-type="info"> Everyone! <3 </span>`;
        playerobject.cardinner.appendChild(playerobject.charallies);
      }
      if (characters[i].nemesis !== '') {
        playerobject.charnemesis.innerHTML =
          `<span data-type="label">Nemesis:</span>` +
          `<span data-type="info"> No enemies, only playmates! <3 </span>`;
        playerobject.cardinner.appendChild(playerobject.charnemesis);
      }
    } else if (Game.insaneChildMode == true) {
      if (characters[i].allies !== '') {
        playerobject.charallies.innerHTML =
          `<span data-type="label">Allies:</span>` +
          `<span data-type="info"> Everyone! <3 </span>`;
        playerobject.cardinner.appendChild(playerobject.charallies);
      }
      if (characters[i].nemesis !== '') {
        playerobject.charnemesis.innerHTML =
          `<span data-type="label">Best friend:</span>` +
          `<span data-type="info"> Nighty King <3</span>`;
        playerobject.cardinner.appendChild(playerobject.charnemesis);
      }
    } else {
      if (characters[i].allies !== '') {
        playerobject.charallies.innerHTML =
          `<span data-type="label">Allies:</span>` +
          `<span data-type="info">` +
          characters[i].allies +
          `</span>`;
        playerobject.cardinner.appendChild(playerobject.charallies);
      }
      // if(characters[i].enemies !== '') {
      //     playerobject.charenemies.innerHTML =
      //         `<span data-type="label">Enemies:</span>` +
      //         `<span data-type="info">` +
      //         characters[i].enemies +
      //         `</span>`;
      //         playerobject.cardinner.appendChild(playerobject.charenemies);
      // }
      if (characters[i].nemesis !== '') {
        playerobject.charnemesis.innerHTML =
          `<span data-type="label">Nemesis:</span>` +
          `<span data-type="info">` +
          characters[i].nemesis +
          `</span>`;
        playerobject.cardinner.appendChild(playerobject.charnemesis);
      }
    }
    if (Game.unecessaryInfo == true) {
      if (characters[i].Titles.length == 1) {
        // If only 1 title
        playerobject.chartitles.classList.add('card__titles');
        playerobject.chartitles.innerHTML =
          `<span data-type="label">♔</span>` +
          `<span data-type="info">` +
          characters[i].Titles +
          `</span>`;
        playerobject.cardinner.appendChild(playerobject.chartitles);
      } else if (characters[i].Titles.length > 1) {
        // If more than 1 title
        playerobject.chartitles.classList.add('card__titles');
        playerobject.chartitles.innerHTML =
          `<span data-type="label">♔</span>` +
          `<span data-type="info">` +
          characters[i].Titles[
            Math.round(Math.random() * (characters[i].Titles.length - 1))
          ] +
          `</span>`; // Get 1 random title
        playerobject.cardinner.appendChild(playerobject.chartitles);
      }
      if (characters[i].Aliases.length == 1) {
        // If only 1 title
        playerobject.charaliases.classList.add('card__titles');
        playerobject.charaliases.innerHTML =
          `<span data-type="label">♜</span>` +
          `<span data-type="info">` +
          characters[i].Aliases +
          `</span>`;
        playerobject.cardinner.appendChild(playerobject.charaliases);
      } else if (characters[i].Aliases.length > 1) {
        // If more than 1 title
        playerobject.charaliases.classList.add('card__titles');
        playerobject.charaliases.innerHTML =
          `<span data-type="label">♜</span>` +
          `<span data-type="info">` +
          characters[i].Aliases[
            Math.round(Math.random() * (characters[i].Aliases.length - 1))
          ] +
          `</span>`; // Get 1 random title
        playerobject.cardinner.appendChild(playerobject.charaliases);
      }
      if (characters[i].Born == '') {
      } else {
        // If character name exists
        playerobject.charborn.classList.add('card__born');
        playerobject.charborn.innerHTML =
          `<span data-type="label">♥︎</span>` +
          `<span data-type="info">` +
          characters[i].Born +
          `</span>`;
        playerobject.cardinner.appendChild(playerobject.charborn);
      }
      if (characters[i].Died == '') {
      } else {
        // If character name exists
        playerobject.chardied.classList.add('card__died');
        playerobject.chardied.innerHTML =
          `<span data-type="label">✝︎</span>` +
          `<span data-type="info">` +
          characters[i].Died +
          `</span>`;
        playerobject.cardinner.appendChild(playerobject.chardied);
      }
      if (characters[i].Culture == '') {
      } else {
        // If character name exists
        playerobject.charculture.classList.add('card__culture');
        playerobject.charculture.innerHTML =
          `<span data-type="label">☗</span>` +
          `<span data-type="info">` +
          characters[i].Culture +
          `</span>`;
        playerobject.cardinner.appendChild(playerobject.charculture);
      }
    }
    playerobject.card.appendChild(playerobject.cardinner);
    playerobject.cardsContainer.appendChild(playerobject.radio); // Add radio to container
    playerobject.cardsContainer.appendChild(playerobject.card); // Add card to container
  }
};

let changeBtnStyle = function () {
  if (P1.name !== P2.name) {
    if (P1.name !== '' && P2.name !== '') {
      charSelectBtn.classList.add('characters__start--bothselected');
    }
  } else if (
    charSelectBtn.classList.contains('characters__start--bothselected')
  ) {
    charSelectBtn.classList.remove('characters__start--bothselected');
  }
};

/* Select cards
–––––––––––––––––––––––––––––––––––––––––––––––––– */
charSelectBtn.addEventListener('click', function () {
  if (P1.name !== '' || P2.name !== '') {
    // If any player picked
    if (P1.name == P2.name) {
      // Same picked
      Modal.sameChar();
    } else if (P1.name == '' && P2.name !== '') {
      // Missing p1
      Modal.missingChar('p1');
    } else if (P1.name !== '' && P2.name == '') {
      // Missing p2
      Modal.missingChar('p2');
    } else {
      // all good
      Modal.startGame();
    }
  } else if (P1.name == '' && P2.name == '') {
    // Both players missing
    Modal.missingChar('both');
  }
});

/* Modals
–––––––––––––––––––––––––––––––––––––––––––––––––– */
Modal.sameChar = function () {
  // Create elements
  Modal.header = document.createElement('h1'); // Standard header element
  Modal.paragraph = document.createElement('p'); // Standard paragraph element
  Modal.choiceBtn = document.createElement('a'); // Standard modal button
  // Add classes
  Modal.header.classList.add('modal__h1');
  Modal.paragraph.classList.add('modal__p');
  Modal.choiceBtn.classList.add('btn');
  Modal.choiceBtn.classList.add('btn--1');
  if (
    document
      .getElementById('charSelectionMessage')
      .classList.contains('modal--2')
  ) {
    document
      .getElementById('charSelectionMessage')
      .classList.remove('modal--2');
  } else if (
    document
      .getElementById('charSelectionMessage')
      .classList.contains('modal--1')
  ) {
    document
      .getElementById('charSelectionMessage')
      .classList.remove('modal--1');
  }
  // Add content
  document.getElementById('charSelectionMessage').classList.add('modal--both');
  Modal.header.innerHTML = `A <span data-player='1'>house</span> divided against <span data-player='2'>itself</span> cannot stand`;
  if (Game.cpu == true) {
    Modal.paragraph.innerHTML =
      'You cannot both be: ' +
      `<span data-player='1'><strong>` +
      P2.name +
      ' (CPU) </strong></span>';
  } else {
    Modal.paragraph.innerHTML =
      'You cannot both be: ' +
      `<span data-player='1'><strong>` +
      P2.name +
      '</strong></span>';
  }
  Modal.choiceBtn.textContent = 'Go back';
  Modal.choiceBtn.setAttribute('data-modal-close', 'charSelectionMessage');
  Modal.choiceBtn.addEventListener('click', function (e) {
    Modal.hide('charSelectionMessage');
    Sound.sfx.click();
    Sound.sfx.play();
    e.stopPropagation();
  });
  // Append elements
  Modal.append('#charSelectionMessage .modal__content', Modal.header);
  Modal.append('#charSelectionMessage .modal__content', Modal.paragraph);
  Modal.append('#charSelectionMessage .modal__content', Modal.choiceBtn);
};
Modal.missingChar = function (missing) {
  if (missing == 'p1') {
    // missing p1
    // Create elements
    Modal.header = document.createElement('h1'); // Standard header element
    Modal.paragraph = document.createElement('p'); // Standard paragraph element
    Modal.choiceBtn = document.createElement('a'); // Standard modal button
    // Add classes
    Modal.header.classList.add('modal__h1');
    Modal.paragraph.classList.add('modal__p');
    Modal.choiceBtn.classList.add('btn');
    Modal.choiceBtn.classList.add('btn--1');
    if (
      document
        .getElementById('charSelectionMessage')
        .classList.contains('modal--2')
    ) {
      document
        .getElementById('charSelectionMessage')
        .classList.remove('modal--2');
    } else if (
      document
        .getElementById('charSelectionMessage')
        .classList.contains('modal--1')
    ) {
      document
        .getElementById('charSelectionMessage')
        .classList.remove('modal--1');
    }
    document.getElementById('charSelectionMessage').classList.add('modal--2');
    // Add content
    Modal.header.innerHTML =
      `Will noone keep <span data-player='2'> The ` +
      capitalizeFirstLetter(P2.house) +
      `'s </span> off the throne?`;
    Modal.paragraph.innerHTML =
      `Please select a character for: ` + `<b data-player='1'> player one </b>`;
    Modal.choiceBtn.textContent = 'Go back';
    Modal.choiceBtn.setAttribute('data-modal-close', 'charSelectionMessage');
    Modal.choiceBtn.addEventListener('click', function (e) {
      Modal.hide('charSelectionMessage');
      Sound.sfx.click();
      Sound.sfx.play();
      e.stopPropagation();
    });
    // Append elements
    Modal.append('#charSelectionMessage .modal__content', Modal.header);
    Modal.append('#charSelectionMessage .modal__content', Modal.paragraph);
    Modal.append('#charSelectionMessage .modal__content', Modal.choiceBtn);
  } else if (missing == 'p2') {
    // missing p2
    // Create elements
    Modal.header = document.createElement('h1'); // Standard header element
    Modal.paragraph = document.createElement('p'); // Standard paragraph element
    Modal.choiceBtn = document.createElement('a'); // Standard modal button
    // Add classes
    Modal.header.classList.add('modal__h1');
    Modal.paragraph.classList.add('modal__p');
    Modal.choiceBtn.classList.add('btn');
    Modal.choiceBtn.classList.add('btn--2');
    if (
      document
        .getElementById('charSelectionMessage')
        .classList.contains('modal--2')
    ) {
      document
        .getElementById('charSelectionMessage')
        .classList.remove('modal--2');
    } else if (
      document
        .getElementById('charSelectionMessage')
        .classList.contains('modal--1')
    ) {
      document
        .getElementById('charSelectionMessage')
        .classList.remove('modal--1');
    }
    document.getElementById('charSelectionMessage').classList.add('modal--1');
    // Add content
    Modal.header.innerHTML =
      `Will noone keep <span data-player='1'> The ` +
      capitalizeFirstLetter(P1.house) +
      `'s </span> off the throne?`;
    Modal.paragraph.innerHTML =
      `Please select a character for: ` + `<b data-player='2'> player two </b>`;
    Modal.choiceBtn.textContent = 'Go back';
    Modal.choiceBtn.setAttribute('data-modal-close', 'charSelectionMessage');
    Modal.choiceBtn.addEventListener('click', function (e) {
      Modal.hide('charSelectionMessage');
      Sound.sfx.click();
      Sound.sfx.play();
      e.stopPropagation();
    });
    // Append elements
    Modal.append('#charSelectionMessage .modal__content', Modal.header);
    Modal.append('#charSelectionMessage .modal__content', Modal.paragraph);
    Modal.append('#charSelectionMessage .modal__content', Modal.choiceBtn);
  } else if (missing == 'both') {
    // missing both
    // Create elements
    Modal.header = document.createElement('h1'); // Standard header element
    Modal.paragraph = document.createElement('p'); // Standard paragraph element
    Modal.choiceBtn = document.createElement('a'); // Standard modal button
    // Add classes
    Modal.header.classList.add('modal__h1');
    Modal.paragraph.classList.add('modal__p');
    Modal.choiceBtn.classList.add('btn');
    document.getElementById('charSelectionMessage').classList.add('modal--1');
    // Add content
    Modal.header.innerHTML = `No characters have been selected.`;
    Modal.paragraph.innerHTML = `Please go back and select characters to play the game.`;
    Modal.choiceBtn.textContent = 'Go back';
    Modal.choiceBtn.setAttribute('data-modal-close', 'charSelectionMessage');
    Modal.choiceBtn.addEventListener('click', function (e) {
      Modal.hide('charSelectionMessage');
      Sound.sfx.click();
      Sound.sfx.play();
      e.stopPropagation();
    });
    // Append elements
    Modal.append('#charSelectionMessage .modal__content', Modal.header);
    Modal.append('#charSelectionMessage .modal__content', Modal.paragraph);
    Modal.append('#charSelectionMessage .modal__content', Modal.choiceBtn);
  }
};
Modal.startGame = function () {
  // Create elements
  Modal.header = document.createElement('h1'); // Standard header element
  Modal.paragraph = document.createElement('p'); // Standard paragraph element
  Modal.choiceBtn = document.createElement('a'); // Standard modal button
  Modal.actionBtn = document.createElement('a'); // Standard modal button
  // Add classes
  Modal.header.classList.add('modal__h1');
  Modal.paragraph.classList.add('modal__p');
  Modal.choiceBtn.classList.add('btn');
  Modal.actionBtn.classList.add('btn');
  Modal.choiceBtn.classList.add('btn--sfx');
  if (
    document
      .getElementById('charSelectionMessage')
      .classList.contains('modal--2')
  ) {
    document
      .getElementById('charSelectionMessage')
      .classList.remove('modal--2');
  } else if (
    document
      .getElementById('charSelectionMessage')
      .classList.contains('modal--1')
  ) {
    document
      .getElementById('charSelectionMessage')
      .classList.remove('modal--1');
  }
  if (
    document
      .getElementById('charSelectionMessage')
      .classList.contains('modal--both')
  ) {
    document
      .getElementById('charSelectionMessage')
      .classList.remove('modal--both');
  }
  document.getElementById('charSelectionMessage').classList.add('modal--play');
  // Add content
  if (Game.cpu == true) {
    Modal.header.innerHTML =
      `<span data-player='1'>` +
      P1.name +
      `</span>` +
      `<span class="modal__vs">VS</span> ` +
      `<span data-player='2'>` +
      P2.name +
      ` (CPU) </span>`;
  } else {
    Modal.header.innerHTML =
      `<span data-player='1'>` +
      P1.name +
      `</span>` +
      `<span class="modal__vs">VS</span> ` +
      `<span data-player='2'>` +
      P2.name +
      `</span>`;
  }

  Modal.paragraph.innerHTML =
    'Game is ready to start. <br>Press play game to start the game, <br>or press to switch characters.';
  Modal.choiceBtn.classList.add('btn');
  Modal.choiceBtn.textContent = 'Switch characters';
  Modal.choiceBtn.setAttribute('data-modal-close', 'charSelectionMessage');
  Modal.actionBtn.classList.add('btn--both');
  Modal.choiceBtn.addEventListener('click', function (e) {
    Modal.hide('charSelectionMessage');
    Sound.sfx.click();
    Sound.sfx.play();
    e.stopPropagation();
  });
  Modal.actionBtn.addEventListener('click', function (e) {
    Modal.actionBtn.classList.remove('btn--both');
    Modal.hide('charSelectionMessage');
    Game.start();
    Sound.sfx.pageShift();
    Sound.sfx.play(true);
    Sound.music.board();
    Sound.music.play();
    e.stopPropagation();
  });
  Modal.actionBtn.innerHTML = `<span>Play game</span>`;
  // Append elements
  Modal.append('#charSelectionMessage .modal__content', Modal.header);
  Modal.append('#charSelectionMessage .modal__content', Modal.paragraph);
  Modal.append('#charSelectionMessage .modal__content', Modal.actionBtn);
  Modal.append('#charSelectionMessage .modal__content', Modal.choiceBtn);
};

/* Slider
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const characterPage = document.querySelector('#charactersPage');
P1.slider = {};
P2.slider = {};
P1.slider.container = document.querySelector('#p1Slider');
P2.slider.container = document.querySelector('#p2Slider');
// Instructions
const Instructions = {};
Instructions.drag = document.getElementById('dragInstruction');
Instructions.dragging = false;
Instructions.showGif = function () {
  document.getElementById('instructionsImg').src = 'img/ui/instructions.gif';
};
Instructions.dragShow = function () {
  // Show drag gif
  if (Instructions.dragging == false) {
    Instructions.drag.classList.add('characters__draginstruction--hover');
  }
};
Instructions.dragHide = function () {
  // Show drag gif
  Instructions.drag.classList.remove('characters__draginstruction--hover');
};

Instructions.dragMove = function (e) {
  // Move with mouse
  Instructions.drag.style.left =
    e.pageX - Instructions.drag.clientWidth / 2 + 'px';
  Instructions.drag.style.top =
    e.pageY - Instructions.drag.clientHeight / 2 + 'px';
};

// Instructions -- Show and hide instruction
P1.cardsContainer.addEventListener('mouseover', Instructions.dragShow, false);
P2.cardsContainer.addEventListener('mouseover', Instructions.dragShow, false);
P1.cardsContainer.addEventListener('mouseleave', Instructions.dragHide, false);
P2.cardsContainer.addEventListener('mouseleave', Instructions.dragHide, false);

// Move on mouse move
P1.cardsContainer.addEventListener('mousemove', Instructions.dragMove, false);
P2.cardsContainer.addEventListener('mousemove', Instructions.dragMove, false);

Cards.sliderDrag = function (playerobject, playerid) {
  playerobject.slider.drag = false;
  let startX;
  let scrollLeft;
  let speed = 3;
  playerobject.slider.container.addEventListener('touchstart', start, false);
  playerobject.slider.container.addEventListener('mousedown', start, false);

  function start(e) {
    playerobject.slider.drag = true;
    Instructions.dragging = true;
    playerobject.slider.container.classList.add('characters__slider--active');
    playerobject.slider.container.classList.add(playerid + '__slider--active');
    Instructions.drag.classList.remove('characters__draginstruction--hover');
    characterPage.classList.add('characters--active');
    startX = e.pageX - playerobject.slider.container.offsetLeft;
    scrollLeft = playerobject.slider.container.scrollLeft;
  }
  playerobject.slider.container.addEventListener('touchend', end, false);
  playerobject.slider.container.addEventListener('mouseup', end, false);
  playerobject.slider.container.addEventListener('mouseleave', end, false);

  function end(e) {
    playerobject.slider.drag = false;
    Instructions.dragging = false;
    playerobject.slider.container.classList.remove(
      'characters__slider--active',
    );
    playerobject.slider.container.classList.remove(
      playerid + '__slider--active',
    );
    characterPage.classList.remove('characters--active');
  }
  playerobject.slider.container.addEventListener('touchmove', move, false);
  playerobject.slider.container.addEventListener('mousemove', move, false);

  function move(e) {
    if (!playerobject.slider.drag) return;
    e.preventDefault(); // Stop selecting text and other defaults
    const x = e.pageX - playerobject.slider.container.offsetLeft;
    const walk = (x - startX) * speed;

    playerobject.slider.container.scrollLeft = scrollLeft - walk;
  }
};
Cards.sliderDrag(P1, 'p1');
Cards.sliderDrag(P2, 'p2');

/* ######## BOARD GAME PAGE ######## */
// Create X tiles
for (i = 1; i <= 30; i++) {
  Game.tiles = document.createElement('div');
  Game.tiles.classList.add('game__tile');
  Game.tiles.setAttribute('id', 't' + i);
  Game.tilesContainer.appendChild(Game.tiles);
}

Dice.btn.addEventListener('click', function (e) {
  // On click dice btn
  Dice.diceroll();
  e.stopPropagation;
});
Dice.diceroll = function () {
  if (Game.started && Game.waitTurn == false && Game.ended == false) {
    Dice.rolled = Math.floor(Math.random() * 6) + 1;
    if (P1.pos < 30 && P2.pos < 30) {
      if (Dice.rolled == '1') {
        Dice.roll(); // Roll dice animation
        Dice.theDice.classList = 'dicecontainer__dice'; // Reset dice throw
        Dice.theDice.classList.add('dicecontainer__dice--throwone'); // animate dice to fall on number
        if (Player.message.isIt == 1) {
          // If player ones turn
          P1.thrown1++;
          Game.movePiece(Dice.rolled, 1, P1, false); // Move dice amount, player one, reroll is false
        } else if (Player.message.isIt == 2) {
          // If player twos turn
          P2.thrown1++;
          Game.movePiece(Dice.rolled, 2, P2, false); // Move dice amount, player one, reroll is false
        }
      }
      if (Dice.rolled == '2') {
        Dice.roll();
        Dice.theDice.classList = 'dicecontainer__dice';
        Dice.theDice.classList.add('dicecontainer__dice--throwtwo');
        if (Player.message.isIt == 1) {
          P1.thrown2++;
          Game.movePiece(Dice.rolled, 1, P1, false);
        } else if (Player.message.isIt == 2) {
          P2.thrown2++;
          Game.movePiece(Dice.rolled, 2, P2, false);
        }
      }
      if (Dice.rolled == '3') {
        Dice.roll();
        Dice.theDice.classList = 'dicecontainer__dice';
        Dice.theDice.classList.add('dicecontainer__dice--throwthree');
        if (Player.message.isIt == 1) {
          P1.thrown3++;
          Game.movePiece(Dice.rolled, 1, P1, false);
        } else if (Player.message.isIt == 2) {
          P2.thrown3++;
          Game.movePiece(Dice.rolled, 2, P2, false);
        }
      }
      if (Dice.rolled == '4') {
        Dice.roll();
        Dice.theDice.classList = 'dicecontainer__dice';
        Dice.theDice.classList.add('dicecontainer__dice--throwfour');
        if (Player.message.isIt == 1) {
          P1.thrown4++;
          Game.movePiece(Dice.rolled, 1, P1, false);
        } else if (Player.message.isIt == 2) {
          P2.thrown4++;
          Game.movePiece(Dice.rolled, 2, P2, false);
        }
      }
      if (Dice.rolled == '5') {
        Dice.roll();
        Dice.theDice.classList = 'dicecontainer__dice';
        Dice.theDice.classList.add('dicecontainer__dice--throwfive');
        if (Player.message.isIt == 1) {
          P1.thrown5++;
          Game.movePiece(Dice.rolled, 1, P1, false);
        } else if (Player.message.isIt == 2) {
          P2.thrown5++;
          Game.movePiece(Dice.rolled, 2, P2, false);
        }
      }
      if (Dice.rolled == '6') {
        Dice.roll();
        Dice.theDice.classList = 'dicecontainer__dice';
        Dice.theDice.classList.add('dicecontainer__dice--throwsix');
        if (Player.message.isIt == 1) {
          P1.thrown6++;
          Game.movePiece(Dice.rolled, 1, P1, true);
        } else if (Player.message.isIt == 2) {
          P2.thrown6++;
          Game.movePiece(Dice.rolled, 2, P2, true);
        }
      }
    }
  }
};
Game.start = function () {
  if (
    Game.started == false &&
    Game.page.classList.contains('game--notstarted')
  ) {
    Characters.page.classList.add('characters--picked');
    Characters.page.classList.remove('characters--notpicked');
    Game.page.classList.add('game--started');
    Game.page.classList.remove('game--notstarted');
    Game.started = true;

    Player.message.isIt = Math.floor(Math.random() * 2) + 1;
    if (Player.message.isIt == '1') {
      // Message for player One
      Player.message.content = document.createElement('h1');
      Player.message.content.innerHTML =
        `<span data-player='1'>` + P1.name + `</span>  goes first`; // Create label
      Game.messageContainer.appendChild(Player.message.content);
      Game.started = true; // Disable start btn
      Dice.btn.setAttribute('data-player', '1');
      Dice.theDice.setAttribute('data-player', '1');
    } else if (Player.message.isIt == '2') {
      // Message for player Two
      Player.message.content = document.createElement('h1');

      if (Game.cpu == true) {
        Player.message.content.innerHTML =
          `<span data-player='2'>` + P2.name + ` (CPU)</span> goes first`; // Create label
      } else {
        Player.message.content.innerHTML =
          `<span data-player='2'>` + P2.name + `</span> goes first`; // Create label
      }
      Dice.btn.setAttribute('data-player', '2');
      Dice.theDice.setAttribute('data-player', '2');
      Game.messageContainer.appendChild(Player.message.content);
      Game.started = true; // Disable start btn
      if (Game.cpu == true) {
        Dice.diceroll();
      }
    }
  }
};

Game.movePiece = function (rolled, player, playerobject, reroll = false) {
  // * ---- IF P1s TURN
  playerobject.totalThrows++; // Add throw to total throws count
  playerobject.token.setAttribute('data-tile', playerobject.pos + rolled); // Move piece
  playerobject.pos = parseInt(playerobject.token.getAttribute('data-tile')); // Update playerobject.pos variable from data-tile

  if (playerobject.pos < 30) {
    // * ---- IF playerobject HAS NOT YET WUN
    Game.slideInMessage(); // Show message transition
    Game.menu.classList.add('game__menu--hide'); // Grey overlay to show game is paused
    if (Game.cpu == true) {
      if (playerobject == P2) {
        Player.message.content.innerHTML =
          `<span data-player='` +
          player +
          `'>` +
          playerobject.name +
          ` (CPU)</span> rolls ` +
          rolled; // Player roll message
      } else {
        Player.message.content.innerHTML =
          `<span data-player='` +
          player +
          `'>` +
          playerobject.name +
          `</span> rolls ` +
          rolled; // Player roll message
      }
    } else {
      Player.message.content.innerHTML =
        `<span data-player='` +
        player +
        `'>` +
        playerobject.name +
        `</span> rolls ` +
        rolled; // Player roll message
    }
    setTimeout(() => {
      Game.trapCheck(reroll, player, playerobject); // Check for traps, then check reroll
    }, 1000);
  } else if (playerobject.pos >= 30) {
    // * ---- IF playerobject HAS WUN
    Game.slideInMessage(5); // Show message transition
    Results.finish(playerobject.name); // Finish with playerobject as winner
  }
};
Results.finish = function (winner) {
  Sound.sfx.pageShift();
  Sound.sfx.play();
  Sound.music.dom.src = 'music/throne.mp3';
  Sound.music.play();
  if (Results.revealed == false) {
    Game.messageContainer.classList.add('game__turn--win');
    if (winner == P1.name) {
      // If player one wins
      P1.totalWins++;
      localStorage.setItem('p1wins', P1.totalWins.toString());

      if (P1.pos > 30) {
        P1.token.setAttribute('data-tile', 30);
      }

      Results.revealWinner(P1.name, P1, 1, 'p1');
      Results.revealLoser(P2.name, P2, 2, 'p2');
    } else if (winner == P2.name) {
      // If player two wins
      P2.totalWins++;
      localStorage.setItem('p2wins', P2.totalWins.toString());

      if (P2.pos > 30) {
        P2.token.setAttribute('data-tile', 30);
      }

      Results.revealWinner(P2.name, P2, 2, 'p2');
      Results.revealLoser(P1.name, P1, 1, 'p1');
    }
  }
  setTimeout(function () {
    if (winner == P1.name) {
      Results.throneContainer.classList.add('throne--p1');
    } else if (winner == P2.name) {
      Results.throneContainer.classList.add('throne--p2');
    }

    Results.throneContainer.classList.remove('throne--empty');
    Results.throneContainer.classList.add('throne--taken');
  }, 1000);

  setTimeout(function () {
    Results.revealed = true;
    Game.ended = true;
    Results.reveal();
  }, 4000);
};

Results.revealWinner = function (
  winnerName,
  winnerObject,
  winnerNumber,
  winnerString,
) {
  // Eg. P1.name, P1, 1, 'p1'

  // Set in-game message
  if (Game.cpu == true) {
    if (winnerObject == P2) {
      Player.message.content.innerHTML =
        `<span data-player='` +
        winnerNumber +
        `'>` +
        winnerName +
        ` (CPU)</span> wins!`;
    } else {
      Player.message.content.innerHTML =
        `<span data-player='` +
        winnerNumber +
        `'>` +
        winnerName +
        `</span> wins!`;
    }
  } else {
    Player.message.content.innerHTML =
      `<span data-player='` +
      winnerNumber +
      `'>` +
      winnerName +
      `</span> wins!`;
  }

  // Add player specific winner styling
  Results.winner.container.classList.add('results--' + winnerString);
  Results.winner.highscore.classList.add('highscore--' + winnerString);

  // Create heading
  Results.winner.message = document.createElement('h2'); // Highscore winner heading
  if (Game.cpu == true) {
    if (winnerObject == P2) {
      Results.winner.message.innerHTML =
        `<span data-player='` +
        winnerNumber +
        `'>` +
        winnerName +
        ` (CPU)</span> wins!`; // Winner heading content
    } else {
      Results.winner.message.innerHTML =
        `<span data-player='` +
        winnerNumber +
        `'>` +
        winnerName +
        `</span> wins!`; // Winner heading content
    }
  } else {
    Results.winner.message.innerHTML =
      `<span data-player='` +
      winnerNumber +
      `'>` +
      winnerName +
      `</span> wins!`; // Winner heading content
  }
  Results.winner.container.prepend(Results.winner.message);

  // Highscores - create elements
  Results.quoteContainer = document.getElementById('quote');
  Results.winner.thrown1 = document.createElement('p'); // Winner thrown 1
  Results.winner.thrown2 = document.createElement('p'); // Winner thrown 2
  Results.winner.thrown3 = document.createElement('p'); // Winner thrown 3
  Results.winner.thrown4 = document.createElement('p'); // Winner thrown 4
  Results.winner.thrown5 = document.createElement('p'); // Winner thrown 5
  Results.winner.thrown6 = document.createElement('p'); // Winner thrown 6
  Results.winner.totalThrows = document.createElement('p'); // Winner total throws
  Results.winner.totalTraps = document.createElement('p'); // Winner total traps
  Results.winner.totalWins = document.createElement('p'); // Winner total wins

  // Highscore - add classes
  Results.winner.thrown1.classList.add('highscore__row');
  Results.winner.thrown2.classList.add('highscore__row');
  Results.winner.thrown3.classList.add('highscore__row');
  Results.winner.thrown4.classList.add('highscore__row');
  Results.winner.thrown5.classList.add('highscore__row');
  Results.winner.thrown6.classList.add('highscore__row');
  Results.winner.totalThrows.classList.add('highscore__row');
  Results.winner.totalTraps.classList.add('highscore__row');
  Results.winner.totalWins.classList.add('highscore__row');
  // Highscore - add content

  if (winnerName == 'Eddard Stark') {
    Characters.getQuote(Characters.all.eddard.quotes, 'eddardQuotes');
  } else if (winnerName == 'Lyanna Mormont') {
    Characters.getQuote(Characters.all.lyanna.quotes, 'lyannaQuotes');
  } else if (winnerName == 'Balon Greyjoy') {
    Characters.getQuote(Characters.all.balon.quotes, 'balonQuotes');
  } else if (winnerName == 'Beric Dondarrion') {
    Characters.getQuote(Characters.all.beric.quotes, 'bericQuotes');
  } else if (winnerName == 'Arthur Dayne') {
    Characters.getQuote(Characters.all.arthur.quotes, 'arthurQuotes');
  } else if (winnerName == 'Ramsay Snow') {
    Characters.getQuote(Characters.all.ramsay.quotes, 'ramsayQuotes');
  } else if (winnerName == 'Oberyn Nymeros Martell') {
    Characters.getQuote(Characters.all.oberyn.quotes, 'oberynQuotes');
  } else if (winnerName == 'Daenerys Targaryen') {
    Characters.getQuote(Characters.all.daenerys.quotes, 'daenerysQuotes');
  } else if (winnerName == 'Robert I Baratheon') {
    Characters.getQuote(Characters.all.robert.quotes, 'robertQuotes');
  } else if (winnerName == 'Petyr Baelish') {
    Characters.getQuote(Characters.all.petyr.quotes, 'petyrQuotes');
  }

  Results.quoteContainer.innerHTML =
    `<blockquote class='results__quote--text'>"` +
    Results.quoteText +
    `"</blockquote>` +
    `<figcaption class='results__quote--name'> - ` +
    winnerName +
    `</figcaption>`;
  Results.winner.thrown1.innerHTML =
    `<span class='highscore__label'>Thrown 1 </span> ` +
    `<span class='highscore__data'>` +
    winnerObject.thrown1 +
    `</span>`;
  Results.winner.thrown2.innerHTML =
    `<span class='highscore__label'>Thrown 2 </span> ` +
    `<span class='highscore__data'>` +
    winnerObject.thrown2 +
    `</span>`;
  Results.winner.thrown3.innerHTML =
    `<span class='highscore__label'>Thrown 3 </span> ` +
    `<span class='highscore__data'>` +
    winnerObject.thrown3 +
    `</span>`;
  Results.winner.thrown4.innerHTML =
    `<span class='highscore__label'>Thrown 4 </span> ` +
    `<span class='highscore__data'>` +
    winnerObject.thrown4 +
    `</span>`;
  Results.winner.thrown5.innerHTML =
    `<span class='highscore__label'>Thrown 5 </span> ` +
    `<span class='highscore__data'>` +
    winnerObject.thrown5 +
    `</span>`;
  Results.winner.thrown6.innerHTML =
    `<span class='highscore__label'>Thrown 6 </span> ` +
    `<span class='highscore__data'>` +
    winnerObject.thrown6 +
    `</span>`;
  Results.winner.totalThrows.innerHTML =
    `<span class='highscore__label'>Throws: </span> ` +
    `<span class='highscore__data'>` +
    winnerObject.totalThrows +
    `</span>`;
  Results.winner.totalTraps.innerHTML =
    `<span class='highscore__label'>Traps: </span> ` +
    `<span class='highscore__data'>` +
    winnerObject.totalTraps +
    `</span>`;
  Results.winner.totalWins.innerHTML =
    `<span class='highscore__label'>Total wins </span> ` +
    `<span class='highscore__data'>` +
    winnerObject.totalWins +
    `</span>`;

  // Highscore - append items
  Results.winner.highscore.appendChild(Results.winner.thrown1);
  Results.winner.highscore.appendChild(Results.winner.thrown2);
  Results.winner.highscore.appendChild(Results.winner.thrown3);
  Results.winner.highscore.appendChild(Results.winner.thrown4);
  Results.winner.highscore.appendChild(Results.winner.thrown5);
  Results.winner.highscore.appendChild(Results.winner.thrown6);
  Results.winner.highscore.appendChild(Results.winner.thrown6);
  Results.winner.highscore.appendChild(Results.winner.totalThrows);
  Results.winner.highscore.appendChild(Results.winner.totalTraps);
  Results.winner.highscore.appendChild(Results.winner.totalWins);
};
Results.revealLoser = function (
  loserName,
  loserObject,
  loserNumber,
  loserString,
) {
  // Eg. P1.name, P1, 1

  // Add player specific loser styling
  Results.loser.container.classList.add('results--' + loserString);
  Results.loser.highscore.classList.add('highscore--' + loserString);

  // Create heading
  Results.loser.message = document.createElement('h2'); // Highscore loser heading
  if (Game.cpu == true) {
    if (loserObject == P2) {
      Results.loser.message.innerHTML =
        `<span data-player='` +
        loserNumber +
        `'>` +
        loserName +
        ` (CPU)</span> lost!`; // loser heading content
    } else {
      Results.loser.message.innerHTML =
        `<span data-player='` +
        loserNumber +
        `'>` +
        loserName +
        `</span> lost!`; // loser heading content
    }
  } else {
    Results.loser.message.innerHTML =
      `<span data-player='` + loserNumber + `'>` + loserName + `</span> lost!`; // loser heading content
  }
  Results.loser.container.prepend(Results.loser.message);

  // Highscores - create elements
  Results.loser.thrown1 = document.createElement('p'); // loser thrown 1
  Results.loser.thrown2 = document.createElement('p'); // loser thrown 1
  Results.loser.thrown3 = document.createElement('p'); // loser thrown 1
  Results.loser.thrown4 = document.createElement('p'); // loser thrown 1
  Results.loser.thrown5 = document.createElement('p'); // loser thrown 1
  Results.loser.thrown6 = document.createElement('p'); // loser thrown 1
  Results.loser.totalThrows = document.createElement('p'); // loser total throws
  Results.loser.totalTraps = document.createElement('p'); // loser total traps
  Results.loser.totalWins = document.createElement('p'); // loser total wins

  // Highscore - add classes
  Results.loser.thrown1.classList.add('highscore__row');
  Results.loser.thrown2.classList.add('highscore__row');
  Results.loser.thrown3.classList.add('highscore__row');
  Results.loser.thrown4.classList.add('highscore__row');
  Results.loser.thrown5.classList.add('highscore__row');
  Results.loser.thrown6.classList.add('highscore__row');
  Results.loser.totalThrows.classList.add('highscore__row');
  Results.loser.totalTraps.classList.add('highscore__row');
  Results.loser.totalWins.classList.add('highscore__row');

  // Highscore - add content
  Results.loser.thrown1.innerHTML =
    `<span class='highscore__label'>Thrown 1 </span> ` +
    `<span class='highscore__data'>` +
    loserObject.thrown1 +
    `</span>`;
  Results.loser.thrown2.innerHTML =
    `<span class='highscore__label'>Thrown 2 </span> ` +
    `<span class='highscore__data'>` +
    loserObject.thrown2 +
    `</span>`;
  Results.loser.thrown3.innerHTML =
    `<span class='highscore__label'>Thrown 3 </span> ` +
    `<span class='highscore__data'>` +
    loserObject.thrown3 +
    `</span>`;
  Results.loser.thrown4.innerHTML =
    `<span class='highscore__label'>Thrown 4 </span> ` +
    `<span class='highscore__data'>` +
    loserObject.thrown4 +
    `</span>`;
  Results.loser.thrown5.innerHTML =
    `<span class='highscore__label'>Thrown 5 </span> ` +
    `<span class='highscore__data'>` +
    loserObject.thrown5 +
    `</span>`;
  Results.loser.thrown6.innerHTML =
    `<span class='highscore__label'>Thrown 6 </span> ` +
    `<span class='highscore__data'>` +
    loserObject.thrown6 +
    `</span>`;
  Results.loser.totalThrows.innerHTML =
    `<span class='highscore__label'>Throws: </span> ` +
    `<span class='highscore__data'>` +
    loserObject.totalThrows +
    `</span>`;
  Results.loser.totalTraps.innerHTML =
    `<span class='highscore__label'>Traps: </span> ` +
    `<span class='highscore__data'>` +
    loserObject.totalTraps +
    `</span>`;
  Results.loser.totalWins.innerHTML =
    `<span class='highscore__label'>Total wins </span> ` +
    `<span class='highscore__data'>` +
    loserObject.totalWins +
    `</span>`;

  // Highscore - append items
  Results.loser.highscore.appendChild(Results.loser.thrown1);
  Results.loser.highscore.appendChild(Results.loser.thrown2);
  Results.loser.highscore.appendChild(Results.loser.thrown3);
  Results.loser.highscore.appendChild(Results.loser.thrown4);
  Results.loser.highscore.appendChild(Results.loser.thrown5);
  Results.loser.highscore.appendChild(Results.loser.thrown6);
  Results.loser.highscore.appendChild(Results.loser.totalThrows);
  Results.loser.highscore.appendChild(Results.loser.totalTraps);
  Results.loser.highscore.appendChild(Results.loser.totalWins);
};
Results.playAgain.addEventListener('click', function (e) {
  localStorage.removeItem('p1name'); // Forget p1 name
  localStorage.removeItem('p2name'); // Forget p2 name
  location.reload(); // Reload page
  e.preventDefault(); // Prevent link behavior
  e.stopPropagation;
});

Characters.getQuote = function (charobject, storageid) {
  // Eg: Characters.all.daenerys.quotes,'daenerysQuotes'
  Results.quoteNumber = parseInt(localStorage.getItem(storageid));
  if (Results.quoteNumber < charobject.length) {
    // If within quote array
    Results.quoteText = charobject[Results.quoteNumber]; // Get current quote
    Results.quoteNumber++; // Set quotenumber to next quote
    localStorage.setItem(storageid, Results.quoteNumber.toString()); // Save quotenumber for next game
  } else {
    // If outside array
    Results.quoteNumber = 0; // Reset quote number
    Results.quoteText = charobject[Results.quoteNumber]; // Load first quote
    localStorage.setItem(storageid, Results.quoteNumber.toString()); // Save reset quote number for next game
  }
};
Game.slideInMessage = function (duration = 1.5) {
  if (Game.messageContainer.classList.contains('game__turn--show')) {
    setTimeout(function () {
      Game.messageContainer.classList.remove('game__turn--show');
    }, Game.messageDuration * duration); // Duration to show message
  } else {
    Game.messageContainer.classList.add('game__turn--show');
    setTimeout(function () {
      Game.messageContainer.classList.remove('game__turn--show');
    }, Game.messageDuration * duration); // Duration to show message
  }
};

// * --------- T R A P S ---------
for (i = 0; i < Game.trapsArray.length; i++) {
  let currentTrapTile = document.getElementById('t' + Game.trapsArray[i].pos);
  currentTrapTile.classList.add('trap');
  currentTrapTile.classList.add('trap' + Game.trapsArray[i].modclass);
}
Game.insaneMode = false; // Change cards to insanemode text, disable nemesis
Game.childlikeMode = false; // Change cards to childlike text
Game.trapsActive = true;
Game.trapCheck = function (reroll, player, playerobject) {
  Game.waitTurn = true;
  if (Game.trapsActive) {
    if (playerobject.pos == Game.traps.dayne.pos) {
      // If trap hit
      Game.trapRun(player, playerobject, Game.traps.dayne); // Run trap
    } else if (playerobject.pos == Game.traps.martell.pos) {
      // If trap hit
      Game.trapRun(player, playerobject, Game.traps.martell); // Run trap
    } else if (playerobject.pos == Game.traps.dondarrion.pos) {
      // If trap hit
      Game.trapRun(player, playerobject, Game.traps.dondarrion); // Run trap
    } else if (playerobject.pos == Game.traps.baratheon.pos) {
      // If trap hit
      Game.trapRun(player, playerobject, Game.traps.baratheon); // Run trap
    } else if (playerobject.pos == Game.traps.targaryen.pos) {
      // If trap hit
      Game.trapRun(player, playerobject, Game.traps.targaryen); // Run trap
    } else if (playerobject.pos == Game.traps.mormont.pos) {
      // If trap hit
      Game.trapRun(player, playerobject, Game.traps.mormont); // Run trap
    } else if (playerobject.pos == Game.traps.greyjoy.pos) {
      // If trap hit
      Game.trapRun(player, playerobject, Game.traps.greyjoy); // Run trap
    } else if (playerobject.pos == Game.traps.baelish.pos) {
      // If trap hit
      Game.trapRun(player, playerobject, Game.traps.baelish); // Run trap
    } else if (playerobject.pos == Game.traps.bolton.pos) {
      // If trap hit
      Game.trapRun(player, playerobject, Game.traps.bolton); // Run trap
    } else if (playerobject.pos == Game.traps.stark.pos) {
      // If trap hit
      Game.trapRun(player, playerobject, Game.traps.stark); // Run trap
    } else if (playerobject.pos == Game.traps.nightking.pos) {
      // If trap hit
      Game.trapRun(player, playerobject, Game.traps.nightking); // Run trap
    } else if (playerobject.pos == Game.traps.melisandre.pos) {
      // If trap hit
      Game.trapRun(player, playerobject, Game.traps.melisandre); // Run trap
    } else {
      // If trap not hitelse {
      Game.rerollCheck(reroll, player); // Check for reroll
    }
  } else {
    Game.rerollCheck(reroll, player); // Check for reroll
  }
};
Game.trapRun = function (player, playerobject, trap) {
  Game.page.classList.add('game' + trap.modclass); // Add styling class
  Game.messageContainer.classList.add('game__turn--show');
  document.getElementById('sfxMenu').classList.add('sound--hidden');
  let trapAllies = trap.friendlyTo.sort().toString();
  let playerAllies = playerobject.allies.sort().toString();
  if (
    (trapAllies == playerAllies && Game.trapsAreAllEnemies == false) ||
    Game.trapsAreAllFriendly == true
  ) {
    console.log('friendly trap');
    // If friendly
    playerobject.totalBoosts++; // Increase total boosts count
    let index = Math.floor(Math.random() * trap.friendlyBoost.length - 1) + 1; // Add -1 for index 0
    playerobject.pos = trap.friendlyBoost[index];
    console.log(index);
    let boost = trap.friendlyBoost[index] - trap.pos;
    console.log(boost);
    if (trap.sfx !== undefined) {
      Sound.sfx.dom.src = trap.sfx;
      Sound.sfx.dom.currentTime = 0;
      Sound.sfx.play(true);
    }
    if (Game.cpu == true) {
      if (playerobject == P2) {
        Player.message.content.innerHTML =
          "<span data-player='" +
          playerobject.num +
          "'>" +
          playerobject.name +
          ' (CPU) </span>' +
          trap.friendlyMessage +
          trap.messageStyle +
          boost +
          '</span> tiles.';
      } else {
        Player.message.content.innerHTML =
          "<span data-player='" +
          playerobject.num +
          "'>" +
          playerobject.name +
          ' </span>' +
          trap.friendlyMessage +
          trap.messageStyle +
          boost +
          '</span> tiles.';
      }
    } else {
      Player.message.content.innerHTML =
        "<span data-player='" +
        playerobject.num +
        "'>" +
        playerobject.name +
        ' </span>' +
        trap.friendlyMessage +
        trap.messageStyle +
        boost +
        '</span> tiles.';
    }
    trap.addition = 0;
  } else if (trapAllies !== playerAllies || Game.trapsAreAllEnemies == true) {
    console.log('unfriendly trap');
    // Penaltymessage
    playerobject.totalTraps++; // Increase total boosts count
    if (trap.penalty == 'random') {
      if (trap.sfx !== undefined) {
        Sound.sfx.dom.src = trap.sfx;
        Sound.sfx.dom.currentTime = 0;
        Sound.sfx.play(true);
      }
      trap.addition =
        Math.ceil(Math.random() * (trap.penaltyTo + trap.penaltyFrom)) -
        trap.penaltyFrom;
      if (Game.cpu == true) {
        if (playerobject == P2) {
          Player.message.content.innerHTML =
            "<span data-player='" +
            playerobject.num +
            "'>" +
            playerobject.name +
            ' (CPU) </span>' +
            trap.message +
            trap.messageStyle +
            trap.addition +
            '</span> tiles.';
        } else {
          Player.message.content.innerHTML =
            "<span data-player='" +
            playerobject.num +
            "'>" +
            playerobject.name +
            ' </span>' +
            trap.message +
            trap.messageStyle +
            trap.addition +
            '</span> tiles.';
        }
      } else {
        Player.message.content.innerHTML =
          "<span data-player='" +
          playerobject.num +
          "'>" +
          playerobject.name +
          ' </span>' +
          trap.message +
          trap.messageStyle +
          trap.addition +
          '</span> tiles.';
      }
    } else if (trap.penalty == 'randomnegative') {
      if (trap.sfx !== undefined) {
        Sound.sfx.dom.src = trap.sfx;
        Sound.sfx.dom.currentTime = 0;
        Sound.sfx.play(true);
      }
      trap.addition = Math.floor(Math.random() * Math.floor(trap.penaltyTo));
      if (Game.cpu == true) {
        if (playerobject == P2) {
          Player.message.content.innerHTML =
            "<span data-player='" +
            playerobject.num +
            "'>" +
            playerobject.name +
            ' (CPU) </span>' +
            trap.message +
            trap.messageStyle +
            trap.addition +
            '</span> tiles.';
        } else {
          Player.message.content.innerHTML =
            "<span data-player='" +
            playerobject.num +
            "'>" +
            playerobject.name +
            ' </span>' +
            trap.message +
            trap.messageStyle +
            trap.addition +
            '</span> tiles.';
        }
      } else {
        if (
          trap.nemesis &&
          trap.nemesis.toLowerCase() == playerobject.house &&
          Game.insaneMode == false
        ) {
          // Double penalty if Nemesis
          Player.message.content.innerHTML =
            "<span data-player='" +
            playerobject.num +
            "'>" +
            playerobject.name +
            ' </span>' +
            trap.nemesisMessage +
            trap.messageStyle +
            trap.addition +
            '</span> tiles.';
          trap.addition *= 7;
        } else {
          Player.message.content.innerHTML =
            "<span data-player='" +
            playerobject.num +
            "'>" +
            playerobject.name +
            ' </span>' +
            trap.message +
            trap.messageStyle +
            trap.addition +
            '</span> tiles.';
        }
      }
    }
  }
  setTimeout(function () {
    Player.message.content.innerHTML = '';
    Game.page.classList.remove('game' + trap.modclass);
    document.getElementById('sfxMenu').classList.remove('sound--hidden');
    setTimeout(function () {
      // Move piece after message delay
      playerobject.token.setAttribute(
        'data-tile',
        playerobject.pos + trap.addition,
      ); // Add penalty
      playerobject.pos = parseInt(playerobject.token.getAttribute('data-tile')); // Update player.pos variable from data-tile
      if (playerobject.pos <= 0) {
        // If less than tile 1
        playerobject.token.setAttribute('data-tile', 1); // Reset to 1
        playerobject.pos = parseInt(
          playerobject.token.getAttribute('data-tile'),
        );
      } else if (playerobject.pos >= 30) {
        if (playerobject.pos > 30) {
          playerobject.token.setAttribute('data-tile', 30); // Reset to 1
          playerobject.pos = parseInt(
            playerobject.token.getAttribute('data-tile'),
          );
        }
        // * ---- IF playerobject HAS WUN
        Game.slideInMessage(5); // Show message transition
        Results.finish(playerobject.name); // Finish with playerobject as winner
      }
      setTimeout(function () {
        Game.trapCheck(false, player, playerobject); // Check for traps, then check reroll
      }, 100);
    }, 500);
  }, 2500);
};
Game.rerollCheck = function (reroll, player, delay = 0) {
  setTimeout(function () {
    if (player == 1) {
      reroll ? (Player.message.isIt = 1) : (Player.message.isIt = 2); // If reroll set turn to 1

      if (reroll == true) {
        // * -------- IF REROLL
        Game.waitTurn = true; // Deactivate roll btn click for showing message
        Game.menu.classList.add('game__menu--hide'); // Grey overlay to show game is paused
        setTimeout(function () {
          // Delay to give time to view dice roll and message
          Player.message.content.innerHTML =
            `<span data-player='1'>` + P1.name + `</span> gets to reroll!`; // Reroll player message
          Game.menu.classList.remove('game__menu--hide'); // Remove grey overlay to show game is resumed
          Game.waitTurn = false; // Reactivate roll btn click
        }, Game.messageDuration);
      } else if (reroll == false) {
        // * -------- IF NO REROLL
        Game.waitTurn = true; // Deactivate roll btn click for showing message
        Game.menu.classList.add('game__menu--hide'); // Grey overlay to show game is paused
        setTimeout(function () {
          // Delay to give time to view dice roll and message
          if (Game.cpu == true) {
            Player.message.content.innerHTML =
              `<span data-player='2'>` + P2.name + `'s (CPU)</span> turn`; // Player twos turn message
          } else {
            Player.message.content.innerHTML =
              `<span data-player='2'>` + P2.name + `'s</span> turn`; // Player twos turn message
          }
          Dice.btn.setAttribute('data-player', '2'); // Change btn colour to match player
          Dice.theDice.setAttribute('data-player', '2'); // Change dice colour to match player
          Game.menu.classList.remove('game__menu--hide'); // Remove grey overlay to show game is resumed
          Game.waitTurn = false; // Reactivate roll btn click
          if (Game.cpu == true) {
            Dice.diceroll();
          }
        }, Game.messageDuration);
      }
    } else if (player == 2) {
      reroll ? (Player.message.isIt = 2) : (Player.message.isIt = 1); // If reroll set turn to 1

      if (reroll == true) {
        // * -------- IF REROLL
        Game.waitTurn = true; // Deactivate roll btn click for showing message
        Game.menu.classList.add('game__menu--hide'); // Grey overlay to show game is paused
        setTimeout(function () {
          // Delay to give time to view dice roll and message
          if (Game.cpu == true) {
            Player.message.content.innerHTML =
              `<span data-player='2'>` +
              P2.name +
              ` (CPU)</span> gets to reroll!`; // Reroll player message
          } else {
            Player.message.content.innerHTML =
              `<span data-player='2'>` + P2.name + `</span> gets to reroll!`; // Reroll player message
          }
          Game.menu.classList.remove('game__menu--hide'); // Remove grey overlay to show game is resumed
          Game.waitTurn = false; // Reactivate roll btn click
          if (Game.cpu == true) {
            Dice.diceroll();
          }
        }, Game.messageDuration);
      } else if (reroll == false) {
        // * -------- IF NO REROLL
        Game.waitTurn = true; // Deactivate roll btn click for showing message
        Game.menu.classList.add('game__menu--hide'); // Grey overlay to show game is paused
        setTimeout(function () {
          // Delay to give time to view dice roll and message
          Player.message.content.innerHTML =
            `<span data-player='1'>` + P1.name + `'s</span>  turn`; // Player ones turn message
          Dice.btn.setAttribute('data-player', '1'); // Change btn colour to match player
          Dice.theDice.setAttribute('data-player', '1'); // Change dice colour to match player
          Game.menu.classList.remove('game__menu--hide'); // Remove grey overlay to show game is resumed
          Game.waitTurn = false; // Reactivate roll btn click
        }, Game.messageDuration);
      }
    }
  }, delay);
};
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

Difficulty = {};
Difficulty.insaneChildToggled = false;
Difficulty.range = document.getElementById('difficultyRange');
Difficulty.select = document.getElementById('difficultySelect');
Difficulty.valueText = document.getElementById('difficultyValue');
Difficulty.valueText.innerHTML = 'Normal<br>- Beware of traps';
Difficulty.refreshValues = function (element) {
  if (element.value == 1) {
    Difficulty.valueText.innerHTML =
      'Childlike<br>- All traps become your playmates.';
    Difficulty.value = 'childlike';
    Difficulty.insaneChildToggled = true;
  } else if (element.value == 2) {
    Difficulty.valueText.innerHTML = 'Normal<br>- Beware of traps';
    Difficulty.value = 'normal';
  } else if (element.value == 3) {
    Difficulty.valueText.innerHTML =
      'Hard<br>- Traps are given double espresso.<br>- Boosts take a sleeping pill.';
    Difficulty.value = 'hard';
  } else if (element.value == 4) {
    Difficulty.valueText.innerHTML =
      'Insane.<br>- All traps are the <span data-trap="nightking">Nightking</span>,<br> on steroids.';
    Difficulty.value = 'insane';
  }
};
Difficulty.range.oninput = function () {
  Difficulty.refreshValues(Difficulty.range);
};
// Difficulty.select.onchange = function() {
//     Difficulty.refreshValues(Difficulty.select);
// };
Difficulty.confirm = document.getElementById('difficultyConfirm');
Difficulty.confirm.addEventListener('click', function () {
  Difficulty.adjust(Difficulty.value);
});
//
// PLEASE EXCUSE THIS REPETITIVE CLUTTER OF CODE
Game.insaneChildMode = false;
Difficulty.adjust = function (value) {
  if (value == 'childlike') {
    Game.trapsAreAllFriendly = true;
    Game.childlikeMode = true;
    Cards.clear();
    Cards.creator(Cards.charArray, P1, 'p1');
    Cards.creator(Cards.charArray, P2, 'p2');
  } else if (value == 'normal') {
    console.log('normal');
  } else if (value == 'hard') {
    console.log('hard');
    let multiplier = 7;
    Game.traps.dayne.penaltyTo *= multiplier;
    Game.traps.dayne.friendlyBoost = Game.traps.dayne.friendlyBoost.slice(0, 1);

    Game.traps.martell.penaltyTo *= multiplier;
    Game.traps.martell.friendlyBoost = Game.traps.martell.friendlyBoost.slice(
      0,
      1,
    );

    Game.traps.dondarrion.penaltyTo *= multiplier;
    Game.traps.dondarrion.friendlyBoost =
      Game.traps.dondarrion.friendlyBoost.slice(0, 1);

    Game.traps.baratheon.penaltyTo *= multiplier;
    Game.traps.baratheon.friendlyBoost =
      Game.traps.baratheon.friendlyBoost.slice(0, 1);

    Game.traps.targaryen.penaltyTo *= multiplier;
    Game.traps.targaryen.friendlyBoost =
      Game.traps.targaryen.friendlyBoost.slice(0, 1);

    Game.traps.mormont.penaltyTo *= multiplier;
    Game.traps.mormont.friendlyBoost = Game.traps.mormont.friendlyBoost.slice(
      0,
      1,
    );

    Game.traps.greyjoy.penaltyTo *= multiplier;
    Game.traps.greyjoy.friendlyBoost = Game.traps.greyjoy.friendlyBoost.slice(
      0,
      1,
    );

    Game.traps.baelish.penaltyTo *= multiplier;
    Game.traps.baelish.friendlyBoost = Game.traps.baelish.friendlyBoost.slice(
      0,
      1,
    );

    Game.traps.bolton.penaltyTo *= multiplier;
    Game.traps.bolton.friendlyBoost = Game.traps.bolton.friendlyBoost.slice(
      0,
      1,
    );

    Game.traps.stark.penaltyTo *= multiplier;
    Game.traps.stark.friendlyBoost = Game.traps.stark.friendlyBoost.slice(0, 1);

    Game.traps.nightking.penaltyTo *= multiplier;

    Game.traps.melisandre.penaltyFrom *= multiplier;
    Game.traps.melisandre.penaltyTo = [1];
    Game.trapsReload();
  } else if (value == 'insane') {
    let steroids = -999;
    Game.insaneMode = true;
    if (Difficulty.insaneChildToggled == false) {
      Game.insaneChildMode = false;
      Game.trapsAreAllFriendly = false;
      Game.trapsAreAllEnemies = true;
    } else if (Difficulty.insaneChildToggled == true) {
      Game.insaneChildMode = true;
      Game.trapsAreAllEnemies = false;
      Game.trapsAreAllFriendly = true;
    }
    Game.traps.dayne.penalty = 'randomnegative';
    Game.traps.dayne.penaltyTo = steroids;
    Game.traps.dayne.messageStyle = `<span data-trap="nightking">`;
    Game.traps.dayne.modclass = '--nightking';
    Game.traps.dayne.sfx = 'sfx/traps/nightking.mp3';
    Game.traps.dayne.message = `is struck by the <span data-trap="nightking">Night King</span>, and flees `;
    Game.traps.dayne.friendlyMessage = `is welcomed by <span data-trap="nightking">Nightking</span>  and hops along `;

    Game.traps.martell.penalty = 'randomnegative';
    Game.traps.martell.penaltyTo = steroids;
    Game.traps.martell.messageStyle = `<span data-trap="nightking">`;
    Game.traps.martell.modclass = '--nightking';
    Game.traps.martell.sfx = 'sfx/traps/nightking.mp3';
    Game.traps.martell.message = `screams at the sight of the <span data-trap="nightking">Night King</span>, and falls `;
    Game.traps.martell.friendlyMessage = `sees the nice <span data-trap="nightking">Nightking</span>  and flies `;

    Game.traps.dondarrion.penalty = 'randomnegative';
    Game.traps.dondarrion.penaltyTo = steroids;
    Game.traps.dondarrion.messageStyle = `<span data-trap="nightking">`;
    Game.traps.dondarrion.modclass = '--nightking';
    Game.traps.dondarrion.sfx = 'sfx/traps/nightking.mp3';
    Game.traps.dondarrion.message = `is frozen by the <span data-trap="nightking">Night King</span>, and slips `;
    Game.traps.dondarrion.friendlyMessage = `meets his uncle the <span data-trap="nightking">Nightking</span>  is gifted `;

    Game.traps.baratheon.penalty = 'randomnegative';
    Game.traps.baratheon.penaltyTo = steroids;
    Game.traps.baratheon.messageStyle = `<span data-trap="nightking">`;
    Game.traps.baratheon.modclass = '--nightking';
    Game.traps.baratheon.sfx = 'sfx/traps/nightking.mp3';
    Game.traps.baratheon.message = `sees the <span data-trap="nightking">Night King</span>, and runs `;
    Game.traps.baratheon.friendlyMessage = `hugs Uncy <span data-trap="nightking">Nightkingy</span>  and jumps `;

    Game.traps.targaryen.penalty = 'randomnegative';
    Game.traps.targaryen.penaltyTo = steroids;
    Game.traps.targaryen.messageStyle = `<span data-trap="nightking">`;
    Game.traps.targaryen.modclass = '--nightking';
    Game.traps.targaryen.sfx = 'sfx/traps/nightking.mp3';
    Game.traps.targaryen.message = `gets hit by the <span data-trap="nightking">Night King</span>, and misses `;
    Game.traps.targaryen.friendlyMessage = `kisses the <span data-trap="nightking">Nightking</span>  and blushes `;

    Game.traps.mormont.penalty = 'randomnegative';
    Game.traps.mormont.penaltyTo = steroids;
    Game.traps.mormont.messageStyle = `<span data-trap="nightking">`;
    Game.traps.mormont.modclass = '--nightking';
    Game.traps.mormont.sfx = 'sfx/traps/nightking.mp3';
    Game.traps.mormont.message = `is taken by the <span data-trap="nightking">Night King</span>, and returns `;
    Game.traps.mormont.friendlyMessage = `receives a Winterbike from the <span data-trap="nightking">Nightking</span>  and rides `;

    Game.traps.greyjoy.penalty = 'randomnegative';
    Game.traps.greyjoy.penaltyTo = steroids;
    Game.traps.greyjoy.messageStyle = `<span data-trap="nightking">`;
    Game.traps.greyjoy.modclass = '--nightking';
    Game.traps.greyjoy.sfx = 'sfx/traps/nightking.mp3';
    Game.traps.greyjoy.message = `is caught by the <span data-trap="nightking">Night King</span>, and freezes `;
    Game.traps.greyjoy.friendlyMessage = `gets a nice cold slush from the <span data-trap="nightking">Nightking</span>  and burps `;

    Game.traps.baelish.penalty = 'randomnegative';
    Game.traps.baelish.penaltyTo = steroids;
    Game.traps.baelish.messageStyle = `<span data-trap="nightking">`;
    Game.traps.baelish.modclass = '--nightking';
    Game.traps.baelish.sfx = 'sfx/traps/nightking.mp3';
    Game.traps.baelish.message = `hides from the <span data-trap="nightking">Night King</span>, and walks back`;
    Game.traps.baelish.friendlyMessage = `is doing karaoke with the <span data-trap="nightking">Nightking</span>  and sings for `;

    Game.traps.bolton.penalty = 'randomnegative';
    Game.traps.bolton.penaltyTo = steroids;
    Game.traps.bolton.messageStyle = `<span data-trap="nightking">`;
    Game.traps.bolton.modclass = '--nightking';
    Game.traps.bolton.sfx = 'sfx/traps/nightking.mp3';
    Game.traps.bolton.message = `is in cover from the <span data-trap="nightking">Night King</span>, and sits still `;
    Game.traps.bolton.friendlyMessage = `dances with the <span data-trap="nightking">Nightking</span>  and does a piruette for `;

    Game.traps.stark.penalty = 'randomnegative';
    Game.traps.stark.penaltyTo = steroids;
    Game.traps.stark.messageStyle = `<span data-trap="nightking">`;
    Game.traps.stark.modclass = '--nightking';
    Game.traps.stark.sfx = 'sfx/traps/nightking.mp3';
    Game.traps.stark.message = `leaps away from the <span data-trap="nightking">Night King</span>, and rolls down `;
    Game.traps.stark.friendlyMessage = `spits out the <span data-trap="nightking">Nightking Cereal</span>  and smiles for `;

    Game.traps.nightking.penalty = 'randomnegative';
    Game.traps.nightking.penaltyTo = steroids;
    Game.traps.nightking.messageStyle = `<span data-trap="nightking">`;
    Game.traps.nightking.modclass = '--nightking';
    Game.traps.nightking.sfx = 'sfx/traps/nightking.mp3';
    Game.traps.nightking.message = `slips by the <span data-trap="nightking">Night King</span>, and cries for `;
    Game.traps.nightking.friendlyMessage = `hugs and kisses <span data-trap="nightking">Nightkingsly</span> and sits for `;

    Game.traps.melisandre.penalty = 'randomnegative';
    Game.traps.melisandre.penaltyTo = steroids;
    Game.traps.melisandre.messageStyle = `<span data-trap="nightking">`;
    Game.traps.melisandre.modclass = '--nightking';
    Game.traps.melisandre.sfx = 'sfx/traps/nightking.mp3';
    Game.traps.melisandre.message = `ran into the <span data-trap="nightking">Night King</span>, and has to run `;
    Game.traps.melisandre.friendlyMessage = `licks the <span data-trap="nightking">Nightking Cereal</span>  and is stuck to him for `;

    // Reload traps
    Game.trapsReload();

    if (Difficulty.insaneChildToggled == true) {
      Cards.clear();
      Cards.creator(Cards.charArray, P1, 'p1');
      Cards.creator(Cards.charArray, P2, 'p2');
    } else {
      // Reload cards
      Cards.clear();
      Cards.creator(Cards.charArray, P1, 'p1');
      Cards.creator(Cards.charArray, P2, 'p2');
    }
  }
};
Game.trapsReload = function () {
  Game.trapsArray = Object.values(Game.traps);
  for (i = 0; i < Game.trapsArray.length; i++) {
    let currentTrapTile = document.getElementById('t' + Game.trapsArray[i].pos);
    currentTrapTile.classList.add('trap');
    currentTrapTile.classList.add('trap' + Game.trapsArray[i].modclass);
  }
};
