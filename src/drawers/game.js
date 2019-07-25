/*  @Doc
    Drawing function for the actual game play.
*/

function draw_game() {
    background(0);

    // Draw and update stars
    stars.forEach((star) => {
        star.show();
        star.update();
    });

    // Draw and update meatballs
    meatballs.forEach((meatball) => {
        meatball.show();
        meatball.update();
        if (collision_detector(meatball, sauce)) {
            // End game with the controller and Return to Break out of loop
            Game.endGame();
            return;
        }
    });


    // Draw and update sauce after meatballs to show it is own the meatball
    sauce.show();
    sauce.update();

    // @Todo  update and make the algorithm better. Perhaps refactor out, and change this so the level gets harder
    // Algorithm that determines how many meatballs are there at any given point
    // Should this code come before updating meatballs?
    if (random() < 0.0001 || frameCount % 3600 === 0) {
        meatballs.push(new Meatball());
    }
}