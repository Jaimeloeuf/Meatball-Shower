<template>
  <div class="home">
    <div>
      <h1>Meatball Shower</h1>
      <p>
        <i>You must use your webcam to play this game</i>
      </p>

      <!-- Information panel. Item injected in using JS -->
      <h2 id="info"></h2>
    </div>

    <!-- Canvas container contains the canvas element used by p5.js for drawing. -->
    <div id="canvas"></div>

    <!-- Button container contains all the buttons depending on the state of the game-->
    <div id="buttons"></div>

    <!-- Train container for the train button -->
    <div id="train"></div>
  </div>
</template>

<script>
import p5 from "p5";
import { VIDEO } from "p5/lib/addons/p5.dom";

// Variable referencing the video capture stream
var video;

function setup() {
  const canvas = createCanvas(640, 480);
  // Put the p5.js drawing canvas into the div with "canvas" as ID
  canvas.parent("canvas");

  video = createCapture(VIDEO, () => console.log("Video ready"));
  video.hide();

  CreateButtons();
}
function draw() {
  // Show mirror image of webcam
  translate(width, 0);
  scale(-1.0, 1.0);

  // Draw image following dimension of the canvas
  image(video, 0, 0, width, height);
}

function CreateButtons() {
  const buttonDiv = select("#buttons");

  let leftButton = createButton("Move left");
  leftButton.parent(buttonDiv);

  let centerButton = createButton("No movement");
  centerButton.parent(buttonDiv);

  let rightButton = createButton("Move right");
  rightButton.parent(buttonDiv);

  let trainButton = createButton("Train");
  select("#train").child(trainButton);
}

window.setup = setup;
window.draw = draw;

export default {
  name: "home",
  mounted() {
    // Run p5's setup function after everytime it is mounted again.
    setup();
  }
};
</script>