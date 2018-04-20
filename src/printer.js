class Printer {
  constructor(canvas) {
    this.canvas = canvas;
  }

  drawImage(image, brush) {
    var context = this.canvas.getContext("2d");
    context.globalAlpha = 0.5;
    context.fillStyle = `hsl(${brush.hue}, ${brush.saturation}%, ${brush.lightness}%)`;
    for(var i = 0; i < image.length; i++) {
      for(var r = 0; r < image[i].length; r++) {
        if(image[i][r]) {
          context.beginPath();
          context.arc(i*4, r*4, brush.size, 0, 2 * Math.PI, false);
          context.fill();
        }
      }
    }
  }
  clearCanvas()  {
    var context = this.canvas.getContext("2d");
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

module.exports = Printer;
