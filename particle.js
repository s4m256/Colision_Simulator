class Particle {
    constructor (x, y, mass, velocity) {
        this.position = createVector(x, y)
        this.velocity = velocity
        this.mass = mass
        this.radius = Math.sqrt(this.mass / PI) * SCALE
        this.color = color(random(0,255), random(0,255), random(0,255))
    }

    draw() {
        noStroke()
        fill(this.color)
        ellipse(this.position.x, this.position.y, this.radius * 2)
    }

    physics(particle) {
        let distanceVec = p5.Vector.sub(particle.position, this.position);
        let distance = distanceVec.mag();
        let radius = this.radius + particle.radius;

        if (distance >= radius) return;

        let normal;
        if (distance === 0) {
            normal = createVector(random(-1,1), random(-1,1)).normalize();
        } else {
            normal = distanceVec.copy().normalize();
        }

        let relativeVelocity = p5.Vector.sub(this.velocity, particle.velocity);
        let speed = relativeVelocity.dot(normal);

        if (speed <= 0) return;

        let impulse = ((1 + e) * speed) / (1 / this.mass + 1 / particle.mass); 
        let impulseVec = normal.copy().mult(impulse);

        this.velocity.sub(p5.Vector.mult(impulseVec, 1 / this.mass));
        particle.velocity.add(p5.Vector.mult(impulseVec, 1 / particle.mass));

        let overlap = 0.5 * (radius - distance);
        this.position.sub(p5.Vector.mult(normal, overlap));
        particle.position.add(p5.Vector.mult(normal, overlap));
    }


    update() {
        this.position.add(p5.Vector.mult(this.velocity, deltaTime));

        if (this.position.x - this.radius < 0) {
            this.position.x = this.radius; 
            this.velocity.x *= -1;         
        }
        if (this.position.x + this.radius > width) {
            this.position.x = width - this.radius;
            this.velocity.x *= -1;
        }
        if (this.position.y - this.radius < 0) {
            this.position.y = this.radius;
            this.velocity.y *= -1;
        }
        if (this.position.y + this.radius > height) {
            this.position.y = height - this.radius;
            this.velocity.y *= -1;
        }
    }
}