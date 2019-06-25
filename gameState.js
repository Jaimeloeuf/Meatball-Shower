// const print = console.log;

// const gameState controls the game through changes of the game's state with reactive programming
const gameState = (function () {
    // Game state variable: Training 0, Game 1, Game over 2
    const game = Object.freeze({
        trainingModel: "trainingModel",
        gamePlay: "gamePlay",
        gameOver: "gameOver"
    });


    // The game starts with a undefined state.
    let currentState;
    const eventEmitter = document.createElement("div")


    const
        onTraining = new Event(game.trainingModel),
        onGamePlay = new Event(game.gamePlay),
        onGameOver = new Event(game.gameOver);

    // Demo code to show how the event working
    setInterval(() => eventEmitter.dispatchEvent(onTraining), 1000);

    // All the available states of the current game.
    const states = {
        onTraining: onTraining.type,
        onGamePlay: onGamePlay.type,
        onGameOver: onGameOver.type
    };

    function onChange(changedTo, fn) {
        // Listen for the event.
        eventEmitter.addEventListener(changedTo, fn, false);
    }

    // @Todo attach the game state value to the events




    return {
        get: () => gameState,
        set(state) {
            // Exit method, if the game state is invalid
            if (!game[state])
                return false;

            // If gameState is valid, update state and return true
            currentState = state;
            return true;
        },
        onChange,
        states,
        // Below are the abbrevations / shorthand methods for attach event handlers
        onTraining: (fn) => onChange(states.onTraining, fn),
        onGamePlay: (fn) => onChange(states.onGamePlay, fn),
        onGameOver: (fn) => onChange(states.onGameOver, fn)
    };
})();

gameState.onChange(gameState.states.onTraining, function (event) {
    print("training callback by onChange")
});

gameState.onTraining(() => print("training callback by onTraining"));