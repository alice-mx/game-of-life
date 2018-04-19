
class Game {

 wrapAroundSplice(originalArray, index) {
   var array = JSON.parse(JSON.stringify(originalArray));
   if(typeof(array) == 'undefined' || array.length < 3) {
     return [];
   }
   if(index === 0) {
     return [array[array.length-1], array[0], array[1]];
   } else if(index === array.length-1) {
     return [array[index-1],array[index], array[0]];
   } else {
     return array.splice(index-1, 3);
   }
 }



 getNeighbourhood(rowIndex, columnIndex, grid) {
   var neighbourhood = new Array();
   var rows = this.wrapAroundSplice(grid, rowIndex);
   for(var r = 0; r < rows.length; r++) {
     neighbourhood.push(this.wrapAroundSplice(rows[r],columnIndex));
   }
   return neighbourhood;
 }

 countLivingNeighbours(rowIndex, columnIndex, grid) {
   var previousRow    = (rowIndex == 0  ?             grid.length-1 : rowIndex-1);
   var nextRow        = (rowIndex == grid.length-1 ?  0 : rowIndex+1);

   var previousColumn = (columnIndex == 0 ? grid.length-1 : columnIndex-1);
   var nextColumn     = (columnIndex == grid.length-1 ? 0 : columnIndex+1);

   var coords =
      [
        {x: previousRow,  y: previousColumn},
        {x: previousRow,  y: columnIndex},
        {x: previousRow,  y: nextColumn},
        {x: rowIndex,     y: previousColumn},
        {x: rowIndex,     y: nextColumn},
        {x: nextRow,      y: previousColumn},
        {x: nextRow,      y: columnIndex},
        {x: nextRow,      y: nextColumn}
      ];

    var livingNeighbours = 0;

    for(var i = 0; i < coords.length; i++) {
      var coord = coords[i];
      if(grid[coord.x][coord.y]) {
        livingNeighbours++;
      }
    }

    return livingNeighbours;
 }

 revive(rowIndex, columnIndex, grid) {
   grid[rowIndex][columnIndex] = true;
   return grid;
 }

 countLivingCells(neighbourhood) {
   var living = 0;
   for(var r = 0; r < 3; r++) {
     for(var c = 0; c < 3; c++) {
       if(!(c==1 && r==1) && neighbourhood[r][c]) {
         living++;
       }
     }
   }
   return living;
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

module.exports = new Game();
