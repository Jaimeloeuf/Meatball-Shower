/*  @Doc
    This module contains class definition of the Sprite/Animation objects, rendered by draw loop of p5.js
    Classes defined here:
    - Meatball
    - Stars
    - Sauce
*/

class Sauce {
    constructor() {
        this.position = width / 2;
        this.velocity = 0;
        this.maxVelocity = 8;
        this.friction = 0.75;
        this.size = 50;
        this.speed = 5;
    }

    show() {
        stroke(20);
        strokeWeight(4);
        fill(255, 0, 0);
        ellipse(this.position, height - this.size, this.size);
    }

    update() {
        this.position += this.velocity;
        this.position = constrain(this.position, this.size, width - this.size);
        this.velocity += currentPrediction * this.speed;
        this.velocity *= this.friction;
        this.velocity = constrain(this.velocity, -this.maxVelocity, this.maxVelocity);
    }
}

class Meatball {
    constructor() {
        // Generate a random size, X poisition and speed of movement at the start of the game.
        this.size = random(50, 120);
        this.position = createVector(random(this.size / 2, width - this.size / 2), -this.size);
        this.velocity = createVector(random(-3, 3), random(1, 3));
    }

    show() {
        fill(200, 150, 100);
        stroke(180, 120, 80);
        strokeWeight(10);
        ellipse(this.position.x, this.position.y, this.size);
    }

    update() {
        // Move the meatball, by updating its position with the velocity value
        this.position.add(this.velocity);

        // Create the rebouce effect when the meatball hits the border of the game, by reversing the direction of X travel
        if (this.position.x < this.size / 2 || this.position.x > width - this.size / 2)
            this.velocity.x *= -1;

        // If the meatball has been dodged
        if (this.position.y > height + this.size) {
            dodged += 1;

            // Set current score as new high score if it is higher than high score
            if (dodged > hiScore)
                hiScore = dodged;
            // Update the info bar
            select('#info').html(`${dodged} Meatballs dodged. High score: ${hiScore}`);

            this.size = random(50, 120);
            this.position = createVector(random(this.size / 2, width - this.size / 2), -this.size);
            this.velocity = createVector(random(-3, 3), random(1, 3));
        }
    }
}

function collision_detector(meatball, sauce) {
    const d2 = sq(sauce.position - meatball.position.x) + sq(height - sauce.size - meatball.position.y);
    const threshold = sq(sauce.size * 0.5) + sq(meatball.size * 0.5);
    return (d2 < threshold);
}

class Star {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = random(1, 5);
        this.color = random(50, 255);
    }

    show() {
        // Sets the color and line weight used to draw lines and borders around shapes.
        stroke(this.color, this.color, 255);
        strokeWeight(1);

        // Draws a one pixel coordinate point in space.
        // First parameter is X value of the point and the second value is the Y value for the point.
        // The color of the point is determined by the current stroke, which is set above.
        point(this.position.x, this.position.y);
    }

    update() {
        this.position.y += this.velocity;
        if (this.position.y > height) {
            this.position = createVector(random(width), 0);
            this.velocity = random(1, 5);
            this.color = random(50, 255);
        }
    }
}