<template>
  <div class="home">
    <div id="canvas"></div>
  </div>
</template>

<script>
import p5 from "p5";
import { VIDEO } from "p5/lib/addons/p5.dom";

// Variable referencing the video capture stream
var video;

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO, () => console.log("Video ready"));
  video.hide();
}
function draw() {
  // Show mirror image of webcam
  translate(width, 0);
  scale(-1.0, 1.0);

  // Draw image following dimension of the canvas
  image(video, 0, 0, width, height);
}

window.setup = setup;
window.draw = draw;

export default {
  name: "home"
};
</script>