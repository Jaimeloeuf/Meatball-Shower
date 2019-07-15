'use strict'; // Enforce use of strict verion of JavaScript

/*  @Doc
    This module implements the Game controller, which is basically a State and Business logic controller,
    built on a Reactive programming layer provided by a EventBus object.

    It is created through an anonymous self-invoking function to use the function's closure.
    Self-invoking to create a singleton object, to ensure that there is only 1 Game controller.

    Built on top of a EventBus object which implements all the low level events and their event handling,
    thus Game controller is very application specific, keeping it clean and simple,
    providing users with method that wraps over all the EventBus usage.

    
    @Defn  Variable definitions in this scope
    states:
        - Contains all the possible states of the game
    currentState:
        - Variable that keeps track of the current state of the game.

    @ Use case specification:
    user should be able to :
    - (Done) read the current state
    - set a new state
    - add a event handler for a change of state.
    - ? remove a event handler previously added
*/

const Game = (function () {
    const eventBus = EventBus(["creatingControls", "trainingModel", "gamePlay", "gameOver"]);

    const states = eventBus.events

    // The game starts with a undefined state.
    let currentState;

    // Set method for the current state is a function wrapper over the eventBus's fire method.
    function set(state) {
        try {
            // If the game state is invalid, the event does not exist, causing error thrown.
            eventBus.fire(state);

            // If gameState is valid, update state
            currentState = state;

            // Print out the current state for debug
            console.log(`Current Game state: ${state.type}`);
        } catch (err) {
            // Catch the error to re throw a more specific error regarding invalid game state
            throw new Error(`Invalid game state used: ${state}`);
        }
    }

    // Function called repeatedly to draw screen on the canvas
    let currentScreenDrawer;

    function draw() {
        currentScreenDrawer();
    }

    let currentScore = 0, highscore = 0;
    function updateHighscore(score) {
        if (score > highscore) {
            highscore = score;
            // Save to backend service asynchronously to prevent blocking the game.

            // Return true to indicate high score is beaten and updated
            return true;
        }
    }

    function updateScore(score) {
        // Update the current score
        currentScore = score;

        // Call update highscore too, to see if score beat highscore
        if (updateHighscore(score)) {
            // Call a congratulation drawer function or smth
        }
    }

    // Return the gameState object
    return Object.freeze({
        // Getter method, with a check to prevent accessing property of undefined.
        getState: () => (currentState) ? currentState.type : currentState,
        // Below are abbrevations / shorthand methods for setting/changing state
        createControls: () => set(states.creatingControls),
        trainModel: () => set(states.trainingModel),
        startGame: () => set(states.gamePlay),
        endGame: () => set(states.gameOver),
        // Below are abbrevations / shorthand methods for attaching event handlers
        onTraining: eventBus.on.trainingModel,
        onGamePlay: eventBus.on.gamePlay,
        onGameOver: eventBus.on.gameOver,
        onCreateControls: eventBus.on.creatingControls,
        // Export methods for score keeping. Getters are just function wrapper over values.
        getScore: () => currentScore,
        getHighScore: () => highscore,
        updateScore,
        // Export arrow function based currentScreenDrawer setter
        setScreenDrawer: (fn) => currentScreenDrawer = fn,
        draw
    });
})();