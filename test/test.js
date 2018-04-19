var game = require('../src/game');

var expect = require('chai').expect;

console.log(game)
describe('countLivingNeighbours()', function () {
  it('should return 0 when no living cells', function () {
    expect(game.countLivingNeighbours(1,1,[[false,false,false],[false,false,false],[false,false,false]])).to.be.equal(0);
  });

  it('should return 5 when 5 living cells', function () {
    expect(game.countLivingNeighbours(1,1,[[false,true,false],[true,false,true],[true,false,true]])).to.be.equal(5);
  });

  it('shouldnt count center cell', function () {
    expect(game.countLivingNeighbours(1,1,[[false,false,false],[false,true,false],[false,false,false]])).to.be.equal(0);
  });


  it('should wrap around the edge of the grid when index is 0,0', function () {
    var grid = [
      [false, false,  false,  true  ],
      [false, false,  false,  true  ],
      [false, false,  false,  false ],
      [true,  true,   false,  true  ]
    ]
    expect(game.countLivingNeighbours(0,0,grid)).to.be.equal(5);
  });

  it('should count 2 neighbours for center node in 3x long line', function() {
    var grid = [

                [false, false,  false,  false,  false],
                [false, false,  false,  false,  false],
                [false, true,   true,   true,   false],
                [false, false,  false,  false,  false],
                [false, false,  false,  false,  false],

              ];
    expect(game.countLivingNeighbours(2,2,grid)).to.be.equal(2);
  });

  it('should count 3 neighbours for one above and below node in 3x long line', function() {
    var grid = [

                [false, false,  false,  false,  false],
                [false, false,  false,  false,  false],
                [false, true,   true,   true,   false],
                [false, false,  false,  false,  false],
                [false, false,  false,  false,  false],

              ];
    expect(game.countLivingNeighbours(1,2,grid)).to.be.equal(3);
    expect(game.countLivingNeighbours(3,2,grid)).to.be.equal(3);
  });

  it('should remain dead when less than 3 neighbours', function() {
    var grid = [
                [false, false, false, false,false],
                [false, true, true, true, false],
                [false, false, false, false,false],
                [false, false, false, false,false],
                [false, false, false, false,false],


              ];
    expect(game.countLivingNeighbours(0,1,grid)).to.be.equal(2);
    expect(game.countLivingNeighbours(2,2,grid)).to.be.equal(3);
    expect(game.countLivingNeighbours(0,0,grid)).to.be.equal(1);

  });


});

describe('shouldSurvive()', function () {
  it('should survive to next generation when there are 2 neighbours', function() {
    var grid = [
                [false, false, false],
                [true, true, true],
                [false, false, false]
              ];
    expect(game.shouldSurvive(1,1,grid)).to.be.true;
  });

  it('should die when there are 4 neighbours', function() {
    var grid = [
                [false, true, false],
                [true, true, true],
                [false, true, false]
              ];
    expect(game.shouldSurvive(1,1,grid)).to.be.false;
  });
  it('should be alive when there are 3 neighbours', function() {
    var grid = [
                [false, false, false],
                [true, false, true],
                [false, true, false]
              ];
    expect(game.shouldSurvive(1,1,grid)).to.be.true;
  });

  it('should be alive when alive with 2 neighbours', function() {
    var grid = [

                [false, false,  false,  false,  false],
                [false, false,  false,  false,  false],
                [false, true,   true,   true,   false],
                [false, false,  false,  false,  false],
                [false, false,  false,  false,  false],

              ];
    expect(game.shouldSurvive(2,2,grid)).to.be.true;
  });
});

describe('nextGeneration()', function() {
  it('should rotate a line of threes in a 5x5 grid', function() {
    var grid = [

                [false, false,  false,  false,  false],
                [false, false,  false,  false,  false],
                [false, true,   true,   true,   false],
                [false, false,  false,  false,  false],
                [false, false,  false,  false,  false],

              ];
    var expectedNext = [
      [false, false, false, false,  false],
      [false, false, true,  false,  false],
      [false, false, true,  false,  false],
      [false, false, true,  false,  false],
      [false, false, false, false,  false],
    ];
    expect(game.nextGeneration(grid)).to.deep.equal(expectedNext);

  });

  it('should wrap around 3x3 grid', function() {
    var grid = [
                [false, false, false],
                [true, true, true],
                [false, false, false]
              ];

    var expectedNext = [
                [true, true, true],
                [true, true, true],
                [true, true, true]
              ];

    expect(game.nextGeneration(grid)).to.deep.equal(expectedNext);
  });

});
