
  let song1;
  let song2;
  let song3;
  let amp;
  let dakine = false;
  let dakine2 = false;
  let dakine3 = false;
  let firework;
  let fact;

  let total = 46;
  let factor = 0;



  const s1 = (sketch) => {

     sketch.setup = () => {
      sketch.createCanvas(1200, 800);
      sketch.background(0)
      c1 = sketch.color("pink");
      c2 = sketch.color('purple');
      sketch.stroke(255);
      sketch.strokeWeight(4);
      createButtons();
      sketch.colorMode(sketch.HSB);
      gravity = sketch.createVector(0, .1);
      fireworks = [];
      sketch.fft = new p5.FFT(.9, 512)
      sketch.angleMode(sketch.DEGREES);
      sketch.amp = new p5.Amplitude()

    }

    class Firework {
      constructor() {
        if (sketch.random(1) <= .5) {
          fact = -1
        } else {
          fact = 1
        }
        this.hue = sketch.random(255)
        this.firework = new Particle(sketch.random(350, 550) * fact , 400, this.hue, true);
        this.boom = false;
        this.particles = [];
      }

      done() {
        if (this.boom && this.particles.length === 0) {
          return true;
        } else {
          return false;
        }
      }

      update() {
        if(!this.boom) {
          this.firework.applyForce(gravity);
          this.firework.update();
          if (this.firework.vel.y >= 0){
            this.boom = true;
            this.magic()

          }
        }
        for (let i = this.particles.length -1; i >= 0; i--) {
          this.particles[i].applyForce(gravity);
          this.particles[i].update()
          if (this.particles[i].lifespan < 0) {
            this.particles.splice(i, 1)
          }
        }
      }

      magic() {
        for(let i = 0; i < 100; i++) {
          let p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hue);
          this.particles.push(p);
        }
      }

      show() {
        if(!this.boom) {
          this.firework.show()
        }
        for (let i = 0; i < this.particles.length; i++) {
          this.particles[i].show();
        }
      }
    }

    class Particle {
      constructor(x, y, hue, firework) {
        this.pos = sketch.createVector(x,y);
        this.firework = firework
        this.lifespan = 255;
        this.hue = hue
        if (firework) {
          this.vel = sketch.createVector(0,sketch.random(-12.5, -8));
        } else {
          this.vel = p5.Vector.random2D();
          this.vel.mult(sketch.random(3, 6))
        }
        this.acc = sketch.createVector(0,0);
      }

      applyForce(force) {
        this.acc.add(force);
      }

      update() {
        if(!this.firework) {
          this.vel.mult(.95)
          this.lifespan -= 4
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0)
      }

      show() {
        if(!this.firework) {
          sketch.stroke(this.hue, 255, 255, this.lifespan)
          sketch.strokeWeight(4)
        } else {
          sketch.stroke(this.hue, 255, 255),
          sketch.strokeWeight(6)
        }
          sketch.point(this.pos.x, this.pos.y)
      }

    }

    function setGradient(x, y, w, h, c1, c2) {
      sketch.noFill();
      // Top to bottom gradient
      for (let i = y; i <= y + h; i++) {
        let inter = sketch.map(i, y, y + h, 0, 1);
        let c = sketch.lerpColor(c1, c2, inter);
        sketch.fill(c)
        sketch.stroke(c);
        sketch.line(x, i, x + w, i);
      }
    }

    sketch.draw = () => {
      sketch.background(0, 0, 0, 25)
      // setGradient(0, 0, sketch.width, sketch.height, c1, c2);
      let spectrum = sketch.fft.analyze();
      sketch.translate(sketch.width/2, sketch.height/2);
      points = 200;
      pointAngle = 360/200;
      radius = 125;
      if (dakine2) {
        if(sketch.random(1) < .04) {
          fireworks.push(new Firework())
        }

        for (let i = fireworks.length-1; i >= 0 ; i--) {
          fireworks[i].update();
          fireworks[i].show();
          if(fireworks[i].done()) {
            fireworks.splice(i, 1);
          }
        }
      }

      for (let i = 0; i < spectrum.length; i++) {
        let amp = spectrum[i];
        let angle = sketch.map(i, 0, spectrum.length, 0, 720);
        let radius = sketch.map(amp, 0, 512, 150, 500);
        let x = radius * sketch.cos(angle);
        let y = radius * sketch.sin(angle);
        sketch.stroke(255);
        sketch.strokeWeight(2);

        sketch.line(0, 0, x, y)
      };

      sketch.fill('black')
      const size = sketch.amp.getLevel() * 50;
      sketch.ellipse(0, 0, 250+size, 250+size);

    }

     sketch.preload = () => {
      song1 = sketch.loadSound(`assets/sounds/sound_1.mp3`);
      // song1.setVolume(.5);
      song2 = sketch.loadSound(`assets/sounds/sound_2.mp3`);
      // song2.setVolume(.5);
      song3 = sketch.loadSound(`assets/sounds/sound_3.mp3`);
      // song3.setVolume(.5);

    };

    const createButtons = () => {
      sketch.playButton = sketch.createButton("►");
      sketch.playButton.position(644,2425);
      sketch.playButton.mousePressed(togglePlaying);
      sketch.playButton.addClass('control-button');
    };

    function togglePlaying() {
      if (!song1.isPlaying()) {
        song1.play();
        sketch.playButton.html("||");
        dakine2 = true;
      } else {
        song1.pause();
        sketch.playButton.html("►");
        dakine2 = false
      };
    };


  };


  const s2 = (sketch) => {
    sketch.setup = () => {
      sketch.createCanvas(700, 700);
      r = sketch.width/3
      createButtons();
      sketch.amp = new p5.Amplitude()

    }

    function getVector(i) {
      v = p5.Vector.fromAngle(i + Math.PI, r);
      return v
    }


    const createButtons = () => {
      sketch.playButton = sketch.createButton("►");
      sketch.playButton.mousePressed(togglePlaying);
      sketch.playButton.addClass('control-button');
    };

    function togglePlaying() {
      if (!song2.isPlaying()) {
          song2.play();
          sketch.playButton.html("||");
          dakine = true;
      } else {
          song2.pause();
          sketch.playButton.html("►");
          dakine = false;
      };
    };


    sketch.draw = () => {
      sketch.background(0, 0, 0, 25)
      sketch.stroke(255)
      sketch.noFill();
      change = sketch.amp.getLevel() * 50
      sketch.translate(sketch.width / 2, sketch.height / 2);

      sketch.strokeWeight(6);
      sketch.stroke(sketch.random(255), sketch.random(255), sketch.random(255))
      sketch.circle(0, 0, change + sketch.width-100);
      // sketch.filter(sketch.BLUR, 1)

      if (dakine) {
          factor += .001
      } else {
          factor += 0
      };

      for (let j = 0; j < total; j++) {
          a = getVector(j);
          b = getVector(j * factor);
          sketch.stroke('white');
          sketch.strokeWeight(2)

          sketch.line(a.x, a.y, b.x, b.y);
      }
    }
  }

  const s3 = (sketch) => {

    sketch.setup = () => {
      sketch.createCanvas(1200, 800);
      createButtons();
      // sketch.colorMode(sketch.HSB)
      amp2 = new p5.Amplitude()
      bubbles = [];
    };

    class Bubble {
      constructor() {
        this.x = sketch.random(10, 1100);
        this.y = 0;
        this.vy = sketch.random(5);
        this.alpha = 255;
      }

      update() {
        this.y += this.vy;
        this.alpha -= 1.5;
      }

      show() {
        sketch.noStroke();
        sketch.fill(sketch.color('blue'), this.alpha);
        sketch.circle(this.x, this.y, 5);
      };
    }




    // sketch.preload = () => {
    //   song3 = sketch.loadSound(`assets/sounds/sound_2.mp3`);
    // };

    const createButtons = () => {
      sketch.playButton = sketch.createButton("►");
      sketch.playButton.mousePressed(togglePlaying);
      sketch.playButton.addClass('control-button');
    };

    function togglePlaying() {
      if (!song3.isPlaying()) {
        song3.play();
        sketch.playButton.html("||");
        dakine3 = true;
      } else {
        song3.pause();
        sketch.playButton.html("►");
        dakine3 = false
      };
    };

    sketch.draw = () => {
      sketch.colorMode(sketch.RGB)
      sketch.fill(0);
      sketch.background(0, 10)
      sketch.stroke('#24f8e5');
      sketch.strokeWeight(3);
      if(dakine3) {
        size2 = amp2.getLevel() * 150;
      } else {
        size2 = 0
      }

      sketch.circle(sketch.width/2, sketch.height/2, sketch.width/4+size2);
      if (dakine3) {
        if (sketch.random(1) < .1) {
          b = new Bubble();
          bubbles.push(b);
        }
      }
      for (let i = bubbles.length - 1; i >=  0; i--) {
        bubbles[i].update();
        bubbles[i].show();
        if (bubbles[i].alpha < 0) {
          bubbles.splice(i, 1);
        }
      }



    }
  }

  const sketch1 = new p5(s1, document.getElementById('cont3'));
  const sketch2 = new p5(s2, document.getElementById('cont1'));
  const sketch3 = new p5(s3, document.getElementById('cont2'));
