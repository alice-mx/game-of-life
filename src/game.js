
class Game {


  constructor(printer, brush, rules) {
    this.SIZE = 250;
    this.grid = this.randomGrid(this.SIZE);
    this.generation = 0;
    this.printer = printer;
    this.brush = brush;
    this.rules = rules;
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


  startGame(milliseconds) {

    this.loop = setInterval( () =>
      {
        this.brush.update(this.generation);
        this.grid = this.rules.nextGeneration(this.grid);
        this.printer.drawImage(this.grid, this.brush);
        this.generation++;
      }
    , milliseconds);
  }

  poke() {
    for(let i = 0; i < this.grid.length; i++) {
      for(let j = 0; j < this.grid.length; j++) {
        if(Math.random() > 0.95) {
          this.grid[i][j] = true;
        }
      }
    }
  }
  pauseGame() {
    clearInterval(this.loop);
  }


  restartGame() {
    clearInterval(this.loop);
    this.generation = 0;
    this.grid = this.randomGrid(this.SIZE);
    this.printer.clearCanvas();
  }
}

module.exports = Game;
