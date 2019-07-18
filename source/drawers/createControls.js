/*  @Doc
    Drawing function to show Camera input when user is mapping controls to actions
*/

function draw_createControls(video_input) {
    // Takes a video input to display on the p5 canvas

    // Show mirror image of webcam
    translate(width, 0);
    scale(-1.0, 1.0);

    // Draw image following dimension of the canvas
    image(video_input, 0, 0, width, height);
    // Draw image by the image dimension
    // image(video_input, 0, 0);
}