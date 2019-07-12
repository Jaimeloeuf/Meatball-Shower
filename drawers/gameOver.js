/*  @Doc
    Drawing function for the pre game screen, when the training is complete but before the Game starts.
*/

// Game render loop function to show screen when the game is over.
function draw_gameOver() {
    background(0);
    
    // Draw and update stars
    stars.forEach((star) => {
        star.show();
        star.update();
    });

    // Draw sauce
    sauce.show();

    // @Todo  dont repeat
    // Draw meatball
    meatballs.forEach((meatball) => meatball.show());

    // @Todo  dont repeat
    textAlign(CENTER);
    textSize(64);
    fill(255);
    stroke(0, 200, 0);
    text('Sauced!', width / 2, height / 2);
}