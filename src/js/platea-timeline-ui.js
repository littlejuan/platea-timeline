var width, height;
var PlateaTimeline = window.PlateaTimeline;
var interactions, currentLength;
var isDraggable, currentSelection;
var divContainer;
var lastPos = 0;

function setup() {
    setCanvas();
    setContainer();
}

function draw() {
    background('#212121');
    noStroke();
    fill('#424242');
    rect(0, 0, width * .18, height);
    rect(width * .18, 0, width * .82, height * .20);
    fill('#616161');
    rect(0, 0, width * .18, height * .20);
    fill(255);
    strokeWeight(0);
    textSize(17);
    textAlign(CENTER);
    text("Timeline", width * .08, height * .12);
    drawInteractions();
}

function buttonFactory(interaction) {
    var button = createButton(interaction.name);
    button.id(interaction.id);
    button.class('interactionButton');
    button.style('background', interaction.color);
    button.style('height', height * .15 + 'px');
    button.style('width', 200 + 'px');
    button.style('color', 'white');
    button.mousePressed(actionButton);
    divContainer.child(button);
    button.position(0, 0);
}

function drawInteractions() {
    interactions = PlateaTimeline.getInteractions();
    var length = interactions.length;
    if (length !== 0 && length !== currentLength) {
        buttonFactory(interactions[length - 1]);
        currentLength++;
    }
}

function actionButton(event) {
    currentSelection = event.srcElement.id;
    isDraggable = true;
}

function mouseDragged() {
    if (currentSelection !== null) {
        var button = select('#' + currentSelection);
        button.position(lastPos);
        if (isDraggable) {
            lastPos = mouseX - width * .18;
            if(lastPos < 0){
                lastPos = 0;
            } else if(lastPos > width * .82 - button.width){
                lastPos = width * .82 - button.width;
            }
        }
    }
    return false;
}

function mouseReleased() {
    isDraggable = false;
}

function setContainer() {
    divContainer = createDiv('');
    divContainer.position(width * .18);
    divContainer.id('container');
    divContainer.style('bottom', '0');
    divContainer.style('width', width * .82 + 'px');
    divContainer.style('height', height * .80 + 'px');
}

function setCanvas() {
    width = windowWidth;
    height = windowHeight;
    currentLength = 0;
    createCanvas(width, height * .35);
    isDraggable = false;
    textFont("Roboto");
}