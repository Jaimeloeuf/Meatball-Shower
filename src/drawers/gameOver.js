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

    // @Todo  dont repeat
    // Draw meatball
    meatballs.forEach((meatball) => meatball.show());

    // Draw sauce after meatballs to show it is own the meatball
    sauce.show();

    // @Todo  Change color of meatball to show its been sauced

    // @Todo  dont repeat
    textAlign(CENTER);
    textSize(64);
    fill(255);
    stroke(0, 200, 0);
    text('Sauced!', width / 2, height / 2);
}