// Webcam input and regression model
let video;
let regressor;

// Buttons
let leftButton, centerButton, rightButton, trainButton;

function setup() {
    // Create a p5.js canvas and inject it into the canvas container in the HTML
    const canvas = createCanvas(640, 480);
    background(0);
    noStroke(30);
    select('#canvas').child(canvas);


    // Create a video stream using the attached device camera. Will cause a popup asking for Camera permission
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

                /* Create a continuous prediction loop */

                /* Start game */
            }

            // Log the output value from training the model
            // console.log(loss);
        });
    });
}