const e = 1
const SCALE = 0.003

let particles = []

function setup() {
    createCanvas(windowWidth, windowHeight);

    for (let i = 0; i < 10; i++) {
        let x = random(0, width);
        let y = random(0, height);
        let mass = random(2e8, 1e9);
        let velocity = createVector(random(-1,1), random(-1,1));

        particles.push(new Particle(x, y, mass, velocity));
    }
}

function draw() {
    background(51, 51, 51)

    for(let i=0; i<particles.length; i++){
        for(let j=i+1;j<particles.length;j++){
            particles[i].physics(particles[j]);
        }
    }
    
    for(const particle of particles) {
        particle.update()
        particle.draw()
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}