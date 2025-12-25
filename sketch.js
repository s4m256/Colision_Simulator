let eUI = 0.5
let scaleUI = 50
let vUI = 0.5

let v

let running = false
let n = 10

let particles = []
let eSlider, scaleSlider, vSlider, runButton;

function startSimulation() {
    particles = [];
    running = true;

    e = eUI;
    SCALE = scaleUI;
    v = vUI;

    for(let i=0;i<n;i++) {
        let x = random(width);
        let y = random(height);
        let mass = random(1, 2);
        let velocity = p5.Vector.random2D().mult(v);

        particles.push(new Particle(x, y, mass, velocity));
    }
}

function createUI() {
    eSlider = createSlider(0, 1, eUI, 0.01);
    eSlider.position(20, 20);

    scaleSlider = createSlider(1, 100, scaleUI, 1);
    scaleSlider.position(20, 50);

    vSlider = createSlider(0, 1, vUI, 0.01);
    vSlider.position(20, 80);

    nSlider = createSlider(0, 20, n, 1);
    nSlider.position(20, 110);

    runButton = createButton("Run Simulation");
    runButton.position(20, 140);
    runButton.mousePressed(startSimulation);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    createUI();
}

function draw() {
    background(51, 51, 51);

    eUI = eSlider.value();
    scaleUI = scaleSlider.value();
    vUI = vSlider.value();
    n = nSlider.value();

    if(!running) return;

    for(let i=0; i<particles.length; i++){
        for(let j=i+1;j<particles.length;j++){
            particles[i].physics(particles[j]);
        }
    }
    
    for(const particle of particles) {
        particle.update()
        particle.draw()
    }

    fill(255);
    text(`Elasticity: ${eUI}`, 160, 35);
    text(`Scale: ${scaleUI/100}`, 160, 65);
    text(`Velocity: ${vUI}`, 160, 95)
    text(`Quantity: ${n}`, 160, 125)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}