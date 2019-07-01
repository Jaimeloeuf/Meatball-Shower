// Webcam input and regression model
let video;
let regressor;
let currentPrediction = 0;

let gameState = 0;

// Buttons
let leftButton, centerButton, rightButton, trainButton;

// Game variables
let dodged;
let hiScore = 0;
let sauce, meatballs, stars;


function setup() {
    // Create a p5.js canvas and inject it into the canvas container in the HTML
    // @Todo  Update the canvas size to be dynamic and injected externally
    const canvas = createCanvas(640, 480);
    background(0);
    noStroke(30);
    select('#canvas').child(canvas);


    // Create a video stream using the attached device camera. Will cause a popup asking for Camera permission
    // const video = createCapture(VIDEO, () => console.log('Video ready'));
    video = createCapture(VIDEO, () => console.log('Video ready'));
    video.hide();

    // Load model and add video feed in
    const mobileNet = ml5.featureExtractor('MobileNet', () => console.log('MobileNet ready'));
    regressor = mobileNet.regression(video, () => console.log('Model ready'));


    // Buttons
    const buttonDiv = select('#buttons');

    leftButton = createButton('Move left');
    leftButton.parent(buttonDiv);
    leftButton.mouseClicked(() => regressor.addImage(-1));

    centerButton = createButton('No movement');
    centerButton.parent(buttonDiv);
    centerButton.mouseClicked(() => regressor.addImage(0));

    rightButton = createButton('Move right');
    rightButton.parent(buttonDiv);
    rightButton.mouseClicked(() => regressor.addImage(1));

    trainButton = createButton('Train');
    select('#train').child(trainButton);
    trainButton.mouseClicked(() => {
        select('#info').html('Training - please wait');
        regressor.train((loss) => {

            // If the value is null, it means that training is complete
            if (loss === null) {
                console.log("Training done");
                startPrediction();

                // Start game
                changeState(1);
            }

            // Log the output value from training the model
            // console.log(loss);
        });
    });
}


// Function to show all the buttons
function showBtns() {
    select('#info').html('Add images you wish to correspond to relevant movements. Press train when done.');
    select('#buttons').show();
    select('#train').show();
}

// Remove all the items before the game start
function hideBtns() {
    select('#buttons').hide();
    select('#train').hide();
}

// Function to start the game
function startGame() {
    // When the state is newly changed to start game, create the stuff needed for the game
    dodged = 0;
    sauce = new Sauce();
    meatballs = [new Meatball()];
    makeStars();
    select('#info').html('0 meatballs dodged. High score: ' + hiScore);
}

// Function to game over screen
function endGame() {
    select('#info').html('Press space to restart');
}