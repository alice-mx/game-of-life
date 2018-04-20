import _ from 'lodash';
import './style.css';

const Game = require('./game');
const Rules = require('./rules');
const Brush = require('./brush');
const Printer = require('./printer');

var canvas = document.createElement('canvas');
canvas.width=1000;
canvas.height=1000;
document.body.appendChild(canvas);


var saturation = 100;
var lightness = 50;
var game = new Game();
var grid = game.randomGrid(250);
var generation = 0;

var rules   = new Rules();
var brush   = new Brush(0,100,50);
var printer = new Printer(canvas);
var game    = new Game(printer, brush, rules);


window.onload = function() {
  var controlPanelHeader = document.getElementById('title');
  game.startGame(50);

  controlPanelHeader.onclick = function() {
    document.getElementById('control-panel').classList.toggle('closed');
  }

  var saturationControl = document.getElementById('saturation');
  saturationControl.onchange = function(event) {
    brush.saturation = this.value;
  }

  var lightnessControl = document.getElementById('lightness');
  lightnessControl.onchange = function(event) {
    brush.lightness = this.value;
  }

  var pokeButton = document.getElementById('poke');
  pokeButton.onclick = function(event) {
    game.poke();
  }

  var refreshButton = document.getElementById('refresh');
  refreshButton.onclick = function(event) {
    game.restartGame();
    game.startGame(50);
  }
}
