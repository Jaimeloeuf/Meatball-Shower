# "drawers" directory
Directory for all the modules to hold all the code for drawing and updating the graphics using the draw loop.  
In the case of our game, the "Game engine" is essentially built on top of the draw function of p5.js as it is being called repeatedly just like a standard game/graphics rendering loop.  
Draw function of p5.js is called repeatedly, and will be used to re-draw/re-render all the objects in the game.

## Modules
List of all drawing modules in this directory
- trainingModel.js
    - Draw function when the model is being trained. Like a loading screen.
- preGame.js
    - Draw function for waiting screen, when training is complete and waiting for user to click continue.
- game.js
    - Draw function for drawing the graphics of the actual game.
- gameOver.js
    - Draw function for drawing the Game Over graphics when game has ended.

## Module structure
Every single module in this directory follows the same structure.  
They all contain at least 3 parts:
- Docs
    - Documenting what does this module draw and more.
    - Usually the Docs block will include documentation of helper functions too if any and todos if any.
- The actual drawing function
    - This is the function that will be called repeatedly by the p5.js library to draw on your canvas.
    - Called by attaching to the Game controller's draw method.
    - This is used to implement graphics and logic that needs to be repeated on every single game engine loop.
    - All these function names are prefixed with, "draw_", followed by the name of the module.