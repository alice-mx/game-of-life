
class Game {


  constructor(size) {
    this.grid = this.randomGrid(size);
    this.generation = 0;
  }

  randomGrid(size) {
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

  startGame(milliseconds, canvas) {
    this.loop = setInterval( () =>
      {
        canvas.drawImage(this.grid, null);

        this.generation++;
      }
    , milliseconds);
  }

  stopGame() {
    clearInterval(this.loop);
  }



  getNeighbourCoordinates(rowIndex,columnIndex,length) {
    var previousRow    = (rowIndex == 0  ?        length-1 : rowIndex-1);
    var nextRow        = (rowIndex == length-1 ?  0 : rowIndex+1);

    var previousColumn = (columnIndex == 0 ? length-1 : columnIndex-1);
    var nextColumn     = (columnIndex == length-1 ? 0 : columnIndex+1);

    var coordinates = [
         {x: previousRow,  y: previousColumn},
         {x: previousRow,  y: columnIndex},
         {x: previousRow,  y: nextColumn},
         {x: rowIndex,     y: previousColumn},
         {x: rowIndex,     y: nextColumn},
         {x: nextRow,      y: previousColumn},
         {x: nextRow,      y: columnIndex},
         {x: nextRow,      y: nextColumn}
       ];

    return coordinates;



  }
 countLivingNeighbours(rowIndex, columnIndex, grid) {
    var coords = this.getNeighbourCoordinates(rowIndex, columnIndex, grid.length);
    var livingNeighbours = 0;

    for(var i = 0; i < coords.length; i++) {
      var coord = coords[i];
      if(grid[coord.x][coord.y]) {
        livingNeighbours++;
      }
    }

    return livingNeighbours;
 }

 shouldSurvive(rowIndex, columnIndex, grid) {
   var neighbourCount = this.countLivingNeighbours(rowIndex, columnIndex, grid);
   var isAlive = grid[rowIndex][columnIndex];
   return (isAlive && (neighbourCount == 2) || neighbourCount == 3);
 }

 nextGeneration(cells) {
   const newCells = [];
   for(var r = 0; r < cells.length; r++) {
     const newRow = [];
     for(var c = 0; c < cells.length; c++) {
       newRow.push(this.shouldSurvive(r,c,cells));
     }

     newCells.push(newRow);
   }
   return newCells;
 }
}

module.exports = Game;
