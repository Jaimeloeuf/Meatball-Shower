function gameLoop() {
    // @Todo  dont repeat
    background(0);

    // Draw and update stars
    stars.forEach((star) => {
        star.show();
        star.update();
    });

    // Draw and update sauce
    sauce.show();
    sauce.update();

    // Draw and update meatballs
    meatballs.forEach((meatball) => {
        meatball.show();
        meatball.update();
        if (collision_detector(meatball, sauce)) {
            Game.endGame();
            // Return to Break out of the loop
            return;
        }
    });


    // @Todo  update and make the algorithm better. Perhaps refactor out, and change this so the level gets harder
    // Algorithm that determines how many meatballs are there at any given point
    // Should this code come before updating meatballs?
    if (random() < 0.0001 || frameCount % 3600 === 0) {
        meatballs.push(new Meatball());
    }
}