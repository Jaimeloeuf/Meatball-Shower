'use strict'; // Enforce use of strict verion of JavaScript

/*  @Doc
    const game controls the game through changes of the game's state with reactive programming
    Created through an anonymous self-invoking function to use the function's closure.
    Self-invoking so that it is a singleton.

    
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

// State control / Reactive Controller in the MVC architects built on top of a EventBus object
const Game = (function () {
    const eventBus = EventBus(["trainingModel", "gamePlay", "gameOver"]);

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
        } catch (err) {
            // Catch the error to re throw a more specific error regarding invalid game state
            throw new Error(`Invalid game state used: ${state}`);
        }
    }

    // Return the gameState object
    return Object.freeze({
        // Getter method, with a check to prevent accessing property of undefined.
        getState: () => (currentState) ? currentState.type : currentState,
        set,
        states,
        // Below are abbrevations / shorthand methods for attaching event handlers
        onTraining: eventBus.on.trainingModel,
        onGamePlay: eventBus.on.gamePlay,
        onGameOver: eventBus.on.gameOver
    });
})();