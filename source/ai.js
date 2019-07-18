// @Todo Create a way for the interval to stop when the game is over
const startPrediction = () => setInterval(updatePrediction, 100);

// Function to predict image on every call
function updatePrediction() {
    regressor.predict((err, camInput) => {
        // camInput is a value. Based on that value move the ship
        if (err)
            console.log('Error: ' + err);
        currentPrediction = camInput;
    });
}