import _ from 'lodash';
import game from './game';
import './style.css';



var canvas = document.createElement('canvas');
canvas.width=1000;
canvas.height=1000;

var saturation = 100;
var lightness = 50;
var grid = randomGrid(250);
var generation = 0;



function randomGrid(size) {
 const cells = [];
 for(let i = 0; i < size; i++) {
   const row = [];
   for(let j = 0; j < size; j++) {
     row.push((
       (i > 0) && (i < (size)) &&
       (j > 0) && (j < (size)) &&
       Math.random() > 0.5 ? false : true));
   }
   cells.push(row);
 }
 return cells;
}

function pokeGrid(grid) {
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid.length; j++) {
        grid[i][j]=(Math.random() < 0.1);
    }
  }
  return grid;
}

function circle(size) {
  const cells = [];
  for(let i = 0; i < size; i++) {
    const row = [];
    for(let j = 0; j < size; j++) {
      var center = size/2;
      var radiusSquared = Math.pow(center/2.2,2);
      var inCircle = ((Math.pow(i-center,2))+(Math.pow(j-center,2)) < radiusSquared);
      var outsideInnerCircle = ((Math.pow(i-center,2))+(Math.pow(j-center,2)) > Math.pow(center/2.5,2));
      row.push( Math.random() < 0.3 ? true : false);
    }
    cells.push(row);
  }
  return cells;
}


function drawGrid(grid, generation) {
  var context = canvas.getContext("2d");
  context.globalAlpha = 0.5;
  context.fillStyle = `hsl(${generation%360}, ${saturation}%, ${lightness}%)`;
  for(var i = 0; i < grid.length; i++) {
    for(var r = 0; r < grid[i].length; r++) {
      if(grid[i][r]) {
        context.beginPath();
        context.arc(i*4, r*4, Math.sin(Math.sqrt(generation))*5+5.5, 0, 2 * Math.PI, false);
        context.fill();
      }
    }
  }
}


setInterval(function(){
    generation++;
    grid = game.nextGeneration(grid);
    drawGrid(grid, generation);
  },10);

document.body.appendChild(canvas);


window.onload = function() {
  var controlPanelHeader = document.getElementById('title');

  controlPanelHeader.onclick = function() {
    document.getElementById('control-panel').classList.toggle('closed');
  }


  var saturationControl = document.getElementById('saturation');
  saturationControl.onchange = function(event) {
    saturation = this.value;
  }

  var lightnessControl = document.getElementById('lightness');
  lightnessControl.onchange = function(event) {
    lightness = this.value;
  }

  var pokeButton = document.getElementById('poke');
  pokeButton.onclick = function(event) {
    grid = pokeGrid(grid);
  }

  var refreshButton = document.getElementById('refresh');
  refreshButton.onclick = function(event) {
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    grid = randomGrid(250);


  }
}
