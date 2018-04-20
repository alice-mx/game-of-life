class Brush {
  constructor(generation, saturation, lightness) {
    this.hue = generation%360;
    this.size = Math.sin(Math.sqrt(generation))*5+5.5;
    this.saturation = saturation;
    this.lightness = lightness;
  }

  update(generation) {
    this.hue = generation%360;
    this.size = Math.sin(Math.sqrt(generation))*5+5.5;
  }
}

module.exports = Brush;
