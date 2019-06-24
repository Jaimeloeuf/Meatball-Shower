/*  @Doc
    This module contains class definition of the Sprite/Animation objects, rendered by draw loop of p5.js
    Classes defined here:
    - Meatball
    - Stars
    - Sauce
*/


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