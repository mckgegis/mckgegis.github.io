# Music Visualizer

Javascript only app using P5.js library to analyze sounds and render a visual representation

# Live Site

http://mckgegis.github.io

# Features

### Visualizer 1

The circle is split evenly into 46 different points each with a value between 0 and 45.  Each point then points to the the value of itself times a factor.  Factor starts off as 0 then every frame factor is increased by .001 causing the visual effect

![alt text](https://github.com/mckgegis/mckgegis.github.io/blob/master/assets/images/factors.png)

![alt text](https://github.com/mckgegis/mckgegis.github.io/blob/master/assets/images/vis1.png)

### Visulaizer 2

Random raindrops are formed each with a starting y position at the top of the canvas, x position within the canvas, and initial velocity causing them to come down the screen.  Each frame the raindrops velocity decreases and once it is below zero the raindrops fade away

![alt text](https://github.com/mckgegis/mckgegis.github.io/blob/master/assets/images/raindrops.png)

![alt text](https://github.com/mckgegis/mckgegis.github.io/blob/master/assets/images/vis2.png)


### Visualizer 3

Each bar around the circle represents a frequency of the sound.  As the amplitude of each frequency changes so does the height of the bars.  There are also random 'fireworks' that are generated.  Each firework starts of with an initial velocity but 'gravity' slows it down.  Once the velocity comes to a stop the 'firework' explodes meaning 100 particles are generated each going in any direction with random velocities. As 'gravity' pulls all those particles down it resembles that of a firework

![alt text](https://github.com/mckgegis/mckgegis.github.io/blob/master/assets/images/fireworks.png)

![alt text](https://github.com/mckgegis/mckgegis.github.io/blob/master/assets/images/vis.png)


